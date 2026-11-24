// The edit Worker: serves the editor-enabled build of the site (static assets) and the save API
// under /__cms/*. It sits behind Cloudflare Access on its own hostname (see docs/remote-editing.md).
// Saves become commits on a rolling branch with one open pull request; nothing here can change
// the live site without a merge.
import { handleCms } from "../site/editor/server/core.ts";
import { manifestFromKeys, PREFIX } from "../scripts/lib/manifest-core.mjs";
import { verifyAccessJwt } from "./access.ts";
import { githubStore } from "./github-store.ts";

type R2Like = { list(o: { prefix: string; cursor?: string }): Promise<{ objects: { key: string }[]; truncated: boolean; cursor?: string }> };

export interface Env {
  ASSETS: { fetch(req: Request): Promise<Response> };
  MEDIA: R2Like;
  /** secret: fine-grained GitHub token, Contents + Pull requests read/write on this one repository */
  GITHUB_TOKEN: string;
  GITHUB_REPO: string;
  GITHUB_BASE: string;
  GITHUB_BRANCH: string;
  ACCESS_TEAM_DOMAIN: string;
  ACCESS_AUD: string;
  /** optional, comma separated: only these emails may save, on top of the Access policy */
  ALLOWED_EMAILS?: string;
}

async function listKeys(bucket: R2Like) {
  const keys: string[] = [];
  let cursor: string | undefined;
  do {
    const page = await bucket.list({ prefix: PREFIX, cursor });
    keys.push(...page.objects.map((o) => o.key));
    cursor = page.truncated ? page.cursor : undefined;
  } while (cursor);
  return keys;
}

const deny = (status: number, error: string) => new Response(JSON.stringify({ ok: false, error }), { status, headers: { "content-type": "application/json" } });

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);
    if (!url.pathname.startsWith("/__cms/")) return env.ASSETS.fetch(request);

    // 1. Who: a valid Access token for this application, from an allowed email
    try {
      await verifyAccessJwt(request.headers.get("cf-access-jwt-assertion"), {
        teamDomain: env.ACCESS_TEAM_DOMAIN,
        aud: env.ACCESS_AUD,
        allowedEmails: env.ALLOWED_EMAILS?.split(",").map((e) => e.trim().toLowerCase()).filter(Boolean),
      });
    } catch {
      return deny(403, "forbidden");
    }

    // 2. From where: the editor page itself (same origin). Browsers send Origin on POSTs.
    const origin = request.headers.get("origin");
    if (origin && new URL(origin).host !== url.host) return deny(403, "forbidden");

    // 3. What: the shared routes, validated against the content schema, stored on GitHub
    const store = githubStore({
      token: env.GITHUB_TOKEN,
      repo: env.GITHUB_REPO,
      base: env.GITHUB_BASE || "main",
      branch: env.GITHUB_BRANCH || "cms/edit",
      buildManifest: async () => manifestFromKeys(await listKeys(env.MEDIA)),
    });
    return handleCms(request, url.pathname.slice("/__cms".length), store);
  },
};

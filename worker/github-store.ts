// A ContentStore that keeps the content in the GitHub repository. Saves never touch `main`:
// they are committed to one rolling branch (default `cms/edit`) with a single open pull request
// that collects every editor change. Merging that pull request is what publishes.
//
// The token (fine-grained, this repository only, "Contents" and "Pull requests" read/write)
// lives in a Worker secret. Only paths the core hands over are ever written: the core validates
// slugs and content before it calls `write`.
import type { ContentStore, WriteInfo } from "../site/editor/server/core.ts";

export type GithubConfig = {
  token: string;
  /** "owner/name" */
  repo: string;
  /** branch the pull request targets (the live site is built from it) */
  base: string;
  /** the rolling branch the editor commits to */
  branch: string;
  buildManifest: () => Promise<unknown>;
  fetch?: typeof fetch;
};

const utf8ToB64 = (s: string) => {
  const bytes = new TextEncoder().encode(s);
  let bin = "";
  for (let i = 0; i < bytes.length; i += 0x8000) bin += String.fromCharCode(...bytes.subarray(i, i + 0x8000));
  return btoa(bin);
};
const b64ToUtf8 = (b: string) => new TextDecoder().decode(Uint8Array.from(atob(b.replace(/\n/g, "")), (c) => c.charCodeAt(0)));
const encPath = (p: string) => p.split("/").map(encodeURIComponent).join("/");

export function githubStore(cfg: GithubConfig): ContentStore {
  const f = cfg.fetch ?? fetch;
  const api = `https://api.github.com/repos/${cfg.repo}`;
  const owner = cfg.repo.split("/")[0];

  const gh = (path: string, init: RequestInit & { raw?: boolean } = {}) =>
    f(`${api}${path}`, {
      ...init,
      headers: {
        authorization: `Bearer ${cfg.token}`,
        accept: init.raw ? "application/vnd.github.raw+json" : "application/vnd.github+json",
        "x-github-api-version": "2022-11-28",
        "user-agent": "site-editor-worker",
        ...(init.body ? { "content-type": "application/json" } : {}),
      },
    });
  const must = async (res: Response, what: string) => {
    if (res.ok) return res;
    // never forward GitHub's body to the browser verbatim: it can name the repo and token scopes
    throw new Error(`GitHub: ${what} failed (HTTP ${res.status})`);
  };

  let branchExists: Promise<boolean> | null = null;
  const hasBranch = () => (branchExists ??= gh(`/git/ref/heads/${cfg.branch}`).then((r) => r.ok));

  /** The branch exists, is based on the current `base`, and can take commits. */
  let prepared: Promise<void> | null = null;
  const prepare = () =>
    (prepared ??= (async () => {
      const baseRef = await (await must(await gh(`/git/ref/heads/${cfg.base}`), `reading ${cfg.base}`)).json() as { object: { sha: string } };
      const baseSha = baseRef.object.sha;
      if (!(await hasBranch())) {
        await must(await gh("/git/refs", { method: "POST", body: JSON.stringify({ ref: `refs/heads/${cfg.branch}`, sha: baseSha }) }), "creating the branch");
        return;
      }
      // After the pull request was merged (and the branch kept) the branch has nothing main lacks:
      // move it forward so the next edits start from what is live.
      const cmp = (await (await must(await gh(`/compare/${cfg.base}...${cfg.branch}`), "comparing branches")).json()) as { ahead_by: number; behind_by: number };
      if (cmp.ahead_by === 0 && cmp.behind_by > 0) {
        await must(await gh(`/git/refs/heads/${cfg.branch}`, { method: "PATCH", body: JSON.stringify({ sha: baseSha, force: true }) }), "updating the branch");
      }
    })());

  const pullRequest = async (): Promise<string> => {
    const open = (await (await must(await gh(`/pulls?state=open&base=${encodeURIComponent(cfg.base)}&head=${encodeURIComponent(`${owner}:${cfg.branch}`)}`), "listing pull requests")).json()) as { html_url: string }[];
    if (open[0]) return open[0].html_url;
    const created = (await (await must(await gh("/pulls", {
      method: "POST",
      body: JSON.stringify({
        title: "Content edits from the editor",
        head: cfg.branch,
        base: cfg.base,
        body: "Collects every save made in the site editor. Check the preview deployment, then merge to publish.",
      }),
    }), "opening the pull request")).json()) as { html_url: string };
    return created.html_url;
  };

  return {
    remote: true,
    buildManifest: cfg.buildManifest,

    async read(path) {
      const ref = (await hasBranch()) ? cfg.branch : cfg.base;
      const res = await gh(`/contents/${encPath(path)}?ref=${encodeURIComponent(ref)}`, { raw: true });
      if (res.status === 404) return null;
      return (await must(res, `reading ${path}`)).text();
    },

    async write(path, text): Promise<WriteInfo> {
      await prepare();
      const cur = await gh(`/contents/${encPath(path)}?ref=${encodeURIComponent(cfg.branch)}`);
      let sha: string | undefined;
      if (cur.status !== 404) {
        const meta = (await (await must(cur, `reading ${path}`)).json()) as { sha: string; content?: string; encoding?: string };
        sha = meta.sha;
        if (meta.encoding === "base64" && meta.content && b64ToUtf8(meta.content) === text) return { pr: await pullRequest(), branch: cfg.branch };
      }
      await must(
        await gh(`/contents/${encPath(path)}`, {
          method: "PUT",
          body: JSON.stringify({ message: `Editor: update ${path.replace(/^site\/content\//, "")}`, content: utf8ToB64(text), branch: cfg.branch, ...(sha ? { sha } : {}) }),
        }),
        `saving ${path}`,
      );
      return { pr: await pullRequest(), branch: cfg.branch };
    },
  };
}

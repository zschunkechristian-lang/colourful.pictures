// The editor's content API, independent of where it runs. It speaks Web `Request`/`Response` and
// reaches the content only through a `ContentStore`, so the same routes and the same validation
// serve both backends: the Vite dev plugin (files on disk) and the edit Worker (commits on GitHub).
//
//   GET  /ping                 -> { ok: true, remote?: true }   (the editor uses this to know saving is available)
//   GET  /project/<slug>       -> the stored project JSON (the editor loads the latest saved state with it)
//   GET  /site                 -> the stored site.json
//   POST /project/<slug>       -> validates against projectSchema and stores it (existing projects only);
//                                 home / info / play live in site/content/pages/
//   POST /site                 -> validates against siteSchema and stores site/content/site.json
//   POST /new-project          -> { slug, title } creates a starter project
//   POST /refresh-media        -> lists the bucket, stores the media manifest and returns it
//
// Who may call this is decided by the adapter in front (localhost check, Cloudflare Access).
// Guards here: custom header on every POST (blocks simple cross-site form posts), size limit,
// slug allow-list, schema validation. Nothing outside the three content locations is ever written.
import { newId, projectSchema, serializeProject, serializeSite, siteSchema, type Project } from "../../lib/schema.ts";

/** Page slugs that are not projects (their files are in site/content/pages, their URLs are /, /info, /play). */
export const RESERVED = ["home", "info", "play"];
export const MAX_BODY = 2 * 1024 * 1024;

export const MEDIA_PATH = "site/content/media-manifest.json";
export const SITE_PATH = "site/content/site.json";
export const projectPath = (slug: string) => `site/content/${RESERVED.includes(slug) ? "pages" : "projects"}/${slug}.json`;

export type WriteInfo = { pr?: string; branch?: string };

export interface ContentStore {
  /** The stored text of a repo-relative path, or null when it does not exist. */
  read(path: string): Promise<string | null>;
  /** Stores `text` at a repo-relative path. May return where the change went (e.g. a pull request). */
  write(path: string, text: string): Promise<WriteInfo | void>;
  /** Lists the media bucket and returns the manifest object. */
  buildManifest(): Promise<unknown>;
  /** True when saving does not change the live site directly (the editor then says "saved to a pull request"). */
  remote?: boolean;
}

const json = (status: number, body: unknown) => new Response(JSON.stringify(body), { status, headers: { "content-type": "application/json", "cache-control": "no-store" } });
const fail = (status: number, error: string, extra?: object) => json(status, { ok: false, error, ...extra });

async function readJson(req: Request): Promise<{ ok: true; value: unknown } | { ok: false; res: Response }> {
  const declared = Number(req.headers.get("content-length") ?? 0);
  if (declared > MAX_BODY) return { ok: false, res: fail(413, "body too large") };
  const text = await req.text();
  if (text.length > MAX_BODY) return { ok: false, res: fail(413, "body too large") };
  try {
    return { ok: true, value: JSON.parse(text) };
  } catch {
    return { ok: false, res: fail(400, "invalid JSON body") };
  }
}

export async function handleCms(req: Request, path: string, store: ContentStore): Promise<Response> {
  try {
    const get = req.method === "GET";
    const post = req.method === "POST";
    if (post && req.headers.get("x-cms") !== "1") return fail(403, "missing x-cms header");

    if (get && path === "/ping") return json(200, { ok: true, ...(store.remote ? { remote: true } : {}) });

    const m = /^\/project\/([a-z0-9-]+)$/.exec(path);
    if (m) {
      const slug = m[1];
      const file = projectPath(slug);
      if (get) {
        const text = await store.read(file);
        return text === null ? fail(404, `no project "${slug}"`) : new Response(text, { headers: { "content-type": "application/json", "cache-control": "no-store" } });
      }
      if (post) {
        if ((await store.read(file)) === null) return fail(404, `no project "${slug}"`);
        const body = await readJson(req);
        if (!body.ok) return body.res;
        const parsed = projectSchema.safeParse(body.value);
        if (!parsed.success) return fail(400, "schema validation failed", { issues: parsed.error.issues.slice(0, 10) });
        if (parsed.data.slug !== slug) return fail(400, "slug in body does not match the URL");
        const info = await store.write(file, serializeProject(parsed.data));
        return json(200, { ok: true, ...info });
      }
    }

    if (path === "/site") {
      if (get) {
        const text = await store.read(SITE_PATH);
        return text === null ? fail(404, "no site.json") : new Response(text, { headers: { "content-type": "application/json", "cache-control": "no-store" } });
      }
      if (post) {
        const body = await readJson(req);
        if (!body.ok) return body.res;
        const parsed = siteSchema.safeParse(body.value);
        if (!parsed.success) return fail(400, "schema validation failed", { issues: parsed.error.issues.slice(0, 10) });
        const info = await store.write(SITE_PATH, serializeSite(parsed.data));
        return json(200, { ok: true, ...info });
      }
    }

    if (post && path === "/new-project") {
      const body = await readJson(req);
      if (!body.ok) return body.res;
      const b = (body.value ?? {}) as { slug?: unknown; title?: unknown };
      const slug = typeof b.slug === "string" ? b.slug : "";
      if (!/^[a-z0-9-]+$/.test(slug)) return fail(400, "slug may only contain a-z, 0-9 and -");
      if (RESERVED.includes(slug)) return fail(400, `"${slug}" is reserved for a page`);
      const file = projectPath(slug);
      if ((await store.read(file)) !== null) return fail(409, `project "${slug}" already exists`);
      const title = typeof b.title === "string" ? b.title.trim() : "";
      const project: Project = {
        slug,
        title: title || slug,
        description: "",
        sections: [
          { id: newId(), type: "hero", media: null, title: "", intro: [""], credit: "" },
          { id: newId(), type: "film", project: "" },
          { id: newId(), type: "credits", items: [{ label: "Client", value: [] }, { label: "Year", value: [] }, { label: "Creative Direction", value: [] }] },
        ],
      };
      const info = await store.write(file, serializeProject(projectSchema.parse(project)));
      return json(200, { ok: true, slug, ...info });
    }

    if (post && path === "/refresh-media") {
      const manifest = await store.buildManifest();
      const info = await store.write(MEDIA_PATH, JSON.stringify(manifest, null, 2) + "\n");
      return json(200, { ok: true, manifest, ...info });
    }

    return fail(404, "not found");
  } catch (err) {
    return fail(500, err instanceof Error ? err.message : "server error");
  }
}

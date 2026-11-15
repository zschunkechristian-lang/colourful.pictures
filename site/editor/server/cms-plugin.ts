// Dev-only content API for the editor. It is a Vite plugin with `apply: "serve"`, so it
// exists only while `npm run dev` is running and is never part of a production build.
//
//   GET  /__cms/ping                 -> { ok: true }   (the editor uses this to know saving is available)
//   POST /__cms/project/<slug>       -> validates the body against projectSchema and writes
//                                       site/content/projects/<slug>.json (existing projects only)
//
// Guards: localhost host only, same-origin only, a custom header (blocks simple cross-site
// form posts), size limit, slug allow-list, schema validation, atomic write.
import fs from "node:fs";
import path from "node:path";
import type { IncomingMessage, ServerResponse } from "node:http";
import type { Plugin } from "vite";
import { projectSchema, serializeProject } from "../../lib/schema";

const MAX_BODY = 2 * 1024 * 1024;

function send(res: ServerResponse, status: number, body: unknown) {
  res.statusCode = status;
  res.setHeader("content-type", "application/json");
  res.end(JSON.stringify(body));
}

function isLocalRequest(req: IncomingMessage) {
  const host = (req.headers.host ?? "").replace(/:\d+$/, "");
  if (!["localhost", "127.0.0.1", "[::1]"].includes(host)) return false;
  const origin = req.headers.origin;
  if (origin && new URL(origin).host !== req.headers.host) return false;
  return true;
}

function readBody(req: IncomingMessage): Promise<string> {
  return new Promise((resolve, reject) => {
    let size = 0;
    const chunks: Buffer[] = [];
    req.on("data", (c: Buffer) => {
      size += c.length;
      if (size > MAX_BODY) {
        reject(new Error("body too large"));
        req.destroy();
      } else chunks.push(c);
    });
    req.on("end", () => resolve(Buffer.concat(chunks).toString("utf8")));
    req.on("error", reject);
  });
}

export function cmsPlugin(): Plugin {
  const projectsDir = path.resolve(process.cwd(), "site/content/projects");
  // Files the editor just wrote. Vite would hot-reload the page for them, which would throw
  // away the editor's undo history and open panels, so those updates are swallowed. Edits made
  // from anywhere else (an IDE, Claude, git) are not in this map and reload as usual.
  const ownWrites = new Map<string, number>();
  return {
    name: "site-cms",
    apply: "serve",
    handleHotUpdate({ file }) {
      const at = ownWrites.get(path.resolve(file));
      if (at && Date.now() - at < 3000) return [];
    },
    configureServer(server) {
      server.middlewares.use("/__cms", async (req, res) => {
        try {
          if (!isLocalRequest(req)) return send(res, 403, { ok: false, error: "local requests only" });
          const url = new URL(req.url ?? "/", "http://local");

          if (req.method === "GET" && url.pathname === "/ping") return send(res, 200, { ok: true });

          const m = /^\/project\/([a-z0-9-]+)$/.exec(url.pathname);
          if (req.method === "POST" && m) {
            if (req.headers["x-cms"] !== "1") return send(res, 403, { ok: false, error: "missing x-cms header" });
            const slug = m[1];
            const file = path.join(projectsDir, `${slug}.json`);
            if (path.dirname(file) !== projectsDir || !fs.existsSync(file)) return send(res, 404, { ok: false, error: `no project "${slug}"` });

            let json: unknown;
            try {
              json = JSON.parse(await readBody(req));
            } catch {
              return send(res, 400, { ok: false, error: "invalid JSON body" });
            }
            const parsed = projectSchema.safeParse(json);
            if (!parsed.success) return send(res, 400, { ok: false, error: "schema validation failed", issues: parsed.error.issues.slice(0, 10) });
            if (parsed.data.slug !== slug) return send(res, 400, { ok: false, error: "slug in body does not match the URL" });

            const tmp = `${file}.${process.pid}.tmp`;
            fs.writeFileSync(tmp, serializeProject(parsed.data));
            ownWrites.set(file, Date.now());
            fs.renameSync(tmp, file);
            return send(res, 200, { ok: true });
          }

          send(res, 404, { ok: false, error: "not found" });
        } catch (err) {
          send(res, 500, { ok: false, error: err instanceof Error ? err.message : "server error" });
        }
      });
    },
  };
}

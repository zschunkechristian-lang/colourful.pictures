// Dev-only content API for the editor: a Vite plugin with `apply: "serve"`, so it exists only
// while `npm run dev` is running and is never part of a production build. The routes and all
// validation live in ./core.ts (shared with the edit Worker); this file only adds
//   - the localhost / same-origin guard, and
//   - a file-backed ContentStore that writes into the working tree.
import fs from "node:fs";
import path from "node:path";
import type { IncomingMessage } from "node:http";
import type { Plugin } from "vite";
import { buildManifest } from "../../../scripts/lib/r2-manifest.mjs";
import { handleCms, MAX_BODY, type ContentStore } from "./core";

function isLocalRequest(req: IncomingMessage) {
  const host = (req.headers.host ?? "").replace(/:\d+$/, "");
  if (!["localhost", "127.0.0.1", "[::1]"].includes(host)) return false;
  const origin = req.headers.origin;
  if (origin && new URL(origin).host !== req.headers.host) return false;
  return true;
}

function readBody(req: IncomingMessage): Promise<Buffer> {
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
    req.on("end", () => resolve(Buffer.concat(chunks)));
    req.on("error", reject);
  });
}

export function cmsPlugin(): Plugin {
  const root = process.cwd();
  // Files the editor just wrote. Vite would hot-reload the page for them, which would throw
  // away the editor's undo history and open panels, so those updates are swallowed. Edits made
  // from anywhere else (an IDE, Claude, git) are not in this map and reload as usual.
  const ownWrites = new Map<string, number>();

  const store: ContentStore = {
    async read(rel) {
      try {
        return fs.readFileSync(path.resolve(root, rel), "utf8");
      } catch {
        return null;
      }
    },
    async write(rel, text) {
      const file = path.resolve(root, rel);
      if (fs.existsSync(file) && fs.readFileSync(file, "utf8") === text) return; // nothing changed
      ownWrites.set(file, Date.now());
      const tmp = `${file}.${process.pid}.tmp`;
      fs.writeFileSync(tmp, text);
      fs.renameSync(tmp, file);
    },
    buildManifest, // lists the R2 bucket with the read-only token from .env: a few Class A operations
  };

  return {
    name: "site-cms",
    apply: "serve",
    handleHotUpdate({ file }) {
      const at = ownWrites.get(path.resolve(file));
      if (at && Date.now() - at < 3000) return [];
    },
    configureServer(server) {
      server.middlewares.use("/__cms", async (req, res) => {
        const send = (status: number, body: string, type = "application/json") => {
          res.statusCode = status;
          res.setHeader("content-type", type);
          res.end(body);
        };
        try {
          if (!isLocalRequest(req)) return send(403, JSON.stringify({ ok: false, error: "local requests only" }));
          const url = new URL(req.url ?? "/", "http://local");
          const hasBody = req.method !== "GET" && req.method !== "HEAD";
          const headers = new Headers();
          for (const [k, v] of Object.entries(req.headers)) if (typeof v === "string") headers.set(k, v);
          const request = new Request(url, { method: req.method, headers, body: hasBody ? new Uint8Array(await readBody(req)) : undefined });
          const response = await handleCms(request, url.pathname, store);
          send(response.status, await response.text(), response.headers.get("content-type") ?? "application/json");
        } catch (err) {
          send(500, JSON.stringify({ ok: false, error: err instanceof Error ? err.message : "server error" }));
        }
      });
    },
  };
}

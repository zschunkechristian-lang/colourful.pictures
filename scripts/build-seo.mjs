// Runs after `vike prerender`: writes sitemap.xml and robots.txt into dist/client, built from
// the pages that were actually rendered. Pages marked noindex (and the 404 page) are left out.
// The public address comes from site/lib/config.ts, the single source for it.
import fs from "node:fs";
import path from "node:path";

const root = "dist/client";
const base = /url:\s*"([^"]+)"/.exec(fs.readFileSync("site/lib/config.ts", "utf8"))?.[1]?.replace(/\/$/, "");
if (!base) throw new Error("SITE.url not found in site/lib/config.ts");

const urls = [];
const walk = (dir) => {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) walk(p);
    else if (e.name === "index.html") {
      const html = fs.readFileSync(p, "utf8");
      if (/<meta[^>]+name="robots"[^>]+content="[^"]*noindex/i.test(html) || /<meta[^>]+content="[^"]*noindex[^"]*"[^>]+name="robots"/i.test(html)) continue;
      const rel = path.relative(root, path.dirname(p)).split(path.sep).join("/");
      urls.push(rel ? `/${rel}` : "/");
    }
  }
};
walk(root);
urls.sort();

const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.map((u) => `  <url><loc>${base}${u}</loc></url>`).join("\n")}\n</urlset>\n`;
fs.writeFileSync(path.join(root, "sitemap.xml"), xml);
fs.writeFileSync(path.join(root, "robots.txt"), `User-agent: *\nAllow: /\n\nSitemap: ${base}/sitemap.xml\n`);
console.log(`sitemap.xml: ${urls.length} pages, robots.txt written`);

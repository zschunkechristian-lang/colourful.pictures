// One-off: rewrites still references from the old frame number ("07", "07.webp") to the real
// filename ("zdf_frame_07.jpg") in all content files. Run: node scripts/migrate/still-filenames.mjs
import fs from "node:fs";
import path from "node:path";

const toFile = (project, n) => `${project}_frame_${n}${/\.webp$/.test(n) ? "" : ".jpg"}`;
const dir = "site/content";
const files = [
  ...fs.readdirSync(path.join(dir, "projects")).map((f) => path.join(dir, "projects", f)),
  ...fs.readdirSync(path.join(dir, "pages")).map((f) => path.join(dir, "pages", f)),
  path.join(dir, "site.json"),
];
let count = 0;
const walk = (node, slug) => {
  if (Array.isArray(node)) return node.forEach((x) => walk(x, slug));
  if (!node || typeof node !== "object") return;
  if (node.kind === "still" && "n" in node) {
    node.file = toFile(node.project, node.n);
    delete node.n;
    count++;
  }
  if (node.type === "carousel") {
    const project = node.project ?? slug;
    node.frames = node.frames.map((f) => {
      count++;
      return typeof f === "string" ? toFile(project, f) : { file: toFile(project, f.n), alt: f.alt };
    });
  }
  Object.values(node).forEach((v) => walk(v, slug));
};
for (const f of files) {
  const j = JSON.parse(fs.readFileSync(f, "utf8"));
  walk(j, j.slug);
  fs.writeFileSync(f, JSON.stringify(j, null, 2) + "\n");
}
console.log(`migrated ${count} references`);

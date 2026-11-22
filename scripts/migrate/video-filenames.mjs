// One-off: rewrites video references from { type, n } to the shared file stem ("zdf_clip_03"),
// and film sections' short names ("master_02") to the full stem ("zdf_master_02").
// Run: node scripts/migrate/video-filenames.mjs
import fs from "node:fs";
import path from "node:path";

const stem = (project, v) => (v.type === "header" ? `${project}_header` : v.type === "clip" ? `${project}_clip_${v.n}` : `${project}_${v.n ?? "master_01"}`);
const dir = "site/content";
const files = [
  ...fs.readdirSync(path.join(dir, "projects")).map((f) => path.join(dir, "projects", f)),
  ...fs.readdirSync(path.join(dir, "pages")).map((f) => path.join(dir, "pages", f)),
  path.join(dir, "site.json"),
];
let count = 0;
const walk = (node) => {
  if (Array.isArray(node)) return node.forEach(walk);
  if (!node || typeof node !== "object") return;
  if (node.kind === "video" && "type" in node) {
    node.file = stem(node.project, node);
    delete node.type;
    delete node.n;
    count++;
  }
  if (node.type === "film" && node.project) {
    node.file = `${node.project}_${node.file ?? "master_01"}`;
    count++;
  }
  Object.values(node).forEach(walk);
};
for (const f of files) {
  const j = JSON.parse(fs.readFileSync(f, "utf8"));
  walk(j);
  fs.writeFileSync(f, JSON.stringify(j, null, 2) + "\n");
}
console.log(`migrated ${count} references`);

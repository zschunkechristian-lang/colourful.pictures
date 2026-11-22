// One-off: turns video references from a name stem ("zdf_clip_03") into real filenames
// ({ file: "zdf_clip_03_h264.mp4", webm?, poster? }), looking up which of webm/poster exist in the
// media manifest. Run `npm run manifest` first. Run: node scripts/migrate/video-formats.mjs
import fs from "node:fs";
import path from "node:path";

const manifest = JSON.parse(fs.readFileSync("site/content/media-manifest.json", "utf8"));
const resolve = (project, stem) => {
  const vids = manifest.projects[project]?.videos ?? [];
  return vids.find((v) => v.file === `${stem}_h264.mp4` || v.file === `${stem}.mp4`) ?? { file: `${stem}_h264.mp4` };
};
const dir = "site/content";
const files = [
  ...fs.readdirSync(path.join(dir, "projects")).map((f) => path.join(dir, "projects", f)),
  ...fs.readdirSync(path.join(dir, "pages")).map((f) => path.join(dir, "pages", f)),
  path.join(dir, "site.json"),
];
let count = 0;
const apply = (node, project) => {
  const { file, webm, poster } = resolve(project, node.file);
  node.file = file;
  if (webm) node.webm = webm;
  if (poster) node.poster = poster;
  count++;
};
const walk = (node) => {
  if (Array.isArray(node)) return node.forEach(walk);
  if (!node || typeof node !== "object") return;
  if (node.kind === "video" && !/\.mp4$/.test(node.file)) apply(node, node.project);
  if (node.type === "film" && node.project && node.file && !/\.mp4$/.test(node.file)) apply(node, node.project);
  Object.values(node).forEach(walk);
};
for (const f of files) {
  const j = JSON.parse(fs.readFileSync(f, "utf8"));
  walk(j);
  fs.writeFileSync(f, JSON.stringify(j, null, 2) + "\n");
}
console.log(`migrated ${count} references`);

// Compact one-line-per-section dump of a project JSON (for reviewing against the original page).
import fs from "node:fs";
const m = (x) => (!x ? "·" : x.kind === "still" ? `s${x.project}/${x.n}` : `v${x.project}/${x.type}${x.n ? x.n : ""}`);
const p = JSON.parse(fs.readFileSync(`site/content/projects/${process.argv[2]}.json`, "utf8"));
p.sections.forEach((s, i) => {
  const d = s.type === "row" ? `w${s.window ?? "-"} ` + s.cells.map((c) => `${c.span}:${c.text !== undefined ? "T" : m(c.media)}`).join(" ") : s.type === "carousel" ? `${s.project} [${s.frames.map((f) => (typeof f === "string" ? f : f.n)).join(",")}]` : s.type === "film" ? `${s.project}/${s.file}` : s.type === "hero" ? m(s.media) : s.type === "feature" ? `${s.title} ${m(s.media)}` : s.type === "statement" ? `${s.from}-${s.to} ${s.align} ${s.text.slice(0, 30)}` : s.type === "credits" ? s.items.map((x) => x.label).join("/") : (s.text || "").slice(0, 30);
  console.log(i, s.type, d);
});

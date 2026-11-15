// One-off migration helper: turns a Webstudio-generated project page into
// plain content JSON (site/content/projects/<slug>.json + shared site data).
//
//   node scripts/migrate/extract-webstudio.mjs <slug> [--site]
//
// It evaluates the generated page into an element tree (esbuild + stub
// components), resolves the atomic CSS classes, and classifies the sections.
// Anything it cannot classify is written as { type: "unknown", dump } so that
// nothing is silently dropped.
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { transform } from "esbuild";

const here = path.dirname(fileURLToPath(import.meta.url));
const repo = path.resolve(here, "../..");
const gen = path.join(repo, "app/__generated__");
const slug = process.argv[2];
const writeSite = process.argv.includes("--site");
if (!slug) throw new Error("usage: extract-webstudio.mjs <slug> [--site]");

// ── 1. page → element tree ────────────────────────────────────────────────
async function loadTree(slug) {
  let src = fs.readFileSync(path.join(gen, `[projects].[${slug}]._index.tsx`), "utf8");
  src = src
    .replace(/^\s*import[^;]*;\s*$/gm, "")
    .replace(/export const /g, "const ")
    .replace(/: string\[\]|: string \| undefined/g, "")
    .replace(/_props: \{ system: any; \}/, "_props")
    .replace(/export \{[^}]*\};?/g, "");
  const out = await transform(src, { loader: "tsx", jsx: "transform", jsxFactory: "h", jsxFragment: "Frag", target: "es2022" });
  const names = ["Fragment_1", "Box", "Text", "Link", "HtmlEmbed", "Italic", "Link_1", "Body", "Slot", "Image", "AnimateChildren", "StaggerAnimation", "AnimateText", "Fragment", "Frag"];
  const prelude =
    `const h=(tag,props,...ch)=>({tag:typeof tag==='string'?tag:tag.n,props:props||{},ch:ch.flat(9).filter(c=>c!==undefined&&c!==null&&c!=='')});` +
    names.map((n) => `const ${n}={n:${JSON.stringify(n)}};`).join("") +
    `const useState=()=>[null,()=>{}];const renderText=()=>null;const useResource=()=>null;const useVariableState=()=>[null,()=>{}];`;
  return new Function(prelude + out.code + `\n;return Page({system:{}});`)();
}

// ── 2. atomic CSS resolver ────────────────────────────────────────────────
const css = fs.readFileSync(path.join(gen, "index.css"), "utf8");
const rules = {};
for (const m of css.matchAll(/@media ([^{]*)\{\n([\s\S]*?)\n\}\n(?=@|$)/g)) {
  const media = m[1].includes("991") ? "m" : m[1].includes("767") ? "xs" : "base";
  for (const r of ("\n" + m[2]).matchAll(/\n  \.([\w-]+)((?:[:\s>~+\[][^{]*)?)\s*\{([^}]*)\}/g)) {
    if (r[2].trim()) continue;
    (rules[r[1]] ||= {})[media] = ((rules[r[1]] || {})[media] || "") + r[3];
  }
}
const style = (node, media = "base") => {
  const o = {};
  for (const c of (node.props?.className || "").split(/\s+/)) {
    for (const d of ((rules[c] || {})[media] || "").split(";")) {
      const i = d.indexOf(":");
      if (i > 0) o[d.slice(0, i).trim()] = d.slice(i + 1).trim().replace(/\s+/g, " ");
    }
  }
  return o;
};

// ── 3. tree helpers ───────────────────────────────────────────────────────
const kids = (n) => (typeof n === "string" ? [] : n.ch.flatMap((c) => (typeof c !== "string" && ["Fragment_1", "Slot", "Frag"].includes(c.tag) ? kids(c) : [c])));
const walk = (n, f) => { if (typeof n === "string") return; f(n); n.ch.forEach((c) => walk(c, f)); };
const find = (n, p) => { let r = null; walk(n, (x) => { if (!r && p(x)) r = x; }); return r; };
const findAll = (n, p) => { const r = []; walk(n, (x) => p(x) && r.push(x)); return r; };
const text = (n) => (typeof n === "string" ? n : n.tag === "br" ? "\n" : n.tag === "b" ? n.ch.map(text).join("").replace(/^(\s*)(.*?)(\s*)$/s, (_, a, b, c) => `${a}**${b}**${c}`) : n.ch.map(text).join(""));
const code = (n) => n.props?.code || "";
const span = (st, key = "grid-column-start") => (/^span (\d+)$/.exec(st[key] || "") || [])[1] * 1 || null;
const anim = (n) => {
  const a = n.props?.action;
  if (!a) return null;
  return a.animations.map((x) => x.name.toLowerCase().replace(/\s+/g, "-"));
};

const HEIGHTS = { "66-34-100-100": "tall", "50-50-100-100": "mid", "50-30-80-100": "mid30", "25-25-100-50": "short" };
function heightToken(st) {
  const h = st.height;
  if (!h) return null;
  if (/^calc\(100(l|d)vh - 40px\)$/.test(h)) return "full";
  const m = /clamp\(\s*(\d+)lvh, calc\(\s*\1lvh \+ calc\((\d+)lvh \* clamp\(0, calc\(calc\((\d+)vw - 1280px\) \/ 1280px\), 1\)\)\), (\d+)lvh \) - 40px \)/.exec(h);
  if (!m) return h === "auto" || h === "100%" ? null : `?${h}`;
  const key = `${m[1]}-${m[2]}-${m[3]}-${m[4]}`;
  return HEIGHTS[key] || `?${key}`;
}

function media(n) {
  const c = code(n);
  const d = (k) => (new RegExp(`data-${k}\\s*=\\s*"([^"]*)"`).exec(c) || [])[1];
  if (n.tag === "Image") return { kind: "still", project: n.props["data-project"], n: String(n.props["data-number"]), ...(n.props.optimize === false ? { optimize: false } : {}) };
  if (/<video/.test(c)) return { kind: "video", project: d("project"), type: d("type") || "clip", ...(d("number") ? { n: d("number") } : {}) };
  return null;
}
const mediaOf = (cell) => {
  const m = findAll(cell, (x) => x.tag === "Image" || /<video/.test(code(x)));
  return m.length ? media(m[0]) : null;
};

// ── 4. classification ─────────────────────────────────────────────────────
function sectionOf(div) {
  const html = findAll(div, (x) => x.tag === "HtmlEmbed").map(code).join("\n");
  const an = findAll(div, (x) => x.props?.action).map((x) => anim(x));
  const out = {};
  if (/data-type="header"/.test(html) && /span 7|span12/.test(JSON.stringify(div.props)) === false) {
    // hero: header video left, text column right
  }
  if (/video-player-container/.test(html)) {
    const m = /(\w+)_master_01_h264/.exec(html);
    return { type: "film", project: m?.[1], file: "master_01" };
  }
  if (/ws-external-container/.test(html)) {
    const live = html.replace(/<!--[\s\S]*?-->/g, "");
    const slides = [...live.matchAll(/class="ws-slide"><img[^>]*data-number="(\d+)"/g)].map((x) => x[1]);
    // the old script padded the track with a clone of the last slide in front
    // and a clone of the first slide at the end; the real frames are in between
    return { type: "carousel", frames: slides.slice(1, -1) };
  }
  const stagger = find(div, (x) => x.tag === "StaggerAnimation");
  if (stagger) {
    const cells = kids(stagger);
    // PROCESS-style full-bleed clip with overlay title
    const h1 = find(stagger, (x) => x.tag === "h1");
    if (h1 && cells.length === 1 && find(cells[0], (x) => /<video/.test(code(x)))) {
      return { type: "feature", title: text(h1), media: mediaOf(cells[0]) };
    }
    if (find(stagger, (x) => x.tag === "Link_1")) return null; // project tiles → handled elsewhere
    const rowSt = style(stagger);
    return {
      type: "row",
      ...(stagger.props.slidingWindow ? { window: stagger.props.slidingWindow } : {}),
      cells: cells.map((c) => {
        const st = style(c);
        return { span: span(st), media: mediaOf(c) };
      }),
    };
  }
  // text statement: <div grid-column…><AnimateChildren><AnimateText><Text/>
  const t = find(div, (x) => x.tag === "Text");
  const inner = find(div, (x) => x.tag === "div" && style(x)["grid-column-start"] && !/span/.test(style(x)["grid-column-start"]));
  if (t) {
    const stt = inner ? style(inner) : {};
    const at = find(div, (x) => x.tag === "AnimateText");
    const ats = at ? style(at) : {};
    const fs_ = style(t)["font-size"];
    return {
      type: "statement",
      from: stt["grid-column-start"] * 1 || 1,
      to: (stt["grid-column-end"] * 1 || 13) - 1,
      align: ats["text-align"] === "end" ? "end" : ats["text-align"] === "start" ? "start" : "center",
      ...(fs_ && !/3lvw/.test(fs_) ? { size: fs_ } : {}),
      text: text(t).trim(),
    };
  }
  return null;
}

const tree = await loadTree(slug);
const main = find(tree, (x) => x.props?.tag === "main");
const [navBox, contentBox, ...rest] = kids(main);

const sections = [];
const tileRows = [];
for (const div of kids(contentBox)) {
  const st = style(div);
  const html = findAll(div, (x) => x.tag === "HtmlEmbed").map(code).join("\n");

  // credits table
  if (findAll(div, (x) => x.tag === "p").length >= 4) {
    const ps = findAll(div, (x) => x.tag === "p").map((p) => text(p));
    const items = [];
    for (let i = 0; i < ps.length; i += 2) items.push({ label: ps[i], value: ps[i + 1].split("#").map((s) => s.replace(/^[\s,]+|[\s,]+$/g, "")) });
    sections.push({ type: "credits", items });
    continue;
  }
  // hero (header video + title + intro)
  if (/data-type="header"/.test(html) && find(div, (x) => x.tag === "Text")) {
    const texts = findAll(div, (x) => x.tag === "Text").map(text);
    const intro = texts[1];
    sections.push({
      type: "hero",
      media: { kind: "video", project: /data-project="(\w+)"/.exec(html)[1], type: "header" },
      title: texts[0].trim(),
      intro: intro.split("#").map((s) => s.replace(/\n+/g, " ").trim()).filter(Boolean),
      credit: texts[2].trim(),
    });
    continue;
  }
  // project tiles
  const stagger = find(div, (x) => x.tag === "StaggerAnimation");
  if (stagger && find(stagger, (x) => x.tag === "Link_1")) {
    tileRows.push({
      ...(stagger.props.slidingWindow ? { window: stagger.props.slidingWindow } : {}),
      tiles: kids(stagger).map((a) => {
        const ast = style(a);
        const h1 = find(a, (x) => x.tag === "h1");
        const vid = find(a, (x) => /<video/.test(code(x)));
        return {
          ...(a.props.href ? { href: a.props.href } : {}),
          title: text(h1).trim().split("\n"),
          ...(style(h1)["text-align"] === "start" ? { titleAlign: "start" } : {}),
          span: span(ast),
          media: vid ? media(vid) : null,
        };
      }),
    });
    continue;
  }
  if (div.tag === "HtmlEmbed") continue; // style/script embeds
  if (div.tag === "Box") {
    const t = find(div, (x) => x.tag === "Text");
    const link = find(div, (x) => x.tag === "Link_1");
    const aside = find(div, (x) => x.tag === "Italic");
    if (aside) sections.push({ type: "aside", text: text(aside).trim() });
    else if (t) {
      const label = link ? text(link).trim() : null;
      sections.push({
        type: "closing",
        text: text(t).replace(label || "\u0000", "").trim(),
        ...(link ? { link: { href: link.props.href, label } } : {}),
      });
    }
    continue;
  }
  const s = sectionOf(div);
  if (s) { sections.push(s); continue; }

  // closing blocks (margin boxes)
  const t = find(div, (x) => x.tag === "Text");
  if (t) { sections.push({ type: "closing", text: text(t).trim() }); continue; }
  sections.push({ type: "unknown", dump: JSON.stringify(div).slice(0, 400) });
}

// closing boxes live as <Box> siblings after the divs — handled above via Text.
const project = { slug, sections: sections.map((s) => ({ id: crypto.randomUUID().replace(/-/g, "").slice(0, 8), ...s })) };
fs.mkdirSync(path.join(repo, "site/content/projects"), { recursive: true });
fs.writeFileSync(path.join(repo, `site/content/projects/${slug}.json`), JSON.stringify(project, null, 2) + "\n");
console.log(`wrote ${slug}.json with ${sections.length} sections (${sections.filter((s) => s.type === "unknown").length} unknown)`);

if (writeSite) {
  // footer / contact section is the <Box:section> after the content column
  const foot = find(tree, (x) => x.props?.tag === "section");
  const site = { projectGrid: tileRows };
  if (foot) {
    const texts = findAll(foot, (x) => x.tag === "Text").map(text);
    const links = findAll(foot, (x) => x.tag === "Link").map((l) => ({ href: l.props.href, label: text(l).trim() }));
    site.footer = {
      contact: { heading: texts[0].trim(), links },
      philosophy: { heading: texts[texts.length - 2].trim(), paragraphs: texts[texts.length - 1].split(/\n\s*\n/).map((t) => t.trim()).filter(Boolean) },
    };
  }
  fs.mkdirSync(path.join(repo, "site/content"), { recursive: true });
  fs.writeFileSync(path.join(repo, "site/content/site.json"), JSON.stringify(site, null, 2) + "\n");
  console.log(`wrote site.json (${tileRows.length} tile rows)`);
}

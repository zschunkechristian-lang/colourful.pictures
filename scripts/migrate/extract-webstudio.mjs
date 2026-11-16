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

// Old-style pages point at assets.mim.studio files by their original names. R2 holds the same
// files under the numbered layout (matched by file size / poster); this table records which is which.
const LEGACY_VIDEO = {
  "zdf:MIM.zdf.website.makingof.16by9": { film: "master_03" },
  "lavita:MIM.lavita.website.header": { type: "header" },
  "lavita:LaVita_30s_HD_16x9_v037_h264": { film: "clip_01" },
  "lavita:LaVita_MakingOf_30sec_16x9_v04_15Mbps": { film: "clip_03" },
  "lavita:MIM.lavita.clip04": { type: "clip", n: "08" },
  "lavita:MIM.lavita.clip06": { type: "clip", n: "10" },
  "lavita:MIM.lavita.clip08": { type: "clip", n: "11" },
  "lavita:MIM.lavita.clip10": { type: "clip", n: "12" },
  "lavita:MIM.lavita.clip11": { type: "clip", n: "13" },
  "lavita:LaVita_Snippet_InnerWorld": { type: "clip", n: "04" },
  "rowa:GGH_ROWA_MASTER_1by1_Snippet_002": { type: "clip", n: "05" },
  "rowa:220224_ROWA_turntable_v002": { type: "clip", n: "02" },
  "rowa:220224_ROWA_turntable_v003": { type: "clip", n: "03" },
  "rowa:GGH_ROWA_SH011_v023__cz": { type: "clip", n: "09" },
  "rowa:ROWA_CHARANIM_SH040_v28_floP__cleanRender": { type: "clip", n: "08" },
  "rowa:GGH_ROWA_MASTER_v014_16by9_10Mbit_DELIVERY": { film: "master_01" }, // not in R2 yet
};
const legacyVideo = (c) => {
  const m = /src="https:\/\/assets\.mim\.studio\/website\/(?:projects\/(\w+)\/video|headers)\/([^"]+?)_(?:h264|h265)\.mp4"/.exec(c);
  if (!m) return null;
  const project = m[1] || /MIM\.(\w+)\./.exec(m[2])[1].toLowerCase();
  const hit = LEGACY_VIDEO[`${project}:${m[2]}`];
  return hit ? { project, ...hit } : (console.warn("UNMAPPED legacy video", m[2]), null);
};
const legacyStill = (src) => {
  const m = /\/projects\/(\w+)\/(?:stills\/)?MIM\.\w+\.Frame\.(?:X\.)?(\d+)\.jpg/i.exec(src || "");
  return m ? { project: m[1].toLowerCase(), n: m[2].length > 2 && m[1].toLowerCase() === "rowa" ? m[2].slice(-2) : m[2] } : null;
};

function media(n) {
  const c = code(n);
  const d = (k) => (new RegExp(`data-${k}\\s*=\\s*"([^"]*)"`).exec(c) || [])[1];
  if (n.tag === "Image" && !n.props["data-project"]) {
    const l = legacyStill(n.props.src);
    if (l) return { kind: "still", ...l, ...(n.props.optimize === false ? { optimize: false } : {}) };
  }
  if (n.tag === "Image") return { kind: "still", project: n.props["data-project"], n: String(n.props["data-number"]).trim(), ...(n.props.optimize === false ? { optimize: false } : {}) };
  if (/<video/.test(c) && !d("project")) {
    const l = legacyVideo(c);
    return l && !l.film ? { kind: "video", project: l.project, type: l.type, ...(l.n ? { n: l.n } : {}) } : null;
  }
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
    const m = /\/(\w+)\/video\/\1_((?:master|clip)(?:_\d+)?)_h264\.mp4/.exec(html);
    if (m) return { type: "film", project: m[1], file: m[2] };
    const l = legacyVideo(html);
    return { type: "film", project: l?.project ?? slug, file: l?.film ?? "master_01" };
  }
  if (/ws-external-container/.test(html)) {
    const live = html.replace(/<!--[\s\S]*?-->/g, "");
    const slides = [...live.matchAll(/class="ws-slide"><img([^>]*)>/g)].map((x) => /data-number="(\d+)"/.exec(x[1])?.[1] ?? legacyStill(/src="([^"]+)"/.exec(x[1])[1]).n);
    // the old script padded the track with a clone of the last slide in front
    // and a clone of the first slide at the end; the real frames are in between
    // frames normally belong to this project, but a page may borrow another project's stills
    const owner = /data-project="(\w+)"/.exec(live)?.[1] ?? legacyStill(/src="([^"]+)"/.exec(live)?.[1])?.project ?? slug;
    return { type: "carousel", frames: slides.slice(1, -1), project: owner };
  }
  const stagger = find(div, (x) => x.tag === "StaggerAnimation");
  // text beside media in a plain grid (no stagger): a row with a text cell and a media cell
  const plainGrid = !stagger && find(div, (x) => x.tag === "div" && /^(1fr ){11}1fr$/.test(style(x)["grid-template-columns"] || ""));
  if (plainGrid) {
    const [a, b] = kids(plainGrid);
    const texts = findAll(a, (x) => x.tag === "Text").map((t) => text(t).trim());
    const n = span(style(a));
    if (b && texts.length && n && n < 12) {
      return { type: "row", cells: [{ span: n, media: null, text: texts.join("\n\n") }, { span: 12 - n, media: mediaOf(b) }] };
    }
  }
  if (stagger) {
    const cells = kids(stagger);
    // PROCESS-style full-bleed clip with overlay title
    const h1 = find(stagger, (x) => x.tag === "h1");
    if (h1 && cells.length === 1 && find(cells[0], (x) => /<video/.test(code(x)))) {
      return { type: "feature", title: text(h1), media: mediaOf(cells[0]) };
    }
    const rowSt = style(stagger);
    return {
      type: "row",
      ...(stagger.props.slidingWindow ? { window: stagger.props.slidingWindow } : {}),
      cells: cells.map((c) => {
        const st = style(c);
        const t = find(c, (x) => x.tag === "Text");
        return t ? { span: span(st), media: null, text: text(t).trim() } : { span: span(st), media: mediaOf(c) };
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
  const heroMedia = /data-type="header"/.test(html) ? { kind: "video", project: /data-project="(\w+)"/.exec(html)[1], type: "header" } : !sections.length && !/video-player-container/.test(html) && /<video/.test(html) ? media(findAll(div, (x) => x.tag === "HtmlEmbed")[0]) : null;
  if (heroMedia && find(div, (x) => x.tag === "Text")) {
    const texts = findAll(div, (x) => x.tag === "Text").map(text);
    if (texts.length < 3) { sections.push({ type: "unknown", dump: "hero with <3 texts" }); continue; }
    const intro = texts[1];
    sections.push({
      type: "hero",
      media: heroMedia,
      title: texts[0].trim(),
      intro: intro.split("#").map((s) => s.replace(/\n+/g, " ").trim()).filter(Boolean),
      credit: texts[2].trim(),
    });
    continue;
  }
  // project tiles
  const stagger = find(div, (x) => x.tag === "StaggerAnimation");
  if (stagger && find(stagger, (x) => x.tag === "Link_1") && sections.some((x) => x.type === "aside")) {
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
const meta = fs.readFileSync(path.join(gen, `[projects].[${slug}]._index.server.tsx`), "utf8");
const metaOf = (k) => { const m = new RegExp(`${k}: ("(?:[^"\\\\]|\\\\.)*")`).exec(meta); return m ? JSON.parse(m[1]) : undefined; };
const project = { slug, title: metaOf("title"), description: metaOf("description"), sections: sections.map((s) => ({ id: crypto.randomUUID().replace(/-/g, "").slice(0, 8), ...s })) };
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

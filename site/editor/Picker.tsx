// Media picker panel (dev only): browse the bucket manifest, assign media to the clicked slot,
// set the crop focus of an image, manage carousel frames. Every change goes through commit().
import { useMemo, useRef, useState } from "react";
import manifest from "../content/media-manifest.json";
import { masterUrls, stillUrl, videoUrls } from "../lib/assets";
import { frameAlt, frameN, withFrameAlt, type Project, type Section, type SiteData } from "../lib/schema";
import { itemKey, itemToMedia, mediaToItem, patchTileRow, replaceSection, usedKeys, type Item, type PickTarget } from "./model";

type M = { base: string; projects: Record<string, { stills: string[]; videos: ({ type: "header" } | { type: "master"; file: string } | { type: "clip"; n: string })[] }> };
const MANIFEST = manifest as M;
let lastProject = "";

const thumb = (i: Item) =>
  i.kind === "still" ? stillUrl({ kind: "still", project: i.project, n: i.n })
  : i.kind === "master" ? masterUrls(i.project, i.file).poster
  : videoUrls(i.kind === "header" ? { kind: "video", project: i.project, type: "header" } : { kind: "video", project: i.project, type: "clip", n: i.n }).poster;

const label = (i: Item) => (i.kind === "still" ? i.n : i.kind === "clip" ? `clip ${i.n}` : i.kind === "header" ? "header" : i.file);

type Tab = "stills" | "videos";

function sectionOf(p: Project, t: PickTarget) {
  return p.sections.find((s) => s.id === t.sectionId);
}

/** The slot's current media as an item (film/carousel handled separately). */
function currentItem(s: Section, t: PickTarget): Item | null {
  if (t.kind === "cell" && s.type === "row") return mediaToItem(s.cells[t.index]?.media ?? null);
  if (t.kind === "media" && (s.type === "hero" || s.type === "feature")) return mediaToItem(s.media);
  if (t.kind === "film" && s.type === "film" && s.project) return { kind: "master", project: s.project, file: s.file ?? "master_01" };
  return null;
}

function FocusPicker({ item, value, onChange }: { item: Item; value: string; onChange: (v: string | undefined) => void }) {
  const box = useRef<HTMLDivElement>(null);
  const [x, y] = (value || "50% 50%").split(/\s+/).map((v) => parseFloat(v) || 50);
  const set = (e: React.PointerEvent) => {
    const r = box.current!.getBoundingClientRect();
    const px = Math.round(Math.min(100, Math.max(0, ((e.clientX - r.left) / r.width) * 100)));
    const py = Math.round(Math.min(100, Math.max(0, ((e.clientY - r.top) / r.height) * 100)));
    onChange(px === 50 && py === 50 ? undefined : `${px}% ${py}%`);
  };
  return (
    <div className="cms-focus">
      <div className="cms-focus__head"><span>Crop focus</span><button onClick={() => onChange(undefined)} disabled={!value}>Reset</button></div>
      <div
        ref={box} className="cms-focus__box"
        onPointerDown={(e) => { e.currentTarget.setPointerCapture(e.pointerId); set(e); }}
        onPointerMove={(e) => e.buttons === 1 && set(e)}
      >
        <img src={thumb(item)} alt="" draggable={false} />
        <i style={{ left: `${x}%`, top: `${y}%` }} />
      </div>
      <small>Click or drag: the point stays visible when the cell crops the image.</small>
    </div>
  );
}

export function Picker({ project, site, target, commit, commitSite, onClose }: { project: Project; site: SiteData; target: PickTarget; commit: (p: Project, key?: string) => void; commitSite: (s: SiteData, key?: string) => void; onClose: () => void }) {
  const tileT = target.kind === "tile";
  const shareT = target.kind === "share";
  const section = tileT || shareT ? undefined : sectionOf(project, target);
  const tile = target.kind === "tile" ? site.projectGrid[target.row]?.tiles[target.index] : undefined;
  const isFrames = target.kind === "frames";
  const cur = tileT ? mediaToItem(tile?.media ?? null) : shareT ? mediaToItem(project.image ?? null) : section ? currentItem(section, target) : null;
  const carouselProject = section?.type === "carousel" && section.frames.length ? section.project ?? project.slug : null;

  const names = Object.keys(MANIFEST.projects);
  const [proj, setProj] = useState(() => carouselProject ?? cur?.project ?? (names.includes(lastProject) ? lastProject : names.includes(project.slug) ? project.slug : names[0]));
  const allowed: Tab[] = target.kind === "film" ? ["videos"] : isFrames ? ["stills"] : ["stills", "videos"];
  const [tab, setTab] = useState<Tab>(cur && cur.kind !== "still" ? "videos" : allowed[0]);
  const [only, setOnly] = useState<"all" | "unused">("all");
  const used = useMemo(() => usedKeys(project), [project]);
  if (!section && !tile && !shareT) return null;

  const entry = MANIFEST.projects[proj];
  let items: Item[] = [];
  if (tab === "stills") items = entry.stills.map((n) => ({ kind: "still", project: proj, n }));
  else
    items = entry.videos
      .filter((v) => (target.kind === "film" ? v.type === "master" : v.type !== "master"))
      .map((v): Item => (v.type === "header" ? { kind: "header", project: proj } : v.type === "master" ? { kind: "master", project: proj, file: v.file } : { kind: "clip", project: proj, n: v.n }));
  if (only === "unused") items = items.filter((i) => !used.has(itemKey(i)));

  const frames = section?.type === "carousel" ? section.frames : [];
  const frameProject = section?.type === "carousel" ? section.project ?? project.slug : proj;
  const set = (next: Section, key?: string) => commit(replaceSection(project, next), key);
  const setTileMedia = (m: ReturnType<typeof itemToMedia>) => target.kind === "tile" && commitSite(patchTileRow(site, target.row, (ts) => ts.map((t, j) => (j === target.index ? { ...t, media: m } : t))));

  const assign = (i: Item) => {
    lastProject = i.project;
    if (shareT) commit({ ...project, image: itemToMedia(i) ?? undefined });
    else if (tileT) setTileMedia(itemToMedia(i));
    else if (target.kind === "cell" && section?.type === "row")
      set({ ...section, cells: section.cells.map((c, j) => { if (j !== target.index) return c; const { position, ...rest } = c; void position; return { ...rest, media: itemToMedia(i) }; }) });
    else if (target.kind === "media" && (section?.type === "hero" || section?.type === "feature")) set({ ...section, media: itemToMedia(i) });
    else if (target.kind === "film" && section?.type === "film" && i.kind === "master") set({ ...section, project: i.project, file: i.file });
    else if (isFrames && section?.type === "carousel" && i.kind === "still") {
      const has = section.frames.some((f) => frameN(f) === i.n);
      set({ ...section, project: i.project, frames: has ? section.frames.filter((f) => frameN(f) !== i.n) : [...section.frames, i.n] });
    }
  };
  const clear = () => {
    if (shareT) { const { image, ...rest } = project; void image; commit(rest); }
    else if (tileT) setTileMedia(null);
    else if (target.kind === "cell" && section?.type === "row") set({ ...section, cells: section.cells.map((c, j) => { if (j !== target.index) return c; const { position, ...rest } = c; void position; return { ...rest, media: null }; }) });
    else if (target.kind === "media" && (section?.type === "hero" || section?.type === "feature")) set({ ...section, media: null });
    else if (target.kind === "film" && section?.type === "film") set({ ...section, project: "", file: undefined });
    else if (isFrames && section?.type === "carousel") set({ ...section, frames: [] });
  };
  /** Media object of the slot being edited (for its alt text). */
  const curMedia = tileT ? tile?.media ?? null : shareT ? project.image ?? null
    : section?.type === "row" && target.kind === "cell" ? section.cells[target.index]?.media ?? null
    : section?.type === "hero" || section?.type === "feature" ? section.media : null;
  const setAlt = (alt: string) => {
    if (!curMedia) return;
    const next = (({ alt: _a, ...rest }) => (alt ? { ...rest, alt } : rest))(curMedia) as NonNullable<typeof curMedia>;
    const key = `alt:${JSON.stringify(target)}`;
    if (shareT) commit({ ...project, image: next }, key);
    else if (tileT && target.kind === "tile") commitSite(patchTileRow(site, target.row, (ts) => ts.map((t, j) => (j === target.index ? { ...t, media: next } : t))), key);
    else if (section?.type === "row" && target.kind === "cell") set({ ...section, cells: section.cells.map((c, j) => (j === target.index ? { ...c, media: next } : c)) }, key);
    else if (section?.type === "hero" || section?.type === "feature") set({ ...section, media: next }, key);
  };
  const moveFrame = (i: number, d: -1 | 1) => {
    if (section?.type !== "carousel") return;
    const f = [...section.frames]; const j = i + d;
    if (j < 0 || j >= f.length) return;
    [f[i], f[j]] = [f[j], f[i]];
    set({ ...section, frames: f });
  };

  const isOn = (i: Item) => (isFrames ? i.kind === "still" && frames.some((f) => frameN(f) === i.n) && frameProject === i.project : cur && itemKey(cur) === itemKey(i));
  const cell = target.kind === "cell" && section?.type === "row" ? section.cells[target.index] : null;

  return (
    <aside className="cms-panel cms-picker" aria-label="Media picker">
      <header>
        <h2>{isFrames ? "Carousel frames" : target.kind === "film" ? "Choose film" : shareT ? "Share image" : "Choose media"}</h2>
        <button onClick={onClose} aria-label="Close picker">✕</button>
      </header>

      <div className="cms-picker__row">
        <select value={proj} disabled={!!carouselProject} title={carouselProject ? "A carousel uses frames of one project" : undefined} onChange={(e) => setProj(e.target.value)}>
          {names.map((n) => <option key={n} value={n}>{n}{n === project.slug ? " (this page)" : ""}</option>)}
        </select>
        <span className="cms-seg">
          {allowed.map((t) => <button key={t} aria-pressed={tab === t} onClick={() => setTab(t)}>{t === "stills" ? "Stills" : "Videos"}</button>)}
        </span>
        <label className="cms-check"><input type="checkbox" checked={only === "unused"} onChange={(e) => setOnly(e.target.checked ? "unused" : "all")} /> Unused only</label>
      </div>

      {isFrames && (
        <div className="cms-frames">
          <div className="cms-frames__head"><span>{frames.length} frame{frames.length === 1 ? "" : "s"} in order</span><button onClick={clear} disabled={!frames.length}>Clear all</button></div>
          {frames.map((f, i) => (
            <div key={frameN(f)} className="cms-frames__item">
              <img src={thumb({ kind: "still", project: frameProject, n: frameN(f) })} alt="" loading="lazy" />
              <span>{frameN(f)}</span>
              <button onClick={() => moveFrame(i, -1)} disabled={i === 0} title="Earlier">↑</button>
              <button onClick={() => moveFrame(i, 1)} disabled={i === frames.length - 1} title="Later">↓</button>
              <button onClick={() => set({ ...section, frames: frames.filter((_, j) => j !== i) } as Section)} title="Remove">×</button>
              <input
                className="cms-frames__alt" value={frameAlt(f) ?? ""} placeholder="Alt text for this frame" aria-label={`Alt text for frame ${frameN(f)}`}
                onChange={(e) => set({ ...section, frames: frames.map((x, j) => (j === i ? withFrameAlt(x, e.target.value) : x)) } as Section, `${section!.id}:falt${i}`)}
              />
            </div>
          ))}
        </div>
      )}

      {!isFrames && cur && (
        <div className="cms-picker__current">
          <span>Now: {cur.project} · {label(cur)}</span>
          <button onClick={clear}>Clear slot</button>
        </div>
      )}
      {curMedia && !isFrames && (
        <label className="cms-alt">
          Alt text <small>(what the image shows, for screen readers and search)</small>
          <input value={curMedia.alt ?? ""} placeholder="e.g. Heat pump node on a rooftop at dusk" onChange={(e) => setAlt(e.target.value)} />
        </label>
      )}
      {cell && cur && (cur.kind === "still" || cur.kind === "clip" || cur.kind === "header") && target.kind === "cell" && section?.type === "row" && (
        <FocusPicker
          item={cur} value={cell.position ?? ""}
          onChange={(v) => set({ ...section, cells: section.cells.map((c, j) => { if (j !== target.index) return c; const { position, ...rest } = c; void position; return v ? { ...rest, position: v } : rest; }) }, `${section.id}:pos${target.index}`)}
        />
      )}

      <div className="cms-picker__grid">
        {items.map((i) => (
          <button key={itemKey(i)} className={`cms-thumb ${isOn(i) ? "is-on" : ""}`} onClick={() => assign(i)} title={`${i.project} · ${label(i)}`}>
            <img src={thumb(i)} alt="" loading="lazy" decoding="async" />
            <span>{label(i)}</span>
            {used.has(itemKey(i)) && <b title="Already used on this page">used</b>}
          </button>
        ))}
        {!items.length && <p className="cms-picker__none">Nothing here{only === "unused" ? " (everything is already used)" : ""}.</p>}
      </div>
    </aside>
  );
}

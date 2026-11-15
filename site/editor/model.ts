// Pure content operations for the editor: section catalog, row presets, insert/move/duplicate/
// delete, empty-slot counting. No React here, so everything is easy to reason about.
import { newId, type Cell, type Project, type Section, type SiteData, type Tile } from "../lib/schema";

export type RowPreset = { label: string; spans: number[] };

/** Quick layouts for rows. Spans can always be edited per cell afterwards. */
export const ROW_PRESETS: RowPreset[] = [
  { label: "4 + 8", spans: [4, 8] },
  { label: "8 + 4", spans: [8, 4] },
  { label: "6 + 6", spans: [6, 6] },
  { label: "4 + 4 + 4", spans: [4, 4, 4] },
  { label: "3 + 3 + 3 + 3", spans: [3, 3, 3, 3] },
  { label: "6 × 4 (two lines)", spans: [4, 4, 4, 4, 4, 4] },
  { label: "Full 12", spans: [12] },
  { label: "5 + 7", spans: [5, 7] },
  { label: "7 + 5", spans: [7, 5] },
];

const emptyCell = (span: number): Cell => ({ span, media: null });

export type CatalogEntry = { key: string; label: string; group: "Row" | "Section"; make: (slug: string) => Section };

export const CATALOG: CatalogEntry[] = [
  ...ROW_PRESETS.map((p): CatalogEntry => ({
    key: `row:${p.label}`, label: p.label, group: "Row",
    make: () => ({ id: newId(), type: "row", cells: p.spans.map(emptyCell) }),
  })),
  { key: "statement", label: "Statement", group: "Section", make: () => ({ id: newId(), type: "statement", from: 3, to: 10, align: "center", text: "" }) },
  { key: "feature", label: "Feature (full-bleed clip + title)", group: "Section", make: () => ({ id: newId(), type: "feature", title: "", media: null }) },
  { key: "carousel", label: "Carousel", group: "Section", make: (slug) => ({ id: newId(), type: "carousel", project: slug, frames: [] }) },
  { key: "film", label: "Film player", group: "Section", make: () => ({ id: newId(), type: "film", project: "" }) },
  { key: "closing", label: "Closing line", group: "Section", make: () => ({ id: newId(), type: "closing", text: "" }) },
  { key: "aside", label: "Aside", group: "Section", make: () => ({ id: newId(), type: "aside", text: "" }) },
];

/** One hero and one credits table per page: those cannot be inserted or duplicated. */
export const isSingleton = (s: Section) => s.type === "hero" || s.type === "credits";

const withSections = (p: Project, sections: Section[]): Project => ({ ...p, sections });

export const insertSection = (p: Project, at: number, s: Section) =>
  withSections(p, [...p.sections.slice(0, at), s, ...p.sections.slice(at)]);

export const removeSection = (p: Project, id: string) => withSections(p, p.sections.filter((s) => s.id !== id));

export function moveSection(p: Project, id: string, dir: -1 | 1): Project {
  const i = p.sections.findIndex((s) => s.id === id);
  const j = i + dir;
  if (i < 0 || j < 0 || j >= p.sections.length) return p;
  const next = [...p.sections];
  [next[i], next[j]] = [next[j], next[i]];
  return withSections(p, next);
}

export function duplicateSection(p: Project, id: string): { project: Project; copyId: string } | null {
  const i = p.sections.findIndex((s) => s.id === id);
  if (i < 0 || isSingleton(p.sections[i])) return null;
  const copy = { ...structuredClone(p.sections[i]), id: newId() } as Section;
  return { project: insertSection(p, i + 1, copy), copyId: copy.id };
}

export const replaceSection = (p: Project, s: Section) => withSections(p, p.sections.map((x) => (x.id === s.id ? s : x)));

export const rowSum = (cells: Cell[]) => cells.reduce((n, c) => n + c.span, 0);

/** Slots that still wait for media (they render nothing on the live site). */
export function countEmpty(p: Project): number {
  let n = 0;
  for (const s of p.sections) {
    if (s.type === "row") n += s.cells.filter((c) => !c.media).length;
    else if (s.type === "hero" || s.type === "feature") n += s.media ? 0 : 1;
    else if (s.type === "film") n += s.project ? 0 : 1;
    else if (s.type === "carousel") n += s.frames.length ? 0 : 1;
  }
  return n;
}

export const clampSpan = (n: number) => Math.min(12, Math.max(1, Math.round(Number.isFinite(n) ? n : 1)));

// ── media picking ─────────────────────────────────────────────────────────

export type PickTarget =
  | { sectionId: string; kind: "cell"; index: number }
  | { sectionId: string; kind: "media" } // hero, feature
  | { sectionId: string; kind: "film" }
  | { sectionId: string; kind: "frames" } // carousel
  | { sectionId: string; kind: "tile"; row: number; index: number }; // project-grid tile (sectionId unused)

import type { Media } from "../lib/schema";

/** What a media item is, independent of where it is used. Used for "used on this page" markers. */
export type Item =
  | { kind: "still"; project: string; n: string }
  | { kind: "clip"; project: string; n: string }
  | { kind: "header"; project: string }
  | { kind: "master"; project: string; file: string };

export const itemKey = (i: Item) =>
  i.kind === "still" ? `s:${i.project}:${i.n}` : i.kind === "clip" ? `c:${i.project}:${i.n}` : i.kind === "header" ? `h:${i.project}` : `m:${i.project}:${i.file}`;

export function mediaToItem(m: Media | null): Item | null {
  if (!m) return null;
  if (m.kind === "still") return { kind: "still", project: m.project, n: m.n };
  if (m.type === "clip") return { kind: "clip", project: m.project, n: m.n ?? "" };
  if (m.type === "header") return { kind: "header", project: m.project };
  return { kind: "master", project: m.project, file: m.n ?? "master_01" };
}

export function itemToMedia(i: Item): Media | null {
  if (i.kind === "still") return { kind: "still", project: i.project, n: i.n };
  if (i.kind === "clip") return { kind: "video", project: i.project, type: "clip", n: i.n };
  if (i.kind === "header") return { kind: "video", project: i.project, type: "header" };
  return null;
}

/** Everything this page already shows, as item keys. */
export function usedKeys(p: Project): Set<string> {
  const used = new Set<string>();
  const add = (m: Media | null) => { const i = mediaToItem(m); if (i) used.add(itemKey(i)); };
  for (const s of p.sections) {
    if (s.type === "row") s.cells.forEach((c) => add(c.media));
    else if (s.type === "hero" || s.type === "feature") add(s.media);
    else if (s.type === "film" && s.project) used.add(itemKey({ kind: "master", project: s.project, file: s.file ?? "master_01" }));
    else if (s.type === "carousel") s.frames.forEach((n) => used.add(itemKey({ kind: "still", project: s.project ?? p.slug, n })));
  }
  return used;
}

// ── site data (project grid, footer) ─────────────────────────────────────

type Grid = SiteData["projectGrid"];
const withGrid = (s: SiteData, projectGrid: Grid): SiteData => ({ ...s, projectGrid });

export const emptyTile = (span: number): Tile => ({ span, title: [""], media: null });

export const insertTileRow = (s: SiteData, at: number, spans: number[]) =>
  withGrid(s, [...s.projectGrid.slice(0, at), { tiles: spans.map(emptyTile) }, ...s.projectGrid.slice(at)]);
export const removeTileRow = (s: SiteData, row: number) => withGrid(s, s.projectGrid.filter((_, i) => i !== row));
export function moveTileRow(s: SiteData, row: number, dir: -1 | 1) {
  const j = row + dir;
  if (j < 0 || j >= s.projectGrid.length) return s;
  const g = [...s.projectGrid];
  [g[row], g[j]] = [g[j], g[row]];
  return withGrid(s, g);
}
export const patchTileRow = (s: SiteData, row: number, f: (tiles: Tile[]) => Tile[]) =>
  withGrid(s, s.projectGrid.map((r, i) => (i === row ? { ...r, tiles: f(r.tiles) } : r)));

export const countEmptyTiles = (s: SiteData) => s.projectGrid.reduce((n, r) => n + r.tiles.filter((t) => !t.media).length, 0);

// The shared site data in edit mode: the project grid under the page and the footer, drawn with
// the same TileRow / FooterView the site uses plus editing chrome. Saved to site.json.
import { Fragment, useMemo } from "react";
import { createPortal } from "react-dom";
import type { Project, SiteData } from "../lib/schema";
import { FooterView, TileRow, type SiteEdit } from "../components/Sections";
import { Text } from "./Text";
import { Inserter, NumberField, type MenuGroup } from "./EditableSections";
import { ROW_PRESETS, emptyTile, insertTileRow, moveTileRow, patchTileRow, removeTileRow } from "./model";
import type { PickTarget } from "./model";

type Props = {
  project: Project;
  site: SiteData;
  commitSite: (s: SiteData, key?: string) => void;
  slots: { tiles: HTMLElement | null; footer: HTMLElement | null };
  pick: (t: PickTarget) => void;
};

const sumOf = (ts: { span: number }[]) => ts.reduce((n, t) => n + t.span, 0);

const ROW_MENU: MenuGroup[] = [{ head: "Tile rows", items: ROW_PRESETS.map((p) => ({ key: p.label, label: p.label })) }];

export function EditableSite({ site, commitSite, slots, pick }: Props) {
  const edit: SiteEdit = useMemo(() => ({
    Text,
    update: commitSite,
    tile: (row, index) => {
      const t = site.projectGrid[row].tiles[index];
      const patch = (p: Partial<typeof t>, key?: string) => commitSite(patchTileRow(site, row, (ts) => ts.map((x, j) => (j === index ? { ...x, ...p } : x))), key);
      return (
        <>
          <button className="cms cms-slot" aria-label="Choose media" onClick={() => pick({ sectionId: "site", kind: "tile", row, index })}><span>{t.media ? "Change media" : "Choose media"}</span></button>
          <div className="cms cms-chip cms-chip--tile" onMouseDown={(e) => e.stopPropagation()}>
            <NumberField label="Span (1–12)" value={t.span} onChange={(n) => patch({ span: n }, `tile${row}.${index}:span`)} />
            <input
              className="cms-in" value={t.href ?? ""} placeholder="/projects/…" aria-label="Link" title="Where the tile links to"
              onChange={(e) => { const { href, ...rest } = t; void href; commitSite(patchTileRow(site, row, (ts) => ts.map((x, j) => (j === index ? (e.target.value ? { ...rest, href: e.target.value } : rest) : x))), `tile${row}.${index}:href`); }}
            />
            <button title={t.titleAlign === "start" ? "Title at the start" : "Title at the end"} aria-pressed={t.titleAlign === "start"} onClick={() => { const { titleAlign, ...rest } = t; void titleAlign; commitSite(patchTileRow(site, row, (ts) => ts.map((x, j) => (j === index ? (t.titleAlign === "start" ? rest : { ...rest, titleAlign: "start" as const }) : x)))); }}>⇤</button>
            <button title="Remove tile" disabled={site.projectGrid[row].tiles.length < 2} onClick={() => commitSite(patchTileRow(site, row, (ts) => ts.filter((_, j) => j !== index)))}>×</button>
          </div>
        </>
      );
    },
    link: (i) => (
      <span className="cms cms-chip cms-chip--link" onMouseDown={(e) => e.stopPropagation()}>
        <input
          className="cms-in cms-in--wide" value={site.footer.contact.links[i].href} placeholder="https:// or mailto:" aria-label="Link address"
          onChange={(e) => commitSite({ ...site, footer: { ...site.footer, contact: { ...site.footer.contact, links: site.footer.contact.links.map((x, j) => (j === i ? { ...x, href: e.target.value } : x)) } } }, `footer:lh${i}`)}
        />
        <button title="Remove link" onClick={() => commitSite({ ...site, footer: { ...site.footer, contact: { ...site.footer.contact, links: site.footer.contact.links.filter((_, j) => j !== i) } } })}>×</button>
      </span>
    ),
    addLink: () => (
      <button className="cms cms-credit-add" onClick={() => commitSite({ ...site, footer: { ...site.footer, contact: { ...site.footer.contact, links: [...site.footer.contact.links, { href: "", label: "" }] } } })}>+ Link</button>
    ),
  }), [site, commitSite, pick]);

  const rows = site.projectGrid;
  return (
    <>
      {slots.tiles && createPortal(
        <>
          <Inserter index={0} groups={ROW_MENU} onPick={(at, key) => commitSite(insertTileRow(site, at, ROW_PRESETS.find((p) => p.label === key)!.spans))} />
          {rows.map((row, r) => (
            <Fragment key={r}>
              <div className="cms-sec" data-section="tiles">
                <TileRow row={row} rowIndex={r} site={site} edit={edit} />
                <div className="cms cms-bar" onMouseDown={(e) => e.stopPropagation()}>
                  <span className="cms-bar__type">Project tiles</span>
                  <button onClick={() => commitSite(patchTileRow(site, r, (ts) => [...ts, emptyTile(sumOf(ts) < 12 ? 12 - sumOf(ts) : 4)]))}>+ Tile</button>
                  <span className="cms-bar__sep" />
                  <button onClick={() => commitSite(moveTileRow(site, r, -1))} disabled={r === 0} title="Move up">↑</button>
                  <button onClick={() => commitSite(moveTileRow(site, r, 1))} disabled={r === rows.length - 1} title="Move down">↓</button>
                  <button className="cms-danger" title="Delete row" onClick={() => commitSite(removeTileRow(site, r))}>🗑</button>
                </div>
              </div>
              <Inserter index={r + 1} groups={ROW_MENU} onPick={(at, key) => commitSite(insertTileRow(site, at, ROW_PRESETS.find((p) => p.label === key)!.spans))} />
            </Fragment>
          ))}
        </>,
        slots.tiles,
      )}
      {slots.footer && createPortal(<div className="cms-sec" data-section="footer"><FooterView footer={site.footer} site={site} edit={edit} /></div>, slots.footer)}
    </>
  );
}

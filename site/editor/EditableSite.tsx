// The shared site data in edit mode: the project grid under the page and the footer, drawn with
// the same TileRow / FooterView the site uses plus editing chrome. Saved to site.json.
import { Fragment, useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import type { Project, SiteData } from "../lib/schema";
import { ClosingView, FooterView, TileRow, type SiteEdit } from "../components/Sections";
import { Text } from "./Text";
import { Inserter, NumberField, type MenuGroup } from "./EditableSections";
import { ROW_PRESETS, emptyTile, insertTileRow, moveTileRow, patchTileRow, removeTileRow } from "./model";
import type { PickTarget } from "./model";
import { pages, projects } from "../lib/content";

/** Every internal page a tile can link to. */
const PAGE_LINKS = [
  ...Object.values(pages).map((p) => ({ href: p.slug === "home" ? "/" : `/${p.slug}`, label: p.slug })),
  ...Object.values(projects).map((p) => ({ href: `/projects/${p.slug}`, label: p.title ?? p.slug })),
];

/** Link input that lists the site's pages when focused (typing filters; any other address can still be typed). */
function LinkField({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  const [box, setBox] = useState<DOMRect | null>(null);
  const [typed, setTyped] = useState(false);
  const input = useRef<HTMLInputElement>(null);
  // the list follows the field while the page scrolls or resizes
  useEffect(() => {
    if (!box) return;
    const follow = () => input.current && setBox(input.current.getBoundingClientRect());
    window.addEventListener("scroll", follow, true);
    window.addEventListener("resize", follow);
    return () => { window.removeEventListener("scroll", follow, true); window.removeEventListener("resize", follow); };
  }, [!!box]); // eslint-disable-line react-hooks/exhaustive-deps
  const q = typed ? value.toLowerCase() : "";
  const shown = PAGE_LINKS.filter((l) => !q || l.href.toLowerCase().includes(q) || l.label.toLowerCase().includes(q));
  return (
    <>
      <input
        ref={input} className="cms-in" value={value} placeholder="/projects/…" aria-label="Link" title="Where the tile links to"
        onFocus={(e) => { setTyped(false); setBox(e.currentTarget.getBoundingClientRect()); }}
        onBlur={() => setBox(null)}
        onChange={(e) => { setTyped(true); onChange(e.target.value); }}
      />
      {box && shown.length > 0 && (
        <ul className="cms-links" style={{ left: box.left, top: box.bottom + 4 }}>
          {shown.map((l) => (
            // mousedown (not click) so it lands before the input loses focus
            <li key={l.href}><button onMouseDown={(e) => { e.preventDefault(); onChange(l.href); setBox(null); }}><span>{l.label}</span><small>{l.href}</small></button></li>
          ))}
        </ul>
      )}
    </>
  );
}

type Props = {
  project: Project;
  site: SiteData;
  commitSite: (s: SiteData, key?: string) => void;
  slots: { closing: HTMLElement | null; tiles: HTMLElement | null; footer: HTMLElement | null };
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
            <LinkField
              value={t.href ?? ""}
              onChange={(v) => { const { href, ...rest } = t; void href; commitSite(patchTileRow(site, row, (ts) => ts.map((x, j) => (j === index ? (v ? { ...rest, href: v } : rest) : x))), `tile${row}.${index}:href`); }}
            />
            <button title={t.titleAlign === "start" ? "Title at the start" : "Title at the end"} aria-pressed={t.titleAlign === "start"} onClick={() => { const { titleAlign, ...rest } = t; void titleAlign; commitSite(patchTileRow(site, row, (ts) => ts.map((x, j) => (j === index ? (t.titleAlign === "start" ? rest : { ...rest, titleAlign: "start" as const }) : x)))); }}>⇤</button>
            <button title="Remove tile" disabled={site.projectGrid[row].tiles.length < 2} onClick={() => commitSite(patchTileRow(site, row, (ts) => ts.filter((_, j) => j !== index)))}>×</button>
          </div>
        </>
      );
    },
    closingLink: () => (
      <>
        {site.closing.link ? (
          <>
            <input className="cms-in cms-in--wide" value={site.closing.link.href} placeholder="https:// or mailto:" aria-label="Link address" onChange={(e) => commitSite({ ...site, closing: { ...site.closing, link: { ...site.closing.link!, href: e.target.value } } }, "closing:lh")} />
            <button title="Remove link" onClick={() => { const { link, ...rest } = site.closing; void link; commitSite({ ...site, closing: rest }); }}>No link</button>
          </>
        ) : (
          <button onClick={() => commitSite({ ...site, closing: { ...site.closing, link: { href: "", label: "" } } })}>+ Link</button>
        )}
      </>
    ),
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
      {slots.closing && createPortal(
        <div className="cms-sec" data-section="closing">
          <ClosingView closing={site.closing} site={site} edit={edit} />
          <div className="cms cms-bar" onMouseDown={(e) => e.stopPropagation()}>
            <span className="cms-bar__type">Closing (all pages)</span>
            {edit.closingLink()}
          </div>
        </div>,
        slots.closing,
      )}
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

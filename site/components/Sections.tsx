import type { ComponentType, CSSProperties, ReactNode } from "react";
import type { Cell, Section, SiteData, Tile } from "../lib/types";
import { MediaView } from "./Media";
import { Player } from "./Player";
import { Carousel } from "./Carousel";

/** `**bold**` and line breaks in content strings. */
export function inline(text: string): ReactNode {
  return text.split("\n").flatMap((line, i) => {
    const parts = line.split(/\*\*(.+?)\*\*/g).map((p, j) => (j % 2 ? <b key={j}>{p}</b> : p));
    return i ? [<br key={`br${i}`} />, ...parts] : parts;
  });
}

const vars = (o: Record<string, string | number>) => o as CSSProperties;

/** Props of the editor's text field (implemented in editor/, passed in through `SectionEdit`). */
export type TextProps = {
  as?: "h1" | "p" | "div" | "span" | "dt" | "dd" | "em";
  className?: string;
  value: string;
  onChange: (v: string) => void;
  /** "rich": `**bold**` + line breaks like inline(); "plain": text only */
  format: "rich" | "plain";
  multiline?: boolean;
  placeholder: string;
  /** Enter in a paragraph list: split / remove */
  onEnter?: (caret: number) => void;
  onBackspaceEmpty?: () => void;
};

/**
 * Hooks the dev editor passes in so sections can be edited in place. It is never set in
 * the site itself (off / preview), where SectionView renders exactly as before.
 */
export type SectionEdit = {
  Text: ComponentType<TextProps>;
  update: (next: Section, coalesceKey?: string) => void;
  /** controls drawn inside a row cell */
  cell: (section: Section, index: number) => ReactNode;
  /** placeholder drawn instead of a section that has no media yet (film, carousel) */
  empty: (section: Section, label: string) => ReactNode;
  /** click-to-choose overlay for a section's single media slot (hero, feature) */
  mediaSlot: (section: Section) => ReactNode;
  /** small add/remove controls for the credits table */
  creditControls: (section: Section, index: number) => ReactNode;
  addCredit: (section: Section) => ReactNode;
};

/** Hooks for editing the shared site data (project grid, footer) in place; dev editor only. */
export type SiteEdit = {
  Text: ComponentType<TextProps>;
  update: (next: SiteData, key?: string) => void;
  /** controls drawn inside a tile */
  tile: (row: number, index: number) => ReactNode;
  /** controls for the closing line's link */
  closingLink: () => ReactNode;
  /** controls for one footer link / adding a link */
  link: (index: number) => ReactNode;
  addLink: () => ReactNode;
};

function CellView({ cell, hover, children, onText, Text: T }: { cell: Cell; hover?: boolean; children?: ReactNode; onText?: (v: string) => void; Text?: ComponentType<TextProps> }) {
  const style = vars({ "--span": cell.span, ...(cell.position ? { "--pos": cell.position } : {}) });
  if (cell.text !== undefined)
    return (
      <div className="cell cell--text" style={style}>
        <div className="cell__text" data-reveal={T ? undefined : "text"}>
          {T && onText ? <T as="p" value={cell.text} format="rich" multiline placeholder="Text" onChange={onText} /> : <p>{inline(cell.text)}</p>}
        </div>
        {children}
      </div>
    );
  return (
    <div className="cell" style={style}>
      <MediaView media={cell.media} hover={hover} />
      {children}
    </div>
  );
}

/** `slug` is the page's own project: the fallback for carousels that name no project. */
export function SectionView({ section, edit, slug }: { section: Section; edit?: SectionEdit; slug: string }) {
  const T = edit?.Text;
  const key = (f: string) => `${section.id}:${f}`;
  const set = (patch: Record<string, unknown>, f: string) => edit!.update({ ...section, ...patch } as Section, key(f));
  switch (section.type) {
    case "hero":
      return (
        <section className="hero">
          <div className="hero__media">
            <MediaView media={section.media} resume />
            {edit?.mediaSlot(section)}
          </div>
          <div className="hero__text">
            {T ? (
              <T as="h1" className="hero__title" value={section.title} format="rich" multiline placeholder="Title" onChange={(v) => set({ title: v }, "title")} />
            ) : (
              <h1 className="hero__title" data-reveal="load">{inline(section.title)}</h1>
            )}
            <div>
              <div className="hero__intro" data-reveal={edit ? undefined : "load"}>
                {section.intro.map((p, i) =>
                  T ? (
                    <T
                      key={i} as="p" value={p} format="plain" placeholder="Intro paragraph"
                      onChange={(v) => set({ intro: section.intro.map((x, j) => (j === i ? v : x)) }, `intro${i}`)}
                      onEnter={(at) => edit!.update({ ...section, intro: [...section.intro.slice(0, i), p.slice(0, at), p.slice(at), ...section.intro.slice(i + 1)] })}
                      onBackspaceEmpty={() => section.intro.length > 1 && edit!.update({ ...section, intro: section.intro.filter((_, j) => j !== i) })}
                    />
                  ) : <p key={i}>{p}</p>,
                )}
              </div>
              {T ? (
                <T as="div" className="hero__credit" value={section.credit} format="rich" placeholder="Credit line" onChange={(v) => set({ credit: v }, "credit")} />
              ) : section.credit ? (
                <div className="hero__credit" data-reveal="load-fade">{inline(section.credit)}</div>
              ) : null}
            </div>
          </div>
        </section>
      );
    case "film":
      if (!section.project) return edit ? edit.empty(section, "Film — empty") : null;
      return (
        <section className="film" data-reveal="fade">
          <div className="film__inner">
            <Player key={`${section.project}/${section.file}`} project={section.project} file={section.file} />
          </div>
        </section>
      );
    case "credits":
      return (
        <div className="credits-wrap" data-reveal="fade">
          <dl className="credits">
            {section.items.map((it, i) => {
              const last = i === section.items.length - 1;
              const span = last ? 4 : it.label === "Creative Direction" || it.label === "Producer" ? 2 : 1;
              return (
                <div className={`credit ${last ? "credit--end" : ""}`} style={vars({ "--credit-span": span })} key={T ? i : it.label}>
                  {T ? (
                    <>
                      <T as="dt" value={it.label} format="plain" placeholder="Label" onChange={(v) => set({ items: section.items.map((x, j) => (j === i ? { ...x, label: v } : x)) }, `cl${i}`)} />
                      <T
                        as="dd" value={it.value.join(", ")} format="plain" placeholder="Value, value"
                        onChange={(v) => set({ items: section.items.map((x, j) => (j === i ? { ...x, value: v.split(",").map((s) => s.trim()).filter(Boolean) } : x)) }, `cv${i}`)}
                      />
                      {edit!.creditControls(section, i)}
                    </>
                  ) : (
                    <>
                      <dt>{it.label}</dt>
                      <dd>{it.value.map((v, j) => <span key={j}>{j ? <>, </> : null}{v}</span>)}</dd>
                    </>
                  )}
                </div>
              );
            })}
            {edit?.addCredit(section)}
          </dl>
        </div>
      );
    case "statement":
      return (
        <div className={`statement statement--${section.align}`}>
          <div className="statement__text" data-reveal="text" style={vars({ "--from": section.from, "--to": section.to + 1 })}>
            {T ? (
              <T as="p" value={section.text} format="rich" multiline placeholder="Statement" onChange={(v) => set({ text: v }, "text")} />
            ) : (
              <p>{inline(section.text)}</p>
            )}
          </div>
        </div>
      );
    case "carousel":
      if (!section.frames.length) return edit ? edit.empty(section, "Carousel — no frames yet") : null;
      return <Carousel project={section.project ?? slug} frames={section.frames} />;
    case "row":
      return (
        <div className={`row ${section.compact ? "row--compact" : ""}`} data-reveal="cells">
          <div className="row__grid">
            {section.cells.map((c, i) => (
              <CellView
                key={i} cell={c} Text={T}
                onText={(v) => edit!.update({ ...section, cells: section.cells.map((x, j) => (j === i ? { ...x, text: v } : x)) }, key(`cell${i}`))}
              >
                {edit?.cell(section, i)}
              </CellView>
            ))}
          </div>
        </div>
      );
    case "reel":
      return (
        <section className="reel" data-reveal="fade">
          <MediaView media={section.media} />
          {edit?.mediaSlot(section)}
        </section>
      );
    case "feature":
      return (
        <section className="feature" data-reveal="fade">
          <div className="feature__overlay">
            {T ? (
              <T as="h1" className="feature__title" value={section.title} format="plain" placeholder="Title" onChange={(v) => set({ title: v }, "title")} />
            ) : (
              <h1 className="feature__title">{section.title}</h1>
            )}
          </div>
          <MediaView media={section.media} />
          {edit?.mediaSlot(section)}
        </section>
      );
  }
}

/** The contact blurb every page closes with (site.json `closing`), drawn above the project grid. */
export function ClosingView({ closing, site, edit }: { closing: SiteData["closing"]; site?: SiteData; edit?: SiteEdit }) {
  const T = edit?.Text;
  const set = (next: SiteData["closing"], key: string) => edit!.update({ ...site!, closing: next }, `closing:${key}`);
  return (
    <>
      <div className="closing" data-reveal={edit ? undefined : "text"}>
        <p style={{ margin: "0 0 2rem" }}>
          {T ? <T as="span" value={closing.text} format="rich" multiline placeholder="Closing line" onChange={(v) => set({ ...closing, text: v }, "text")} /> : inline(closing.text)}
          {closing.link && (
            <>
              <br />
              {T ? <T as="span" value={closing.link.label} format="plain" placeholder="Link text" onChange={(v) => set({ ...closing, link: { ...closing.link!, label: v } }, "ll")} /> : <a href={closing.link.href}>{closing.link.label}</a>}
            </>
          )}
        </p>
      </div>
      <div className="aside" data-reveal={edit ? undefined : "text"}>
        <p style={{ margin: 0 }}>
          {T ? <T as="em" value={closing.aside} format="plain" placeholder="Aside" onChange={(v) => set({ ...closing, aside: v }, "aside")} /> : <em>{closing.aside}</em>}
        </p>
      </div>
    </>
  );
}

export function TileRow({ row, rowIndex = 0, site, edit }: { row: { window?: number; tiles: Tile[] }; rowIndex?: number; site?: SiteData; edit?: SiteEdit }) {
  const T = edit?.Text;
  return (
    <div className="row tiles" data-reveal="cells">
      <div className="row__grid">
        {row.tiles.map((t, i) => {
          const setTile = (patch: Partial<Tile>, key: string) =>
            edit!.update(
              { ...site!, projectGrid: site!.projectGrid.map((r, ri) => (ri !== rowIndex ? r : { ...r, tiles: r.tiles.map((x, ti) => (ti === i ? { ...x, ...patch } : x)) })) },
              `tile${rowIndex}.${i}:${key}`,
            );
          const body = (
            <>
              <div className="tile__overlay">
                {T ? (
                  <T
                    as="h1" className={`tile__title ${t.titleAlign === "start" ? "tile__title--start" : ""}`} value={t.title.join("\n")} format="plain" multiline placeholder="TITLE"
                    onChange={(v) => setTile({ title: v.split("\n") }, "title")}
                  />
                ) : (
                  <h1 className={`tile__title ${t.titleAlign === "start" ? "tile__title--start" : ""}`}>
                    {t.title.map((l, j) => <span key={j}>{j ? <br /> : null}{l}</span>)}
                  </h1>
                )}
              </div>
              <MediaView media={t.media} hover />
              {edit?.tile(rowIndex, i)}
            </>
          );
          const props = { className: "tile", style: vars({ "--span": t.span }) };
          return t.href && !edit ? <a key={i} href={t.href} {...props}>{body}</a> : <div key={i} {...props}>{body}</div>;
        })}
      </div>
    </div>
  );
}

export function FooterView({ footer, site, edit }: { footer: SiteData["footer"]; site?: SiteData; edit?: SiteEdit }) {
  const T = edit?.Text;
  const set = (next: SiteData["footer"], key: string) => edit!.update({ ...site!, footer: next }, `footer:${key}`);
  return (
    <section className="footer">
      <div className="footer__grid">
        <div className="footer__col">
          <div className="footer__head">
            {T ? <T as="span" value={footer.contact.heading} format="plain" placeholder="Heading" onChange={(v) => set({ ...footer, contact: { ...footer.contact, heading: v } }, "ch")} /> : <span>{footer.contact.heading}</span>}
            <hr />
          </div>
          <div className="footer__links">
            {footer.contact.links.map((l, i) =>
              T ? (
                <a key={i} href={l.href || undefined}>
                  <T as="span" value={l.label} format="plain" placeholder="Link text" onChange={(v) => set({ ...footer, contact: { ...footer.contact, links: footer.contact.links.map((x, j) => (j === i ? { ...x, label: v } : x)) } }, `ll${i}`)} />
                  {edit!.link(i)}
                </a>
              ) : <a key={l.href} href={l.href} target="_blank" rel="noreferrer">{l.label}</a>,
            )}
            {edit?.addLink()}
          </div>
        </div>
        <div className="footer__col">
          <div className="footer__head">
            {T ? <T as="span" value={footer.philosophy.heading} format="plain" placeholder="Heading" onChange={(v) => set({ ...footer, philosophy: { ...footer.philosophy, heading: v } }, "ph")} /> : <span>{footer.philosophy.heading}</span>}
            <hr />
          </div>
          <div className="footer__text">
            {footer.philosophy.paragraphs.map((p, i) =>
              T ? (
                <T
                  key={i} as="p" value={p} format="plain" placeholder="Paragraph"
                  onChange={(v) => set({ ...footer, philosophy: { ...footer.philosophy, paragraphs: footer.philosophy.paragraphs.map((x, j) => (j === i ? v : x)) } }, `pp${i}`)}
                  onEnter={(at) => set({ ...footer, philosophy: { ...footer.philosophy, paragraphs: [...footer.philosophy.paragraphs.slice(0, i), p.slice(0, at), p.slice(at), ...footer.philosophy.paragraphs.slice(i + 1)] } }, `pe${i}`)}
                  onBackspaceEmpty={() => footer.philosophy.paragraphs.length > 1 && set({ ...footer, philosophy: { ...footer.philosophy, paragraphs: footer.philosophy.paragraphs.filter((_, j) => j !== i) } }, `pd${i}`)}
                />
              ) : <p key={i}>{p}</p>,
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

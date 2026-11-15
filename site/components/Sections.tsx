import type { ComponentType, CSSProperties, ReactNode } from "react";
import type { Cell, Section, Tile } from "../lib/types";
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
  onEnter?: () => void;
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

function CellView({ cell, hover, children }: { cell: Cell; hover?: boolean; children?: ReactNode }) {
  return (
    <div className="cell" style={vars({ "--span": cell.span, ...(cell.position ? { "--pos": cell.position } : {}) })}>
      <MediaView media={cell.media} hover={hover} />
      {children}
    </div>
  );
}

export function SectionView({ section, edit }: { section: Section; edit?: SectionEdit }) {
  const T = edit?.Text;
  const key = (f: string) => `${section.id}:${f}`;
  const set = (patch: Record<string, unknown>, f: string) => edit!.update({ ...section, ...patch } as Section, key(f));
  switch (section.type) {
    case "hero":
      return (
        <section className="hero" data-reveal="fade">
          <div className="hero__media">
            <MediaView media={section.media} />
            {edit?.mediaSlot(section)}
          </div>
          <div className="hero__text">
            {T ? (
              <T as="h1" className="hero__title" value={section.title} format="rich" multiline placeholder="Title" onChange={(v) => set({ title: v }, "title")} />
            ) : (
              <h1 className="hero__title" data-reveal="text">{inline(section.title)}</h1>
            )}
            <div>
              <div className="hero__intro" data-reveal="text">
                {section.intro.map((p, i) =>
                  T ? (
                    <T
                      key={i} as="p" value={p} format="plain" placeholder="Intro paragraph"
                      onChange={(v) => set({ intro: section.intro.map((x, j) => (j === i ? v : x)) }, `intro${i}`)}
                      onEnter={() => edit!.update({ ...section, intro: [...section.intro.slice(0, i + 1), "", ...section.intro.slice(i + 1)] })}
                      onBackspaceEmpty={() => section.intro.length > 1 && edit!.update({ ...section, intro: section.intro.filter((_, j) => j !== i) })}
                    />
                  ) : <p key={i}>{p}</p>,
                )}
              </div>
              {T ? (
                <T as="div" className="hero__credit" value={section.credit} format="rich" placeholder="Credit line" onChange={(v) => set({ credit: v }, "credit")} />
              ) : (
                <div className="hero__credit">{inline(section.credit)}</div>
              )}
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
      return <Carousel project={section.project ?? "galvany"} frames={section.frames} />;
    case "row":
      return (
        <div className="row" data-reveal="cells">
          <div className="row__grid">
            {section.cells.map((c, i) => <CellView key={i} cell={c}>{edit?.cell(section, i)}</CellView>)}
          </div>
        </div>
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
    case "closing":
      return (
        <div className="closing" data-reveal="text">
          <p style={{ margin: "0 0 2rem" }}>
            {T ? <T as="span" value={section.text} format="rich" multiline placeholder="Closing line" onChange={(v) => set({ text: v }, "text")} /> : inline(section.text)}
            {section.link && <><br /><a href={section.link.href}>{section.link.label}</a></>}
          </p>
        </div>
      );
    case "aside":
      return (
        <div className="aside" data-reveal="text">
          <p style={{ margin: 0 }}>
            {T ? <T as="em" value={section.text} format="plain" placeholder="Aside" onChange={(v) => set({ text: v }, "text")} /> : <em>{section.text}</em>}
          </p>
        </div>
      );
  }
}

export function TileRow({ row }: { row: { window?: number; tiles: Tile[] } }) {
  return (
    <div className="row tiles" data-reveal="cells">
      <div className="row__grid">
        {row.tiles.map((t, i) => {
          const body = (
            <>
              <div className="tile__overlay">
                <h1 className={`tile__title ${t.titleAlign === "start" ? "tile__title--start" : ""}`}>
                  {t.title.map((l, j) => <span key={j}>{j ? <br /> : null}{l}</span>)}
                </h1>
              </div>
              <MediaView media={t.media} hover />
            </>
          );
          const props = { className: "tile", style: vars({ "--span": t.span }) };
          return t.href ? <a key={i} href={t.href} {...props}>{body}</a> : <div key={i} {...props}>{body}</div>;
        })}
      </div>
    </div>
  );
}

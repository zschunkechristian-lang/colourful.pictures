import type { CSSProperties, ReactNode } from "react";
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

function CellView({ cell, hover }: { cell: Cell; hover?: boolean }) {
  return (
    <div className="cell" style={vars({ "--span": cell.span, ...(cell.position ? { "--pos": cell.position } : {}) })}>
      <MediaView media={cell.media} hover={hover} />
    </div>
  );
}

export function SectionView({ section }: { section: Section }) {
  switch (section.type) {
    case "hero":
      return (
        <section className="hero" data-reveal="fade">
          <div className="hero__media">
            <MediaView media={section.media} />
          </div>
          <div className="hero__text">
            <h1 className="hero__title" data-reveal="text">{inline(section.title)}</h1>
            <div>
              <div className="hero__intro" data-reveal="text">
                {section.intro.map((p, i) => <p key={i}>{p}</p>)}
              </div>
              <div className="hero__credit">{inline(section.credit)}</div>
            </div>
          </div>
        </section>
      );
    case "film":
      return (
        <section className="film" data-reveal="fade">
          <div className="film__inner">
            <Player project={section.project} file={section.file} />
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
                <div className={`credit ${last ? "credit--end" : ""}`} style={vars({ "--credit-span": span })} key={it.label}>
                  <dt>{it.label}</dt>
                  <dd>{it.value.map((v, j) => <span key={j}>{j ? <>, </> : null}{v}</span>)}</dd>
                </div>
              );
            })}
          </dl>
        </div>
      );
    case "statement":
      return (
        <div className={`statement statement--${section.align}`}>
          <div className="statement__text" data-reveal="text" style={vars({ "--from": section.from, "--to": section.to + 1 })}>
            <p>{inline(section.text)}</p>
          </div>
        </div>
      );
    case "carousel":
      return <Carousel project={section.project ?? "galvany"} frames={section.frames} />;
    case "row":
      return (
        <div className="row" data-reveal="cells">
          <div className="row__grid">
            {section.cells.map((c, i) => <CellView key={i} cell={c} />)}
          </div>
        </div>
      );
    case "feature":
      return (
        <section className="feature" data-reveal="fade">
          <div className="feature__overlay"><h1 className="feature__title">{section.title}</h1></div>
          <MediaView media={section.media} />
        </section>
      );
    case "closing":
      return (
        <div className="closing" data-reveal="text">
          <p style={{ margin: "0 0 2rem" }}>
            {inline(section.text)}
            {section.link && <><br /><a href={section.link.href}>{section.link.label}</a></>}
          </p>
        </div>
      );
    case "aside":
      return (
        <div className="aside" data-reveal="text">
          <p style={{ margin: 0 }}><em>{section.text}</em></p>
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

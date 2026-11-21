// The page body in edit mode: the real SectionView for every section, wrapped with the
// editing chrome (hover toolbar, "+" inserters, row/statement controls). It is rendered into
// a slot in the page, so the site's own markup and styles are what you edit.
import { Fragment, useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import type { Cell, Project, Section } from "../lib/schema";
import type { PickTarget } from "./model";
import { SectionView, type SectionEdit } from "../components/Sections";
import { Text } from "./Text";
import {
  CATALOG, ROW_PRESETS, hasMediaSlot, clampSpan, duplicateSection, insertSection, isSingleton, moveSection, moveSectionTo,
  removeSection, replaceSection, rowSum,
} from "./model";

type Commit = (next: Project, coalesceKey?: string) => void;
type Props = { project: Project; commit: Commit; slot: HTMLElement; selected: string | null; select: (id: string | null) => void; pick: (t: PickTarget) => void };

const swap = <T,>(a: T[], i: number, j: number) => { const n = [...a]; [n[i], n[j]] = [n[j], n[i]]; return n; };

const TYPE_LABEL: Record<Section["type"], string> = {
  hero: "Hero", film: "Film", credits: "Credits", statement: "Statement", carousel: "Carousel",
  row: "Row", feature: "Feature", reel: "Reel",
};

export type MenuGroup = { head: string; items: { key: string; label: string }[] };

export function Inserter({ index, groups, onPick }: { index: number; groups: MenuGroup[]; onPick: (index: number, key: string) => void }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!open) return;
    const away = (e: MouseEvent) => !ref.current?.contains(e.target as Node) && setOpen(false);
    const esc = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("mousedown", away);
    document.addEventListener("keydown", esc);
    return () => { document.removeEventListener("mousedown", away); document.removeEventListener("keydown", esc); };
  }, [open]);
  return (
    <div className={`cms cms-ins ${open ? "is-open" : ""} ${index === 0 ? "cms-ins--first" : ""}`} ref={ref}>
      <button className="cms-ins__btn" onClick={() => setOpen(!open)} aria-label="Insert here" title="Insert here">+</button>
      {open && (
        <div className="cms-menu" role="menu">
          {groups.map((g) => (
            <div key={g.head}>
              <div className="cms-menu__head">{g.head}</div>
              {g.items.map((c) => (
                <button key={c.key} role="menuitem" onClick={() => { setOpen(false); onPick(index, c.key); }}>{c.label}</button>
              ))}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

const SECTION_MENU: MenuGroup[] = [
  { head: "Rows (media grid)", items: CATALOG.filter((c) => c.group === "Row") },
  { head: "Sections", items: CATALOG.filter((c) => c.group === "Section") },
];

export const NumberField = ({ value, onChange, label, min = 1, max = 12 }: { value: number; onChange: (n: number) => void; label: string; min?: number; max?: number }) => (
  <input
    className="cms-num" type="number" min={min} max={max} value={value} aria-label={label} title={label}
    onChange={(e) => e.target.value !== "" && onChange(clampSpan(Number(e.target.value)))}
    onFocus={(e) => e.target.select()}
  />
);

function Bar({ section, i, count, project, commit, select, pick, onDrag }: { section: Section; i: number; count: number; project: Project; commit: Commit; select: Props["select"]; pick: Props["pick"]; onDrag: (id: string | null) => void }) {
  const set = (next: Section, key?: string) => commit(replaceSection(project, next), key);
  return (
    <div className="cms cms-bar" onMouseDown={(e) => e.stopPropagation()}>
      <span
        className="cms-bar__grip" draggable title="Drag to reorder" aria-label="Drag to reorder"
        onDragStart={(e) => {
          e.dataTransfer.effectAllowed = "move";
          e.dataTransfer.setData("text/plain", section.id);
          const sec = (e.currentTarget as HTMLElement).closest(".cms-sec");
          if (sec) e.dataTransfer.setDragImage(sec, 24, 16);
          onDrag(section.id);
        }}
        onDragEnd={() => onDrag(null)}
      >⠿</span>
      <span className="cms-bar__type">{TYPE_LABEL[section.type]}</span>

      {section.type === "row" && (
        <>
          <select
            value="" aria-label="Row layout preset" title="Replace the row with a preset layout (keeps media by position)"
            onChange={(e) => {
              const p = ROW_PRESETS.find((x) => x.label === e.target.value);
              if (!p) return;
              const cells: Cell[] = p.spans.map((span, j) => ({ ...(section.cells[j] ?? { media: null }), span }));
              set({ ...section, cells });
            }}
          >
            <option value="">Layout…</option>
            {ROW_PRESETS.map((p) => <option key={p.label}>{p.label}</option>)}
          </select>
          <button
            title="Add a cell"
            onClick={() => {
              const sum = rowSum(section.cells);
              set({ ...section, cells: [...section.cells, { span: sum < 12 ? 12 - sum : 4, media: null }] });
            }}
          >+ Cell</button>
          <button aria-pressed={!!section.compact} title="Short row (about 40% of the usual height)" onClick={() => { const { compact, ...rest } = section; void compact; set((section.compact ? rest : { ...rest, compact: true }) as Section); }}>Short</button>
          <span className={`cms-sum ${rowSum(section.cells) > 12 ? "is-wrap" : ""}`} title="Sum of spans. Above 12 the row wraps to a second line.">Σ {rowSum(section.cells)}</span>
        </>
      )}

      {hasMediaSlot(section) && <button onClick={() => pick({ sectionId: section.id, kind: "media" })}>Media…</button>}
      {section.type === "film" && <button onClick={() => pick({ sectionId: section.id, kind: "film" })}>Film…</button>}
      {section.type === "carousel" && <button onClick={() => pick({ sectionId: section.id, kind: "frames" })}>Frames ({section.frames.length})…</button>}

      {section.type === "statement" && (
        <>
          <span className="cms-sum">col</span>
          <NumberField label="From column (1–12)" value={section.from} onChange={(n) => set({ ...section, from: n, to: Math.max(section.to, n) }, `${section.id}:from`)} />
          <span className="cms-sum">–</span>
          <NumberField label="To column (1–12)" value={section.to} onChange={(n) => set({ ...section, to: n, from: Math.min(section.from, n) }, `${section.id}:to`)} />
          <span className="cms-seg">
            {(["start", "center", "end"] as const).map((a) => (
              <button key={a} aria-pressed={section.align === a} onClick={() => set({ ...section, align: a })} title={`Align ${a}`}>
                {a === "start" ? "⇤" : a === "center" ? "↔" : "⇥"}
              </button>
            ))}
          </span>
        </>
      )}

      <span className="cms-bar__sep" />
      <button onClick={() => commit(moveSection(project, section.id, -1))} disabled={i === 0} title="Move up">↑</button>
      <button onClick={() => commit(moveSection(project, section.id, 1))} disabled={i === count - 1} title="Move down">↓</button>
      <button
        disabled={isSingleton(section)} title={isSingleton(section) ? "Only one per page" : "Duplicate"}
        onClick={() => { const r = duplicateSection(project, section.id); if (r) { commit(r.project); select(r.copyId); } }}
      >⧉</button>
      <button className="cms-danger" title="Delete section" onClick={() => { commit(removeSection(project, section.id)); select(null); }}>🗑</button>
    </div>
  );
}

export function EditableSections({ project, commit, slot, selected, select, pick }: Props) {
  const edit: SectionEdit = useMemo(() => {
    const set = (next: Section, key?: string) => commit(replaceSection(project, next), key);
    return {
      Text,
      update: set,
      cell: (section, index) => {
        if (section.type !== "row") return null;
        const cell = section.cells[index];
        const patch = (c: Partial<Cell>, key?: string) => set({ ...section, cells: section.cells.map((x, j) => (j === index ? { ...x, ...c } : x)) }, key);
        return (
          <>
          {cell.text === undefined && <button className="cms cms-slot" aria-label="Choose media" onClick={() => pick({ sectionId: section.id, kind: "cell", index })}><span>{cell.media ? "Change media" : "Choose media"}</span></button>}
          <div className="cms cms-chip" onMouseDown={(e) => e.stopPropagation()}>
            <button
              title={cell.text === undefined ? "Make this a text cell" : "Back to a media cell"} aria-pressed={cell.text !== undefined}
              onClick={() => { const { text, ...rest } = cell; void text; patch(cell.text === undefined ? { text: "" } : ({ ...rest, text: undefined } as Partial<Cell>)); }}
            >T</button>
            <NumberField label="Span (1–12)" value={cell.span} onChange={(n) => patch({ span: n }, `${section.id}:span${index}`)} />
            <button
              title="Remove cell" disabled={section.cells.length < 2}
              onClick={() => set({ ...section, cells: section.cells.filter((_, j) => j !== index) })}
            >×</button>
          </div>
          </>
        );
      },
      mediaSlot: (section) =>
        hasMediaSlot(section) ? (
          <button className="cms cms-slot" aria-label="Choose media" onClick={() => pick({ sectionId: section.id, kind: "media" })}><span>{section.media ? "Change media" : "Choose media"}</span></button>
        ) : null,
      empty: (section, label) => (
        <div className="cms-empty-section">
          {label}
          <button className="cms cms-slot" aria-label="Choose media" onClick={() => pick({ sectionId: section.id, kind: section.type === "film" ? "film" : "frames" })}><span>Choose media</span></button>
        </div>
      ),
      creditControls: (section, index) =>
        section.type === "credits" ? (
          <span className="cms cms-credit-x">
            <button title="Earlier" disabled={index === 0} onClick={() => set({ ...section, items: swap(section.items, index, index - 1) })}>↑</button>
            <button title="Later" disabled={index === section.items.length - 1} onClick={() => set({ ...section, items: swap(section.items, index, index + 1) })}>↓</button>
            <button title="Remove entry" onClick={() => set({ ...section, items: section.items.filter((_, j) => j !== index) })}>×</button>
          </span>
        ) : null,
      addCredit: (section) =>
        section.type === "credits" ? (
          <div className="credit credit--add" style={{ "--credit-span": 2 } as React.CSSProperties}>
            <button className="cms cms-credit-add" onClick={() => set({ ...section, items: [...section.items, { label: "", value: [] }] })}>+ Entry</button>
          </div>
        ) : null,
    };
  }, [project, commit, pick]);

  const onInsert = (index: number, key: string) => {
    const s = CATALOG.find((c) => c.key === key)!.make(project.slug);
    commit(insertSection(project, index, s));
    select(s.id);
  };

  const [dragId, setDragId] = useState<string | null>(null);
  const [drop, setDrop] = useState<{ id: string; after: boolean } | null>(null);
  const endDrag = () => { setDragId(null); setDrop(null); };

  return createPortal(
    <>
      <Inserter index={0} groups={SECTION_MENU} onPick={onInsert} />
      {project.sections.map((s, i) => (
        <Fragment key={s.id}>
          <div
            className={`cms-sec ${selected === s.id ? "is-selected" : ""} ${dragId === s.id ? "is-dragging" : ""} ${drop?.id === s.id ? (drop.after ? "drop-after" : "drop-before") : ""}`}
            data-section={s.type}
            onDragOver={(e) => {
              if (!dragId) return;
              e.preventDefault();
              e.dataTransfer.dropEffect = "move";
              const r = e.currentTarget.getBoundingClientRect();
              const after = e.clientY > r.top + r.height / 2;
              if (dragId === s.id) return setDrop(null);
              setDrop((d) => (d?.id === s.id && d.after === after ? d : { id: s.id, after }));
            }}
            onDrop={(e) => {
              if (!dragId) return;
              e.preventDefault();
              if (drop) commit(moveSectionTo(project, dragId, drop.id, drop.after));
              endDrag();
            }}
            onClickCapture={() => selected !== s.id && select(s.id)}
          >
            <SectionView section={s} edit={edit} slug={project.slug} />
            <Bar section={s} i={i} count={project.sections.length} project={project} commit={commit} select={select} pick={pick} onDrag={(id) => (id ? setDragId(id) : endDrag())} />
          </div>
          <Inserter index={i + 1} groups={SECTION_MENU} onPick={onInsert} />
        </Fragment>
      ))}
    </>,
    slot,
  );
}

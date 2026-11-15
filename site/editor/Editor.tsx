// The in-page editor (dev only). ProjectPage mounts this lazily when edit mode is
// switched on; production builds never include it (guarded by import.meta.env.DEV).
import { useEffect, useState } from "react";
import type { Project } from "../lib/schema";
import { useProjectStore } from "./store";
import { EditableSections } from "./EditableSections";
import { countEmpty, type PickTarget } from "./model";
import { Picker } from "./Picker";
import "./editor.css";

export type Mode = "off" | "edit" | "preview";

type Props = {
  project: Project;
  onChange: (p: Project) => void;
  mode: Mode;
  setMode: (m: Mode) => void;
  /** where the editable sections are drawn (exists in edit mode only) */
  slot: HTMLElement | null;
};

const isTyping = (t: EventTarget | null) => {
  const el = t as HTMLElement | null;
  // our own inline text fields use the editor history (coalesced typing), so undo is not left to the browser there
  return !!el && (el.tagName === "INPUT" || el.tagName === "TEXTAREA" || (el.isContentEditable && !el.hasAttribute("data-cms-text")));
};

export default function Editor({ project, onChange, mode, setMode, slot }: Props) {
  const store = useProjectStore(project, onChange);
  const { present, commit, undo, redo, dirty, save, saveNow, canSave } = store;
  const [panel, setPanel] = useState<"page" | null>(null);
  const [selected, setSelected] = useState<string | null>(null);
  const [target, setTarget] = useState<PickTarget | null>(null);
  const empty = countEmpty(present);
  const editing = mode === "edit";

  // body class lets editor.css switch off link navigation etc.
  useEffect(() => {
    document.body.classList.toggle("is-editing", editing);
    return () => document.body.classList.remove("is-editing");
  }, [editing]);

  // keyboard: ⌘/Ctrl+S save, ⌘/Ctrl+Z undo, ⇧⌘Z redo (undo/redo leave text fields to the browser)
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const mod = e.metaKey || e.ctrlKey;
      if (!mod) return;
      const k = e.key.toLowerCase();
      if (k === "s") { e.preventDefault(); if (dirty && canSave) saveNow(); }
      else if (k === "z" && !isTyping(e.target)) { e.preventDefault(); (e.shiftKey ? redo : undo)(); }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [dirty, canSave, saveNow, undo, redo]);

  // don't lose unsaved work to a stray reload
  useEffect(() => {
    if (!dirty) return;
    const warn = (e: BeforeUnloadEvent) => e.preventDefault();
    window.addEventListener("beforeunload", warn);
    return () => window.removeEventListener("beforeunload", warn);
  }, [dirty]);

  // links navigate away from the editor: block them while editing
  useEffect(() => {
    if (!editing) return;
    const block = (e: MouseEvent) => {
      const a = (e.target as HTMLElement).closest?.("a");
      if (a && !a.closest(".cms")) e.preventDefault();
    };
    document.addEventListener("click", block, true);
    return () => document.removeEventListener("click", block, true);
  }, [editing]);

  const status =
    canSave === false ? "Saving unavailable (dev server not reachable)"
    : save.kind === "saving" ? "Saving…"
    : save.kind === "error" ? `Save failed: ${save.message}`
    : dirty ? "Unsaved changes"
    : save.kind === "saved" ? (empty ? `Saved with ${empty} empty slot${empty > 1 ? "s" : ""}` : "Saved")
    : "No changes";

  const close = () => {
    if (dirty && !window.confirm("You have unsaved changes. Close the editor and discard them?")) return;
    setMode("off");
  };

  return (
    <div className="cms">
      {editing && slot && <EditableSections project={present} commit={commit} slot={slot} selected={selected} select={setSelected} pick={(t) => { setPanel(null); setTarget(t); }} />}
      <div className="cms-toolbar" role="toolbar" aria-label="Editor">
        <div className="cms-seg">
          <button aria-pressed={editing} onClick={() => setMode("edit")}>Edit</button>
          <button aria-pressed={mode === "preview"} onClick={() => setMode("preview")}>Preview</button>
        </div>
        <button onClick={undo} disabled={!store.canUndo} title="Undo (⌘Z)">↶</button>
        <button onClick={redo} disabled={!store.canRedo} title="Redo (⇧⌘Z)">↷</button>
        <button aria-pressed={panel === "page"} onClick={() => { setTarget(null); setPanel(panel === "page" ? null : "page"); }}>Page</button>
        {empty > 0 && <span className="cms-warn" title="Empty slots render nothing on the live site. Saving still works.">⚠ {empty} empty</span>}
        <span className={`cms-status cms-status--${save.kind === "error" || canSave === false ? "error" : dirty ? "dirty" : "ok"}`}>{status}</span>
        <button className="cms-primary" onClick={saveNow} disabled={!dirty || !canSave || save.kind === "saving"} title="Save (⌘S)">Save</button>
        <button onClick={close} title="Close editor">✕</button>
      </div>

      {editing && target && <Picker key={JSON.stringify(target)} project={present} target={target} commit={commit} onClose={() => setTarget(null)} />}
      {panel === "page" && (
        <aside className="cms-panel" aria-label="Page settings">
          <header><h2>Page</h2><button onClick={() => setPanel(null)} aria-label="Close panel">✕</button></header>
          <label>
            URL slug
            <input value={present.slug} readOnly />
          </label>
          <label>
            Title
            <input value={present.title ?? ""} onChange={(e) => commit({ ...present, title: e.target.value }, "title")} />
          </label>
          <label>
            Description
            <textarea rows={5} value={present.description ?? ""} onChange={(e) => commit({ ...present, description: e.target.value }, "description")} />
          </label>
        </aside>
      )}
    </div>
  );
}

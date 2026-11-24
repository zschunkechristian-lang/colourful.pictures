// The in-page editor (dev server and the edit build only). ProjectPage mounts this lazily when edit
// mode is switched on; the public build never includes it (guarded by a build-time constant).
import { useEffect, useState } from "react";
import { projectSchema, siteSchema, type Project, type SiteData } from "../lib/schema";
import { useProjectStore } from "./store";
import { EditableSections } from "./EditableSections";
import { EditableSite } from "./EditableSite";
import { NewProject } from "./NewProject";
import { countEmpty, countEmptyTiles, type PickTarget } from "./model";
import { Picker } from "./Picker";
import { projectImage } from "../components/Seo";
import "./editor.css";

export type Mode = "off" | "edit" | "preview";

type Props = {
  project: Project;
  site: SiteData;
  onChange: (p: Project) => void;
  onSiteChange: (s: SiteData) => void;
  mode: Mode;
  setMode: (m: Mode) => void;
  /** where the editable page parts are drawn (exist in edit mode only) */
  slots: { sections: HTMLElement | null; closing: HTMLElement | null; tiles: HTMLElement | null; footer: HTMLElement | null } | null;
};

const isTyping = (t: EventTarget | null) => {
  const el = t as HTMLElement | null;
  // our own inline text fields use the editor history (coalesced typing), so undo is not left to the browser there
  return !!el && (el.tagName === "INPUT" || el.tagName === "TEXTAREA" || (el.isContentEditable && !el.hasAttribute("data-cms-text")));
};

/**
 * On the edit site the pages are built into the bundle, so after a save they are out of date until the
 * pull request is merged and the site redeployed. Before the editor starts it therefore asks the save
 * API for the latest stored content and swaps it in, so earlier edits are never overwritten by stale ones.
 * With the dev server (files on disk, always current) nothing is fetched.
 */
function useLatestContent({ project, site, onChange, onSiteChange }: Props) {
  const [latest, setLatest] = useState<{ project: Project; site: SiteData } | null>(null);
  useEffect(() => {
    let cancelled = false;
    (async () => {
      let next = { project, site };
      try {
        const ping = await fetch("/__cms/ping");
        if (ping.ok && (await ping.json()).remote) {
          const [p, s] = await Promise.all([fetch(`/__cms/project/${project.slug}`), fetch("/__cms/site")]);
          const pp = p.ok ? projectSchema.safeParse(await p.json()) : null;
          const ss = s.ok ? siteSchema.safeParse(await s.json()) : null;
          next = { project: pp?.success ? pp.data : project, site: ss?.success ? ss.data : site };
        }
      } catch { /* offline or unreachable: edit what the page was built with; saving will report the problem */ }
      if (cancelled) return;
      if (JSON.stringify(next.project) !== JSON.stringify(project)) onChange(next.project);
      if (JSON.stringify(next.site) !== JSON.stringify(site)) onSiteChange(next.site);
      setLatest(next);
    })();
    return () => { cancelled = true; };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps -- once, when the editor opens
  return latest;
}

export default function Editor(props: Props) {
  const latest = useLatestContent(props);
  return latest ? <EditorBody {...props} project={latest.project} site={latest.site} /> : null;
}

function EditorBody({ project, site: initialSite, onChange, onSiteChange, mode, setMode, slots }: Props) {
  const store = useProjectStore(project, initialSite, onChange, onSiteChange);
  const { present, site, commit, commitSite, undo, redo, dirty, save, saveNow, canSave, remote } = store;
  const [panel, setPanel] = useState<"page" | "new" | null>(null);
  const [selected, setSelected] = useState<string | null>(null);
  const [target, setTarget] = useState<PickTarget | null>(null);
  const empty = countEmpty(present) + countEmptyTiles(site);
  const editing = mode === "edit";

  // after "New project": the dev server reloaded the page while picking up the new file
  useEffect(() => {
    try {
      const slug = sessionStorage.getItem("cms-open");
      if (slug) { sessionStorage.removeItem("cms-open"); window.location.replace(`/projects/${slug}?edit`); }
    } catch { /* ignore */ }
  }, []);

  // A side panel (media picker, page settings, new project) takes room from the page instead of covering it:
  // editor.css pads the body by --cms-pw, so what is being picked for stays visible and judgeable.
  const panelWidth = editing && target ? 420 : panel ? 340 : 0;
  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle("cms-inset", panelWidth > 0);
    root.style.setProperty("--cms-pw", `${panelWidth}px`);
    // layout-dependent scripts (scroll triggers, fitted text) re-measure on resize
    window.dispatchEvent(new Event("resize"));
    return () => { root.classList.remove("cms-inset"); root.style.removeProperty("--cms-pw"); };
  }, [panelWidth]);

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
    canSave === false ? "Saving unavailable (server not reachable)"
    : save.kind === "saving" ? "Saving…"
    : save.kind === "error" ? `Save failed: ${save.message}`
    : dirty ? "Unsaved changes"
    : save.kind === "saved" ? (empty ? `Saved with ${empty} empty slot${empty > 1 ? "s" : ""}` : remote ? "Saved to pull request" : "Saved")
    : "No changes";

  const close = () => {
    if (dirty && !window.confirm("You have unsaved changes. Close the editor and discard them?")) return;
    setMode("off");
  };

  return (
    <div className="cms">
      {editing && slots?.sections && <EditableSections project={present} commit={commit} slot={slots.sections} selected={selected} select={setSelected} pick={(t) => { setPanel(null); setTarget(t); }} />}
      <div className="cms-toolbar" role="toolbar" aria-label="Editor">
        <div className="cms-seg">
          <button aria-pressed={editing} onClick={() => setMode("edit")}>Edit</button>
          <button aria-pressed={mode === "preview"} onClick={() => setMode("preview")}>Preview</button>
        </div>
        <button onClick={undo} disabled={!store.canUndo} title="Undo (⌘Z)">↶</button>
        <button onClick={redo} disabled={!store.canRedo} title="Redo (⇧⌘Z)">↷</button>
        <button aria-pressed={panel === "page"} onClick={() => { setTarget(null); setPanel(panel === "page" ? null : "page"); }}>Page</button>
        <button aria-pressed={panel === "new"} onClick={() => { setTarget(null); setPanel(panel === "new" ? null : "new"); }} title="Create a new project page">New…</button>
        {empty > 0 && <span className="cms-warn" title="Empty slots render nothing on the live site. Saving still works.">⚠ {empty} empty</span>}
        <span className={`cms-status cms-status--${save.kind === "error" || canSave === false ? "error" : dirty ? "dirty" : "ok"}`}>{status}</span>
        {remote && save.kind === "saved" && save.pr && <a className="cms-prlink" href={save.pr} target="_blank" rel="noreferrer" title="Merge the pull request to publish">PR ↗</a>}
        <button className="cms-primary" onClick={saveNow} disabled={!dirty || !canSave || save.kind === "saving"} title="Save (⌘S)">Save</button>
        <button onClick={close} title="Close editor">✕</button>
      </div>

      {editing && slots && <EditableSite project={present} site={site} commitSite={commitSite} slots={slots} pick={(t) => { setPanel(null); setTarget(t); }} />}
      {editing && target && <Picker key={JSON.stringify(target)} project={present} site={site} target={target} commit={commit} commitSite={commitSite} onClose={() => setTarget(null)} />}
      {panel === "new" && <NewProject dirty={dirty} remote={remote} onClose={() => setPanel(null)} />}
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
          <div className="cms-share">
            <span>Share image <small>(link previews: WhatsApp, LinkedIn, …)</small></span>
            {projectImage(present) ? <img src={projectImage(present)!.url} alt="" /> : <em>None: add hero media or choose one.</em>}
            <div>
              <button onClick={() => { setPanel(null); setTarget({ sectionId: "page", kind: "share" }); }}>Choose…</button>
              {present.image && <button onClick={() => { const { image, ...rest } = present; void image; commit(rest); }}>Use hero instead</button>}
            </div>
          </div>
        </aside>
      )}
    </div>
  );
}

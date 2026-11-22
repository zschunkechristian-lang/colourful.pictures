// Editor state: the page's project and the shared site data (project grid, footer), one undo/redo
// history over both, and saving. Plain React, no extra state library.
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { Project, SiteData } from "../lib/schema";

type SaveState = { kind: "idle" } | { kind: "saving" } | { kind: "saved"; pr?: string } | { kind: "error"; message: string };
type Doc = { project: Project; site: SiteData };

const COALESCE_MS = 800;

/**
 * @param initial  the project as loaded from disk
 * @param initialSite the shared site data as loaded from disk
 * @param onChange / onSiteChange called with every new present state so the page can re-render
 */
export function useProjectStore(initial: Project, initialSite: SiteData, onChange: (p: Project) => void, onSiteChange: (s: SiteData) => void) {
  const [doc, setDoc] = useState<Doc>({ project: initial, site: initialSite });
  const [past, setPast] = useState<Doc[]>([]);
  const [future, setFuture] = useState<Doc[]>([]);
  const [saved, setSaved] = useState(() => ({ project: JSON.stringify(initial), site: JSON.stringify(initialSite) }));
  const [save, setSave] = useState<SaveState>({ kind: "idle" });
  const [canSave, setCanSave] = useState<boolean | null>(null); // null = still checking
  const [remote, setRemote] = useState(false); // saves go to a GitHub pull request instead of local files
  const last = useRef<{ key: string; at: number } | null>(null);

  // is the dev save endpoint reachable?
  useEffect(() => {
    fetch("/__cms/ping")
      .then(async (r) => { setCanSave(r.ok); setRemote(r.ok && !!(await r.json().catch(() => ({}))).remote); })
      .catch(() => setCanSave(false));
  }, []);

  const apply = useCallback((next: Doc) => {
    setDoc(next);
    if (next.project !== doc.project) onChange(next.project);
    if (next.site !== doc.site) onSiteChange(next.site);
  }, [doc, onChange, onSiteChange]);

  /** Record an edit. Edits with the same `coalesceKey` in quick succession share one undo step (typing). */
  const commitDoc = useCallback((next: Doc, coalesceKey?: string) => {
    const now = Date.now();
    const merge = coalesceKey && last.current?.key === coalesceKey && now - last.current.at < COALESCE_MS;
    last.current = coalesceKey ? { key: coalesceKey, at: now } : null;
    if (!merge) setPast((p) => [...p, doc].slice(-100));
    setFuture([]);
    setSave((s) => (s.kind === "saved" ? { kind: "idle" } : s));
    apply(next);
  }, [doc, apply]);

  const commit = useCallback((project: Project, key?: string) => commitDoc({ ...doc, project }, key), [doc, commitDoc]);
  const commitSite = useCallback((site: SiteData, key?: string) => commitDoc({ ...doc, site }, key), [doc, commitDoc]);

  const undo = useCallback(() => {
    const prev = past[past.length - 1];
    if (!prev) return;
    last.current = null;
    setPast(past.slice(0, -1));
    setFuture((f) => [doc, ...f]);
    apply(prev);
  }, [past, doc, apply]);

  const redo = useCallback(() => {
    const next = future[0];
    if (!next) return;
    last.current = null;
    setFuture(future.slice(1));
    setPast((p) => [...p, doc]);
    apply(next);
  }, [future, doc, apply]);

  const projectDirty = useMemo(() => JSON.stringify(doc.project) !== saved.project, [doc.project, saved.project]);
  const siteDirty = useMemo(() => JSON.stringify(doc.site) !== saved.site, [doc.site, saved.site]);
  const dirty = projectDirty || siteDirty;

  const post = async (url: string, body: unknown) => {
    const res = await fetch(url, { method: "POST", headers: { "content-type": "application/json", "x-cms": "1" }, body: JSON.stringify(body) });
    const j = await res.json().catch(() => ({}));
    if (!res.ok) throw new Error(j.error ? `${j.error}${j.issues ? `: ${j.issues[0].path.join(".")} ${j.issues[0].message}` : ""}` : `HTTP ${res.status}`);
    return j as { pr?: string };
  };

  const saveNow = useCallback(async () => {
    setSave({ kind: "saving" });
    try {
      let pr: string | undefined;
      if (projectDirty) {
        pr = (await post(`/__cms/project/${doc.project.slug}`, doc.project)).pr;
        setSaved((s) => ({ ...s, project: JSON.stringify(doc.project) }));
      }
      if (siteDirty) {
        pr = (await post("/__cms/site", doc.site)).pr ?? pr;
        setSaved((s) => ({ ...s, site: JSON.stringify(doc.site) }));
      }
      setSave({ kind: "saved", pr });
    } catch (err) {
      setSave({ kind: "error", message: err instanceof Error ? err.message : "save failed" });
    }
  }, [doc, projectDirty, siteDirty]);

  return { present: doc.project, site: doc.site, commit, commitSite, undo, redo, canUndo: past.length > 0, canRedo: future.length > 0, dirty, projectDirty, siteDirty, save, saveNow, canSave, remote };
}

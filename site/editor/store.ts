// Editor state: the project being edited, undo/redo history, and saving.
// Plain React (useReducer-style via useState) — no extra state library.
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { Project } from "../lib/schema";

type SaveState = { kind: "idle" } | { kind: "saving" } | { kind: "saved" } | { kind: "error"; message: string };

const COALESCE_MS = 800;

/**
 * @param initial  the project as loaded from disk
 * @param onChange called with every new present state so the page can re-render
 */
export function useProjectStore(initial: Project, onChange: (p: Project) => void) {
  const [present, setPresent] = useState(initial);
  const [past, setPast] = useState<Project[]>([]);
  const [future, setFuture] = useState<Project[]>([]);
  const [savedJson, setSavedJson] = useState(() => JSON.stringify(initial));
  const [save, setSave] = useState<SaveState>({ kind: "idle" });
  const [canSave, setCanSave] = useState<boolean | null>(null); // null = still checking
  const last = useRef<{ key: string; at: number } | null>(null);

  // is the dev save endpoint reachable?
  useEffect(() => {
    fetch("/__cms/ping").then((r) => setCanSave(r.ok)).catch(() => setCanSave(false));
  }, []);

  const apply = useCallback((next: Project) => { setPresent(next); onChange(next); }, [onChange]);

  /** Record an edit. Edits with the same `coalesceKey` in quick succession share one undo step (typing). */
  const commit = useCallback((next: Project, coalesceKey?: string) => {
    const now = Date.now();
    const merge = coalesceKey && last.current?.key === coalesceKey && now - last.current.at < COALESCE_MS;
    last.current = coalesceKey ? { key: coalesceKey, at: now } : null;
    if (!merge) setPast((p) => [...p, present].slice(-100));
    setFuture([]);
    setSave((s) => (s.kind === "saved" ? { kind: "idle" } : s));
    apply(next);
  }, [present, apply]);

  const undo = useCallback(() => {
    const prev = past[past.length - 1];
    if (!prev) return;
    last.current = null;
    setPast(past.slice(0, -1));
    setFuture((f) => [present, ...f]);
    apply(prev);
  }, [past, present, apply]);

  const redo = useCallback(() => {
    const next = future[0];
    if (!next) return;
    last.current = null;
    setFuture(future.slice(1));
    setPast((p) => [...p, present]);
    apply(next);
  }, [future, present, apply]);

  const dirty = useMemo(() => JSON.stringify(present) !== savedJson, [present, savedJson]);

  const saveNow = useCallback(async () => {
    setSave({ kind: "saving" });
    try {
      const res = await fetch(`/__cms/project/${present.slug}`, {
        method: "POST",
        headers: { "content-type": "application/json", "x-cms": "1" },
        body: JSON.stringify(present),
      });
      const body = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(body.error ? `${body.error}${body.issues ? `: ${body.issues[0].path.join(".")} ${body.issues[0].message}` : ""}` : `HTTP ${res.status}`);
      setSavedJson(JSON.stringify(present));
      setSave({ kind: "saved" });
    } catch (err) {
      setSave({ kind: "error", message: err instanceof Error ? err.message : "save failed" });
    }
  }, [present]);

  return { present, commit, undo, redo, canUndo: past.length > 0, canRedo: future.length > 0, dirty, save, saveNow, canSave };
}

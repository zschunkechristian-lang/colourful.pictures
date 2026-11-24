// "New project" panel: creates a starter project file through the dev endpoint, then opens it in the editor.
import { useState } from "react";

const slugify = (s: string) => s.toLowerCase().normalize("NFKD").replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");

export function NewProject({ dirty, remote, onClose }: { dirty: boolean; remote: boolean; onClose: () => void }) {
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [touched, setTouched] = useState(false);
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const [created, setCreated] = useState<{ slug: string; pr?: string } | null>(null);
  const valid = /^[a-z0-9-]+$/.test(slug);

  const create = async () => {
    if (dirty && !window.confirm("You have unsaved changes on this page. Leave without saving?")) return;
    setBusy(true);
    setError("");
    try {
      const res = await fetch("/__cms/new-project", { method: "POST", headers: { "content-type": "application/json", "x-cms": "1" }, body: JSON.stringify({ slug, title }) });
      const j = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(j.error ?? `HTTP ${res.status}`);
      if (remote) {
        // the edit site is a static build: the new page exists in it only after the pull request is merged and redeployed
        setCreated({ slug, pr: j.pr });
        setBusy(false);
        return;
      }
      // The dev server notices the new file a moment later and may reload this page; if it does,
      // the editor picks the destination up from here when it comes back (see Editor.tsx).
      try { sessionStorage.setItem("cms-open", slug); } catch { /* ignore */ }
      // wait until the page is served
      for (let i = 0; i < 20; i++) {
        if ((await fetch(`/projects/${slug}`, { headers: { accept: "text/html" } }).catch(() => null))?.ok) break;
        await new Promise((r) => setTimeout(r, 250));
      }
      window.location.assign(`/projects/${slug}?edit`);
    } catch (e) {
      setError(e instanceof Error ? e.message : "failed");
      setBusy(false);
    }
  };

  return (
    <aside className="cms-panel" aria-label="New project">
      <header><h2>New project</h2><button onClick={onClose} aria-label="Close panel">✕</button></header>
      <label>
        Title
        <input value={title} placeholder="e.g. Brand – Client" onChange={(e) => { setTitle(e.target.value); if (!touched) setSlug(slugify(e.target.value)); }} />
      </label>
      <label>
        URL slug
        <input value={slug} placeholder="client-name" onChange={(e) => { setTouched(true); setSlug(slugify(e.target.value)); }} />
        <small>/projects/{slug || "…"}</small>
      </label>
      {error && <p className="cms-error">{error}</p>}
      {created && (
        <p className="cms-note">
          Created <code>/projects/{created.slug}</code> on the pull request{created.pr && <> (<a href={created.pr} target="_blank" rel="noreferrer">open</a>)</>}. It becomes editable here once the pull request is merged and this site has redeployed (a minute or two).
        </p>
      )}
      <button className="cms-primary" disabled={!valid || busy || !!created} onClick={create}>{remote ? "Create" : "Create and open"}</button>
      <small className="cms-note">Creates a starter page (hero, film, credits) in site/content/projects. Add it to the project grid with the tile rows at the bottom of any page.</small>
    </aside>
  );
}

import { lazy, Suspense, useEffect, useRef, useState } from "react";
import type { Project, SiteData } from "../lib/types";
import { initMotion } from "../lib/motion";
import { Cursor, Nav, useSmoothScroll } from "./Shell";
import { FooterView, SectionView, TileRow } from "./Sections";
import type { Mode } from "../editor/Editor";
import "../styles/fonts.css";
import "../styles/site.css";

// The editor is dev-only: `import.meta.env.DEV` is a build-time constant, so in production
// this whole branch (and the editor module) is removed from the bundle.
const Editor = import.meta.env.DEV ? lazy(() => import("../editor/Editor")) : null;

export function ProjectPage({ project: loaded, site: loadedSite }: { project: Project; site: SiteData }) {
  const root = useRef<HTMLDivElement>(null);
  const [project, setProject] = useState(loaded);
  const [mode, setMode] = useState<Mode>("off");
  const [slot, setSlot] = useState<HTMLElement | null>(null);
  const [tilesSlot, setTilesSlot] = useState<HTMLElement | null>(null);
  const [footerSlot, setFooterSlot] = useState<HTMLElement | null>(null);
  const [site, setSite] = useState(loadedSite);
  const editing = mode === "edit";

  // `?edit` in the URL opens the editor straight away (client-side only, so SSR stays plain)
  useEffect(() => {
    if (import.meta.env.DEV && new URLSearchParams(location.search).has("edit")) setMode("edit");
  }, []);
  // a fresh load of the file from disk (e.g. after a save, or an edit made outside the editor)
  useEffect(() => setProject(loaded), [loaded]);
  useEffect(() => setSite(loadedSite), [loadedSite]);

  useSmoothScroll(!editing);
  useEffect(() => (root.current && !editing ? initMotion(root.current) : undefined), [project.slug, editing]);
  const { footer } = site;

  return (
    <body>
      <div ref={root}>
      {!editing && <Cursor />}
      <div className="frame">
        <Nav />
        <main className="content">
          {/* edit mode: the editor draws the sections itself (same SectionView, plus controls) into this slot */}
          {editing ? <div ref={setSlot} style={{ display: "contents" }} /> : project.sections.map((s) => <SectionView key={s.id} section={s} />)}
          {editing ? <div ref={setTilesSlot} style={{ display: "contents" }} /> : site.projectGrid.map((row, i) => <TileRow key={i} row={row} />)}
        </main>
      </div>
      {editing ? <div ref={setFooterSlot} style={{ display: "contents" }} /> : <FooterView footer={footer} />}
      {import.meta.env.DEV && mode === "off" && (
        <button
          onClick={() => setMode("edit")}
          style={{ position: "fixed", right: 16, bottom: 16, zIndex: 100000, font: "600 12px -apple-system, sans-serif", color: "#f2f2f2", background: "#161616", border: "1px solid #333", borderRadius: 999, padding: "8px 14px", cursor: "pointer", opacity: 0.55 }}
        >
          Edit
        </button>
      )}
      {Editor && mode !== "off" && (
        <Suspense fallback={null}>
          <Editor project={project} site={site} onChange={setProject} onSiteChange={setSite} mode={mode} setMode={setMode} slots={editing ? { sections: slot, tiles: tilesSlot, footer: footerSlot } : null} />
        </Suspense>
      )}
      </div>
    </body>
  );
}

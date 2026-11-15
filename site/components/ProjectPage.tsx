import { lazy, Suspense, useEffect, useRef, useState } from "react";
import type { Project, SiteData } from "../lib/types";
import { initMotion } from "../lib/motion";
import { Cursor, Nav, useSmoothScroll } from "./Shell";
import { SectionView, TileRow } from "./Sections";
import type { Mode } from "../editor/Editor";
import "../styles/fonts.css";
import "../styles/site.css";

// The editor is dev-only: `import.meta.env.DEV` is a build-time constant, so in production
// this whole branch (and the editor module) is removed from the bundle.
const Editor = import.meta.env.DEV ? lazy(() => import("../editor/Editor")) : null;

export function ProjectPage({ project: loaded, site }: { project: Project; site: SiteData }) {
  const root = useRef<HTMLDivElement>(null);
  const [project, setProject] = useState(loaded);
  const [mode, setMode] = useState<Mode>("off");
  const [slot, setSlot] = useState<HTMLElement | null>(null);
  const editing = mode === "edit";

  // `?edit` in the URL opens the editor straight away (client-side only, so SSR stays plain)
  useEffect(() => {
    if (import.meta.env.DEV && new URLSearchParams(location.search).has("edit")) setMode("edit");
  }, []);
  // a fresh load of the file from disk (e.g. after a save, or an edit made outside the editor)
  useEffect(() => setProject(loaded), [loaded]);

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
          {site.projectGrid.map((row, i) => <TileRow key={i} row={row} />)}
        </main>
      </div>
      <section className="footer">
        <div className="footer__grid">
          <div className="footer__col">
            <div className="footer__head"><span>{footer.contact.heading}</span><hr /></div>
            <div className="footer__links">
              {footer.contact.links.map((l) => <a key={l.href} href={l.href} target="_blank" rel="noreferrer">{l.label}</a>)}
            </div>
          </div>
          <div className="footer__col">
            <div className="footer__head"><span>{footer.philosophy.heading}</span><hr /></div>
            <div className="footer__text">
              {footer.philosophy.paragraphs.map((p, i) => <p key={i}>{p}</p>)}
            </div>
          </div>
        </div>
      </section>
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
          <Editor project={project} onChange={setProject} mode={mode} setMode={setMode} slot={editing ? slot : null} />
        </Suspense>
      )}
      </div>
    </body>
  );
}

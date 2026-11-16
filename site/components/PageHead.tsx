import type { Project } from "../lib/types";
import { Seo, projectImage, projectJsonLd } from "./Seo";

/** <head> of every page that runs on the content system (projects, Home, Info, Play). */
export const PageHead = ({ project, path, jsonLd }: { project: Project; path: string; jsonLd?: Record<string, unknown> }) => (
  <>
    <Seo
      title={project.title ?? project.slug}
      description={project.description}
      path={path}
      image={projectImage(project)}
      noindex={project.noindex}
      jsonLd={jsonLd ?? projectJsonLd(project, projectImage(project))}
    />
    {/* apply a saved theme before first paint (no flash); the toggle that sets it is in Shell.tsx */}
    <script
      dangerouslySetInnerHTML={{
        __html: `try{var t=localStorage.getItem("theme");if(t==="light"||t==="dark")document.documentElement.dataset.theme=t}catch(e){}document.documentElement.classList.add("js")`,
      }}
    />
    <link rel="icon" href="/assets/favicon_Hbj8jU66HfCXfbngKsu24.ico" />
    {["PPHatton-Ultralight_S4eSUf5DGawGuTN87xecl.otf", "WorkSans-Light_Gly5URkuegk6H4yl8e4Eo.ttf", "DOTNorekk-Mono-titrkd_h-VlxCZmu1Haa6nQurqvJ.ttf"].map((f) => (
      <link key={f} rel="preload" href={`/assets/${f}`} as="font" crossOrigin="anonymous" />
    ))}
  </>
);

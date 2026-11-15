import type { Project } from "../../../site/lib/types";
import { Seo, projectImage, projectJsonLd } from "../../../site/components/Seo";

export const Head = ({ data }: { data: { project: Project } }) => (
  <>
    <Seo
      title={data.project.title ?? data.project.slug}
      description={data.project.description}
      path={`/projects/${data.project.slug}`}
      image={projectImage(data.project)}
      jsonLd={projectJsonLd(data.project, projectImage(data.project))}
    />
    {/* apply a saved theme before first paint (no flash); the toggle that sets it is in Shell.tsx */}
    <script
      dangerouslySetInnerHTML={{
        __html: `try{var t=localStorage.getItem("theme");if(t==="light"||t==="dark")document.documentElement.dataset.theme=t}catch(e){}`,
      }}
    />
    <link rel="icon" href="/assets/favicon_Hbj8jU66HfCXfbngKsu24.ico" />
    {["PPHatton-Ultralight_S4eSUf5DGawGuTN87xecl.otf", "WorkSans-Light_Gly5URkuegk6H4yl8e4Eo.ttf", "DOTNorekk-Mono-titrkd_h-VlxCZmu1Haa6nQurqvJ.ttf"].map((f) => (
      <link key={f} rel="preload" href={`/assets/${f}`} as="font" crossOrigin="anonymous" />
    ))}
  </>
);

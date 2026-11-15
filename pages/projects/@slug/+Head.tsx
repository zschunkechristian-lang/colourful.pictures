import type { Project } from "../../../site/lib/types";

export const Head = ({ data }: { data: { project: Project } }) => (
  <>
    <meta charSet="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>{data.project.title}</title>
    {data.project.description && <meta name="description" content={data.project.description} />}
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

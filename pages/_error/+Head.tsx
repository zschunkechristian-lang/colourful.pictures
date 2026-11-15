import { Seo } from "../../site/components/Seo";

export const Head = () => (
  <>
    <Seo title="Page not found – colourful.pictures" path="/" noindex />
    <script
      dangerouslySetInnerHTML={{
        __html: `try{var t=localStorage.getItem("theme");if(t==="light"||t==="dark")document.documentElement.dataset.theme=t}catch(e){}`,
      }}
    />
    <link rel="icon" href="/assets/favicon_Hbj8jU66HfCXfbngKsu24.ico" />
  </>
);

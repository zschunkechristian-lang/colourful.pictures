import { type Root, hydrateRoot } from "react-dom/client";
import type { OnRenderClientAsync } from "vike/types";
import { arrive, whenLeft } from "../site/lib/page-motion";

let root: Root;

export const onRenderClient: OnRenderClientAsync = async (pageContext) => {
  const Head = pageContext.config.Head ?? (() => <></>);
  const Page = pageContext.Page ?? (() => <></>);
  const htmlContent = (
    <>
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <Head data={pageContext.data} />
        {/* avoid hydrating custom code on client, it will duplicate all scripts */}
      </head>
      <Page data={pageContext.data} />
    </>
  );
  if (root === undefined) {
    root = hydrateRoot(document.documentElement, htmlContent);
    return;
  }
  await whenLeft(); // the old page has finished fading out
  arrive(() => root.render(htmlContent));
};

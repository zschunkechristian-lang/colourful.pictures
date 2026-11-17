import { renderToReadableStream } from "react-dom/server.browser";
import { dangerouslySkipEscape, escapeInject } from "vike/server";
import type { OnRenderHtmlAsync } from "vike/types";
import { SITE } from "../site/lib/config";

export const onRenderHtml: OnRenderHtmlAsync = async (pageContext) => {
  const Head = pageContext.config.Head ?? (() => <></>);
  const Page = pageContext.Page ?? (() => <></>);
  const stream = await renderToReadableStream(
    <html lang={SITE.lang}>
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <Head data={pageContext.data} />
      </head>
      <Page data={pageContext.data} />
    </html>
  );
  await stream.allReady;
  const html = dangerouslySkipEscape(await new Response(stream).text());
  return escapeInject`${html}`;
};

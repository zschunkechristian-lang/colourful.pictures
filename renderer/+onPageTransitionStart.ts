import type { OnPageTransitionStartSync } from "vike/types";
import { leave } from "../site/lib/page-motion";

// Deliberately not awaited: the old page fades out while the next one loads. onRenderClient waits for the fade.
export const onPageTransitionStart: OnPageTransitionStartSync = (pageContext) => {
  leave(pageContext.urlPathname);
};

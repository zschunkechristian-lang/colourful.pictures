import type { Config } from "vike/types";

export default {
  clientRouting: true,
  prerender: { disableAutoRun: true },
  meta: {
    Head: {
      env: { server: true, client: true },
    },
    lang: {
      env: { server: true, client: true },
    },
  },
} satisfies Config;

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import vike from "vike/plugin";
import { cmsPlugin } from "./site/editor/server/cms-plugin";

const sourceConditions =
  process.env.WEBSTUDIO_LOCAL_CLI_BOOTSTRAPPED === "1" ? ["webstudio"] : [];

export default defineConfig({
  css: { transformer: "lightningcss" },
  plugins: [react(), vike(), cmsPlugin()],
  resolve: {
    conditions: [...sourceConditions, "browser", "development|production"],
  },
  ssr: {
    resolve: {
      conditions: [...sourceConditions, "node", "development|production"],
    },
  },
});

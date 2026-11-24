import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import vike from "vike/plugin";
import { cmsPlugin } from "./site/editor/server/cms-plugin";

// `npm run build:edit` (VITE_EDITOR=1) builds the editor-enabled copy of the site for the edit Worker
// into its own folder, so it can never be mixed up with the public build in dist/.
const editBuild = process.env.VITE_EDITOR === "1";

export default defineConfig(({ command }) => ({
  css: { transformer: "lightningcss" },
  build: { outDir: editBuild ? "dist-edit" : "dist" },
  // Replaced by a literal at build time, so in the public build the editor import is dead code and
  // neither its JS nor its CSS is emitted.
  define: { __EDITOR__: JSON.stringify(command === "serve" || editBuild) },
  plugins: [react(), vike(), cmsPlugin()],
}));

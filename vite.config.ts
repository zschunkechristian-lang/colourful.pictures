import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import vike from "vike/plugin";
import { cmsPlugin } from "./site/editor/server/cms-plugin";

export default defineConfig({
  css: { transformer: "lightningcss" },
  plugins: [react(), vike(), cmsPlugin()],
});

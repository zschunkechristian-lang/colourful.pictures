// Lists the R2 bucket and writes site/content/media-manifest.json, which the editor's media
// picker reads. The editor's "Refresh media" button does the same; this is the CLI version.
// Run: npm run manifest   (needs R2_* in .env, see scripts/lib/r2-manifest.mjs)
import { buildManifest, countItems, MANIFEST_FILE, writeManifest } from "./lib/r2-manifest.mjs";

try {
  const manifest = await buildManifest();
  writeManifest(manifest);
  console.log(`${Object.keys(manifest.projects).length} projects, ${countItems(manifest)} media items -> ${MANIFEST_FILE}`);
} catch (err) {
  console.error(err instanceof Error ? err.message : err);
  process.exit(1);
}

// The /play page (site/content/pages/play.json) uses the numbered media layout, but its files still live
// at assets.mim.studio/website/playground/ under their old names. This copies them into ./playground-upload/
// with the new names, ready to upload to the bucket (R2) as website/projects/playground/ . Then run
// `npm run manifest` so the editor's media picker lists them.
//
//   node scripts/migrate/playground-assets.mjs
//   (upload) rclone copy playground-upload/playground r2:<bucket>/website/projects/playground
import fs from "node:fs";
import path from "node:path";

const OLD = "https://assets.mim.studio/website/playground";
const stills = ["complexity.01", "slices.02", "slices.01", "slitscan.01", "slitscan.03", "slitscan.02", "slitscan.04", "slitscan.05", "portraits.01", "portraits.02", "portraits.03", "xotq.01", "xotq.02", "barclays.02", "lise.02", "lise.01", "lise.03", "lise.04", "lise.05", "lise.06", "lise.07", "trident.01", "trident.02"];
const clips = ["MIM_Playground_cz_gradient_01.mp4", "MIM_Playground_cz_gradient_02.mp4", "MIM.playground.slitscan.01.mp4", "MIM.playground.felt.01.mp4", "Mim.CoPiAvatar.01.mp4"];

const jobs = [
  ...stills.map((name, i) => [`${OLD}/MIM.playground.${name}.jpg${name === "trident.02" ? ".jpg" : ""}`, `stills/playground_frame_${String(i + 1).padStart(2, "0")}.jpg`]),
  ...clips.map((file, i) => [`${OLD}/${file}`, `video/playground_clip_${String(i + 1).padStart(2, "0")}_h264.mp4`]),
];
const out = "playground-upload/playground";
for (const [url, dest] of jobs) {
  const file = path.join(out, dest);
  fs.mkdirSync(path.dirname(file), { recursive: true });
  const res = await fetch(url);
  if (!res.ok) { console.error(`FAILED ${res.status} ${url}`); continue; }
  fs.writeFileSync(file, Buffer.from(await res.arrayBuffer()));
  console.log(`${dest}  <-  ${url}`);
}
console.log("\nNote: the clips need no poster/webm to play, but playground_clip_NN_poster.jpg and _av1.webm make them load like the other projects' clips.");

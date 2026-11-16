// Where media lives and how filenames are built. This is the single place that
// knows the bucket layout (it replaces the old window.MIM.buildAssetUrl script).
//
//   stills:  <CDN>/<project>/stills/<project>_frame_<n>.jpg   (or _frame_<n>.webp when n ends in ".webp")
//   video:   <CDN>/<project>/video/<project>_{header|master|clip_<n>}_{h264.mp4|av1.webm|poster.jpg}

export const CDN = "https://assets.colourful.pictures/website/projects";

import type { Media, Still, Video } from "./schema";
export type { Media, Still, Video };

/** `n` is the part after `_frame_`; ".jpg" is implied, a webp still carries its extension ("07.webp"). */
export const stillUrl = (m: Pick<Still, "project" | "n"> & Partial<Still>) => `${CDN}/${m.project}/stills/${m.project}_frame_${m.n}${/\.webp$/.test(m.n) ? "" : ".jpg"}`;

export function videoUrls(m: Video) {
  const base = `${CDN}/${m.project}/video`;
  const stem = m.type === "clip" ? `${m.project}_clip_${m.n}` : `${m.project}_${m.type}`;
  return {
    poster: `${base}/${stem}_poster.jpg`,
    mp4: `${base}/${stem}_h264.mp4`,
    webm: `${base}/${stem}_av1.webm`,
  };
}

/** The master film is named `<project>_master_01_*` (numbered), unlike the other types. */
export function masterUrls(project: string, file = "master_01") {
  const base = `${CDN}/${project}/video`;
  return {
    poster: `${base}/${project}_${file}_poster.jpg`,
    mp4: `${base}/${project}_${file}_h264.mp4`,
    webm: `${base}/${project}_${file}_av1.webm`,
  };
}

// Where media lives and how filenames are built. This is the single place that
// knows the bucket layout (it replaces the old window.MIM.buildAssetUrl script).
//
//   stills:  <CDN>/<project>/stills/<file>   (any filename; the editor picks from a scan of the folder)
//   video:   <CDN>/<project>/video/<file>   (an mp4, plus an optional webm and poster; any filenames)

export const CDN = "https://assets.colourful.pictures/website/projects";

import type { Media, Still, Video } from "./schema";
export type { Media, Still, Video };

export const stillUrl = (m: Pick<Still, "project" | "file">) => `${CDN}/${m.project}/stills/${encodeURIComponent(m.file)}`;

/** The mp4 is the baseline; the AV1 webm and the poster are only there when the video has them. */
export function videoUrls(m: { project: string; file: string; webm?: string; poster?: string }) {
  const url = (f: string) => `${CDN}/${m.project}/video/${encodeURIComponent(f)}`;
  return { mp4: url(m.file), webm: m.webm ? url(m.webm) : undefined, poster: m.poster ? url(m.poster) : undefined };
}

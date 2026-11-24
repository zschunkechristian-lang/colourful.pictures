// Pure manifest logic: turns a list of bucket keys into the manifest the media picker reads.
// No Node APIs, so the edit Worker can import it too.
export const MANIFEST_FILE = "site/content/media-manifest.json";
export const PREFIX = "website/projects/";
const IMAGE = /\.(jpe?g|png|webp|avif|gif)$/i;
const BASE = "https://assets.colourful.pictures/website/projects";

/**
 * Groups the files of a video folder into videos. Every mp4 is a video (the h264 fallback that always plays);
 * a webm and a poster image with the same stem are attached when present. A trailing `_h264` / `_av1` /
 * `_poster` on the stem is optional, so both `clip_03_h264.mp4` and plain `clip_03.mp4` work.
 * `_h265` / `_hevc` mp4s are skipped (not served).
 * Returns `{ file, webm?, poster? }` (filenames), sorted by name.
 */
export function groupVideos(files) {
  const webm = new Map();
  const poster = new Map();
  const mp4 = [];
  for (const f of files) {
    let m;
    if (/_(h265|hevc)\.mp4$/i.test(f)) continue; // other encodes of a video that is already listed
    if ((m = /^(.+?)(?:_h264)?\.mp4$/i.exec(f))) mp4.push([m[1], f]);
    else if ((m = /^(.+?)(?:_av1)?\.webm$/i.exec(f))) webm.set(m[1], f);
    else if ((m = /^(.+?)(_poster)?\.(?:jpe?g|png|webp|avif)$/i.exec(f))) {
      if (m[2] || !poster.has(m[1])) poster.set(m[1], f); // an explicit `_poster` wins over a plain image
    }
  }
  return mp4
    .map(([stem, file]) => ({ file, ...(webm.has(stem) ? { webm: webm.get(stem) } : {}), ...(poster.has(stem) ? { poster: poster.get(stem) } : {}) }))
    .sort((a, b) => a.file.localeCompare(b.file, "en", { numeric: true }));
}

/**
 * Builds the manifest object from the bucket's object keys (pure: shared by the S3 lister and the Worker's R2 binding).
 * Every file under `website/projects/<project>/` counts, in whatever subfolder. Files in `stills/` and `video/`
 * are listed by bare name (the legacy form); anywhere else by their path from the project folder
 * ("extra/shot.webp", or "./shot.webp" for the project folder itself), which assets.ts serves as is. Videos are grouped per folder, and an image that
 * shares its name with a video in the same folder is that video's poster, not a still.
 */
export function manifestFromKeys(keys) {
  const projects = {};
  const dirs = {}; // project -> dir -> files
  for (const k of keys) {
    const m = /^website\/projects\/([^/]+)\/(.+)$/.exec(k);
    if (!m) continue;
    const [, project, rel] = m;
    const cut = rel.lastIndexOf("/");
    const dir = cut < 0 ? "" : rel.slice(0, cut);
    const file = rel.slice(cut + 1);
    if (!file) continue; // folder placeholder key
    ((dirs[project] ??= {})[dir] ??= []).push(file);
  }
  for (const [project, byDir] of Object.entries(dirs)) {
    const p = (projects[project] = { stills: [], videos: [] });
    for (const [dir, files] of Object.entries(byDir)) {
      const prefix = dir === "stills" || dir === "video" ? "" : `${dir || "."}/`; // "./x" = directly in the project folder
      const videos = groupVideos(files);
      const posters = new Set(videos.map((v) => v.poster));
      for (const v of videos) p.videos.push({ file: prefix + v.file, ...(v.webm ? { webm: prefix + v.webm } : {}), ...(v.poster ? { poster: prefix + v.poster } : {}) });
      if (dir === "video") continue; // images next to the legacy videos are posters only
      for (const f of files) if (IMAGE.test(f) && !posters.has(f)) p.stills.push(prefix + f);
    }
    p.stills.sort((a, b) => a.localeCompare(b, "en", { numeric: true }));
    p.videos.sort((a, b) => a.file.localeCompare(b.file, "en", { numeric: true }));
  }
  return { base: BASE, projects: Object.fromEntries(Object.entries(projects).sort()) };
}

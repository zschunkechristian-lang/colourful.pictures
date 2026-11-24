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

/** Builds the manifest object from the bucket's object keys (pure: shared by the S3 lister and the Worker's R2 binding). */
export function manifestFromKeys(keys) {
  const projects = {};
  const videoFiles = {};
  for (const k of keys) {
    const m = /^website\/projects\/([^/]+)\/(stills|video)\/(.+)$/.exec(k);
    if (!m) continue;
    const [, project, dir, file] = m;
    const p = (projects[project] ??= { stills: [], videos: [] });
    if (dir === "stills") {
      // every image in the folder counts, whatever it is called
      if (IMAGE.test(file) && !file.includes("/")) p.stills.push(file);
    } else if (!file.includes("/")) {
      (videoFiles[project] ??= []).push(file);
    }
  }
  for (const [project, files] of Object.entries(videoFiles)) (projects[project] ??= { stills: [], videos: [] }).videos = groupVideos(files);
  for (const p of Object.values(projects)) {
    p.stills.sort((a, b) => a.localeCompare(b, "en", { numeric: true }));
    p.videos.sort((a, b) => a.file.localeCompare(b.file, "en", { numeric: true }));
  }
  return { base: BASE, projects: Object.fromEntries(Object.entries(projects).sort()) };
}

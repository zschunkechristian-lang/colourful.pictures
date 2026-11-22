// Lists the R2 bucket (read-only token from .env) and builds the media manifest that the
// editor's media picker reads. Shared by `npm run manifest` and the editor's "Refresh media"
// button (POST /__cms/refresh-media). Plain SigV4 over fetch, so no SDK dependency.
// Needs R2_ACCOUNT_ID, R2_ACCESS_KEY_ID, R2_SECRET_ACCESS_KEY, R2_BUCKET in .env.
import crypto from "node:crypto";
import fs from "node:fs";

export const MANIFEST_FILE = "site/content/media-manifest.json";
const PREFIX = "website/projects/";
const IMAGE = /\.(jpe?g|png|webp|avif|gif)$/i;
const BASE = "https://assets.colourful.pictures/website/projects";

const hmac = (k, s) => crypto.createHmac("sha256", k).update(s).digest();
const sha = (s) => crypto.createHash("sha256").update(s).digest("hex");
const enc = (s) => encodeURIComponent(s).replace(/[!'()*]/g, (c) => "%" + c.charCodeAt(0).toString(16).toUpperCase());

/** Reads R2_* from .env (if present) and the real environment; throws when something is missing. */
function credentials() {
  try { process.loadEnvFile(".env"); } catch { /* fall back to the real environment */ }
  const { R2_ACCOUNT_ID: acct, R2_ACCESS_KEY_ID: key, R2_SECRET_ACCESS_KEY: secret, R2_BUCKET: bucket } = process.env;
  if (!acct || !key || !secret || !bucket) throw new Error("Missing R2_ACCOUNT_ID / R2_ACCESS_KEY_ID / R2_SECRET_ACCESS_KEY / R2_BUCKET in .env");
  return { acct, key, secret, bucket };
}

async function list({ acct, key, secret, bucket }, token) {
  const host = `${acct}.r2.cloudflarestorage.com`;
  const params = { "list-type": "2", prefix: PREFIX, "max-keys": "1000", ...(token ? { "continuation-token": token } : {}) };
  const query = Object.keys(params).sort().map((k) => `${enc(k)}=${enc(params[k])}`).join("&");
  const now = new Date().toISOString().replace(/[:-]|\.\d{3}/g, "");
  const day = now.slice(0, 8);
  const path = `/${bucket}`;
  const headers = `host:${host}\nx-amz-content-sha256:UNSIGNED-PAYLOAD\nx-amz-date:${now}\n`;
  const signed = "host;x-amz-content-sha256;x-amz-date";
  const canonical = `GET\n${path}\n${query}\n${headers}\n${signed}\nUNSIGNED-PAYLOAD`;
  const scope = `${day}/auto/s3/aws4_request`;
  const toSign = `AWS4-HMAC-SHA256\n${now}\n${scope}\n${sha(canonical)}`;
  const k = hmac(hmac(hmac(hmac("AWS4" + secret, day), "auto"), "s3"), "aws4_request");
  const auth = `AWS4-HMAC-SHA256 Credential=${key}/${scope}, SignedHeaders=${signed}, Signature=${crypto.createHmac("sha256", k).update(toSign).digest("hex")}`;
  const res = await fetch(`https://${host}${path}?${query}`, {
    headers: { "x-amz-date": now, "x-amz-content-sha256": "UNSIGNED-PAYLOAD", authorization: auth },
  });
  const xml = await res.text();
  if (!res.ok) throw new Error(`R2 listing failed (HTTP ${res.status}): ${xml.slice(0, 300)}`);
  return {
    keys: [...xml.matchAll(/<Key>([^<]+)<\/Key>/g)].map((m) => m[1]),
    next: /<IsTruncated>true<\/IsTruncated>/.test(xml) ? /<NextContinuationToken>([^<]+)</.exec(xml)?.[1] : undefined,
  };
}

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

/** Lists the bucket and returns the manifest object (does not write anything). */
export async function buildManifest() {
  const creds = credentials();
  const keys = [];
  let token;
  do {
    const r = await list(creds, token);
    keys.push(...r.keys);
    token = r.next;
  } while (token);

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

export const countItems = (manifest) => Object.values(manifest.projects).reduce((n, p) => n + p.stills.length + p.videos.length, 0);

/** Atomic write; skips the write (returns false) when nothing changed. */
export function writeManifest(manifest, file = MANIFEST_FILE) {
  const text = JSON.stringify(manifest, null, 2) + "\n";
  if (fs.existsSync(file) && fs.readFileSync(file, "utf8") === text) return false;
  const tmp = `${file}.${process.pid}.tmp`;
  fs.writeFileSync(tmp, text);
  fs.renameSync(tmp, file);
  return true;
}

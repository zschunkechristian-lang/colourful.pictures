// Lists the R2 bucket (read-only token from .env) and writes site/content/media-manifest.json,
// which the editor's media picker reads. Run: npm run manifest
// Needs R2_ACCOUNT_ID, R2_ACCESS_KEY_ID, R2_SECRET_ACCESS_KEY, R2_BUCKET in .env.
// Plain SigV4 over fetch, so no SDK dependency.
import crypto from "node:crypto";
import fs from "node:fs";

try { process.loadEnvFile(".env"); } catch { /* fall back to the real environment */ }
const { R2_ACCOUNT_ID: acct, R2_ACCESS_KEY_ID: key, R2_SECRET_ACCESS_KEY: secret, R2_BUCKET: bucket } = process.env;
if (!acct || !key || !secret || !bucket) {
  console.error("Missing R2_ACCOUNT_ID / R2_ACCESS_KEY_ID / R2_SECRET_ACCESS_KEY / R2_BUCKET in .env");
  process.exit(1);
}

const PREFIX = "website/projects/";
const host = `${acct}.r2.cloudflarestorage.com`;
const hmac = (k, s) => crypto.createHmac("sha256", k).update(s).digest();
const sha = (s) => crypto.createHash("sha256").update(s).digest("hex");
const enc = (s) => encodeURIComponent(s).replace(/[!'()*]/g, (c) => "%" + c.charCodeAt(0).toString(16).toUpperCase());

async function list(token) {
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

const keys = [];
let token;
do {
  const r = await list(token);
  keys.push(...r.keys);
  token = r.next;
} while (token);

const projects = {};
for (const k of keys) {
  const m = /^website\/projects\/([^/]+)\/(stills|video)\/(.+)$/.exec(k);
  if (!m) continue;
  const [, project, dir, file] = m;
  const p = (projects[project] ??= { stills: [], videos: [] });
  if (dir === "stills") {
    const s = new RegExp(`^${project}_frame_(.+)\\.jpg$`).exec(file);
    if (s) p.stills.push(s[1]);
  } else {
    const v = new RegExp(`^${project}_(header|master_\\d+|clip_(.+))_poster\\.jpg$`).exec(file);
    if (!v) continue;
    if (v[1] === "header") p.videos.push({ type: "header" });
    else if (v[1].startsWith("master")) p.videos.push({ type: "master", file: v[1] });
    else p.videos.push({ type: "clip", n: v[2] });
  }
}
for (const p of Object.values(projects)) {
  p.stills.sort();
  p.videos.sort((a, b) => JSON.stringify(a).localeCompare(JSON.stringify(b)));
}

const out = { base: "https://assets.colourful.pictures/website/projects", projects: Object.fromEntries(Object.entries(projects).sort()) };
fs.writeFileSync("site/content/media-manifest.json", JSON.stringify(out, null, 2) + "\n");
const total = Object.values(projects).reduce((n, p) => n + p.stills.length + p.videos.length, 0);
console.log(`${Object.keys(projects).length} projects, ${total} media items -> site/content/media-manifest.json`);

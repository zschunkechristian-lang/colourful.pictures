// Lists the R2 bucket (read-only token from .env) and builds the media manifest that the
// editor's media picker reads. Shared by `npm run manifest` and the editor's "Refresh media"
// button (POST /__cms/refresh-media). Plain SigV4 over fetch, so no SDK dependency.
// Needs R2_ACCOUNT_ID, R2_ACCESS_KEY_ID, R2_SECRET_ACCESS_KEY, R2_BUCKET in .env.
import crypto from "node:crypto";
import fs from "node:fs";

import { MANIFEST_FILE, PREFIX, groupVideos, manifestFromKeys } from "./manifest-core.mjs";

export { MANIFEST_FILE, groupVideos, manifestFromKeys };

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
  return manifestFromKeys(keys);
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

// Verifies the Cloudflare Access token (`Cf-Access-Jwt-Assertion`) that Access adds to every request
// it lets through. Access already blocks strangers at the edge; checking the token here as well means
// the save API still refuses everyone if the Access application is ever misconfigured, or if someone
// reaches the Worker by another hostname (workers.dev, a stray route).
//
// RS256 only, keys from https://<team>.cloudflareaccess.com/cdn-cgi/access/certs.

export type AccessConfig = {
  /** Team domain without the scheme, e.g. "yourteam.cloudflareaccess.com" */
  teamDomain: string;
  /** The Access application's AUD tag (Zero Trust > Access > Applications > the app > Overview) */
  aud: string;
  /** If set, only these emails (lower case) are let in, even when Access would admit others */
  allowedEmails?: string[];
};

type Jwk = JsonWebKey & { kid?: string };
export type Certs = { keys: Jwk[] };

const b64urlToBytes = (s: string) => {
  const bin = atob(s.replace(/-/g, "+").replace(/_/g, "/").padEnd(Math.ceil(s.length / 4) * 4, "="));
  return Uint8Array.from(bin, (c) => c.charCodeAt(0));
};
const b64urlToJson = (s: string) => JSON.parse(new TextDecoder().decode(b64urlToBytes(s)));

let certCache: { at: number; domain: string; certs: Certs } | null = null;

async function loadCerts(domain: string, fetchImpl: typeof fetch, now: number, force = false): Promise<Certs> {
  if (!force && certCache && certCache.domain === domain && now - certCache.at < 10 * 60_000) return certCache.certs;
  const res = await fetchImpl(`https://${domain}/cdn-cgi/access/certs`);
  if (!res.ok) throw new Error(`could not load Access certs (HTTP ${res.status})`);
  const certs = (await res.json()) as Certs;
  certCache = { at: now, domain, certs };
  return certs;
}

/** Resolves to the verified email, or throws with the reason (never shown to the caller: it only gets a 403). */
export async function verifyAccessJwt(
  token: string | null | undefined,
  cfg: AccessConfig,
  opts: { now?: number; fetch?: typeof fetch } = {},
): Promise<string> {
  const fetchImpl = opts.fetch ?? fetch;
  const now = opts.now ?? Date.now();
  if (!cfg.teamDomain || !cfg.aud) throw new Error("Access is not configured (ACCESS_TEAM_DOMAIN / ACCESS_AUD)");
  if (!token) throw new Error("no Access token");
  const parts = token.split(".");
  if (parts.length !== 3) throw new Error("malformed token");
  const [h, p, s] = parts;
  const header = b64urlToJson(h) as { alg?: string; kid?: string };
  const payload = b64urlToJson(p) as { aud?: string | string[]; iss?: string; exp?: number; nbf?: number; email?: string };
  if (header.alg !== "RS256") throw new Error("unexpected algorithm");

  let certs = await loadCerts(cfg.teamDomain, fetchImpl, now);
  let jwk = certs.keys.find((k) => k.kid === header.kid);
  if (!jwk) {
    // keys rotate: look once more with a fresh copy before giving up
    certs = await loadCerts(cfg.teamDomain, fetchImpl, now, true);
    jwk = certs.keys.find((k) => k.kid === header.kid);
  }
  if (!jwk) throw new Error("unknown signing key");

  const key = await crypto.subtle.importKey("jwk", jwk, { name: "RSASSA-PKCS1-v1_5", hash: "SHA-256" }, false, ["verify"]);
  const valid = await crypto.subtle.verify("RSASSA-PKCS1-v1_5", key, b64urlToBytes(s), new TextEncoder().encode(`${h}.${p}`));
  if (!valid) throw new Error("bad signature");

  const aud = Array.isArray(payload.aud) ? payload.aud : [payload.aud];
  if (!aud.includes(cfg.aud)) throw new Error("wrong audience");
  if (payload.iss !== `https://${cfg.teamDomain}`) throw new Error("wrong issuer");
  const sec = Math.floor(now / 1000);
  if (typeof payload.exp !== "number" || payload.exp < sec) throw new Error("token expired");
  if (typeof payload.nbf === "number" && payload.nbf > sec + 60) throw new Error("token not yet valid");

  const email = (payload.email ?? "").toLowerCase();
  if (!email) throw new Error("token has no email");
  if (cfg.allowedEmails?.length && !cfg.allowedEmails.includes(email)) throw new Error("email not allowed");
  return email;
}

/** Test hook: forget cached certs. */
export const resetCertCache = () => { certCache = null; };

import { test, beforeEach } from "node:test";
import assert from "node:assert/strict";
import { verifyAccessJwt, resetCertCache } from "../worker/access.ts";

const TEAM = "team.cloudflareaccess.com";
const AUD = "aud-123";
const NOW = 1_800_000_000_000;
const b64u = (b: ArrayBuffer | Uint8Array | string) => {
  const bytes = typeof b === "string" ? new TextEncoder().encode(b) : new Uint8Array(b);
  return btoa(String.fromCharCode(...bytes)).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
};

const gen = () => crypto.subtle.generateKey({ name: "RSASSA-PKCS1-v1_5", modulusLength: 2048, publicExponent: new Uint8Array([1, 0, 1]), hash: "SHA-256" }, true, ["sign", "verify"]) as Promise<CryptoKeyPair>;

async function sign(pair: CryptoKeyPair, claims: object, kid = "k1") {
  const h = b64u(JSON.stringify({ alg: "RS256", kid }));
  const p = b64u(JSON.stringify(claims));
  const sig = await crypto.subtle.sign("RSASSA-PKCS1-v1_5", pair.privateKey, new TextEncoder().encode(`${h}.${p}`));
  return `${h}.${p}.${b64u(sig)}`;
}
async function certsFor(pair: CryptoKeyPair, kid = "k1") {
  const jwk = await crypto.subtle.exportKey("jwk", pair.publicKey);
  const fetchImpl = (async () => new Response(JSON.stringify({ keys: [{ ...jwk, kid }] }))) as typeof fetch;
  return fetchImpl;
}
const claims = (over: object = {}) => ({ aud: [AUD], iss: `https://${TEAM}`, exp: NOW / 1000 + 600, nbf: NOW / 1000 - 10, email: "Me@Example.com", ...over });
const cfg = { teamDomain: TEAM, aud: AUD };

beforeEach(() => resetCertCache());

test("accepts a valid token and returns the lower-cased email", async () => {
  const pair = await gen();
  const email = await verifyAccessJwt(await sign(pair, claims()), cfg, { now: NOW, fetch: await certsFor(pair) });
  assert.equal(email, "me@example.com");
});

test("rejects missing, malformed and unsigned tokens", async () => {
  const pair = await gen();
  const fetch = await certsFor(pair);
  await assert.rejects(verifyAccessJwt(null, cfg, { now: NOW, fetch }));
  await assert.rejects(verifyAccessJwt("a.b", cfg, { now: NOW, fetch }));
  const none = `${b64u(JSON.stringify({ alg: "none" }))}.${b64u(JSON.stringify(claims()))}.`;
  await assert.rejects(verifyAccessJwt(none, cfg, { now: NOW, fetch }));
});

test("rejects a token signed by another key", async () => {
  const real = await gen();
  const attacker = await gen();
  await assert.rejects(verifyAccessJwt(await sign(attacker, claims()), cfg, { now: NOW, fetch: await certsFor(real) }), /bad signature/);
});

test("rejects wrong audience, issuer and expired tokens", async () => {
  const pair = await gen();
  const fetch = await certsFor(pair);
  await assert.rejects(verifyAccessJwt(await sign(pair, claims({ aud: ["other"] })), cfg, { now: NOW, fetch }), /audience/);
  resetCertCache();
  await assert.rejects(verifyAccessJwt(await sign(pair, claims({ iss: "https://evil.example" })), cfg, { now: NOW, fetch }), /issuer/);
  resetCertCache();
  await assert.rejects(verifyAccessJwt(await sign(pair, claims({ exp: NOW / 1000 - 1 })), cfg, { now: NOW, fetch }), /expired/);
});

test("the email allow-list narrows who gets in", async () => {
  const pair = await gen();
  const fetch = await certsFor(pair);
  const token = await sign(pair, claims());
  await assert.rejects(verifyAccessJwt(token, { ...cfg, allowedEmails: ["someone@else.com"] }, { now: NOW, fetch }), /not allowed/);
  resetCertCache();
  assert.equal(await verifyAccessJwt(token, { ...cfg, allowedEmails: ["me@example.com"] }, { now: NOW, fetch }), "me@example.com");
});

test("refuses everything when Access is not configured", async () => {
  const pair = await gen();
  await assert.rejects(verifyAccessJwt(await sign(pair, claims()), { teamDomain: "", aud: "" }, { now: NOW, fetch: await certsFor(pair) }), /not configured/);
});

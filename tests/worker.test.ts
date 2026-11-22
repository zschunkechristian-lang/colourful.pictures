import { test } from "node:test";
import assert from "node:assert/strict";
import worker, { type Env } from "../worker/index.ts";

const env = {
  ASSETS: { fetch: async () => new Response("asset") },
  MEDIA: { list: async () => ({ objects: [], truncated: false }) },
  GITHUB_TOKEN: "t", GITHUB_REPO: "o/r", GITHUB_BASE: "main", GITHUB_BRANCH: "cms/edit",
  ACCESS_TEAM_DOMAIN: "team.cloudflareaccess.com", ACCESS_AUD: "aud",
} satisfies Env;

test("everything outside /__cms is served from the static assets", async () => {
  const res = await worker.fetch(new Request("https://edit.test/projects/zdf"), env);
  assert.equal(await res.text(), "asset");
});

test("the save API refuses requests without an Access token", async () => {
  for (const [method, path] of [["GET", "/__cms/ping"], ["POST", "/__cms/project/zdf"], ["POST", "/__cms/refresh-media"]]) {
    const res = await worker.fetch(new Request(`https://edit.test${path}`, { method, headers: { "x-cms": "1" }, body: method === "POST" ? "{}" : undefined }), env);
    assert.equal(res.status, 403, `${method} ${path}`);
  }
});

test("a forged token is refused", async () => {
  const forged = `${btoa('{"alg":"RS256","kid":"x"}')}.${btoa('{"aud":["aud"],"email":"me@x.com"}')}.AAAA`;
  const res = await worker.fetch(new Request("https://edit.test/__cms/ping", { headers: { "cf-access-jwt-assertion": forged } }), { ...env });
  assert.equal(res.status, 403);
});

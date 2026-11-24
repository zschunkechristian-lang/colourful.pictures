import { test } from "node:test";
import assert from "node:assert/strict";
import { githubStore } from "../worker/github-store.ts";

type Call = { method: string; url: string; body?: any };

/** A tiny fake of the GitHub REST endpoints the store uses. */
function fakeGithub(opts: { branch?: boolean; ahead?: number; behind?: number; file?: string; pr?: boolean } = {}) {
  const calls: Call[] = [];
  let branch = opts.branch ?? false;
  let file = opts.file;
  const fetch = (async (input: string, init: RequestInit = {}) => {
    const method = init.method ?? "GET";
    const body = init.body ? JSON.parse(init.body as string) : undefined;
    const path = input.replace("https://api.github.com/repos/o/r", "");
    calls.push({ method, url: path, body });
    const json = (status: number, b: unknown) => new Response(JSON.stringify(b), { status });
    if (path === "/git/ref/heads/main") return json(200, { object: { sha: "mainsha" } });
    if (path === "/git/ref/heads/cms/edit") return branch ? json(200, { object: { sha: "branchsha" } }) : json(404, {});
    if (path === "/git/refs" && method === "POST") { branch = true; return json(201, {}); }
    if (path.startsWith("/compare/")) return json(200, { ahead_by: opts.ahead ?? 0, behind_by: opts.behind ?? 0 });
    if (path === "/git/refs/heads/cms/edit" && method === "PATCH") return json(200, {});
    if (path.startsWith("/contents/")) {
      if (method === "PUT") { file = Buffer.from(body.content, "base64").toString("utf8"); return json(200, {}); }
      if ((init.headers as Record<string, string>).accept.includes("raw")) return file === undefined ? json(404, {}) : new Response(file);
      return file === undefined ? json(404, {}) : json(200, { sha: "filesha", encoding: "base64", content: Buffer.from(file).toString("base64") });
    }
    if (path.startsWith("/pulls?")) return json(200, opts.pr ? [{ html_url: "https://github.test/pr/7" }] : []);
    if (path === "/pulls" && method === "POST") return json(201, { html_url: "https://github.test/pr/8" });
    return json(500, { unexpected: path });
  }) as unknown as typeof globalThis.fetch;
  return { fetch, calls, file: () => file };
}

const make = (fake: ReturnType<typeof fakeGithub>) => githubStore({ token: "t", repo: "o/r", base: "main", branch: "cms/edit", buildManifest: async () => ({}), fetch: fake.fetch });

test("first save creates the branch from main, commits, and opens the pull request", async () => {
  const fake = fakeGithub({ file: "old" });
  const info = await make(fake).write("site/content/projects/a.json", "new ü\n");
  assert.equal(fake.file(), "new ü\n");
  assert.equal(info && info.pr, "https://github.test/pr/8");
  const create = fake.calls.find((c) => c.url === "/git/refs");
  assert.deepEqual(create?.body, { ref: "refs/heads/cms/edit", sha: "mainsha" });
  const put = fake.calls.find((c) => c.method === "PUT");
  assert.equal(put?.body.branch, "cms/edit");
  assert.equal(put?.body.sha, "filesha");
});

test("nothing is ever written to main", async () => {
  const fake = fakeGithub({ file: "old" });
  await make(fake).write("site/content/projects/a.json", "new");
  for (const c of fake.calls.filter((c) => c.method !== "GET")) {
    assert.ok(c.body?.branch === "cms/edit" || c.body?.ref === "refs/heads/cms/edit" || c.url === "/pulls" || c.url.includes("cms/edit"), `${c.method} ${c.url}`);
  }
});

test("unchanged content makes no commit and reuses the open pull request", async () => {
  const fake = fakeGithub({ branch: true, file: "same", pr: true });
  const info = await make(fake).write("site/content/projects/a.json", "same");
  assert.equal(fake.calls.some((c) => c.method === "PUT"), false);
  assert.equal(info && info.pr, "https://github.test/pr/7");
});

test("a branch left over from a merged pull request is moved forward to main", async () => {
  const fake = fakeGithub({ branch: true, ahead: 0, behind: 3, file: "old" });
  await make(fake).write("site/content/projects/a.json", "new");
  const patch = fake.calls.find((c) => c.method === "PATCH");
  assert.deepEqual(patch?.body, { sha: "mainsha", force: true });
});

test("a branch with unmerged edits is kept as it is", async () => {
  const fake = fakeGithub({ branch: true, ahead: 2, behind: 1, file: "old" });
  await make(fake).write("site/content/projects/a.json", "new");
  assert.equal(fake.calls.some((c) => c.method === "PATCH"), false);
});

test("reads come from the branch when it exists, from main otherwise", async () => {
  const onBranch = fakeGithub({ branch: true, file: "x" });
  await make(onBranch).read("site/content/site.json");
  assert.match(onBranch.calls.at(-1)!.url, /ref=cms%2Fedit/);
  const none = fakeGithub({ branch: false, file: "x" });
  await make(none).read("site/content/site.json");
  assert.match(none.calls.at(-1)!.url, /ref=main/);
  assert.equal(await make(fakeGithub({})).read("site/content/missing.json"), null);
});

test("GitHub errors surface without the response body", async () => {
  const fetch = (async () => new Response("secret details about the token", { status: 403 })) as unknown as typeof globalThis.fetch;
  const store = githubStore({ token: "t", repo: "o/r", base: "main", branch: "cms/edit", buildManifest: async () => ({}), fetch });
  await assert.rejects(store.write("site/content/x.json", "a"), (e: Error) => /HTTP 403/.test(e.message) && !/secret/.test(e.message));
});

test("an unchanged file on a branch level with main opens no pull request (GitHub would answer 422)", async () => {
  const fake = fakeGithub({ branch: true, file: "same", ahead: 0 });
  const info = await make(fake).write("site/content/media-manifest.json", "same");
  assert.deepEqual(info, {});
  assert.ok(!fake.calls.some((c) => c.url === "/pulls" && c.method === "POST"));
});

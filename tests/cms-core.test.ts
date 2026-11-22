import { test } from "node:test";
import assert from "node:assert/strict";
import { handleCms, type ContentStore } from "../site/editor/server/core.ts";
import { serializeProject, projectSchema } from "../site/lib/schema.ts";

function memoryStore(files: Record<string, string> = {}) {
  const writes: string[] = [];
  const store: ContentStore = {
    async read(p) { return files[p] ?? null; },
    async write(p, t) { files[p] = t; writes.push(p); return { pr: "https://example.test/pr/1" }; },
    async buildManifest() { return { base: "x", projects: {} }; },
    remote: true,
  };
  return { store, files, writes };
}

const demo = projectSchema.parse({ slug: "demo", sections: [{ id: "abc12345", type: "reel", media: null }] });
const post = (path: string, body: unknown, headers: Record<string, string> = { "x-cms": "1" }) =>
  new Request(`https://edit.test/__cms${path}`, { method: "POST", headers, body: typeof body === "string" ? body : JSON.stringify(body) });

test("ping reports remote mode", async () => {
  const { store } = memoryStore();
  const res = await handleCms(new Request("https://edit.test/__cms/ping"), "/ping", store);
  assert.deepEqual(await res.json(), { ok: true, remote: true });
});

test("saving a project validates, writes canonical JSON and returns the pull request", async () => {
  const { store, files } = memoryStore({ "site/content/projects/demo.json": serializeProject(demo) });
  const res = await handleCms(post("/project/demo", { ...demo, title: "Changed" }), "/project/demo", store);
  assert.equal(res.status, 200);
  assert.equal((await res.json()).pr, "https://example.test/pr/1");
  assert.match(files["site/content/projects/demo.json"], /"title": "Changed"/);
});

test("page slugs are stored under site/content/pages", async () => {
  const home = { ...demo, slug: "home" };
  const { store, writes } = memoryStore({ "site/content/pages/home.json": serializeProject(home) });
  await handleCms(post("/project/home", home), "/project/home", store);
  assert.deepEqual(writes, ["site/content/pages/home.json"]);
});

test("POST without the x-cms header is refused", async () => {
  const { store, writes } = memoryStore({ "site/content/projects/demo.json": serializeProject(demo) });
  const res = await handleCms(post("/project/demo", demo, {}), "/project/demo", store);
  assert.equal(res.status, 403);
  assert.equal(writes.length, 0);
});

test("invalid content and mismatching slugs are rejected before anything is written", async () => {
  const { store, writes } = memoryStore({ "site/content/projects/demo.json": serializeProject(demo) });
  assert.equal((await handleCms(post("/project/demo", { slug: "demo", sections: [{ type: "nope" }] }), "/project/demo", store)).status, 400);
  assert.equal((await handleCms(post("/project/demo", { ...demo, slug: "other" }), "/project/demo", store)).status, 400);
  assert.equal((await handleCms(post("/project/demo", "{not json"), "/project/demo", store)).status, 400);
  assert.equal(writes.length, 0);
});

test("unknown projects cannot be created by saving", async () => {
  const { store } = memoryStore();
  assert.equal((await handleCms(post("/project/ghost", { ...demo, slug: "ghost" }), "/project/ghost", store)).status, 404);
});

test("slugs cannot escape the content folders", async () => {
  const { store, writes } = memoryStore();
  for (const slug of ["../etc", "a/b", "A", "x.json", ""]) {
    const res = await handleCms(post("/new-project", { slug }), "/new-project", store);
    assert.equal(res.status, 400, slug);
  }
  assert.equal((await handleCms(post("/new-project", { slug: "home" }), "/new-project", store)).status, 400);
  assert.equal(writes.length, 0);
  // a path like /project/../x never matches a route
  assert.equal((await handleCms(post("/project/..%2Fx", demo), "/project/..%2Fx", store)).status, 404);
});

test("new-project creates a valid starter and refuses duplicates", async () => {
  const { store, files } = memoryStore();
  const res = await handleCms(post("/new-project", { slug: "fresh", title: "Fresh" }), "/new-project", store);
  assert.equal(res.status, 200);
  const created = projectSchema.parse(JSON.parse(files["site/content/projects/fresh.json"]));
  assert.equal(created.title, "Fresh");
  assert.equal((await handleCms(post("/new-project", { slug: "fresh" }), "/new-project", store)).status, 409);
});

test("refresh-media stores the manifest and returns it", async () => {
  const { store, files } = memoryStore();
  const res = await handleCms(post("/refresh-media", {}), "/refresh-media", store);
  assert.equal(res.status, 200);
  assert.deepEqual((await res.json()).manifest, { base: "x", projects: {} });
  assert.ok(files["site/content/media-manifest.json"]);
});

test("GET returns the stored project", async () => {
  const text = serializeProject(demo);
  const { store } = memoryStore({ "site/content/projects/demo.json": text });
  const res = await handleCms(new Request("https://edit.test/__cms/project/demo"), "/project/demo", store);
  assert.equal(await res.text(), text);
});

test("oversized bodies are refused", async () => {
  const { store } = memoryStore({ "site/content/projects/demo.json": serializeProject(demo) });
  const res = await handleCms(post("/project/demo", "x".repeat(2 * 1024 * 1024 + 1)), "/project/demo", store);
  assert.equal(res.status, 413);
});

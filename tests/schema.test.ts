import { test } from "node:test";
import assert from "node:assert/strict";
import { projectSchema, mediaSchema, serializeProject, frameFile, frameAlt, withFrameAlt } from "../site/lib/schema.ts";

const project = { slug: "demo", sections: [{ id: "abc12345", type: "reel", media: null }] };

test("project round-trips with canonical formatting", () => {
  const out = serializeProject(projectSchema.parse(project));
  assert.ok(out.endsWith("\n"));
  assert.deepEqual(JSON.parse(out), project);
});

test("unknown keys are rejected", () => {
  assert.equal(projectSchema.safeParse({ ...project, extra: 1 }).success, false);
});

test("bad slug and bad section id are rejected", () => {
  assert.equal(projectSchema.safeParse({ ...project, slug: "Bad Slug" }).success, false);
  assert.equal(projectSchema.safeParse({ slug: "x", sections: [{ id: "X", type: "reel", media: null }] }).success, false);
});

test("statement requires to >= from", () => {
  const s = (from: number, to: number) => ({ slug: "x", sections: [{ id: "abc12345", type: "statement", from, to, align: "start", text: "t" }] });
  assert.equal(projectSchema.safeParse(s(2, 5)).success, true);
  assert.equal(projectSchema.safeParse(s(5, 2)).success, false);
});

test("media is a discriminated union", () => {
  assert.equal(mediaSchema.safeParse({ kind: "still", project: "a", file: "a_01.jpg" }).success, true);
  assert.equal(mediaSchema.safeParse({ kind: "video", project: "a", file: "a_clip_01" }).success, true);
  assert.equal(mediaSchema.safeParse({ kind: "video", project: "a", type: "nope" }).success, false);
});

test("frame helpers", () => {
  assert.equal(frameFile("03"), "03");
  assert.equal(frameFile({ file: "03", alt: "x" }), "03");
  assert.equal(frameAlt("03"), undefined);
  assert.equal(withFrameAlt("03", ""), "03");
  assert.deepEqual(withFrameAlt("03", "x"), { file: "03", alt: "x" });
});

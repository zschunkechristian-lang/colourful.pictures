import { test } from "node:test";
import assert from "node:assert/strict";
import { CDN, stillUrl, videoUrls } from "../site/lib/assets.ts";

test("stillUrl uses the filename as is", () => {
  assert.equal(stillUrl({ project: "zdf", file: "zdf_frame_07.jpg" }), `${CDN}/zdf/stills/zdf_frame_07.jpg`);
  assert.equal(stillUrl({ project: "zdf", file: "whatever name.webp" }), `${CDN}/zdf/stills/whatever%20name.webp`);
});

test("videoUrls serves the mp4 and only adds what exists", () => {
  const full = videoUrls({ project: "zdf", file: "a_h264.mp4", webm: "a_av1.webm", poster: "a_poster.jpg" });
  assert.equal(full.mp4, `${CDN}/zdf/video/a_h264.mp4`);
  assert.equal(full.webm, `${CDN}/zdf/video/a_av1.webm`);
  assert.equal(full.poster, `${CDN}/zdf/video/a_poster.jpg`);
  const bare = videoUrls({ project: "zdf", file: "My Film.mp4" });
  assert.equal(bare.mp4, `${CDN}/zdf/video/My%20Film.mp4`);
  assert.equal(bare.webm, undefined);
  assert.equal(bare.poster, undefined);
});

test("groupVideos accepts single mp4 files and attaches what matches", async () => {
  const { groupVideos } = await import("../scripts/lib/r2-manifest.mjs");
  assert.deepEqual(
    groupVideos(["b.mp4", "a_h264.mp4", "a_av1.webm", "a_poster.jpg", "a.jpg", "b.jpg", "c.webm", "readme.txt"]),
    [{ file: "a_h264.mp4", webm: "a_av1.webm", poster: "a_poster.jpg" }, { file: "b.mp4", poster: "b.jpg" }],
  );
});

test("a name with a folder is served from the project folder", () => {
  assert.equal(stillUrl({ project: "zdf", file: "extra/a b.webp" }), `${CDN}/zdf/extra/a%20b.webp`);
  assert.equal(stillUrl({ project: "zdf", file: "./top.webp" }), `${CDN}/zdf/top.webp`);
  assert.equal(videoUrls({ project: "zdf", file: "cuts/x.mp4", poster: "cuts/x.jpg" }).poster, `${CDN}/zdf/cuts/x.jpg`);
});

test("manifestFromKeys lists files from any subfolder", async () => {
  const { manifestFromKeys } = await import("../scripts/lib/manifest-core.mjs");
  const k = (p: string) => `website/projects/zdf/${p}`;
  const m = manifestFromKeys([k("stills/a.jpg"), k("stills/old/b.webp"), k("extra/c.WEBP"), k("top.png"), k("video/v.mp4"), k("video/v.jpg"), k("cuts/w.mp4"), k("cuts/w.jpg"), k("cuts/notes.txt"), k("extra/")]);
  assert.deepEqual(m.projects.zdf.stills, ["./top.png", "a.jpg", "extra/c.WEBP", "stills/old/b.webp"]);
  assert.deepEqual(m.projects.zdf.videos, [{ file: "cuts/w.mp4", poster: "cuts/w.jpg" }, { file: "v.mp4", poster: "v.jpg" }]);
});

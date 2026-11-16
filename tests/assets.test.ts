import { test } from "node:test";
import assert from "node:assert/strict";
import { CDN, stillUrl, videoUrls, masterUrls } from "../site/lib/assets.ts";

test("stillUrl implies .jpg", () => {
  assert.equal(stillUrl({ project: "zdf", n: "07" }), `${CDN}/zdf/stills/zdf_frame_07.jpg`);
});

test("stillUrl keeps a webp extension", () => {
  assert.equal(stillUrl({ project: "zdf", n: "07.webp" }), `${CDN}/zdf/stills/zdf_frame_07.webp`);
});

test("videoUrls builds clip and header names", () => {
  const clip = videoUrls({ kind: "video", project: "zdf", type: "clip", n: "03" });
  assert.equal(clip.mp4, `${CDN}/zdf/video/zdf_clip_03_h264.mp4`);
  assert.equal(clip.webm, `${CDN}/zdf/video/zdf_clip_03_av1.webm`);
  assert.equal(clip.poster, `${CDN}/zdf/video/zdf_clip_03_poster.jpg`);
  const header = videoUrls({ kind: "video", project: "zdf", type: "header" });
  assert.equal(header.mp4, `${CDN}/zdf/video/zdf_header_h264.mp4`);
});

test("masterUrls defaults to master_01", () => {
  assert.equal(masterUrls("zdf").poster, `${CDN}/zdf/video/zdf_master_01_poster.jpg`);
  assert.equal(masterUrls("zdf", "master_02").mp4, `${CDN}/zdf/video/zdf_master_02_h264.mp4`);
});

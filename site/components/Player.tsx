import { useEffect, useRef, useState } from "react";
import { masterUrls } from "../lib/assets";
import { useLazyVideo } from "./Media";

/** The big film player: click to play/pause, scrub bar, fullscreen. */
export function Player({ project, file = "master_01" }: { project: string; file?: string }) {
  const urls = masterUrls(project, file);
  const video = useRef<HTMLVideoElement>(null);
  const box = useRef<HTMLDivElement>(null);
  const fill = useRef<HTMLDivElement>(null);
  const bar = useRef<HTMLDivElement>(null);
  const [playing, setPlaying] = useState(false);
  useLazyVideo(video, urls, { autoplay: false });

  const fmt = (t: number) => `${Math.floor(t / 60)}:${String(Math.floor(t % 60)).padStart(2, "0")}`;
  useEffect(() => {
    const v = video.current!;
    const b = bar.current!;
    const update = () => {
      if (!v.duration) return;
      if (fill.current) fill.current.style.transform = `scaleX(${v.currentTime / v.duration})`;
      b.setAttribute("aria-valuenow", String(Math.round((v.currentTime / v.duration) * 100)));
      b.setAttribute("aria-valuetext", `${fmt(v.currentTime)} of ${fmt(v.duration)}`);
    };
    const sync = () => setPlaying(!v.paused);
    v.addEventListener("timeupdate", update);
    v.addEventListener("play", sync);
    v.addEventListener("pause", sync);

    // pointer events cover mouse, touch and pen; the pointer is captured so a drag keeps scrubbing outside the bar
    let scrubbing = false;
    const seek = (e: PointerEvent) => {
      if (!v.duration) return;
      const rect = b.getBoundingClientRect();
      v.currentTime = Math.min(Math.max((e.clientX - rect.left) / rect.width, 0), 1) * v.duration;
    };
    const down = (e: PointerEvent) => { scrubbing = true; b.setPointerCapture(e.pointerId); seek(e); };
    const move = (e: PointerEvent) => scrubbing && seek(e);
    const end = () => { scrubbing = false; }; // pointerup, pointercancel and lostpointercapture all end the drag
    b.addEventListener("pointerdown", down);
    b.addEventListener("pointermove", move);
    b.addEventListener("pointerup", end);
    b.addEventListener("pointercancel", end);
    b.addEventListener("lostpointercapture", end);
    return () => {
      v.removeEventListener("timeupdate", update);
      v.removeEventListener("play", sync);
      v.removeEventListener("pause", sync);
      b.removeEventListener("pointerdown", down);
      b.removeEventListener("pointermove", move);
      b.removeEventListener("pointerup", end);
      b.removeEventListener("pointercancel", end);
      b.removeEventListener("lostpointercapture", end);
    };
  }, []);

  const onBarKey = (e: React.KeyboardEvent) => {
    const v = video.current!;
    if (!v.duration) return;
    const step = e.key === "ArrowRight" || e.key === "ArrowUp" ? 5 : e.key === "ArrowLeft" || e.key === "ArrowDown" ? -5 : e.key === "PageUp" ? 15 : e.key === "PageDown" ? -15 : 0;
    if (step) v.currentTime = Math.min(Math.max(v.currentTime + step, 0), v.duration);
    else if (e.key === "Home") v.currentTime = 0;
    else if (e.key === "End") v.currentTime = v.duration;
    else return;
    e.preventDefault();
  };

  const toggle = (e: React.SyntheticEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const v = video.current!;
    if (v.paused || v.ended) v.play().catch((err) => console.error("Playback blocked:", err));
    else v.pause();
  };
  const fullscreen = (e: React.SyntheticEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const v = video.current as HTMLVideoElement & { webkitEnterFullscreen?: () => void };
    if (v.webkitEnterFullscreen) v.webkitEnterFullscreen();
    else if (!document.fullscreenElement) box.current?.requestFullscreen().catch(() => {});
    else document.exitFullscreen();
  };

  return (
    <div className="player" ref={box}>
      <video ref={video} playsInline loop onClick={toggle} />
      <button
        className={`player__toggle ${playing ? "is-playing" : ""}`}
        aria-label={playing ? "Pause" : "Play"}
        onClick={toggle}
      >
        {playing ? <svg viewBox="0 0 24 24" aria-hidden="true"><rect x="5" y="3" width="5" height="18" /><rect x="14" y="3" width="5" height="18" /></svg> : <svg viewBox="0 0 24 24" aria-hidden="true"><polygon points="5,3 19,12 5,21" /></svg>}
      </button>
      <button className="player__fullscreen" aria-label="Fullscreen" onClick={fullscreen}>⛶</button>
      <div className="player__bar" ref={bar} role="slider" tabIndex={0} aria-label="Seek" aria-valuemin={0} aria-valuemax={100} aria-valuenow={0} onKeyDown={onBarKey}>
        <div className="player__fill" ref={fill} />
      </div>
    </div>
  );
}

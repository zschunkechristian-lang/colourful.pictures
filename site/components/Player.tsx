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

  useEffect(() => {
    const v = video.current!;
    const update = () => v.duration && fill.current && (fill.current.style.transform = `scaleX(${v.currentTime / v.duration})`);
    const sync = () => setPlaying(!v.paused);
    v.addEventListener("timeupdate", update);
    v.addEventListener("play", sync);
    v.addEventListener("pause", sync);

    let scrubbing = false;
    const seek = (e: MouseEvent | TouchEvent) => {
      if (!v.duration || !bar.current) return;
      const rect = bar.current.getBoundingClientRect();
      const x = "touches" in e ? e.touches[0].clientX : e.clientX;
      v.currentTime = Math.min(Math.max((x - rect.left) / rect.width, 0), 1) * v.duration;
    };
    const move = (e: MouseEvent) => scrubbing && seek(e);
    const up = () => (scrubbing = false);
    const down = (e: MouseEvent) => ((scrubbing = true), seek(e));
    const b = bar.current!;
    b.addEventListener("mousedown", down);
    b.addEventListener("touchstart", seek, { passive: true });
    document.addEventListener("mousemove", move);
    document.addEventListener("mouseup", up);
    return () => {
      v.removeEventListener("timeupdate", update);
      v.removeEventListener("play", sync);
      v.removeEventListener("pause", sync);
      b.removeEventListener("mousedown", down);
      b.removeEventListener("touchstart", seek);
      document.removeEventListener("mousemove", move);
      document.removeEventListener("mouseup", up);
    };
  }, []);

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
        className="player__toggle"
        aria-label="Play"
        onClick={toggle}
        style={{ opacity: playing ? 0 : 1, visibility: playing ? "hidden" : "visible", pointerEvents: playing ? "none" : "auto" }}
      >
        <svg viewBox="0 0 24 24"><polygon points="5,3 19,12 5,21" /></svg>
      </button>
      <button className="player__fullscreen" aria-label="Fullscreen" onClick={fullscreen}>⛶</button>
      <div className="player__bar" ref={bar}>
        <div className="player__fill" ref={fill} />
      </div>
    </div>
  );
}

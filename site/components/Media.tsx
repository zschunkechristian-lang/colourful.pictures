import { useEffect, useRef } from "react";
import { flyResumeTime } from "../lib/fly";
import { stillUrl, videoUrls, masterUrls, type Media as MediaT, type Video } from "../lib/assets";

/** Lazy-load a video's sources when it gets within ~1600px of the viewport. */
export function useLazyVideo(ref: React.RefObject<HTMLVideoElement | null>, urls: { poster: string; mp4: string; webm: string }, opts: { autoplay: boolean }) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let loaded = false;
    const load = () => {
      if (loaded) return;
      loaded = true;
      el.poster = urls.poster;
      for (const [type, src] of [["video/webm", urls.webm], ["video/mp4", urls.mp4]] as const) {
        const s = document.createElement("source");
        s.type = type;
        s.src = src;
        el.appendChild(s);
      }
      el.load();
      if (opts.autoplay) el.play().catch(() => {});
      else if (el.readyState < 1) el.addEventListener("loadedmetadata", () => { if (el.currentTime === 0) el.currentTime = 0.1; }, { once: true });
    };
    const io = new IntersectionObserver((entries) => entries.some((e) => e.isIntersecting) && (load(), io.disconnect()), { rootMargin: "1600px" });
    io.observe(el);
    return () => io.disconnect();
  }, [urls.mp4]); // eslint-disable-line react-hooks/exhaustive-deps
}

/** Muted looping clip that plays on its own. With `resume` (the hero) it carries on from the tile clip it came from. */
export function AutoVideo({ media, className, resume }: { media: Video; className?: string; resume?: boolean }) {
  const ref = useRef<HTMLVideoElement>(null);
  const urls = videoUrls(media);
  useLazyVideo(ref, urls, { autoplay: true });
  useEffect(() => {
    const el = ref.current;
    if (!resume || !el) return;
    // arriving from a project tile (lib/page-transition.ts): start where the tile clip would be by now
    const seek = () => { const t = flyResumeTime(el.duration); if (t != null) el.currentTime = t; };
    el.addEventListener("loadedmetadata", seek, { once: true });
    if (el.readyState >= 1) seek();
    return () => el.removeEventListener("loadedmetadata", seek);
  }, [resume]);
  return (
    <div className={`media ${className ?? ""}`}>
      <video key={urls.mp4} ref={ref} poster={urls.poster} muted loop playsInline autoPlay aria-label={media.alt || undefined} />
    </div>
  );
}

/** Tile preview: shows a frame, plays while hovered (desktop) or autoplays (<=767px). */
export function HoverVideo({ media }: { media: Video }) {
  const ref = useRef<HTMLVideoElement>(null);
  const small = typeof window !== "undefined" && window.matchMedia("(max-width: 767px)").matches;
  const urls = videoUrls(media);
  useLazyVideo(ref, urls, { autoplay: small });
  return (
    <div
      className="media"
      onMouseEnter={() => !small && ref.current?.play().catch(() => {})}
      onMouseLeave={() => !small && ref.current?.pause()}
      onTouchStart={() => { const v = ref.current; if (v && !small) (v.paused ? v.play().catch(() => {}) : v.pause()); }}
    >
      <video key={urls.mp4} ref={ref} poster={urls.poster} muted loop playsInline aria-label={media.alt || undefined} />
    </div>
  );
}

export function Still({ media, alt = "" }: { media: Extract<MediaT, { kind: "still" }>; alt?: string }) {
  return <img src={stillUrl(media)} alt={media.alt ?? alt} loading="lazy" decoding="async" />;
}

/** `media: null` is an empty slot: it renders nothing in the site, the editor draws a placeholder over it. */
export function MediaView({ media, hover = false, resume = false }: { media: MediaT | null; hover?: boolean; resume?: boolean }) {
  if (!media) return <div className="media media--empty" />;
  if (media.kind === "still") return <Still media={media} />;
  return hover ? <HoverVideo media={media} /> : <AutoVideo media={media} resume={resume} />;
}

export { masterUrls };

import { useEffect, useRef, type RefObject } from "react";
import { flyResumeTime } from "../lib/fly";
import { stillUrl, videoUrls, type Media as MediaT, type Video } from "../lib/assets";

/** Free a video's decoder and buffers. Safari keeps removed video elements alive for a long while and
 *  only allows a few at once, so after some page changes new videos would stay blank. */
export function releaseVideo(el: HTMLVideoElement) {
  try {
    el.pause();
    el.querySelectorAll("source").forEach((s) => s.remove());
    el.removeAttribute("src");
    el.load();
  } catch { /* nothing to free */ }
}

// Skeleton placeholder behind every media slot (styles: "Media skeleton" in site.css). The shimmer is a 45deg band
// sweeping from the top-left to the bottom-right corner. It moves at the same speed in every slot, so the time
// per sweep follows the slot's size; that and the band's length are written to CSS variables here.
const SK_SPEED = 400; // px per second
const SK_BAND = 220; // px, across the band
const R2 = Math.SQRT2;

export function useSkeleton(ref: RefObject<HTMLElement | null>) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const size = () => {
      const { width: w, height: h } = el.getBoundingClientRect();
      const along = (w + h) / R2; // the slot's extent along the sweep direction
      el.style.setProperty("--sk-band", `${SK_BAND}px`);
      el.style.setProperty("--sk-len", `${2 * (w + h)}px`); // long enough to cover the slot at any angle of attack
      el.style.setProperty("--sk-from", `${-SK_BAND / 2 / R2}px`);
      el.style.setProperty("--sk-to", `${(along + SK_BAND / 2) / R2}px`);
      el.style.setProperty("--sk-dur", `${((along + SK_BAND) / SK_SPEED).toFixed(2)}s`);
    };
    size();
    const ro = new ResizeObserver(size);
    ro.observe(el);
    return () => ro.disconnect();
  }, [ref]);
}

/** The slot's first frame (or the still) is on screen: the skeleton can stop. Set on the DOM directly, no re-render. */
export const loaded = (ref: RefObject<HTMLElement | null>, on: boolean) => (on ? ref.current?.setAttribute("data-loaded", "") : ref.current?.removeAttribute("data-loaded"));

/** Lazy-load a video's sources when it gets within ~1600px of the viewport. */
export function useLazyVideo(ref: React.RefObject<HTMLVideoElement | null>, urls: { poster?: string; mp4: string; webm?: string }, opts: { autoplay: boolean }) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let loaded = false;
    // reduced motion: clips stay on their poster frame until the visitor starts them (hover tiles still play on hover)
    const autoplay = opts.autoplay && !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    el.autoplay = autoplay;
    const load = () => {
      if (loaded) return;
      loaded = true;
      if (urls.poster) el.poster = urls.poster;
      // AV1 webm only where the browser can play it. Safari is skipped even if it claims support:
      // giving up on its AV1 webm is slow, and it plays the mp4 anyway.
      const safari = /^((?!chrome|android|crios|fxios).)*safari/i.test(navigator.userAgent);
      const av1 = !!urls.webm && !safari && el.canPlayType('video/webm; codecs="av01.0.05M.08"') !== "";
      const sources = av1 ? ([["video/webm", urls.webm!], ["video/mp4", urls.mp4]] as const) : ([["video/mp4", urls.mp4]] as const);
      for (const [type, src] of sources) {
        const s = document.createElement("source");
        s.type = type;
        s.src = src;
        el.appendChild(s);
      }
      el.load();
      // WebKit can end up with "no source" when the clip's file is still being fetched or was cancelled
      // elsewhere (e.g. the tile clip that has just been lifted out of the page): ask again
      let tries = 0;
      const retry = window.setInterval(() => {
        if (el.readyState > 0 || !el.isConnected || ++tries > 6) return window.clearInterval(retry);
        if (el.networkState === HTMLMediaElement.NETWORK_NO_SOURCE || el.error) el.load();
      }, 250);
      if (autoplay) el.play().catch(() => {});
      else if (el.readyState < 1) el.addEventListener("loadedmetadata", () => { if (el.currentTime === 0) el.currentTime = 0.1; }, { once: true });
    };
    // on small screens and with data saver on, start fetching later so off-screen clips cost less data
    const conn = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection;
    const lean = !!conn?.saveData || window.matchMedia("(max-width: 767px)").matches;
    const io = new IntersectionObserver((entries) => entries.some((e) => e.isIntersecting) && (load(), io.disconnect()), { rootMargin: lean ? "500px" : "1600px" });
    io.observe(el);
    return () => { io.disconnect(); releaseVideo(el); };
  }, [urls.mp4]); // eslint-disable-line react-hooks/exhaustive-deps
}

/** Muted looping clip that plays on its own. With `resume` (the hero) it carries on from the tile clip it came from. */
export function AutoVideo({ media, className, resume }: { media: Video; className?: string; resume?: boolean }) {
  const ref = useRef<HTMLVideoElement>(null);
  const box = useRef<HTMLDivElement>(null);
  const urls = videoUrls(media);
  useLazyVideo(ref, urls, { autoplay: true });
  useSkeleton(box);
  useEffect(() => {
    const el = ref.current;
    if (!resume || !el) return;
    // arriving from a project tile (lib/page-motion.ts): start where the tile clip would be by now
    const seek = () => { const t = flyResumeTime(el.duration); if (t != null) el.currentTime = t; };
    el.addEventListener("loadedmetadata", seek, { once: true });
    if (el.readyState >= 1) seek();
    return () => el.removeEventListener("loadedmetadata", seek);
  }, [resume, urls.mp4]);
  return (
    <div ref={box} className={`media ${className ?? ""}`}>
      <video key={urls.mp4} ref={ref} poster={urls.poster} onLoadStart={() => loaded(box, false)} onLoadedData={() => loaded(box, true)} muted loop playsInline autoPlay aria-label={media.alt || undefined} aria-hidden={media.alt ? undefined : true} />
    </div>
  );
}

/** Tile preview: shows a frame, plays while hovered (desktop) or autoplays (<=767px). */
export function HoverVideo({ media }: { media: Video }) {
  const ref = useRef<HTMLVideoElement>(null);
  const box = useRef<HTMLDivElement>(null);
  const small = typeof window !== "undefined" && window.matchMedia("(max-width: 767px)").matches;
  const urls = videoUrls(media);
  useLazyVideo(ref, urls, { autoplay: small });
  useSkeleton(box);
  return (
    <div
      ref={box}
      className="media"
      onMouseEnter={() => !small && ref.current?.play().catch(() => {})}
      onMouseLeave={() => !small && ref.current?.pause()}
      onTouchStart={() => { const v = ref.current; if (v && !small) (v.paused ? v.play().catch(() => {}) : v.pause()); }}
    >
      <video key={urls.mp4} ref={ref} poster={urls.poster} onLoadStart={() => loaded(box, false)} onLoadedData={() => loaded(box, true)} muted loop playsInline aria-label={media.alt || undefined} aria-hidden={media.alt ? undefined : true} />
    </div>
  );
}

export function Still({ media, alt = "" }: { media: Extract<MediaT, { kind: "still" }>; alt?: string }) {
  const box = useRef<HTMLDivElement>(null);
  const img = useRef<HTMLImageElement>(null);
  useSkeleton(box);
  // an image that finished loading before hydration never fires onLoad here
  useEffect(() => { if (img.current?.complete && img.current.naturalWidth) loaded(box, true); }, []);
  return (
    <div ref={box} className="media">
      <img ref={img} src={stillUrl(media)} alt={media.alt ?? alt} loading="lazy" decoding="async" onLoad={() => loaded(box, true)} />
    </div>
  );
}

/** `media: null` is an empty slot: it renders nothing in the site, the editor draws a placeholder over it. */
export function MediaView({ media, hover = false, resume = false }: { media: MediaT | null; hover?: boolean; resume?: boolean }) {
  if (!media) return <div className="media media--empty" />;
  if (media.kind === "still") return <Still media={media} />;
  return hover ? <HoverVideo media={media} /> : <AutoVideo media={media} resume={resume} />;
}


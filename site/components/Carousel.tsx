import { useEffect, useRef, useState } from "react";
import { stillUrl } from "../lib/assets";
import { frameAlt, frameN, type Frame } from "../lib/schema";

/** Time each image is shown before the carousel moves on by itself. */
const AUTOPLAY_MS = 4500;

/**
 * Infinite carousel: click the left half of the image to go back, the right half to go
 * forward; swipe on touch screens; arrow keys and (visually hidden) buttons for keyboards
 * and screen readers. The track is padded with a clone of the last frame in front and the
 * first frame behind, so the wrap-around can animate and then snap back.
 */
export function Carousel({ project, frames }: { project: string; frames: Frame[] }) {
  const n = frames.length;
  const slides = [frames[n - 1], ...frames, frames[0]];
  const [index, setIndex] = useState(1);
  const [moving, setMoving] = useState(false);
  const stage = useRef<HTMLDivElement>(null);
  const swipe = useRef<{ x: number; y: number } | null>(null);
  const swiped = useRef(false);

  const cursor = () => document.querySelector<HTMLElement>(".custom-cursor");
  const onMove = (e: React.MouseEvent) => {
    const r = stage.current!.getBoundingClientRect();
    const left = e.clientX - r.left < r.width / 2;
    cursor()?.classList.toggle("is-left", left);
    cursor()?.classList.toggle("is-right", !left);
  };
  const onLeave = () => cursor()?.classList.remove("is-left", "is-right");
  const movingRef = useRef(false);
  movingRef.current = moving;
  const [resetKey, setResetKey] = useState(0); // bumps on every advance so the auto-advance timer restarts
  const [visible, setVisible] = useState(false);
  const go = (dir: -1 | 1) => {
    if (movingRef.current) return;
    movingRef.current = true;
    setMoving(true);
    setIndex((i) => i + dir);
    setResetKey((k) => k + 1);
  };

  // only auto-advance while the carousel is on screen
  useEffect(() => {
    const el = stage.current;
    if (!el) return;
    const io = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), { threshold: 0.3 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // advance every AUTOPLAY_MS. Any advance (automatic or a click/swipe/key) restarts the
  // timer, so a manual move is never followed immediately by an automatic one. Skipped for
  // reduced-motion visitors, in a background tab, and while editing.
  useEffect(() => {
    if (!visible || n < 2 || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let timer = 0;
    const arm = () => {
      timer = window.setTimeout(() => {
        if (document.hidden || document.body.classList.contains("is-editing")) arm();
        else go(1);
      }, AUTOPLAY_MS);
    };
    arm();
    return () => window.clearTimeout(timer);
  }, [visible, resetKey, n]); // eslint-disable-line react-hooks/exhaustive-deps
  const onClick = (e: React.MouseEvent) => {
    if (swiped.current) { swiped.current = false; return; } // the click that ends a swipe
    const r = stage.current!.getBoundingClientRect();
    go(e.clientX - r.left < r.width / 2 ? -1 : 1);
  };
  const onEnd = () => {
    // landed on a clone: jump (without animation) to the real frame it copies
    if (index === slides.length - 1) setIndex(1);
    else if (index === 0) setIndex(n);
    setMoving(false);
  };

  const current = ((index - 1 + n) % n) + 1;
  return (
    <section className="carousel" id="carousel" data-reveal="fade" aria-roledescription="carousel" aria-label={`Image carousel, ${n} images`}>
      <div
        className="carousel__stage" ref={stage} tabIndex={0}
        onMouseMove={onMove} onMouseLeave={onLeave} onClick={onClick}
        onKeyDown={(e) => {
          if (e.key === "ArrowLeft") { e.preventDefault(); go(-1); }
          else if (e.key === "ArrowRight") { e.preventDefault(); go(1); }
        }}
        onPointerDown={(e) => { if (e.pointerType !== "mouse") swipe.current = { x: e.clientX, y: e.clientY }; }}
        onPointerUp={(e) => {
          const s = swipe.current;
          swipe.current = null;
          if (!s) return;
          const dx = e.clientX - s.x;
          if (Math.abs(dx) > 40 && Math.abs(dx) > Math.abs(e.clientY - s.y)) { swiped.current = true; go(dx < 0 ? 1 : -1); }
        }}
        onPointerCancel={() => { swipe.current = null; }}
      >
        <div
          className={`carousel__track ${moving ? "carousel__track--moving" : ""}`}
          style={{ transform: `translateX(${-index * 100}%)` }}
          onTransitionEnd={onEnd}
        >
          {slides.map((f, i) => {
            const num = ((i - 1 + n) % n) + 1; // position of the real frame this slide shows
            return (
              <div className="carousel__slide" key={i} aria-hidden={i !== index} role="group" aria-roledescription="slide" aria-label={`${num} of ${n}`}>
                {/* only the active frame and its neighbours are fetched */}
                <img src={Math.abs(i - index) <= 1 ? stillUrl({ kind: "still", project, n: frameN(f) }) : undefined} alt={frameAlt(f) ?? ""} />
              </div>
            );
          })}
        </div>
        <div className="carousel__counter" aria-hidden="true">
          <span>{current}</span>
          <span style={{ margin: "0 4px" }}>/</span>
          <span>{n}</span>
        </div>
      </div>
      <p className="carousel__sr" aria-live="polite">{`Image ${current} of ${n}`}</p>
      <button className="carousel__sr" onClick={() => go(-1)}>Previous image</button>
      <button className="carousel__sr" onClick={() => go(1)}>Next image</button>
    </section>
  );
}

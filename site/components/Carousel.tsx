import { useRef, useState } from "react";
import { stillUrl } from "../lib/assets";
import { frameAlt, frameN, type Frame } from "../lib/schema";

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
  const go = (dir: -1 | 1) => {
    if (moving) return;
    setMoving(true);
    setIndex((i) => i + dir);
  };
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
        <div className="carousel__counter" aria-live="polite" aria-atomic="true">
          <span>{current}</span>
          <span style={{ margin: "0 4px" }} aria-hidden="true">/</span>
          <span>{n}</span>
        </div>
      </div>
      <button className="carousel__sr" onClick={() => go(-1)}>Previous image</button>
      <button className="carousel__sr" onClick={() => go(1)}>Next image</button>
    </section>
  );
}

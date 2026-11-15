import { useRef, useState } from "react";
import { stillUrl } from "../lib/assets";

/**
 * Infinite click carousel: left half of the image goes back, right half goes
 * forward. The track is padded with a clone of the last frame in front and the
 * first frame behind, so the wrap-around can animate and then snap back.
 */
export function Carousel({ project, frames }: { project: string; frames: string[] }) {
  const n = frames.length;
  const slides = [frames[n - 1], ...frames, frames[0]];
  const [index, setIndex] = useState(1);
  const [moving, setMoving] = useState(false);
  const stage = useRef<HTMLDivElement>(null);

  const cursor = () => document.querySelector<HTMLElement>(".custom-cursor");
  const onMove = (e: React.MouseEvent) => {
    const r = stage.current!.getBoundingClientRect();
    const left = e.clientX - r.left < r.width / 2;
    cursor()?.classList.toggle("is-left", left);
    cursor()?.classList.toggle("is-right", !left);
  };
  const onLeave = () => cursor()?.classList.remove("is-left", "is-right");
  const onClick = (e: React.MouseEvent) => {
    if (moving) return;
    const r = stage.current!.getBoundingClientRect();
    setMoving(true);
    setIndex((i) => (e.clientX - r.left < r.width / 2 ? i - 1 : i + 1));
  };
  const onEnd = () => {
    // landed on a clone: jump (without animation) to the real frame it copies
    if (index === slides.length - 1) setIndex(1);
    else if (index === 0) setIndex(n);
    setMoving(false);
  };

  const current = ((index - 1 + n) % n) + 1;
  return (
    <section className="carousel" id="carousel" data-reveal="fade">
      <div className="carousel__stage" ref={stage} onMouseMove={onMove} onMouseLeave={onLeave} onClick={onClick}>
        <div
          className={`carousel__track ${moving ? "carousel__track--moving" : ""}`}
          style={{ transform: `translateX(${-index * 100}%)` }}
          onTransitionEnd={onEnd}
        >
          {slides.map((f, i) => (
            <div className="carousel__slide" key={i}>
              {/* only the active frame and its neighbours are fetched */}
              <img src={Math.abs(i - index) <= 1 ? stillUrl({ kind: "still", project, n: f }) : undefined} alt="" />
            </div>
          ))}
        </div>
        <div className="carousel__counter">
          <span>{current}</span>
          <span style={{ margin: "0 4px" }}>/</span>
          <span>{n}</span>
        </div>
      </div>
    </section>
  );
}

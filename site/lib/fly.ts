// Moves the hero clip from where it was parked (on top of the clicked tile, see
// page-transition.ts) to its place in the header. It is the real video element changing box size,
// so the picture keeps playing and its crop morphs from the tile's crop to the header's crop.
import { gsap } from "gsap";

type Fly = { x: number; y: number; w: number; h: number; t: number; at: number };
type FlyWindow = Window & { __vtFly?: Fly; __vtResolve?: () => void };

/** Playback position the hero clip should have now: where the tile clip was, plus the time since the click. */
export function flyResumeTime(duration: number): number | null {
  const f = (window as FlyWindow).__vtFly;
  if (!f || Date.now() - f.at > 10000) return null; // only for the page load that came from a tile
  const t = f.t + (Date.now() - f.at) / 1000;
  return duration > 0 ? t % duration : t;
}

export function runFly(root: HTMLElement): void {
  const w = window as FlyWindow;
  const f = w.__vtFly;
  const done = () => { document.documentElement.removeAttribute("data-vt-fly"); w.__vtResolve?.(); };
  const slot = root.querySelector<HTMLElement>(".hero__media");
  const media = slot?.querySelector<HTMLElement>(":scope > .media");
  if (!f || !slot || !media) return done();

  const to = slot.getBoundingClientRect();
  gsap.fromTo(
    media,
    { left: f.x, top: f.y, width: f.w, height: f.h },
    {
      left: to.left, top: to.top, width: to.width, height: to.height,
      duration: 1.1, ease: "power3.inOut",
      onComplete: () => {
        // back into normal layout: same box, so nothing moves
        gsap.set(media, { clearProps: "left,top,width,height" });
        done();
      },
    },
  );
}

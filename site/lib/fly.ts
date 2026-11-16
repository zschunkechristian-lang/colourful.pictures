// Moves the hero clip from where it was parked (on top of the clicked tile, see
// page-motion.ts) to its place in the header. It is the real video element changing box size,
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

/** Resolves once the hero clip is actually showing moving pictures (not just its poster), or after `max` ms. */
function clipReady(slot: HTMLElement, max = 2500): Promise<void> {
  const v = slot.querySelector<HTMLVideoElement>("video");
  if (!v) return Promise.resolve();
  const f = (window as FlyWindow).__vtFly;
  return new Promise((resolve) => {
    const events = ["loadedmetadata", "loadeddata", "canplay", "seeked", "playing", "timeupdate"];
    let seeked = false;
    const check = () => {
      // Start the clip where the tile clip is: the lifted copy (when it is still playing), else where it was lifted.
      // Browsers differ in whether a seek made before the video has loaded survives, so it is done here.
      if (!seeked && v.readyState >= 1 && f && v.duration > 0) {
        seeked = true;
        const g = document.body.querySelector<HTMLVideoElement>(":scope > .media video");
        const alive = g && g.readyState >= 2 && !g.paused;
        const want = (alive ? g.currentTime : f.t) % v.duration;
        if (Math.abs(v.currentTime - want) > 0.15) { v.currentTime = want; return; }
      }
      if (seeked && v.readyState >= 3 && !v.seeking && !v.paused && v.currentTime > 0) finish();
    };
    const finish = () => { events.forEach((e) => v.removeEventListener(e, check)); clearTimeout(timer); resolve(); };
    const timer = setTimeout(finish, max);
    events.forEach((e) => v.addEventListener(e, check));
    check();
  });
}

export function runFly(root: HTMLElement): void {
  const w = window as FlyWindow;
  const f = w.__vtFly;
  const done = () => { document.documentElement.removeAttribute("data-vt-fly"); document.documentElement.removeAttribute("data-vt-ready"); w.__vtResolve?.(); };
  const slot = root.querySelector<HTMLElement>(".hero__media");
  const media = slot?.querySelector<HTMLElement>(":scope > .media");
  if (!f || !slot || !media) return done();

  clipReady(slot).then(() => {
    // the clip shows the same moving picture as the tile clip under it: let that one go, then fly
    document.documentElement.setAttribute("data-vt-ready", "");
    window.dispatchEvent(new Event("vt-clip-ready"));
    fly(media, slot, f, done);
  });
}

function fly(media: HTMLElement, slot: HTMLElement, f: Fly, done: () => void) {
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

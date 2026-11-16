// Page transitions between pages of the site. The sidebar (and the cursor) stay mounted and are never
// touched: only the content column and the footer animate. Vike's client routing calls `leave` when
// a link is clicked (renderer/+onPageTransitionStart.ts) and `arrive` when the next page is ready
// to be drawn (renderer/+onRenderClient.tsx).
//
//   leave:  content + footer fade out, blur and rise 200px
//   arrive: the next page swaps in, then fades in, un-blurs and rises into place
//
// Opening a project tile is different (see lib/fly.ts): the clicked tile's clip is lifted out of
// the page and stays put (the "ghost") while everything else fades out. The next page fades in with
// its hero clip parked exactly on the ghost, then the ghost goes and the clip flies into the header.
import { flushSync } from "react-dom";
import { releaseVideo } from "../components/Media";

const OUT_MS = 450;
const IN_MS = 1300;
const FLY_OUT_MS = 200;
const FLY_IN_MS = 300;
const OUT_EASE = "cubic-bezier(0, 0, 0.1, 1)"; // ease-out only
const IN_EASE = "cubic-bezier(0.35, 0, 0.1, 1)"; // the carousel's curve

type Fly = { x: number; y: number; w: number; h: number; t: number; at: number };
type W = Window & { __vtFly?: Fly; __vtDone?: Promise<void>; __vtResolve?: () => void };

const path = (u: string) => new URL(u, location.href).pathname.replace(/\/$/, "") || "/";
const targets = () => [...document.querySelectorAll<HTMLElement>(".content, .footer")];
const reduced = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

let flying = false;
let pending: Animation[] = [];
let ghost: HTMLElement | null = null;

const dropGhost = () => {
  ghost?.querySelectorAll("video").forEach(releaseVideo);
  ghost?.remove();
  ghost = null;
};

/** Lift the tile's clip out of the page, onto the same spot, so it survives the page fading away. */
function liftGhost(el: HTMLElement, r: { x: number; y: number; w: number; h: number }) {
  const box = el.parentElement;
  if (!box) return;
  const playing = el instanceof HTMLVideoElement && !el.paused;
  Object.assign(box.style, { position: "fixed", left: `${r.x}px`, top: `${r.y}px`, width: `${r.w}px`, height: `${r.h}px`, zIndex: "39", margin: "0", pointerEvents: "none" });
  document.body.appendChild(box);
  if (playing) (el as HTMLVideoElement).play().catch(() => {}); // moving a media element pauses it
  ghost = box;
  setTimeout(() => { if (ghost === box) dropGhost(); }, 8000); // never leave it behind
}

/** The clip inside the tile that links to `to`, with its box and playback position. */
function tileFor(to: string): (Fly & { el: HTMLElement }) | null {
  for (const a of document.querySelectorAll<HTMLAnchorElement>("a[href]")) {
    if (path(a.href) !== to) continue;
    const el = a.querySelector<HTMLElement>("video, img");
    if (!el) continue;
    const r = el.getBoundingClientRect();
    return { x: r.left, y: r.top, w: r.width, h: r.height, t: el instanceof HTMLVideoElement ? el.currentTime : 0, at: Date.now(), el };
  }
  return null;
}

/** Everything that is not the tile: the siblings of the tile and of each of its ancestors up to the content column. */
function aroundTile(el: HTMLElement): HTMLElement[] {
  const out: HTMLElement[] = [];
  for (let n: HTMLElement = el; n.parentElement && !n.classList.contains("content"); n = n.parentElement) {
    for (const c of n.parentElement.children) if (c !== n) out.push(c as HTMLElement);
  }
  return out;
}

let flyEl: HTMLElement | null = null;
let left: Promise<void> = Promise.resolve();

/** A link was clicked: start animating the current page away. Not awaited by the router, so the next
 *  page loads meanwhile; `arrive` waits for this (`whenLeft`) before it swaps the page. */
export function leave(to: string): void {
  const w = window as W;
  const fly = reduced() ? null : tileFor(path(to));
  flying = !!fly;
  flyEl = fly?.el ?? null;
  w.__vtFly = undefined;
  w.__vtDone = undefined;
  dropGhost();
  if (reduced()) { left = Promise.resolve(); return; }
  // tile: it keeps playing right where it is, only what is around it fades. Otherwise the whole page moves away.
  const els = fly ? [...aroundTile(fly.el), ...document.querySelectorAll<HTMLElement>(".footer")] : targets();
  pending = els.map((el) =>
    el.animate(
      fly
        ? [{ opacity: 1 }, { opacity: 0 }]
        : [{ opacity: 1, transform: "none", filter: "blur(0px)" }, { opacity: 0, transform: "translateY(-200px)", filter: "blur(12px)" }],
      { duration: fly ? FLY_OUT_MS : OUT_MS, easing: fly ? "ease" : OUT_EASE, fill: "forwards" },
    ),
  );
  left = Promise.all(pending.map((a) => a.finished)).then(() => undefined, () => undefined);
}

export const whenLeft = () => left;

/** Draw the next page (`render` must update the DOM synchronously) and fade it in. */
export function arrive(render: () => void): void {
  const w = window as W;
  const root = document.documentElement;
  if (flying && flyEl?.isConnected) {
    // Lift the tile's clip out of the page (it is still on screen, so its box and position are exact)
    // and park the new hero clip on top of it; lib/fly.ts moves that clip from there.
    const r = flyEl.getBoundingClientRect();
    const f: Fly = { x: r.left, y: r.top, w: r.width, h: r.height, t: flyEl instanceof HTMLVideoElement ? flyEl.currentTime : 0, at: Date.now() };
    w.__vtFly = f;
    liftGhost(flyEl, f);
    root.style.setProperty("--vt-x", `${f.x}px`);
    root.style.setProperty("--vt-y", `${f.y}px`);
    root.style.setProperty("--vt-w", `${f.w}px`);
    root.style.setProperty("--vt-h", `${f.h}px`);
    root.setAttribute("data-vt-fly", "");
    // lib/motion.ts waits for this before it plays the header copy; lib/fly.ts resolves it
    w.__vtDone = new Promise<void>((resolve) => { w.__vtResolve = resolve; setTimeout(resolve, 5000); });
  } else {
    flying = false;
    root.removeAttribute("data-vt-fly");
  }

  window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  (window as W & { __lenis?: { scrollTo: (n: number, o: object) => void } }).__lenis?.scrollTo(0, { immediate: true, force: true });
  flushSync(render);
  // the old page's nodes are gone (the content column is keyed by page); drop their animations
  pending.forEach((a) => a.cancel());
  pending = [];
  flyEl = null;
  if (reduced()) return;
  for (const el of targets()) {
    el.animate(
      flying
        ? [{ opacity: 0 }, { opacity: 1 }]
        : [{ opacity: 0, transform: "translateY(200px)", filter: "blur(6px)" }, { opacity: 1, transform: "none", filter: "blur(0px)" }],
      { duration: flying ? FLY_IN_MS : IN_MS, easing: flying ? "ease" : IN_EASE, fill: "backwards" },
    );
  }
  if (flying) setTimeout(dropGhost, FLY_IN_MS - 40); // the parked clip is almost fully in; it starts to move right after
  flying = false;
}

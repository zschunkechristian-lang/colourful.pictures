// Scroll motion (GSAP + ScrollTrigger). Replaces Webstudio's view-timeline
// animations. Everything is declared in markup with data attributes, so
// sections don't carry their own animation code:
//
//   data-reveal="text"   words fade/blur in while the block scrolls into view
//   data-reveal="cells"  child .cell elements rise in (staggered), fade out on exit
//   data-reveal="fade"   simple fade/rise for a whole block
//
// Ranges mimic CSS view-timeline ranges (entry / exit / cover / contain), which
// is what the old animations were authored in.
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

type RangeName = "entry" | "exit" | "cover" | "contain";

/** Scroll position at which `el` reaches `pct` (0-1) of the given view-timeline range. */
function scrollAt(el: HTMLElement, range: RangeName, pct: number): number {
  const vh = window.innerHeight;
  const h = el.offsetHeight;
  const docTop = offsetTopInDocument(el);
  // top edge position (relative to viewport) when the range is at `pct`
  const top =
    range === "entry" ? vh - pct * h
    : range === "exit" ? -pct * h
    : range === "cover" ? vh - pct * (vh + h)
    : (vh - h) * (1 - pct); // contain
  return docTop - top;
}

/** Document-relative top that ignores transforms (the animated cells move, the triggers must not). */
function offsetTopInDocument(el: HTMLElement): number {
  let y = 0;
  for (let e: HTMLElement | null = el; e; e = e.offsetParent as HTMLElement | null) y += e.offsetTop;
  return y;
}

type Window_ = { from: [RangeName, number]; to: [RangeName, number] };

function scrub(el: HTMLElement, tween: gsap.core.Tween, w: Window_) {
  ScrollTrigger.create({
    trigger: el,
    animation: tween,
    scrub: true,
    start: () => scrollAt(el, w.from[0], w.from[1]),
    end: () => scrollAt(el, w.to[0], w.to[1]),
    invalidateOnRefresh: true,
  });
}

export function initMotion(root: HTMLElement): () => void {
  gsap.registerPlugin(ScrollTrigger, SplitText);
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  // ?nomotion renders the final layout (for screenshots and layout comparisons)
  const loadEls = root.querySelectorAll<HTMLElement>('[data-reveal="load"], [data-reveal="load-fade"]');
  if (reduce || location.search.includes("nomotion")) {
    loadEls.forEach((el) => (el.style.opacity = "1")); // the stylesheet hides them until motion takes over
    return () => {};
  }

  const splits: SplitText[] = [];
  let alive = true;
  // Header copy plays once on page load, not on scroll. After a page transition (see
  // lib/page-motion.ts) it waits until the clip has landed.
  const ready = Promise.all([document.fonts?.ready, (window as unknown as { __vtDone?: Promise<unknown> }).__vtDone]);
  const ctx = gsap.context(() => {
    root.querySelectorAll<HTMLElement>('[data-reveal="load"]').forEach((el) => {
      const split = new SplitText(el, { type: "words", wordsClass: "w" });
      splits.push(split);
      gsap.set(split.words, { opacity: 0, y: 20, filter: "blur(10px)" });
      gsap.set(el, { opacity: 1 }); // visible now; the words are hidden individually
      const tween = gsap.to(split.words, { opacity: 1, y: 0, filter: "blur(0px)", ease: "power2.out", duration: 0.9, stagger: Math.min(0.06, 1.2 / split.words.length), paused: true }); // the whole block lands within ~2s, however long it is
      ready.then(() => { if (alive) tween.play(); });
    });
    root.querySelectorAll<HTMLElement>('[data-reveal="load-fade"]').forEach((el) => {
      const tween = gsap.fromTo(el, { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.9, ease: "power2.out", paused: true });
      ready.then(() => { if (alive) tween.delay(0.6).play(); });
    });

    // Text: words rise + un-blur, scrubbed through the first half of the viewport.
    root.querySelectorAll<HTMLElement>('[data-reveal="text"]').forEach((el) => {
      const split = new SplitText(el, { type: "words", wordsClass: "w" });
      splits.push(split);
      // Staggered fromTo only hides the *first* target up front, so set the hidden state
      // explicitly; otherwise later words are visible until their stagger slot arrives.
      gsap.set(split.words, { opacity: 0, y: 20, filter: "blur(10px)" });
      const tween = gsap.to(split.words, { opacity: 1, y: 0, filter: "blur(0px)", ease: "power2.out", stagger: 0.08, paused: true });
      scrub(el, tween as gsap.core.Tween, { from: ["entry", 0.2], to: ["contain", 0.5] });
    });

    // Rows of media: the cells rise in (staggered) over the entry range; the whole grid fades
    // out on exit. Different targets, so the two scrubbed tweens never fight over one property.
    root.querySelectorAll<HTMLElement>('[data-reveal="cells"]').forEach((el) => {
      const grid = el.querySelector<HTMLElement>(".row__grid") ?? el;
      const cells = el.querySelectorAll<HTMLElement>(".cell, .tile");
      gsap.set(cells, { opacity: 0, y: 50 });
      const tweenIn = gsap.to(cells, { opacity: 1, y: 0, ease: "power2.inOut", stagger: 0.25, paused: true });
      scrub(el, tweenIn as gsap.core.Tween, { from: ["entry", 0], to: ["entry", 0.8] });
      const tweenOut = gsap.to(grid, { opacity: 0, y: -50, ease: "power2.inOut", paused: true, immediateRender: false });
      scrub(el, tweenOut as gsap.core.Tween, { from: ["exit", 0.6], to: ["exit", 1] });
    });

    root.querySelectorAll<HTMLElement>('[data-reveal="fade"]').forEach((el) => {
      const tween = gsap.fromTo(el, { opacity: 0, y: 20 }, { opacity: 1, y: 0, ease: "none", paused: true });
      scrub(el, tween as gsap.core.Tween, { from: ["entry", 0], to: ["entry", 0.4] });
    });
  }, root);

  const refresh = () => ScrollTrigger.refresh();
  document.fonts?.ready.then(refresh);
  window.addEventListener("load", refresh);
  const ro = new ResizeObserver(() => refresh());
  ro.observe(root);

  return () => {
    alive = false;
    ro.disconnect();
    window.removeEventListener("load", refresh);
    splits.forEach((s) => s.revert());
    ctx.revert();
  };
}

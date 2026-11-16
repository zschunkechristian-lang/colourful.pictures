// Scroll motion (GSAP + ScrollTrigger). Everything is declared in markup with data attributes, so
// sections don't carry their own animation code:
//
//   data-reveal="text"   words fade/blur in while the block scrolls into view
//   data-reveal="cells"  child .cell elements rise in (staggered), fade out on exit
//   data-reveal="fade"   simple fade/rise for a whole block
//
// Animations are time-based: they play when a block comes into view and fade out when it is
// about to leave (see `presence`), rather than being scrubbed by the scroll position.
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

const IN_S = 0.9; // an animation plays this long once its block comes into view
const OUT_S = 0.5; // and this long when the block is about to leave
const IN_EASE = "power2.out";
const OUT_EASE = "power2.in";

/** Plays `show` when `el` comes into view and `hide` when it is about to leave (`dir` is -1 off the top, 1 off the bottom).
 *  Time-based, not scrubbed. Both tween from wherever the targets currently are (`overwrite: true`), so scrolling
 *  back and forth mid-animation just reverses course from the current look instead of jumping or queueing up. */
function presence(
  el: HTMLElement,
  show: () => void,
  hide: (dir: -1 | 1) => void,
) {
  ScrollTrigger.create({
    trigger: el,
    start: "top 88%", // the block has started to appear
    end: "bottom 12%", // ...and is about to disappear
    onEnter: show,
    onEnterBack: show,
    onLeave: () => hide(-1),
    onLeaveBack: () => hide(1),
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

    // Text: words rise + un-blur (staggered) on entry, fade out together on exit.
    root.querySelectorAll<HTMLElement>('[data-reveal="text"]').forEach((el) => {
      const split = new SplitText(el, { type: "words", wordsClass: "w" });
      splits.push(split);
      const hidden = { opacity: 0, y: 20, filter: "blur(10px)" };
      gsap.set(split.words, hidden);
      presence(
        el,
        () => gsap.to(split.words, { opacity: 1, y: 0, filter: "blur(0px)", ease: IN_EASE, duration: IN_S, stagger: Math.min(0.06, 0.5 / split.words.length), overwrite: true }),
        (dir) => gsap.to(split.words, { ...hidden, y: -20 * dir, ease: OUT_EASE, duration: OUT_S, stagger: 0, overwrite: true }),
      );
    });

    // Rows of media: the cells rise in (staggered), the whole row fades out on exit.
    root.querySelectorAll<HTMLElement>('[data-reveal="cells"]').forEach((el) => {
      const cells = el.querySelectorAll<HTMLElement>(".cell, .tile");
      gsap.set(cells, { opacity: 0, y: 50 });
      presence(
        el,
        () => gsap.to(cells, { opacity: 1, y: 0, ease: IN_EASE, duration: IN_S, stagger: 0.12, overwrite: true }),
        (dir) => gsap.to(cells, { opacity: 0, y: -50 * dir, ease: OUT_EASE, duration: OUT_S, stagger: 0, overwrite: true }),
      );
    });

    root.querySelectorAll<HTMLElement>('[data-reveal="fade"]').forEach((el) => {
      gsap.set(el, { opacity: 0, y: 20 });
      presence(
        el,
        () => gsap.to(el, { opacity: 1, y: 0, ease: IN_EASE, duration: IN_S, overwrite: true }),
        (dir) => gsap.to(el, { opacity: 0, y: -20 * dir, ease: OUT_EASE, duration: OUT_S, overwrite: true }),
      );
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

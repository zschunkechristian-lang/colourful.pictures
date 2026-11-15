// Keeps a line of text on one line by shrinking its font size, never growing it past the size
// the stylesheet gives it and never going below `min`. If it still doesn't fit at `min`, the
// element gets `data-wrap`, and the stylesheet decides what may wrap (names yes, roles never).
// Used for the hero credit line (free text) and the credits row.

type Options = {
  /** smallest font size in px */
  min?: number;
  /** width the content wants; defaults to the element's scrollWidth */
  needed?: (el: HTMLElement) => number;
};

function fitOne(el: HTMLElement, { min = 11, needed = (e) => e.scrollWidth }: Options) {
  el.style.fontSize = "";
  el.removeAttribute("data-wrap");
  if (!el.clientWidth) return;
  let size = parseFloat(getComputedStyle(el).fontSize);
  // letter-spacing and gaps are fixed px, so the width isn't exactly proportional: refine a few times
  for (let i = 0; i < 5 && needed(el) > el.clientWidth + 0.5 && size > min; i++) {
    size = Math.max(min, (size * el.clientWidth) / needed(el) - 0.1);
    el.style.fontSize = `${size}px`;
  }
  if (needed(el) > el.clientWidth + 0.5) el.setAttribute("data-wrap", "");
}

/** Width a flex row of entries wants on a single line (entries are nowrap, so their own width is intrinsic). */
export const rowWidth = (el: HTMLElement) => {
  const gap = parseFloat(getComputedStyle(el).columnGap) || 0;
  const kids = [...el.children] as HTMLElement[];
  return kids.reduce((n, k) => n + k.offsetWidth, 0) + gap * Math.max(0, kids.length - 1);
};

/** Fit every element matching `selector` under `root`, and again whenever it resizes, its content changes or fonts load. */
export function watchFit(root: HTMLElement, selector: string, opts: Options = {}): () => void {
  const els = [...root.querySelectorAll<HTMLElement>(selector)];
  const run = () => els.forEach((el) => fitOne(el, opts));
  const ro = new ResizeObserver(run);
  const mo = new MutationObserver(run);
  els.forEach((el) => {
    ro.observe(el);
    mo.observe(el, { childList: true, characterData: true, subtree: true });
  });
  document.fonts?.ready.then(run);
  run();
  return () => { ro.disconnect(); mo.disconnect(); els.forEach((el) => { el.style.fontSize = ""; el.removeAttribute("data-wrap"); }); };
}

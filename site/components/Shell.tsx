import { useEffect } from "react";
import homeSvg from "../assets/nav-home.svg?raw";
import playSvg from "../assets/nav-play.svg?raw";
import infoSvg from "../assets/nav-info.svg?raw";
import mailSvg from "../assets/nav-mail.svg?raw";
import contactSvg from "../assets/contact-vertical.svg?raw";

const Svg = ({ src }: { src: string }) => <span style={{ display: "contents" }} dangerouslySetInnerHTML={{ __html: src }} />;

type Theme = "light" | "dark";
/** Light/dark toggle. Follows the system theme until the visitor picks one. */
function ThemeToggle() {
  const toggle = () => {
    const root = document.documentElement;
    const system = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
    const current = (root.dataset.theme as Theme | undefined) ?? system;
    const next: Theme = current === "dark" ? "light" : "dark";
    root.dataset.theme = next;
    try { localStorage.setItem("theme", next); } catch {}
  };

  return (
    <div className="nav__theme">
      <button onClick={toggle} aria-label="Toggle background color">
        <svg viewBox="0 0 16 16">
          <path fillRule="evenodd" clipRule="evenodd" d="M0 8L3.07945 4.30466C4.29638 2.84434 6.09909 2 8 2C9.90091 2 11.7036 2.84434 12.9206 4.30466L16 8L12.9206 11.6953C11.7036 13.1557 9.90091 14 8 14C6.09909 14 4.29638 13.1557 3.07945 11.6953L0 8ZM8 11C9.65685 11 11 9.65685 11 8C11 6.34315 9.65685 5 8 5C6.34315 5 5 6.34315 5 8C5 9.65685 6.34315 11 8 11Z" />
        </svg>
      </button>
    </div>
  );
}

/** Custom dot cursor. Only activates once a real mouse is detected (not touch). */
export function Cursor() {
  useEffect(() => {
    const el = document.querySelector<HTMLElement>(".custom-cursor")!;
    const interactive = 'a, button, input, textarea, select, [role="button"]';
    let active = false;
    const move = (e: MouseEvent) => { el.style.left = `${e.clientX}px`; el.style.top = `${e.clientY}px`; };
    const over = (e: MouseEvent) => ((e.target as Element).closest?.(interactive) ? el.classList.add("hover") : el.classList.remove("hover"));
    const activate = (e: PointerEvent) => {
      if (active) return;
      active = true;
      document.body.classList.add("has-fine-pointer");
      el.style.left = `${e.clientX}px`;
      el.style.top = `${e.clientY}px`;
      document.addEventListener("mousemove", move, true);
      document.addEventListener("mouseover", over);
    };
    const deactivate = () => {
      if (!active) return;
      active = false;
      document.body.classList.remove("has-fine-pointer");
      el.classList.remove("hover");
      document.removeEventListener("mousemove", move, true);
      document.removeEventListener("mouseover", over);
    };
    // A trackpad on iPadOS reports pointerType "mouse"; a finger reports "touch".
    const ptr = (e: PointerEvent) => {
      if (e.pointerType === "mouse") activate(e);
      else if (e.type === "pointerdown" && e.pointerType === "touch") deactivate();
    };
    window.addEventListener("pointerdown", ptr, true);
    window.addEventListener("pointermove", ptr, true);
    window.addEventListener("touchstart", deactivate, true);
    return () => {
      window.removeEventListener("pointerdown", ptr, true);
      window.removeEventListener("pointermove", ptr, true);
      window.removeEventListener("touchstart", deactivate, true);
      deactivate();
    };
  }, []);
  return <div className="custom-cursor" />;
}

/** Lenis smooth scrolling on non-touch devices, wired into ScrollTrigger. */
export function useSmoothScroll(enabled = true) {
  useEffect(() => {
    if (!enabled) return;
    if (window.matchMedia("(hover: none) and (pointer: coarse)").matches) return;
    let destroy = () => {};
    let cancelled = false;
    (async () => {
      const [{ default: Lenis }, { ScrollTrigger }] = await Promise.all([import("lenis"), import("gsap/ScrollTrigger")]);
      if (cancelled) return;
      const lenis = new Lenis({ autoRaf: true, anchors: true, allowNestedScroll: true, naiveDimensions: true, stopInertiaOnNavigate: true });
      lenis.on("scroll", ScrollTrigger.update);
      (window as unknown as { __lenis?: unknown }).__lenis = lenis; // lib/page-motion.ts resets it on navigation
      destroy = () => { (window as unknown as { __lenis?: unknown }).__lenis = undefined; lenis.destroy(); };
    })();
    return () => {
      cancelled = true;
      destroy();
    };
  }, [enabled]);
}

export function Nav({ current = "" }: { current?: string }) {
  const link = (href: string, svg: string, label: string) => (
    <a className="nav__link" href={href} aria-label={label} aria-current={current === href ? "page" : undefined}>
      <Svg src={svg} />
    </a>
  );
  return (
    <nav className="nav">
      <div className="nav__links">
        {link("/", homeSvg, "Home")}
        {link("/play", playSvg, "Play")}
        {link("/info", infoSvg, "Info")}
        {link("mailto:hello@colourful.pictures", mailSvg, "Mail")}
      </div>
      <ThemeToggle />
      <div className="nav__contact">
        <a href="mailto:hello@colourful.pictures?subject=Let%27s%20connect" target="_blank" rel="noreferrer" aria-label="Get in touch">
          <Svg src={contactSvg} />
        </a>
      </div>
    </nav>
  );
}

// Inline text field for the editor. A contentEditable element that shows the text exactly as
// the site styles it, but only ever stores plain text in the content format used by inline():
// `**bold**` and "\n" line breaks. Pasted formatting is stripped.
import { useLayoutEffect, useRef } from "react";
import type { TextProps } from "../components/Sections";

const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

function toHtml(text: string, format: "rich" | "plain") {
  return text
    .split("\n")
    .map((line) => (format === "rich" ? esc(line).replace(/\*\*(.+?)\*\*/g, "<b>$1</b>") : esc(line)))
    .join("<br>");
}

/** DOM -> content string. Bold elements become **…** (per line, so inline()'s one-line regex matches). */
function toText(root: HTMLElement, format: "rich" | "plain"): string {
  let out = "";
  const walk = (node: Node, bold: boolean) => {
    if (node.nodeType === Node.TEXT_NODE) {
      const t = (node.textContent ?? "").replace(/ /g, " ");
      out += bold && format === "rich" ? t.split("\n").map((p) => (p ? `**${p}**` : p)).join("\n") : t;
      return;
    }
    if (!(node instanceof HTMLElement)) return;
    if (node.tagName === "BR") {
      // a lone trailing <br> is only the browser's caret placeholder
      if (node === root.lastChild && root.childNodes.length > 1) return;
      out += "\n";
      return;
    }
    const isBlock = node.tagName === "DIV" || node.tagName === "P";
    if (isBlock && out && !out.endsWith("\n")) out += "\n";
    const b = bold || node.tagName === "B" || node.tagName === "STRONG" || Number(node.style.fontWeight) >= 600 || node.style.fontWeight === "bold";
    node.childNodes.forEach((c) => walk(c, b));
  };
  root.childNodes.forEach((c) => walk(c, false));
  return out.replace(/\*\*\*\*/g, "").replace(/\n+$/, "");
}

export function Text({ as: Tag = "div", className, value, onChange, format, multiline, placeholder, onEnter, onBackspaceEmpty }: TextProps) {
  const ref = useRef<HTMLElement>(null);
  const self = useRef(false); // the last render was caused by our own typing
  const seen = useRef<string | null>(null);

  // Sync the DOM from the store only when the value changed from outside (undo/redo, load) or
  // when not focused; never while the user is typing (that would reset the caret).
  useLayoutEffect(() => {
    const el = ref.current!;
    const changed = seen.current !== value;
    seen.current = value;
    if (self.current) { self.current = false; return; }
    if (changed || document.activeElement !== el) {
      if (toText(el, format) !== value || seen.current === null) el.innerHTML = toHtml(value, format);
    }
  });

  const emit = () => {
    const el = ref.current!;
    const next = toText(el, format);
    self.current = true;
    setTimeout(() => { self.current = false; }, 0);
    if (next !== value) onChange(multiline || format === "rich" ? next : next.replace(/\n/g, " "));
  };

  const El = Tag as "div";
  return (
    <El
      ref={ref as React.RefObject<HTMLDivElement>}
      className={className}
      contentEditable
      suppressContentEditableWarning
      spellCheck={false}
      data-cms-text=""
      data-placeholder={placeholder}
      onInput={emit}
      onBlur={() => {
        // normalise what is shown (e.g. strip stray markup) once the user leaves the field
        const el = ref.current!;
        if (toText(el, format) !== value) emit();
        el.innerHTML = toHtml(value, format);
      }}
      onPaste={(e) => {
        e.preventDefault();
        const t = e.clipboardData.getData("text/plain").replace(/\r/g, "");
        document.execCommand("insertText", false, multiline ? t : t.replace(/\n+/g, " "));
      }}
      onKeyDown={(e) => {
        const mod = e.metaKey || e.ctrlKey;
        if (mod && e.key.toLowerCase() === "b") {
          e.preventDefault();
          if (format === "rich") { document.execCommand("bold"); emit(); }
        } else if (mod && ["i", "u"].includes(e.key.toLowerCase())) {
          e.preventDefault(); // no italics/underline: only plain text and **bold** exist
        } else if (e.key === "Enter") {
          e.preventDefault();
          if (onEnter) {
            const sel = getSelection();
            let caret = toText(ref.current!, format).length;
            if (sel && sel.rangeCount && ref.current!.contains(sel.anchorNode)) {
              const r = document.createRange();
              r.selectNodeContents(ref.current!);
              r.setEnd(sel.anchorNode!, sel.anchorOffset);
              caret = r.toString().length;
            }
            onEnter(caret);
            const here = e.currentTarget as HTMLElement;
            requestAnimationFrame(() => (here.nextElementSibling as HTMLElement | null)?.focus());
          }
          else if (multiline) { document.execCommand("insertLineBreak"); emit(); }
          else (e.target as HTMLElement).blur();
        } else if (e.key === "Backspace" && onBackspaceEmpty && toText(ref.current!, format) === "") {
          e.preventDefault();
          const prev = (e.currentTarget as HTMLElement).previousElementSibling as HTMLElement | null;
          onBackspaceEmpty();
          requestAnimationFrame(() => {
            if (!prev) return;
            prev.focus();
            const r = document.createRange();
            r.selectNodeContents(prev);
            r.collapse(false);
            getSelection()?.removeAllRanges();
            getSelection()?.addRange(r);
          });
        } else if (e.key === "Escape") (e.target as HTMLElement).blur();
      }}
    />
  );
}

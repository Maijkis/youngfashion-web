"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import useReducedMotion from "@/hooks/useReducedMotion";

/**
 * A small trailing star cursor, desktop-only — the native cursor stays visible.
 * Near an element carrying `data-cursor="FLIP|VIEW|DRAG"`, the star shrinks and
 * a mono label reveals what the interaction does.
 */
export default function StarCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const starRef = useRef<HTMLSpanElement>(null);
  const [active, setActive] = useState(false);
  const [label, setLabel] = useState<string | null>(null);
  const [enabled, setEnabled] = useState(false);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const supportsHover = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    setEnabled(supportsHover && !reducedMotion);
  }, [reducedMotion]);

  useEffect(() => {
    if (!enabled || !dotRef.current || !starRef.current) return;
    const el = dotRef.current;

    gsap.set(el, { xPercent: -50, yPercent: -50 });
    gsap.set(starRef.current, { scale: 1 });
    const quickX = gsap.quickTo(el, "x", { duration: 0.4, ease: "power3.out" });
    const quickY = gsap.quickTo(el, "y", { duration: 0.4, ease: "power3.out" });
    const quickScale = gsap.quickTo(starRef.current, "scale", { duration: 0.3, ease: "power2.out" });

    const handleMove = (e: MouseEvent) => {
      quickX(e.clientX);
      quickY(e.clientY);
    };
    const handleOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const cursorLabel = target.closest<HTMLElement>("[data-cursor]")?.dataset.cursor ?? null;
      const isInteractive = !!target.closest("a, button");
      if (cursorLabel) {
        // A labelled interaction: shrink the star, reveal the label.
        quickScale(0.6);
        setLabel(cursorLabel);
        setActive(true);
      } else {
        quickScale(isInteractive ? 2.2 : 1);
        setLabel(null);
        setActive(isInteractive);
      }
    };

    window.addEventListener("mousemove", handleMove);
    window.addEventListener("mouseover", handleOver);
    return () => {
      window.removeEventListener("mousemove", handleMove);
      window.removeEventListener("mouseover", handleOver);
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <div
      ref={dotRef}
      aria-hidden
      className={`pointer-events-none fixed left-0 top-0 z-[100] transition-opacity duration-200 ${
        active ? "opacity-90" : "opacity-60"
      }`}
    >
      <span ref={starRef} className="block text-lg text-[var(--color-accent)]">
        ★
      </span>
      <span
        className={`absolute left-5 top-1/2 -translate-y-1/2 whitespace-nowrap bg-[var(--color-ink)] text-[var(--color-paper)] px-2 py-1 font-mono text-[9px] uppercase tracking-[0.16em] transition-all duration-200 ${
          label ? "opacity-100 scale-100" : "opacity-0 scale-90"
        }`}
      >
        {label}
      </span>
    </div>
  );
}

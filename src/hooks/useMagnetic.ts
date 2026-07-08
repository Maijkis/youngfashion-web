"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import useReducedMotion from "@/hooks/useReducedMotion";

/**
 * Nudges an element toward the cursor once the pointer is within `radius`px of
 * its edge — so the button reaches out to meet the cursor, then snaps back when
 * it leaves the field. Transform-only, `max`px clamp, desktop-only, opt-in per
 * call site (reserve for the one or two primary CTAs). Listens on the window so
 * the pull begins before the cursor arrives.
 */
export default function useMagnetic<T extends HTMLElement>(
  strength = 0.3,
  max = 10,
  radius = 40,
) {
  const ref = useRef<T>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const el = ref.current;
    if (!el || reducedMotion) return;
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;

    const quickX = gsap.quickTo(el, "x", { duration: 0.3, ease: "power3.out" });
    const quickY = gsap.quickTo(el, "y", { duration: 0.3, ease: "power3.out" });

    let raf = 0;
    let mx = 0;
    let my = 0;
    const apply = () => {
      raf = 0;
      const rect = el.getBoundingClientRect();
      const dx = mx - (rect.left + rect.width / 2);
      const dy = my - (rect.top + rect.height / 2);
      const inField =
        Math.abs(dx) < rect.width / 2 + radius && Math.abs(dy) < rect.height / 2 + radius;
      if (inField) {
        quickX(gsap.utils.clamp(-max, max, dx * strength));
        quickY(gsap.utils.clamp(-max, max, dy * strength));
      } else {
        quickX(0);
        quickY(0);
      }
    };
    const handleMove = (e: MouseEvent) => {
      mx = e.clientX;
      my = e.clientY;
      if (!raf) raf = requestAnimationFrame(apply);
    };

    window.addEventListener("mousemove", handleMove, { passive: true });
    return () => {
      window.removeEventListener("mousemove", handleMove);
      if (raf) cancelAnimationFrame(raf);
      quickX(0);
      quickY(0);
    };
  }, [reducedMotion, strength, max, radius]);

  return ref;
}

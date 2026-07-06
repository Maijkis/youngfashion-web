"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import useReducedMotion from "@/hooks/useReducedMotion";

/** Nudges an element toward the cursor within `max`px — desktop-only, opt-in per call site. */
export default function useMagnetic<T extends HTMLElement>(strength = 0.3, max = 8) {
  const ref = useRef<T>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const el = ref.current;
    if (!el || reducedMotion) return;
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;

    const quickX = gsap.quickTo(el, "x", { duration: 0.3, ease: "power3.out" });
    const quickY = gsap.quickTo(el, "y", { duration: 0.3, ease: "power3.out" });

    const handleMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const relX = e.clientX - (rect.left + rect.width / 2);
      const relY = e.clientY - (rect.top + rect.height / 2);
      quickX(gsap.utils.clamp(-max, max, relX * strength));
      quickY(gsap.utils.clamp(-max, max, relY * strength));
    };
    const handleLeave = () => {
      quickX(0);
      quickY(0);
    };

    el.addEventListener("mousemove", handleMove);
    el.addEventListener("mouseleave", handleLeave);
    return () => {
      el.removeEventListener("mousemove", handleMove);
      el.removeEventListener("mouseleave", handleLeave);
    };
  }, [reducedMotion, strength, max]);

  return ref;
}

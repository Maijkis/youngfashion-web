"use client";

import { useEffect, useRef } from "react";
import { MQ_POINTER_FINE, motionOK } from "@/lib/motion";

// ============================================================================
// DarkFX — the layered "system" texture for dark (.panel) sections:
//   1. a CRISP structural dot grid (CSS radial-gradient, hard-edged, ≤6%,
//      never scaled/filtered so it can't soften into smudges);
//   2. a soft radial spotlight that follows the pointer on desktop, subtly
//      brightening a second (brighter) dot layer masked to the same circle —
//      so the grid the cursor passes over lights up.
// Everything is pure CSS driven by two custom properties (--mx/--my) updated
// rAF-throttled on pointermove. No canvas, no per-frame allocation. On touch /
// low-power the listener never attaches and the light rests centred + static.
// ============================================================================

export default function DarkFX() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    const host = el?.parentElement;
    if (!el || !host) return;
    // Pointer-driven only. Touch / reduced-motion / data-saver / low-power keep
    // the static centred glow (the CSS fallbacks for --mx/--my).
    if (!window.matchMedia(MQ_POINTER_FINE).matches || !motionOK()) return;

    let raf = 0;
    let mx = 0;
    let my = 0;
    const apply = () => {
      raf = 0;
      el.style.setProperty("--mx", `${mx}px`);
      el.style.setProperty("--my", `${my}px`);
    };
    const onMove = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      mx = e.clientX - r.left;
      my = e.clientY - r.top;
      if (!raf) raf = requestAnimationFrame(apply);
    };
    const onEnter = () => el.style.setProperty("--lit", "1");
    const onLeave = () => el.style.setProperty("--lit", "0");

    host.addEventListener("pointermove", onMove, { passive: true });
    host.addEventListener("pointerenter", onEnter);
    host.addEventListener("pointerleave", onLeave);
    return () => {
      host.removeEventListener("pointermove", onMove);
      host.removeEventListener("pointerenter", onEnter);
      host.removeEventListener("pointerleave", onLeave);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div ref={ref} aria-hidden className="dark-fx pointer-events-none absolute inset-0 z-0">
      <div className="dot-grid absolute inset-0" />
      <div className="dark-fx-glow absolute inset-0" />
      <div className="dot-grid dot-grid--lit absolute inset-0" />
    </div>
  );
}

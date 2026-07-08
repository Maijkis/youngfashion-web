"use client";

import { useEffect, useRef } from "react";
import { motionOK } from "@/lib/motion";

// ============================================================================
// WalkingFigure — a dot-matrix silhouette that walks across the page as you
// scroll: the runway, abstracted. Sprite-sheet stepped animation (8 frames,
// background-position) + scroll-mapped translateX. Fixed behind content
// (z-[5] < the sections' z-10 content), mix-blend-multiply at ≤8% opacity so
// it melts into paper and effectively disappears over the dark panels.
//
// Cheap: no rAF loop — one throttled update per scroll frame, two style
// writes. Hidden entirely under reduced-motion / save-data / low-power
// (display stays `hidden` unless motionOK enables it). Homepage only.
//
// The sprite at /assets/branding/walker-sprite.png is a generated placeholder
// walk cycle — swap the file (same 8×96×160 layout) when real frames land.
// ============================================================================

const FRAMES = 8;
const FRAME_W = 96;
const FRAME_H = 160;
const PX_PER_FRAME = 48; // scroll px per animation step

export default function WalkingFigure() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || !motionOK()) return;

    el.style.display = "block";
    let raf = 0;

    const update = () => {
      raf = 0;
      const doc = document.documentElement;
      const max = doc.scrollHeight - window.innerHeight;
      const p = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
      const vw = window.innerWidth;
      // Walks fully across, entering from off-left and exiting off-right.
      const x = -FRAME_W + p * (vw + FRAME_W * 2);
      const frame = Math.floor(window.scrollY / PX_PER_FRAME) % FRAMES;
      el.style.transform = `translate3d(${x}px, 0, 0)`;
      el.style.backgroundPosition = `${-frame * FRAME_W}px 0`;
    };

    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden
      className="pointer-events-none fixed bottom-[6vh] left-0 z-[5] hidden opacity-[0.08] mix-blend-multiply"
      style={{
        width: FRAME_W,
        height: FRAME_H,
        backgroundImage: "url(/assets/branding/walker-sprite.png)",
        backgroundSize: `${FRAMES * FRAME_W}px ${FRAME_H}px`,
      }}
    />
  );
}

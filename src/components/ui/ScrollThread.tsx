"use client";

import { useEffect, useRef } from "react";

// ============================================================================
// ScrollThread — a 1px magenta thread down the right edge that fills with
// scroll progress: the long scroll gets a sense of place, tied to the
// needle-and-thread idea. Transform-only (scaleY), rAF-throttled, no layout
// cost. It reflects position rather than auto-animating, so it's fine under
// reduced motion. Mounted once globally.
// ============================================================================

export default function ScrollThread() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let raf = 0;
    const update = () => {
      raf = 0;
      const doc = document.documentElement;
      const max = doc.scrollHeight - window.innerHeight;
      const p = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
      el.style.transform = `scaleY(${p})`;
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
      aria-hidden
      className="pointer-events-none fixed right-0 top-0 z-[60] h-screen w-px bg-[var(--color-ink)]/5"
    >
      <div
        ref={ref}
        className="h-full w-full origin-top bg-[var(--color-accent)]"
        style={{ transform: "scaleY(0)" }}
      />
    </div>
  );
}

"use client";

import { useEffect, useRef, type ReactNode } from "react";

/**
 * Sets `data-inview="true"` on its wrapper once it scrolls into view (one-shot).
 * Pairs with the `.rule-draw` CSS to trigger draw-in underlines without a JS
 * animation library — works on every device, reduced-motion included (the CSS
 * transition is simply killed there, so the rule appears instantly).
 */
export default function InViewFlag({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry], obs) => {
        if (entry.isIntersecting) {
          el.setAttribute("data-inview", "true");
          obs.disconnect();
        }
      },
      { threshold: 0.35 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}

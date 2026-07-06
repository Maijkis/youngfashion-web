"use client";

import { useLayoutEffect, useRef, type ReactNode } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MQ_SCRUB, prefersLiteMotion } from "@/lib/motion";

gsap.registerPlugin(ScrollTrigger);

/**
 * Wraps a key word with an accent bar that swipes in left→right. Desktop
 * pointers scrub the bar as the word crosses center; everything else (touch,
 * reduced-motion) reveals it via a CSS class once it scrolls into view.
 */
export default function Highlight({ children }: { children: ReactNode }) {
  const barRef = useRef<HTMLSpanElement>(null);

  useLayoutEffect(() => {
    const bar = barRef.current;
    if (!bar) return;

    if (window.matchMedia(MQ_SCRUB).matches && !prefersLiteMotion()) {
      bar.style.transition = "none"; // GSAP owns the transform; avoid double-easing
      const tween = gsap.fromTo(
        bar,
        { scaleX: 0 },
        {
          scaleX: 1,
          ease: "none",
          scrollTrigger: { trigger: bar, start: "top 60%", end: "top 42%", scrub: 0.8 },
        },
      );
      return () => {
        tween.scrollTrigger?.kill();
        tween.kill();
      };
    }

    const io = new IntersectionObserver(
      ([entry], obs) => {
        if (entry.isIntersecting) {
          bar.classList.add("is-lit");
          obs.disconnect();
        }
      },
      { threshold: 0.6 },
    );
    io.observe(bar);
    return () => io.disconnect();
  }, []);

  return (
    <span className="relative inline-block">
      <span
        ref={barRef}
        aria-hidden
        className="highlight-bar absolute left-0 right-0 bottom-[0.02em] h-[0.16em] bg-[var(--color-accent)]"
      />
      <span className="relative">{children}</span>
    </span>
  );
}

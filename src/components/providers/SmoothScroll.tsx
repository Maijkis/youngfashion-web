"use client";

import { useEffect, useRef } from "react";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MotionConfig } from "framer-motion";
import { prefersLiteMotion } from "@/lib/motion";

gsap.registerPlugin(ScrollTrigger);

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    // Reduced motion: skip Lenis entirely — native scroll, ScrollTrigger still
    // works off it. Individual components gate their own tweens separately.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    // Touch doctrine (spec §9): Lenis fights native momentum on phones/tablets
    // and hurts INP — desktop pointers only. Data-saver / low-memory too.
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    if (prefersLiteMotion()) return;

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    lenisRef.current = lenis;
    (window as Window & { __lenis?: Lenis }).__lenis = lenis;

    lenis.on("scroll", ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });
    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
      gsap.ticker.remove(lenis.raf as unknown as gsap.TickerCallback);
      delete (window as Window & { __lenis?: Lenis }).__lenis;
    };
  }, []);

  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}

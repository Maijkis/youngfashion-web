"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MotionConfig } from "framer-motion";
import { prefersLiteMotion } from "@/lib/motion";

gsap.registerPlugin(ScrollTrigger);

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);
  const pathname = usePathname();

  // Start every route at the top — Next's default scroll restoration doesn't
  // reach Lenis's virtual scroll, so navigating (e.g. tapping a sponsor) could
  // land you wherever the previous page was scrolled to. Skip when there's a
  // hash so in-page anchor links still jump to their target.
  useEffect(() => {
    if (typeof window === "undefined" || window.location.hash) return;
    const lenis = (window as Window & { __lenis?: Lenis }).__lenis;
    if (lenis) lenis.scrollTo(0, { immediate: true });
    else window.scrollTo(0, 0);
  }, [pathname]);

  // Data-saver / low-memory / low-core devices get the reduced-motion
  // treatment in framer too (GSAP/canvas already gate via prefersLiteMotion).
  const [reducedMotion, setReducedMotion] = useState<"user" | "always">("user");
  useEffect(() => {
    if (prefersLiteMotion()) setReducedMotion("always");
  }, []);

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

    // Keep the exact wrapper reference so cleanup actually removes it —
    // removing `lenis.raf` (a different function) would silently leak the
    // ticker callback on every remount.
    const update = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(update);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(update);
      lenis.destroy();
      delete (window as Window & { __lenis?: Lenis }).__lenis;
    };
  }, []);

  return <MotionConfig reducedMotion={reducedMotion}>{children}</MotionConfig>;
}

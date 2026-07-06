"use client";

import { useEffect, useRef, ReactNode } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { GSAP_EXPO } from "@/lib/motion";

gsap.registerPlugin(ScrollTrigger);

type Effect = "rise" | "mask" | "settle";

interface AnimatedSectionProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  /** rise = fade up (default); mask = clip-wipe up; settle = scale-in. */
  effect?: Effect;
}

const FROM: Record<Effect, gsap.TweenVars> = {
  rise: { y: 30, opacity: 0 },
  mask: { clipPath: "inset(0 0 100% 0)", y: 24, opacity: 0 },
  settle: { scale: 0.98, opacity: 0 },
};

const TO: Record<Effect, gsap.TweenVars> = {
  rise: { y: 0, opacity: 1, duration: 0.6, ease: "power3.out" },
  mask: { clipPath: "inset(0 0 0% 0)", y: 0, opacity: 1, duration: 0.9, ease: GSAP_EXPO },
  settle: { scale: 1, opacity: 1, duration: 0.8, ease: GSAP_EXPO },
};

export default function AnimatedSection({
  children,
  className = "",
  delay = 0,
  effect = "rise",
}: AnimatedSectionProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const ctx = gsap.context(() => {
        if (!ref.current) return;
        gsap.fromTo(ref.current, FROM[effect], {
          ...TO[effect],
          delay,
          scrollTrigger: {
            trigger: ref.current,
            start: "top 88%",
            toggleActions: "play none none none",
          },
        });
      }, ref);
      return () => ctx.revert();
    });
    return () => mm.revert();
  }, [delay, effect]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}

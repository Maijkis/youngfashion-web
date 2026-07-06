"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function MissionStatement() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const bodyRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const ctx = gsap.context(() => {
        if (titleRef.current) {
          gsap.fromTo(titleRef.current,
            { y: 50, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.8, ease: "power3.out", delay: 0.2 }
          );
        }
        if (bodyRef.current) {
          gsap.fromTo(bodyRef.current,
            { y: 30, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.7, ease: "power3.out", delay: 0.5 }
          );
        }
      }, sectionRef);
      return () => ctx.revert();
    });
    return () => mm.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-20 md:py-32 px-5 md:px-10 lg:px-16 bg-[var(--color-paper)]">
      <div className="max-w-5xl">
        <div className="flex items-center gap-2.5 mb-6 md:mb-10">
          <span className="section-num">(01)</span>
          <span className="mono-label text-[var(--color-ink-muted)]">Our mission</span>
        </div>
        <h1
          ref={titleRef}
          className="font-display font-semibold uppercase text-[var(--color-ink)] leading-[0.95] tracking-[-0.02em] text-[clamp(1.75rem,5vw,3.75rem)]"
        >
          We believe in the power of young creative voices to reshape the future of fashion.
        </h1>
        <p
          ref={bodyRef}
          className="mt-8 md:mt-12 text-[var(--color-ink)]/70 font-light text-base md:text-lg leading-relaxed max-w-2xl"
        >
          Founded in Vilnius in 2022, Young Fashion has grown through four
          editions — from its debut to closing Vilnius Fashion Week 2025 at
          K2 Comedy Club, and showcasing at the National Art Gallery in 2024.
          We provide emerging designers with a platform, production support,
          and direct connections to the fashion industry. Our goal is to make
          Lithuanian and Baltic design talent visible on the global stage
          while fostering a community rooted in innovation and artistic freedom.
        </p>
      </div>
    </section>
  );
}

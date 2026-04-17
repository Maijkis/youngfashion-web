"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function IntroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const wordsRef = useRef<(HTMLSpanElement | null)[]>([]);

  const sentence =
    "A platform where raw talent meets the runway. Since 2022, we've been the stage for emerging designers in Vilnius to show the world what they're made of.";
  const words = sentence.split(" ");

  useEffect(() => {
    const ctx = gsap.context(() => {
      wordsRef.current.forEach((word) => {
        if (!word) return;
        gsap.fromTo(
          word,
          { opacity: 0.18 },
          {
            opacity: 1,
            duration: 0.4,
            ease: "power2.out",
            scrollTrigger: {
              trigger: word,
              start: "top 85%",
              end: "top 45%",
              scrub: true,
            },
          }
        );
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full bg-white px-5 md:px-10 lg:px-16 py-24 md:py-40"
    >
      <div className="max-w-5xl">
        <span className="block text-[10px] md:text-[11px] uppercase tracking-[0.32em] text-[var(--color-ink-muted)] font-medium mb-8 md:mb-12">
          About
        </span>
        <p className="font-light text-[var(--color-ink)] leading-[1.18] tracking-[-0.015em] text-[clamp(1.75rem,5vw,3.5rem)]">
          {words.map((w, i) => (
            <span
              key={i}
              ref={(el) => { wordsRef.current[i] = el; }}
              className="inline-block mr-[0.28em]"
            >
              {w}
            </span>
          ))}
        </p>
      </div>
    </section>
  );
}

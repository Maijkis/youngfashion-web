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
  }, []);

  return (
    <section ref={sectionRef} className="py-20 md:py-32 px-6 md:px-12 lg:px-20">
      <div className="max-w-4xl">
        <p className="text-[10px] uppercase tracking-[0.25em] text-white/30 font-bold mb-4">
          Our Mission
        </p>
        <h1
          ref={titleRef}
          className="text-2xl md:text-4xl lg:text-5xl font-bold leading-[1.1] tracking-[-0.02em] text-white"
        >
          We believe in the power of young creative voices to reshape the
          future of fashion.
        </h1>
        <p
          ref={bodyRef}
          className="mt-8 md:mt-10 text-white/40 text-sm md:text-base leading-relaxed max-w-2xl"
        >
          Founded in Vilnius in 2022, Young Fashion has grown through four
          editions — from its debut to closing Vilnius Fashion Week 2025 at
          K2 Comedy Club, and showcasing at the National Art Gallery in 2024.
          We provide emerging designers with a platform, production support,
          and direct connections to the fashion industry. Our goal is to make
          Lithuanian and Baltic design talent visible on the global stage
          while fostering a community rooted in innovation and artistic
          freedom.
        </p>
      </div>
    </section>
  );
}

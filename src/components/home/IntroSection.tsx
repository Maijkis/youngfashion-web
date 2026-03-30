"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function IntroSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const wordsRef = useRef<(HTMLSpanElement | null)[]>([]);

  const sentence =
    "A platform where raw talent meets the runway. Since 2022, Young Fashion has been the stage for emerging designers in Vilnius to show the world what they're made of.";

  const words = sentence.split(" ");

  useEffect(() => {
    const ctx = gsap.context(() => {
      wordsRef.current.forEach((word, i) => {
        if (!word) return;
        gsap.fromTo(
          word,
          { opacity: 0.15 },
          {
            opacity: 1,
            duration: 0.4,
            ease: "power2.out",
            scrollTrigger: {
              trigger: word,
              start: "top 85%",
              end: "top 50%",
              scrub: true,
            },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-24 md:py-40 px-6 md:px-12 lg:px-20">
      <div className="max-w-5xl">
        <p className="text-2xl md:text-4xl lg:text-5xl font-light leading-[1.3] tracking-[-0.01em]">
          {words.map((word, i) => (
            <span
              key={i}
              ref={(el) => { wordsRef.current[i] = el; }}
              className="inline-block mr-[0.3em] text-white"
            >
              {word}
            </span>
          ))}
        </p>
      </div>
    </section>
  );
}

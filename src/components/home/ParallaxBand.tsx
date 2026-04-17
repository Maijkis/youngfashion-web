"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function ParallaxBand() {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const lineRefs = useRef<(HTMLSpanElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (imageRef.current) {
        gsap.fromTo(
          imageRef.current,
          { y: "-12%" },
          {
            y: "12%",
            ease: "none",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          }
        );
      }

      lineRefs.current.forEach((line, i) => {
        if (!line) return;
        gsap.fromTo(
          line,
          { y: 50, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            delay: i * 0.1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: textRef.current,
              start: "top 82%",
              toggleActions: "play none none none",
            },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const lines = ["Not just fashion.", "A culture."];

  return (
    <section
      ref={sectionRef}
      className="relative w-full h-[75vh] md:h-[85vh] overflow-hidden bg-black"
    >
      <div ref={imageRef} className="absolute inset-[-12%] w-[100%] h-[124%]">
        <Image
          src="/photowall/2025/KristinaPetrikonyte-4185075.jpg"
          alt=""
          fill
          sizes="100vw"
          className="object-cover"
          quality={75}
        />
        <div className="absolute inset-0 bg-black/40" />
      </div>

      <div
        ref={textRef}
        className="absolute inset-0 flex flex-col items-start justify-center z-10 px-5 md:px-10 lg:px-16"
      >
        <div className="max-w-[22ch]">
          {lines.map((line, i) => (
            <span
              key={i}
              ref={(el) => { lineRefs.current[i] = el; }}
              className="block font-light leading-[1.02] tracking-[-0.015em] text-white text-[clamp(2.5rem,9vw,8rem)]"
            >
              {line}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

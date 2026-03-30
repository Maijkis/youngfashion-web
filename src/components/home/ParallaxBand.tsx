"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function ParallaxBand() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const lineRefs = useRef<(HTMLSpanElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Parallax image
      if (imageRef.current) {
        gsap.fromTo(
          imageRef.current,
          { y: "-15%" },
          {
            y: "15%",
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

      // Text reveal on scroll
      lineRefs.current.forEach((line, i) => {
        if (!line) return;
        gsap.fromTo(
          line,
          { y: 60, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            delay: i * 0.1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: textRef.current,
              start: "top 80%",
              toggleActions: "play none none none",
            },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const words = ["NOT JUST", "FASHION.", "A CULTURE."];

  return (
    <section
      ref={sectionRef}
      className="relative w-full h-[70vh] md:h-[80vh] overflow-hidden"
    >
      {/* Parallax image */}
      <div
        ref={imageRef}
        className="absolute inset-[-15%] w-[100%] h-[130%]"
      >
        <Image
          src="/behind-the-scenes/2025/IMG_0250.jpg"
          alt="Young Fashion atmosphere"
          fill
          sizes="100vw"
          className="object-cover"
          quality={80}
        />
        <div className="absolute inset-0 bg-black/50" />
      </div>

      {/* Centered bold text */}
      <div
        ref={textRef}
        className="absolute inset-0 flex flex-col items-center justify-center z-10 px-6"
      >
        {words.map((word, i) => (
          <span
            key={i}
            ref={(el) => { lineRefs.current[i] = el; }}
            className="block text-[clamp(2.5rem,8vw,7rem)] font-bold leading-[0.95] tracking-[-0.02em] text-white uppercase text-center"
          >
            {word}
          </span>
        ))}
      </div>
    </section>
  );
}

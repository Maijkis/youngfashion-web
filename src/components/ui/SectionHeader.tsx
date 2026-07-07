"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  className?: string;
  centered?: boolean;
  /** Section index — renders an accent "(0N)" glyph beside the subtitle. */
  num?: number;
}

export default function SectionHeader({
  title,
  subtitle,
  className = "",
  centered = false,
  num,
}: SectionHeaderProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const ctx = gsap.context(() => {
        if (!ref.current) return;
        gsap.fromTo(
          ref.current,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.7,
            ease: "power3.out",
            scrollTrigger: {
              trigger: ref.current,
              start: "top 85%",
              toggleActions: "play none none none",
            },
          }
        );
      }, ref);
      return () => ctx.revert();
    });
    return () => mm.revert();
  }, []);

  return (
    <div
      ref={ref}
      className={`mb-16 ${centered ? "text-center" : ""} ${className}`}
    >
      {subtitle && (
        <p
          className={`mono-label text-[var(--color-ink-muted)] mb-4 flex items-center gap-2.5 ${
            centered ? "justify-center" : ""
          }`}
        >
          {num !== undefined && <span className="section-num">({String(num).padStart(2, "0")})</span>}
          {subtitle}
        </p>
      )}
      <h2 className="font-display font-semibold uppercase text-[var(--color-ink)] leading-display tracking-tight text-h1">
        {title}
      </h2>
    </div>
  );
}

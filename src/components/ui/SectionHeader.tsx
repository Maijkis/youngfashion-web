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
}

export default function SectionHeader({
  title,
  subtitle,
  className = "",
  centered = false,
}: SectionHeaderProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
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
  }, []);

  return (
    <div
      ref={ref}
      className={`mb-10 md:mb-14 ${centered ? "text-center" : ""} ${className}`}
    >
      {subtitle && (
        <p className="text-[10px] uppercase tracking-[0.25em] text-white/30 font-bold mb-3">
          {subtitle}
        </p>
      )}
      <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold uppercase tracking-[-0.02em] leading-[0.95] text-white">
        {title}
      </h2>
    </div>
  );
}

"use client";

import AnimatedSection from "./AnimatedSection";

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  light?: boolean;
  className?: string;
}

export default function SectionHeader({
  title,
  subtitle,
  light = false,
  className = "",
}: SectionHeaderProps) {
  return (
    <AnimatedSection className={`text-center mb-10 md:mb-16 ${className}`}>
      <div className="relative z-0 max-w-4xl mx-auto overflow-hidden px-4">
        <h2
          className={`text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light uppercase tracking-[0.1em] sm:tracking-[0.15em] md:tracking-[0.2em] leading-tight ${
            light ? "text-white" : "text-white"
          }`}
        >
          {title}
        </h2>
        {subtitle && (
          <p
            className={`mt-3 md:mt-4 text-[10px] sm:text-[11px] md:text-xs uppercase tracking-[0.12em] sm:tracking-[0.15em] md:tracking-[0.2em] ${
              light ? "text-muted-light" : "text-muted"
            }`}
          >
            {subtitle}
          </p>
        )}
        <div className="mt-4 md:mt-6 mx-auto w-10 sm:w-12 md:w-16 h-px bg-white/20" />
      </div>
    </AnimatedSection>
  );
}

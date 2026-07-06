"use client";

import { motion } from "framer-motion";

interface YearFilterProps {
  years: number[];
  activeYear: number;
  onChange: (year: number) => void;
}

export default function YearFilter({ years, activeYear, onChange }: YearFilterProps) {
  return (
    <div className="flex items-center gap-6 md:gap-8 mb-12 md:mb-16 border-b border-hairline pb-4">
      {years.map((year) => (
        <button
          key={year}
          onClick={() => onChange(year)}
          className={`mono-label relative min-h-[44px] transition-colors cursor-pointer tabular-nums ${
            activeYear === year
              ? "text-[var(--color-ink)]"
              : "text-[var(--color-ink-muted)] hover:text-[var(--color-ink)]"
          }`}
        >
          <span>{year}</span>
          {activeYear === year && (
            <motion.span
              layoutId="year-underline"
              className="absolute -bottom-[17px] left-0 right-0 h-px bg-[var(--color-accent)]"
              transition={{ duration: 0.3, ease: "easeOut" }}
            />
          )}
        </button>
      ))}
    </div>
  );
}

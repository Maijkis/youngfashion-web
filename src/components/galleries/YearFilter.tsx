"use client";

import { motion } from "framer-motion";

interface YearFilterProps {
  years: number[];
  activeYear: number;
  onChange: (year: number) => void;
}

export default function YearFilter({ years, activeYear, onChange }: YearFilterProps) {
  return (
    <div className="flex items-center gap-1 md:gap-2 mb-10 md:mb-14">
      <div className="bg-white/[0.04] backdrop-blur-xl border border-white/[0.1] rounded-full p-1 flex gap-1">
        {years.map((year) => (
          <button
            key={year}
            onClick={() => onChange(year)}
            className={`relative px-4 md:px-6 py-2 md:py-2.5 text-[11px] md:text-xs uppercase tracking-[0.2em] font-bold transition-colors duration-300 cursor-pointer rounded-full min-h-[40px] ${
              activeYear === year
                ? "text-black"
                : "text-white/40 hover:text-white"
            }`}
          >
            {activeYear === year && (
              <motion.div
                layoutId="year-pill"
                className="absolute inset-0 bg-white rounded-full"
                transition={{ duration: 0.3, ease: "easeOut" }}
              />
            )}
            <span className="relative z-10">{year}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

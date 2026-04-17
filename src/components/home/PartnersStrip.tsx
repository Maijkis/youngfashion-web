"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { sponsors2026, pastPartners } from "@/lib/mockData";

export default function PartnersStrip() {
  const allSponsors = [...sponsors2026, ...pastPartners];
  const doubled = [...allSponsors, ...allSponsors, ...allSponsors];

  return (
    <section className="py-20 md:py-24 border-t border-[var(--color-hairline)] bg-white">
      <div className="max-w-7xl mx-auto px-5 md:px-10 lg:px-16 mb-10 text-center">
        <p className="text-[10px] md:text-[11px] uppercase tracking-[0.32em] text-[var(--color-ink-muted)] font-medium">
          In partnership with
        </p>
      </div>

      <div className="relative overflow-hidden">
        <div className="absolute left-0 top-0 bottom-0 w-16 md:w-24 bg-gradient-to-r from-white to-transparent z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-16 md:w-24 bg-gradient-to-l from-white to-transparent z-10" />

        <motion.div
          className="flex items-center gap-12 md:gap-16"
          animate={{ x: [0, -200 * allSponsors.length] }}
          transition={{
            x: { duration: 36, repeat: Infinity, ease: "linear" },
          }}
          style={{ width: "fit-content" }}
        >
          {doubled.map((sponsor, i) => (
            <div
              key={`${sponsor.id}-${i}`}
              className="flex-shrink-0 opacity-50 hover:opacity-100 transition-opacity duration-300"
            >
              <Image
                src={sponsor.logo}
                alt={sponsor.name}
                width={160}
                height={64}
                className="h-7 md:h-9 w-auto object-contain"
              />
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

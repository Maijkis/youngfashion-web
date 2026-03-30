"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { sponsors2026, pastPartners } from "@/lib/mockData";

export default function PartnersStrip() {
  const allSponsors = [...sponsors2026, ...pastPartners];
  const doubled = [...allSponsors, ...allSponsors, ...allSponsors];

  return (
    <section className="py-12 md:py-16 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 md:px-6 mb-6">
        <p className="text-[10px] uppercase tracking-[0.2em] text-muted/60 text-center">
          Our Partners
        </p>
      </div>

      <div className="relative overflow-hidden">
        <div className="absolute left-0 top-0 bottom-0 w-16 md:w-24 bg-gradient-to-r from-black to-transparent z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-16 md:w-24 bg-gradient-to-l from-black to-transparent z-10" />

        <motion.div
          className="flex items-center gap-12 md:gap-16"
          animate={{ x: [0, -200 * allSponsors.length] }}
          transition={{
            x: {
              duration: 30,
              repeat: Infinity,
              ease: "linear",
            },
          }}
          style={{ width: "fit-content" }}
        >
          {doubled.map((sponsor, i) => (
            <div
              key={`${sponsor.id}-${i}`}
              className="flex-shrink-0 opacity-30 hover:opacity-60 transition-opacity duration-300"
            >
              <Image
                src={sponsor.logo}
                alt={sponsor.name}
                width={160}
                height={64}
                className="h-7 md:h-9 w-auto object-contain invert"
              />
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

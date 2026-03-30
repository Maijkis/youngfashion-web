"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { sponsors2026, infoPartners, pastPartners, Sponsor } from "@/lib/mockData";
import AnimatedSection from "@/components/ui/AnimatedSection";
import SectionHeader from "@/components/ui/SectionHeader";

function SponsorGrid({ sponsors, label }: { sponsors: Sponsor[]; label?: string }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
      {sponsors.map((sponsor, i) => (
        <AnimatedSection key={sponsor.id} delay={i * 0.08}>
          <div className="glass-card rounded-sm p-4 md:p-6 flex items-center justify-center aspect-[5/2]">
            <Image
              src={sponsor.logo}
              alt={sponsor.name}
              width={200}
              height={80}
              className="w-full h-auto object-contain invert opacity-70 hover:opacity-100 transition-opacity duration-300"
            />
          </div>
        </AnimatedSection>
      ))}
    </div>
  );
}

function Marquee({ sponsors }: { sponsors: Sponsor[] }) {
  const doubled = [...sponsors, ...sponsors, ...sponsors];

  return (
    <div className="relative overflow-hidden py-8">
      {/* Fade edges */}
      <div className="absolute left-0 top-0 bottom-0 w-16 md:w-24 bg-gradient-to-r from-black to-transparent z-10" />
      <div className="absolute right-0 top-0 bottom-0 w-16 md:w-24 bg-gradient-to-l from-black to-transparent z-10" />

      <motion.div
        className="flex items-center gap-12 md:gap-16"
        animate={{ x: [0, -220 * sponsors.length] }}
        transition={{
          x: {
            duration: 25,
            repeat: Infinity,
            ease: "linear",
          },
        }}
        style={{ width: "fit-content" }}
      >
        {doubled.map((sponsor, i) => (
          <div
            key={`${sponsor.id}-${i}`}
            className="flex-shrink-0 opacity-40 hover:opacity-80 transition-opacity duration-300"
          >
            <Image
              src={sponsor.logo}
              alt={sponsor.name}
              width={180}
              height={72}
              className="h-8 md:h-10 w-auto object-contain invert"
            />
          </div>
        ))}
      </motion.div>
    </div>
  );
}

export default function SponsorSection() {
  return (
    <>
      {/* Sponsors 2026 */}
      <section className="py-12 md:py-20 px-4 md:px-6">
        <div className="max-w-5xl mx-auto">
          <SectionHeader title="Sponsors" subtitle="Brands powering Young Fashion" />
          <SponsorGrid sponsors={sponsors2026} />
        </div>
      </section>

      {/* Information Partners */}
      <section className="py-12 md:py-20 px-4 md:px-6">
        <div className="max-w-5xl mx-auto">
          <SectionHeader title="Information Partners" subtitle="Media partners amplifying our voice" />
          <SponsorGrid sponsors={infoPartners} />
        </div>
      </section>

      {/* Past Partners */}
      <section className="py-12 md:py-20 px-4 md:px-6">
        <div className="max-w-6xl mx-auto">
          <SectionHeader title="Past Partners" subtitle="Brands that have supported our journey" />
          <Marquee sponsors={pastPartners} />
        </div>
      </section>
    </>
  );
}

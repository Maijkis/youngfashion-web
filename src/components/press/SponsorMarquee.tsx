"use client";

import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { infoPartners, pastPartners, Sponsor } from "@/lib/mockData";
import { partnerProfiles } from "@/lib/content";
import AnimatedSection from "@/components/ui/AnimatedSection";
import SectionHeader from "@/components/ui/SectionHeader";

/* This year's partners — driven by the same profiles as the homepage; each
   tile links through to /press-partners/<slug> and its communication map. */
function PartnerGrid() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
      {partnerProfiles.map((partner, i) => (
        <AnimatedSection key={partner.slug} delay={i * 0.06}>
          <Link
            href={`/press-partners/${partner.slug}`}
            className="group flex items-center justify-center aspect-[5/2] border border-[var(--color-hairline)] bg-[var(--color-paper-deep)] p-4 md:p-6 transition-colors hover:border-[var(--color-ink)]/40"
          >
            {partner.logo ? (
              <Image
                src={partner.logo}
                alt={partner.name}
                width={200}
                height={80}
                className="max-h-full max-w-full w-auto object-contain opacity-80 group-hover:opacity-100 transition-opacity mix-blend-multiply"
              />
            ) : (
              <span className="mono-label text-center leading-snug text-[var(--color-ink-muted)] group-hover:text-[var(--color-ink)] transition-colors">
                {partner.name}
              </span>
            )}
          </Link>
        </AnimatedSection>
      ))}
    </div>
  );
}

function SponsorGrid({ sponsors }: { sponsors: Sponsor[] }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
      {sponsors.map((sponsor, i) => (
        <AnimatedSection key={sponsor.id} delay={i * 0.06}>
          <div className="flex items-center justify-center aspect-[5/2] border border-[var(--color-hairline)] bg-[var(--color-paper-deep)] p-4 md:p-6">
            {sponsor.logo ? (
              <Image
                src={sponsor.logo}
                alt={sponsor.name}
                width={200}
                height={80}
                className="w-full h-auto object-contain opacity-70 hover:opacity-100 transition-opacity"
              />
            ) : (
              <span className="mono-label text-[var(--color-ink-muted)] text-center leading-snug">
                {sponsor.name}
              </span>
            )}
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
      <div className="absolute left-0 top-0 bottom-0 w-16 md:w-24 bg-gradient-to-r from-[var(--color-paper)] to-transparent z-10" />
      <div className="absolute right-0 top-0 bottom-0 w-16 md:w-24 bg-gradient-to-l from-[var(--color-paper)] to-transparent z-10" />

      <motion.div
        className="flex items-center gap-12 md:gap-16"
        animate={{ x: [0, -220 * sponsors.length] }}
        transition={{ x: { duration: 32, repeat: Infinity, ease: "linear" } }}
        style={{ width: "fit-content" }}
      >
        {doubled.map((sponsor, i) => (
          <div
            key={`${sponsor.id}-${i}`}
            className="flex-shrink-0 opacity-50 hover:opacity-100 transition-opacity duration-300"
          >
            {sponsor.logo ? (
              <Image
                src={sponsor.logo}
                alt={sponsor.name}
                width={180}
                height={72}
                className="h-8 md:h-10 w-auto object-contain"
              />
            ) : (
              <span className="mono-label text-[var(--color-ink-muted)] whitespace-nowrap">
                {sponsor.name}
              </span>
            )}
          </div>
        ))}
      </motion.div>
    </div>
  );
}

export default function SponsorSection() {
  const reducedMotion = useReducedMotion();

  return (
    <>
      <section className="py-section">
        <div className="container">
          <SectionHeader title="Sponsors" subtitle="Brands powering the platform" />
          <PartnerGrid />
        </div>
      </section>

      <section className="py-section border-t border-[var(--color-hairline)]">
        <div className="container">
          <SectionHeader title="Information partners" subtitle="Media amplifying our voice" />
          <SponsorGrid sponsors={infoPartners} />
        </div>
      </section>

      <section className="py-section border-t border-[var(--color-hairline)]">
        <div className="container">
          <SectionHeader title="Past partners" subtitle="Brands that have supported our journey" />
          {reducedMotion ? <SponsorGrid sponsors={pastPartners} /> : <Marquee sponsors={pastPartners} />}
        </div>
      </section>
    </>
  );
}

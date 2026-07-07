import Link from "next/link";
import SectionTag from "@/components/ui/SectionTag";
import GridLines from "@/components/ui/GridLines";
import Marquee from "@/components/ui/Marquee";
import InViewFlag from "@/components/ui/InViewFlag";
import { partners, sectionIndex } from "@/lib/content";

export default function Partners() {
  // Repeat the wall so one marquee copy overfills a wide viewport — with only
  // two credits, 6× (~2,100px of names) is what clears the 1600px container.
  const wall = Array.from({ length: 6 }).flatMap(() => partners.wall);

  return (
    <section id="partners" className="relative py-section">
      <GridLines className="opacity-40" />
      <div className="container relative z-10">
      <SectionTag index={sectionIndex("partners")} label="Partners" className="mb-12" />

      {/* Headline partners — each name draws an underline as the block enters
          view. Rows link to the partner profile (where the logo lives); hover
          just nudges the name, no logo swap. */}
      <InViewFlag className="border-t border-hairline mb-16 md:mb-24">
        {partners.main.map((partner, i) => (
          <Link
            key={partner.slug}
            href={`/press-partners/${partner.slug}`}
            className="group relative flex items-center justify-between gap-4 py-6 md:py-8"
          >
            <h3 className="font-display font-semibold uppercase text-h1 leading-display tracking-tight transition-transform duration-300 ease-[var(--ease)] group-hover:translate-x-2">
              {partner.name}
            </h3>
            <span className="section-num shrink-0">({String(i + 1).padStart(2, "0")})</span>
            <span
              className="rule-draw absolute bottom-0 left-0 right-0 h-px bg-[var(--color-ink)]/25"
              style={{ transitionDelay: `${i * 0.12}s` }}
            />
          </Link>
        ))}
      </InViewFlag>

      {/* Supporting partners — looping credit marquee, each linking to its profile */}
      <Marquee durationSec={38} pauseOnHover className="border-y border-hairline py-6">
        {wall.map((partner, i) => (
          <Link
            key={`${partner.slug}-${i}`}
            href={`/press-partners/${partner.slug}`}
            className="mono-label text-[var(--color-ink-muted)] hover:text-[var(--color-ink)] transition-colors whitespace-nowrap flex items-center"
          >
            {partner.name}
            <span className="text-[var(--color-accent-text)] mx-8" aria-hidden>
              ✳
            </span>
          </Link>
        ))}
      </Marquee>
      </div>
    </section>
  );
}

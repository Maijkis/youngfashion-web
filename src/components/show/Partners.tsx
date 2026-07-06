import Image from "next/image";
import SectionTag from "@/components/ui/SectionTag";
import Marquee from "@/components/ui/Marquee";
import InViewFlag from "@/components/ui/InViewFlag";
import { partners, sectionIndex } from "@/lib/content";

export default function Partners() {
  // Repeat the logo wall so one marquee copy overfills a wide viewport.
  const wall = Array.from({ length: 3 }).flatMap(() => partners.wall);

  return (
    <section id="partners" className="px-5 md:px-10 lg:px-16 py-20 md:py-32">
      <SectionTag index={sectionIndex("partners")} label="Partners" className="mb-14 md:mb-20" />

      {/* Three main partners — each name draws an underline as the block enters view */}
      <InViewFlag className="border-t border-hairline mb-16 md:mb-24">
        {partners.main.map((partner, i) => (
          <div
            key={partner.name}
            className="relative flex items-center justify-between gap-4 py-6 md:py-10"
          >
            <h3 className="font-display font-semibold uppercase text-[clamp(2rem,8vw,5rem)] leading-none">
              {partner.logo ? (
                <span className="relative inline-block group">
                  <span className="transition-opacity duration-300 group-hover:opacity-0">
                    {partner.name}
                  </span>
                  <Image
                    src={partner.logo}
                    alt={partner.name}
                    width={240}
                    height={80}
                    className="absolute left-0 top-1/2 -translate-y-1/2 h-[0.7em] w-auto opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                  />
                </span>
              ) : (
                partner.name
              )}
            </h3>
            <span className="section-num shrink-0">({String(i + 1).padStart(2, "0")})</span>
            <span
              className="rule-draw absolute bottom-0 left-0 right-0 h-px bg-[var(--color-ink)]/25"
              style={{ transitionDelay: `${i * 0.12}s` }}
            />
          </div>
        ))}
      </InViewFlag>

      {/* Supporting partners — looping logo marquee */}
      <Marquee durationSec={38} pauseOnHover className="border-y border-hairline py-6">
        {wall.map((partner, i) =>
          partner.url ? (
            <a
              key={`${partner.name}-${i}`}
              href={partner.url}
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-sm uppercase tracking-[0.1em] text-[var(--color-ink-muted)] hover:text-[var(--color-ink)] transition-colors whitespace-nowrap flex items-center"
            >
              {partner.name}
              <span className="text-[var(--color-accent-text)] mx-8" aria-hidden>
                ✳
              </span>
            </a>
          ) : (
            <span
              key={`${partner.name}-${i}`}
              className="font-mono text-sm uppercase tracking-[0.1em] text-[var(--color-ink-muted)] whitespace-nowrap flex items-center"
            >
              {partner.name}
              <span className="text-[var(--color-accent-text)] mx-8" aria-hidden>
                ✳
              </span>
            </span>
          ),
        )}
      </Marquee>
    </section>
  );
}

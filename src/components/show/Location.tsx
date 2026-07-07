import SectionTag from "@/components/ui/SectionTag";
import AnimatedSection from "@/components/ui/AnimatedSection";
import VilniusMap from "@/components/show/VilniusMap";
import { event, sectionIndex } from "@/lib/content";

export default function Location() {
  return (
    <section id="location" className="py-section">
      <div className="container">
        <SectionTag index={sectionIndex("location")} label="Location" className="mb-12" />

        <div className="grid md:grid-cols-[minmax(0,22rem)_1fr] gap-12 items-start">
          <AnimatedSection effect="rise">
            <h2 className="font-display font-semibold uppercase text-[var(--color-ink)] text-h1 leading-display tracking-tight mb-6">
              {event.venue}
            </h2>
            <p className="mono-label text-[var(--color-ink-muted)]">{event.address}</p>
            <p className="mono-label text-[var(--color-ink-muted)] mt-1">{event.city}</p>
            <a
              href={event.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-flex items-center gap-1.5 min-h-[44px] mono-label text-[var(--color-accent-text)]"
            >
              <span className="link-underline">Get Directions</span>
              <span aria-hidden>↗</span>
            </a>
          </AnimatedSection>

          <AnimatedSection
            effect="settle"
            delay={0.1}
            className="w-full md:max-w-[760px] md:justify-self-end"
          >
            <a
              href={event.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Open ${event.venue}, ${event.address} in Google Maps`}
              className="group relative block border border-hairline bg-[var(--color-paper-deep)]/40 hover:bg-[var(--color-paper-deep)]/60 transition-colors"
            >
              <VilniusMap />
              <span className="mono-label absolute bottom-3 right-3 text-[var(--color-ink-muted)] opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                Open in Maps ↗
              </span>
            </a>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}

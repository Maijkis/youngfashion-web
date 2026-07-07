"use client";

import Link from "next/link";
import SectionTag from "@/components/ui/SectionTag";
import AnimatedSection from "@/components/ui/AnimatedSection";
import { event, ticketHref, ticketIsExternal, isPlaceholder, sectionIndex } from "@/lib/content";
import useMagnetic from "@/hooks/useMagnetic";

export default function TicketsCta() {
  const soon = isPlaceholder(event.ticketUrl);
  const magneticRef = useMagnetic<HTMLAnchorElement>();

  return (
    <section
      id="tickets"
      /* On the accent fill, remap the accent-text + muted vars to ink so the
         SectionTag number and label read at full contrast (the dark accent-text
         shade is tuned for paper, not magenta). */
      className="bg-[var(--color-accent)] text-[var(--color-ink)] [--color-accent-text:var(--color-ink)] [--color-ink-muted:var(--color-ink)] py-section"
    >
      <div className="container">
      <AnimatedSection effect="settle">
        <SectionTag index={sectionIndex("tickets")} label="Tickets" className="mb-4" />

        <h2 className="font-display font-semibold uppercase leading-display tracking-tight text-display mb-8 md:mb-12">
          {soon ? "Tickets Soon" : "Get Tickets"}
        </h2>

        <p className="mono-label mb-12">
          ★ {event.dayLabel} {event.dateLabel} ★ {event.venue}, {event.city} ★
        </p>

        {soon ? (
          <a
            href={event.instagram.url}
            ref={magneticRef}
            data-cta="tickets-section"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 min-h-[52px] px-6 border-2 border-[var(--color-ink)] font-mono text-label uppercase tracking-[0.2em] hover:bg-[var(--color-ink)] hover:text-[var(--color-accent)] transition-colors"
          >
            Follow {event.instagram.handle}
          </a>
        ) : (
          <Link
            href={ticketHref}
            ref={magneticRef}
            data-cta="tickets-section"
            target={ticketIsExternal ? "_blank" : undefined}
            rel={ticketIsExternal ? "noopener noreferrer" : undefined}
            className="inline-flex items-center gap-2 min-h-[52px] px-6 border-2 border-[var(--color-ink)] font-mono text-label uppercase tracking-[0.2em] hover:bg-[var(--color-ink)] hover:text-[var(--color-accent)] transition-colors"
          >
            Get Tickets <span className="arrow-nudge inline-block" aria-hidden>→</span>
          </Link>
        )}
      </AnimatedSection>
      </div>
    </section>
  );
}

"use client";

import SectionTag from "@/components/ui/SectionTag";
import GridLines from "@/components/ui/GridLines";
import AnimatedSection from "@/components/ui/AnimatedSection";
import Button from "@/components/ui/Button";
import { event, ticketHref, ticketIsExternal, isPlaceholder, sectionIndex } from "@/lib/content";

export default function TicketsCta() {
  const soon = isPlaceholder(event.ticketUrl);

  return (
    <section
      id="tickets"
      /* On the accent fill, remap the accent-text + muted vars to ink so the
         SectionTag number and label read at full contrast (the dark accent-text
         shade is tuned for paper, not magenta). */
      className="relative bg-[var(--color-accent)] text-[var(--color-ink)] [--color-accent-text:var(--color-ink)] [--color-ink-muted:var(--color-ink)] py-section"
    >
      <GridLines className="opacity-40" />
      <div className="container relative z-10">
      <AnimatedSection effect="settle">
        <SectionTag index={sectionIndex("tickets")} label="Tickets" className="mb-4" />

        <h2 className="font-display font-semibold uppercase leading-display tracking-tight text-display mb-8 md:mb-12">
          {soon ? "Tickets Soon" : "Get Tickets"}
        </h2>

        {/* Nowrap per phrase — at 390px the line breaks between the ★-separated
            phrases, never mid-phrase (no orphaned "LT ★"). */}
        <p className="mono-label mb-10 flex flex-wrap gap-x-3 gap-y-1">
          <span className="whitespace-nowrap">
            ★ {event.dayLabel} {event.dateLabel}
          </span>
          <span className="whitespace-nowrap">
            ★ {event.venue}, {event.city} ★
          </span>
        </p>

        {/* Ink-filled primary — the outline version was low-contrast on magenta. */}
        {soon ? (
          <Button
            variant="solid"
            href={event.instagram.url}
            target="_blank"
            rel="noopener noreferrer"
            dataCta="tickets-section"
            magnetic
            className="min-h-[52px]"
          >
            Follow {event.instagram.handle}
          </Button>
        ) : (
          <Button
            variant="solid"
            href={ticketHref}
            target={ticketIsExternal ? "_blank" : undefined}
            rel={ticketIsExternal ? "noopener noreferrer" : undefined}
            dataCta="tickets-section"
            magnetic
            className="min-h-[52px]"
          >
            Get Tickets <span className="arrow-nudge inline-block" aria-hidden>→</span>
          </Button>
        )}
      </AnimatedSection>
      </div>
    </section>
  );
}

"use client";

import Link from "next/link";
import { events } from "@/lib/mockData";
import AnimatedSection from "@/components/ui/AnimatedSection";

export default function UpcomingEvents() {
  const upcoming = events.filter((e) => e.upcoming);
  if (upcoming.length === 0) return null;
  const event = upcoming[0];

  const dateLabel = new Date(event.date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
  });

  return (
    <section className="relative w-full bg-white px-5 md:px-10 lg:px-16 py-24 md:py-32">
      <div className="max-w-6xl">
        <AnimatedSection>
          <span className="block text-[10px] md:text-[11px] uppercase tracking-[0.32em] text-[var(--color-ink-muted)] font-medium mb-8 md:mb-12">
            The next show
          </span>

          <h2 className="max-w-[18ch] font-light text-[var(--color-ink)] leading-[1.02] tracking-[-0.015em] text-[clamp(2.25rem,7vw,5.5rem)]">
            Five years. One night.
          </h2>

          <div className="mt-8 md:mt-10 max-w-2xl">
            <p className="text-[var(--color-ink)]/70 leading-relaxed text-base md:text-lg font-light">
              {event.description}
            </p>
          </div>

          <div className="mt-8 flex items-center gap-5 flex-wrap">
            <span className="text-[11px] uppercase tracking-[0.28em] text-[var(--color-ink)] font-medium">
              {dateLabel}
            </span>
            {event.location && (
              <>
                <span className="w-6 h-px bg-[var(--color-ink)]/30" />
                <span className="text-[11px] uppercase tracking-[0.28em] text-[var(--color-ink-muted)] font-medium">
                  {event.location}
                </span>
              </>
            )}
          </div>

          <Link
            href="/events"
            className="mt-10 md:mt-12 inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.28em] text-[var(--color-ink)] font-medium border-b border-[var(--color-ink)] pb-1 min-h-[44px] hover:gap-3 transition-all"
          >
            Reserve your seat
            <span>→</span>
          </Link>
        </AnimatedSection>
      </div>
    </section>
  );
}

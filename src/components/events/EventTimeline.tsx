"use client";

import Image from "next/image";
import Link from "next/link";
import { events, EventItem } from "@/lib/mockData";
import AnimatedSection from "@/components/ui/AnimatedSection";
import SectionHeader from "@/components/ui/SectionHeader";

const typeLabels: Record<string, string> = {
  runway: "Runway",
  "pop-up": "Pop-up",
  workshop: "Workshop",
  dinner: "Dinner",
  other: "Initiative",
};

function UpcomingCard({ event }: { event: EventItem }) {
  return (
    <AnimatedSection>
      <Link href={`/events/${event.slug}`} className="group block relative aspect-[16/9] md:aspect-[21/9] overflow-hidden bg-[var(--color-paper-deep)]">
        <Image
          src={event.images[0]}
          alt={event.title}
          fill
          className="object-cover transition-transform duration-[900ms] ease-image group-hover:scale-[1.02]"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-black/30" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
        <div className="absolute inset-0 flex flex-col items-start justify-end p-6 md:p-12">
          <div className="flex items-center gap-2 mb-4">
            <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
            <span className="mono-label text-white">
              Upcoming · {typeLabels[event.type]}
            </span>
          </div>
          <h3 className="max-w-[22ch] font-display font-semibold uppercase text-white leading-display tracking-tight text-h2 mb-4">
            {event.title}
          </h3>
          <p className="mono-label text-white/80 mb-5">
            {new Date(event.date).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
            {event.location && ` · ${event.location}`}
          </p>
          <span className="inline-flex items-center gap-2 text-label uppercase tracking-[0.28em] text-white font-medium border-b border-white/80 pb-1 group-hover:gap-3 transition-all">
            View event
            <span>→</span>
          </span>
        </div>
      </Link>
    </AnimatedSection>
  );
}

function PastEventCard({ event, index }: { event: EventItem; index: number }) {
  const isEven = index % 2 === 0;
  return (
    <AnimatedSection delay={index * 0.06}>
      <Link
        href={`/events/${event.slug}`}
        className={`group grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10 items-center py-10 md:py-14 border-b border-[var(--color-hairline)] ${isEven ? "" : "md:[&>div:first-child]:order-2"}`}
      >
        <div className="relative aspect-[4/3] overflow-hidden bg-[var(--color-paper-deep)]">
          <Image
            src={event.images[0]}
            alt={event.title}
            fill
            className="object-cover transition-transform duration-[900ms] ease-image group-hover:scale-[1.03]"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>

        <div>
          <div className="flex items-center gap-3 mb-5 md:mb-6">
            <span className="section-num">({String(index + 1).padStart(2, "0")})</span>
            <span className="mono-label text-[var(--color-ink-muted)]">
              {typeLabels[event.type]}
            </span>
            <span className="w-6 h-px bg-[var(--color-ink)]/30" />
            <span className="mono-label text-[var(--color-ink-muted)] tabular-nums">
              {new Date(event.date).getFullYear()}
            </span>
          </div>

          <h3 className="max-w-[22ch] font-display font-semibold uppercase text-[var(--color-ink)] leading-display tracking-tight text-h2 mb-4">
            {event.title}
          </h3>

          <p className="mono-label text-[var(--color-ink-muted)] mb-5">
            {new Date(event.date).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
            {event.location && ` · ${event.location}`}
          </p>

          <p className="text-body text-[var(--color-ink)]/65 font-light leading-body mb-6 max-w-xl">
            {event.description}
          </p>

          <span className="inline-flex items-center gap-2 text-label uppercase tracking-[0.28em] text-[var(--color-ink)] font-medium border-b border-[var(--color-ink)] pb-1 group-hover:gap-3 transition-all">
            Read more
            <span>→</span>
          </span>
        </div>
      </Link>
    </AnimatedSection>
  );
}

export default function EventTimeline() {
  const upcomingEvents = events.filter((e) => e.upcoming);
  const pastEvents = events.filter((e) => !e.upcoming);

  return (
    <div>
      {upcomingEvents.length > 0 && (
        <div className="mb-20 md:mb-28">
          <SectionHeader title="Upcoming" subtitle="What's next" />
          <div className="space-y-6">
            {upcomingEvents.map((event) => (
              <UpcomingCard key={event.id} event={event} />
            ))}
          </div>
        </div>
      )}

      <div>
        <SectionHeader title="Past events" subtitle="Our journey so far" />
        <div>
          {pastEvents.map((event, i) => (
            <PastEventCard key={event.id} event={event} index={i} />
          ))}
        </div>
      </div>
    </div>
  );
}

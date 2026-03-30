"use client";

import Image from "next/image";
import { CalendarDays, ArrowRight } from "lucide-react";
import { events, EventItem } from "@/lib/mockData";
import AnimatedSection from "@/components/ui/AnimatedSection";
import SectionHeader from "@/components/ui/SectionHeader";
import Button from "@/components/ui/Button";

const typeLabels: Record<string, string> = {
  runway: "Runway Show",
  "pop-up": "Pop-Up",
  workshop: "Workshop",
  dinner: "Dinner",
  other: "Initiative",
};

function UpcomingCard({ event }: { event: EventItem }) {
  return (
    <AnimatedSection>
      <div className="glass-strong rounded-sm overflow-hidden">
        <div className="relative aspect-[16/9] md:aspect-[21/9]">
          <Image
            src={event.images[0]}
            alt={event.title}
            fill
            className="object-cover"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
          <div className="absolute inset-0 flex flex-col items-center justify-end p-6 md:p-12 text-center">
            <div className="inline-flex items-center gap-2 glass rounded-full px-4 py-1.5 mb-4 md:mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
              <span className="text-[10px] uppercase tracking-[0.2em] text-white/80">
                Upcoming
              </span>
            </div>
            <h3 className="text-xl md:text-3xl lg:text-4xl font-light uppercase tracking-[0.1em] text-white mb-3 md:mb-4">
              {event.title}
            </h3>
            <div className="flex items-center gap-2 text-white/50 mb-4 md:mb-6">
              <CalendarDays size={14} />
              <span className="text-[11px] uppercase tracking-[0.15em]">
                {new Date(event.date).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                })}
              </span>
            </div>
            <p className="text-xs md:text-sm text-white/60 max-w-lg mb-6 md:mb-8 leading-relaxed">
              {event.description}
            </p>
            <Button href={`/events/${event.slug}`} variant="frost">
              See More
              <ArrowRight size={14} className="inline ml-2" />
            </Button>
          </div>
        </div>
      </div>
    </AnimatedSection>
  );
}

function PastEventCard({ event, index }: { event: EventItem; index: number }) {
  const isEven = index % 2 === 0;

  return (
    <AnimatedSection delay={index * 0.08}>
      <div className="glass-card rounded-sm overflow-hidden">
        <div className={`flex flex-col ${isEven ? "md:flex-row" : "md:flex-row-reverse"}`}>
          {/* Image */}
          <div className="relative aspect-[16/9] md:aspect-auto md:w-2/5 flex-shrink-0">
            <Image
              src={event.images[0]}
              alt={event.title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 40vw"
            />
            <div className="absolute inset-0 bg-black/20" />
          </div>

          {/* Content */}
          <div className="p-5 md:p-8 flex flex-col justify-center flex-1">
            <div className="flex items-center gap-3 mb-3 md:mb-4">
              <span className="glass text-[9px] md:text-[10px] uppercase tracking-[0.15em] text-white/70 px-3 py-1 rounded-full">
                {typeLabels[event.type]}
              </span>
              <span className="text-[10px] text-white/40 uppercase tracking-[0.1em]">
                {new Date(event.date).getFullYear()}
              </span>
            </div>

            <h3 className="text-base md:text-xl font-light uppercase tracking-[0.05em] md:tracking-[0.08em] text-white mb-2 md:mb-3">
              {event.title}
            </h3>

            <p className="text-[10px] md:text-[11px] uppercase tracking-[0.1em] text-white/40 mb-2 md:mb-3">
              {new Date(event.date).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>

            <p className="text-xs md:text-sm text-white/50 leading-relaxed">
              {event.description}
            </p>

            <div className="mt-5 md:mt-6">
              <Button href={`/events/${event.slug}`} variant="frost">
                See More
                <ArrowRight size={14} className="inline ml-2" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </AnimatedSection>
  );
}

export default function EventTimeline() {
  const upcomingEvents = events.filter((e) => e.upcoming);
  const pastEvents = events.filter((e) => !e.upcoming);

  return (
    <div>
      {/* Upcoming Events */}
      {upcomingEvents.length > 0 && (
        <div className="mb-16 md:mb-24">
          <SectionHeader title="Upcoming" subtitle="What's next" />
          <div className="space-y-6">
            {upcomingEvents.map((event) => (
              <UpcomingCard key={event.id} event={event} />
            ))}
          </div>
        </div>
      )}

      {/* Past Events */}
      <div>
        <SectionHeader title="Past Events" subtitle="Our journey so far" />
        <div className="space-y-4 md:space-y-6">
          {pastEvents.map((event, i) => (
            <PastEventCard key={event.id} event={event} index={i} />
          ))}
        </div>
      </div>
    </div>
  );
}

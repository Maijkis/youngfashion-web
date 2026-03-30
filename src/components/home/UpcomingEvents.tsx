"use client";

import { ArrowRight } from "lucide-react";
import { events } from "@/lib/mockData";
import AnimatedSection from "@/components/ui/AnimatedSection";
import Button from "@/components/ui/Button";

export default function UpcomingEvents() {
  const upcoming = events.filter((e) => e.upcoming);

  if (upcoming.length === 0) return null;

  const event = upcoming[0];

  return (
    <section className="py-16 md:py-24 px-6 md:px-12 lg:px-20">
      <div className="max-w-6xl">
        <AnimatedSection>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 md:gap-12">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                <span className="text-[10px] uppercase tracking-[0.25em] text-white/50 font-medium">
                  Next Event
                </span>
              </div>
              <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold uppercase tracking-[-0.02em] text-white leading-[0.95]">
                {event.title}
              </h2>
              <p className="mt-4 text-sm md:text-base text-white/50 max-w-xl leading-relaxed">
                {event.description}
              </p>
              <div className="mt-2 text-xs uppercase tracking-[0.2em] text-white/30">
                {new Date(event.date).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                })}
                {event.location && ` — ${event.location}`}
              </div>
            </div>
            <div className="flex-shrink-0">
              <Button href="/events" variant="outline">
                Learn More
                <ArrowRight size={14} className="inline ml-2" />
              </Button>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}

"use client";

import { CalendarDays, ArrowRight } from "lucide-react";
import { events } from "@/lib/mockData";
import AnimatedSection from "@/components/ui/AnimatedSection";
import Button from "@/components/ui/Button";

export default function UpcomingEvents() {
  const upcoming = events.filter((e) => e.upcoming);

  if (upcoming.length === 0) return null;

  const event = upcoming[0];

  return (
    <section className="py-16 md:py-24 px-4 md:px-6">
      <div className="max-w-4xl mx-auto">
        <AnimatedSection>
          <div className="glass-light rounded-sm p-6 md:p-12 text-center relative overflow-hidden">
            {/* Decorative gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/[0.03] to-transparent pointer-events-none" />

            <div className="relative z-10">
              <div className="inline-flex items-center gap-2 glass rounded-full px-4 py-1.5 mb-6 md:mb-8">
                <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                <span className="text-[10px] uppercase tracking-[0.2em] text-white/80">
                  Upcoming
                </span>
              </div>

              <h2 className="text-2xl md:text-4xl lg:text-5xl font-light uppercase tracking-[0.1em] md:tracking-[0.15em] text-white mb-4 md:mb-5">
                {event.title}
              </h2>

              <div className="flex items-center justify-center gap-2 text-white/50 mb-5 md:mb-8">
                <CalendarDays size={14} />
                <span className="text-[11px] md:text-xs uppercase tracking-[0.15em]">
                  {new Date(event.date).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                  })}
                </span>
              </div>

              <p className="text-xs md:text-sm text-white/60 leading-relaxed max-w-lg mx-auto mb-8 md:mb-10">
                {event.description}
              </p>

              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Button href="/events" variant="primary">
                  Learn More
                  <ArrowRight size={14} className="inline ml-2" />
                </Button>
              </div>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}

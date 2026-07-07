"use client";

import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SectionTag from "@/components/ui/SectionTag";
import GridLines from "@/components/ui/GridLines";
import OdometerDigit from "@/components/ui/OdometerDigit";
import Scrawl from "@/components/show/Scrawl";
import useCountdown from "@/hooks/useCountdown";
import { event, sectionIndex } from "@/lib/content";
import { MQ_SCRUB, prefersLiteMotion } from "@/lib/motion";

gsap.registerPlugin(ScrollTrigger);

const UNITS: { key: "days" | "hours" | "minutes" | "seconds"; label: string }[] = [
  { key: "days", label: "Days" },
  { key: "hours", label: "Hours" },
  { key: "minutes", label: "Minutes" },
  { key: "seconds", label: "Seconds" },
];

/** Two rolling digits, or "--" placeholders before the countdown mounts (same width → no CLS). */
function DigitPair({ value }: { value: number | null }) {
  const chars = (value === null ? "--" : String(value).padStart(2, "0")).split("");
  return (
    <span className="inline-flex">
      {chars.map((ch, i) =>
        ch === "-" ? (
          <span key={i} className="inline-block text-center text-[var(--color-ink-muted)]" style={{ width: "1ch" }}>
            –
          </span>
        ) : (
          <OdometerDigit key={i} digit={Number(ch)} />
        ),
      )}
    </span>
  );
}

export default function Countdown() {
  const value = useCountdown(event.dateISO);
  const rootRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const mm = gsap.matchMedia();
    // Gentle scroll parallax on the digit row — desktop pointers only.
    mm.add(MQ_SCRUB, () => {
      if (prefersLiteMotion()) return;
      const ctx = gsap.context(() => {
        gsap.fromTo(
          ".countdown-row",
          { yPercent: 6 },
          {
            yPercent: -6,
            ease: "none",
            scrollTrigger: { trigger: rootRef.current!, start: "top bottom", end: "bottom top", scrub: 0.8 },
          },
        );
      }, rootRef);
      return () => ctx.revert();
    });
    return () => mm.revert();
  }, []);

  return (
    <section
      id="countdown"
      ref={rootRef}
      className="relative border-y border-hairline py-section"
    >
      <GridLines className="opacity-40" />
      <div className="container relative z-10">
        <SectionTag index={sectionIndex("countdown")} label="Countdown" className="mb-12" />

        {value?.isPast ? (
          <p className="font-display font-semibold uppercase text-h1 leading-display tracking-tight">
            Show day <span className="text-[var(--color-accent-text)]">★</span>
          </p>
        ) : (
          <>
            <div
              className="countdown-row grid grid-cols-2 md:grid-cols-4 gap-y-8 gap-x-6"
              aria-live="polite"
            >
              {UNITS.map((unit) => (
                <div key={unit.key} className="flex flex-col items-start">
                  <span className="font-display font-semibold text-h1 leading-none tracking-tight text-[var(--color-ink)]">
                    <DigitPair value={value ? value[unit.key] : null} />
                  </span>
                  <span className="mono-label text-[var(--color-ink-muted)] mt-2">{unit.label}</span>
                </div>
              ))}
            </div>

            <div className="relative inline-flex items-center mt-12 md:mt-16">
              <Scrawl
                whenVisible
                className="absolute -inset-x-5 -inset-y-3 w-[calc(100%+2.5rem)] h-[calc(100%+1.5rem)] pointer-events-none"
              />
              <span className="mono-label relative text-[var(--color-ink)]">
                {event.dayLabel} {event.dateLabel} · {event.timeLabel} · {event.venue}
              </span>
            </div>
          </>
        )}
      </div>
    </section>
  );
}

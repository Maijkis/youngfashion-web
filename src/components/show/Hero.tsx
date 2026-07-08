"use client";

import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import GridLines from "@/components/ui/GridLines";
import Button from "@/components/ui/Button";
import { event, hero, ticketHref, ticketIsExternal } from "@/lib/content";
import { MQ_MOTION, MQ_SCRUB, GSAP_EXPO, prefersLiteMotion } from "@/lib/motion";

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const rootRef = useRef<HTMLElement>(null);
  const [word1, ...rest] = event.name.split(" ");
  const word2 = rest.join(" ");

  useLayoutEffect(() => {
    const mm = gsap.matchMedia();

    // Intro reveal — all devices. Type wipes up behind a clip mask, words
    // staggered.
    mm.add(MQ_MOTION, () => {
      const ctx = gsap.context(() => {
        const tl = gsap.timeline();
        tl.fromTo(
          ".hero-line",
          { clipPath: "inset(0 0 100% 0)", yPercent: 14, opacity: 0 },
          {
            clipPath: "inset(0 0 0% 0)",
            yPercent: 0,
            opacity: 1,
            duration: 0.9,
            ease: GSAP_EXPO,
            stagger: 0.08,
          },
          0.1,
        );
        // Measurement mark under the wordmark — the lines draw outward from
        // the label like a technical dimension being taken.
        tl.fromTo(
          ".hero-measure-line",
          { scaleX: 0 },
          { scaleX: 1, duration: 0.8, ease: GSAP_EXPO },
          0.55,
        );
        tl.fromTo(
          ".hero-measure-mark",
          { opacity: 0 },
          { opacity: 1, duration: 0.4, ease: "power2.out", stagger: 0.06 },
          0.6,
        );
        tl.fromTo(
          ".hero-meta > *",
          { y: 16, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6, stagger: 0.08, ease: "power3.out" },
          0.6,
        );
      }, rootRef);
      return () => ctx.revert();
    });

    // Parallax — mouse-driven desktops only. As the hero scrolls away the type
    // drifts up slightly faster than the scroll. Transform-only (no pin) so it
    // never shifts layout and stays smooth on Safari; the pin was dropped after
    // it showed up as a scroll-time CLS source.
    mm.add(MQ_SCRUB, () => {
      if (prefersLiteMotion()) return;
      const ctx = gsap.context(() => {
        gsap.to(".hero-type", {
          yPercent: -14,
          ease: "none",
          scrollTrigger: { trigger: rootRef.current!, start: "top top", end: "bottom top", scrub: 0.8 },
        });
      }, rootRef);
      return () => ctx.revert();
    });

    return () => mm.revert();
  }, []);

  return (
    <section
      id="hero"
      ref={rootRef}
      className="relative overflow-hidden bg-[var(--color-paper)]"
    >
      <GridLines />

      {/* Sized to content + section padding — no 100svh box with centred dead
          space. The masthead fills naturally and lets the countdown peek in. */}
      <div className="container relative z-10 pt-s6 md:pt-s7 pb-section">
        <p className="hero-line mono-label text-[var(--color-ink-muted)] mb-s4">
          Vilnius · Est. 2022
        </p>

        <div className="hero-type">
          <h1 className="hero-line font-display font-semibold uppercase leading-display tracking-tight text-display">
            {word1}
          </h1>
          <h1 className="hero-line font-display font-semibold uppercase leading-display tracking-tight text-display">
            {word2}
          </h1>
          {/* Blueprint measurement mark — the one place "5 Years" appears. */}
          <div className="mt-3 flex items-center gap-3" aria-hidden>
            <span className="hero-measure-mark h-2 w-px bg-[var(--color-ink)]/50" />
            <span className="hero-measure-line h-px flex-1 origin-left bg-[var(--color-ink)]/30" />
            <span className="hero-measure-mark mono-label shrink-0 text-[var(--color-ink-muted)]">
              {event.editionShort}
            </span>
            <span className="hero-measure-line h-px flex-1 origin-right bg-[var(--color-ink)]/30" />
            <span className="hero-measure-mark h-2 w-px bg-[var(--color-ink)]/50" />
          </div>
        </div>

        <div className="hero-meta mt-s6 flex flex-col md:flex-row md:items-end justify-between gap-s4">
          <div className="inline-flex flex-col gap-1.5 bg-[var(--color-accent)] text-[var(--color-ink)] px-4 py-3 w-fit">
            {hero.infoLines.map((line) => (
              <span key={line} className="mono-label">
                {line}
              </span>
            ))}
          </div>

          <Button
            variant="accent"
            href={ticketHref}
            target={ticketIsExternal ? "_blank" : undefined}
            rel={ticketIsExternal ? "noopener noreferrer" : undefined}
            dataCta="hero"
            magnetic
          >
            Get Tickets
          </Button>
        </div>

        <div className="hero-meta mt-s6 flex justify-center">
          <span className="mono-label text-[var(--color-ink-muted)]">( Scroll )</span>
        </div>
      </div>
    </section>
  );
}

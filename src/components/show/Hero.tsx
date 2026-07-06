"use client";

import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import GridLines from "@/components/ui/GridLines";
import MediaSlot from "@/components/ui/MediaSlot";
import HeroAnnotations from "@/components/show/HeroAnnotations";
import Button from "@/components/ui/Button";
import { event, hero, heroAnnotations, ticketHref, ticketIsExternal } from "@/lib/content";
import { MQ_MOTION, MQ_SCRUB, GSAP_EXPO, prefersLiteMotion } from "@/lib/motion";

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const rootRef = useRef<HTMLElement>(null);
  const [word1, ...rest] = event.name.split(" ");
  const word2 = rest.join(" ");

  useLayoutEffect(() => {
    const mm = gsap.matchMedia();

    // Intro reveal — all devices. Type wipes up behind a clip mask, words
    // staggered; the portrait settles from a slight scale.
    mm.add(MQ_MOTION, () => {
      const ctx = gsap.context(() => {
        const tl = gsap.timeline();
        tl.fromTo(
          ".hero-photo",
          { scale: 1.05, opacity: 0 },
          { scale: 1, opacity: 1, duration: 1.1, ease: GSAP_EXPO },
          0,
        );
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
        tl.fromTo(
          ".hero-meta > *",
          { y: 16, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6, stagger: 0.08, ease: "power3.out" },
          0.6,
        );
      }, rootRef);
      return () => ctx.revert();
    });

    // Parallax — mouse-driven desktops only. As the hero scrolls away the photo
    // tracks slower than the type. Transform-only (no pin) so it never shifts
    // layout and stays smooth on Safari; the pin was dropped after it showed up
    // as a scroll-time CLS source.
    mm.add(MQ_SCRUB, () => {
      if (prefersLiteMotion()) return;
      const ctx = gsap.context(() => {
        const range = { start: "top top", end: "bottom top", scrub: 0.8 };
        gsap.to(".hero-photo", {
          yPercent: -6,
          ease: "none",
          scrollTrigger: { trigger: rootRef.current!, ...range },
        });
        gsap.to(".hero-type", {
          yPercent: -14,
          ease: "none",
          scrollTrigger: { trigger: rootRef.current!, ...range },
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
      className="relative min-h-[100svh] overflow-hidden bg-[var(--color-paper)] flex flex-col pt-6 md:pt-8"
    >
      <GridLines />

      <div className="relative z-10 flex-1 flex flex-col justify-center px-5 md:px-10 lg:px-16 py-10">
        <p className="hero-line mono-label text-[var(--color-ink-muted)] mb-5 md:mb-8">
          Vilnius · Est. 2022
        </p>

        <div className="hero-type relative">
          <h1 className="hero-line relative z-0 font-display font-semibold uppercase leading-[0.82] tracking-[-0.03em] text-[clamp(4.5rem,21vw,17rem)]">
            {word1}
          </h1>

          <div className="hero-photo absolute z-10 right-0 top-[42%] w-[38vw] max-w-[150px] md:w-[56vw] md:max-w-[380px] -translate-y-1/2">
            <MediaSlot
              src={hero.portrait}
              alt={event.name}
              label="Portrait"
              sublabel={event.editionShort}
              priority
              className="shadow-2xl"
            />
            <HeroAnnotations annotations={heroAnnotations} />
          </div>

          <h1 className="hero-line relative z-20 -mt-[5vw] md:-mt-[2.5vw] font-display font-semibold uppercase leading-[0.82] tracking-[-0.03em] text-[clamp(4.5rem,21vw,17rem)]">
            {word2}
          </h1>
        </div>

        <div className="hero-meta mt-8 md:mt-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
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
      </div>

      <div className="hero-meta relative z-10 pb-8 md:pb-10 flex justify-center">
        <span className="mono-label text-[var(--color-ink-muted)]">( Scroll )</span>
      </div>
    </section>
  );
}

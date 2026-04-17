"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { designers } from "@/lib/mockData";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function DesignerGrid() {
  const lineup = designers.slice(0, 8);
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<(HTMLAnchorElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      cardsRef.current.forEach((card, i) => {
        if (!card) return;
        gsap.fromTo(
          card,
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            delay: i * 0.05,
            ease: "power3.out",
            scrollTrigger: {
              trigger: card,
              start: "left 95%",
              toggleActions: "play none none none",
              horizontal: true,
            },
          }
        );
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full bg-white pt-24 md:pt-32 pb-20 md:pb-24"
    >
      {/* Header */}
      <div className="max-w-7xl mx-auto px-5 md:px-10 lg:px-16 mb-10 md:mb-14">
        <div className="flex items-end justify-between gap-5">
          <div>
            <span className="block text-[10px] md:text-[11px] uppercase tracking-[0.32em] text-[var(--color-ink-muted)] font-medium mb-4 md:mb-6">
              The Lineup
            </span>
            <h2 className="font-light text-[var(--color-ink)] leading-[1.02] tracking-[-0.015em] text-[clamp(2rem,5.5vw,4rem)]">
              Designers
            </h2>
          </div>
          <Link
            href="/galleries"
            className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.28em] text-[var(--color-ink)] font-medium border-b border-[var(--color-ink)] pb-1 min-h-[44px] hover:gap-3 transition-all"
          >
            Index
            <span>→</span>
          </Link>
        </div>
      </div>

      {/* Horizontal scrolling lookbook */}
      <div
        className="flex gap-4 md:gap-6 overflow-x-auto scrollbar-hide snap-x overscroll-x-contain touch-pan-x pl-5 md:pl-10 lg:pl-16 pr-5 md:pr-10 lg:pr-16"
        style={{
          scrollPaddingLeft: "clamp(1.25rem, 6vw, 4rem)",
        }}
      >
        {lineup.map((d, i) => (
          <Link
            key={d.id}
            ref={(el) => { cardsRef.current[i] = el; }}
            href="/galleries"
            className="group shrink-0 snap-start w-[62vw] sm:w-[42vw] md:w-[28vw] lg:w-[22vw] max-w-[380px]"
          >
            <div className="relative aspect-[3/4] overflow-hidden bg-[var(--color-paper-deep)] mb-3">
              <Image
                src={d.image}
                alt={d.name}
                fill
                sizes="(max-width: 640px) 62vw, (max-width: 768px) 42vw, (max-width: 1024px) 28vw, 380px"
                className="object-cover transition-transform duration-[900ms] ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:scale-[1.03]"
              />
            </div>
            <div className="flex items-baseline justify-between gap-3">
              <h3 className="font-light text-[var(--color-ink)] text-sm md:text-base tracking-[-0.005em] truncate">
                {d.name}
              </h3>
              <span className="text-[10px] uppercase tracking-[0.28em] text-[var(--color-ink-muted)] font-medium tabular-nums shrink-0">
                {d.year}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

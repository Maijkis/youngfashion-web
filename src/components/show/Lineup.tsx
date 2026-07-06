"use client";

import { useLayoutEffect, useRef, useState } from "react";
import type { CSSProperties } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SectionTag from "@/components/ui/SectionTag";
import Button from "@/components/ui/Button";
import LineupCard from "@/components/show/LineupCard";
import LineupModal from "@/components/show/LineupModal";
import { designers, sectionIndex, ticketHref, ticketIsExternal } from "@/lib/content";
import { MQ_SCRUB, prefersLiteMotion } from "@/lib/motion";

gsap.registerPlugin(ScrollTrigger);

/** Rotation + vertical drift per grid slot, keyed by position — not by designer, so reordering the lineup never breaks the layout. */
const SCATTER: { r: number; y: number }[] = [
  { r: -3, y: -8 },
  { r: 2, y: 18 },
  { r: -2, y: 4 },
  { r: 3, y: 22 },
  { r: -4, y: -10 },
  { r: 2, y: 10 },
  { r: -2, y: 16 },
  { r: 4, y: -6 },
  { r: -3, y: 12 },
];

export default function Lineup() {
  const [flippedId, setFlippedId] = useState<string | null>(null);
  const [selected, setSelected] = useState<number | null>(null);
  const [deckIndex, setDeckIndex] = useState(0);
  const gridRef = useRef<HTMLDivElement>(null);
  const deckRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef(0);

  // Desktop only: cards start scattered (server-rendered via inline transform)
  // and straighten to the grid as they scroll in.
  useLayoutEffect(() => {
    const mm = gsap.matchMedia();
    mm.add(MQ_SCRUB, () => {
      if (prefersLiteMotion() || !gridRef.current) return;
      const ctx = gsap.context(() => {
        gridRef.current!.querySelectorAll<HTMLElement>(".card-scatter").forEach((el) => {
          const r = parseFloat(el.dataset.r || "0");
          const y = parseFloat(el.dataset.y || "0");
          gsap.fromTo(
            el,
            { rotation: r, y },
            {
              rotation: 0,
              y: 0,
              ease: "none",
              scrollTrigger: { trigger: el, start: "top 88%", end: "top 45%", scrub: 0.8 },
            },
          );
        });
      }, gridRef);
      return () => ctx.revert();
    });
    return () => mm.revert();
  }, []);

  const onDeckScroll = () => {
    if (rafRef.current) return;
    rafRef.current = requestAnimationFrame(() => {
      rafRef.current = 0;
      const deck = deckRef.current;
      const first = deck?.firstElementChild as HTMLElement | null;
      if (!deck || !first) return;
      const stride = first.clientWidth + 16; // card width + gap-4
      const idx = Math.round(deck.scrollLeft / stride);
      setDeckIndex(Math.min(Math.max(idx, 0), designers.length - 1));
    });
  };

  const cardProps = (i: number) => ({
    designer: designers[i],
    index: i,
    flipped: flippedId === designers[i].id,
    modalOpen: selected !== null,
    onOpen: () => setFlippedId(designers[i].id),
    onClose: () => setFlippedId(null),
    onViewLook: () => setSelected(i),
  });

  return (
    <section id="lineup" className="relative px-5 md:px-10 lg:px-16 py-20 md:py-32">
      <SectionTag index={sectionIndex("lineup")} label="Lineup" className="mb-4" />
      <h2 className="font-display font-semibold uppercase leading-[0.9] tracking-[-0.02em] text-[clamp(2.5rem,9vw,6rem)] mb-14 md:mb-20">
        Nine Designers
      </h2>

      {/* Desktop scatter grid */}
      <div ref={gridRef} className="hidden md:grid grid-cols-12 gap-x-6 gap-y-20">
        {designers.map((designer, i) => {
          const { r, y } = SCATTER[i % SCATTER.length];
          return (
            <div
              key={designer.id}
              className="card-scatter col-span-4"
              data-r={r}
              data-y={y}
              style={{ transform: `rotate(${r}deg) translateY(${y}px)` } as CSSProperties}
            >
              <LineupCard {...cardProps(i)} />
            </div>
          );
        })}
      </div>

      {/* Mobile swipe deck */}
      <div className="md:hidden -mx-5">
        <div
          ref={deckRef}
          onScroll={onDeckScroll}
          className="flex gap-4 overflow-x-auto snap-x snap-mandatory scrollbar-hide px-[9vw] pb-2"
          data-lenis-prevent
        >
          {designers.map((designer, i) => (
            <div key={designer.id} className="w-[82vw] shrink-0 snap-center">
              <LineupCard {...cardProps(i)} />
            </div>
          ))}
        </div>
        <p className="mono-label text-[var(--color-ink-muted)] text-center mt-5" aria-live="polite">
          {String(deckIndex + 1).padStart(2, "0")} / {String(designers.length).padStart(2, "0")}
        </p>
      </div>

      {/* Section footer CTAs */}
      <div className="mt-16 md:mt-24 flex flex-wrap items-center gap-x-8 gap-y-5">
        <Button variant="outline" href="#schedule">
          See the schedule ↓
        </Button>
        <Button
          variant="accent"
          href={ticketHref}
          target={ticketIsExternal ? "_blank" : undefined}
          rel={ticketIsExternal ? "noopener noreferrer" : undefined}
          dataCta="lineup"
          magnetic
        >
          Get Tickets
        </Button>
      </div>

      <LineupModal
        designers={designers}
        index={selected}
        onClose={() => setSelected(null)}
        onNavigate={setSelected}
      />
    </section>
  );
}

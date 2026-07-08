"use client";

import { useLayoutEffect, useRef, useState } from "react";
import MediaSlot from "@/components/ui/MediaSlot";
import AnimatedSection from "@/components/ui/AnimatedSection";
import type { CommunicationItem } from "@/lib/content";

/**
 * One touchpoint as a tap-flip polaroid: front = the photo + a caption strip;
 * back = the write-up (title, description, link). The whole card is the flip
 * target — tap/Enter/Space anywhere toggles, both directions (aria-pressed
 * announces state). Uses the shared .card-flip 3D pattern (backface hidden,
 * back face pre-rotated so its content reads unmirrored). The one real control
 * inside — the "View post" link — stops propagation so it never flips the card.
 */
function CommPolaroid({
  item,
  index,
  partnerName,
}: {
  item: CommunicationItem;
  index: number;
  partnerName: string;
}) {
  const [flipped, setFlipped] = useState(false);
  const n = String(index + 1).padStart(2, "0");

  const toggle = () => setFlipped((f) => !f);
  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      toggle();
    }
  };

  return (
    <div className="card-persp">
      {/* The flip layer is itself the button — tap anywhere flips either way. */}
      <div
        role="button"
        tabIndex={0}
        aria-pressed={flipped}
        aria-label={`${item.title} — tap to flip`}
        onClick={toggle}
        onKeyDown={onKeyDown}
        className={`card-flip cursor-pointer focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-accent)] ${
          flipped ? "is-flipped" : ""
        }`}
      >
        {/* FRONT — the polaroid */}
        <div
          inert={flipped}
          className="card-face border border-hairline bg-[var(--color-paper)] p-2 text-left shadow-sm"
          aria-hidden
        >
          <MediaSlot
            src={item.image}
            alt={`${partnerName} — ${item.title}`}
            label={item.kind}
            sublabel={item.date}
            aspect="aspect-[4/3]"
            sizes="(max-width: 768px) 100vw, 40vw"
          />
          <div className="mt-2 flex items-center justify-between gap-2 px-0.5 pb-0.5">
            <span className="section-num shrink-0">({n})</span>
            <span className="mono-label truncate text-[var(--color-ink-muted)]">
              {item.title}
            </span>
            <span className="mono-label shrink-0 text-[var(--color-accent-text)]">Flip ★</span>
          </div>
        </div>

        {/* BACK — the write-up */}
        <div
          inert={!flipped}
          className="card-face card-back flex flex-col overflow-hidden border border-hairline bg-[var(--color-paper)] p-4 shadow-sm"
        >
          <span className="mono-label text-[var(--color-ink-muted)]">
            {item.date} · {item.kind}
          </span>
          <h3 className="mt-2 text-body font-light leading-tight text-[var(--color-ink)]">
            {item.title}
          </h3>
          <p className="mt-1.5 text-sm font-light leading-body text-[var(--color-ink)]/65">
            {item.description}
          </p>
          <div className="mt-auto flex items-center justify-between gap-3 pt-3">
            <span className="mono-label text-[var(--color-ink-muted)]" aria-hidden>
              ← Tap to close
            </span>
            {item.link && (
              <a
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                onKeyDown={(e) => e.stopPropagation()}
                className="mono-label inline-flex min-h-[44px] items-center gap-1 text-[var(--color-accent-text)]"
              >
                <span className="link-underline">View post</span>
                <span aria-hidden>↗</span>
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// CommunicationMap — the partner "roadmap": comm touchpoints pinned to a
// blueprint grid, scattered like an evidence board and threaded together by a
// dashed connector drawn through the accent dots. The scatter is a fixed
// per-index recipe (not random) so the mess is stable across renders; on
// mobile everything stacks full-width and the thread becomes a spine.
//
// The connector path is measured from the real dot positions (and re-measured
// on resize), so nodes can move freely without the thread detaching. Dots sit
// OUTSIDE the AnimatedSection wrapper — GSAP animates its transform, which
// would otherwise skew the measurements mid-reveal.
// ============================================================================

const COLS = [
  "md:col-start-1 md:col-span-5",
  "md:col-start-7 md:col-span-5",
  "md:col-start-3 md:col-span-5",
  "md:col-start-8 md:col-span-5",
  "md:col-start-2 md:col-span-5",
  "md:col-start-6 md:col-span-5",
];
const NUDGES = ["", "md:mt-16", "md:-mt-10", "md:mt-12", "md:-mt-6", "md:mt-14"];
const TILTS = [
  "md:-rotate-1",
  "md:rotate-[0.75deg]",
  "md:-rotate-[0.5deg]",
  "md:rotate-1",
  "md:-rotate-[0.75deg]",
  "md:rotate-[0.5deg]",
];

interface CommunicationMapProps {
  items: CommunicationItem[];
  partnerName: string;
}

export default function CommunicationMap({ items, partnerName }: CommunicationMapProps) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [path, setPath] = useState("");

  useLayoutEffect(() => {
    const el = wrapRef.current;
    if (!el) return;

    const compute = () => {
      const rect = el.getBoundingClientRect();
      const dots = Array.from(el.querySelectorAll<HTMLElement>("[data-comm-dot]"));
      if (dots.length < 2) {
        setPath("");
        return;
      }
      const pts = dots.map((dot) => {
        const r = dot.getBoundingClientRect();
        return { x: r.left - rect.left + r.width / 2, y: r.top - rect.top + r.height / 2 };
      });
      // Quadratic meander: each leg bows out perpendicular to its direction,
      // alternating sides — reads as a hand-drawn route, not a straight wire.
      let d = `M ${pts[0].x.toFixed(1)} ${pts[0].y.toFixed(1)}`;
      for (let i = 1; i < pts.length; i++) {
        const a = pts[i - 1];
        const b = pts[i];
        const dx = b.x - a.x;
        const dy = b.y - a.y;
        const len = Math.hypot(dx, dy) || 1;
        const amp = Math.min(56, len * 0.22) * (i % 2 ? 1 : -1);
        const cx = (a.x + b.x) / 2 - (dy / len) * amp;
        const cy = (a.y + b.y) / 2 + (dx / len) * amp;
        d += ` Q ${cx.toFixed(1)} ${cy.toFixed(1)} ${b.x.toFixed(1)} ${b.y.toFixed(1)}`;
      }
      setPath(d);
    };

    compute();
    // Re-measure once fonts/images settle, and on any container resize.
    const settle = window.setTimeout(compute, 500);
    const ro = new ResizeObserver(compute);
    ro.observe(el);
    return () => {
      window.clearTimeout(settle);
      ro.disconnect();
    };
  }, [items.length]);

  return (
    <div
      ref={wrapRef}
      className="blueprint-grid relative overflow-hidden border border-hairline px-6 py-10 md:px-14 md:py-16"
    >
      {path && (
        <svg aria-hidden className="pointer-events-none absolute inset-0 h-full w-full">
          <path
            d={path}
            fill="none"
            stroke="var(--color-ink)"
            strokeOpacity="0.3"
            strokeWidth="1.5"
            strokeDasharray="5 6"
          />
        </svg>
      )}

      <div className="relative grid grid-cols-1 gap-y-14 md:grid-cols-12 md:gap-y-24">
        {items.map((item, i) => (
          <div key={`${item.date}-${item.title}`} className={`relative ${COLS[i % 6]} ${NUDGES[i % 6]}`}>
            <span
              data-comm-dot
              className="absolute -left-3 top-10 z-10 h-3 w-3 rounded-full bg-[var(--color-accent)] ring-4 ring-[var(--color-paper)] md:-left-4"
            />
            <AnimatedSection effect="rise" delay={(i % 3) * 0.08}>
              <div className={TILTS[i % 6]}>
                <CommPolaroid item={item} index={i} partnerName={partnerName} />
              </div>
            </AnimatedSection>
          </div>
        ))}
      </div>
    </div>
  );
}

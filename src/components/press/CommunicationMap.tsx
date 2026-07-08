"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import MediaSlot from "@/components/ui/MediaSlot";
import AnimatedSection from "@/components/ui/AnimatedSection";
import { EASE_EXPO_T } from "@/lib/motion";
import type { CommunicationItem } from "@/lib/content";

/**
 * Grid thumbnail — the polaroid front. Tapping opens the zoom-in popup below.
 */
function PolaroidButton({
  item,
  index,
  partnerName,
  onOpen,
}: {
  item: CommunicationItem;
  index: number;
  partnerName: string;
  onOpen: () => void;
}) {
  const n = String(index + 1).padStart(2, "0");
  return (
    <button
      type="button"
      onClick={onOpen}
      aria-label={`${item.title} — open`}
      className="group block w-full cursor-pointer border border-hairline bg-[var(--color-paper)] p-2 text-left shadow-sm transition-transform duration-[var(--dur-micro)] hover:-translate-y-0.5 active:scale-[0.98]"
    >
      <div aria-hidden>
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
          <span className="mono-label truncate text-[var(--color-ink-muted)]">{item.title}</span>
          <span className="mono-label shrink-0 text-[var(--color-accent-text)]">View ★</span>
        </div>
      </div>
    </button>
  );
}

/**
 * Zoom-in popup: the polaroid enlarges to centre-screen over a dimmed backdrop;
 * tap the card to flip between the photo and the write-up (works on desktop and
 * touch), tap again to flip back. Backdrop / close button / Escape dismiss it.
 * Uses the shared .card-flip 3D pattern (back face pre-rotated, backface hidden
 * so it reads unmirrored). The "View post" link stops propagation so it never
 * flips the card.
 */
function CommModal({
  item,
  index,
  partnerName,
  onClose,
}: {
  item: CommunicationItem;
  index: number;
  partnerName: string;
  onClose: () => void;
}) {
  const [flipped, setFlipped] = useState(false);
  const closeRef = useRef<HTMLButtonElement>(null);
  const n = String(index + 1).padStart(2, "0");
  const toggle = () => setFlipped((f) => !f);

  useEffect(() => {
    const opener = document.activeElement as HTMLElement | null;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const lenis = (window as Window & { __lenis?: { stop: () => void; start: () => void } }).__lenis;
    lenis?.stop();
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prevOverflow;
      lenis?.start();
      window.removeEventListener("keydown", onKey);
      opener?.focus?.();
    };
  }, [onClose]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      onClick={onClose}
      data-lenis-prevent
      className="fixed inset-0 z-[80] overflow-y-auto bg-[var(--color-ink)]/70 backdrop-blur-sm"
    >
      <div className="flex min-h-full items-center justify-center p-5 md:p-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 12 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 8 }}
          transition={{ duration: 0.35, ease: EASE_EXPO_T }}
          onClick={(e) => e.stopPropagation()}
          className="card-persp relative w-full max-w-md"
        >
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="absolute -right-2 -top-2 z-10 flex h-11 w-11 items-center justify-center rounded-full border border-hairline bg-[var(--color-paper)] text-[var(--color-ink)] shadow-md transition-colors hover:text-[var(--color-accent-text)]"
          >
            <X size={18} />
          </button>

          <div
            role="button"
            tabIndex={0}
            aria-pressed={flipped}
            aria-label={`${item.title} — tap to flip`}
            onClick={toggle}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                toggle();
              }
            }}
            className={`card-flip cursor-pointer focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--color-accent)] ${
              flipped ? "is-flipped" : ""
            }`}
          >
            {/* FRONT — the enlarged polaroid */}
            <div
              inert={flipped}
              aria-hidden
              className="card-face border border-hairline bg-[var(--color-paper)] p-3 shadow-2xl"
            >
              <MediaSlot
                src={item.image}
                alt={`${partnerName} — ${item.title}`}
                label={item.kind}
                sublabel={item.date}
                aspect="aspect-[4/3]"
                sizes="(max-width: 768px) 90vw, 28rem"
              />
              <div className="mt-3 flex items-center justify-between gap-2 px-0.5">
                <span className="section-num shrink-0">({n})</span>
                <span className="mono-label truncate text-[var(--color-ink-muted)]">{item.title}</span>
                <span className="mono-label shrink-0 text-[var(--color-accent-text)]">Flip ★</span>
              </div>
            </div>

            {/* BACK — the write-up */}
            <div
              inert={!flipped}
              className="card-face card-back flex flex-col overflow-y-auto border border-hairline bg-[var(--color-paper)] p-6 shadow-2xl"
            >
              <span className="mono-label text-[var(--color-ink-muted)]">
                {item.date} · {item.kind}
              </span>
              <h3 className="mt-3 text-body font-light leading-tight text-[var(--color-ink)]">
                {item.title}
              </h3>
              <p className="mt-2 text-sm font-light leading-body text-[var(--color-ink)]/70">
                {item.description}
              </p>
              <div className="mt-auto flex items-center justify-between gap-3 pt-5">
                <span className="mono-label text-[var(--color-ink-muted)]" aria-hidden>
                  ↺ Tap to flip back
                </span>
                {item.link && (
                  <a
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    onKeyDown={(e) => e.stopPropagation()}
                    className="hot-text mono-label inline-flex min-h-[44px] items-center gap-1 text-[var(--color-accent-text)]"
                  >
                    <span className="link-underline">View post</span>
                    <span aria-hidden>↗</span>
                  </a>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
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
  const [open, setOpen] = useState<number | null>(null);

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
                <PolaroidButton
                  item={item}
                  index={i}
                  partnerName={partnerName}
                  onOpen={() => setOpen(i)}
                />
              </div>
            </AnimatedSection>
          </div>
        ))}
      </div>

      <AnimatePresence>
        {open !== null && (
          <CommModal
            item={items[open]}
            index={open}
            partnerName={partnerName}
            onClose={() => setOpen(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

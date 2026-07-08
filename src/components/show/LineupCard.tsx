"use client";

import { useEffect, useId, useRef, useState } from "react";
import { gsap } from "gsap";
import MediaSlot from "@/components/ui/MediaSlot";
import { event, type ShowDesigner } from "@/lib/content";
import { MQ_SCRUB, motionOK, prefersLiteMotion } from "@/lib/motion";

/**
 * Blueprint corner brackets that snap onto the portrait during the
 * tap-to-unpack beat — instant appear (staggered 0–120ms), scale-settle,
 * retract when the card closes. Pure CSS transitions on the motion tokens.
 */
function UnpackBrackets({ active }: { active: boolean }) {
  const corners = [
    "top-1.5 left-1.5 border-t border-l",
    "top-1.5 right-1.5 border-t border-r",
    "bottom-1.5 right-1.5 border-b border-r",
    "bottom-1.5 left-1.5 border-b border-l",
  ];
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0">
      {corners.map((pos, i) => (
        <span
          key={pos}
          style={{ transitionDelay: active ? `${i * 40}ms` : "0ms" }}
          className={`absolute h-3.5 w-3.5 border-[var(--color-accent)] transition-[opacity,transform] duration-[var(--dur-micro)] ease-[var(--ease-out)] ${pos} ${
            active ? "scale-100 opacity-100" : "scale-150 opacity-0"
          }`}
        />
      ))}
    </div>
  );
}

interface LineupCardProps {
  designer: ShowDesigner;
  index: number;
  flipped: boolean;
  /** True while the full-screen look modal is open — suppresses the card's own Escape handler. */
  modalOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  onViewLook: () => void;
}

/**
 * A laminated credential card that flips in 3D. The front is the ID (portrait +
 * mono fields); the back reveals a short bio, an Instagram link, and a "View
 * look" button that opens the full-screen colour modal. Layering keeps one
 * transform owner per element so the desktop scatter-scrub (parent), tilt-to-
 * cursor (this component), and flip (CSS class) never fight — see the .card-*
 * classes in globals.css.
 */
export default function LineupCard({
  designer,
  index,
  flipped,
  modalOpen,
  onOpen,
  onClose,
  onViewLook,
}: LineupCardProps) {
  const tiltRef = useRef<HTMLDivElement>(null);
  const frontRef = useRef<HTMLDivElement>(null);
  const backRef = useRef<HTMLDivElement>(null);
  const backId = useId();
  const look = `Look ${String(index + 1).padStart(2, "0")}`;
  const showing = designer.showingTime ?? event.timeLabel;

  // Tilt toward the cursor — desktop pointers only.
  useEffect(() => {
    const mm = gsap.matchMedia();
    mm.add(MQ_SCRUB, () => {
      const tilt = tiltRef.current;
      if (!tilt || prefersLiteMotion()) return;
      const rx = gsap.quickTo(tilt, "rotationX", { duration: 0.4, ease: "power3.out" });
      const ry = gsap.quickTo(tilt, "rotationY", { duration: 0.4, ease: "power3.out" });
      const onMove = (e: MouseEvent) => {
        const rect = tilt.getBoundingClientRect();
        const px = (e.clientX - rect.left) / rect.width - 0.5;
        const py = (e.clientY - rect.top) / rect.height - 0.5;
        ry(px * 12);
        rx(-py * 12);
      };
      const onLeave = () => {
        rx(0);
        ry(0);
      };
      tilt.addEventListener("mousemove", onMove);
      tilt.addEventListener("mouseleave", onLeave);
      return () => {
        tilt.removeEventListener("mousemove", onMove);
        tilt.removeEventListener("mouseleave", onLeave);
      };
    });
    return () => mm.revert();
  }, []);

  // Focus management: move focus into the back on open; return to the front on
  // close — but only if focus is still trapped in this card's back (so opening a
  // second card doesn't steal focus from it).
  useEffect(() => {
    if (flipped) {
      backRef.current?.focus();
    } else if (backRef.current?.contains(document.activeElement)) {
      frontRef.current?.focus();
    }
  }, [flipped]);

  // Escape closes the flipped card — unless the look modal is open (it owns Escape then).
  useEffect(() => {
    if (!flipped) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && !modalOpen) onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [flipped, modalOpen, onClose]);

  // Tap-to-unpack: brackets snap onto the portrait instantly (feedback <100ms),
  // then the flip runs one beat later — one tap, one choreographed sequence.
  // Under reduced motion the flip is immediate.
  const [unpacking, setUnpacking] = useState(false);
  const unpackTimer = useRef(0);
  const unpack = () => {
    if (flipped) return;
    setUnpacking(true);
    window.clearTimeout(unpackTimer.current);
    unpackTimer.current = window.setTimeout(onOpen, motionOK() ? 260 : 0);
  };
  useEffect(() => {
    if (!flipped) setUnpacking(false);
  }, [flipped]);
  useEffect(() => () => window.clearTimeout(unpackTimer.current), []);

  const handleFrontKey = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      unpack();
    }
  };

  return (
    <div className="card-persp">
      <div ref={tiltRef} className="card-tilt">
        <div className={`card-flip ${flipped ? "is-flipped" : ""}`}>
          {/* FRONT — the ID card */}
          <div
            ref={frontRef}
            role="button"
            tabIndex={0}
            inert={flipped}
            onClick={unpack}
            onKeyDown={handleFrontKey}
            aria-expanded={flipped}
            aria-controls={backId}
            aria-label={`${designer.name}, ${look}`}
            data-cursor="FLIP"
            className="card-face card-front block w-full text-left cursor-pointer border border-hairline bg-[var(--color-paper)] p-3 shadow-lg transition-[box-shadow,transform] duration-200 hover:shadow-2xl active:scale-[0.98]"
          >
            {/* Content is decorative — the button's name comes from aria-label,
                so the visible fields don't create a label/name mismatch. */}
            <div className="relative" aria-hidden>
              <MediaSlot
                src={designer.portrait}
                alt={designer.name}
                label="Portrait"
                sublabel={look}
                aspect="aspect-[4/5]"
                priority={index < 2}
                reveal
                revealHover
              />
              <span className="absolute top-2 left-2 bg-[var(--color-paper)] text-[var(--color-accent-text)] mono-label px-1.5 py-0.5">
                {look}
              </span>
              <UnpackBrackets active={unpacking} />
            </div>

            <div className="mt-3 space-y-1.5" aria-hidden>
              <p className="text-body leading-tight">{designer.name}</p>
              <div className="flex items-center justify-between">
                <span className="mono-label text-[var(--color-ink-muted)]">Showing</span>
                <span className="mono-label tabular-nums">{showing}</span>
              </div>
              {designer.discipline && (
                <div className="flex items-center justify-between">
                  <span className="mono-label text-[var(--color-ink-muted)]">Discipline</span>
                  <span className="mono-label">{designer.discipline}</span>
                </div>
              )}
              <div
                className="flex items-center justify-between border-t border-hairline pt-1.5"
                aria-hidden
              >
                <span className="mono-label text-[var(--color-ink-muted)]">
                  {String(index + 1).padStart(2, "0")} / 09
                </span>
                <span className="mono-label text-[var(--color-accent-text)]">Flip ★</span>
              </div>
            </div>
          </div>

          {/* BACK — bio + actions */}
          <div
            ref={backRef}
            id={backId}
            tabIndex={-1}
            inert={!flipped}
            aria-hidden={!flipped}
            aria-label={`${designer.name} details`}
            className="card-face card-back panel flex flex-col border border-[var(--color-hairline)] p-5 focus:outline-none"
          >
            <span className="mono-label text-[var(--color-ink-muted)]">Designer / {look}</span>
            <h3 className="font-display font-semibold uppercase text-h2 leading-display mt-2 mb-3">
              {designer.name}
            </h3>
            {/* Compact body — the card back is height-locked to the front face. */}
            <p className="text-sm font-light leading-body text-[var(--color-ink)]/80">
              {designer.bio ?? "Bio coming soon — collection details land closer to the show."}
            </p>

            <div className="mt-auto pt-5 flex flex-col gap-2.5">
              {designer.instagramUrl && (
                <a
                  href={designer.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-underline mono-label w-fit"
                >
                  Instagram →
                </a>
              )}
              <button
                onClick={onViewLook}
                data-cursor="VIEW"
                className="mono-label inline-flex items-center gap-2 min-h-[44px] w-fit border-b border-[var(--color-ink)] pb-0.5 hover:gap-3 transition-all"
              >
                View look →
              </button>
              <button
                onClick={onClose}
                className="mono-label text-[var(--color-ink-muted)] hover:text-[var(--color-ink)] transition-colors w-fit min-h-[44px] text-left"
              >
                ← Back
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

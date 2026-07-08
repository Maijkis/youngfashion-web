"use client";

import { useEffect, useLayoutEffect, useRef, useState, type ReactNode } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import GridLines from "@/components/ui/GridLines";
import DotField from "@/components/ui/DotField";
import { MQ_SCRUB, motionOK, prefersLiteMotion } from "@/lib/motion";

gsap.registerPlugin(ScrollTrigger);

/**
 * A dark (.panel) spread introduced by a "page turn" — a paper-coloured cover
 * clips away upward as the section scrolls in. Desktop pointers only; on touch
 * the same intent runs as a cheap paper cross-fade (a veil that fades out as
 * the section enters). Reduced-motion / low-power devices get the honest
 * static dark section — the veil is never applied unless motion is on.
 */
export default function WipePanel({
  id,
  className = "",
  texture = false,
  dotField = false,
  children,
}: {
  id?: string;
  className?: string;
  /** Faint column grid behind the content — .panel remaps the hairline to
   *  light, and 0.16 alpha × 0.35 keeps it under the 6% texture budget. */
  texture?: boolean;
  /** Drifting point-cloud layer (dark "system" sections only). */
  dotField?: boolean;
  children: ReactNode;
}) {
  const ref = useRef<HTMLElement>(null);

  // Touch equivalent of the desktop wipe: paper veil fades out on entry.
  const [veiled, setVeiled] = useState(false);

  useLayoutEffect(() => {
    const mm = gsap.matchMedia();
    mm.add(MQ_SCRUB, () => {
      if (prefersLiteMotion()) return;
      const ctx = gsap.context(() => {
        gsap.fromTo(
          ".wipe-cover",
          { clipPath: "inset(0 0 0% 0)" },
          {
            clipPath: "inset(0 0 100% 0)",
            ease: "none",
            scrollTrigger: { trigger: ref.current, start: "top 85%", end: "top 35%", scrub: 0.8 },
          },
        );
      }, ref);
      return () => ctx.revert();
    });
    return () => mm.revert();
  }, []);

  useEffect(() => {
    // Desktop has the scrubbed wipe; the veil is the touch counterpart.
    if (window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    if (!motionOK()) return;
    const el = ref.current;
    if (!el) return;
    // Only veil sections still below the viewport — never cover visible content.
    if (el.getBoundingClientRect().top < window.innerHeight) return;
    setVeiled(true);
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setVeiled(false);
          io.disconnect();
        }
      },
      { rootMargin: "0px 0px -15% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section id={id} ref={ref} className={`panel relative ${className}`}>
      {/* Paper cover matches the page (not the remapped panel var). Desktop-only.
          Default state is fully PEELED (clipped away) so content is visible
          whenever the scrub can't run — reduced-motion, data-saver, pre-hydration.
          The scrub sets it to "covering" then peels it as the section enters. */}
      <div
        className="wipe-cover absolute inset-0 z-20 pointer-events-none hidden md:block bg-[#F4F1EA]"
        style={{ clipPath: "inset(0 0 100% 0)" }}
      />
      {/* Touch veil — same intent, cross-fade instead of a scrubbed wipe. */}
      <div
        aria-hidden
        className={`pointer-events-none absolute inset-0 z-20 bg-[#F4F1EA] transition-opacity duration-700 ease-[var(--ease-out)] md:hidden ${
          veiled ? "opacity-100" : "opacity-0"
        }`}
      />
      {texture && <GridLines className="opacity-[0.35]" />}
      {dotField && <DotField />}
      <div className="relative z-10">{children}</div>
    </section>
  );
}

"use client";

import { useLayoutEffect, useRef, type ReactNode } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import GridLines from "@/components/ui/GridLines";
import { MQ_SCRUB, prefersLiteMotion } from "@/lib/motion";

gsap.registerPlugin(ScrollTrigger);

/**
 * A dark (.panel) spread introduced by a "page turn" — a paper-coloured cover
 * clips away upward as the section scrolls in, revealing the dark content
 * beneath. Desktop pointers only; on touch / reduced-motion the cover is hidden
 * and the section is simply dark (the honest transform-only degrade — animating
 * background-color is disallowed by the motion rules).
 */
export default function WipePanel({
  id,
  className = "",
  texture = false,
  children,
}: {
  id?: string;
  className?: string;
  /** Faint column grid behind the content — .panel remaps the hairline to
   *  light, and 0.16 alpha × 0.35 keeps it under the 6% texture budget. */
  texture?: boolean;
  children: ReactNode;
}) {
  const ref = useRef<HTMLElement>(null);

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
      {texture && <GridLines className="opacity-[0.35]" />}
      <div className="relative z-10">{children}</div>
    </section>
  );
}

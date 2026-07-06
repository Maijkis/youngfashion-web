"use client";

import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { MQ_MOTION } from "@/lib/motion";
import type { HeroAnnotation } from "@/lib/content";

/**
 * Editorial callout labels over the hero cover — accent-outlined pills with a
 * connector line drawing out to a point on the image. Coords are percentages of
 * the photo box (from content.ts), so the callouts survive an image swap. The
 * `pathLength={1}` trick lets the line draw via strokeDashoffset without needing
 * getTotalLength. Reveals sequence after the type; reduced-motion shows them flat.
 */
export default function HeroAnnotations({ annotations }: { annotations: HeroAnnotation[] }) {
  const ref = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const mm = gsap.matchMedia();
    mm.add(MQ_MOTION, () => {
      const ctx = gsap.context(() => {
        gsap.set(".ha-line", { strokeDashoffset: 1 });
        gsap.set(".ha-dot", { scale: 0, transformOrigin: "center" });
        gsap.set(".ha-label", { opacity: 0, y: 6 });
        const tl = gsap.timeline({ delay: 1.1, defaults: { ease: "expo.out" } });
        tl.to(".ha-dot", { scale: 1, duration: 0.3, stagger: 0.15 });
        tl.to(".ha-line", { strokeDashoffset: 0, duration: 0.55, stagger: 0.15 }, "-=0.15");
        tl.to(".ha-label", { opacity: 1, y: 0, duration: 0.45, stagger: 0.15 }, "-=0.4");
      }, ref);
      return () => ctx.revert();
    });
    return () => mm.revert();
  }, []);

  return (
    <div ref={ref} className="absolute inset-0 pointer-events-none z-20">
      <svg
        className="absolute inset-0 w-full h-full overflow-visible"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        aria-hidden
      >
        {annotations.map((a, i) => (
          <g key={i} className={a.hideOnMobile ? "hidden md:inline" : ""}>
            <path
              className="ha-line"
              d={`M ${a.tx} ${a.ty} L ${a.x} ${a.y}`}
              stroke="var(--color-accent)"
              strokeWidth={1}
              vectorEffect="non-scaling-stroke"
              pathLength={1}
              strokeDasharray={1}
              fill="none"
            />
            <circle
              className="ha-dot"
              cx={a.tx}
              cy={a.ty}
              r={1.4}
              fill="var(--color-accent)"
            />
          </g>
        ))}
      </svg>

      {annotations.map((a, i) => (
        <div
          key={i}
          className={`absolute ${a.hideOnMobile ? "hidden md:block" : ""}`}
          style={{
            left: `${a.x}%`,
            top: `${a.y}%`,
            transform: `translate(${a.x < 50 ? "-100%" : "0"}, -50%)`,
          }}
        >
          <span className="ha-label inline-block whitespace-nowrap border border-[var(--color-accent)] bg-[var(--color-paper)] text-[var(--color-accent-text)] mono-label px-2 py-1">
            {a.label}
          </span>
        </div>
      ))}
    </div>
  );
}

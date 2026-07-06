"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import useReducedMotion from "@/hooks/useReducedMotion";

/**
 * A single hand-drawn marker scrawl — the site's one nod to the poster's
 * outlined lettering. By default it draws once on mount; pass `whenVisible` to
 * defer the draw until it scrolls into view (used when it circles content
 * further down the page).
 */
export default function Scrawl({
  className = "",
  whenVisible = false,
}: {
  className?: string;
  whenVisible?: boolean;
}) {
  const pathRef = useRef<SVGPathElement>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const path = pathRef.current;
    if (!path) return;
    const length = path.getTotalLength();

    if (reducedMotion) {
      path.style.strokeDasharray = "none";
      path.style.strokeDashoffset = "0";
      return;
    }

    const draw = (delay: number) =>
      gsap.fromTo(
        path,
        { strokeDasharray: length, strokeDashoffset: length },
        { strokeDashoffset: 0, duration: 1.1, ease: "power2.inOut", delay },
      );

    if (!whenVisible) {
      const tween = draw(0.6);
      return () => {
        tween.kill();
      };
    }

    // Hold undrawn, then draw once the scrawl scrolls into view.
    gsap.set(path, { strokeDasharray: length, strokeDashoffset: length });
    const svg = path.ownerSVGElement;
    if (!svg) return;
    const io = new IntersectionObserver(
      (entries, obs) => {
        if (entries[0].isIntersecting) {
          draw(0);
          obs.disconnect();
        }
      },
      { threshold: 0.35 },
    );
    io.observe(svg);
    return () => io.disconnect();
  }, [reducedMotion, whenVisible]);

  return (
    <svg
      viewBox="0 0 220 90"
      fill="none"
      aria-hidden
      className={className}
      preserveAspectRatio="none"
    >
      <path
        ref={pathRef}
        d="M14 45 C10 20, 40 8, 80 7 C140 5, 205 12, 208 40 C211 68, 150 84, 90 83 C40 82, 8 70, 14 45 Z"
        stroke="var(--color-accent)"
        strokeWidth="3"
        vectorEffect="non-scaling-stroke"
        strokeLinecap="round"
      />
    </svg>
  );
}

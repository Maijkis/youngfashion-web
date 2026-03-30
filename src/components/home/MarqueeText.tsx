"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

interface MarqueeTextProps {
  text?: string;
  speed?: number;
  className?: string;
}

export default function MarqueeText({
  text = "YOUNG FASHION",
  speed = 40,
  className = "",
}: MarqueeTextProps) {
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const firstItem = track.children[0] as HTMLElement;
    if (!firstItem) return;
    const itemWidth = firstItem.offsetWidth;

    gsap.to(track, {
      x: -itemWidth,
      duration: speed,
      ease: "none",
      repeat: -1,
    });
  }, [speed]);

  const items = Array(6).fill(null);

  return (
    <div className={`overflow-hidden py-6 md:py-8 border-y border-white/5 ${className}`}>
      <div ref={trackRef} className="flex whitespace-nowrap w-fit">
        {items.map((_, i) => (
          <div key={i} className="flex items-center gap-8 md:gap-12 px-4 md:px-6">
            <span className="text-[clamp(3rem,7vw,6rem)] font-bold uppercase tracking-[-0.02em] text-white/[0.07]">
              {text}
            </span>
            <span className="text-white/10 text-2xl">&bull;</span>
            <span className="text-[clamp(3rem,7vw,6rem)] font-bold uppercase tracking-[-0.02em] text-transparent [-webkit-text-stroke:1px_rgba(255,255,255,0.08)]">
              {text}
            </span>
            <span className="text-white/10 text-2xl">&bull;</span>
          </div>
        ))}
      </div>
    </div>
  );
}

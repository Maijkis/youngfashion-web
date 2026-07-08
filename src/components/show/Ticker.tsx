"use client";

import Marquee from "@/components/ui/Marquee";
import useScrollDirection from "@/hooks/useScrollDirection";
import { tickerItems } from "@/lib/content";

/**
 * The Issue 05 masthead ticker — a scrolling dateline strip under the fixed
 * navbar. Homepage only (it's part of the "cover"). Non-sticky: it scrolls away
 * with the page rather than stacking a third fixed layer on top of the masthead.
 * The loop flips direction with the reader's scroll direction — scroll up and
 * the strip runs backwards, so it feels tied to the gesture.
 */
export default function Ticker() {
  const dir = useScrollDirection();
  // Repeat the set so the first copy alone overfills a wide viewport; Marquee
  // then duplicates that for the seamless loop.
  const items = Array.from({ length: 4 }).flatMap(() => tickerItems);

  return (
    <div
      className="border-y border-hairline bg-[var(--color-paper)] mt-[calc(env(safe-area-inset-top)+3.5rem)] md:mt-[calc(env(safe-area-inset-top)+4rem)]"
    >
      <Marquee durationSec={28} pauseOnHover reverse={dir === "up"} className="h-9 flex items-center">
        {items.map((item, i) => (
          <span
            key={i}
            className="mono-label text-[var(--color-ink-muted)] whitespace-nowrap flex items-center"
          >
            {item}
            <span className="text-[var(--color-accent-text)] mx-4" aria-hidden="true">
              ·
            </span>
          </span>
        ))}
      </Marquee>
    </div>
  );
}

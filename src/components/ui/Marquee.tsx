import type { CSSProperties, ReactNode } from "react";

interface MarqueeProps {
  children: ReactNode;
  /** Seconds for one full loop. Longer = slower. */
  durationSec?: number;
  pauseOnHover?: boolean;
  /** Play the loop backwards — used to flip the ticker with scroll direction. */
  reverse?: boolean;
  className?: string;
}

/**
 * Seamless infinite marquee. The track holds the content twice and slides -50%,
 * so the second copy lands exactly where the first began — no seam, at any
 * content width. Reduced-motion freezes the animation (globals.css kill switch)
 * → the strip simply rests as static text. The duplicate copy is aria-hidden so
 * assistive tech reads the content once.
 */
export default function Marquee({
  children,
  durationSec = 30,
  pauseOnHover = false,
  reverse = false,
  className = "",
}: MarqueeProps) {
  return (
    <div className={`overflow-hidden ${pauseOnHover ? "marquee-pause" : ""} ${className}`}>
      <div
        className="marquee-track"
        style={
          {
            "--marquee-duration": `${durationSec}s`,
            animationDirection: reverse ? "reverse" : "normal",
          } as CSSProperties
        }
      >
        <div className="flex shrink-0">{children}</div>
        {/* Duplicate for the seamless loop — inert so its (possibly focusable)
            contents stay out of the tab order and the accessibility tree. */}
        <div className="flex shrink-0" inert>
          {children}
        </div>
      </div>
    </div>
  );
}

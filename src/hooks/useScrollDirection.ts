"use client";

import { useEffect, useState } from "react";

/**
 * Reports the current scroll direction, "down" (default) or "up". rAF-throttled
 * with a small dead-zone so a jittery finger doesn't thrash the value. Used to
 * make the masthead ticker reverse when the reader scrolls back up.
 */
export default function useScrollDirection() {
  const [dir, setDir] = useState<"down" | "up">("down");

  useEffect(() => {
    let last = window.scrollY;
    let raf = 0;
    const update = () => {
      raf = 0;
      const y = window.scrollY;
      if (Math.abs(y - last) > 4) {
        setDir(y > last ? "down" : "up");
        last = y;
      }
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return dir;
}

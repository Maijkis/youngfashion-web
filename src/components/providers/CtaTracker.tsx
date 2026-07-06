"use client";

import { useEffect } from "react";
import { trackCta } from "@/lib/track";

/**
 * One delegated click listener for every primary ticket CTA on the site.
 * Any element (or descendant) carrying `data-cta="<location>"` reports a click
 * — no per-component handlers, so annotating a new CTA is a one-attribute change.
 */
export default function CtaTracker() {
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const el = (e.target as HTMLElement | null)?.closest<HTMLElement>("[data-cta]");
      if (el?.dataset.cta) trackCta(el.dataset.cta);
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  return null;
}

// ============================================================================
// Lightweight CTA instrumentation — vendor-free.
// Fires a `yf:cta` CustomEvent so ticket-link clickthrough can be measured
// without wiring an analytics SDK. A future vendor just subscribes:
//   window.addEventListener("yf:cta", (e) => vendor.track(e.detail))
// ============================================================================

export interface CtaEventDetail {
  location: string;
  ts: number;
}

/** Emit a ticket-CTA click from `location` (e.g. "hero", "sticky-bar"). */
export function trackCta(location: string): void {
  if (typeof window === "undefined") return;
  window.dispatchEvent(
    new CustomEvent<CtaEventDetail>("yf:cta", {
      detail: { location, ts: Date.now() },
    }),
  );
}

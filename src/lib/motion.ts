// ============================================================================
// Motion gating & easing — single source of truth for the "ISSUE 05" spec.
// The doctrine (see the build brief §9): rich scroll motion is a *desktop*
// enhancement only; touch devices get native scroll + one-shot reveals.
// ============================================================================

/**
 * Rich scroll-linked motion — pin, scrub, tilt-to-cursor, parallax.
 * Mouse-driven desktops only: `hover: hover` + `pointer: fine` excludes touch
 * screens (where scrub ties frame cost to finger movement and janks), and the
 * reduced-motion clause opts the whole class out for users who ask.
 */
export const MQ_SCRUB =
  "(prefers-reduced-motion: no-preference) and (hover: hover) and (pointer: fine)";

/** Any entrance motion at all (one-shot IntersectionObserver reveals) — all devices. */
export const MQ_MOTION = "(prefers-reduced-motion: no-preference)";

/** Pointer capability only — custom cursor, magnetic hover. Reduced-motion handled separately. */
export const MQ_POINTER_FINE = "(hover: hover) and (pointer: fine)";

/** Reveals — expo-out, reads as a heavy magazine page settling. Pair with 700–1100ms. */
export const EASE_EXPO = "cubic-bezier(0.16, 1, 0.3, 1)";
/** Movements (tabs, tilt, flips) — symmetric ease-in-out, no bounce. */
export const EASE_MOVE = "cubic-bezier(0.65, 0, 0.35, 1)";
/** Photo zoom / menu / layout ease-out — framer cubic-bezier tuple mirroring the
 *  CSS `--ease-image` token, so the same curve is single-sourced across layers. */
export const EASE_IMAGE: [number, number, number, number] = [0.32, 0.72, 0, 1];
/** GSAP-string equivalents of the above. */
export const GSAP_EXPO = "expo.out";

/** Motion scale (mirrors the CSS tokens --dur-reveal / --dur-micro / --stagger). */
export const DUR_REVEAL = 0.9;
export const DUR_MICRO = 0.25;
export const STAGGER = 0.075;

/**
 * Data-saver / low-memory / low-core devices get the reduced-motion treatment
 * even if they don't set prefers-reduced-motion. Canvas effects (pixel reveals,
 * dot-fields, the walking figure) must check this before allocating anything.
 * Called at runtime inside matchMedia branches.
 */
export function prefersLiteMotion(): boolean {
  if (typeof navigator === "undefined") return false;
  const nav = navigator as Navigator & {
    connection?: { saveData?: boolean };
    deviceMemory?: number;
  };
  if (nav.connection?.saveData) return true;
  if (nav.deviceMemory !== undefined && nav.deviceMemory < 4) return true;
  if (nav.hardwareConcurrency !== undefined && nav.hardwareConcurrency <= 2) return true;
  return false;
}

/** True when entrance/one-shot motion should run at all (reduced-motion + lite gate). */
export function motionOK(): boolean {
  if (typeof window === "undefined") return false;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return false;
  return !prefersLiteMotion();
}

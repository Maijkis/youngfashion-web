import type { CSSProperties } from "react";

/**
 * One rolling digit. A fixed 1ch × 1em window holds a stacked 0–9 column that
 * translates to bring the current digit into view — transform-only, so it never
 * reflows (zero CLS regardless of the value). Reduced-motion kills the
 * transition (globals.css) → the digit snaps in place. Purely decorative; the
 * readable value is announced by the countdown's aria-live region.
 */
export default function OdometerDigit({ digit }: { digit: number }) {
  const cell: CSSProperties = { width: "1ch", height: "1em", lineHeight: 1 };
  const column: CSSProperties = { transform: `translateY(-${digit * 10}%)` };

  return (
    <span className="inline-block overflow-hidden tabular-nums align-top" style={cell} aria-hidden>
      <span
        className="block transition-transform duration-[450ms] ease-[var(--ease-move)]"
        style={column}
      >
        {Array.from({ length: 10 }, (_, n) => (
          <span key={n} className="block" style={{ height: "1em", lineHeight: 1 }}>
            {n}
          </span>
        ))}
      </span>
    </span>
  );
}

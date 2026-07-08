"use client";

import Link from "next/link";
import { ReactNode } from "react";
import useMagnetic from "@/hooks/useMagnetic";

interface ButtonProps {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: "primary" | "outline" | "frost" | "accent" | "solid";
  className?: string;
  target?: string;
  rel?: string;
  /** Renders an inert, dimmed state (e.g. a ticket link before the URL is live) instead of navigating. */
  disabled?: boolean;
  /** Nudges toward the cursor on desktop — reserve for the one or two primary CTAs per page. */
  magnetic?: boolean;
  /** Marks this as a tracked ticket CTA (see CtaTracker) — e.g. "hero", "lineup". */
  dataCta?: string;
}

export default function Button({
  children,
  href,
  onClick,
  variant = "primary",
  className = "",
  target,
  rel,
  disabled = false,
  magnetic = false,
  dataCta,
}: ButtonProps) {
  const magneticRef = useMagnetic<HTMLAnchorElement | HTMLButtonElement>();
  // Mono-label language (type role 3) — one CTA voice across the site.
  // active:scale = immediate pressed feedback on touch (<100ms).
  const base =
    "inline-flex items-center gap-2 min-h-[44px] font-mono text-label uppercase tracking-label transition-all cursor-pointer active:scale-[0.98]";

  const variants = {
    // Underlined editorial link — primary CTA (accent on hover/press)
    primary:
      "text-[var(--color-ink)] border-b border-[var(--color-ink)] pb-1 hover:gap-3 hover:text-[var(--color-accent-text)] hover:border-[var(--color-accent-text)] active:text-[var(--color-accent-text)] active:border-[var(--color-accent-text)]",
    // Bordered box CTA
    outline:
      "text-[var(--color-ink)] border border-[var(--color-ink)] px-5 py-3 hover:bg-[var(--color-ink)] hover:text-[var(--color-paper)] active:bg-[var(--color-ink)] active:text-[var(--color-paper)]",
    // Muted tertiary link — accent on hover/press
    frost:
      "text-[var(--color-ink-muted)] hover:text-[var(--color-accent-text)] active:text-[var(--color-accent-text)]",
    // Solid accent CTA — the site's primary "get tickets" moment, used sparingly
    accent:
      "bg-[var(--color-accent)] text-[var(--color-ink)] px-6 py-3.5 hover:opacity-90",
    // Ink-filled CTA — strongest weight; e.g. on the accent tickets section
    solid:
      "bg-[var(--color-ink)] text-[var(--color-paper)] px-6 py-3.5 hover:opacity-90",
  };

  const disabledClasses = "opacity-40 cursor-not-allowed pointer-events-none";
  const classes = `${base} ${variants[variant]} ${disabled ? disabledClasses : ""} ${className}`;

  if (disabled) {
    return (
      <span className={classes} aria-disabled="true">
        {children}
      </span>
    );
  }

  if (href) {
    return (
      <Link
        href={href}
        ref={magnetic ? (magneticRef as React.Ref<HTMLAnchorElement>) : undefined}
        className={classes}
        target={target}
        rel={rel}
        data-cta={dataCta}
      >
        {children}
      </Link>
    );
  }

  return (
    <button
      ref={magnetic ? (magneticRef as React.Ref<HTMLButtonElement>) : undefined}
      onClick={onClick}
      className={classes}
      data-cta={dataCta}
    >
      {children}
    </button>
  );
}

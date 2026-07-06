"use client";

import Link from "next/link";
import { ReactNode } from "react";
import useMagnetic from "@/hooks/useMagnetic";

interface ButtonProps {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: "primary" | "outline" | "frost" | "accent";
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
  const base =
    "inline-flex items-center gap-2 min-h-[44px] text-[11px] uppercase tracking-[0.28em] font-medium transition-all cursor-pointer";

  const variants = {
    // Underlined editorial link — primary CTA
    primary:
      "text-[var(--color-ink)] border-b border-[var(--color-ink)] pb-1 hover:gap-3",
    // Bordered box CTA
    outline:
      "text-[var(--color-ink)] border border-[var(--color-ink)] px-5 py-3 hover:bg-[var(--color-ink)] hover:text-[var(--color-paper)]",
    // Muted tertiary link
    frost:
      "text-[var(--color-ink-muted)] hover:text-[var(--color-ink)]",
    // Solid accent CTA — the site's primary "get tickets" moment, used sparingly
    accent:
      "bg-[var(--color-accent)] text-[var(--color-ink)] px-6 py-3.5 hover:opacity-90",
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

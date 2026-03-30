"use client";

import Link from "next/link";
import { ReactNode, useRef, useCallback } from "react";

interface ButtonProps {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: "primary" | "outline" | "frost";
  className?: string;
  target?: string;
  rel?: string;
}

export default function Button({
  children,
  href,
  onClick,
  variant = "primary",
  className = "",
  target,
  rel,
}: ButtonProps) {
  const btnRef = useRef<HTMLAnchorElement | HTMLButtonElement>(null);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    const el = btnRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    el.style.setProperty("--shine-x", `${x}%`);
    el.style.setProperty("--shine-y", `${y}%`);
  }, []);

  const base =
    "frosted-btn inline-flex items-center gap-2 px-7 py-3.5 md:px-9 md:py-4 text-[11px] md:text-xs uppercase tracking-[0.2em] font-bold transition-all duration-400 cursor-pointer text-center relative overflow-hidden";

  const variants = {
    primary:
      "bg-white/95 text-black backdrop-blur-sm border border-white/20 hover:bg-white hover:shadow-[0_0_30px_rgba(255,255,255,0.15)] hover:tracking-[0.25em]",
    outline:
      "bg-white/[0.06] text-white backdrop-blur-xl border border-white/[0.15] shadow-[inset_0_1px_0_rgba(255,255,255,0.1),0_4px_20px_rgba(0,0,0,0.2)] hover:bg-white/[0.12] hover:border-white/30 hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.2),0_8px_32px_rgba(0,0,0,0.3)]",
    frost:
      "bg-white/[0.08] text-white backdrop-blur-2xl border border-white/[0.12] shadow-[inset_0_1px_0_rgba(255,255,255,0.08),0_4px_24px_rgba(0,0,0,0.15)] hover:bg-white/[0.14] hover:border-white/25 hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.15),0_8px_40px_rgba(0,0,0,0.2)]",
  };

  const classes = `${base} ${variants[variant]} ${className}`;

  if (href) {
    return (
      <Link
        href={href}
        ref={btnRef as React.Ref<HTMLAnchorElement>}
        className={classes}
        target={target}
        rel={rel}
        onMouseMove={handleMouseMove}
      >
        {children}
      </Link>
    );
  }

  return (
    <button
      ref={btnRef as React.Ref<HTMLButtonElement>}
      onClick={onClick}
      className={classes}
      onMouseMove={handleMouseMove}
    >
      {children}
    </button>
  );
}

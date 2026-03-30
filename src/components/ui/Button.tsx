import Link from "next/link";
import { ReactNode } from "react";

interface ButtonProps {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: "primary" | "outline" | "glass";
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
  const base =
    "inline-flex items-center gap-2 px-7 py-3.5 md:px-9 md:py-4 text-[11px] md:text-xs uppercase tracking-[0.2em] font-bold transition-all duration-300 cursor-pointer text-center";
  const variants = {
    primary:
      "bg-white text-black hover:bg-white/90 hover:tracking-[0.25em]",
    outline:
      "border border-white/30 text-white hover:bg-white hover:text-black hover:border-white",
    glass: "glass-light text-white hover:bg-white/15",
  };

  const classes = `${base} ${variants[variant]} ${className}`;

  if (href) {
    return (
      <Link href={href} className={classes} target={target} rel={rel}>
        {children}
      </Link>
    );
  }

  return (
    <button onClick={onClick} className={classes}>
      {children}
    </button>
  );
}

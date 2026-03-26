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
    "inline-block px-6 py-3 md:px-8 md:py-3 text-[11px] md:text-xs uppercase tracking-[0.2em] font-sans transition-all duration-300 cursor-pointer text-center";
  const variants = {
    primary: "bg-white text-black hover:bg-muted-light",
    outline: "border border-white/40 text-white hover:bg-white hover:text-black",
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

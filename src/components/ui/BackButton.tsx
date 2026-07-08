"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";

/**
 * A consistent "back" control for subpages — returns to the previous page when
 * there's history, otherwise falls back to the homepage (e.g. when the page was
 * opened directly from a shared link).
 */
export default function BackButton({
  label = "Back",
  className = "",
}: {
  label?: string;
  className?: string;
}) {
  const router = useRouter();

  const onClick = () => {
    if (typeof window !== "undefined" && window.history.length > 1) router.back();
    else router.push("/");
  };

  return (
    <button
      type="button"
      onClick={onClick}
      className={`hot-text mono-label inline-flex min-h-[44px] items-center gap-2 text-[var(--color-ink-muted)] transition-colors ${className}`}
    >
      <ArrowLeft size={14} />
      {label}
    </button>
  );
}

"use client";

import { useEffect, useState } from "react";
import { event } from "@/lib/content";

/**
 * A small mono "days out" pill for near the ticket CTA — light urgency, driven
 * by event.dateISO in the content file (no separate data to keep in sync).
 * Renders nothing until mounted (the value is date-dependent, so computing it
 * on the server would risk a hydration mismatch). Its slot has a reserved
 * min-height so the late mount doesn't shift the CTA below it.
 */
export default function UrgencyTag({ className = "" }: { className?: string }) {
  const [label, setLabel] = useState<string | null>(null);

  useEffect(() => {
    const diff = new Date(event.dateISO).getTime() - Date.now();
    if (diff <= 0) {
      setLabel("Happening now");
      return;
    }
    const days = Math.ceil(diff / 86_400_000);
    setLabel(
      days <= 1 ? "Final hours" : days <= 7 ? `${days} days out · final call` : `${days} days out`,
    );
  }, []);

  return (
    <div className={`flex min-h-[28px] items-center ${className}`}>
      {label && (
        <span className="mono-label inline-flex items-center gap-2 border border-current px-3 py-1">
          <span
            className="h-1.5 w-1.5 rounded-full bg-current motion-safe:animate-pulse"
            aria-hidden
          />
          <span className="tabular-nums">{label}</span>
        </span>
      )}
    </div>
  );
}

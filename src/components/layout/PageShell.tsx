import type { ReactNode } from "react";
import GridLines from "@/components/ui/GridLines";

/**
 * Subpage wrapper — extends the hero's faint column grid to every page so the
 * whole site shares one background texture (kept ≈5.6% effective opacity, well
 * under the 6% budget so it never competes with text).
 */
export default function PageShell({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className="relative">
      <GridLines className="opacity-40" />
      <div className={`relative z-10 ${className}`}>{children}</div>
    </div>
  );
}

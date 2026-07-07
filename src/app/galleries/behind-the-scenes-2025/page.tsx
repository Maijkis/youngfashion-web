import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { behindTheScenesPhotos2025 } from "@/lib/mockData";
import BehindTheScenes from "@/components/galleries/BehindTheScenes";

export const metadata: Metadata = {
  title: "Behind the Scenes 2025 | Young Fashion",
  description:
    "Go behind the scenes of Young Fashion 2025 — exclusive backstage photos from the closing of Vilnius Fashion Week.",
};

export default function BehindTheScenes2025Page() {
  return (
    <div className="container pt-28 md:pt-36 pb-section">
        <div className="mb-8 md:mb-10">
          <Link
            href="/galleries"
            className="mono-label inline-flex items-center gap-2 text-[var(--color-ink-muted)] hover:text-[var(--color-ink)] transition-colors"
          >
            <ArrowLeft size={14} />
            Back to Galleries
          </Link>
        </div>

        <BehindTheScenes photos={behindTheScenesPhotos2025} />
    </div>
  );
}

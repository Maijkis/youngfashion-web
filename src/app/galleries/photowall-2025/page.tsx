import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import PageShell from "@/components/layout/PageShell";
import { photowallPhotos2025 } from "@/lib/mockData";
import PhotowallGallery from "@/components/galleries/PhotowallGallery";

export const metadata: Metadata = {
  title: "Photowall 2025 | Young Fashion",
  description:
    "Guest portraits from Young Fashion 2025 — captured at the closing of Vilnius Fashion Week by Kristina Petrikonytė.",
};

export default function Photowall2025Page() {
  return (
    <PageShell className="container pt-28 md:pt-36 pb-section">
        <div className="mb-8 md:mb-10">
          <Link
            href="/galleries"
            className="mono-label inline-flex items-center gap-2 text-[var(--color-ink-muted)] hover:text-[var(--color-ink)] transition-colors"
          >
            <ArrowLeft size={14} />
            Back to Galleries
          </Link>
        </div>

        <PhotowallGallery photos={photowallPhotos2025} />
    </PageShell>
  );
}

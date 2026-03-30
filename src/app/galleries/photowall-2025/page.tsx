import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { photowallPhotos2025 } from "@/lib/mockData";
import PhotowallGallery from "@/components/galleries/PhotowallGallery";

export const metadata: Metadata = {
  title: "Photowall 2025 | Young Fashion",
  description:
    "Guest portraits from Young Fashion 2025 — captured at the closing of Vilnius Fashion Week by Kristina Petrikonytė.",
};

export default function Photowall2025Page() {
  return (
    <div className="pt-28 md:pt-36 pb-16 md:pb-24 px-6 md:px-12 lg:px-20">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8 md:mb-10">
          <Link
            href="/galleries"
            className="inline-flex items-center gap-2 text-[11px] md:text-xs uppercase tracking-[0.18em] text-white/60 hover:text-white transition-colors"
          >
            <ArrowLeft size={14} />
            Back to Galleries
          </Link>
        </div>

        <PhotowallGallery photos={photowallPhotos2025} />
      </div>
    </div>
  );
}

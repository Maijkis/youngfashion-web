import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { behindTheScenesPhotos2025 } from "@/lib/mockData";
import BehindTheScenes from "@/components/galleries/BehindTheScenes";

export default function BehindTheScenes2025Page() {
  return (
    <div className="pt-28 md:pt-36 pb-16 md:pb-24 px-4 md:px-6">
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

        <BehindTheScenes photos={behindTheScenesPhotos2025} />
      </div>
    </div>
  );
}

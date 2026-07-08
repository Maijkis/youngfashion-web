"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Designer } from "@/lib/mockData";
import PixelCanvas from "@/components/ui/PixelCanvas";
import DesignerModal from "./DesignerModal";
import { EASE_IMAGE } from "@/lib/motion";

interface DesignerGridProps {
  designers: Designer[];
}

export default function DesignerGrid({ designers }: DesignerGridProps) {
  const [selectedDesigner, setSelectedDesigner] = useState<Designer | null>(null);

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
        <AnimatePresence mode="popLayout">
          {designers.map((designer, i) => {
            const hasPhotos = designer.photos && designer.photos.length > 0;
            return (
              <motion.button
                key={designer.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.45, ease: EASE_IMAGE }}
                onClick={() => hasPhotos && setSelectedDesigner(designer)}
                disabled={!hasPhotos}
                className="group block text-left cursor-pointer disabled:cursor-default"
              >
                <div className="relative aspect-[3/4] overflow-hidden bg-[var(--color-paper-deep)] mb-4">
                  <Image
                    src={designer.image}
                    alt={designer.name}
                    fill
                    priority={i < 2}
                    className="object-cover transition-transform duration-[900ms] ease-image group-hover:scale-[1.03]"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                  <PixelCanvas hover />
                  {/* Explore label on hover */}
                  {hasPhotos && (
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-black/20">
                      <span className="text-white text-label uppercase tracking-[0.32em] font-medium border border-white/70 px-5 py-2">
                        View {designer.photos!.length}
                      </span>
                    </div>
                  )}
                </div>
                <div className="flex items-baseline justify-between gap-3">
                  <h3 className="flex items-baseline gap-2.5 font-light text-[var(--color-ink)] text-body">
                    <span className="section-num">({String(i + 1).padStart(2, "0")})</span>
                    {designer.name}
                  </h3>
                  <span className="mono-label text-[var(--color-ink-muted)] tabular-nums shrink-0">
                    {designer.year}
                  </span>
                </div>
              </motion.button>
            );
          })}
        </AnimatePresence>
      </div>

      <DesignerModal
        designer={selectedDesigner}
        onClose={() => setSelectedDesigner(null)}
      />
    </>
  );
}

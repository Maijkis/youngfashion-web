"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, X } from "lucide-react";
import { BtsPhoto } from "@/lib/mockData";
import SectionHeader from "@/components/ui/SectionHeader";
import Button from "@/components/ui/Button";

interface PhotowallGalleryProps {
  photos: BtsPhoto[];
  previewCount?: number;
  showSeeMore?: boolean;
}

export default function PhotowallGallery({
  photos,
  previewCount,
  showSeeMore = false,
}: PhotowallGalleryProps) {
  const [selectedPhoto, setSelectedPhoto] = useState<BtsPhoto | null>(null);

  useEffect(() => {
    if (!selectedPhoto) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setSelectedPhoto(null);
      }
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [selectedPhoto]);

  if (photos.length === 0) return null;

  const visiblePhotos = previewCount ? photos.slice(0, previewCount) : photos;
  const isPreview = typeof previewCount === "number";

  return (
    <section className="mt-16 md:mt-24">
      <SectionHeader
        title="Photowall 2025"
        subtitle="Guests who attended the show"
      />

      <div className="mb-8 md:mb-12 max-w-3xl mx-auto text-center px-4">
        <p className="text-body text-[var(--color-ink)]/70 font-light leading-body">
          A dedicated archive of guest portraits captured at the Young Fashion
          2025 photowall.
        </p>
      </div>

      <div className={isPreview ? "grid grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4" : "masonry-grid"}>
        <AnimatePresence mode="popLayout">
          {visiblePhotos.map((photo, index) => (
            <motion.div
              key={photo.id}
              layout
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 16 }}
              transition={{ duration: 0.35, delay: Math.min(index * 0.01, 0.2) }}
              className="relative overflow-hidden group bg-[var(--color-paper-deep)] cursor-pointer"
              onClick={() => setSelectedPhoto(photo)}
            >
              <Image
                src={photo.src}
                alt={photo.alt}
                width={900}
                height={1200}
                className={`w-full object-cover transition-transform duration-[900ms] ease-image group-hover:scale-[1.03] ${
                  isPreview ? "aspect-[3/4] h-full" : "h-auto"
                }`}
                sizes="(max-width: 768px) 50vw, 33vw"
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {showSeeMore && photos.length > visiblePhotos.length && (
        <div className="mt-8 md:mt-10 flex justify-center">
          <Button
            href="/galleries/photowall-2025"
            variant="frost"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2"
          >
            See More
            <ArrowUpRight size={14} />
          </Button>
        </div>
      )}

      <AnimatePresence>
        {selectedPhoto && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[70] bg-[var(--color-paper)]/95 backdrop-blur-md px-4 py-6 md:px-6 md:py-8"
            onClick={() => setSelectedPhoto(null)}
          >
            <div className="flex min-h-full items-center justify-center">
              <motion.div
                initial={{ opacity: 0, y: 20, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 20, scale: 0.98 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
                className="relative w-full max-w-4xl bg-[var(--color-paper)] border border-[var(--color-hairline)] overflow-hidden"
                onClick={(event) => event.stopPropagation()}
              >
                <button
                  type="button"
                  onClick={() => setSelectedPhoto(null)}
                  className="absolute top-3 right-3 z-10 p-2 text-[var(--color-ink)] hover:text-[var(--color-ink-muted)] transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center"
                  aria-label="Close image preview"
                >
                  <X size={18} />
                </button>

                <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_280px]">
                  <div className="relative flex items-center justify-center p-4 md:p-6">
                    <Image
                      src={selectedPhoto.src}
                      alt={selectedPhoto.alt}
                      width={1400}
                      height={1800}
                      className="w-auto h-auto max-w-full max-h-[62vh] md:max-h-[68vh] object-contain"
                      sizes="(max-width: 1024px) 100vw, 70vw"
                    />
                  </div>

                  <div className="p-5 md:p-6 flex flex-col gap-5 border-t lg:border-t-0 lg:border-l border-[var(--color-hairline)]">
                    <div>
                      <p className="mono-label text-[var(--color-ink-muted)] mb-3">
                        Details
                      </p>
                      <h3 className="font-light text-[var(--color-ink)] text-lg md:text-xl mb-4">
                        Photowall · 2025
                      </h3>
                      <div className="space-y-2 text-sm text-[var(--color-ink)]/65 font-light leading-relaxed">
                        <p>Location · K2 Comedy Club</p>
                        <p>Guest portrait from the Young Fashion 2025 photowall.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

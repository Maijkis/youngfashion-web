"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, Download, X } from "lucide-react";
import { BtsPhoto } from "@/lib/mockData";
import SectionHeader from "@/components/ui/SectionHeader";
import Button from "@/components/ui/Button";

interface BehindTheScenesProps {
  photos: BtsPhoto[];
  previewCount?: number;
  showSeeMore?: boolean;
}

export default function BehindTheScenes({
  photos,
  previewCount,
  showSeeMore = false,
}: BehindTheScenesProps) {
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

  // Derive year and photographers from the displayed photos
  const year = photos[0]?.year;
  const photographers = Array.from(
    new Set(photos.map((p) => p.photographer).filter(Boolean) as string[])
  );
  const photographerLabel =
    photographers.length === 0
      ? null
      : photographers.length === 1
      ? `Photos by ${photographers[0]}`
      : `Photos by ${photographers.slice(0, -1).join(", ")} & ${photographers[photographers.length - 1]}`;

  return (
    <section className="mt-16 md:mt-24">
      <SectionHeader
        title="Behind the Scenes"
        subtitle="The atmosphere beyond the runway"
      />

      <div className="mb-6 md:mb-8 max-w-3xl mx-auto text-center px-4">
        <p className="text-xs md:text-sm text-white/50 leading-relaxed">
          Candid moments from Young Fashion {year}.
        </p>
        {photographerLabel && (
          <p className="mt-2 text-[11px] md:text-xs uppercase tracking-[0.16em] text-white/35">
            {photographerLabel}
          </p>
        )}
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
              className="relative overflow-hidden group glass-card rounded-sm cursor-pointer"
              onClick={() => setSelectedPhoto(photo)}
            >
              <Image
                src={photo.src}
                alt={photo.alt}
                width={900}
                height={1200}
                className={`w-full object-cover transition-transform duration-700 group-hover:scale-[1.02] ${
                  isPreview ? "aspect-[3/4] h-full" : "h-auto"
                }`}
                sizes="(max-width: 768px) 50vw, 33vw"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-500 flex items-end p-3 md:p-4">
                <p className="text-[10px] md:text-xs text-white opacity-0 group-hover:opacity-100 transition-opacity duration-500 uppercase tracking-[0.1em]">
                  Behind the Scenes {index + 1}
                </p>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {showSeeMore && photos.length > visiblePhotos.length && (
        <div className="mt-8 md:mt-10 flex justify-center">
          <Button
            href="/galleries/behind-the-scenes-2025"
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
            className="fixed inset-0 z-[70] bg-black/80 backdrop-blur-md px-4 py-6 md:px-6 md:py-8"
            onClick={() => setSelectedPhoto(null)}
          >
            <div className="flex min-h-full items-center justify-center">
              <motion.div
                initial={{ opacity: 0, y: 20, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 20, scale: 0.98 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
                className="relative w-full max-w-4xl glass-card rounded-sm overflow-hidden"
                onClick={(event) => event.stopPropagation()}
              >
                <button
                  type="button"
                  onClick={() => setSelectedPhoto(null)}
                  className="absolute top-3 right-3 z-10 glass rounded-full p-2 text-white/80 hover:text-white transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center"
                  aria-label="Close image preview"
                >
                  <X size={18} />
                </button>

                <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_280px]">
                  <div className="relative flex items-center justify-center p-3 md:p-4">
                    <Image
                      src={selectedPhoto.src}
                      alt={selectedPhoto.alt}
                      width={1400}
                      height={1800}
                      className="w-auto h-auto max-w-full max-h-[62vh] md:max-h-[68vh] object-contain rounded-sm"
                      sizes="(max-width: 1024px) 100vw, 70vw"
                    />
                  </div>

                  <div className="p-4 md:p-5 flex flex-col justify-between gap-5 border-t border-white/8 lg:border-t-0 lg:border-l lg:border-white/8">
                    <div>
                      <p className="text-[10px] md:text-[11px] uppercase tracking-[0.22em] text-white/40 mb-3">
                        Photo Details
                      </p>
                      <h3 className="text-base md:text-lg font-bold uppercase tracking-[0.08em] text-white mb-3">
                        Behind the Scenes {selectedPhoto.year}
                      </h3>
                      <div className="space-y-2 text-xs md:text-sm text-white/55 leading-relaxed">
                        <p>Young Fashion {selectedPhoto.year}</p>
                        {selectedPhoto.photographer && (
                          <p>Photo by {selectedPhoto.photographer}</p>
                        )}
                      </div>
                    </div>

                    <div className="flex flex-col gap-3">
                      <a
                        href={selectedPhoto.src}
                        download
                        aria-label="Download image"
                        className="inline-flex items-center justify-center gap-2 self-start md:self-stretch glass-light h-11 w-11 md:h-auto md:w-auto md:px-4 md:py-3 text-[11px] md:text-xs uppercase tracking-[0.18em] text-white hover:bg-white/15 transition-colors"
                      >
                        <Download size={14} />
                        <span className="hidden md:inline">Download</span>
                      </a>
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

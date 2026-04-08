"use client";

import { useEffect, useState, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X, Download, ArrowLeft, ArrowRight } from "lucide-react";
import { Designer } from "@/lib/mockData";

interface DesignerModalProps {
  designer: Designer | null;
  onClose: () => void;
}

export default function DesignerModal({ designer, onClose }: DesignerModalProps) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const photos = designer?.photos ?? [];

  const closeLightbox = useCallback(() => setLightboxIndex(null), []);

  const showPrev = useCallback(() => {
    if (lightboxIndex === null) return;
    setLightboxIndex((lightboxIndex - 1 + photos.length) % photos.length);
  }, [lightboxIndex, photos.length]);

  const showNext = useCallback(() => {
    if (lightboxIndex === null) return;
    setLightboxIndex((lightboxIndex + 1) % photos.length);
  }, [lightboxIndex, photos.length]);

  // Lock body scroll and stop Lenis while modal is open
  useEffect(() => {
    if (!designer) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const lenis = (window as Window & { __lenis?: { stop: () => void; start: () => void } }).__lenis;
    lenis?.stop();
    return () => {
      document.body.style.overflow = prev;
      lenis?.start();
    };
  }, [designer]);

  // Keyboard handling
  useEffect(() => {
    if (!designer) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (lightboxIndex !== null) {
          closeLightbox();
        } else {
          onClose();
        }
      }
      if (lightboxIndex !== null) {
        if (e.key === "ArrowLeft") showPrev();
        if (e.key === "ArrowRight") showNext();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [designer, lightboxIndex, closeLightbox, onClose, showPrev, showNext]);

  const downloadAll = useCallback(() => {
    photos.forEach((src, i) => {
      setTimeout(() => {
        const a = document.createElement("a");
        a.href = src;
        a.download = src.split("/").pop() ?? `photo-${i}.jpg`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
      }, i * 200);
    });
  }, [photos]);

  return (
    <AnimatePresence>
      {designer && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[80] bg-black/95 backdrop-blur-md overflow-y-auto"
          data-lenis-prevent
        >
          {/* Header */}
          <div className="sticky top-0 z-10 bg-black/90 backdrop-blur-xl border-b border-white/10">
            <div className="max-w-[1800px] mx-auto px-6 md:px-12 lg:px-20 py-5 md:py-6 flex items-center justify-between gap-4">
              <div className="min-w-0">
                <p className="text-[10px] uppercase tracking-[0.25em] text-white/30 font-bold mb-1">
                  Year {designer.year} · {photos.length} photos
                </p>
                <h2 className="text-2xl md:text-4xl font-bold uppercase tracking-[-0.02em] text-white truncate">
                  {designer.name}
                </h2>
              </div>
              <div className="flex items-center gap-3 flex-shrink-0">
                {photos.length > 0 && (
                  <button
                    onClick={downloadAll}
                    className="frosted-btn relative overflow-hidden hidden sm:inline-flex items-center gap-2 bg-white/[0.08] backdrop-blur-xl border border-white/[0.15] px-4 py-2.5 text-[10px] uppercase tracking-[0.2em] font-bold text-white hover:bg-white/[0.15] hover:border-white/30 transition-all duration-300"
                  >
                    <Download size={12} />
                    Download all
                  </button>
                )}
                <button
                  onClick={onClose}
                  aria-label="Close"
                  className="frosted-btn relative overflow-hidden bg-white/[0.08] backdrop-blur-xl border border-white/[0.15] p-2.5 text-white hover:bg-white/[0.15] hover:border-white/30 transition-all duration-300"
                >
                  <X size={18} />
                </button>
              </div>
            </div>
          </div>

          {/* Grid */}
          <div className="max-w-[1800px] mx-auto px-6 md:px-12 lg:px-20 py-8 md:py-12">
            {photos.length === 0 ? (
              <p className="text-white/40 text-sm">No photos available for this designer yet.</p>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
                {photos.map((src, i) => (
                  <button
                    key={src}
                    onClick={() => setLightboxIndex(i)}
                    className="group relative aspect-[3/4] overflow-hidden bg-white/[0.03] cursor-pointer"
                  >
                    <Image
                      src={src}
                      alt={`${designer.name} photo ${i + 1}`}
                      fill
                      sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                      className="object-cover transition-all duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300" />
                    <div className="absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <span className="text-[9px] uppercase tracking-[0.15em] text-white/80 font-bold">
                        {String(i + 1).padStart(2, "0")} / {String(photos.length).padStart(2, "0")}
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Lightbox */}
          <AnimatePresence>
            {lightboxIndex !== null && photos[lightboxIndex] && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="fixed inset-0 z-[90] bg-black/95 backdrop-blur-xl flex items-center justify-center p-4 md:p-8"
                onClick={closeLightbox}
              >
                {/* Close */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    closeLightbox();
                  }}
                  aria-label="Close photo"
                  className="absolute top-4 right-4 md:top-6 md:right-6 z-10 bg-white/[0.08] backdrop-blur-xl border border-white/[0.15] p-3 text-white hover:bg-white/[0.15] hover:border-white/30 transition-all duration-300"
                >
                  <X size={20} />
                </button>

                {/* Prev */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    showPrev();
                  }}
                  aria-label="Previous photo"
                  className="absolute left-4 md:left-6 top-1/2 -translate-y-1/2 z-10 bg-white/[0.08] backdrop-blur-xl border border-white/[0.15] p-3 text-white hover:bg-white/[0.15] hover:border-white/30 transition-all duration-300"
                >
                  <ArrowLeft size={20} />
                </button>

                {/* Next */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    showNext();
                  }}
                  aria-label="Next photo"
                  className="absolute right-4 md:right-6 top-1/2 -translate-y-1/2 z-10 bg-white/[0.08] backdrop-blur-xl border border-white/[0.15] p-3 text-white hover:bg-white/[0.15] hover:border-white/30 transition-all duration-300"
                >
                  <ArrowRight size={20} />
                </button>

                {/* Image */}
                <motion.div
                  key={lightboxIndex}
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.2 }}
                  className="relative w-full max-w-6xl h-[80vh] flex items-center justify-center"
                  onClick={(e) => e.stopPropagation()}
                >
                  <Image
                    src={photos[lightboxIndex]}
                    alt={`${designer.name} photo ${lightboxIndex + 1}`}
                    fill
                    sizes="100vw"
                    className="object-contain"
                    priority
                  />
                </motion.div>

                {/* Footer with counter + download */}
                <div
                  className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex items-center gap-4"
                  onClick={(e) => e.stopPropagation()}
                >
                  <span className="text-[11px] uppercase tracking-[0.2em] text-white/60 font-bold tabular-nums">
                    {String(lightboxIndex + 1).padStart(2, "0")} / {String(photos.length).padStart(2, "0")}
                  </span>
                  <a
                    href={photos[lightboxIndex]}
                    download={photos[lightboxIndex].split("/").pop()}
                    className="frosted-btn relative overflow-hidden inline-flex items-center gap-2 bg-white/[0.08] backdrop-blur-xl border border-white/[0.15] px-4 py-2.5 text-[10px] uppercase tracking-[0.2em] font-bold text-white hover:bg-white/[0.15] hover:border-white/30 transition-all duration-300"
                  >
                    <Download size={12} />
                    Download
                  </a>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

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
  const [focusedIndex, setFocusedIndex] = useState<number | null>(null);
  const photos = designer?.photos ?? [];
  const isFocused = focusedIndex !== null;

  const closeFocused = useCallback(() => setFocusedIndex(null), []);

  const showPrev = useCallback(() => {
    if (focusedIndex === null) return;
    setFocusedIndex((focusedIndex - 1 + photos.length) % photos.length);
  }, [focusedIndex, photos.length]);

  const showNext = useCallback(() => {
    if (focusedIndex === null) return;
    setFocusedIndex((focusedIndex + 1) % photos.length);
  }, [focusedIndex, photos.length]);

  // Reset focused state whenever a different designer opens
  useEffect(() => {
    setFocusedIndex(null);
  }, [designer?.id]);

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
        if (isFocused) {
          closeFocused();
        } else {
          onClose();
        }
      }
      if (isFocused) {
        if (e.key === "ArrowLeft") showPrev();
        if (e.key === "ArrowRight") showNext();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [designer, isFocused, closeFocused, onClose, showPrev, showNext]);

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
              <div className="min-w-0 flex items-center gap-4">
                {isFocused && (
                  <button
                    onClick={closeFocused}
                    aria-label="Back to grid"
                    className="frosted-btn relative overflow-hidden bg-white/[0.08] backdrop-blur-xl border border-white/[0.15] p-2.5 text-white hover:bg-white/[0.15] hover:border-white/30 transition-all duration-300 flex-shrink-0"
                  >
                    <ArrowLeft size={18} />
                  </button>
                )}
                <div className="min-w-0">
                  <p className="text-[10px] uppercase tracking-[0.25em] text-white/30 font-bold mb-1">
                    {isFocused
                      ? `Photo ${String(focusedIndex! + 1).padStart(2, "0")} / ${String(photos.length).padStart(2, "0")}`
                      : `Year ${designer.year} · ${photos.length} photos`}
                  </p>
                  <h2 className="text-2xl md:text-4xl font-bold uppercase tracking-[-0.02em] text-white truncate">
                    {designer.name}
                  </h2>
                </div>
              </div>
              <div className="flex items-center gap-3 flex-shrink-0">
                {isFocused ? (
                  <a
                    href={photos[focusedIndex!]}
                    download={photos[focusedIndex!].split("/").pop()}
                    className="frosted-btn relative overflow-hidden hidden sm:inline-flex items-center gap-2 bg-white/[0.08] backdrop-blur-xl border border-white/[0.15] px-4 py-2.5 text-[10px] uppercase tracking-[0.2em] font-bold text-white hover:bg-white/[0.15] hover:border-white/30 transition-all duration-300"
                  >
                    <Download size={12} />
                    Download
                  </a>
                ) : (
                  photos.length > 0 && (
                    <button
                      onClick={downloadAll}
                      className="frosted-btn relative overflow-hidden hidden sm:inline-flex items-center gap-2 bg-white/[0.08] backdrop-blur-xl border border-white/[0.15] px-4 py-2.5 text-[10px] uppercase tracking-[0.2em] font-bold text-white hover:bg-white/[0.15] hover:border-white/30 transition-all duration-300"
                    >
                      <Download size={12} />
                      Download all
                    </button>
                  )
                )}
                <button
                  onClick={isFocused ? closeFocused : onClose}
                  aria-label={isFocused ? "Back to grid" : "Close"}
                  className="frosted-btn relative overflow-hidden bg-white/[0.08] backdrop-blur-xl border border-white/[0.15] p-2.5 text-white hover:bg-white/[0.15] hover:border-white/30 transition-all duration-300"
                >
                  <X size={18} />
                </button>
              </div>
            </div>
          </div>

          {/* Body */}
          <AnimatePresence mode="wait">
            {isFocused ? (
              /* Focused single photo view */
              <motion.div
                key="focused"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25 }}
                className="relative min-h-[calc(100vh-100px)] flex items-center justify-center px-4 md:px-12 lg:px-20 py-8"
              >
                {/* Prev arrow */}
                {photos.length > 1 && (
                  <button
                    onClick={showPrev}
                    aria-label="Previous photo"
                    className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-10 bg-white/[0.08] backdrop-blur-xl border border-white/[0.15] p-3 text-white hover:bg-white/[0.15] hover:border-white/30 transition-all duration-300"
                  >
                    <ArrowLeft size={20} />
                  </button>
                )}

                {/* The photo */}
                <motion.div
                  key={focusedIndex}
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.25 }}
                  className="relative w-full max-w-5xl aspect-[4/5] md:aspect-[3/4] flex items-center justify-center"
                >
                  <Image
                    src={photos[focusedIndex!]}
                    alt={`${designer.name} photo ${focusedIndex! + 1}`}
                    fill
                    sizes="(max-width: 1024px) 100vw, 80vw"
                    className="object-contain"
                    priority
                  />
                </motion.div>

                {/* Next arrow */}
                {photos.length > 1 && (
                  <button
                    onClick={showNext}
                    aria-label="Next photo"
                    className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-10 bg-white/[0.08] backdrop-blur-xl border border-white/[0.15] p-3 text-white hover:bg-white/[0.15] hover:border-white/30 transition-all duration-300"
                  >
                    <ArrowRight size={20} />
                  </button>
                )}

                {/* Mobile download button */}
                <a
                  href={photos[focusedIndex!]}
                  download={photos[focusedIndex!].split("/").pop()}
                  className="frosted-btn relative overflow-hidden sm:hidden absolute bottom-6 left-1/2 -translate-x-1/2 inline-flex items-center gap-2 bg-white/[0.08] backdrop-blur-xl border border-white/[0.15] px-4 py-2.5 text-[10px] uppercase tracking-[0.2em] font-bold text-white hover:bg-white/[0.15] transition-all duration-300"
                >
                  <Download size={12} />
                  Download
                </a>
              </motion.div>
            ) : (
              /* Grid view */
              <motion.div
                key="grid"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25 }}
                className="max-w-[1800px] mx-auto px-6 md:px-12 lg:px-20 py-8 md:py-12"
              >
                {photos.length === 0 ? (
                  <p className="text-white/40 text-sm">No photos available for this designer yet.</p>
                ) : (
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
                    {photos.map((src, i) => (
                      <button
                        key={src}
                        onClick={() => setFocusedIndex(i)}
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
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

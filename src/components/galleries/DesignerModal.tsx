"use client";

import { useEffect, useState, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X, ArrowLeft, ArrowRight } from "lucide-react";
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

  useEffect(() => {
    setFocusedIndex(null);
  }, [designer?.id]);

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

  useEffect(() => {
    if (!designer) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (isFocused) closeFocused();
        else onClose();
      }
      if (isFocused) {
        if (e.key === "ArrowLeft") showPrev();
        if (e.key === "ArrowRight") showNext();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [designer, isFocused, closeFocused, onClose, showPrev, showNext]);

  return (
    <AnimatePresence>
      {designer && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[80] bg-[var(--color-paper)] overflow-y-auto"
          data-lenis-prevent
        >
          {/* Header */}
          <div className="sticky top-0 z-10 bg-[var(--color-paper)]/90 backdrop-blur-md border-b border-[var(--color-hairline)] safe-top">
            <div className="container py-5 md:py-6 flex items-center justify-between gap-4">
              <div className="min-w-0 flex items-center gap-4">
                {isFocused && (
                  <button
                    onClick={closeFocused}
                    aria-label="Back to grid"
                    className="p-2 -ml-2 text-[var(--color-ink)] hover:text-[var(--color-ink-muted)] transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center"
                  >
                    <ArrowLeft size={18} />
                  </button>
                )}
                <div className="min-w-0">
                  <p className="mono-label text-[var(--color-ink-muted)] mb-1.5">
                    {isFocused
                      ? `${String(focusedIndex! + 1).padStart(2, "0")} / ${String(photos.length).padStart(2, "0")}`
                      : `${designer.year} · ${photos.length} photos`}
                  </p>
                  <h2 className="font-light text-[var(--color-ink)] leading-tight text-xl md:text-3xl truncate">
                    {designer.name}
                  </h2>
                </div>
              </div>
              <div className="flex items-center gap-2 md:gap-4 flex-shrink-0">
                <button
                  onClick={isFocused ? closeFocused : onClose}
                  aria-label={isFocused ? "Back to grid" : "Close"}
                  className="p-2 -mr-2 text-[var(--color-ink)] hover:text-[var(--color-ink-muted)] transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center"
                >
                  <X size={20} />
                </button>
              </div>
            </div>
          </div>

          {/* Body */}
          <AnimatePresence mode="wait">
            {isFocused ? (
              <motion.div
                key="focused"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25 }}
                className="relative min-h-[calc(100svh-100px)] flex items-center justify-center px-4 md:px-12 lg:px-20 py-8"
              >
                {photos.length > 1 && (
                  <button
                    onClick={showPrev}
                    aria-label="Previous photo"
                    className="absolute left-3 md:left-6 top-1/2 -translate-y-1/2 z-10 p-3 text-[var(--color-ink)] hover:text-[var(--color-ink-muted)] transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center"
                  >
                    <ArrowLeft size={22} />
                  </button>
                )}

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

                {photos.length > 1 && (
                  <button
                    onClick={showNext}
                    aria-label="Next photo"
                    className="absolute right-3 md:right-6 top-1/2 -translate-y-1/2 z-10 p-3 text-[var(--color-ink)] hover:text-[var(--color-ink-muted)] transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center"
                  >
                    <ArrowRight size={22} />
                  </button>
                )}
              </motion.div>
            ) : (
              <motion.div
                key="grid"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25 }}
                className="container py-8 md:py-12"
              >
                {photos.length === 0 ? (
                  <p className="text-[var(--color-ink-muted)] font-light text-sm">
                    No photos available for this designer yet.
                  </p>
                ) : (
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
                    {photos.map((src, i) => (
                      <button
                        key={src}
                        onClick={() => setFocusedIndex(i)}
                        className="group relative aspect-[3/4] overflow-hidden bg-[var(--color-paper-deep)] cursor-pointer"
                      >
                        <Image
                          src={src}
                          alt={`${designer.name} photo ${i + 1}`}
                          fill
                          sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                          className="object-cover transition-transform duration-[900ms] ease-image group-hover:scale-[1.03]"
                        />
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

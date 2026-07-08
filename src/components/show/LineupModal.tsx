"use client";

import { useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ArrowLeft, ArrowRight } from "lucide-react";
import MediaSlot from "@/components/ui/MediaSlot";
import type { ShowDesigner } from "@/lib/content";

interface LineupModalProps {
  designers: ShowDesigner[];
  index: number | null;
  onClose: () => void;
  onNavigate: (index: number) => void;
}

export default function LineupModal({ designers, index, onClose, onNavigate }: LineupModalProps) {
  const designer = index !== null ? designers[index] : null;

  const showPrev = useCallback(() => {
    if (index === null) return;
    onNavigate((index - 1 + designers.length) % designers.length);
  }, [index, designers.length, onNavigate]);

  const showNext = useCallback(() => {
    if (index === null) return;
    onNavigate((index + 1) % designers.length);
  }, [index, designers.length, onNavigate]);

  useEffect(() => {
    if (index === null) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const lenis = (window as Window & { __lenis?: { stop: () => void; start: () => void } }).__lenis;
    lenis?.stop();
    return () => {
      document.body.style.overflow = prev;
      lenis?.start();
    };
  }, [index]);

  useEffect(() => {
    if (index === null) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") showPrev();
      if (e.key === "ArrowRight") showNext();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [index, onClose, showPrev, showNext]);

  return (
    <AnimatePresence>
      {designer && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[80] overflow-y-auto bg-[var(--color-paper)]"
          data-lenis-prevent
        >
          <div className="sticky top-0 z-10 bg-[var(--color-paper)]/90 backdrop-blur-md border-b border-hairline safe-top">
            <div className="max-w-[1800px] mx-auto px-5 md:px-10 lg:px-16 py-5 md:py-6 flex items-center justify-between gap-4">
              <span className="mono-label text-[var(--color-ink-muted)]">
                {String(index! + 1).padStart(2, "0")} / {String(designers.length).padStart(2, "0")}
              </span>
              <button
                onClick={onClose}
                aria-label="Close"
                className="p-2 -mr-2 text-[var(--color-ink)] hover:text-[var(--color-ink-muted)] transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center"
              >
                <X size={20} />
              </button>
            </div>
          </div>

          <div className="relative min-h-[calc(100svh-73px)] flex items-center px-4 md:px-16 py-8">
            <button
              onClick={showPrev}
              aria-label="Previous designer"
              className="absolute left-3 md:left-6 top-1/2 -translate-y-1/2 z-10 p-3 text-[var(--color-ink)] hover:text-[var(--color-ink-muted)] transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center"
            >
              <ArrowLeft size={22} />
            </button>

            <motion.div
              key={designer.id}
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.25 }}
              className="w-full max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-center"
            >
              <MediaSlot
                src={designer.portrait}
                alt={designer.name}
                label="Portrait"
                sublabel={designer.name}
                aspect="aspect-[4/5]"
                className="max-w-sm mx-auto md:mx-0 w-full"
              />
              <div>
                <span className="section-num">({String(index! + 1).padStart(2, "0")})</span>
                <h3 className="font-display font-semibold uppercase text-h1 leading-display mt-3 mb-6">
                  {designer.name}
                </h3>
                {designer.instagramUrl && (
                  <a
                    href={designer.instagramUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hot-text mono-label inline-flex items-center gap-2 border-b border-[var(--color-ink)] pb-1 min-h-[44px] hover:gap-3 hover:border-[var(--color-accent-text)] transition-all"
                  >
                    Instagram <span>→</span>
                  </a>
                )}
              </div>
            </motion.div>

            <button
              onClick={showNext}
              aria-label="Next designer"
              className="absolute right-3 md:right-6 top-1/2 -translate-y-1/2 z-10 p-3 text-[var(--color-ink)] hover:text-[var(--color-ink-muted)] transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center"
            >
              <ArrowRight size={22} />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

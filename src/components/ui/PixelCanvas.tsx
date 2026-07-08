"use client";

import { useEffect, useRef } from "react";
import { motionOK } from "@/lib/motion";

// ============================================================================
// PixelCanvas — the signature "image as data" reveal. An overlay canvas shows
// the sibling <img> as a coarse mosaic with paper seams (halftone/dot-matrix
// flavor) and resolves to the sharp photo when scrolled into view.
//
// Cheap by construction: two drawImage calls per frame (downsample → pixelated
// upscale), a capped backing store, and a one-shot ~900ms rAF tween that is
// interruptible and fully released afterwards. No WebGL, no per-pixel loops.
//
// Gates: does nothing under prefers-reduced-motion / save-data / low-memory /
// low-core (motionOK) — the sharp image is always underneath, so the effect is
// pure progressive enhancement (empty canvas pre-hydration = sharp image).
//
// Usage: render as a sibling AFTER the <img> inside the image's positioned,
// overflow-hidden container. `hover` adds a brief desktop re-pixelate on
// pointer-enter (this replaces the retired b&w→color hover).
// ============================================================================

const PAPER = "#F4F1EA";
const MAX_BACKING_W = 560; // px — it's pixelated; fidelity is irrelevant
const SEAM_MIN_CELL = 7; // draw paper seams only while cells are coarse

interface PixelCanvasProps {
  hover?: boolean;
  /** Coarsest cell size (CSS px) at the start of the reveal. */
  cellStart?: number;
  /** Reveal duration in ms (one-shot). */
  duration?: number;
}

export default function PixelCanvas({
  hover = false,
  cellStart = 22,
  duration = 900,
}: PixelCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !motionOK()) return;
    const holder = canvas.parentElement;
    const img = holder?.querySelector("img");
    const ctx = canvas.getContext("2d");
    if (!holder || !img || !ctx) return;

    const off = document.createElement("canvas");
    const octx = off.getContext("2d");
    if (!octx) return;

    let raf = 0;
    let revealed = false;
    let destroyed = false;
    let observed = false;
    let cell = cellStart;
    // Tween state — retargeting mid-flight starts from the current cell size,
    // so rapid scroll direction changes / hovers never stick or jump.
    let from = cellStart;
    let to = cellStart;
    let t0 = 0;
    let dur = duration;
    let onDone: (() => void) | null = null;

    const easeOut = (p: number) => 1 - Math.pow(2, -10 * Math.min(1, p));

    const size = () => {
      const rect = holder.getBoundingClientRect();
      if (rect.width < 2 || rect.height < 2) return false;
      const scale = Math.min(1, MAX_BACKING_W / rect.width);
      canvas.width = Math.max(2, Math.round(rect.width * scale));
      canvas.height = Math.max(2, Math.round(rect.height * scale));
      return true;
    };

    const draw = () => {
      const w = canvas.width;
      const h = canvas.height;
      const rect = holder.getBoundingClientRect();
      if (!rect.width || !img.naturalWidth) return;

      // object-cover crop of the source image into the holder's box
      const boxAR = rect.width / rect.height;
      const iw = img.naturalWidth;
      const ih = img.naturalHeight;
      let sx = 0;
      let sy = 0;
      let sw = iw;
      let sh = ih;
      if (iw / ih > boxAR) {
        sw = ih * boxAR;
        sx = (iw - sw) / 2;
      } else {
        sh = iw / boxAR;
        sy = (ih - sh) / 2;
      }

      const cols = Math.max(2, Math.round(rect.width / cell));
      const rows = Math.max(2, Math.round(cols / boxAR));
      off.width = cols;
      off.height = rows;
      octx.imageSmoothingEnabled = true;
      octx.drawImage(img, sx, sy, sw, sh, 0, 0, cols, rows);

      ctx.imageSmoothingEnabled = false;
      ctx.fillStyle = PAPER;
      ctx.fillRect(0, 0, w, h);
      ctx.drawImage(off, 0, 0, w, h);

      // Paper seams between cells while coarse — the dot-matrix flavor.
      if (cell >= SEAM_MIN_CELL) {
        const stepX = w / cols;
        const stepY = h / rows;
        ctx.strokeStyle = "rgba(244, 241, 234, 0.9)";
        ctx.lineWidth = 1;
        ctx.beginPath();
        for (let x = 1; x < cols; x++) {
          ctx.moveTo(Math.round(x * stepX) + 0.5, 0);
          ctx.lineTo(Math.round(x * stepX) + 0.5, h);
        }
        for (let y = 1; y < rows; y++) {
          ctx.moveTo(0, Math.round(y * stepY) + 0.5);
          ctx.lineTo(w, Math.round(y * stepY) + 0.5);
        }
        ctx.stroke();
      }
    };

    const tick = (now: number) => {
      const p = dur <= 0 ? 1 : (now - t0) / dur;
      cell = from + (to - from) * easeOut(p);
      draw();
      if (p >= 1) {
        cell = to;
        raf = 0;
        onDone?.();
        onDone = null;
        return;
      }
      raf = requestAnimationFrame(tick);
    };

    const animateTo = (target: number, ms: number, done?: () => void) => {
      from = cell;
      to = target;
      dur = ms;
      t0 = performance.now();
      onDone = done ?? null;
      canvas.style.display = "";
      canvas.style.opacity = "1";
      if (!raf) raf = requestAnimationFrame(tick);
    };

    const hide = () => {
      canvas.style.opacity = "0";
      window.setTimeout(() => {
        if (destroyed || canvas.style.opacity !== "0") return;
        canvas.style.display = "none";
        // One-shot instances are finished for good — release the canvas
        // backing stores and stop watching for resizes (matters on gallery
        // pages with dozens of instances). Hover instances stay live.
        if (!hover) {
          canvas.width = 0;
          canvas.height = 0;
          off.width = 0;
          off.height = 0;
          ro.disconnect();
        }
      }, 280);
    };

    const reveal = () => {
      if (revealed) return;
      revealed = true;
      animateTo(1, duration, hide);
    };

    // Initial coarse frame as soon as the bitmap is available. If the holder
    // has no layout box yet (e.g. the hidden desktop/mobile twin of a lineup
    // card), the ResizeObserver below re-runs this once it gains size — the
    // reveal must never be left permanently unobserved.
    const start = () => {
      if (destroyed || !size()) return;
      draw();
      if (!observed) {
        observed = true;
        io.observe(holder);
      }
    };

    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          io.disconnect();
          reveal();
        }
      },
      { threshold: 0.3 },
    );

    if (img.complete && img.naturalWidth) start();
    else img.addEventListener("load", start, { once: true });

    // Desktop-only hover re-pixelate (subtle, fast, always resolves back).
    let onEnter: (() => void) | null = null;
    let onLeave: (() => void) | null = null;
    if (hover && window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
      onEnter = () => {
        if (!revealed) return;
        animateTo(9, 200);
      };
      onLeave = () => {
        if (!revealed) return;
        animateTo(1, 350, hide);
      };
      holder.addEventListener("pointerenter", onEnter);
      holder.addEventListener("pointerleave", onLeave);
    }

    const ro = new ResizeObserver(() => {
      if (destroyed) return;
      if (!observed) {
        if (img.complete && img.naturalWidth) start();
        return;
      }
      if (canvas.style.display !== "none" && size()) draw();
    });
    ro.observe(holder);

    return () => {
      destroyed = true;
      if (raf) cancelAnimationFrame(raf);
      io.disconnect();
      ro.disconnect();
      img.removeEventListener("load", start);
      if (onEnter) holder.removeEventListener("pointerenter", onEnter);
      if (onLeave) holder.removeEventListener("pointerleave", onLeave);
    };
  }, [hover, cellStart, duration]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className="pointer-events-none absolute inset-0 h-full w-full [image-rendering:pixelated] transition-opacity duration-[250ms]"
    />
  );
}

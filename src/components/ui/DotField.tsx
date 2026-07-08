"use client";

import { useEffect, useRef } from "react";
import { motionOK } from "@/lib/motion";

// ============================================================================
// DotField — the point-cloud layer for dark "system" sections: a sparse grid
// of light dots drifting slowly, displacing slightly near the pointer/finger.
// Budgeted: ≤400 points (spacing widens to hold the cap), 2×2 fillRects, one
// rAF loop that only runs while the section is on screen and the tab visible.
// Skipped entirely under reduced-motion / save-data / low-power.
// ============================================================================

const MAX_POINTS = 400;
const BACKING_SCALE = 0.5; // render at half resolution, CSS-stretched — dots are soft anyway
const DRIFT = 1.5; // backing px of slow drift
const POINTER_R = 45; // backing px displacement radius (≈90 CSS px)
const POINTER_PUSH = 5; // backing px max push

export default function DotField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !motionOK()) return;
    const holder = canvas.parentElement;
    const ctx = canvas.getContext("2d");
    if (!holder || !ctx) return;

    let pts: { x: number; y: number; ph: number; s: number }[] = [];
    let raf = 0;
    let inView = false;
    let t = Math.random() * 100;
    let last = 0;
    let pointer: { x: number; y: number } | null = null;

    const build = () => {
      const rect = holder.getBoundingClientRect();
      canvas.width = Math.max(2, Math.round(rect.width * BACKING_SCALE));
      canvas.height = Math.max(2, Math.round(rect.height * BACKING_SCALE));
      const spacing = Math.max(
        34,
        Math.ceil(Math.sqrt((canvas.width * canvas.height) / MAX_POINTS)),
      );
      pts = [];
      for (let y = spacing / 2; y < canvas.height; y += spacing) {
        for (let x = spacing / 2; x < canvas.width; x += spacing) {
          // deterministic-ish jitter from the grid position, no Math.random per frame
          const ph = ((x * 7 + y * 13) % 97) / 97 * Math.PI * 2;
          pts.push({ x, y, ph, s: 0.4 + ((x + y) % 5) * 0.12 });
        }
      }
    };

    const draw = (now: number) => {
      // Real elapsed time (clamped) so drift speed is refresh-rate independent.
      if (last) t += Math.min((now - last) / 1000, 0.1);
      last = now;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = "rgba(244, 241, 234, 0.28)";
      for (const p of pts) {
        let x = p.x + Math.sin(t * p.s + p.ph) * DRIFT;
        let y = p.y + Math.cos(t * p.s * 0.8 + p.ph) * DRIFT;
        if (pointer) {
          const dx = x - pointer.x;
          const dy = y - pointer.y;
          const d2 = dx * dx + dy * dy;
          if (d2 < POINTER_R * POINTER_R && d2 > 0.01) {
            const d = Math.sqrt(d2);
            const f = (1 - d / POINTER_R) * POINTER_PUSH;
            x += (dx / d) * f;
            y += (dy / d) * f;
          }
        }
        ctx.fillRect(x, y, 2, 2);
      }
      raf = inView && !document.hidden ? requestAnimationFrame(draw) : 0;
    };

    const start = () => {
      if (!raf && inView && !document.hidden) raf = requestAnimationFrame(draw);
    };
    const stop = () => {
      if (raf) cancelAnimationFrame(raf);
      raf = 0;
      last = 0;
    };

    const io = new IntersectionObserver(
      (entries) => {
        inView = entries.some((e) => e.isIntersecting);
        if (inView) start();
        else stop();
      },
      { rootMargin: "10% 0px" },
    );

    const onMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      pointer = {
        x: (e.clientX - rect.left) * BACKING_SCALE,
        y: (e.clientY - rect.top) * BACKING_SCALE,
      };
    };
    const onLeave = () => {
      pointer = null;
    };
    const onVisibility = () => (document.hidden ? stop() : start());

    build();
    io.observe(holder);
    holder.addEventListener("pointermove", onMove, { passive: true });
    holder.addEventListener("pointerleave", onLeave);
    document.addEventListener("visibilitychange", onVisibility);
    const ro = new ResizeObserver(build);
    ro.observe(holder);

    return () => {
      stop();
      io.disconnect();
      ro.disconnect();
      holder.removeEventListener("pointermove", onMove);
      holder.removeEventListener("pointerleave", onLeave);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className="pointer-events-none absolute inset-0 h-full w-full"
    />
  );
}

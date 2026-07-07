"use client";

import { useEffect, useRef } from "react";
import SectionTag from "@/components/ui/SectionTag";
import WipePanel from "@/components/ui/WipePanel";
import EditionCover from "@/components/show/EditionCover";
import { pastEditions, sectionIndex } from "@/lib/content";
import { MQ_POINTER_FINE, prefersLiteMotion } from "@/lib/motion";

/**
 * The five-year archive as a coverflow. One implementation for both breakpoints:
 * a scroll-snap track where each cover angles + scales by its distance from
 * centre. Desktop adds pointer-drag-to-scroll. Reduced-motion / data-saver skips
 * the transform → a flat scrollable row.
 */
export default function PastEditions() {
  const trackRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef(0);

  // Coverflow transform — angle + scale each cover by distance from centre.
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches || prefersLiteMotion()) return;

    const items = Array.from(track.querySelectorAll<HTMLElement>(".edition-item"));
    const update = () => {
      rafRef.current = 0;
      const center = track.scrollLeft + track.clientWidth / 2;
      items.forEach((item) => {
        const itemCenter = item.offsetLeft + item.offsetWidth / 2;
        const d = Math.max(-1, Math.min(1, ((itemCenter - center) / track.clientWidth) * 1.6));
        const rotateY = d * -18;
        const scale = 1 - Math.min(Math.abs(d), 1) * 0.12;
        item.style.transform = `perspective(1200px) rotateY(${rotateY}deg) scale(${scale})`;
        item.style.zIndex = String(100 - Math.round(Math.abs(d) * 100));
      });
    };
    const onScroll = () => {
      if (!rafRef.current) rafRef.current = requestAnimationFrame(update);
    };
    track.addEventListener("scroll", onScroll, { passive: true });
    update();
    return () => track.removeEventListener("scroll", onScroll);
  }, []);

  // Desktop pointer-drag to scroll; suppress the click that ends a drag.
  useEffect(() => {
    const track = trackRef.current;
    if (!track || !window.matchMedia(MQ_POINTER_FINE).matches) return;
    let down = false;
    let startX = 0;
    let startScroll = 0;
    let moved = false;
    const onDown = (e: PointerEvent) => {
      down = true;
      moved = false;
      startX = e.clientX;
      startScroll = track.scrollLeft;
      track.classList.add("cursor-grabbing");
    };
    const onMove = (e: PointerEvent) => {
      if (!down) return;
      const dx = e.clientX - startX;
      if (Math.abs(dx) > 4) moved = true;
      track.scrollLeft = startScroll - dx;
    };
    const onUp = () => {
      down = false;
      track.classList.remove("cursor-grabbing");
    };
    const onClickCapture = (e: MouseEvent) => {
      if (moved) {
        e.preventDefault();
        e.stopPropagation();
      }
    };
    track.addEventListener("pointerdown", onDown);
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);
    track.addEventListener("click", onClickCapture, true);
    return () => {
      track.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
      track.removeEventListener("click", onClickCapture, true);
    };
  }, []);

  return (
    <WipePanel id="editions" className="py-section" texture>
      <div className="container">
        <SectionTag index={sectionIndex("editions")} label="Past Issues" className="mb-4" />
        <h2 className="font-display font-semibold uppercase leading-display tracking-tight text-h1 mb-16">
          01 — 05
        </h2>
      </div>

      <div
        ref={trackRef}
        data-cursor="DRAG"
        data-lenis-prevent
        className="flex gap-6 overflow-x-auto snap-x snap-mandatory scrollbar-hide py-10 px-[15vw] md:px-[calc(50%-160px)] cursor-grab"
      >
        {pastEditions.map((edition, i) => (
          <div
            key={edition.issue}
            className="edition-item shrink-0 snap-center w-[70vw] md:w-[320px] will-change-transform"
          >
            <EditionCover edition={edition} priority={i === 0} />
          </div>
        ))}
      </div>
    </WipePanel>
  );
}

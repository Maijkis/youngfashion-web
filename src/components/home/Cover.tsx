"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { gsap } from "gsap";

const IMAGE = "/behind-the-scenes/2025/IMG_0049.jpg";

export default function Cover() {
  const imgRef = useRef<HTMLDivElement>(null);
  const markRef = useRef<HTMLDivElement>(null);
  const metaTopRef = useRef<HTMLDivElement>(null);
  const metaBotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
    if (imgRef.current) {
      tl.fromTo(imgRef.current, { scale: 1.05 }, { scale: 1, duration: 2.4 }, 0);
    }
    if (metaTopRef.current) {
      tl.fromTo(
        metaTopRef.current.children,
        { y: 10, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7, stagger: 0.08 },
        0.2
      );
    }
    const marks = markRef.current?.querySelectorAll(".mark-line");
    if (marks?.length) {
      tl.fromTo(
        marks,
        { y: 60, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, stagger: 0.1 },
        0.35
      );
    }
    if (metaBotRef.current) {
      tl.fromTo(
        metaBotRef.current.children,
        { y: 10, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7, stagger: 0.08 },
        0.9
      );
    }
  }, []);

  return (
    <section
      id="cover"
      className="relative w-full h-[100svh] overflow-hidden bg-white"
    >
      <div ref={imgRef} className="absolute inset-0 will-change-transform">
        <Image
          src={IMAGE}
          alt=""
          fill
          sizes="100vw"
          priority
          quality={75}
          className="object-cover"
        />
      </div>

      {/* Subtle tint for text legibility — lighter than before */}
      <div className="absolute inset-0 bg-black/20 pointer-events-none" />

      {/* Top row — edition stamp + place */}
      <div
        ref={metaTopRef}
        className="relative z-10 px-5 md:px-10 lg:px-16 pt-24 md:pt-28 flex items-start justify-between"
      >
        <span className="text-[10px] md:text-[11px] uppercase tracking-[0.32em] text-white font-medium">
          No. 5 — Young Fashion
        </span>
        <span className="text-[10px] md:text-[11px] uppercase tracking-[0.32em] text-white font-medium">
          Vilnius, LT
        </span>
      </div>

      {/* The mark — huge, thin, one word per line */}
      <div className="relative z-10 h-full flex flex-col justify-end px-5 md:px-10 lg:px-16 pb-16 md:pb-20 safe-bottom">
        <div ref={markRef}>
          <div className="mark-line overflow-hidden">
            <span className="block text-white font-light leading-[0.88] tracking-[-0.025em] text-[clamp(4.5rem,18vw,14rem)]">
              19.09
            </span>
          </div>
          <div className="mark-line overflow-hidden">
            <span className="block text-white font-light leading-[0.88] tracking-[-0.025em] text-[clamp(4.5rem,18vw,14rem)] -mt-1">
              2026
            </span>
          </div>
        </div>

        <div
          ref={metaBotRef}
          className="mt-8 md:mt-10 flex items-end justify-between gap-6"
        >
          <p className="max-w-[26ch] text-white/90 text-sm md:text-base font-light leading-snug">
            The fifth edition of Young Fashion lands this September — new voices on the Vilnius runway.
          </p>
          <Link
            href="/events/young-fashion-2026"
            className="group shrink-0 inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.28em] text-white font-medium border-b border-white/80 pb-1 min-h-[44px] hover:gap-3 transition-all"
          >
            RSVP
            <span>→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}

"use client";

import { useEffect, useLayoutEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type Look = {
  id: string;
  number: string;
  title: string;
  designer: string;
  image: string;
  offsetX: number;
};

const LOOKS: Look[] = [
  {
    id: "look-01",
    number: "01",
    title: "Threshold",
    designer: "Atira Gram",
    image: "https://picsum.photos/seed/yf-runway-1/800/1200",
    offsetX: -8,
  },
  {
    id: "look-02",
    number: "02",
    title: "Body Without Borders",
    designer: "Liutauras Suvorovas",
    image: "https://picsum.photos/seed/yf-runway-2/800/1200",
    offsetX: 6,
  },
  {
    id: "look-03",
    number: "03",
    title: "Delicacies",
    designer: "Mateuš Krajevski",
    image: "https://picsum.photos/seed/yf-runway-3/800/1200",
    offsetX: -5,
  },
  {
    id: "look-04",
    number: "04",
    title: "Plikbajoriai",
    designer: "Lukas Svirplis",
    image: "https://picsum.photos/seed/yf-runway-4/800/1200",
    offsetX: 7,
  },
  {
    id: "look-05",
    number: "05",
    title: "Each Water",
    designer: "Karina Panina",
    image: "https://picsum.photos/seed/yf-runway-5/800/1200",
    offsetX: 0,
  },
];

const SCROLL_PER_LOOK = 120;

export default function Runway() {
  const rootRef = useRef<HTMLDivElement>(null);
  const lookRefs = useRef<(HTMLDivElement | null)[]>([]);
  const titleRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    document.documentElement.style.background = "#0a0a0a";
    document.body.style.background = "#0a0a0a";
    document.body.dataset.runway = "true";

    const lenis = (window as Window & { __lenis?: { stop: () => void; start: () => void } }).__lenis;
    lenis?.stop();

    return () => {
      delete document.body.dataset.runway;
      document.documentElement.style.background = "";
      document.body.style.background = "";
      lenis?.start();
    };
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const total = LOOKS.length;

      LOOKS.forEach((look, i) => {
        const el = lookRefs.current[i];
        if (!el) return;

        const startVH = i * SCROLL_PER_LOOK;
        const endVH = startVH + SCROLL_PER_LOOK;

        gsap.set(el, {
          scale: 0.05,
          opacity: 0,
          xPercent: look.offsetX,
          yPercent: -50,
          willChange: "transform, opacity",
        });

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: rootRef.current,
            start: `${startVH}% top`,
            end: `${endVH}% top`,
            scrub: 1,
            invalidateOnRefresh: true,
          },
        });

        tl.to(el, {
          scale: 1.6,
          opacity: 1,
          ease: "power2.inOut",
          duration: 0.6,
        })
          .to(
            el,
            {
              opacity: 1,
              ease: "none",
              duration: 0.15,
            },
            ">"
          )
          .to(el, {
            scale: 4,
            opacity: 0,
            ease: "power2.in",
            duration: 0.25,
          });

        const titleEl = el.querySelector<HTMLDivElement>(".look-meta");
        if (titleEl) {
          gsap.fromTo(
            titleEl,
            { y: 24, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              ease: "power3.out",
              scrollTrigger: {
                trigger: rootRef.current,
                start: `${startVH + 35}% top`,
                end: `${startVH + 60}% top`,
                scrub: 1,
              },
            }
          );
        }
      });

      if (titleRef.current) {
        gsap.to(titleRef.current, {
          opacity: 0,
          y: -20,
          ease: "power2.out",
          scrollTrigger: {
            trigger: rootRef.current,
            start: "0% top",
            end: "8% top",
            scrub: 1,
          },
        });
      }

      ScrollTrigger.refresh();
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={rootRef}
      className="runway-root relative w-full"
      style={{ height: `${LOOKS.length * SCROLL_PER_LOOK + 100}vh` }}
    >
      {/* Fixed viewport — the camera */}
      <div className="fixed inset-0 overflow-hidden bg-[#0a0a0a]">
        {/* Spotlight gradient */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 60% 70% at 50% 45%, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.02) 40%, rgba(0,0,0,0) 70%)",
          }}
        />

        {/* Floor perspective lines */}
        <div
          className="absolute inset-x-0 bottom-0 h-[55%] pointer-events-none opacity-[0.08]"
          style={{
            background:
              "linear-gradient(to top, #ffffff 0%, transparent 100%)",
            maskImage:
              "linear-gradient(to right, transparent 30%, #000 50%, transparent 70%)",
            WebkitMaskImage:
              "linear-gradient(to right, transparent 30%, #000 50%, transparent 70%)",
          }}
        />

        {/* Looks — each absolutely centered, GSAP drives transforms */}
        {LOOKS.map((look, i) => (
          <div
            key={look.id}
            ref={(el) => {
              lookRefs.current[i] = el;
            }}
            className="absolute left-1/2 top-1/2 -translate-x-1/2 will-change-transform"
            style={{ width: "min(28vw, 360px)" }}
          >
            <div className="relative aspect-[2/3] overflow-hidden bg-neutral-900 shadow-[0_40px_120px_-40px_rgba(0,0,0,0.9)]">
              <Image
                src={look.image}
                alt={`Look ${look.number} — ${look.title}`}
                fill
                sizes="360px"
                className="object-cover"
                unoptimized
                priority={i < 2}
              />
            </div>
            <div className="look-meta absolute -bottom-20 left-1/2 -translate-x-1/2 text-center whitespace-nowrap">
              <div
                className="text-[10px] uppercase tracking-[0.4em] text-white/60 mb-2"
                style={{ fontFamily: "var(--font-sans)" }}
              >
                Look {look.number}
              </div>
              <div
                className="text-2xl md:text-3xl text-white font-light"
                style={{ fontFamily: "var(--font-serif, Georgia, serif)" }}
              >
                {look.title}
              </div>
              <div
                className="text-[11px] uppercase tracking-[0.32em] text-white/50 mt-2"
                style={{ fontFamily: "var(--font-sans)" }}
              >
                {look.designer}
              </div>
            </div>
          </div>
        ))}

        {/* Top UI — logo */}
        <div
          ref={titleRef}
          className="absolute top-0 left-0 right-0 pt-8 md:pt-10 px-6 flex items-center justify-between z-10 pointer-events-none"
        >
          <span
            className="text-[10px] uppercase tracking-[0.4em] text-white/60"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            No. 5 — Young Fashion
          </span>
          <span
            className="text-2xl md:text-3xl text-white font-light tracking-[0.05em]"
            style={{ fontFamily: "var(--font-serif, Georgia, serif)" }}
          >
            YF
          </span>
          <span
            className="text-[10px] uppercase tracking-[0.4em] text-white/60"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            SS · 2026
          </span>
        </div>

        {/* Bottom UI — scroll cue */}
        <div className="absolute bottom-8 md:bottom-10 left-0 right-0 flex flex-col items-center gap-3 z-10 pointer-events-none">
          <span
            className="text-[9px] uppercase tracking-[0.5em] text-white/50 animate-pulse"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            Scroll to walk
          </span>
          <div className="h-10 w-px bg-gradient-to-b from-white/60 to-transparent" />
        </div>
      </div>

      <style jsx global>{`
        body[data-runway="true"] nav,
        body[data-runway="true"] footer {
          display: none !important;
        }
        body[data-runway="true"] {
          overflow-x: hidden;
        }
      `}</style>
    </div>
  );
}

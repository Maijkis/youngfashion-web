"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import Image from "next/image";
import { gsap } from "gsap";

const SLIDES = [
  {
    image: "/events/2022/DSC_6382.jpg",
    heading: "YOUNG\nFASHION",
    sub: "Vilnius Est. 2022",
  },
  {
    image: "/events/2022/DSC_6421.jpg",
    heading: "EMERGING\nDESIGNERS",
    sub: "New voices from Lithuania",
  },
  {
    image: "/behind-the-scenes/2025/IMG_0049.jpg",
    heading: "RUNWAY\nREIMAGINED",
    sub: "National Art Gallery 2024",
  },
  {
    image: "/events/2022/DSC_6436.jpg",
    heading: "CRAFTED\nWITH PURPOSE",
    sub: "Every stitch tells a story",
  },
  {
    image: "/behind-the-scenes/2025/IMG_0115.jpg",
    heading: "JOIN THE\nMOVEMENT",
    sub: "Vilnius and beyond",
  },
];

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [current, setCurrent] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const autoPlayRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const headingRefs = useRef<(HTMLDivElement | null)[]>([]);
  const subRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const imageRefs = useRef<(HTMLDivElement | null)[]>([]);
  const progressRef = useRef<HTMLDivElement>(null);

  const goTo = useCallback(
    (next: number) => {
      if (isAnimating || next === current) return;
      setIsAnimating(true);

      const tl = gsap.timeline({
        onComplete: () => {
          setCurrent(next);
          setIsAnimating(false);
        },
      });

      // Fade out current heading lines
      const currentLines = headingRefs.current[current]?.querySelectorAll(".hero-line");
      if (currentLines) {
        tl.to(currentLines, {
          y: -60,
          opacity: 0,
          duration: 0.4,
          stagger: 0.05,
          ease: "power3.in",
        }, 0);
      }

      // Fade out current sub
      if (subRefs.current[current]) {
        tl.to(subRefs.current[current], {
          opacity: 0,
          y: -20,
          duration: 0.3,
          ease: "power2.in",
        }, 0);
      }

      // Crossfade images
      if (imageRefs.current[current]) {
        tl.to(imageRefs.current[current], {
          opacity: 0,
          scale: 1.05,
          duration: 0.8,
          ease: "power2.inOut",
        }, 0.1);
      }

      if (imageRefs.current[next]) {
        gsap.set(imageRefs.current[next], { opacity: 0, scale: 1.1 });
        tl.to(imageRefs.current[next], {
          opacity: 1,
          scale: 1,
          duration: 0.8,
          ease: "power2.inOut",
        }, 0.2);
      }

      // Reveal next heading lines
      const nextLines = headingRefs.current[next]?.querySelectorAll(".hero-line");
      if (nextLines) {
        gsap.set(nextLines, { y: 80, opacity: 0 });
        tl.to(nextLines, {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.08,
          ease: "power3.out",
        }, 0.4);
      }

      // Reveal next sub
      if (subRefs.current[next]) {
        gsap.set(subRefs.current[next], { opacity: 0, y: 20 });
        tl.to(subRefs.current[next], {
          opacity: 1,
          y: 0,
          duration: 0.5,
          ease: "power2.out",
        }, 0.6);
      }
    },
    [current, isAnimating]
  );

  const next = useCallback(() => {
    goTo((current + 1) % SLIDES.length);
  }, [current, goTo]);

  // Auto-advance every 4s
  useEffect(() => {
    autoPlayRef.current = setInterval(next, 4000);
    return () => {
      if (autoPlayRef.current) clearInterval(autoPlayRef.current);
    };
  }, [next]);

  // Reset autoplay on manual interaction
  const resetAutoplay = useCallback(() => {
    if (autoPlayRef.current) clearInterval(autoPlayRef.current);
    autoPlayRef.current = setInterval(next, 4000);
  }, [next]);

  // Initial animation
  useEffect(() => {
    const lines = headingRefs.current[0]?.querySelectorAll(".hero-line");
    if (lines) {
      gsap.fromTo(
        lines,
        { y: 100, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, stagger: 0.12, ease: "power3.out", delay: 0.3 }
      );
    }
    if (subRefs.current[0]) {
      gsap.fromTo(
        subRefs.current[0],
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power2.out", delay: 0.8 }
      );
    }

    // Progress bar animation
    if (progressRef.current) {
      gsap.fromTo(
        progressRef.current,
        { scaleX: 0 },
        { scaleX: 1, duration: 4, ease: "none", repeat: -1 }
      );
    }
  }, []);

  // Restart progress bar on slide change
  useEffect(() => {
    if (progressRef.current) {
      gsap.killTweensOf(progressRef.current);
      gsap.fromTo(
        progressRef.current,
        { scaleX: 0 },
        { scaleX: 1, duration: 4, ease: "none", repeat: -1 }
      );
    }
  }, [current]);

  const handleClick = (e: React.MouseEvent) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = e.clientX - rect.left;
    if (x < rect.width / 2) {
      goTo(current === 0 ? SLIDES.length - 1 : current - 1);
    } else {
      goTo((current + 1) % SLIDES.length);
    }
    resetAutoplay();
  };

  const scrollPast = () => {
    const el = containerRef.current;
    if (!el) return;
    const nextSection = el.nextElementSibling as HTMLElement | null;
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: "smooth" });
    } else {
      window.scrollBy({ top: window.innerHeight, behavior: "smooth" });
    }
  };

  return (
    <div
      ref={containerRef}
      onClick={handleClick}
      className="relative w-full h-screen overflow-hidden bg-black cursor-pointer select-none"
    >
      {/* Images */}
      {SLIDES.map((slide, i) => (
        <div
          key={i}
          ref={(el) => { imageRefs.current[i] = el; }}
          className="absolute inset-0"
          style={{ opacity: i === 0 ? 1 : 0 }}
        >
          <Image
            src={slide.image}
            alt={slide.heading.replace("\n", " ")}
            fill
            sizes="100vw"
            priority={i === 0}
            quality={80}
            className="object-cover"
          />
          {/* Dark overlay for text readability */}
          <div className="absolute inset-0 bg-black/40" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />
        </div>
      ))}

      {/* Text content */}
      <div className="absolute inset-0 flex flex-col justify-end pb-24 md:pb-32 px-6 md:px-12 lg:px-20 z-10">
        {SLIDES.map((slide, i) => (
          <div
            key={i}
            ref={(el) => { headingRefs.current[i] = el; }}
            className={`absolute bottom-24 md:bottom-32 left-6 md:left-12 lg:left-20 right-6 md:right-12 lg:right-20 ${
              i === current ? "pointer-events-auto" : "pointer-events-none"
            }`}
            style={{ display: i === current ? "block" : "none" }}
          >
            <div className="overflow-hidden mb-4">
              {slide.heading.split("\n").map((line, j) => (
                <div
                  key={j}
                  className="hero-line overflow-hidden"
                >
                  <span className="block text-[clamp(3rem,10vw,9rem)] font-bold leading-[0.9] tracking-[-0.03em] text-white uppercase">
                    {line}
                  </span>
                </div>
              ))}
            </div>
            <span
              ref={(el) => { subRefs.current[i] = el; }}
              className="block text-xs md:text-sm uppercase tracking-[0.25em] text-white/60 font-light"
              style={{ opacity: i === 0 ? 1 : 0 }}
            >
              {slide.sub}
            </span>
          </div>
        ))}
      </div>

      {/* Slide indicators */}
      <div className="absolute bottom-8 md:bottom-12 left-6 md:left-12 lg:left-20 z-20 flex items-center gap-3">
        {SLIDES.map((_, i) => (
          <button
            key={i}
            onClick={(e) => {
              e.stopPropagation();
              goTo(i);
              resetAutoplay();
            }}
            className={`h-[2px] transition-all duration-500 ${
              i === current ? "w-10 bg-white" : "w-5 bg-white/30 hover:bg-white/50"
            }`}
            aria-label={`Slide ${i + 1}`}
          />
        ))}
        <span className="ml-3 text-[10px] uppercase tracking-[0.2em] text-white/40 tabular-nums">
          {String(current + 1).padStart(2, "0")} / {String(SLIDES.length).padStart(2, "0")}
        </span>
      </div>

      {/* Progress bar */}
      <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-white/10 z-20">
        <div
          ref={progressRef}
          className="h-full bg-white/50 origin-left"
        />
      </div>

      {/* Scroll indicator */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          scrollPast();
        }}
        className="absolute bottom-8 md:bottom-12 right-6 md:right-12 lg:right-20 z-20 flex flex-col items-center gap-2 group"
        aria-label="Scroll down"
      >
        <span className="text-[9px] uppercase tracking-[0.2em] text-white/40 group-hover:text-white/70 transition-colors writing-vertical-rl">
          scroll
        </span>
        <div className="w-px h-8 bg-gradient-to-b from-white/40 to-transparent group-hover:from-white/70 transition-colors animate-pulse" />
      </button>

      {/* Brand watermark top-left */}
      <div className="absolute top-24 md:top-28 left-6 md:left-12 lg:left-20 z-10">
        <span className="text-[10px] uppercase tracking-[0.3em] text-white/30 font-medium">
          Young Fashion &mdash; Vilnius
        </span>
      </div>
    </div>
  );
}

"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { designers } from "@/lib/mockData";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function DesignersShowcase() {
  const featured = designers.slice(0, 8);
  const sectionRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const cardsRef = useRef<(HTMLAnchorElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (headingRef.current) {
        gsap.fromTo(
          headingRef.current,
          { y: 50, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: headingRef.current,
              start: "top 85%",
              toggleActions: "play none none none",
            },
          }
        );
      }

      cardsRef.current.forEach((card, i) => {
        if (!card) return;
        gsap.fromTo(
          card,
          { y: 60, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            delay: i * 0.08,
            ease: "power3.out",
            scrollTrigger: {
              trigger: card,
              start: "top 90%",
              toggleActions: "play none none none",
            },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-16 md:py-28 px-6 md:px-12 lg:px-20">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-10 md:mb-14">
          <div>
            <span className="text-[10px] uppercase tracking-[0.25em] text-white/30 font-bold block mb-3">
              Featured
            </span>
            <h2
              ref={headingRef}
              className="text-3xl md:text-5xl font-bold uppercase tracking-[-0.02em] text-white leading-[0.95]"
            >
              Designers
            </h2>
          </div>
          <Link
            href="/galleries"
            className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.18em] text-white/40 hover:text-white transition-colors duration-300 font-medium"
          >
            See all
            <ArrowRight size={14} />
          </Link>
        </div>

        {/* Horizontal scrollable on mobile, 4-col grid on desktop */}
        <div className="flex gap-3 md:gap-4 overflow-x-auto pb-4 md:pb-0 md:grid md:grid-cols-4 md:overflow-visible scrollbar-hide">
          {featured.map((designer, i) => (
            <Link
              key={designer.id}
              ref={(el) => { cardsRef.current[i] = el; }}
              href="/galleries"
              className="group block flex-shrink-0 w-[200px] md:w-auto"
            >
              <div className="relative aspect-[3/4] overflow-hidden mb-3">
                <Image
                  src={designer.image}
                  alt={designer.name}
                  fill
                  sizes="(max-width: 768px) 200px, 25vw"
                  className="object-cover transition-all duration-700 group-hover:scale-105 grayscale group-hover:grayscale-0"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500" />
              </div>
              <p className="text-[10px] uppercase tracking-[0.2em] text-white/30 mb-0.5">
                {designer.year}
              </p>
              <h3 className="text-sm font-bold uppercase tracking-[0.02em] text-white/80 group-hover:text-white transition-colors">
                {designer.name}
              </h3>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

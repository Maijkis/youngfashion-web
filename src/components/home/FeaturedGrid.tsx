"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const features = [
  {
    title: "Galleries",
    subtitle: "Designer Collections",
    image: "/photowall/2025/KristinaPetrikonyte-4184835.jpg",
    href: "/galleries",
    num: "01",
  },
  {
    title: "Events",
    subtitle: "Runway & Beyond",
    image: "/events/2022/DSC_6421.jpg",
    href: "/events",
    num: "02",
  },
  {
    title: "Press",
    subtitle: "In the Media",
    image: "/behind-the-scenes/2025/IMG_0049.jpg",
    href: "/press-partners",
    num: "03",
  },
];

export default function FeaturedGrid() {
  const cardsRef = useRef<(HTMLAnchorElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      cardsRef.current.forEach((card, i) => {
        if (!card) return;
        gsap.fromTo(
          card,
          { y: 80, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            delay: i * 0.15,
            ease: "power3.out",
            scrollTrigger: {
              trigger: card,
              start: "top 85%",
              toggleActions: "play none none none",
            },
          }
        );
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <section className="py-16 md:py-28 px-6 md:px-12 lg:px-20">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5">
          {features.map((feature, i) => (
            <Link
              key={feature.title}
              ref={(el) => { cardsRef.current[i] = el; }}
              href={feature.href}
              className="group relative block aspect-[3/4] overflow-hidden"
            >
              <Image
                src={feature.image}
                alt={feature.title}
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/30 group-hover:bg-black/20 transition-colors duration-500" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />

              {/* Number */}
              <span className="absolute top-5 left-5 text-[10px] tracking-[0.2em] text-white/40 font-medium">
                {feature.num}
              </span>

              {/* Content */}
              <div className="absolute bottom-0 left-0 right-0 p-5 md:p-6">
                <p className="text-[10px] uppercase tracking-[0.25em] text-white/50 mb-2">
                  {feature.subtitle}
                </p>
                <div className="flex items-end justify-between">
                  <h3 className="text-2xl md:text-3xl font-bold uppercase tracking-[-0.01em] text-white">
                    {feature.title}
                  </h3>
                  <ArrowRight
                    size={18}
                    className="text-white/40 group-hover:text-white group-hover:translate-x-1 transition-all duration-300 mb-1"
                  />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

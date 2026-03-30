"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { designers } from "@/lib/mockData";
import AnimatedSection from "@/components/ui/AnimatedSection";
import SectionHeader from "@/components/ui/SectionHeader";

export default function DesignersShowcase() {
  const featured = designers.slice(0, 8);

  return (
    <section className="py-16 md:py-28 px-4 md:px-6">
      <div className="max-w-7xl mx-auto">
        <SectionHeader
          title="Featured Designers"
          subtitle="Emerging talent from Lithuania"
        />

        {/* Horizontal scrollable strip on mobile, grid on desktop */}
        <div className="flex gap-4 overflow-x-auto pb-4 md:pb-0 md:grid md:grid-cols-4 md:overflow-visible scrollbar-hide">
          {featured.map((designer, i) => (
            <AnimatedSection key={designer.id} delay={i * 0.08}>
              <Link href="/galleries" className="group block flex-shrink-0 w-[220px] md:w-auto">
                <div className="relative aspect-[3/4] overflow-hidden rounded-sm">
                  <Image
                    src={designer.image}
                    alt={designer.name}
                    fill
                    sizes="(max-width: 768px) 220px, 25vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105 grayscale group-hover:grayscale-0"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <p className="text-[10px] uppercase tracking-[0.2em] text-white/50 mb-1">
                      {designer.year}
                    </p>
                    <h3 className="text-sm font-light uppercase tracking-[0.1em] text-white">
                      {designer.name}
                    </h3>
                  </div>
                </div>
              </Link>
            </AnimatedSection>
          ))}
        </div>

        <AnimatedSection delay={0.4}>
          <div className="mt-8 md:mt-12 text-center">
            <Link
              href="/galleries"
              className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.15em] text-muted hover:text-white transition-colors duration-300"
            >
              See all designers
              <ArrowRight size={14} />
            </Link>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}

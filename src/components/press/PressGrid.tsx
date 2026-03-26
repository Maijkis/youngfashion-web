"use client";

import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { pressArticles } from "@/lib/mockData";
import AnimatedSection from "@/components/ui/AnimatedSection";
import SectionHeader from "@/components/ui/SectionHeader";

export default function PressGrid() {
  return (
    <section className="py-12 md:py-20 px-4 md:px-6">
      <div className="max-w-5xl mx-auto">
        <SectionHeader title="In the Press" subtitle="What the media says about us" />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          {pressArticles.map((article, i) => (
            <AnimatedSection key={article.id} delay={i * 0.08}>
              <a
                href={article.link}
                target="_blank"
                rel="noopener noreferrer"
                className="group block glass-card rounded-sm overflow-hidden"
              >
                {/* Thumbnail */}
                <div className="relative aspect-[16/9] overflow-hidden">
                  <Image
                    src={article.thumbnail}
                    alt={article.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-500" />
                </div>

                {/* Content */}
                <div className="p-4 md:p-6">
                  <p className="text-[9px] md:text-[10px] uppercase tracking-[0.2em] text-white/40 mb-2 md:mb-3">
                    {article.publication} &middot;{" "}
                    {new Date(article.date).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                    })}
                  </p>
                  <h3 className="text-sm md:text-base font-light uppercase tracking-[0.03em] text-white mb-2 md:mb-3 leading-snug">
                    {article.title}
                  </h3>
                  <p className="text-[11px] md:text-xs text-white/50 leading-relaxed mb-3 md:mb-4">
                    {article.excerpt}
                  </p>
                  <div className="flex items-center gap-2 text-[10px] md:text-xs uppercase tracking-[0.15em] text-white/70 group-hover:text-white group-hover:gap-3 transition-all duration-300">
                    Read Article
                    <ArrowUpRight size={12} />
                  </div>
                </div>
              </a>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}

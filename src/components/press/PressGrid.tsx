"use client";

import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { pressArticles } from "@/lib/mockData";
import AnimatedSection from "@/components/ui/AnimatedSection";
import SectionHeader from "@/components/ui/SectionHeader";

export default function PressGrid() {
  return (
    <section className="py-12 md:py-24 px-6 md:px-12 lg:px-20">
      <div className="max-w-7xl mx-auto">
        <SectionHeader title="In the Press" subtitle="What the media says about us" />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
          {pressArticles.map((article, i) => (
            <AnimatedSection key={article.id} delay={i * 0.08}>
              <a
                href={article.link}
                target="_blank"
                rel="noopener noreferrer"
                className="group block overflow-hidden"
              >
                <div className="relative aspect-[16/9] overflow-hidden mb-4">
                  <Image
                    src={article.thumbnail}
                    alt={article.title}
                    fill
                    className="object-cover transition-all duration-700 group-hover:scale-105 grayscale group-hover:grayscale-0"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500" />
                </div>

                <p className="text-[10px] uppercase tracking-[0.2em] text-white/30 mb-2 font-medium">
                  {article.publication} &middot;{" "}
                  {new Date(article.date).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                  })}
                </p>
                <h3 className="text-sm md:text-base font-bold uppercase tracking-[-0.01em] text-white mb-2 leading-snug">
                  {article.title}
                </h3>
                <p className="text-xs text-white/40 leading-relaxed mb-3">
                  {article.excerpt}
                </p>
                <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] text-white/40 group-hover:text-white group-hover:gap-3 transition-all duration-300 font-bold">
                  Read Article
                  <ArrowUpRight size={12} />
                </div>
              </a>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}

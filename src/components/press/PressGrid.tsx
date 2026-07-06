"use client";

import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { pressArticles } from "@/lib/mockData";
import AnimatedSection from "@/components/ui/AnimatedSection";
import SectionHeader from "@/components/ui/SectionHeader";

export default function PressGrid() {
  return (
    <section className="py-16 md:py-24 px-5 md:px-10 lg:px-16">
      <div className="max-w-7xl mx-auto">
        <SectionHeader title="In the press" subtitle="What the media said" />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-12">
          {pressArticles.map((article, i) => (
            <AnimatedSection key={article.id} delay={i * 0.06}>
              <a
                href={article.link}
                target="_blank"
                rel="noopener noreferrer"
                className="group block"
              >
                <div className="relative aspect-[16/10] overflow-hidden bg-[var(--color-paper-deep)] border border-hairline mb-5">
                  <Image
                    src={article.thumbnail}
                    alt={article.title}
                    fill
                    className="object-cover transition-all duration-[900ms] ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:scale-[1.03]"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>

                <div className="flex items-center gap-3 mb-3">
                  <span className="mono-label text-[var(--color-ink-muted)]">
                    {article.publication}
                  </span>
                  <span className="w-1 h-1 rounded-full bg-[var(--color-ink)]/30" />
                  <span className="mono-label text-[var(--color-ink-muted)]">
                    {new Date(article.date).toLocaleDateString("en-US", {
                      month: "short",
                      year: "numeric",
                    })}
                  </span>
                </div>

                <h3 className="font-light text-[var(--color-ink)] leading-[1.2] tracking-[-0.01em] text-lg md:text-xl mb-3">
                  {article.title}
                </h3>

                <p className="text-sm text-[var(--color-ink)]/65 font-light leading-relaxed mb-4 line-clamp-3">
                  {article.excerpt}
                </p>

                <span className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.28em] text-[var(--color-ink)] font-medium border-b border-[var(--color-ink)] pb-1 group-hover:gap-3 transition-all">
                  Read article
                  <ArrowUpRight size={14} />
                </span>
              </a>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}

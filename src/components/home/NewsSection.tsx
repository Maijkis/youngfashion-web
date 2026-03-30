"use client";

import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { pressArticles } from "@/lib/mockData";
import AnimatedSection from "@/components/ui/AnimatedSection";
import SectionHeader from "@/components/ui/SectionHeader";
import Button from "@/components/ui/Button";

export default function NewsSection() {
  const latest = pressArticles.slice(0, 3);

  return (
    <section className="py-16 md:py-28 px-6 md:px-12 lg:px-20">
      <div className="max-w-7xl mx-auto">
        <SectionHeader
          title="Latest"
          subtitle="From our creative community"
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
          {latest.map((article, i) => (
            <AnimatedSection key={article.id} delay={i * 0.1}>
              <article className="glass-card rounded-sm overflow-hidden group">
                <div className="relative aspect-[16/10] overflow-hidden">
                  <Image
                    src={article.thumbnail}
                    alt={article.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <div className="p-5 md:p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-[10px] uppercase tracking-[0.15em] text-white/40">
                      {article.publication}
                    </span>
                    <span className="w-1 h-1 rounded-full bg-white/20" />
                    <span className="text-[10px] uppercase tracking-[0.15em] text-white/40">
                      {new Date(article.date).toLocaleDateString("en-US", {
                        month: "short",
                        year: "numeric",
                      })}
                    </span>
                  </div>
                  <h3 className="text-sm md:text-base font-bold text-white leading-snug mb-3">
                    {article.title}
                  </h3>
                  <p className="text-xs text-muted leading-relaxed line-clamp-2">
                    {article.excerpt}
                  </p>
                </div>
              </article>
            </AnimatedSection>
          ))}
        </div>

        <AnimatedSection delay={0.35}>
          <div className="mt-8 md:mt-12 text-center">
            <Button href="/press-partners" variant="outline">
              View all news
              <ArrowRight size={14} className="inline ml-2" />
            </Button>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}

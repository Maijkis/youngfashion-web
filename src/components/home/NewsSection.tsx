"use client";

import Link from "next/link";
import { pressArticles } from "@/lib/mockData";
import AnimatedSection from "@/components/ui/AnimatedSection";

export default function NewsSection() {
  const latest = pressArticles.slice(0, 3);

  return (
    <section className="relative w-full bg-white px-5 md:px-10 lg:px-16 py-24 md:py-32 border-t border-[var(--color-hairline)]">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-end justify-between gap-5 mb-12 md:mb-16">
          <div>
            <span className="block text-[10px] md:text-[11px] uppercase tracking-[0.32em] text-[var(--color-ink-muted)] font-medium mb-4">
              Press
            </span>
            <h2 className="font-light text-[var(--color-ink)] leading-[1.02] tracking-[-0.015em] text-[clamp(2rem,5.5vw,4rem)]">
              What they said
            </h2>
          </div>
          <Link
            href="/press-partners"
            className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.28em] text-[var(--color-ink)] font-medium border-b border-[var(--color-ink)] pb-1 min-h-[44px] hover:gap-3 transition-all shrink-0"
          >
            Archive
            <span>→</span>
          </Link>
        </div>

        {/* Quote strip — no thumbnails, text-forward */}
        <ol className="divide-y divide-[var(--color-hairline)]">
          {latest.map((article, i) => (
            <AnimatedSection key={article.id} delay={i * 0.08}>
              <li>
                <a
                  href={article.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group grid grid-cols-12 gap-4 md:gap-8 items-baseline py-6 md:py-10 hover:bg-black/[0.015] transition-colors -mx-5 md:-mx-10 lg:-mx-16 px-5 md:px-10 lg:px-16"
                >
                  {/* Index num */}
                  <span className="col-span-2 md:col-span-1 text-[10px] md:text-[11px] uppercase tracking-[0.28em] text-[var(--color-ink-muted)] tabular-nums font-medium">
                    {String(i + 1).padStart(2, "0")}
                  </span>

                  {/* Pull quote — the article excerpt, serif-less, thin */}
                  <blockquote className="col-span-10 md:col-span-8 font-light text-[var(--color-ink)] leading-[1.25] tracking-[-0.005em] text-lg md:text-2xl lg:text-[26px]">
                    &ldquo;{article.excerpt}&rdquo;
                  </blockquote>

                  {/* Source + date */}
                  <div className="col-start-3 md:col-start-10 col-span-10 md:col-span-2 flex flex-col gap-1 md:items-end">
                    <span className="text-[11px] md:text-[12px] uppercase tracking-[0.22em] text-[var(--color-ink)] font-medium">
                      {article.publication}
                    </span>
                    <span className="text-[10px] uppercase tracking-[0.22em] text-[var(--color-ink-muted)] font-medium tabular-nums">
                      {new Date(article.date).toLocaleDateString("en-US", {
                        month: "short",
                        year: "numeric",
                      })}
                    </span>
                  </div>

                  {/* Arrow — desktop */}
                  <span className="hidden md:block col-span-1 text-right text-[var(--color-ink)]/40 group-hover:text-[var(--color-ink)] group-hover:translate-x-1 transition-all text-xl">
                    →
                  </span>
                </a>
              </li>
            </AnimatedSection>
          ))}
        </ol>
      </div>
    </section>
  );
}

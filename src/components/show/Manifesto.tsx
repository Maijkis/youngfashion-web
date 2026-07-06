import type { ReactNode } from "react";
import AnimatedSection from "@/components/ui/AnimatedSection";
import SectionTag from "@/components/ui/SectionTag";
import WipePanel from "@/components/ui/WipePanel";
import Highlight from "@/components/show/Highlight";
import { about, sectionIndex } from "@/lib/content";

/** Parse *serif italic* and ==accent highlight== markers into nodes. */
function renderMarkers(text: string): ReactNode[] {
  return text
    .split(/(\*[^*]+\*|==[^=]+==)/g)
    .filter(Boolean)
    .map((part, i) => {
      if (part.startsWith("==") && part.endsWith("==")) {
        return <Highlight key={i}>{part.slice(2, -2)}</Highlight>;
      }
      if (part.startsWith("*") && part.endsWith("*")) {
        return (
          <em key={i} className="font-serif italic">
            {part.slice(1, -1)}
          </em>
        );
      }
      return <span key={i}>{part}</span>;
    });
}

export default function Manifesto() {
  return (
    <WipePanel id="about" className="px-5 md:px-10 lg:px-16 py-20 md:py-32">
      <SectionTag index={sectionIndex("manifesto")} label="Five Years" className="mb-14 md:mb-20" />

      <AnimatedSection effect="mask">
        <blockquote className="font-serif italic leading-[1.1] text-[clamp(1.8rem,6vw,3.5rem)] max-w-[16ch] mb-4">
          <span className="text-[var(--color-accent)]">(</span>
          {about.pullQuote}
          <span className="text-[var(--color-accent)]">)</span>
        </blockquote>
        <p className="mono-label text-[var(--color-ink-muted)] mb-12 md:mb-16">— {about.quoteMeta}</p>
      </AnimatedSection>

      <div className="max-w-[60ch] space-y-5 md:space-y-6">
        {about.paragraphs.map((paragraph, i) => (
          <AnimatedSection key={i} effect="mask" delay={i * 0.08}>
            <p className="font-light text-base md:text-lg leading-relaxed">
              {renderMarkers(paragraph)}
            </p>
          </AnimatedSection>
        ))}
      </div>

      <p className="mono-label text-[var(--color-ink-muted)] mt-14 md:mt-20">* Est. 2022 — Vilnius *</p>
    </WipePanel>
  );
}

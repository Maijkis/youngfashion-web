import type { ReactNode } from "react";
import AnimatedSection from "@/components/ui/AnimatedSection";
import SectionTag from "@/components/ui/SectionTag";
import WipePanel from "@/components/ui/WipePanel";
import Highlight from "@/components/show/Highlight";
import { about, sectionIndex } from "@/lib/content";

/** Parse *emphasis* and ==accent highlight== markers into nodes. Emphasis is
 *  SANS italic (never serif) — serif is reserved for the pull-quote alone, so
 *  no paragraph mixes the two faces. */
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
          <em key={i} className="italic text-[var(--color-ink)]">
            {part.slice(1, -1)}
          </em>
        );
      }
      return <span key={i}>{part}</span>;
    });
}

export default function Manifesto() {
  return (
    <WipePanel id="about" className="py-section" texture dotField>
      <div className="container">
        <SectionTag index={sectionIndex("manifesto")} label="Five Years" className="mb-12" />

        <AnimatedSection effect="mask">
          <blockquote className="font-serif italic leading-tight text-quote max-w-[16ch] mb-4">
            <span className="text-[var(--color-accent)]">(</span>
            {about.pullQuote}
            <span className="text-[var(--color-accent)]">)</span>
          </blockquote>
          <p className="mono-label text-[var(--color-ink-muted)] mb-16">— {about.quoteMeta}</p>
        </AnimatedSection>

        <div className="max-w-[60ch] space-y-6">
          {about.paragraphs.map((paragraph, i) => (
            <AnimatedSection key={i} effect="mask" delay={i * 0.08}>
              <p className="font-light text-body leading-body">
                {renderMarkers(paragraph)}
              </p>
            </AnimatedSection>
          ))}
        </div>

        <p className="mono-label text-[var(--color-ink-muted)] mt-16">* Est. 2022 — Vilnius *</p>
      </div>
    </WipePanel>
  );
}

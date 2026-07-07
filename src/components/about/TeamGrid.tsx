"use client";

import Image from "next/image";
import { teamMembers } from "@/lib/mockData";
import AnimatedSection from "@/components/ui/AnimatedSection";
import SectionHeader from "@/components/ui/SectionHeader";

export default function TeamGrid() {
  return (
    <section className="py-section bg-[var(--color-paper)] border-t border-[var(--color-hairline)]">
      <div className="container">
        <SectionHeader title="The team" subtitle="The people behind the platform" />

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8 lg:gap-10">
          {teamMembers.map((member, i) => (
            <AnimatedSection key={member.id} delay={i * 0.06}>
              <div className="group">
                <div className="relative w-full aspect-[3/4] overflow-hidden bg-[var(--color-paper-deep)] mb-3 md:mb-4">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover grayscale group-hover:grayscale-0 transition-all duration-[900ms] ease-image group-hover:scale-[1.03]"
                    sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  />
                </div>
                <h3 className="font-light text-[var(--color-ink)] text-body">
                  {member.name}
                </h3>
                <p className="mono-label text-[var(--color-ink-muted)] mt-1">
                  {member.role}
                </p>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}

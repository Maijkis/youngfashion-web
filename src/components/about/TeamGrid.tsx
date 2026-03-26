"use client";

import Image from "next/image";
import { teamMembers } from "@/lib/mockData";
import AnimatedSection from "@/components/ui/AnimatedSection";
import SectionHeader from "@/components/ui/SectionHeader";

export default function TeamGrid() {
  return (
    <section className="py-16 md:py-24 px-4 md:px-6">
      <div className="max-w-5xl mx-auto">
        <SectionHeader title="The Team" subtitle="The people behind the platform" />

        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-6">
          {teamMembers.map((member, i) => (
            <AnimatedSection key={member.id} delay={i * 0.08}>
              <div className="group glass-card rounded-sm overflow-hidden">
                <div className="relative w-full aspect-square overflow-hidden">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover grayscale group-hover:grayscale-0 transition-all duration-500 group-hover:scale-105"
                    sizes="(max-width: 768px) 50vw, 33vw"
                  />
                </div>
                <div className="p-3 md:p-4 text-center">
                  <h3 className="text-xs md:text-sm font-light tracking-wide text-white">
                    {member.name}
                  </h3>
                  <p className="text-[10px] text-white/40 mt-1 uppercase tracking-[0.1em]">
                    {member.role}
                  </p>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}

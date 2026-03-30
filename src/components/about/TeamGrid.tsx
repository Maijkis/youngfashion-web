"use client";

import Image from "next/image";
import { teamMembers } from "@/lib/mockData";
import AnimatedSection from "@/components/ui/AnimatedSection";
import SectionHeader from "@/components/ui/SectionHeader";

export default function TeamGrid() {
  return (
    <section className="py-16 md:py-28 px-6 md:px-12 lg:px-20">
      <div className="max-w-7xl mx-auto">
        <SectionHeader title="The Team" subtitle="The people behind the platform" />

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-5">
          {teamMembers.map((member, i) => (
            <AnimatedSection key={member.id} delay={i * 0.08}>
              <div className="group overflow-hidden">
                <div className="relative w-full aspect-[3/4] overflow-hidden mb-3">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105"
                    sizes="(max-width: 768px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500" />
                </div>
                <h3 className="text-sm font-bold uppercase tracking-[0.02em] text-white/80 group-hover:text-white transition-colors">
                  {member.name}
                </h3>
                <p className="text-[10px] text-white/30 mt-0.5 uppercase tracking-[0.2em] font-medium">
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

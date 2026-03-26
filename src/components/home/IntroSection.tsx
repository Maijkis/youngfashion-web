"use client";

import AnimatedSection from "@/components/ui/AnimatedSection";

export default function IntroSection() {
  return (
    <section className="py-16 md:py-28 px-4 md:px-6">
      <div className="max-w-3xl mx-auto text-center">
        <AnimatedSection>
          <p className="text-xl md:text-2xl lg:text-3xl font-light leading-relaxed tracking-wide text-white/90">
            &ldquo;A platform where raw talent meets the runway.&rdquo;
          </p>
        </AnimatedSection>

        <AnimatedSection delay={0.15}>
          <div className="mt-6 md:mt-8 w-12 md:w-16 h-px bg-white/20 mx-auto" />
        </AnimatedSection>

        <AnimatedSection delay={0.25}>
          <p className="mt-6 md:mt-8 text-muted text-xs md:text-sm leading-relaxed max-w-xl mx-auto">
            Young Fashion is Vilnius&apos;s premier platform for emerging fashion
            designers. Since our founding in 2022, we have been dedicated to
            discovering, nurturing, and showcasing the next generation of creative
            talent from Lithuania and the Baltic region. Through runway shows,
            workshops, pop-up markets, and industry collaborations, we provide
            young designers with the exposure and resources they need to launch
            their careers on the international stage.
          </p>
        </AnimatedSection>
      </div>
    </section>
  );
}

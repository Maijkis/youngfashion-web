"use client";

import { motion } from "framer-motion";

export default function MissionStatement() {
  return (
    <section className="relative py-20 md:py-32 px-4 md:px-6">
      <div className="max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <p className="text-[10px] md:text-[11px] uppercase tracking-[0.3em] text-white/40 mb-6 md:mb-8">
            Our Mission
          </p>
          <h1 className="text-xl md:text-3xl lg:text-4xl font-light leading-relaxed tracking-wide text-white">
            We believe in the power of young creative voices to reshape the
            future of fashion.
          </h1>
          <div className="mt-8 md:mt-10 w-12 md:w-16 h-px bg-white/20 mx-auto" />
          <p className="mt-8 md:mt-10 text-white/50 text-xs md:text-sm leading-relaxed max-w-2xl mx-auto">
            Founded in Vilnius in 2022, Young Fashion has grown through four
            editions — from its debut to closing Vilnius Fashion Week 2025 at
            K2 Comedy Club, and showcasing at the National Art Gallery in 2024.
            We provide emerging designers with a platform, production support,
            and direct connections to the fashion industry. Our goal is to make
            Lithuanian and Baltic design talent visible on the global stage
            while fostering a community rooted in innovation and artistic
            freedom.
          </p>
        </motion.div>
      </div>
    </section>
  );
}

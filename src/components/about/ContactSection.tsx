"use client";

import { Mail, Phone, MapPin } from "lucide-react";
import AnimatedSection from "@/components/ui/AnimatedSection";
import SectionHeader from "@/components/ui/SectionHeader";

export default function ContactSection() {
  return (
    <section className="py-section bg-[var(--color-paper)] border-t border-[var(--color-hairline)]">
      <div className="container">
        <SectionHeader title="Get in touch" subtitle="We'd love to hear from you" />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-20">
          {/* Contact info — lead */}
          <AnimatedSection>
            <div className="space-y-10">
              <p className="font-light text-[var(--color-ink)]/75 text-body leading-body max-w-md">
                Designer submissions, partnership inquiries, or press — drop us a line.
              </p>

              <ul className="space-y-6">
                <li className="flex items-start gap-4 border-t border-[var(--color-hairline)] pt-6">
                  <Mail size={16} className="text-[var(--color-ink)]/50 mt-1 flex-shrink-0" />
                  <div>
                    <p className="mono-label text-[var(--color-ink-muted)] mb-1.5">
                      Email
                    </p>
                    <a
                      href="mailto:youngfashionevent@gmail.com"
                      className="text-body text-[var(--color-ink)] font-light link-underline break-all"
                    >
                      youngfashionevent@gmail.com
                    </a>
                  </div>
                </li>
                <li className="flex items-start gap-4 border-t border-[var(--color-hairline)] pt-6">
                  <Phone size={16} className="text-[var(--color-ink)]/50 mt-1 flex-shrink-0" />
                  <div>
                    <p className="mono-label text-[var(--color-ink-muted)] mb-1.5">
                      Phone
                    </p>
                    <a
                      href="tel:+37068380903"
                      className="text-body text-[var(--color-ink)] font-light link-underline"
                    >
                      +370 683 80903
                    </a>
                  </div>
                </li>
                <li className="flex items-start gap-4 border-t border-[var(--color-hairline)] pt-6">
                  <MapPin size={16} className="text-[var(--color-ink)]/50 mt-1 flex-shrink-0" />
                  <div>
                    <p className="mono-label text-[var(--color-ink-muted)] mb-1.5">
                      Location
                    </p>
                    <p className="text-sm md:text-base text-[var(--color-ink)] font-light">
                      Vilnius, Lithuania
                    </p>
                  </div>
                </li>
              </ul>
            </div>
          </AnimatedSection>

          {/* Minimalist form */}
          <AnimatedSection delay={0.1}>
            <form
              className="space-y-6 md:space-y-8"
              onSubmit={(e) => e.preventDefault()}
            >
              <div className="border-b border-hairline pb-2 transition-colors focus-within:border-[var(--color-accent)]">
                <label className="mono-label block text-[var(--color-ink-muted)] mb-2">
                  Name
                </label>
                <input
                  type="text"
                  className="w-full bg-transparent text-[var(--color-ink)] placeholder:text-[var(--color-ink)]/25 font-light text-base focus:outline-none"
                  placeholder="Your full name"
                />
              </div>
              <div className="border-b border-hairline pb-2 transition-colors focus-within:border-[var(--color-accent)]">
                <label className="mono-label block text-[var(--color-ink-muted)] mb-2">
                  Email
                </label>
                <input
                  type="email"
                  className="w-full bg-transparent text-[var(--color-ink)] placeholder:text-[var(--color-ink)]/25 font-light text-base focus:outline-none"
                  placeholder="your@email.com"
                />
              </div>
              <div className="border-b border-hairline pb-2 transition-colors focus-within:border-[var(--color-accent)]">
                <label className="mono-label block text-[var(--color-ink-muted)] mb-2">
                  Message
                </label>
                <textarea
                  rows={4}
                  className="w-full bg-transparent text-[var(--color-ink)] placeholder:text-[var(--color-ink)]/25 font-light text-base focus:outline-none resize-none"
                  placeholder="Tell us about your inquiry…"
                />
              </div>
              <button
                type="submit"
                className="inline-flex items-center gap-2 text-label uppercase tracking-[0.28em] text-[var(--color-ink)] font-medium border-b border-[var(--color-ink)] pb-1 min-h-[44px] hover:gap-3 transition-all"
              >
                Send message
                <span>→</span>
              </button>
            </form>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}

"use client";

import { Mail, Phone, MapPin } from "lucide-react";
import AnimatedSection from "@/components/ui/AnimatedSection";
import SectionHeader from "@/components/ui/SectionHeader";

export default function ContactSection() {
  return (
    <section className="py-16 md:py-24 px-4 md:px-6">
      <div className="max-w-5xl mx-auto">
        <SectionHeader title="Get in Touch" subtitle="We'd love to hear from you" />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-16">
          {/* Contact Form */}
          <AnimatedSection>
            <form
              className="glass-card rounded-sm p-5 md:p-8 space-y-5 md:space-y-6"
              onSubmit={(e) => e.preventDefault()}
            >
              <div>
                <label className="block text-[10px] uppercase tracking-[0.15em] text-white/40 mb-2">
                  Name
                </label>
                <input
                  type="text"
                  className="w-full glass-input px-4 py-3 text-xs md:text-sm text-white placeholder:text-white/20 rounded-sm"
                  placeholder="Your full name"
                />
              </div>
              <div>
                <label className="block text-[10px] uppercase tracking-[0.15em] text-white/40 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  className="w-full glass-input px-4 py-3 text-xs md:text-sm text-white placeholder:text-white/20 rounded-sm"
                  placeholder="your@email.com"
                />
              </div>
              <div>
                <label className="block text-[10px] uppercase tracking-[0.15em] text-white/40 mb-2">
                  Message
                </label>
                <textarea
                  rows={5}
                  className="w-full glass-input px-4 py-3 text-xs md:text-sm text-white placeholder:text-white/20 rounded-sm resize-none"
                  placeholder="Tell us about your inquiry..."
                />
              </div>
              <button
                type="submit"
                className="w-full bg-white text-black py-3 text-[11px] uppercase tracking-[0.2em] hover:bg-muted-light transition-colors cursor-pointer rounded-sm"
              >
                Send Message
              </button>
            </form>
          </AnimatedSection>

          {/* Contact Info */}
          <AnimatedSection delay={0.15}>
            <div className="space-y-6 md:space-y-8">
              <div>
                <h3 className="text-base md:text-xl font-light uppercase tracking-[0.08em] text-white mb-4 md:mb-6">
                  Contact Information
                </h3>
                <p className="text-white/50 text-xs md:text-sm leading-relaxed mb-6 md:mb-8">
                  Whether you&apos;re a designer looking to showcase your work, a
                  brand interested in partnering, or a press member seeking
                  information — we&apos;re here to help.
                </p>
              </div>

              <div className="space-y-5 md:space-y-6">
                <div className="flex items-start gap-4 glass-card rounded-sm p-4">
                  <Mail size={16} className="text-white/40 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-[10px] uppercase tracking-[0.15em] text-white/40 mb-1">
                      Email
                    </p>
                    <p className="text-xs md:text-sm text-white">eventyoungfashion@gmail.com</p>
                  </div>
                </div>
                <div className="flex items-start gap-4 glass-card rounded-sm p-4">
                  <Phone size={16} className="text-white/40 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-[10px] uppercase tracking-[0.15em] text-white/40 mb-1">
                      Phone
                    </p>
                    <p className="text-xs md:text-sm text-white">+370 683 80903</p>
                  </div>
                </div>
                <div className="flex items-start gap-4 glass-card rounded-sm p-4">
                  <MapPin size={16} className="text-white/40 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-[10px] uppercase tracking-[0.15em] text-white/40 mb-1">
                      Location
                    </p>
                    <p className="text-xs md:text-sm text-white">
                      Vilnius, Lithuania
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}

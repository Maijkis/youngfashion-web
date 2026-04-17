"use client";

import Link from "next/link";
import { Instagram, Facebook } from "lucide-react";
import { useEffect, useState } from "react";

const SHOW_DATE = new Date("2026-09-19T19:00:00+03:00");

function getDaysUntil(target: Date) {
  const diff = Math.max(0, target.getTime() - Date.now());
  return Math.floor(diff / (1000 * 60 * 60 * 24));
}

const quickLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Galleries", href: "/galleries" },
  { label: "Events", href: "/events" },
  { label: "Press & Partners", href: "/press-partners" },
];

function TikTokIcon({ size = 18 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
    </svg>
  );
}

export default function Footer() {
  const [days, setDays] = useState(() => getDaysUntil(SHOW_DATE));

  useEffect(() => {
    const id = setInterval(() => setDays(getDaysUntil(SHOW_DATE)), 60_000 * 10);
    return () => clearInterval(id);
  }, []);

  return (
    <footer className="bg-white text-[var(--color-ink)] border-t border-[var(--color-hairline)]">
      {/* Countdown moment */}
      <div className="px-5 md:px-10 lg:px-16 pt-20 md:pt-28 pb-16 md:pb-24">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-3 mb-6 md:mb-10">
            <span className="w-8 md:w-12 h-px bg-[var(--color-ink)]/40" />
            <span className="text-[10px] md:text-[11px] uppercase tracking-[0.32em] text-[var(--color-ink-muted)] font-medium">
              The next show
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-12 items-end">
            {/* Huge days-until */}
            <div className="md:col-span-7">
              <div className="flex items-baseline gap-4 md:gap-6">
                <span className="font-light text-[var(--color-ink)] leading-none tracking-[-0.03em] text-[clamp(5rem,18vw,14rem)] tabular-nums">
                  {days}
                </span>
                <span className="text-[10px] md:text-[11px] uppercase tracking-[0.32em] text-[var(--color-ink-muted)] font-medium pb-2 md:pb-4">
                  Days
                </span>
              </div>
              <div className="mt-2 md:mt-4 flex items-center gap-4 flex-wrap">
                <span className="text-sm md:text-base font-light text-[var(--color-ink)] tracking-[-0.005em]">
                  19 September 2026
                </span>
                <span className="w-4 h-px bg-[var(--color-ink)]/40" />
                <span className="text-sm md:text-base font-light text-[var(--color-ink)] tracking-[-0.005em]">
                  Vilnius, Lithuania
                </span>
              </div>
            </div>

            {/* CTA */}
            <div className="md:col-span-5 md:justify-self-end">
              <Link
                href="/events/young-fashion-2026"
                className="group inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.28em] text-[var(--color-ink)] font-medium border-b border-[var(--color-ink)] pb-1 min-h-[44px] hover:gap-3 transition-all"
              >
                RSVP for No. 5
                <span>→</span>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom block — nav + social + contact */}
      <div className="border-t border-[var(--color-hairline)]">
        <div className="max-w-7xl mx-auto px-5 md:px-10 lg:px-16 py-10 md:py-14 grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-12">
          {/* Navigation */}
          <div>
            <h4 className="text-[10px] md:text-[11px] uppercase tracking-[0.32em] text-[var(--color-ink-muted)] font-medium mb-5">
              Index
            </h4>
            <ul className="space-y-2.5">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm font-light text-[var(--color-ink)]/70 hover:text-[var(--color-ink)] transition-colors duration-300 min-h-[44px] flex items-center md:min-h-0 md:inline tracking-[-0.005em]"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-[10px] md:text-[11px] uppercase tracking-[0.32em] text-[var(--color-ink-muted)] font-medium mb-5">
              Contact
            </h4>
            <ul className="space-y-2.5">
              <li>
                <a
                  href="mailto:youngfashionevent@gmail.com"
                  className="text-sm font-light text-[var(--color-ink)]/70 hover:text-[var(--color-ink)] transition-colors break-all"
                >
                  youngfashionevent@gmail.com
                </a>
              </li>
            </ul>
          </div>

          {/* Follow */}
          <div>
            <h4 className="text-[10px] md:text-[11px] uppercase tracking-[0.32em] text-[var(--color-ink-muted)] font-medium mb-5">
              Follow
            </h4>
            <div className="flex gap-4">
              <a
                href="https://www.instagram.com/youngfashion.lt/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[var(--color-ink)]/60 hover:text-[var(--color-ink)] transition-colors min-h-[44px] min-w-[44px] -ml-3 flex items-center justify-center"
                aria-label="Instagram"
              >
                <Instagram size={18} />
              </a>
              <a
                href="https://www.tiktok.com/@youngfashion.lt"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[var(--color-ink)]/60 hover:text-[var(--color-ink)] transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center"
                aria-label="TikTok"
              >
                <TikTokIcon size={18} />
              </a>
              <a
                href="https://www.facebook.com/youngfashion.lt"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[var(--color-ink)]/60 hover:text-[var(--color-ink)] transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center"
                aria-label="Facebook"
              >
                <Facebook size={18} />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Fine print */}
      <div className="border-t border-[var(--color-hairline)]">
        <div className="max-w-7xl mx-auto px-5 md:px-10 lg:px-16 py-5 md:py-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-[10px] md:text-[11px] uppercase tracking-[0.28em] text-[var(--color-ink-muted)] font-medium">
            &copy; {new Date().getFullYear()} Young Fashion · No. 5
          </p>
          <p className="text-[10px] md:text-[11px] uppercase tracking-[0.28em] text-[var(--color-ink-muted)] font-medium">
            Vilnius, LT
          </p>
        </div>
      </div>
    </footer>
  );
}

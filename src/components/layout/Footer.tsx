"use client";

import Link from "next/link";
import Image from "next/image";
import { Instagram, Facebook } from "lucide-react";
import { useState } from "react";

const quickLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Galleries", href: "/galleries" },
  { label: "Events", href: "/events" },
  { label: "Press & Partners", href: "/press-partners" },
];

function TikTokIcon({ size = 20 }: { size?: number }) {
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
  const [email, setEmail] = useState("");

  return (
    <footer className="border-t border-white/5">
      {/* Big brand text */}
      <div className="px-6 md:px-12 lg:px-20 pt-16 md:pt-24 pb-12 md:pb-16">
        <h2 className="text-[clamp(2.5rem,6vw,5rem)] font-bold uppercase tracking-[-0.02em] leading-[0.95] text-white/[0.06]">
          Young Fashion
        </h2>
      </div>

      <div className="max-w-[1800px] mx-auto px-6 md:px-12 lg:px-20 pb-12 md:pb-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-12">
          {/* Brand */}
          <div>
            <Link
              href="/"
              className="inline-flex items-center mb-4 hover:opacity-80 transition-opacity"
              aria-label="Young Fashion home"
            >
              <Image
                src="/branding/logo-white.png"
                alt="Young Fashion"
                width={620}
                height={100}
                className="h-6 md:h-7 w-auto"
              />
            </Link>
            <p className="text-white/40 text-xs md:text-sm leading-relaxed">
              Empowering young designers in Vilnius since 2022. A platform where
              emerging talent meets the fashion world.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-[10px] uppercase tracking-[0.25em] text-white/30 font-bold mb-5 md:mb-6">
              Navigation
            </h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-xs md:text-sm text-white/40 hover:text-white transition-colors duration-300 min-h-[44px] md:min-h-0 flex items-center md:inline"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social + Newsletter */}
          <div>
            <h4 className="text-[10px] uppercase tracking-[0.25em] text-white/30 font-bold mb-5 md:mb-6">
              Stay Connected
            </h4>
            <div className="flex gap-5 mb-8">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/30 hover:text-white transition-colors duration-300 min-h-[44px] min-w-[44px] flex items-center justify-center -ml-3"
                aria-label="Instagram"
              >
                <Instagram size={18} />
              </a>
              <a
                href="https://tiktok.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/30 hover:text-white transition-colors duration-300 min-h-[44px] min-w-[44px] flex items-center justify-center"
                aria-label="TikTok"
              >
                <TikTokIcon size={18} />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/30 hover:text-white transition-colors duration-300 min-h-[44px] min-w-[44px] flex items-center justify-center"
                aria-label="Facebook"
              >
                <Facebook size={18} />
              </a>
            </div>

            <div className="flex">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email"
                className="flex-1 glass-input px-4 py-3 text-xs text-white placeholder:text-white/30 rounded-none"
              />
              <button className="bg-white text-black px-5 md:px-6 py-3 text-[10px] uppercase tracking-[0.2em] font-bold hover:bg-white/90 transition-colors cursor-pointer whitespace-nowrap">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/5">
        <div className="max-w-[1800px] mx-auto px-6 md:px-12 lg:px-20 py-5 md:py-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-[10px] md:text-xs text-white/20 font-medium">
            &copy; {new Date().getFullYear()} Young Fashion. All rights reserved.
          </p>
          <p className="text-[10px] md:text-xs text-white/20">Vilnius, Lithuania</p>
        </div>
      </div>
    </footer>
  );
}

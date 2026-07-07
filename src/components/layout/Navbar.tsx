"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { event, ticketHref, ticketIsExternal } from "@/lib/content";
import { EASE_IMAGE } from "@/lib/motion";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Galleries", href: "/galleries" },
  { label: "Events", href: "/events" },
  { label: "Press & Partners", href: "/press-partners" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 80);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  // Solid paper once scrolled — never a translucent blur (it composites to a
  // muddy grey over the dark panels). One clean transparent→paper swap.
  const bgClass = scrolled
    ? "bg-[var(--color-paper)] border-b border-hairline"
    : "bg-transparent";

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 w-full safe-top transition-colors duration-500 ${bgClass}`}
      >
        <div className="container flex items-center justify-between w-full h-14 md:h-16">
          <Link
            href="/"
            className="flex items-center gap-1 hover:opacity-70 transition-opacity min-h-[44px]"
            aria-label="Young Fashion home"
          >
            <Image
              src="/assets/branding/logo-wordmark.png"
              alt="Young Fashion"
              width={1774}
              height={164}
              priority
              className="h-4 md:h-5 w-auto"
            />
            <span className="font-display font-semibold text-lg md:text-xl leading-none text-[var(--color-accent-text)]">
              *
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-7 lg:gap-9">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`link-underline mono-label transition-colors duration-300 ${
                  pathname === link.href
                    ? "text-[var(--color-ink)]"
                    : "text-[var(--color-ink-muted)] hover:text-[var(--color-ink)]"
                }`}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href={ticketHref}
              data-cta="masthead"
              target={ticketIsExternal ? "_blank" : undefined}
              rel={ticketIsExternal ? "noopener noreferrer" : undefined}
              className="mono-label inline-flex items-center min-h-[36px] px-4 border border-[var(--color-ink)] text-[var(--color-ink)] hover:bg-[var(--color-ink)] hover:text-[var(--color-paper)] transition-colors"
            >
              Tickets
            </Link>
          </div>

          <div className="flex items-center gap-1 md:hidden">
            {/* One CTA at a time on phones: this pill only exists at the top of the
                page — once scrolled, the hero button (then the sticky bottom bar)
                takes over, so two ticket CTAs never compete for attention. */}
            <Link
              href={ticketHref}
              data-cta="masthead"
              target={ticketIsExternal ? "_blank" : undefined}
              rel={ticketIsExternal ? "noopener noreferrer" : undefined}
              aria-hidden={scrolled}
              tabIndex={scrolled ? -1 : 0}
              className={`mono-label inline-flex items-center min-h-[44px] px-3 border border-[var(--color-ink)] text-[var(--color-ink)] transition-[opacity,transform] duration-300 ease-[var(--ease)] ${
                scrolled ? "opacity-0 -translate-y-1 pointer-events-none" : "opacity-100 translate-y-0"
              }`}
            >
              Tickets
            </Link>
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="p-2 -mr-2 min-h-[44px] min-w-[44px] flex items-center justify-center text-[var(--color-ink)]"
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </nav>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 flex flex-col items-start justify-end pb-24 px-6 safe-bottom bg-[var(--color-paper)]"
          >
            <nav className="flex flex-col gap-2 w-full">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, x: -24 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.06, duration: 0.35, ease: EASE_IMAGE }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className={`font-display font-semibold uppercase text-h2 leading-none tracking-tight transition-colors min-h-[56px] flex items-center ${
                      pathname === link.href
                        ? "text-[var(--color-ink)]"
                        : "text-[var(--color-ink)]/40"
                    }`}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
            </nav>
            <motion.div
              initial={{ opacity: 0, x: -24 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: navLinks.length * 0.06, duration: 0.35, ease: EASE_IMAGE }}
              className="w-full mt-6"
            >
              <Link
                href={ticketHref}
                data-cta="masthead"
                target={ticketIsExternal ? "_blank" : undefined}
                rel={ticketIsExternal ? "noopener noreferrer" : undefined}
                onClick={() => setMobileOpen(false)}
                className="mono-label inline-flex items-center justify-center min-h-[52px] w-full bg-[var(--color-accent)] text-[var(--color-ink)]"
              >
                Get Tickets
              </Link>
            </motion.div>
            <div className="mt-8 flex items-center gap-3">
              <span className="w-8 h-px bg-[var(--color-ink)]/40" />
              <span className="mono-label text-[var(--color-ink-muted)]">
                Vilnius · Est. 2022 · {event.editionShort}
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

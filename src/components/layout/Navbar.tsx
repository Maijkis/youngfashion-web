"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { event, ticketHref, ticketIsExternal } from "@/lib/content";
import useMagnetic from "@/hooks/useMagnetic";

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
  const ticketMagneticRef = useMagnetic<HTMLAnchorElement>();

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

  const bgClass = scrolled
    ? "bg-[var(--color-paper)]/85 backdrop-blur-md border-b border-hairline"
    : "bg-transparent";

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 w-full safe-top transition-all duration-500 ${bgClass}`}
      >
        <div
          className={`max-w-[1800px] mx-auto px-5 md:px-10 lg:px-16 flex items-center justify-between w-full transition-[height] duration-500 ${
            scrolled ? "h-12 md:h-14" : "h-16 md:h-20"
          }`}
        >
          <Link
            href="/"
            className="flex items-center hover:opacity-70 transition-opacity min-h-[44px]"
            aria-label="Young Fashion home"
          >
            <span
              className={`font-display font-semibold text-lg md:text-xl uppercase tracking-tight text-[var(--color-ink)] origin-left transition-transform duration-500 ${
                scrolled ? "scale-[0.85]" : "scale-100"
              }`}
            >
              Young Fashion<span className="text-[var(--color-accent-text)]">*</span>
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-7 lg:gap-9">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`link-underline font-mono text-[11px] uppercase tracking-[0.2em] transition-colors duration-300 ${
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
              ref={ticketMagneticRef}
              data-cta="masthead"
              target={ticketIsExternal ? "_blank" : undefined}
              rel={ticketIsExternal ? "noopener noreferrer" : undefined}
              className="inline-flex items-center min-h-[44px] px-4 bg-[var(--color-accent)] text-[var(--color-ink)] font-mono text-[11px] uppercase tracking-[0.2em] hover:opacity-90 transition-opacity"
            >
              Tickets
            </Link>
          </div>

          <div className="flex items-center gap-1 md:hidden">
            <Link
              href={ticketHref}
              data-cta="masthead"
              target={ticketIsExternal ? "_blank" : undefined}
              rel={ticketIsExternal ? "noopener noreferrer" : undefined}
              className="inline-flex items-center min-h-[44px] px-3 bg-[var(--color-accent)] text-[var(--color-ink)] font-mono text-[10px] uppercase tracking-[0.18em]"
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
            <nav className="flex flex-col gap-1 w-full">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, x: -24 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.06, duration: 0.35, ease: [0.32, 0.72, 0, 1] }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className={`font-display font-medium text-4xl md:text-5xl tracking-[-0.01em] transition-colors min-h-[56px] flex items-center ${
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
              transition={{ delay: navLinks.length * 0.06, duration: 0.35, ease: [0.32, 0.72, 0, 1] }}
              className="w-full mt-6"
            >
              <Link
                href={ticketHref}
                data-cta="masthead"
                target={ticketIsExternal ? "_blank" : undefined}
                rel={ticketIsExternal ? "noopener noreferrer" : undefined}
                onClick={() => setMobileOpen(false)}
                className="inline-flex items-center justify-center min-h-[52px] w-full bg-[var(--color-accent)] text-[var(--color-ink)] font-mono text-[12px] uppercase tracking-[0.2em]"
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

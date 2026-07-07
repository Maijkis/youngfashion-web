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
  const isHome = pathname === "/";

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
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

  // On the homepage the bar starts as just a centered logo and expands into the
  // full floating island once you scroll past the ticker; every other page shows
  // the island straight away (its nav needs to be reachable immediately).
  const expanded = scrolled || !isHome;

  return (
    <>
      {/* The nav is a centred flex; pointer-events pass through the empty gutters
          so the collapsed (logo-only) state never blocks the hero underneath. */}
      <nav className="fixed top-0 inset-x-0 z-50 safe-top flex justify-center px-4 pointer-events-none">
        <div
          className={`relative mt-3 flex w-full max-w-[var(--container-max)] items-center transition-all duration-500 ease-[var(--ease)] ${
            expanded
              ? "pointer-events-auto justify-between gap-6 rounded-2xl border border-hairline bg-[var(--color-paper)] px-5 py-2.5 shadow-[0_10px_40px_-12px_rgba(17,17,17,0.25)]"
              : "pointer-events-none justify-center gap-0 rounded-2xl border border-transparent bg-transparent px-0 py-2.5 shadow-none"
          }`}
        >
          <Link
            href="/"
            className="pointer-events-auto flex items-center hover:opacity-70 transition-opacity min-h-[44px]"
            aria-label="Young Fashion home"
          >
            <Image
              src="/assets/branding/logo-wordmark.png"
              alt="Young Fashion"
              width={1774}
              height={164}
              priority
              className="h-3.5 w-auto"
            />
          </Link>

          {/* Desktop nav — only inside the expanded island */}
          <div className={`items-center gap-7 lg:gap-9 ${expanded ? "hidden md:flex" : "hidden"}`}>
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

          {/* Mobile control — hamburger only; the tickets CTA lives in the sticky
              bottom bar + the menu, so it never doubles up here. */}
          <div className={`items-center ${expanded ? "flex md:hidden" : "hidden"}`}>
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="p-2 -mr-2 min-h-[44px] min-w-[44px] flex items-center justify-center text-[var(--color-ink)]"
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>

          {/* Pink connect line — draws out from the centre along the island's
              base as it forms, then holds: the "silhouette that connects". */}
          <span
            aria-hidden
            className={`pointer-events-none absolute bottom-0 left-1/2 h-[2px] w-20 -translate-x-1/2 origin-center bg-[var(--color-accent)] transition-[transform,opacity] duration-500 ease-[var(--ease)] ${
              expanded ? "scale-x-100 opacity-100" : "scale-x-0 opacity-0"
            }`}
          />
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

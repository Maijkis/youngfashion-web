"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

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
  const isEditorial = pathname === "/";

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 80);
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
    ? isEditorial
      ? "bg-white/85 backdrop-blur-md border-b border-[var(--color-hairline)]"
      : "bg-black/90 backdrop-blur-md"
    : "bg-transparent";

  const inkOnScrolled = scrolled && isEditorial;
  const logoSrc = inkOnScrolled ? "/branding/logo-black.png" : "/branding/logo-white.png";
  const linkBase = inkOnScrolled ? "text-[var(--color-ink)]/50 hover:text-[var(--color-ink)]" : "text-white/50 hover:text-white";
  const linkActive = inkOnScrolled ? "text-[var(--color-ink)]" : "text-white";
  const iconColor = inkOnScrolled ? "text-[var(--color-ink)]" : "text-white";

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 w-full safe-top transition-all duration-500 ${bgClass}`}
      >
        <div className="max-w-[1800px] mx-auto px-5 md:px-10 lg:px-16 flex items-center justify-between w-full h-16 md:h-20">
          <Link
            href="/"
            className="flex items-center hover:opacity-80 transition-opacity min-h-[44px]"
            aria-label="Young Fashion home"
          >
            <Image
              src={logoSrc}
              alt="Young Fashion"
              width={620}
              height={100}
              priority
              className="h-5 md:h-6 w-auto"
            />
          </Link>

          <div className="hidden md:flex items-center gap-8 lg:gap-10">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-[11px] uppercase tracking-[0.22em] font-medium transition-colors duration-300 ${
                  pathname === link.href ? linkActive : linkBase
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className={`md:hidden p-2 -mr-2 min-h-[44px] min-w-[44px] flex items-center justify-center ${iconColor}`}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className={`fixed inset-0 z-40 flex flex-col items-start justify-end pb-20 px-6 safe-bottom ${
              isEditorial ? "bg-white" : "bg-black"
            }`}
          >
            <nav className="flex flex-col gap-1">
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
                    className={`font-light text-4xl md:text-5xl tracking-[-0.015em] transition-colors min-h-[56px] flex items-center ${
                      isEditorial
                        ? pathname === link.href
                          ? "text-[var(--color-ink)]"
                          : "text-[var(--color-ink)]/40"
                        : pathname === link.href
                        ? "text-white"
                        : "text-white/30"
                    }`}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
            </nav>
            <div className="mt-10 flex items-center gap-3">
              <span
                className={`w-8 h-px ${
                  isEditorial ? "bg-[var(--color-ink)]/40" : "bg-white/40"
                }`}
              />
              <span
                className={`text-[10px] uppercase tracking-[0.32em] font-medium ${
                  isEditorial ? "text-[var(--color-ink-muted)]" : "text-white/40"
                }`}
              >
                Vilnius · Est. 2022
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

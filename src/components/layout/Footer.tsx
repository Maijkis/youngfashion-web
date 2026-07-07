import Link from "next/link";
import { Instagram, Facebook } from "lucide-react";
import { event, ticketHref, ticketIsExternal } from "@/lib/content";

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
  return (
    <footer className="bg-[var(--color-paper)] text-[var(--color-ink)] border-t border-hairline">
      <div className="container py-section grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Wordmark */}
        <div>
          <span className="font-display font-semibold text-xl uppercase tracking-tight">
            Young Fashion<span className="text-[var(--color-accent-text)]">*</span>
          </span>
          <p className="section-num mt-2">({event.editionShort})</p>
        </div>

        {/* Index */}
        <div>
          <p className="mono-label text-[var(--color-ink-muted)] mb-3">Index</p>
          <ul className="space-y-1">
            {quickLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="link-underline text-body font-light text-[var(--color-ink)]/70 hover:text-[var(--color-ink)] transition-colors duration-300 min-h-[44px] flex items-center md:min-h-0 md:inline-flex"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact + Follow */}
        <div>
          <p className="mono-label text-[var(--color-ink-muted)] mb-3">Contact</p>
          <a
            href={`mailto:${event.email}`}
            className="link-underline inline-block text-body font-light text-[var(--color-ink)]/70 hover:text-[var(--color-ink)] transition-colors break-all mb-3"
          >
            {event.email}
          </a>
          <div className="flex gap-4 -ml-3">
            <a
              href={event.instagram.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[var(--color-ink)]/60 hover:text-[var(--color-ink)] transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center"
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
              href="https://www.facebook.com/profile.php?id=100093500036696"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[var(--color-ink)]/60 hover:text-[var(--color-ink)] transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center"
              aria-label="Facebook"
            >
              <Facebook size={18} />
            </a>
          </div>
        </div>

        {/* Venue + tickets */}
        <div>
          <p className="mono-label text-[var(--color-ink-muted)] mb-3">No. 5 — {event.dateLabel}</p>
          <p className="text-body font-light text-[var(--color-ink)]/70 mb-1">{event.venue}</p>
          <p className="text-body font-light text-[var(--color-ink)]/70 mb-3">{event.address}</p>
          <Link
            href={ticketHref}
            target={ticketIsExternal ? "_blank" : undefined}
            rel={ticketIsExternal ? "noopener noreferrer" : undefined}
            className="mono-label inline-flex items-center gap-2 border-b border-[var(--color-ink)] pb-1 min-h-[44px] hover:gap-3 transition-all"
          >
            Get Tickets
            <span>→</span>
          </Link>
        </div>
      </div>

      {/* Fine print */}
      <div className="border-t border-hairline">
        <div className="container py-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="mono-label text-[var(--color-ink-muted)]">
            © {new Date().getFullYear()} Young Fashion · {event.editionShort}
          </p>
          <p className="mono-label text-[var(--color-ink-muted)]">{event.city}</p>
        </div>
      </div>
    </footer>
  );
}

import Link from "next/link";
import MediaSlot from "@/components/ui/MediaSlot";
import type { PastEdition } from "@/lib/content";

/**
 * A magazine-cover card for one past edition — masthead, a photo window, and the
 * issue number/title, composed typographically (no cover-image asset required;
 * a null cover renders the placeholder window). The whole card links to its
 * /events/[slug] page.
 */
export default function EditionCover({
  edition,
  priority = false,
}: {
  edition: PastEdition;
  priority?: boolean;
}) {
  return (
    <Link
      href={edition.href}
      data-cursor="VIEW"
      aria-label={`Issue ${edition.issue} — ${edition.year}, ${edition.title}`}
      className="block bg-[var(--color-panel)] border border-[rgba(244,241,234,0.16)] p-4 select-none"
    >
      {/* The cover is a graphic; the aria-label names it, so its typographic
          content is decorative (avoids a label/name mismatch). */}
      <span className="contents" aria-hidden>
      <div className="flex items-start justify-between mb-3">
        <span className="font-display font-semibold uppercase text-[var(--color-panel-ink)] text-xs leading-[0.9]">
          Young
          <br />
          Fashion
          <span className="text-[var(--color-accent)]">*</span>
        </span>
        <span className="mono-label text-[var(--color-panel-ink)]/70">Issue {edition.issue}</span>
      </div>

      {edition.cover ? (
        <MediaSlot
          src={edition.cover}
          alt={`${edition.title} — Issue ${edition.issue}`}
          label={`No.${edition.issue}`}
          sublabel={edition.year}
          aspect="aspect-[4/5]"
          priority={priority}
        />
      ) : (
        /* No cover yet (the current issue) — a designed typographic cover
           instead of an empty-looking paper window. */
        <div className="relative flex aspect-[4/5] flex-col items-center justify-center gap-3 border border-[rgba(244,241,234,0.16)]">
          <span className="text-6xl leading-none text-[var(--color-accent)]/40">★</span>
          <span className="mono-label text-[var(--color-panel-ink)]/70">{edition.title}</span>
          <span className="mono-label absolute top-3 left-3 text-[var(--color-panel-ink)]/50">
            No.{edition.issue}
          </span>
          <span className="mono-label absolute bottom-3 left-3 text-[var(--color-panel-ink)]/50">
            {edition.year}
          </span>
        </div>
      )}

      <div className="mt-3 flex items-end justify-between gap-3">
        <span className="font-display font-semibold text-[var(--color-panel-ink)] text-h2 leading-none tracking-tight">
          N°{edition.issue}
        </span>
        <span className="mono-label text-[var(--color-panel-ink)]/70 text-right leading-relaxed">
          {edition.year}
          <br />
          {edition.title}
        </span>
      </div>
      </span>
    </Link>
  );
}

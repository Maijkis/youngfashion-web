// ============================================================================
// YOUNG FASHION — show content
// Single source of truth for the anniversary microsite (the "/" homepage).
// Edit this file each year to swap the date, lineup, schedule, or partners —
// no component should need to change to reflect new content.
//
// Asset paths: drop a file into /public/assets/... using the naming shown
// below, then paste its path here. Leave a path `null` and the site renders
// an on-brand placeholder automatically — nothing looks broken before real
// assets exist.
// ============================================================================

/** True while a value is still an unfilled placeholder — CTAs render a "coming soon" state instead of linking out. */
export const isPlaceholder = (value: string) => value.includes("{{");

// ----------------------------------------------------------------------------
// Section order — the running order of the homepage "issue". Each section reads
// its own `(0N)` number from here, so reordering the page (or inserting a
// section) renumbers everything automatically. Keep this array in the same
// order the sections appear in app/page.tsx.
// ----------------------------------------------------------------------------

export const sectionOrder = [
  "countdown",
  "manifesto",
  "lineup",
  "schedule",
  "partners",
  "editions",
  "tickets",
] as const;

export type SectionId = (typeof sectionOrder)[number];

/** 1-based position of a section, for the `(0N)` label glyph. */
export const sectionIndex = (id: SectionId): number => sectionOrder.indexOf(id) + 1;

/** The masthead ticker strip (homepage only). Joined with " · " by the Ticker component. */
export const tickerItems: string[] = [
  "Young Fashion",
  "Issue 05",
  "19.09.2026",
  "City Wave Vilnius",
  "Tickets Out Now",
];

export interface ShowEvent {
  name: string;
  edition: string;
  editionShort: string;
  /**
   * ISO 8601 with offset — the one value every countdown on the site derives
   * from. Europe/Vilnius is UTC+3 in September (EEST/DST) — recheck the
   * offset if the show ever moves outside daylight-saving months.
   */
  dateISO: string;
  dateLabel: string;
  dayLabel: string;
  timeLabel: string;
  venue: string;
  address: string;
  city: string;
  /** Paste the kakava.lt checkout link here when ticketing goes live. */
  ticketUrl: string;
  instagram: { handle: string; url: string };
  email: string;
}

export const event: ShowEvent = {
  name: "Young Fashion",
  edition: "5 Years Anniversary",
  editionShort: "5 Years",
  dateISO: "2026-09-19T19:00:00+03:00",
  dateLabel: "19.09.2026",
  dayLabel: "Fri",
  timeLabel: "19:00",
  venue: "City Wave",
  address: "Šv. Stepono g. 41, Vilnius",
  city: "Vilnius, LT",
  ticketUrl: "https://kakava.lt/en/event/young-fashion/12400/25762",
  instagram: { handle: "@eventyoungfashion", url: "https://www.instagram.com/eventyoungfashion/" },
  email: "youngfashionevent@gmail.com",
};

/**
 * Where a "get tickets" CTA should point: the real checkout link once ticketing
 * is live, otherwise the homepage's tickets section (works from any route —
 * "/#tickets" navigates home first when clicked from a subpage).
 */
export const ticketHref = isPlaceholder(event.ticketUrl) ? "/#tickets" : event.ticketUrl;
export const ticketIsExternal = !isPlaceholder(event.ticketUrl);

// ----------------------------------------------------------------------------
// Hero — the one accent info block, plus an optional autoplay loop that wins
// over the static portrait once all three video files exist.
// ----------------------------------------------------------------------------

export interface HeroContent {
  /** "/assets/hero/hero-portrait.jpg" — the type-over-photo image. Null renders the placeholder slot. */
  portrait: string | null;
  video: { webm: string; mp4: string; poster: string } | null;
  /** Lines inside the single accent info block on the hero. */
  infoLines: string[];
}

export const hero: HeroContent = {
  portrait: null,
  video: null,
  infoLines: [
    `${event.dayLabel} ${event.dateLabel} — ${event.timeLabel}`,
    `${event.venue}, ${event.address}`,
  ],
};

// ----------------------------------------------------------------------------
// Lineup — the 9 designers showing at No. 5, in running order. Desktop scatter
// position/rotation is derived from array index inside Lineup.tsx (not stored
// here), so reordering or adding a designer never breaks the layout.
// ----------------------------------------------------------------------------

export interface ShowDesigner {
  /** Slug — also the expected asset filename: designer-<id>.jpg */
  id: string;
  name: string;
  instagramUrl: string | null;
  /** "/assets/designers/designer-<id>.jpg". Null renders the placeholder slot. */
  portrait: string | null;
  /** Card-front field, e.g. "Womenswear". Null hides the row. */
  discipline: string | null;
  /** Card-front "SHOWING" time. Null falls back to event.timeLabel. */
  showingTime: string | null;
  /** 1–2 sentences for the card back. Null renders a "Bio coming soon" note. */
  bio: string | null;
}

export const designers: ShowDesigner[] = [
  { id: "karina-panina", name: "Karina Panina", instagramUrl: null, portrait: "/assets/designers/designer-karina-panina.jpg", discipline: null, showingTime: null, bio: null },
  { id: "liutauras-suvorovas", name: "Liutauras Suvorovas", instagramUrl: null, portrait: "/assets/designers/designer-liutauras-suvorovas.jpg", discipline: null, showingTime: null, bio: null },
  { id: "indre-kirlyte", name: "Indrė Kirlytė", instagramUrl: null, portrait: "/assets/designers/designer-indre-kirlyte.jpg", discipline: null, showingTime: null, bio: null },
  { id: "urte-buzinskaite", name: "Urtė Bužinskaitė", instagramUrl: null, portrait: "/assets/designers/designer-urte-buzinskaite.jpg", discipline: null, showingTime: null, bio: null },
  { id: "lukas-svirplys", name: "Lukas Svirplys", instagramUrl: null, portrait: "/assets/designers/designer-lukas-svirplys.jpg", discipline: null, showingTime: null, bio: null },
  { id: "gabija-overlingaite", name: "Gabija Overlingaitė", instagramUrl: null, portrait: "/assets/designers/designer-gabija-overlingaite.jpg", discipline: null, showingTime: null, bio: null },
  { id: "gintaras-repsas", name: "Gintaras Rėpšas", instagramUrl: null, portrait: "/assets/designers/designer-gintaras-repsas.jpg", discipline: null, showingTime: null, bio: null },
  { id: "valdemara-jasulaityte", name: "Valdemara Jasulaitytė", instagramUrl: null, portrait: "/assets/designers/designer-valdemara-jasulaityte.jpg", discipline: null, showingTime: null, bio: null },
  { id: "patricija-palubinskaite", name: "Patricija Palubinskaitė", instagramUrl: null, portrait: "/assets/designers/designer-patricija-palubinskaite.jpg", discipline: null, showingTime: null, bio: null },
];

// ----------------------------------------------------------------------------
// Hero annotations — the accent-outlined callout boxes with connector lines
// pointing at the cover photo. Coords are PERCENTAGES of the photo box, so they
// survive an image swap: (x, y) is the label's anchor, (tx, ty) the point on
// the image the connector line reaches. Values may sit outside 0–100 to place a
// label beside the photo. Only the first shows on mobile (a 360px portrait is
// too tight for three).
// ----------------------------------------------------------------------------

export interface HeroAnnotation {
  label: string;
  x: number;
  y: number;
  tx: number;
  ty: number;
  hideOnMobile?: boolean;
}

export const heroAnnotations: HeroAnnotation[] = [
  // Top-left label sits in open space beside the type; the other two rest in the
  // photo's clear upper/lower-right zones (away from the type overlap + edges).
  { label: "Look 01", x: -52, y: 8, tx: 20, ty: 24 },
  { label: "5 Years", x: 50, y: 6, tx: 72, ty: 20, hideOnMobile: true },
  { label: "Vilnius", x: 52, y: 44, tx: 74, ty: 54, hideOnMobile: true },
];

// ----------------------------------------------------------------------------
// Schedule — running order for the night. Placeholder times: swap in the real
// timings once the show flow is finalized; section numbers render from index.
// ----------------------------------------------------------------------------

export interface ScheduleItem {
  time: string;
  title: string;
  detail?: string;
}

export const schedule: ScheduleItem[] = [
  { time: "18:00", title: "Doors open" },
  { time: "19:00", title: "Welcome" },
  { time: "19:15", title: "Runway", detail: "Nine designers, one collection each" },
  { time: "21:00", title: "Afterparty" },
];

// ----------------------------------------------------------------------------
// Partners — main three set big as an editorial list, the rest as a smaller
// logo wall. logo: null renders the name typeset in mono, no image required.
// ----------------------------------------------------------------------------

export interface Partner {
  name: string;
  url?: string;
  /** Path under /public/assets/partners/, e.g. "/assets/partners/partner-pepsi.svg". */
  logo: string | null;
}

export const partners: { main: Partner[]; wall: Partner[] } = {
  main: [
    { name: "Aibė", logo: null },
    { name: "Pepsi", logo: null },
    { name: "Huracán Coffee", logo: null },
  ],
  wall: [
    { name: "Keune", logo: null },
    { name: "Femina Bona", logo: null },
    { name: "Glow Studio", logo: null },
    { name: "Texas Taxes", logo: null },
    { name: "Citywave Vilnius", logo: null },
    { name: "Kakava.lt", logo: null, url: "https://kakava.lt" },
  ],
};

// ----------------------------------------------------------------------------
// About / manifesto copy — adapted from the site's existing intro copy to keep
// messaging consistent. This is prose, not structural data — edit freely.
// ----------------------------------------------------------------------------

// Manifesto copy. Inline markers, parsed by the Manifesto component:
//   *word*   → serif-italic emphasis     ==word== → accent highlight-swipe
export const about = {
  paragraphs: [
    "Since 2022, Young Fashion has given Vilnius' emerging designers a stage most wait years for — *a real runway, a real audience, no gatekeeping.*",
    "No. 5 marks ==five years== of that bet paying off: nine new collections, one night, the same mission we started with.",
  ],
  pullQuote: "A platform where raw talent meets the runway.",
  quoteMeta: "Young Fashion, est. 2022",
};

// ----------------------------------------------------------------------------
// Past editions — the five-year archive, shown as a coverflow of magazine
// covers (Issues 01–05). Each cover links to its existing /events/[slug] page.
// cover: null renders a pure-typographic cover (used for the current, unshot
// issue). Photo sources are real event photography; the 2022 source is a large
// original — resized in place for web before shipping (see build stage 6).
// ----------------------------------------------------------------------------

export interface PastEdition {
  /** Two-digit issue number, "01"–"05". */
  issue: string;
  year: string;
  title: string;
  /** Cover photo path, or null for a typographic-only cover. */
  cover: string | null;
  /** Where the cover links — an existing /events/[slug] page, or "/#tickets". */
  href: string;
}

export const pastEditions: PastEdition[] = [
  {
    issue: "01",
    year: "2022",
    title: "The Beginning",
    cover: "/events/2022/DSC_6412.jpg",
    href: "/events/young-fashion-2022-the-beginning",
  },
  {
    issue: "02",
    year: "2023",
    title: "Fashion & Sustainability",
    cover: "/events/2023/petkute/IMGP0011.jpg",
    href: "/events/young-fashion-2023-second-event",
  },
  {
    issue: "03",
    year: "2024",
    title: "National Art Gallery",
    cover: "/workshop/2024/cover.jpg",
    href: "/events/young-fashion-2024-national-art-gallery",
  },
  {
    issue: "04",
    year: "2025",
    title: "Vilnius Fashion Week",
    cover: "/photowall/2025/KristinaPetrikonyte-4184835.jpg",
    href: "/events/young-fashion-2025-closing-vilnius-fashion-week",
  },
  {
    issue: "05",
    year: "2026",
    title: "Five Years",
    cover: null,
    href: "/#tickets",
  },
];

// ----------------------------------------------------------------------------
// SEO — used by layout.tsx metadata + the generated OG image.
// ----------------------------------------------------------------------------

export const seo = {
  title: "Young Fashion — 5 Years Anniversary · 19.09.2026 · Vilnius",
  description:
    "Young Fashion turns five. Nine designers, one runway — 19 September 2026 at City Wave, Vilnius.",
  // TODO: swap for the live domain once it's registered/pointed.
  url: "https://youngfashion.lt",
};

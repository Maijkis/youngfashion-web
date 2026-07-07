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
  "location",
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
  /** Live Google Maps link for the venue — the Location section's map + "Get Directions" point here. */
  mapsUrl: string;
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
  mapsUrl: "https://www.google.com/maps/search/?api=1&query=City+Wave+%C5%A0v.+Stepono+g.+41+Vilnius",
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
// Hero — pure type masthead; the one accent info block is its only furniture.
// ----------------------------------------------------------------------------

export interface HeroContent {
  /** Lines inside the single accent info block on the hero. */
  infoLines: string[];
}

export const hero: HeroContent = {
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
// Partners — one profile per partner drives every partner surface: the
// homepage Partners section (tier "main" = big editorial list, tier "wall" =
// marquee credits), the Press & Partners sponsor grid, and each partner's
// /press-partners/<slug> profile page with its communication map.
//
// The comms entries below are PLACEHOLDER content — swap titles/dates/copy
// and drop photos into /public/assets/partners/comms/ (e.g. "comms/aibe-01.jpg")
// as the collab content ships. image: null renders the on-brand placeholder.
// ----------------------------------------------------------------------------

export interface CommunicationItem {
  /** Display date, free text — e.g. "14.03.2026". */
  date: string;
  /** Short kind tag shown on the media slot, e.g. "Instagram Reel". */
  kind: string;
  title: string;
  /** 1–2 sentences max — keeps the map scannable. */
  description: string;
  /** "/assets/partners/comms/<slug>-01.jpg". Null renders the placeholder slot. */
  image: string | null;
  /** Optional link to the live post/article. */
  link?: string;
}

export interface PartnerProfile {
  /** Route segment: /press-partners/<slug> */
  slug: string;
  name: string;
  /** "main" = big editorial list on the homepage; "wall" = marquee credits. */
  tier: "main" | "wall";
  /**
   * Path under /public/assets/partners/. Null typesets the name instead.
   * Files are ink-on-transparent PNGs (backgrounds keyed out); tiles also
   * blend-multiply, so a stray white background still disappears on paper.
   */
  logo: string | null;
  url?: string;
  /** One editorial sentence under the name on the profile page. */
  blurb: string;
  /** The communication roadmap, in rough chronological order. */
  comms: CommunicationItem[];
}

export const partnerProfiles: PartnerProfile[] = [
  {
    slug: "aibe",
    name: "Aibė",
    tier: "main",
    logo: "/assets/partners/partner-aibe.png",
    blurb: "Retail partner backing young Lithuanian fashion at the No. 5 anniversary show.",
    comms: [
      { date: "14.03.2026", kind: "Announcement", title: "Partnership announced", description: "Joint post introducing Aibė as a No. 5 partner across both feeds.", image: null },
      { date: "02.06.2026", kind: "Instagram Reel", title: "Designer visit", description: "Reel following two lineup designers sourcing materials for their collections.", image: null },
      { date: "19.09.2026", kind: "On Site", title: "Show-day presence", description: "Branded corner and refreshments for guests at City Wave.", image: null },
      { date: "26.09.2026", kind: "Recap", title: "Thank-you feature", description: "Closing carousel with the night's photos and a thank-you note.", image: null },
    ],
  },
  {
    slug: "pepsi",
    name: "Pepsi",
    tier: "main",
    logo: "/assets/partners/partner-pepsi.png",
    blurb: "Keeping the front row refreshed — drinks partner of the anniversary show.",
    comms: [
      { date: "10.04.2026", kind: "Announcement", title: "Partnership announced", description: "Co-branded post confirming Pepsi as the show's drinks partner.", image: null },
      { date: "28.08.2026", kind: "Stories", title: "Fitting-day coolers", description: "Stories takeover from the first full fitting day, fridge stocked.", image: null },
      { date: "19.09.2026", kind: "On Site", title: "Bar takeover", description: "Branded bar at City Wave through the show and the afterparty.", image: null },
      { date: "24.09.2026", kind: "Aftermovie", title: "Aftermovie feature", description: "Logo billing in the official No. 5 aftermovie end card.", image: null },
    ],
  },
  {
    slug: "huracan-coffee",
    name: "Huracán Coffee",
    tier: "main",
    logo: null,
    blurb: "Fuel for the 6 a.m. fittings and the midnight run-throughs.",
    comms: [
      { date: "05.05.2026", kind: "Announcement", title: "Partnership announced", description: "Joint post welcoming Huracán as the show's coffee partner.", image: null },
      { date: "30.08.2026", kind: "Instagram Reel", title: "Rehearsal espresso bar", description: "Pop-up bar keeping the crew upright through tech rehearsals.", image: null },
      { date: "19.09.2026", kind: "On Site", title: "Show-day cart", description: "Coffee cart at the venue entrance from doors to lights-down.", image: null },
    ],
  },
  {
    slug: "femina-bona-keune",
    name: "Femina Bona × Keune",
    tier: "main",
    logo: "/assets/partners/partner-femina-bona-keune.png",
    blurb: "Hair by Femina Bona with Keune — every look that walks the runway.",
    comms: [
      { date: "20.05.2026", kind: "Announcement", title: "Partnership announced", description: "Post introducing the hair team behind all nine collections.", image: null },
      { date: "01.09.2026", kind: "Stories", title: "Look tests", description: "Test-day stories — references, first passes, designer sign-offs.", image: null },
      { date: "18.09.2026", kind: "Instagram Reel", title: "Backstage prep", description: "Reel from the backstage hair stations the night before the show.", image: null },
      { date: "19.09.2026", kind: "Credit", title: "Show-night credit", description: "Team credit across the show-night coverage and photo captions.", image: null },
    ],
  },
  {
    slug: "texas-taxes",
    name: "Texas Taxes",
    tier: "main",
    logo: null,
    blurb: "The numbers behind the show — accounting partner of Young Fashion.",
    comms: [
      { date: "12.06.2026", kind: "Announcement", title: "Partnership announced", description: "Post welcoming Texas Taxes as the show's accounting partner.", image: null },
      { date: "08.09.2026", kind: "Feature", title: "How a show gets budgeted", description: "Short feature on what it takes to finance an independent runway show.", image: null },
      { date: "19.09.2026", kind: "Credit", title: "Show-night credit", description: "Partner billing in the programme and closing thanks.", image: null },
    ],
  },
  {
    slug: "studio-glow",
    name: "Studio Glow",
    tier: "main",
    logo: "/assets/partners/partner-studio-glow.png",
    blurb: "Make-up partner — faces for all nine collections.",
    comms: [
      { date: "22.05.2026", kind: "Announcement", title: "Partnership announced", description: "Post introducing the make-up team for the anniversary show.", image: null },
      { date: "03.09.2026", kind: "Instagram Reel", title: "Beauty test shoot", description: "Reel from the beauty direction test — nine designers, nine briefs.", image: null },
      { date: "19.09.2026", kind: "Stories", title: "Backstage counter", description: "Stories from the make-up stations as the first looks go on.", image: null },
      { date: "25.09.2026", kind: "Recap", title: "Looks recap", description: "Carousel of the finished faces shot on the runway.", image: null },
    ],
  },
  {
    slug: "citywave-vilnius",
    name: "Citywave Vilnius",
    tier: "wall",
    logo: "/assets/partners/partner-citywave.png",
    blurb: "The venue — No. 5 happens under the wave on Šv. Stepono g. 41.",
    comms: [
      { date: "02.04.2026", kind: "Announcement", title: "Venue reveal", description: "Post announcing City Wave as the home of the anniversary show.", image: null },
      { date: "15.07.2026", kind: "Instagram Reel", title: "Space walkthrough", description: "Reel walking the empty hall — runway line, seating, light plan.", image: null },
      { date: "18.09.2026", kind: "Timelapse", title: "Load-in", description: "Timelapse of the build: rig up, runway down, doors in 24 hours.", image: null },
    ],
  },
  {
    slug: "kakava-lt",
    name: "Kakava.lt",
    tier: "wall",
    logo: null,
    url: "https://kakava.lt",
    blurb: "Ticketing partner — every Young Fashion ticket runs through Kakava.",
    comms: [
      { date: "01.06.2026", kind: "Announcement", title: "Tickets live", description: "Joint post the morning ticketing opened on kakava.lt.", image: null },
      { date: "01.09.2026", kind: "Reminder", title: "Price-tier switch", description: "Reminder post before the early-bird tier closed.", image: null },
      { date: "17.09.2026", kind: "Stories", title: "Last call", description: "Final-tickets countdown stories two days before the show.", image: null },
    ],
  },
];

/** Homepage Partners section shape — derived from the profiles above so the
 *  two surfaces can never drift apart. */
export interface Partner {
  slug: string;
  name: string;
  url?: string;
  logo: string | null;
}

const toPartner = ({ slug, name, url, logo }: PartnerProfile): Partner => ({
  slug,
  name,
  url,
  logo,
});

export const partners: { main: Partner[]; wall: Partner[] } = {
  main: partnerProfiles.filter((p) => p.tier === "main").map(toPartner),
  wall: partnerProfiles.filter((p) => p.tier === "wall").map(toPartner),
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

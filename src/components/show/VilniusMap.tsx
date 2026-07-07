// ============================================================================
// VilniusMap — a stylized, hand-drawn plan of central Vilnius in the site
// palette: paper-deep city blocks, hairline side streets, ink arteries, the
// Neris as the one magenta ribbon, and the venue pinned with an accent marker.
// Deliberately schematic (an editorial illustration, not cartography) — the
// wrapping link in Location.tsx opens the real Google Maps location.
//
// All type is HTML overlaid on the SVG (not <text>): the viewBox scales down
// to ~350px on phones, where SVG text would render at ~4px. Overlay positions
// are percentages of the 800×500 viewBox (x/8, y/5).
// ============================================================================

/** City blocks — irregular quads hugging the arteries, denser in Old Town. */
const BLOCKS = [
  "470,215 545,210 540,255 468,252",
  "472,262 538,258 530,310 478,308",
  "482,318 528,315 520,365 486,360",
  "380,240 445,245 450,300 385,295",
  "350,310 440,315 445,365 355,362",
  "300,378 418,386 414,410 340,416",
  "200,185 320,180 318,215 205,222",
  "360,182 470,186 466,212 362,210",
  "250,100 350,95 348,130 252,135",
  "420,85 500,76 505,110 425,118",
  "590,220 650,215 655,275 595,278",
  "560,430 660,425 665,470 565,472",
];

/** Secondary street web — short hairline connectors between the arteries. */
const LANES = [
  "M505 300 L455 305",
  "M470 255 L428 235",
  "M468 215 L438 182",
  "M500 370 L466 376",
  "M470 400 L502 448",
  "M280 355 L462 338",
  "M322 300 L348 392",
  "M332 430 L312 472",
  "M330 432 L258 452",
  "M240 120 L470 105",
  "M400 95 L428 28",
  "M300 142 L380 130",
  "M600 230 L642 262",
  "M578 205 L590 292",
  "M520 330 L598 360",
  "M505 395 L522 452",
];

/** Arteries: Gedimino pr., the Pilies→Aušros Vartų axis, Pylimo g., and
 *  Šv. Stepono g. — the venue street. */
const ARTERIES = [
  "M540 200 L110 235",
  "M555 205 C545 265 525 330 505 395",
  "M445 205 C452 275 462 335 480 420",
  "M472 400 L330 432",
];

const CAPTIONS = [
  { text: "Gediminas Tower", left: "74.4%", top: "33%", transform: "translateX(-50%)" },
  { text: "Cathedral", left: "68.75%", top: "42%", transform: "translateX(-50%)" },
  { text: "Halės Market", left: "56%", top: "65.5%", transform: "translateX(-50%)" },
  { text: "Station", left: "68.25%", top: "92.8%", transform: "translateY(-50%)" },
  { text: "Neris", left: "21%", top: "25.2%", transform: "translate(-50%, -50%) rotate(-3deg)" },
];

/** Rotated along their streets; desktop-only — too dense under ~768px. */
const STREET_LABELS = [
  { text: "Gedimino pr.", left: "40.6%", top: "43.4%", rotate: "-4.5deg" },
  { text: "Pylimo g.", left: "55%", top: "57%", rotate: "81deg" },
  { text: "Šv. Stepono g.", left: "52.5%", top: "79.6%", rotate: "-13deg" },
];

export default function VilniusMap() {
  return (
    <div className="relative aspect-[8/5] w-full overflow-hidden" aria-hidden>
      <svg
        viewBox="0 0 800 500"
        className="absolute inset-0 h-full w-full"
        fill="none"
      >
        <g fill="var(--color-paper-deep)" opacity="0.55">
          {BLOCKS.map((points) => (
            <polygon key={points} points={points} />
          ))}
        </g>

        <g stroke="var(--color-hairline)" strokeWidth="1">
          {LANES.map((d) => (
            <path key={d} d={d} />
          ))}
        </g>

        <g
          stroke="var(--color-ink)"
          strokeOpacity="0.45"
          strokeWidth="2"
          strokeLinecap="round"
        >
          {ARTERIES.map((d) => (
            <path key={d} d={d} />
          ))}
        </g>

        {/* Neris — the one accent ribbon, flowing in from the NE and out west */}
        <path
          d="M800 60 C730 45 680 55 635 80 C596 101 572 124 540 140 C495 162 430 172 355 168 C260 162 150 148 60 158 C40 161 20 164 0 168"
          stroke="var(--color-accent)"
          strokeOpacity="0.9"
          strokeWidth="12"
          strokeLinecap="round"
        />

        {/* Landmarks — minimal geometric ink marks */}
        <g stroke="var(--color-ink)" strokeWidth="1.5">
          {/* Gediminas Tower on its hill, at the river bend */}
          <path d="M576 154 Q595 136 614 154" />
          <path d="M590 138 V118 H600 V138" />
          <path d="M587 118 H603" />
          {/* Cathedral — pediment over columns */}
          <path d="M538 202 H562" />
          <path d="M538 194 L550 186 L562 194" />
          <path d="M542 202 V195 M547 202 V195 M553 202 V195 M558 202 V195" />
          {/* Halės Market — gabled hall */}
          <path d="M450 380 V370 H474 V380 H450" />
          <path d="M448 370 L462 361 L476 370" />
          {/* Train station */}
          <path d="M511 470 V458 H539 V470 H511" />
          <circle cx="525" cy="464" r="1.8" fill="var(--color-ink)" stroke="none" />
        </g>

        {/* The venue — ring + dot on Šv. Stepono g., connector down to the pill */}
        <g>
          <circle cx="350" cy="425" r="10" stroke="var(--color-accent)" strokeWidth="1.5" />
          <circle cx="350" cy="425" r="4.5" fill="var(--color-accent)" />
          <path d="M350 425 L302 458" stroke="var(--color-accent)" strokeWidth="1" />
        </g>
      </svg>

      {/* Labels — cartographic microtype, deliberately below the 12px label
          token so the venue pill stays the loudest thing on the map. */}
      <div className="pointer-events-none absolute inset-0">
        {CAPTIONS.map((c) => (
          <span
            key={c.text}
            className="absolute font-mono text-[10px] uppercase tracking-[0.12em] whitespace-nowrap text-[var(--color-ink-muted)]"
            style={{ left: c.left, top: c.top, transform: c.transform }}
          >
            {c.text}
          </span>
        ))}

        {STREET_LABELS.map((s) => (
          <span
            key={s.text}
            className="absolute hidden md:block font-mono text-[9px] uppercase tracking-[0.12em] whitespace-nowrap text-[var(--color-ink-muted)]/80"
            style={{
              left: s.left,
              top: s.top,
              transform: `translate(-50%, -50%) rotate(${s.rotate})`,
            }}
          >
            {s.text}
          </span>
        ))}

        {/* Venue pill — the annotation language, pointing at the marker */}
        <span
          className="mono-label absolute inline-flex items-center gap-1.5 whitespace-nowrap border border-[var(--color-accent)] bg-[var(--color-paper)] px-2 py-1 text-[var(--color-accent-text)]"
          style={{ left: "37.75%", top: "91.6%", transform: "translate(-100%, -50%)" }}
        >
          <span aria-hidden>★</span> City Wave
        </span>
      </div>
    </div>
  );
}

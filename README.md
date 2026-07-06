# Young Fashion

The official site for **Young Fashion**, a Vilnius youth fashion platform. The homepage is a one-pager promo microsite for the **No. 5 — 5 Years Anniversary** runway show (2026-09-19, City Wave, Vilnius); the rest of the site (About, Galleries, Events, Press & Partners) is the platform's ongoing archive.

## Updating the show each year

Everything specific to the anniversary show — date, venue, ticket link, designer lineup, running order, partners, about copy — lives in **one file**:

```
src/lib/content.ts
```

Edit that file only. No component should ever need to change to reflect a new date, a new lineup, or a new partner list. Key exports:

- `event` — name, date (`dateISO`, used by the countdown — keep it ISO 8601 with the UTC+3 offset), venue, `ticketUrl`, Instagram, email.
- `hero` — the hero's portrait/video path and the one accent info block's lines.
- `designers` — the 9-person lineup, in running order.
- `schedule` — the night's running order (doors, welcome, runway, afterparty).
- `partners` — `main` (the big-type list) and `wall` (the smaller logo grid).
- `about` — the manifesto paragraphs and pull-quote.
- `seo` — title/description used in metadata and the generated OG share image.

### Ticket link placeholder

`event.ticketUrl` starts as `"{{TICKET_URL}}"`. While it contains `{{`, the site treats ticketing as "not live yet": the Hero, Navbar, sticky mobile bar, and Tickets section all point to the on-page tickets section instead of an external link, and the Tickets section shows a "Tickets Soon — follow @..." state. Paste the real kakava.lt checkout URL in to flip everything to live, external ticket links automatically.

## Dropping in real photos

Until real assets exist, every image slot renders as a bordered placeholder block with a mono label — the site is designed to look complete with zero uploaded files.

1. Drop files into `public/assets/`:
   - `public/assets/designers/designer-<id>.jpg` — one portrait per designer (see each designer's `id` in `content.ts`)
   - `public/assets/hero/hero-portrait.jpg` — the hero's type-over-photo image
   - `public/assets/hero/hero-video.webm` + `hero-video.mp4` + `hero-poster.jpg` — optional autoplay loop, wins over the static portrait once all three exist
   - `public/assets/partners/partner-<slug>.svg` — partner logos
2. Paste the path into the matching field in `content.ts` (e.g. a designer's `portrait: "/assets/designers/designer-karina-panina.jpg"`). Leave it `null` to keep showing the placeholder.

Photos render black-and-white by default (the `.img-bw` CSS filter) regardless of the source file — no need to pre-process for color.

Recommended sizes: portraits ~1200×1600px JPG (3:4), partner logos as SVG where possible.

## Fonts

Display type is **Clash Display** and body/UI text is **General Sans**, both from [Fontshare](https://www.fontshare.com), self-hosted via `next/font/local` under `src/fonts/`. Metadata/labels use **Space Mono** and the About section's pull-quote uses **Instrument Serif**, both via `next/font/google`. The Fontshare Free Font License (free for personal/commercial use, self-hosting permitted) is included at `src/fonts/LICENSE-fontshare.txt`.

## Development

```bash
npm run dev      # start the dev server at localhost:3000
npm run build    # production build
npm run start    # run the production build locally
npm run lint     # eslint
```

## Deploying

This is a standard Next.js App Router project — deploy it anywhere Next.js runs (Vercel, etc.). Before going live, set `seo.url` in `content.ts` to the real domain — it feeds `metadataBase` and the generated Open Graph share image.

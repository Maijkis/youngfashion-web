import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { event } from "@/lib/content";

export const runtime = "nodejs";
export const alt = "Young Fashion — 5 Years Anniversary";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpengraphImage() {
  const clashDisplay = await readFile(join(process.cwd(), "src/fonts/ClashDisplay-Semibold.otf"));

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: "#F4F1EA",
          padding: "64px 72px",
          fontFamily: "Clash Display",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", fontSize: 28, color: "#111111", letterSpacing: "0.03em" }}>
            YOUNG FASHION
            <span style={{ color: "#FF2E93" }}>*</span>
          </div>
          <div style={{ display: "flex", fontSize: 20, color: "#6E695F" }}>
            * {event.editionShort.toUpperCase()} *
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", fontSize: 108, color: "#111111", lineHeight: 0.95, letterSpacing: "-0.02em" }}>
            YOUNG
          </div>
          <div style={{ display: "flex", fontSize: 108, color: "#111111", lineHeight: 0.95, letterSpacing: "-0.02em" }}>
            FASHION
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div style={{ display: "flex", backgroundColor: "#FF2E93", color: "#111111", padding: "12px 20px", fontSize: 22 }}>
            {event.dayLabel} {event.dateLabel} — {event.timeLabel}
          </div>
          <div style={{ display: "flex", fontSize: 22, color: "#111111" }}>
            {event.venue}, {event.city}
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        {
          name: "Clash Display",
          data: clashDisplay,
          style: "normal",
          weight: 600,
        },
      ],
    }
  );
}

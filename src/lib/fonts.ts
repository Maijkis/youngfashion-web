import localFont from "next/font/local";
import { Space_Mono, Instrument_Serif } from "next/font/google";

// Self-hosted via next/font/local — see src/fonts/LICENSE-fontshare.txt (Fontshare
// Free Font License: free for personal/commercial use, self-hosting permitted).
export const clashDisplay = localFont({
  src: "../fonts/ClashDisplay-Variable.woff2",
  variable: "--font-clash-display",
  weight: "200 700",
  display: "swap",
});

export const generalSans = localFont({
  src: [
    { path: "../fonts/GeneralSans-Variable.woff2", weight: "200 700", style: "normal" },
    { path: "../fonts/GeneralSans-VariableItalic.woff2", weight: "200 700", style: "italic" },
  ],
  variable: "--font-general-sans",
  display: "swap",
});

export const spaceMono = Space_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-space-mono",
  display: "swap",
});

export const serifAccent = Instrument_Serif({
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal", "italic"],
  variable: "--font-serif-accent",
  display: "swap",
});

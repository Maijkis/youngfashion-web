import type { Metadata, Viewport } from "next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import SmoothScroll from "@/components/providers/SmoothScroll";
import CtaTracker from "@/components/providers/CtaTracker";
import StarCursor from "@/components/show/StarCursor";
import GrainOverlay from "@/components/ui/GrainOverlay";
import { clashDisplay, generalSans, spaceMono, serifAccent } from "@/lib/fonts";
import { seo } from "@/lib/content";
import "./globals.css";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  viewportFit: "cover",
  themeColor: "#F4F1EA",
};

export const metadata: Metadata = {
  metadataBase: new URL(seo.url),
  title: seo.title,
  description: seo.description,
  openGraph: {
    title: seo.title,
    description: seo.description,
    siteName: "Young Fashion",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: seo.title,
    description: seo.description,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${clashDisplay.variable} ${generalSans.variable} ${spaceMono.variable} ${serifAccent.variable}`}
    >
      <body className="font-sans antialiased bg-[var(--color-paper)] text-[var(--color-ink)]">
        <SmoothScroll>
          <StarCursor />
          <CtaTracker />
          <Navbar />
          <main className="min-h-screen">{children}</main>
          <Footer />
          <GrainOverlay />
        </SmoothScroll>
      </body>
    </html>
  );
}

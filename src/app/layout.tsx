import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import SmoothScroll from "@/components/providers/SmoothScroll";
import "./globals.css";

const inter = Inter({
  variable: "--font-helvetica",
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700"],
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  viewportFit: "cover",
  themeColor: "#000000",
};

export const metadata: Metadata = {
  title: "Young Fashion — Empowering Young Designers in Vilnius",
  description:
    "Young Fashion is a Vilnius-based platform empowering emerging designers since 2022. Discover runway shows, galleries, events, and more.",
  openGraph: {
    title: "Young Fashion",
    description:
      "Empowering emerging designers in Vilnius since 2022. Runway shows, galleries, events, and more.",
    siteName: "Young Fashion",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Young Fashion",
    description:
      "Empowering emerging designers in Vilnius since 2022.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} font-sans antialiased bg-black text-white`}
      >
        <SmoothScroll>
          <Navbar />
          <main className="min-h-screen">{children}</main>
          <Footer />
        </SmoothScroll>
      </body>
    </html>
  );
}

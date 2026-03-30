import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

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
    <html lang="en" data-scroll-behavior="smooth">
      <body
        className={`${inter.variable} font-sans antialiased bg-black text-white`}
      >
        <Navbar />
        <main className="min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  );
}

import dynamic from "next/dynamic";
import Hero from "@/components/home/Hero";

const MarqueeText = dynamic(() => import("@/components/home/MarqueeText"));
const UpcomingEvents = dynamic(() => import("@/components/home/UpcomingEvents"));
const IntroSection = dynamic(() => import("@/components/home/IntroSection"));
const ParallaxBand = dynamic(() => import("@/components/home/ParallaxBand"));
const DesignersShowcase = dynamic(() => import("@/components/home/DesignersShowcase"));
const FeaturedGrid = dynamic(() => import("@/components/home/FeaturedGrid"));
const NewsSection = dynamic(() => import("@/components/home/NewsSection"));
const PartnersStrip = dynamic(() => import("@/components/home/PartnersStrip"));

export default function HomePage() {
  return (
    <>
      <Hero />
      <MarqueeText />
      <UpcomingEvents />
      <IntroSection />
      <ParallaxBand />
      <DesignersShowcase />
      <FeaturedGrid />
      <NewsSection />
      <PartnersStrip />
    </>
  );
}

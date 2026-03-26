import Hero from "@/components/home/Hero";
import UpcomingEvents from "@/components/home/UpcomingEvents";
import IntroSection from "@/components/home/IntroSection";
import FeaturedGrid from "@/components/home/FeaturedGrid";

export default function HomePage() {
  return (
    <>
      <Hero />
      <UpcomingEvents />
      <IntroSection />
      <FeaturedGrid />
    </>
  );
}

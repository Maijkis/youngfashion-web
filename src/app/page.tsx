import dynamic from "next/dynamic";
import Cover from "@/components/home/Cover";

const IntroSection = dynamic(() => import("@/components/home/IntroSection"));
const DesignerGrid = dynamic(() => import("@/components/home/DesignerGrid"));
const UpcomingEvents = dynamic(() => import("@/components/home/UpcomingEvents"));
const NewsSection = dynamic(() => import("@/components/home/NewsSection"));
const PartnersStrip = dynamic(() => import("@/components/home/PartnersStrip"));

export default function HomePage() {
  return (
    <div className="theme-editorial">
      <Cover />
      <IntroSection />
      <DesignerGrid />
      <UpcomingEvents />
      <NewsSection />
      <PartnersStrip />
    </div>
  );
}

import type { Metadata } from "next";
import SectionHeader from "@/components/ui/SectionHeader";
import EventTimeline from "@/components/events/EventTimeline";

export const metadata: Metadata = {
  title: "Events & Initiatives | Young Fashion",
  description:
    "Explore Young Fashion runway shows, pop-ups, workshops, and events in Vilnius — from 2022 to the upcoming 2026 edition.",
};

export default function EventsPage() {
  return (
    <div className="pt-28 md:pt-36 pb-16 md:pb-24 px-6 md:px-12 lg:px-20">
      <div className="max-w-7xl mx-auto">
        <SectionHeader
          title="Events & Initiatives"
          subtitle="Runway shows, pop-ups, workshops, and more"
        />
        <EventTimeline />
      </div>
    </div>
  );
}

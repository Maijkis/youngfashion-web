import type { Metadata } from "next";
import PageShell from "@/components/layout/PageShell";
import SectionHeader from "@/components/ui/SectionHeader";
import EventTimeline from "@/components/events/EventTimeline";

export const metadata: Metadata = {
  title: "Events & Initiatives | Young Fashion",
  description:
    "Explore Young Fashion runway shows, pop-ups, workshops, and events in Vilnius — from 2022 to the upcoming 2026 edition.",
};

export default function EventsPage() {
  return (
    <PageShell className="container pt-28 md:pt-36 pb-section">
      <SectionHeader
        title="Events & Initiatives"
        subtitle="Runway shows, pop-ups, workshops, and more"
      />
      <EventTimeline />
    </PageShell>
  );
}

import SectionHeader from "@/components/ui/SectionHeader";
import EventTimeline from "@/components/events/EventTimeline";

export default function EventsPage() {
  return (
    <div className="pt-28 md:pt-36 pb-16 md:pb-24 px-4 md:px-6">
      <div className="max-w-5xl mx-auto">
        <SectionHeader
          title="Events & Initiatives"
          subtitle="Runway shows, pop-ups, workshops, and more"
        />
        <EventTimeline />
      </div>
    </div>
  );
}

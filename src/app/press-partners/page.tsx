import SponsorSection from "@/components/press/SponsorMarquee";
import PressGrid from "@/components/press/PressGrid";
import SectionHeader from "@/components/ui/SectionHeader";

export default function PressPartnersPage() {
  return (
    <div className="pt-28 md:pt-36">
      <div className="px-4 md:px-6">
        <SectionHeader
          title="Press & Partners"
          subtitle="Media coverage and the brands behind Young Fashion"
        />
      </div>
      <SponsorSection />
      <PressGrid />
    </div>
  );
}

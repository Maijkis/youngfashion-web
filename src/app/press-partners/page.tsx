import type { Metadata } from "next";
import SponsorSection from "@/components/press/SponsorMarquee";
import PressGrid from "@/components/press/PressGrid";
import SectionHeader from "@/components/ui/SectionHeader";

export const metadata: Metadata = {
  title: "Press & Partners | Young Fashion",
  description:
    "Young Fashion in the media — press coverage, sponsor partnerships, and brand collaborations from Vilnius's emerging fashion platform.",
};

export default function PressPartnersPage() {
  return (
    <div className="pt-28 md:pt-36 pb-16 md:pb-24">
      <div className="px-6 md:px-12 lg:px-20">
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

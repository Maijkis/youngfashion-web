import type { Metadata } from "next";
import MissionStatement from "@/components/about/MissionStatement";
import TeamGrid from "@/components/about/TeamGrid";
import ContactSection from "@/components/about/ContactSection";

export const metadata: Metadata = {
  title: "About | Young Fashion",
  description:
    "Meet the team behind Young Fashion — a Vilnius-based platform empowering emerging fashion designers since 2022.",
};

export default function AboutPage() {
  return (
    <div className="pt-28 md:pt-36">
      <MissionStatement />
      <TeamGrid />
      <ContactSection />
    </div>
  );
}

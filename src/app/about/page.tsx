import type { Metadata } from "next";
import BackButton from "@/components/ui/BackButton";
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
      <div className="container mb-8">
        <BackButton />
      </div>
      <MissionStatement />
      <TeamGrid />
      <ContactSection />
    </div>
  );
}

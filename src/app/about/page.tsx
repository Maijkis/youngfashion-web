import MissionStatement from "@/components/about/MissionStatement";
import TeamGrid from "@/components/about/TeamGrid";
import ContactSection from "@/components/about/ContactSection";

export default function AboutPage() {
  return (
    <div className="pt-28 md:pt-36">
      <MissionStatement />
      <TeamGrid />
      <ContactSection />
    </div>
  );
}

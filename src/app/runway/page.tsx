import type { Metadata } from "next";
import Runway from "@/components/runway/Runway";

export const metadata: Metadata = {
  title: "Runway — Young Fashion",
  description: "Walk the runway. A scroll-driven cinematic experience.",
};

export default function RunwayPage() {
  return <Runway />;
}

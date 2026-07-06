import type { Metadata } from "next";
import GalleriesPageContent from "@/components/galleries/GalleriesPageContent";

export const metadata: Metadata = {
  title: "Galleries | Young Fashion",
  description:
    "Designer collections by year — browse Young Fashion's runway archive from 2022 to 2025, plus behind-the-scenes and photowall galleries.",
};

export default function GalleriesPage() {
  return <GalleriesPageContent />;
}

"use client";

import { useState } from "react";
import {
  designers,
  btsPhotos,
  photowallPhotos2025,
  behindTheScenesPhotos2025,
} from "@/lib/mockData";
import YearFilter from "@/components/galleries/YearFilter";
import DesignerGrid from "@/components/galleries/DesignerGrid";
import BehindTheScenes from "@/components/galleries/BehindTheScenes";
import PhotowallGallery from "@/components/galleries/PhotowallGallery";
import SectionHeader from "@/components/ui/SectionHeader";

const years = [2022, 2023, 2024, 2025];

export default function GalleriesPage() {
  const [activeYear, setActiveYear] = useState(2025);

  const filteredDesigners = designers.filter((d) => d.year === activeYear);
  const filteredBts = btsPhotos.filter((p) => p.year === activeYear);
  const showPhotowall = activeYear === 2025;
  const showLocalBts = activeYear === 2025;

  return (
    <div className="pt-28 md:pt-36 pb-16 md:pb-24 px-6 md:px-12 lg:px-20">
      <div className="max-w-7xl mx-auto">
        <SectionHeader
          title="Galleries"
          subtitle="Designer collections by year"
        />

        <YearFilter
          years={years}
          activeYear={activeYear}
          onChange={setActiveYear}
        />

        <DesignerGrid designers={filteredDesigners} />

        {showPhotowall && (
          <PhotowallGallery
            photos={photowallPhotos2025}
            previewCount={6}
            showSeeMore
          />
        )}

        <BehindTheScenes
          photos={showLocalBts ? behindTheScenesPhotos2025 : filteredBts}
          previewCount={showLocalBts ? 6 : undefined}
          showSeeMore={showLocalBts}
        />
      </div>
    </div>
  );
}

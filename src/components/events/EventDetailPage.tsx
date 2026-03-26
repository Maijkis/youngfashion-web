"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight, CalendarDays, MapPin } from "lucide-react";
import { EventItem } from "@/lib/mockData";
import SectionHeader from "@/components/ui/SectionHeader";
import Button from "@/components/ui/Button";

interface EventDetailPageProps {
  event: EventItem;
}

export default function EventDetailPage({ event }: EventDetailPageProps) {
  const [expanded, setExpanded] = useState(false);

  const galleryPhotos = useMemo(
    () => event.galleryPhotos && event.galleryPhotos.length > 0 ? event.galleryPhotos : event.images,
    [event.galleryPhotos, event.images]
  );

  const previewPhotos = expanded ? galleryPhotos : galleryPhotos.slice(0, 3);
  const hasMorePhotos = galleryPhotos.length > 3;

  return (
    <div className="pt-28 md:pt-36 pb-16 md:pb-24 px-4 md:px-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8 md:mb-10">
          <Link
            href="/events"
            className="inline-flex items-center gap-2 text-[11px] md:text-xs uppercase tracking-[0.18em] text-white/60 hover:text-white transition-colors"
          >
            <ArrowLeft size={14} />
            Back to Events
          </Link>
        </div>

        <section className="mb-16 md:mb-20">
          <div className="grid grid-cols-1 lg:grid-cols-[360px_minmax(0,1fr)] gap-6 md:gap-8 items-start">
            <div className="glass-card rounded-sm p-5 md:p-6">
              <p className="text-[10px] md:text-[11px] uppercase tracking-[0.2em] text-white/40 mb-3">
                Event Overview
              </p>
              <h1 className="text-xl md:text-3xl font-light uppercase tracking-[0.08em] text-white leading-tight mb-4">
                {event.title}
              </h1>

              <div className="space-y-3 mb-5 md:mb-6">
                <div className="flex items-center gap-2 text-white/50">
                  <CalendarDays size={14} />
                  <span className="text-[11px] md:text-xs uppercase tracking-[0.12em]">
                    {new Date(event.date).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </span>
                </div>
                {event.location && (
                  <div className="flex items-center gap-2 text-white/50">
                    <MapPin size={14} />
                    <span className="text-[11px] md:text-xs uppercase tracking-[0.12em]">
                      {event.location}
                    </span>
                  </div>
                )}
              </div>

              <p className="text-xs md:text-sm text-white/55 leading-relaxed">
                {event.longDescription ?? event.description}
              </p>
            </div>

            <div className="glass-card rounded-sm overflow-hidden">
              <div className="relative aspect-[16/10] md:aspect-[16/9]">
                <Image
                  src={event.images[0]}
                  alt={event.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 70vw"
                  priority
                />
              </div>
            </div>
          </div>
        </section>

        {event.sponsors && event.sponsors.length > 0 && (
          <section className="mb-16 md:mb-20">
            <SectionHeader
              title="Sponsors"
              subtitle="Supporters of this event"
            />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {event.sponsors.map((sponsor) => (
                <div
                  key={sponsor.id}
                  className="glass-card rounded-sm p-5 md:p-6 flex items-center justify-center aspect-[16/8]"
                >
                  <Image
                    src={sponsor.logo}
                    alt={sponsor.name}
                    width={260}
                    height={100}
                    className="h-10 md:h-12 w-auto object-contain invert opacity-75"
                  />
                </div>
              ))}
            </div>
          </section>
        )}

        <section>
          <SectionHeader
            title="Photos"
            subtitle="A closer look at the event"
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {previewPhotos.map((photo, index) => (
              <div
                key={`${photo}-${index}`}
                className="glass-card rounded-sm overflow-hidden"
              >
                <div className="relative aspect-[3/4]">
                  <Image
                    src={photo}
                    alt={`${event.title} photo ${index + 1}`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </div>
              </div>
            ))}
          </div>

          {hasMorePhotos && (
            <div className="mt-8 flex justify-center">
              <button
                type="button"
                onClick={() => setExpanded((prev) => !prev)}
                className="inline-flex items-center gap-2 glass-light px-5 py-3 text-[11px] md:text-xs uppercase tracking-[0.18em] text-white hover:bg-white/15 transition-colors"
              >
                {expanded ? "Show Less" : "See More"}
                <ArrowRight
                  size={14}
                  className={`transition-transform duration-300 ${
                    expanded ? "rotate-90" : ""
                  }`}
                />
              </button>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}

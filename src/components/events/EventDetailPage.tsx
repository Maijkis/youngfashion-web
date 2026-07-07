"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { EventItem } from "@/lib/mockData";
import SectionHeader from "@/components/ui/SectionHeader";

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
    <div className="container pt-28 md:pt-36 pb-section">
        <Link
          href="/events"
          className="mono-label inline-flex items-center gap-2 text-[var(--color-ink-muted)] hover:text-[var(--color-ink)] transition-colors mb-12 min-h-[44px]"
        >
          <ArrowLeft size={14} />
          Back to events
        </Link>

        {/* Hero */}
        <section className="mb-20 md:mb-28">
          <div className="relative aspect-[16/10] md:aspect-[21/9] overflow-hidden bg-[var(--color-paper-deep)] mb-10 md:mb-14">
            <Image
              src={event.images[0]}
              alt={event.title}
              fill
              className="object-cover"
              sizes="100vw"
              priority
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12">
            <div className="md:col-span-7">
              <div className="flex items-center gap-3 mb-6">
                <span className="mono-label text-[var(--color-ink-muted)]">
                  {new Date(event.date).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </span>
                {event.location && (
                  <>
                    <span className="w-6 h-px bg-[var(--color-ink)]/30" />
                    <span className="mono-label text-[var(--color-ink-muted)]">
                      {event.location}
                    </span>
                  </>
                )}
              </div>
              <h1 className="max-w-[22ch] font-display font-semibold uppercase text-[var(--color-ink)] leading-display tracking-tight text-h1">
                {event.title}
              </h1>
            </div>
            <div className="md:col-span-5 md:pt-2">
              <p className="text-[var(--color-ink)]/70 font-light leading-body text-body">
                {event.longDescription ?? event.description}
              </p>
            </div>
          </div>
        </section>

        {event.video && (
          <section className="mb-20 md:mb-28">
            <SectionHeader title="Aftermovie" subtitle="Watch the recap" />
            <div className="relative w-full aspect-video overflow-hidden bg-black">
              <video
                controls
                playsInline
                preload="metadata"
                poster={event.videoPoster ?? event.images[0]}
                className="w-full h-full object-cover"
              >
                <source src={event.video} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
          </section>
        )}

        {event.sponsors && event.sponsors.length > 0 && (
          <section className="mb-20 md:mb-28">
            <SectionHeader title="Sponsors" subtitle="Supporters of this event" />
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
              {event.sponsors.map((sponsor) => (
                <div
                  key={sponsor.id}
                  className="flex items-center justify-center aspect-[3/2] border border-[var(--color-hairline)]"
                >
                  {sponsor.logo ? (
                    <Image
                      src={sponsor.logo}
                      alt={sponsor.name}
                      width={260}
                      height={100}
                      className="h-8 md:h-10 w-auto object-contain opacity-80 hover:opacity-100 transition-opacity"
                    />
                  ) : (
                    <span className="mono-label text-[var(--color-ink-muted)] text-center px-3">
                      {sponsor.name}
                    </span>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        <section>
          <SectionHeader title="Photos" subtitle="A closer look" />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
            {previewPhotos.map((photo, index) => (
              <div
                key={`${photo}-${index}`}
                className="relative aspect-[3/4] overflow-hidden bg-[var(--color-paper-deep)]"
              >
                <Image
                  src={photo}
                  alt={`${event.title} photo ${index + 1}`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>
            ))}
          </div>

          {hasMorePhotos && (
            <div className="mt-10 md:mt-12 flex justify-center">
              <button
                type="button"
                onClick={() => setExpanded((prev) => !prev)}
                className="inline-flex items-center gap-2 text-label uppercase tracking-[0.28em] text-[var(--color-ink)] font-medium border-b border-[var(--color-ink)] pb-1 min-h-[44px] hover:gap-3 transition-all"
              >
                {expanded ? "Show less" : `See all ${galleryPhotos.length}`}
                <ArrowRight
                  size={14}
                  className={`transition-transform duration-300 ${expanded ? "rotate-90" : ""}`}
                />
              </button>
            </div>
          )}
        </section>
    </div>
  );
}

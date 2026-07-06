import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import EventDetailPage from "@/components/events/EventDetailPage";
import { events } from "@/lib/mockData";

interface EventPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata({ params }: EventPageProps): Promise<Metadata> {
  const { slug } = await params;
  const event = events.find((item) => item.slug === slug);

  if (!event) return {};

  return {
    title: `${event.title} | Young Fashion`,
    description: event.description,
  };
}

export default async function EventPage({ params }: EventPageProps) {
  const { slug } = await params;

  // The 5th-anniversary show now has its own full microsite at "/" — send
  // traffic there instead of the thinner generic event-detail page.
  if (slug === "young-fashion-2026") {
    redirect("/");
  }

  const event = events.find((item) => item.slug === slug);

  if (!event) {
    notFound();
  }

  return <EventDetailPage event={event} />;
}

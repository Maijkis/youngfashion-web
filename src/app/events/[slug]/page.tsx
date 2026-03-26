import { notFound } from "next/navigation";
import EventDetailPage from "@/components/events/EventDetailPage";
import { events } from "@/lib/mockData";

interface EventPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function EventPage({ params }: EventPageProps) {
  const { slug } = await params;
  const event = events.find((item) => item.slug === slug);

  if (!event) {
    notFound();
  }

  return <EventDetailPage event={event} />;
}

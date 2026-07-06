"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { event, ticketHref, ticketIsExternal } from "@/lib/content";
import useReducedMotion from "@/hooks/useReducedMotion";

/** Appears once the hero scrolls out of view, hides again while the tickets section itself is on screen. */
export default function StickyTicketsBar() {
  const [pastHero, setPastHero] = useState(false);
  const [inTickets, setInTickets] = useState(false);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const hero = document.getElementById("hero");
    const tickets = document.getElementById("tickets");

    const heroObserver = new IntersectionObserver(
      ([entry]) => setPastHero(!entry.isIntersecting),
      { threshold: 0 }
    );
    const ticketsObserver = new IntersectionObserver(
      ([entry]) => setInTickets(entry.isIntersecting),
      { threshold: 0.15 }
    );

    if (hero) heroObserver.observe(hero);
    if (tickets) ticketsObserver.observe(tickets);

    return () => {
      heroObserver.disconnect();
      ticketsObserver.disconnect();
    };
  }, []);

  const visible = pastHero && !inTickets;

  return (
    <div
      className={`md:hidden fixed bottom-0 inset-x-0 z-40 safe-bottom ${
        reducedMotion ? "" : "transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)]"
      } ${visible ? "translate-y-0" : "translate-y-full"}`}
      aria-hidden={!visible}
    >
      <Link
        href={ticketHref}
        target={ticketIsExternal ? "_blank" : undefined}
        rel={ticketIsExternal ? "noopener noreferrer" : undefined}
        tabIndex={visible ? 0 : -1}
        data-cta="sticky-bar"
        className="flex items-center justify-center gap-2 min-h-[52px] w-full bg-[var(--color-accent)] text-[var(--color-ink)] font-mono text-[12px] uppercase tracking-[0.2em]"
      >
        Get Tickets <span aria-hidden>·</span> {event.dateLabel}
      </Link>
    </div>
  );
}

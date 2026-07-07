"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { event, ticketHref, ticketIsExternal } from "@/lib/content";
import useReducedMotion from "@/hooks/useReducedMotion";

/** Appears once the hero scrolls out of view, hides again while the tickets section itself is on screen. */
export default function StickyTicketsBar() {
  const [pastHero, setPastHero] = useState(false);
  const [inTickets, setInTickets] = useState(false);
  const [inFooter, setInFooter] = useState(false);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const hero = document.getElementById("hero");
    const tickets = document.getElementById("tickets");
    const footer = document.querySelector("footer");

    const heroObserver = new IntersectionObserver(
      ([entry]) => setPastHero(!entry.isIntersecting),
      { threshold: 0 }
    );
    const ticketsObserver = new IntersectionObserver(
      ([entry]) => setInTickets(entry.isIntersecting),
      { threshold: 0.15 }
    );
    // Hide the bar once the footer is on screen so its "Get Tickets" CTA
    // doesn't stack on top of the footer's own ticket link.
    const footerObserver = new IntersectionObserver(
      ([entry]) => setInFooter(entry.isIntersecting),
      { threshold: 0 }
    );

    if (hero) heroObserver.observe(hero);
    if (tickets) ticketsObserver.observe(tickets);
    if (footer) footerObserver.observe(footer);

    return () => {
      heroObserver.disconnect();
      ticketsObserver.disconnect();
      footerObserver.disconnect();
    };
  }, []);

  const visible = pastHero && !inTickets && !inFooter;

  return (
    <div
      className={`md:hidden fixed bottom-0 inset-x-0 z-40 safe-bottom ${
        reducedMotion ? "" : "transition-transform duration-500 ease-[var(--ease)]"
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

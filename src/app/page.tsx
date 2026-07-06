import dynamic from "next/dynamic";
import Ticker from "@/components/show/Ticker";
import Hero from "@/components/show/Hero";
import Countdown from "@/components/show/Countdown";
import StickyTicketsBar from "@/components/show/StickyTicketsBar";

const Manifesto = dynamic(() => import("@/components/show/Manifesto"));
const Lineup = dynamic(() => import("@/components/show/Lineup"));
const Schedule = dynamic(() => import("@/components/show/Schedule"));
const Partners = dynamic(() => import("@/components/show/Partners"));
const PastEditions = dynamic(() => import("@/components/show/PastEditions"));
const TicketsCta = dynamic(() => import("@/components/show/TicketsCta"));

export default function HomePage() {
  return (
    <>
      <Ticker />
      <Hero />
      <Countdown />
      <Manifesto />
      <Lineup />
      <Schedule />
      <Partners />
      <PastEditions />
      <TicketsCta />
      <StickyTicketsBar />
    </>
  );
}

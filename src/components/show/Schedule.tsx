"use client";

import { useRef, useState } from "react";
import SectionTag from "@/components/ui/SectionTag";
import { schedule, sectionIndex, event } from "@/lib/content";

export default function Schedule() {
  const [active, setActive] = useState(0);
  const [open, setOpen] = useState<number | null>(0);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const onTabKey = (e: React.KeyboardEvent, i: number) => {
    let next = i;
    if (e.key === "ArrowDown" || e.key === "ArrowRight") next = (i + 1) % schedule.length;
    else if (e.key === "ArrowUp" || e.key === "ArrowLeft") next = (i - 1 + schedule.length) % schedule.length;
    else return;
    e.preventDefault();
    setActive(next);
    tabRefs.current[next]?.focus();
  };

  return (
    <section id="schedule" className="py-section">
      <div className="container">
      <SectionTag index={sectionIndex("schedule")} label="Running Order" className="mb-12" />

      {/* Desktop — archive folder tabs */}
      <div className="hidden md:grid grid-cols-[minmax(0,22rem)_1fr] gap-12">
        <div
          role="tablist"
          aria-label="Running order"
          aria-orientation="vertical"
          className="flex flex-col border-t border-hairline self-start"
        >
          {schedule.map((row, i) => (
            <button
              key={row.time + row.title}
              ref={(el) => {
                tabRefs.current[i] = el;
              }}
              role="tab"
              id={`sched-tab-${i}`}
              aria-selected={active === i}
              aria-controls={`sched-panel-${i}`}
              tabIndex={active === i ? 0 : -1}
              onClick={() => setActive(i)}
              onKeyDown={(e) => onTabKey(e, i)}
              className={`group flex items-baseline gap-4 py-5 border-b border-hairline text-left transition-transform duration-300 ${
                active === i ? "translate-x-3" : ""
              }`}
            >
              {/* De-emphasise inactive tabs by title colour, not opacity — dimming
                  the whole button would drop the accent section-num below AA contrast. */}
              <span className="section-num">({String(i + 1).padStart(2, "0")})</span>
              <span
                className={`font-mono text-sm tabular-nums transition-colors ${
                  active === i ? "text-[var(--color-ink)]" : "text-[var(--color-ink-muted)]"
                }`}
              >
                {row.time}
              </span>
              <span
                className={`font-display uppercase text-lg leading-none transition-colors ${
                  active === i
                    ? "text-[var(--color-ink)]"
                    : "text-[var(--color-ink-muted)] group-hover:text-[var(--color-ink)]"
                }`}
              >
                {row.title}
              </span>
              {active === i && <span className="ml-auto w-6 h-px bg-[var(--color-accent)] self-center" />}
            </button>
          ))}
        </div>

        <div className="relative grid">
          {schedule.map((row, i) => (
            <div
              key={row.time + row.title}
              id={`sched-panel-${i}`}
              role="tabpanel"
              aria-labelledby={`sched-tab-${i}`}
              inert={active !== i}
              className={`[grid-area:1/1] transition-[opacity,transform] duration-[450ms] ease-[var(--ease-move)] ${
                active === i ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3 pointer-events-none"
              }`}
            >
              <span className="section-num">({String(i + 1).padStart(2, "0")})</span>
              <h3 className="font-display font-semibold uppercase text-h1 leading-display tracking-tight mt-3 mb-5">
                {row.title}
              </h3>
              <p className="font-mono text-sm tabular-nums text-[var(--color-ink-muted)] mb-4">
                {row.time} · {event.venue}
              </p>
              {row.detail && <p className="font-light text-body max-w-[42ch]">{row.detail}</p>}
            </div>
          ))}
        </div>
      </div>

      {/* Mobile — accordion */}
      <div className="md:hidden border-t border-hairline">
        {schedule.map((row, i) => {
          const isOpen = open === i;
          return (
            <div key={row.time + row.title} className="border-b border-hairline">
              <h3>
                <button
                  aria-expanded={isOpen}
                  aria-controls={`acc-panel-${i}`}
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="w-full flex items-center gap-3 py-5 text-left min-h-[44px]"
                >
                  <span className="section-num">({String(i + 1).padStart(2, "0")})</span>
                  <span className="font-mono text-sm tabular-nums">{row.time}</span>
                  <span className="font-display uppercase text-xl leading-none ml-1">{row.title}</span>
                  <span
                    className={`ml-auto text-lg text-[var(--color-accent-text)] transition-transform duration-300 ${
                      isOpen ? "rotate-45" : ""
                    }`}
                    aria-hidden
                  >
                    +
                  </span>
                </button>
              </h3>
              <div
                id={`acc-panel-${i}`}
                role="region"
                className="grid transition-[grid-template-rows] duration-500 ease-[var(--ease-move)]"
                style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
              >
                <div className="overflow-hidden">
                  <p className="font-light text-body pb-6 pr-4">
                    {row.detail ?? `${event.venue}, ${event.address}`}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      </div>
    </section>
  );
}

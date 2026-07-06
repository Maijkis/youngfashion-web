"use client";

import { useEffect, useState } from "react";

export interface CountdownValue {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isPast: boolean;
}

function computeCountdown(targetISO: string): CountdownValue {
  const diff = new Date(targetISO).getTime() - Date.now();
  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0, isPast: true };
  const totalSeconds = Math.floor(diff / 1000);
  return {
    days: Math.floor(totalSeconds / 86400),
    hours: Math.floor((totalSeconds % 86400) / 3600),
    minutes: Math.floor((totalSeconds % 3600) / 60),
    seconds: totalSeconds % 60,
    isPast: false,
  };
}

/** Returns null until mounted — avoids an SSR/client hydration mismatch on the ticking value. */
export default function useCountdown(targetISO: string): CountdownValue | null {
  const [value, setValue] = useState<CountdownValue | null>(null);

  useEffect(() => {
    setValue(computeCountdown(targetISO));
    const id = setInterval(() => setValue(computeCountdown(targetISO)), 1000);
    return () => clearInterval(id);
  }, [targetISO]);

  return value;
}

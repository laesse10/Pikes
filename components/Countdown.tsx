"use client";

import { useEffect, useState } from "react";

type Parts = { d: number; h: number; m: number; s: number };

function diff(target: number): Parts | null {
  const ms = target - Date.now();
  if (ms <= 0) return null;
  const total = Math.floor(ms / 1000);
  return {
    d: Math.floor(total / 86400),
    h: Math.floor((total % 86400) / 3600),
    m: Math.floor((total % 3600) / 60),
    s: total % 60,
  };
}

function Unit({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex flex-col items-center">
      <span className="font-stat text-3xl font-bold tabular text-cream sm:text-4xl" suppressHydrationWarning>
        {String(value).padStart(2, "0")}
      </span>
      <span className="mt-1 text-[0.6rem] uppercase tracking-[0.2em] text-cream/55">{label}</span>
    </div>
  );
}

export function Countdown({ targetIso }: { targetIso: string }) {
  const target = new Date(targetIso).getTime();
  // Lazy init keeps SSR + first client render in sync; the interval refines it.
  const [parts, setParts] = useState<Parts | null>(() => diff(target));

  useEffect(() => {
    const id = setInterval(() => setParts(diff(target)), 1000);
    return () => clearInterval(id);
  }, [target]);

  if (parts === null) {
    return (
      <p className="font-display text-lg uppercase tracking-wide text-olive-200">
        Spiel läuft – let’s go Pikes!
      </p>
    );
  }

  return (
    <div className="flex items-start gap-3 sm:gap-5">
      <Unit value={parts.d} label="Tage" />
      <span className="font-stat text-3xl text-cream/30 sm:text-4xl">:</span>
      <Unit value={parts.h} label="Std" />
      <span className="font-stat text-3xl text-cream/30 sm:text-4xl">:</span>
      <Unit value={parts.m} label="Min" />
      <span className="font-stat text-3xl text-cream/30 sm:text-4xl">:</span>
      <Unit value={parts.s} label="Sek" />
    </div>
  );
}

import Image from "next/image";

type Tone = "navy" | "olive" | "cream";

const toneStyles: Record<Tone, { bg: string; fg: string; tag: string; motif: string }> = {
  navy: {
    bg: "bg-gradient-to-br from-navy-800 via-navy to-navy-900",
    fg: "text-cream",
    tag: "bg-cream/10 text-cream/70 ring-cream/15",
    motif: "text-cream",
  },
  olive: {
    bg: "bg-gradient-to-br from-olive-600 via-olive to-olive-600",
    fg: "text-cream-soft",
    tag: "bg-cream/10 text-cream-soft/80 ring-cream/15",
    motif: "text-cream-soft",
  },
  cream: {
    bg: "bg-gradient-to-br from-sand via-cream to-cream-soft",
    fg: "text-navy",
    tag: "bg-navy/10 text-navy/70 ring-navy/15",
    motif: "text-navy",
  },
};

/** Crossed hockey sticks + puck — decorative motif used across placeholders. */
function CrossedSticks({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 120 120" fill="none" className={className} aria-hidden="true">
      <g stroke="currentColor" strokeWidth={4.5} strokeLinecap="round">
        <path d="M22 24 L78 92" />
        <path d="M78 92 L96 96" />
        <path d="M98 24 L42 92" />
        <path d="M42 92 L24 96" />
      </g>
      <circle cx="60" cy="74" r="7" fill="currentColor" />
    </svg>
  );
}

export function Placeholder({
  label,
  sublabel,
  tone = "navy",
  className = "",
  showLogo = false,
  ratio,
}: {
  label?: string;
  sublabel?: string;
  tone?: Tone;
  className?: string;
  showLogo?: boolean;
  ratio?: string;
}) {
  const s = toneStyles[tone];
  return (
    <div
      className={`noise relative isolate flex h-full w-full flex-col items-center justify-center overflow-hidden ${s.bg} ${className}`}
      style={ratio ? { aspectRatio: ratio } : undefined}
    >
      {/* faint diagonal ice lines */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(135deg, currentColor 0 1px, transparent 1px 22px)",
          color: tone === "cream" ? "#1b3b58" : "#f3e9d3",
        }}
      />
      <CrossedSticks className={`pointer-events-none absolute -right-6 -top-6 h-40 w-40 opacity-[0.12] ${s.motif}`} />

      {showLogo && (
        <span className="relative mb-3 inline-block h-16 w-16 overflow-hidden rounded-full opacity-90 ring-2 ring-cream/20">
          <Image src="/logo.png" alt="" fill sizes="64px" className="object-cover" />
        </span>
      )}

      {label && (
        <p className={`relative px-6 text-center font-display text-sm font-semibold uppercase tracking-[0.15em] ${s.fg}`}>
          {label}
        </p>
      )}
      {sublabel && (
        <p className={`relative mt-1 px-6 text-center text-xs ${s.fg} opacity-65`}>{sublabel}</p>
      )}

      <span
        className={`relative mt-4 rounded-full px-2.5 py-1 text-[0.6rem] font-medium uppercase tracking-[0.18em] ring-1 ${s.tag}`}
      >
        Platzhalter
      </span>
    </div>
  );
}

/** Square portrait tile for roster — initials + number, branded. */
export function PlayerPortrait({
  number,
  name,
  tone = "navy",
}: {
  number: string;
  name: string;
  tone?: Tone;
}) {
  const s = toneStyles[tone];
  const initials = name
    .split(" ")
    .map((p) => p[0])
    .slice(0, 2)
    .join("");
  return (
    <div className={`noise relative flex aspect-[4/5] items-end justify-center overflow-hidden ${s.bg}`}>
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage: "repeating-linear-gradient(135deg, currentColor 0 1px, transparent 1px 20px)",
          color: tone === "cream" ? "#1b3b58" : "#f3e9d3",
        }}
      />
      <span
        className={`pointer-events-none absolute left-1/2 top-[42%] -translate-x-1/2 -translate-y-1/2 font-display font-bold ${s.fg} opacity-[0.16]`}
        style={{ fontSize: "7rem", lineHeight: 1 }}
      >
        {initials}
      </span>
      <span className={`relative mb-3 font-stat text-5xl font-bold tabular ${s.fg}`}>
        {number}
      </span>
    </div>
  );
}

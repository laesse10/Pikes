import type { Sponsor, SponsorGlyph } from "@/lib/data";

const paths: Record<SponsorGlyph, React.ReactNode> = {
  gear: (
    <>
      <circle cx="12" cy="12" r="3.2" />
      <path d="M12 2.5v2.4M12 19.1v2.4M2.5 12h2.4M19.1 12h2.4M5.2 5.2l1.7 1.7M17.1 17.1l1.7 1.7M18.8 5.2l-1.7 1.7M6.9 17.1l-1.7 1.7" />
    </>
  ),
  drop: <path d="M12 3s6 6.4 6 11a6 6 0 1 1-12 0c0-4.6 6-11 6-11Z" />,
  peak: <path d="M2.5 19h19L15 7l-3.2 5.4L9.5 9 2.5 19Z" />,
  shield: (
    <>
      <path d="M12 2.5 4.5 5.3v6c0 4.6 3.2 7.6 7.5 9.2 4.3-1.6 7.5-4.6 7.5-9.2v-6L12 2.5Z" />
      <path d="m8.8 12 2.3 2.3 4.1-4.6" />
    </>
  ),
  bolt: <path d="M13.5 2 4 13.5h6L9 22l9.5-12.5H12L13.5 2Z" />,
  wave: (
    <>
      <path d="M2.5 9c2.4-2.2 4.8-2.2 7.2 0s4.8 2.2 7.2 0 4.8-2.2 4.6 0" />
      <path d="M2.5 15c2.4-2.2 4.8-2.2 7.2 0s4.8 2.2 7.2 0 4.8-2.2 4.6 0" />
    </>
  ),
  puck: (
    <>
      <ellipse cx="12" cy="9" rx="8" ry="3.2" />
      <path d="M4 9v5.5c0 1.8 3.6 3.2 8 3.2s8-1.4 8-3.2V9" />
    </>
  ),
  hex: <path d="M12 2.6 20 7v10l-8 4.4L4 17V7l8-4.4Z" />,
  leaf: (
    <>
      <path d="M20 4c0 9-5.6 14-13 14 0-9 5.6-14 13-14Z" />
      <path d="M4 20C7 14 11 10 17 7" />
    </>
  ),
  crane: (
    <>
      <path d="M5 21V4l13 2.2M5 4l4 2.4" />
      <path d="M18 6.2V10M18 10l-3 .001M18 10v3" />
      <path d="M3 21h6" />
    </>
  ),
  anchor: (
    <>
      <circle cx="12" cy="5" r="2" />
      <path d="M12 7v13M5 13a7 7 0 0 0 14 0M5 13h2M19 13h-2" />
    </>
  ),
  flame: <path d="M12 2.5c1 3.2-2.6 4.3-2.6 7.6 0 0-1.8-1-1.8-3C5.6 9 5 11 5 13.2a7 7 0 0 0 14 0c0-4.4-3-6.5-4.4-9-1 1.8-2.4 2-2.6 0-.1-1.2 0-1.7 0-1.7Z" />,
};

export function SponsorMark({ glyph, size = 28 }: { glyph: SponsorGlyph; size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {paths[glyph]}
    </svg>
  );
}

/** Full lockup: the sponsor glyph plus the sponsor name. */
export function SponsorLogo({
  sponsor,
  size = "md",
}: {
  sponsor: Sponsor;
  size?: "sm" | "md" | "lg";
}) {
  const dims = size === "lg" ? 34 : size === "sm" ? 20 : 26;
  const text = size === "lg" ? "text-lg" : size === "sm" ? "text-[0.8rem]" : "text-base";

  return (
    <span className="flex items-center gap-3 whitespace-nowrap">
      <SponsorMark glyph={sponsor.glyph} size={dims} />
      <span className={`font-display font-semibold uppercase tracking-wide leading-none ${text}`}>
        {sponsor.name}
      </span>
    </span>
  );
}

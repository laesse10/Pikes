import Image from "next/image";
import { teamLogo, teamInitials } from "@/lib/data";

/**
 * Round club badge. Logos come in very different shapes (wide wordmarks,
 * tall crests), so they sit contained on a light disc instead of being
 * cropped. Teams without a logo file fall back to a monogram.
 */
export function TeamLogo({
  team,
  size = 36,
  tone = "light",
  className = "",
}: {
  team: string;
  size?: number;
  tone?: "light" | "dark";
  className?: string;
}) {
  const src = teamLogo(team);
  const box = { width: size, height: size };
  const ring = tone === "dark" ? "ring-cream/20" : "ring-navy/15";

  if (!src) {
    return (
      <span
        style={box}
        className={`flex shrink-0 items-center justify-center rounded-full bg-navy font-display text-[0.65rem] font-bold uppercase tracking-tight text-cream ring-1 ${ring} ${className}`}
        aria-hidden
      >
        {teamInitials(team)}
      </span>
    );
  }

  return (
    <span
      style={box}
      className={`relative shrink-0 overflow-hidden rounded-full bg-cream ring-1 ${ring} ${className}`}
    >
      <Image src={src} alt="" fill sizes={`${size}px`} className="object-contain p-[3px]" />
    </span>
  );
}

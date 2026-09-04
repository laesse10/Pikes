import Image from "next/image";
import Link from "next/link";
import type { Sponsor } from "@/lib/data";

/**
 * Sponsor artwork comes in whatever ink the brand uses — most of ours is white
 * on transparent, one is near-black. There is no single background that keeps
 * both readable, so the tile takes its background from the logo's own ink.
 * Geometry stays identical across all of them, so the wall still reads as one
 * system rather than a patchwork.
 */
export function SponsorTile({
  sponsor,
  size = "md",
  className = "",
}: {
  sponsor: Sponsor;
  size?: "sm" | "md" | "lg";
  className?: string;
}) {
  const surface =
    sponsor.logoInk === "light" ? "bg-navy ring-navy/15" : "bg-cream-soft ring-navy/15";

  // Padding sits on the image itself: `fill` ignores the wrapper's padding,
  // so this is what keeps the artwork off the tile edges.
  const inset = size === "lg" ? "p-8 sm:p-10" : size === "sm" ? "p-4" : "p-6";
  const sizes = size === "lg" ? "(min-width: 768px) 40vw, 80vw" : "(min-width: 1024px) 20vw, 45vw";

  const tile = (
    <span className={`relative block aspect-[3/2] overflow-hidden rounded ring-1 ${surface} ${className}`}>
      <Image src={sponsor.logo} alt={sponsor.name} fill sizes={sizes} className={`object-contain ${inset}`} />
    </span>
  );

  if (!sponsor.url) return tile;

  return (
    <Link
      href={sponsor.url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={sponsor.name}
      className="block transition-transform duration-300 hover:-translate-y-0.5"
    >
      {tile}
    </Link>
  );
}

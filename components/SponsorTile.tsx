import Image from "next/image";
import Link from "next/link";
import type { Sponsor } from "@/lib/data";

/** Uniform light tile — every logo in /public/sponsors is dark artwork. */
export function SponsorTile({
  sponsor,
  size = "md",
  className = "",
}: {
  sponsor: Sponsor;
  size?: "sm" | "md" | "lg";
  className?: string;
}) {
  // Padding sits on the image itself: `fill` ignores the wrapper's padding,
  // so this is what keeps the artwork off the tile edges.
  const inset = size === "lg" ? "p-8 sm:p-10" : size === "sm" ? "p-4" : "p-6";
  const sizes = size === "lg" ? "(min-width: 768px) 40vw, 80vw" : "(min-width: 1024px) 20vw, 45vw";

  const tile = (
    <span className={`relative block aspect-[3/2] overflow-hidden rounded bg-cream-soft ring-1 ring-navy/10 ${className}`}>
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

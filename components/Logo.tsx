import Image from "next/image";
import Link from "next/link";
import { club } from "@/lib/data";

export function LogoMark({ size = 44, className = "" }: { size?: number; className?: string }) {
  return (
    <span
      className={`relative inline-block shrink-0 overflow-hidden rounded-full ring-1 ring-navy/15 ${className}`}
      style={{ width: size, height: size }}
    >
      <Image
        src="/logo.png"
        alt="Zürisee Pikes Logo"
        fill
        sizes={`${size}px`}
        className="object-cover"
        priority
      />
    </span>
  );
}

export function Logo({
  variant = "dark",
  size = 44,
}: {
  variant?: "dark" | "light";
  size?: number;
}) {
  const text = variant === "light" ? "text-cream" : "text-navy";
  const sub = variant === "light" ? "text-cream/60" : "text-navy/55";
  return (
    <Link href="/" className="group flex items-center gap-3" aria-label="Zürisee Pikes – Startseite">
      <LogoMark size={size} className="transition-transform duration-300 group-hover:scale-105" />
      <span className="flex flex-col leading-none">
        <span className={`font-display text-lg font-bold uppercase tracking-wide ${text}`}>
          {club.name}
        </span>
        <span className={`mt-1 text-[0.62rem] uppercase tracking-[0.22em] ${sub}`}>
          {club.tagline}
        </span>
      </span>
    </Link>
  );
}

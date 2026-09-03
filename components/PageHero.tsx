import Image from "next/image";
import Link from "next/link";

export function PageHero({
  eyebrow,
  title,
  intro,
  crumb,
}: {
  eyebrow: string;
  title: string;
  intro?: string;
  crumb?: string;
}) {
  return (
    <section className="relative isolate overflow-hidden bg-navy-900 text-cream">
      <div className="absolute inset-0 bg-gradient-to-br from-navy-800 via-navy-900 to-ink" />
      <div
        className="absolute inset-0 opacity-[0.07]"
        style={{ backgroundImage: "repeating-linear-gradient(115deg, #f3e9d3 0 1px, transparent 1px 26px)" }}
      />
      <div className="noise absolute inset-0" />
      <div className="pointer-events-none absolute -right-16 -top-20 opacity-[0.13]">
        <Image src="/logo.png" alt="" width={420} height={420} className="rotate-6" />
      </div>

      <div className="shell container-px relative pb-14 pt-16 sm:pb-16 sm:pt-20">
        <nav className="flex items-center gap-2 text-xs uppercase tracking-[0.18em] text-cream/50">
          <Link href="/" className="transition-colors hover:text-cream">Start</Link>
          <span>/</span>
          <span className="text-olive-200">{crumb ?? title}</span>
        </nav>
        <span className="eyebrow mt-6 flex items-center gap-3 text-olive-200">
          <span className="h-px w-8 bg-current opacity-60" />
          {eyebrow}
        </span>
        <h1 className="mt-4 max-w-3xl text-5xl uppercase leading-[0.95] sm:text-6xl">{title}</h1>
        {intro && <p className="mt-5 max-w-2xl text-base leading-relaxed text-cream/70">{intro}</p>}
      </div>
    </section>
  );
}

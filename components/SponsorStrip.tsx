import Link from "next/link";
import { sponsors } from "@/lib/data";
import { SponsorTile } from "./SponsorTile";

export function SponsorStrip() {
  // Supporters stay off the strip; everything else runs in the marquee.
  const featured = sponsors.filter((s) => s.tier !== "Supporter");
  const loop = featured.length ? [...featured, ...featured] : [];

  return (
    <section className="border-y border-navy/10 bg-cream-soft py-10">
      <div className="shell container-px">
        <div className="flex flex-col items-center gap-2 text-center">
          <span className="eyebrow text-olive">Unsere Partner</span>
          <p className="text-sm text-navy/55">
            Wir danken allen Sponsoren, die den Pikes das Eis ermöglichen.
          </p>
        </div>
      </div>

      <div className="marquee relative mt-8 overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_8%,#000_92%,transparent)]">
        <div className="marquee-track gap-12 px-6">
          {loop.map((s, i) => (
            <span key={`${s.name}-${i}`} className="w-44 shrink-0 sm:w-52">
              <SponsorTile sponsor={s} size="sm" />
            </span>
          ))}
        </div>
      </div>

      <div className="shell container-px mt-8 text-center">
        <Link href="/sponsoren" className="btn btn-primary">
          Alle Sponsoren
        </Link>
      </div>
    </section>
  );
}

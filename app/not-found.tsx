import Link from "next/link";
import Image from "next/image";

export default function NotFound() {
  return (
    <section className="relative isolate flex min-h-[70vh] items-center overflow-hidden bg-navy-900 text-cream">
      <div className="absolute inset-0 bg-gradient-to-br from-navy-800 via-navy-900 to-ink" />
      <div className="noise absolute inset-0" />
      <div className="pointer-events-none absolute -right-16 top-1/2 -translate-y-1/2 opacity-10">
        <Image src="/logo.png" alt="" width={460} height={460} className="rotate-6" />
      </div>
      <div className="shell container-px relative text-center">
        <p className="font-stat text-7xl font-bold text-olive-200 sm:text-8xl">404</p>
        <h1 className="mt-2 text-4xl uppercase sm:text-5xl">Puck verloren</h1>
        <p className="mx-auto mt-4 max-w-md text-cream/65">
          Diese Seite gibt es nicht – sie ist wohl hinter der Bande verschwunden. Zurück aufs Eis?
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link href="/" className="btn btn-olive">Zur Startseite</Link>
          <Link href="/spielplan" className="btn btn-ghost">Zum Spielplan</Link>
        </div>
      </div>
    </section>
  );
}

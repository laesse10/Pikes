"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Logo } from "./Logo";
import { primaryNav } from "@/lib/data";

export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <>
    <header
      className={`sticky top-0 z-50 border-b transition-colors duration-300 ${
        scrolled
          ? "border-cream/10 bg-navy-900/95 backdrop-blur supports-[backdrop-filter]:bg-navy-900/80"
          : "border-transparent bg-navy-900"
      }`}
    >
      <div className="shell container-px flex h-20 items-center justify-between py-3">
        <Logo variant="light" size={58} />

        <nav className="hidden items-center gap-1 lg:flex">
          {primaryNav.map((item) => {
            const active = isActive(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`relative px-3.5 py-2 font-display text-sm font-medium uppercase tracking-wide transition-colors ${
                  active ? "text-cream" : "text-cream/65 hover:text-cream"
                }`}
              >
                {item.label}
                <span
                  className={`absolute inset-x-3.5 -bottom-0.5 h-0.5 rounded bg-olive-400 transition-transform duration-300 ${
                    active ? "scale-x-100" : "scale-x-0"
                  }`}
                />
              </Link>
            );
          })}
          <Link href="/mitmachen" className="btn btn-olive ml-3 !py-2.5">
            Mitspielen
          </Link>
        </nav>

        <button
          type="button"
          aria-label={open ? "Menü schliessen" : "Menü öffnen"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="relative z-50 flex h-11 items-center gap-2.5 rounded-full bg-olive px-4 text-cream-soft shadow-[0_2px_10px_-2px_rgba(13,27,41,0.5)] ring-1 ring-cream/20 transition-colors hover:bg-olive-600 lg:hidden"
        >
          <span className="flex w-5 flex-col gap-[5px]">
            <span className={`h-[2.5px] w-full rounded-full bg-current transition-transform duration-300 ${open ? "translate-y-[7.5px] rotate-45" : ""}`} />
            <span className={`h-[2.5px] w-full rounded-full bg-current transition-opacity duration-200 ${open ? "opacity-0" : ""}`} />
            <span className={`h-[2.5px] w-full rounded-full bg-current transition-transform duration-300 ${open ? "-translate-y-[7.5px] -rotate-45" : ""}`} />
          </span>
          <span className="font-display text-sm font-semibold uppercase tracking-wide">
            {open ? "Zu" : "Menü"}
          </span>
        </button>
      </div>
    </header>

    {/* Mobile overlay — sibling of <header> so the header's backdrop-filter
        can't turn it into a clipped containing block. Solid, full-screen. */}
    <div
      className={`fixed inset-0 z-40 bg-navy-900 lg:hidden ${
        open ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
      } transition-opacity duration-300`}
    >
      <nav className="container-px flex h-full flex-col gap-1 overflow-y-auto pb-10 pt-24">
        {primaryNav.map((item, i) => (
          <Link
            key={item.href}
            href={item.href}
            onClick={() => setOpen(false)}
            className={`border-b border-cream/10 py-4 font-display text-2xl uppercase tracking-wide transition-colors ${
              isActive(item.href) ? "text-olive-200" : "text-cream/80"
            }`}
          >
            <span className="mr-3 font-stat text-sm text-cream/30">0{i + 1}</span>
            {item.label}
          </Link>
        ))}
        <Link href="/mitmachen" onClick={() => setOpen(false)} className="btn btn-olive mt-6 w-full justify-center !py-4 text-base">
          Jetzt mitspielen
        </Link>
      </nav>
    </div>
    </>
  );
}

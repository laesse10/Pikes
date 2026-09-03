import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { SubmitButton } from "@/components/admin/SubmitButton";
import { logoutAction } from "@/app/admin/actions";
import { STORE_CONFIGURED } from "@/lib/store";

export const metadata: Metadata = {
  title: "Admin",
  robots: { index: false, follow: false },
};

export default function PanelLayout({ children }: { children: React.ReactNode }) {
  const configured = STORE_CONFIGURED();
  return (
    <div className="min-h-screen bg-cream text-navy">
      <header className="sticky top-0 z-30 border-b border-navy/10 bg-navy-900 text-cream">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3">
          <Link href="/admin" className="flex items-center gap-3">
            <span className="relative h-9 w-9 overflow-hidden rounded-full ring-1 ring-cream/15">
              <Image src="/logo.png" alt="" fill sizes="36px" className="object-cover" />
            </span>
            <span className="font-display text-lg font-bold uppercase tracking-wide">Pikes Admin</span>
          </Link>
          <div className="flex items-center gap-2">
            <Link href="/" target="_blank" className="rounded border border-cream/20 px-3 py-2 font-display text-xs font-semibold uppercase tracking-wide text-cream/80 transition-colors hover:bg-cream hover:text-navy-900">
              Website ansehen
            </Link>
            <form action={logoutAction}>
              <SubmitButton variant="ghost" className="!border-cream/20 !text-cream/80 hover:!bg-cream hover:!text-navy-900">
                Abmelden
              </SubmitButton>
            </form>
          </div>
        </div>
      </header>

      {!configured && (
        <div className="border-b border-amber-300 bg-amber-50 px-4 py-3 text-center text-sm text-amber-900">
          ⚠️ Kein Blob-Speicher erkannt (<code>BLOB_READ_WRITE_TOKEN</code> fehlt). Änderungen können nicht gespeichert werden.
        </div>
      )}

      <div className="mx-auto max-w-4xl px-4 py-6 lg:py-10">
        <main className="min-w-0">{children}</main>
      </div>
    </div>
  );
}

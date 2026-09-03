"use client";

import { useActionState } from "react";
import Image from "next/image";
import Link from "next/link";
import { loginAction, type LoginState } from "../actions";
import { SubmitButton } from "@/components/admin/SubmitButton";

const initial: LoginState = {};

export default function AdminLoginPage() {
  const [state, formAction] = useActionState(loginAction, initial);

  return (
    <main className="grid min-h-screen place-items-center bg-navy-900 px-4 py-10 text-cream">
      <div className="w-full max-w-sm">
        <div className="flex flex-col items-center text-center">
          <span className="relative h-20 w-20 overflow-hidden rounded-full ring-2 ring-cream/15">
            <Image src="/logo.png" alt="Zürisee Pikes" fill sizes="80px" className="object-cover" priority />
          </span>
          <h1 className="mt-5 text-3xl uppercase">Pikes Admin</h1>
          <p className="mt-2 text-sm text-cream/60">Bitte mit dem Vereinspasswort anmelden.</p>
        </div>

        <form action={formAction} className="mt-8 rounded-lg bg-cream p-6 text-navy shadow-xl">
          <label htmlFor="password" className="block font-display text-xs font-semibold uppercase tracking-[0.12em] text-navy/70">
            Passwort
          </label>
          <input
            id="password"
            name="password"
            type="password"
            autoFocus
            autoComplete="current-password"
            className="mt-1.5 w-full rounded border border-navy/15 bg-cream-soft px-3.5 py-2.5 text-sm outline-none transition-colors focus:border-olive focus:ring-2 focus:ring-olive/25"
          />
          {state?.error && (
            <p className="mt-3 rounded border border-red-300 bg-red-50 px-3 py-2 text-sm text-red-700">{state.error}</p>
          )}
          <SubmitButton className="mt-5 w-full">Anmelden</SubmitButton>
        </form>

        <p className="mt-6 text-center text-xs text-cream/40">
          <Link href="/" className="hover:text-cream">← Zurück zur Website</Link>
        </p>
      </div>
    </main>
  );
}

"use client";

import { useActionState, useState } from "react";
import { sendContactAction } from "@/app/(site)/mitmachen/actions";
import {
  contactLevels as levels,
  contactPositions as positions,
  contactReasons as reasons,
  type ContactState,
} from "@/lib/contact";

const fieldBase =
  "mt-1.5 w-full rounded border border-navy/15 bg-cream-soft px-3.5 py-2.5 text-sm text-navy outline-none transition-colors focus:border-olive focus:ring-2 focus:ring-olive/25 placeholder:text-navy/35";
const labelBase = "block font-display text-xs font-semibold uppercase tracking-[0.12em] text-navy/70";

export function ContactForm() {
  const [state, formAction, pending] = useActionState(sendContactAction, { status: "idle" } as ContactState);
  // "Neue Anfrage" hides this particular confirmation; the next send shows a new one.
  const [dismissed, setDismissed] = useState<ContactState | null>(null);
  const values = state.status === "error" ? state.fields : undefined;

  if (state.status === "sent" && state !== dismissed) {
    return (
      <div className="card flex flex-col items-center rounded p-10 text-center">
        <span className="grid h-16 w-16 place-items-center rounded-full bg-olive text-cream-soft">
          <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round">
            <path d="m5 12 4.5 4.5L19 7" />
          </svg>
        </span>
        <h3 className="mt-5 text-2xl uppercase text-navy">Merci für deine Nachricht!</h3>
        <p className="mt-2 max-w-sm text-sm text-navy/65">
          Wir melden uns so schnell wie möglich bei dir. Stehst du auf der Warteliste, hörst du von uns, sobald ein Platz im Kader frei wird.
        </p>
        <button type="button" onClick={() => setDismissed(state)} className="btn btn-primary mt-6">
          Neue Anfrage
        </button>
      </div>
    );
  }

  return (
    <form action={formAction} className="card rounded p-6 sm:p-8">
      {/* Honeypot */}
      <input type="text" name="company" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className={labelBase}>Name *</label>
          <input id="name" name="name" type="text" required maxLength={100} defaultValue={values?.name} placeholder="Vor- und Nachname" className={fieldBase} />
        </div>
        <div>
          <label htmlFor="email" className={labelBase}>E-Mail *</label>
          <input id="email" name="email" type="email" required maxLength={200} defaultValue={values?.email} placeholder="du@beispiel.ch" className={fieldBase} />
        </div>
        <div>
          <label htmlFor="phone" className={labelBase}>Telefon</label>
          <input id="phone" name="phone" type="tel" maxLength={40} defaultValue={values?.phone} placeholder="+41 …" className={fieldBase} />
        </div>
        <div>
          <label htmlFor="reason" className={labelBase}>Anliegen</label>
          <select id="reason" name="reason" className={fieldBase} defaultValue={values?.reason ?? reasons[0]}>
            {reasons.map((r) => <option key={r}>{r}</option>)}
          </select>
        </div>
        <div>
          <label htmlFor="position" className={labelBase}>Wunschposition</label>
          <select id="position" name="position" className={fieldBase} defaultValue={values?.position ?? positions[0]}>
            {positions.map((p) => <option key={p}>{p}</option>)}
          </select>
        </div>
        <div>
          <label htmlFor="level" className={labelBase}>Erfahrung</label>
          <select id="level" name="level" className={fieldBase} defaultValue={values?.level ?? levels[0]}>
            {levels.map((l) => <option key={l}>{l}</option>)}
          </select>
        </div>
      </div>

      <div className="mt-5">
        <label htmlFor="message" className={labelBase}>Nachricht</label>
        <textarea id="message" name="message" rows={4} maxLength={5000} defaultValue={values?.message} placeholder="Erzähl uns kurz etwas über dich …" className={fieldBase} />
      </div>

      {state.status === "error" && (
        <p role="alert" className="mt-4 rounded border border-red-300 bg-red-50 px-3 py-2 text-sm text-red-700">{state.error}</p>
      )}

      <div className="mt-6 flex flex-wrap items-center gap-4">
        <button type="submit" disabled={pending} className="btn btn-olive disabled:opacity-60">
          {pending ? "Wird gesendet …" : "Anfrage senden"}
        </button>
        <p className="text-xs text-navy/45">* Pflichtfelder. Mit dem Absenden stimmst du unserer Datenschutzerklärung zu.</p>
      </div>
    </form>
  );
}

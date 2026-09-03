"use client";

import { useState } from "react";

const positions = ["Egal / noch offen", "Torhüter", "Verteidigung", "Sturm"];
const levels = ["Anfänger:in", "Wiedereinsteiger:in", "Fortgeschritten", "Routinier"];
const reasons = ["Schnuppertraining", "Mitspielen", "Sponsoring", "Allgemeine Frage"];

const fieldBase =
  "mt-1.5 w-full rounded border border-navy/15 bg-cream-soft px-3.5 py-2.5 text-sm text-navy outline-none transition-colors focus:border-olive focus:ring-2 focus:ring-olive/25 placeholder:text-navy/35";
const labelBase = "block font-display text-xs font-semibold uppercase tracking-[0.12em] text-navy/70";

export function ContactForm() {
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);

    // Honeypot
    if (data.get("company")) return;

    const name = (data.get("name") as string)?.trim();
    const email = (data.get("email") as string)?.trim();
    if (!name || !email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Bitte gib deinen Namen und eine gültige E-Mail-Adresse an.");
      return;
    }
    setError(null);
    setSent(true);
    form.reset();
  }

  if (sent) {
    return (
      <div className="card flex flex-col items-center rounded p-10 text-center">
        <span className="grid h-16 w-16 place-items-center rounded-full bg-olive text-cream-soft">
          <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round">
            <path d="m5 12 4.5 4.5L19 7" />
          </svg>
        </span>
        <h3 className="mt-5 text-2xl uppercase text-navy">Merci für deine Nachricht!</h3>
        <p className="mt-2 max-w-sm text-sm text-navy/65">
          Wir melden uns so schnell wie möglich bei dir. Bis dann: bring die Schlittschuhe in Form!
        </p>
        <p className="mt-3 text-xs text-navy/40">(Demo-Formular – es wird keine Nachricht versendet.)</p>
        <button type="button" onClick={() => setSent(false)} className="btn btn-primary mt-6">
          Neue Anfrage
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="card rounded p-6 sm:p-8" noValidate>
      {/* Honeypot */}
      <input type="text" name="company" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className={labelBase}>Name *</label>
          <input id="name" name="name" type="text" required placeholder="Vor- und Nachname" className={fieldBase} />
        </div>
        <div>
          <label htmlFor="email" className={labelBase}>E-Mail *</label>
          <input id="email" name="email" type="email" required placeholder="du@beispiel.ch" className={fieldBase} />
        </div>
        <div>
          <label htmlFor="phone" className={labelBase}>Telefon</label>
          <input id="phone" name="phone" type="tel" placeholder="+41 …" className={fieldBase} />
        </div>
        <div>
          <label htmlFor="reason" className={labelBase}>Anliegen</label>
          <select id="reason" name="reason" className={fieldBase} defaultValue={reasons[0]}>
            {reasons.map((r) => <option key={r}>{r}</option>)}
          </select>
        </div>
        <div>
          <label htmlFor="position" className={labelBase}>Wunschposition</label>
          <select id="position" name="position" className={fieldBase} defaultValue={positions[0]}>
            {positions.map((p) => <option key={p}>{p}</option>)}
          </select>
        </div>
        <div>
          <label htmlFor="level" className={labelBase}>Erfahrung</label>
          <select id="level" name="level" className={fieldBase} defaultValue={levels[0]}>
            {levels.map((l) => <option key={l}>{l}</option>)}
          </select>
        </div>
      </div>

      <div className="mt-5">
        <label htmlFor="message" className={labelBase}>Nachricht</label>
        <textarea id="message" name="message" rows={4} placeholder="Erzähl uns kurz etwas über dich …" className={fieldBase} />
      </div>

      {error && (
        <p className="mt-4 rounded border border-red-300 bg-red-50 px-3 py-2 text-sm text-red-700">{error}</p>
      )}

      <div className="mt-6 flex flex-wrap items-center gap-4">
        <button type="submit" className="btn btn-olive">Anfrage senden</button>
        <p className="text-xs text-navy/45">* Pflichtfelder. Mit dem Absenden stimmst du unserer Datenschutzerklärung zu.</p>
      </div>
    </form>
  );
}

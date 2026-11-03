"use server";

import { createHmac } from "node:crypto";
import { headers } from "next/headers";
import { Resend } from "resend";
import { club } from "@/lib/data";
import { redis } from "@/lib/redis";
import {
  contactLevels,
  contactPositions,
  contactReasons,
  type ContactFields,
  type ContactState,
} from "@/lib/contact";

// Sent from a subdomain verified at Resend. Mail from website@zueriseepikes.ch
// passed SPF, DKIM and DMARC but was silently dropped by iCloud, which hosts
// the main domain's mailboxes; the subdomain isn't hosted there.
const FROM = "Website Zürisee Pikes <formular@mail.zueriseepikes.ch>";
// Where requests go. iCloud drops everything Resend sends to info@ (from the
// main domain and the subdomain alike), so the inbox is set in Vercel as
// CONTACT_TO; it stays out of this public repo.
const TO = process.env.CONTACT_TO || club.email;
const MAX_PER_HOUR = 5;
const EMAIL = /^[^\s@<>"]+@[^\s@<>"]+\.[^\s@<>"]+$/;
const UNAVAILABLE = `Die Nachricht konnte nicht gesendet werden. Bitte schreib uns direkt an ${club.email}.`;

function field(fd: FormData, key: string, max: number): string {
  // Collapse line breaks except in the message, so nothing odd reaches a header.
  const value = String(fd.get(key) ?? "").trim().slice(0, max);
  return key === "message" ? value : value.replace(/\s+/g, " ");
}

const oneOf = (value: string, list: string[]) => (list.includes(value) ? value : list[0]);

/**
 * Spam guard: at most MAX_PER_HOUR sends per sender. Only a keyed hash of the
 * IP is stored, for an hour. Fails open, so a Redis hiccup never blocks a real
 * request.
 */
async function overLimit(): Promise<boolean> {
  const db = redis();
  if (!db) return false;
  const h = await headers();
  const ip = h.get("x-forwarded-for")?.split(",")[0]?.trim() || h.get("x-real-ip") || "unknown";
  const key = `pikes:contact:${createHmac("sha256", process.env.AUTH_SECRET ?? "").update(ip).digest("hex").slice(0, 32)}`;
  try {
    const count = await db.incr(key);
    if (count === 1) await db.expire(key, 60 * 60);
    return count > MAX_PER_HOUR;
  } catch {
    return false;
  }
}

function mailBody(f: ContactFields): string {
  return [
    "Neue Anfrage über das Kontaktformular auf www.zueriseepikes.ch",
    "",
    `Name:            ${f.name}`,
    `E-Mail:          ${f.email}`,
    `Telefon:         ${f.phone || "–"}`,
    `Anliegen:        ${f.reason}`,
    `Wunschposition:  ${f.position}`,
    `Erfahrung:       ${f.level}`,
    "",
    "Nachricht:",
    f.message || "–",
    "",
    "—",
    "Mit «Antworten» schreibst du direkt an die Absenderin oder den Absender.",
  ].join("\n");
}

export async function sendContactAction(_prev: ContactState, fd: FormData): Promise<ContactState> {
  const fields: ContactFields = {
    name: field(fd, "name", 100),
    email: field(fd, "email", 200),
    phone: field(fd, "phone", 40),
    reason: oneOf(field(fd, "reason", 50), contactReasons),
    position: oneOf(field(fd, "position", 50), contactPositions),
    level: oneOf(field(fd, "level", 50), contactLevels),
    message: field(fd, "message", 5000),
  };
  const fail = (error: string): ContactState => ({ status: "error", error, fields });

  // Honeypot: only bots fill the hidden field. Look successful, send nothing.
  if (field(fd, "company", 200)) return { status: "sent" };

  if (!fields.name || !EMAIL.test(fields.email)) {
    return fail("Bitte gib deinen Namen und eine gültige E-Mail-Adresse an.");
  }
  if (await overLimit()) {
    return fail(`Zu viele Anfragen in kurzer Zeit. Bitte versuch es später nochmals oder schreib uns an ${club.email}.`);
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) return fail(UNAVAILABLE);

  const { error } = await new Resend(apiKey).emails.send({
    from: FROM,
    to: TO,
    replyTo: fields.email,
    subject: `Kontaktformular: ${fields.reason} – ${fields.name}`,
    text: mailBody(fields),
  });
  if (error) {
    console.error("Contact mail failed:", error.name, error.message);
    return fail(UNAVAILABLE);
  }
  return { status: "sent" };
}

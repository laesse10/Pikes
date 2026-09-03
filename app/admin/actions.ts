"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import {
  SESSION_COOKIE,
  checkPassword,
  createSessionToken,
  verifySessionToken,
  sessionCookieOptions,
} from "@/lib/auth";
import { setResult, clearResult } from "@/lib/store";
import { fixtures } from "@/lib/data";

// ---------------------------------------------------------------- auth guard
async function assertAuthed() {
  const token = (await cookies()).get(SESSION_COOKIE)?.value;
  if (!(await verifySessionToken(token))) {
    redirect("/admin/login");
  }
}

function str(fd: FormData, key: string): string {
  return ((fd.get(key) as string) ?? "").trim();
}

function goals(fd: FormData, key: string): number | undefined {
  const v = str(fd, key);
  if (v === "") return undefined;
  const n = Number(v);
  if (!Number.isInteger(n) || n < 0 || n > 99) return undefined;
  return n;
}

// -------------------------------------------------------------------- login
export type LoginState = { error?: string };

export async function loginAction(_prev: LoginState, fd: FormData): Promise<LoginState> {
  const password = str(fd, "password");
  if (!password) return { error: "Bitte Passwort eingeben." };
  if (!process.env.ADMIN_PASSWORD) {
    return { error: "Kein Admin-Passwort konfiguriert. Setze ADMIN_PASSWORD in den Vercel-Einstellungen." };
  }
  if (!checkPassword(password)) return { error: "Falsches Passwort." };

  const token = await createSessionToken();
  (await cookies()).set(SESSION_COOKIE, token, sessionCookieOptions);
  redirect("/admin");
}

export async function logoutAction() {
  (await cookies()).delete(SESSION_COOKIE);
  redirect("/admin/login");
}

// ------------------------------------------------------------------ results
export async function saveResultAction(fd: FormData) {
  await assertAuthed();
  const id = str(fd, "id");
  // The schedule is static, so only ids that actually exist may be written.
  if (!fixtures.some((f) => f.id === id)) redirect("/admin?error=unknown");

  const gf = goals(fd, "gf");
  const ga = goals(fd, "ga");
  if (gf === undefined || ga === undefined) {
    redirect("/admin?error=invalid");
  } else {
    await setResult(id, { gf, ga });
    redirect("/admin?ok=1");
  }
}

export async function clearResultAction(fd: FormData) {
  await assertAuthed();
  const id = str(fd, "id");
  if (!fixtures.some((f) => f.id === id)) redirect("/admin?error=unknown");

  await clearResult(id);
  redirect("/admin?deleted=1");
}

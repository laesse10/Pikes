"use client";

import { useFormStatus } from "react-dom";

export function SubmitButton({
  children,
  variant = "primary",
  className = "",
  confirm,
}: {
  children: React.ReactNode;
  variant?: "primary" | "olive" | "danger" | "ghost";
  className?: string;
  confirm?: string;
}) {
  const { pending } = useFormStatus();
  const styles =
    variant === "danger"
      ? "bg-red-600 text-white hover:bg-red-700"
      : variant === "olive"
        ? "bg-olive text-cream-soft hover:bg-olive-600"
        : variant === "ghost"
          ? "border border-navy/20 text-navy hover:bg-navy/5"
          : "bg-navy text-cream hover:bg-navy-800";

  return (
    <button
      type="submit"
      disabled={pending}
      onClick={confirm ? (e) => { if (!window.confirm(confirm)) e.preventDefault(); } : undefined}
      className={`inline-flex items-center justify-center gap-2 rounded font-display text-sm font-semibold uppercase tracking-wide px-4 py-2.5 transition-colors disabled:opacity-50 ${styles} ${className}`}
    >
      {pending ? "…" : children}
    </button>
  );
}

import { Reveal } from "./Reveal";

export function SectionHeading({
  eyebrow,
  title,
  intro,
  align = "left",
  variant = "dark",
}: {
  eyebrow?: string;
  title: string;
  intro?: string;
  align?: "left" | "center";
  variant?: "dark" | "light";
}) {
  const isCenter = align === "center";
  const titleColor = variant === "light" ? "text-cream" : "text-navy";
  const eyebrowColor = variant === "light" ? "text-olive-200" : "text-olive";
  const introColor = variant === "light" ? "text-cream/70" : "text-navy/70";
  return (
    <Reveal className={`max-w-2xl ${isCenter ? "mx-auto text-center" : ""}`}>
      {eyebrow && (
        <span className={`eyebrow flex items-center gap-3 ${isCenter ? "justify-center" : ""} ${eyebrowColor}`}>
          <span className="h-px w-7 bg-current opacity-50" />
          {eyebrow}
        </span>
      )}
      <h2 className={`mt-3 text-4xl uppercase sm:text-5xl ${titleColor}`}>{title}</h2>
      {intro && <p className={`mt-4 text-base leading-relaxed ${introColor}`}>{intro}</p>}
    </Reveal>
  );
}

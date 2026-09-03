import Image from "next/image";
import { Placeholder } from "./Placeholder";

type Tone = "navy" | "olive" | "cream";

/** Shows an uploaded image when present, otherwise the branded placeholder. */
export function Photo({
  url,
  alt,
  ratio,
  tone = "navy",
  label,
  sublabel,
  showLogo = false,
  className = "",
  imgClassName = "",
  sizes = "(min-width: 1024px) 33vw, 100vw",
  priority = false,
}: {
  url?: string;
  alt: string;
  ratio?: string;
  tone?: Tone;
  label?: string;
  sublabel?: string;
  showLogo?: boolean;
  className?: string;
  imgClassName?: string;
  sizes?: string;
  priority?: boolean;
}) {
  if (!url) {
    return (
      <Placeholder
        tone={tone}
        ratio={ratio}
        label={label}
        sublabel={sublabel}
        showLogo={showLogo}
        className={className}
      />
    );
  }
  return (
    <div
      className={`relative h-full w-full overflow-hidden bg-navy-900 ${className}`}
      style={ratio ? { aspectRatio: ratio } : undefined}
    >
      <Image src={url} alt={alt} fill sizes={sizes} priority={priority} className={`object-cover ${imgClassName}`} />
    </div>
  );
}

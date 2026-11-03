import Image, { type StaticImageData } from "next/image";
import { Placeholder } from "./Placeholder";

type Tone = "navy" | "olive" | "cream";

/** Shows the image when there is one, otherwise the branded placeholder. */
export function Photo({
  src,
  alt,
  ratio,
  tone = "navy",
  label,
  sublabel,
  showLogo = false,
  className = "",
  imgClassName = "",
  sizes = "(min-width: 1024px) 33vw, 100vw",
  eager = false,
  quality,
  focus,
}: {
  src?: StaticImageData | string;
  alt: string;
  ratio?: string;
  tone?: Tone;
  label?: string;
  sublabel?: string;
  showLogo?: boolean;
  className?: string;
  imgClassName?: string;
  sizes?: string;
  /** Above the fold: load right away with high priority instead of lazily. */
  eager?: boolean;
  /** Must be listed in images.qualities in next.config.ts. */
  quality?: number;
  /** CSS object-position, so the crop keeps the subject in frame. */
  focus?: string;
}) {
  if (!src) {
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
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        quality={quality}
        loading={eager ? "eager" : "lazy"}
        fetchPriority={eager ? "high" : undefined}
        placeholder={typeof src === "string" ? "empty" : "blur"}
        style={focus ? { objectPosition: focus } : undefined}
        className={`object-cover ${imgClassName}`}
      />
    </div>
  );
}

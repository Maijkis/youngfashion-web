import Image from "next/image";
import PixelCanvas from "@/components/ui/PixelCanvas";

interface MediaSlotProps {
  src: string | null;
  alt: string;
  label: string;
  sublabel?: string;
  aspect?: string;
  sizes?: string;
  priority?: boolean;
  mark?: "star" | "asterisk";
  /** Pixel-reveal: enters as a coarse mosaic, resolves sharp on scroll-in. */
  reveal?: boolean;
  /** With `reveal`: desktop pointer-hover briefly re-pixelates. */
  revealHover?: boolean;
  className?: string;
}

export default function MediaSlot({
  src,
  alt,
  label,
  sublabel,
  aspect = "aspect-[3/4]",
  sizes = "(max-width: 768px) 100vw, 50vw",
  priority = false,
  mark = "star",
  reveal = false,
  revealHover = false,
  className = "",
}: MediaSlotProps) {
  if (src) {
    return (
      <div className={`relative overflow-hidden bg-[var(--color-paper-deep)] ${aspect} ${className}`}>
        <Image
          src={src}
          alt={alt}
          fill
          priority={priority}
          sizes={sizes}
          className="object-cover"
        />
        {reveal && <PixelCanvas hover={revealHover} />}
      </div>
    );
  }

  return (
    <div
      className={`relative overflow-hidden border border-hairline bg-[var(--color-paper-deep)] ${aspect} ${className}`}
      style={{
        backgroundImage:
          "linear-gradient(135deg, transparent calc(50% - 0.5px), var(--color-hairline) 50%, transparent calc(50% + 0.5px))",
      }}
    >
      <span className="mono-label absolute top-3 left-3 text-[var(--color-ink-muted)]">{label}</span>
      <span className="absolute top-3 right-3 text-xl leading-none text-[var(--color-accent-text)]/40">
        {mark === "star" ? "★" : "*"}
      </span>
      {sublabel && (
        <span className="mono-label absolute bottom-3 left-3 text-[var(--color-ink-muted)]">{sublabel}</span>
      )}
    </div>
  );
}

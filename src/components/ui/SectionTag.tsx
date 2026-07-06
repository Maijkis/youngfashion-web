interface SectionTagProps {
  index: number;
  label: string;
  className?: string;
}

export default function SectionTag({ index, label, className = "" }: SectionTagProps) {
  const num = String(index).padStart(2, "0");
  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      <span className="section-num">({num})</span>
      <span className="mono-label text-[var(--color-ink-muted)]">{label}</span>
    </div>
  );
}

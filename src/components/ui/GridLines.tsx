interface GridLinesProps {
  columns?: number;
  mobileColumns?: number;
  className?: string;
}

export default function GridLines({
  columns = 12,
  mobileColumns = 4,
  className = "",
}: GridLinesProps) {
  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute inset-0 z-0 ${className}`}
    >
      {/* Mobile: a coarser 4-column structure — matches .grid-editorial's mobile grid */}
      <div className="flex h-full md:hidden">
        {Array.from({ length: mobileColumns }).map((_, i) => (
          <div key={i} className="flex-1 border-r border-hairline last:border-r-0" />
        ))}
        <div className="absolute inset-y-0 left-0 border-l border-hairline" />
      </div>

      {/* Desktop: full visible column structure */}
      <div className="hidden h-full md:flex">
        {Array.from({ length: columns }).map((_, i) => (
          <div key={i} className="flex-1 border-r border-hairline last:border-r-0" />
        ))}
        <div className="absolute inset-y-0 left-0 border-l border-hairline" />
      </div>
    </div>
  );
}

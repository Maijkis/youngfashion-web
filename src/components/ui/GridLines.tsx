interface GridLinesProps {
  columns?: number;
  className?: string;
}

export default function GridLines({ columns = 6, className = "" }: GridLinesProps) {
  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute inset-0 z-0 ${className}`}
    >
      {/* Mobile: edge margins only — establishes the grid without visual noise at ~380px */}
      <div className="flex h-full md:hidden">
        <div className="w-5 border-r border-hairline" />
        <div className="flex-1" />
        <div className="w-5 border-l border-hairline" />
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

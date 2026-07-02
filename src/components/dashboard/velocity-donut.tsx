"use client";

export function VelocityDonut({ onClick, pct = 0.36 }: { onClick: () => void; pct?: number }) {
  const r = 28;
  const cx = 34;
  const cy = 34;
  const circ = 2 * Math.PI * r;
  return (
    <button onClick={onClick} aria-label="View project velocity details" className="cursor-pointer hover:opacity-80 transition-opacity">
      <svg width="68" height="68" viewBox="0 0 68 68">
        <circle cx={cx} cy={cy} r={r} fill="none" stroke="rgb(var(--border))" strokeWidth="5.5" />
        <circle
          cx={cx}
          cy={cy}
          r={r}
          fill="none"
          stroke="rgb(var(--status-success))"
          strokeWidth="5.5"
          strokeLinecap="round"
          strokeDasharray={circ}
          strokeDashoffset={circ * (1 - pct)}
          transform={`rotate(-90 ${cx} ${cy})`}
        />
        <text
          x={cx}
          y={cy + 4.5}
          textAnchor="middle"
          fill="rgb(var(--text-primary))"
          fontSize="11"
          fontFamily="Inter, sans-serif"
          fontWeight="500"
        >
          {Math.round(pct * 100)}%
        </text>
      </svg>
    </button>
  );
}

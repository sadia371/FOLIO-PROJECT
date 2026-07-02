type BadgeColor = "green" | "red" | "orange" | "blue" | "gray";

export function Badge({
  children,
  color = "green",
  size = "sm",
}: {
  children: React.ReactNode;
  color?: BadgeColor;
  size?: "sm" | "xs";
}) {
  const colors: Record<BadgeColor, string> = {
    green: "bg-status-success/12 text-status-success-on-tint",
    red: "bg-status-danger/10 text-status-danger-on-tint",
    orange: "bg-status-warning/10 text-status-warning-on-tint",
    blue: "bg-[rgba(0,122,255,0.1)] text-[#0055c8]",
    gray: "bg-canvas text-text-secondary",
  };
  const pad = size === "xs" ? "px-1.5 py-px text-[9px]" : "px-1.5 py-px text-[10px]";
  return (
    <span className={`inline-flex items-center rounded font-medium ${colors[color]} ${pad} whitespace-nowrap`}>
      {children}
    </span>
  );
}

export function Dot({ color = "green", size = 6 }: { color?: string; size?: number }) {
  return (
    <span
      className="inline-block rounded-full shrink-0"
      style={{ width: size, height: size, backgroundColor: color }}
    />
  );
}

export function Avatar({ initials, size = 20 }: { initials: string; size?: number }) {
  return (
    <div className="rounded-full bg-accent flex items-center justify-center shrink-0" style={{ width: size, height: size }}>
      <span className="text-white font-medium" style={{ fontSize: 9 }}>{initials}</span>
    </div>
  );
}

export function WorkloadBar({ pct, color }: { pct: number; color: string }) {
  return (
    <div className="flex items-center gap-1.5">
      <div className="w-16 h-1.5 bg-canvas rounded-full overflow-hidden">
        <div className="h-full rounded-full" style={{ width: `${pct}%`, background: color }} />
      </div>
      <span className="text-[10px] text-text-secondary">{pct}%</span>
    </div>
  );
}

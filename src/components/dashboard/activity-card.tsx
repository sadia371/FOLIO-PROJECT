"use client";

import { Timer } from "lucide-react";
import type { Toast } from "@/components/shared/use-toasts";

function ActivityBar({
  label,
  pct,
  color,
  textColor,
  onClick,
}: {
  label: string;
  pct: number;
  color: string;
  textColor: string;
  onClick: () => void;
}) {
  return (
    <button onClick={onClick} className="flex items-center gap-2 w-full hover:opacity-70 transition-opacity text-left">
      <span className="w-24 flex-shrink-0 text-[11px] text-text-secondary">{label}</span>
      <div className="flex-1 h-[4.4px] bg-border rounded-full overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-500"
          style={{ width: `${pct}%`, backgroundColor: color }}
        />
      </div>
      <span className="w-8 text-right flex-shrink-0 text-[11px]" style={{ color: textColor }}>
        {pct}%
      </span>
    </button>
  );
}

export function ActivityCard({ addToast }: { addToast: (m: string, t?: Toast["type"]) => void }) {
  return (
    <div className="lg:col-span-1 flex flex-col p-4 bg-surface border border-border rounded-card">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-[10px] text-text-secondary tracking-[0.04em] uppercase">
          <Timer className="h-3.5 w-3.5 text-text-muted translate-y-[-2px]" />
          <p>Activity This Week</p>
        </div>
        <span className="flex items-center px-2 h-[22px] bg-accent-green/[0.15] rounded-control text-[10px] text-accent-green">
          On track
        </span>
      </div>
      <div className="flex items-end gap-1 mt-2">
        <span className="text-[52px] text-text-primary leading-[52px]">23</span>
        <span className="text-[18px] text-text-secondary pb-1.5">h</span>
      </div>
      <p className="text-[11px] text-text-secondary">this week / Target: 30h</p>
      <div className="h-px bg-border my-3" />
      <div className="flex flex-col gap-2">
        <ActivityBar label="Code" pct={72} color="rgb(var(--status-success))" textColor="rgb(var(--status-success))" onClick={() => addToast("Filtering by Code activity", "info")} />
        <ActivityBar label="Architecture" pct={18} color="#007aff" textColor="#007aff" onClick={() => addToast("Filtering by Architecture activity", "info")} />
        <ActivityBar label="Requirements" pct={10} color="rgb(var(--border))" textColor="rgb(var(--text-secondary))" onClick={() => addToast("Filtering by Requirements activity", "info")} />
      </div>
    </div>
  );
}




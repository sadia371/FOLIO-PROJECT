"use client";

import { RefreshCw, TrendingUp, Minus } from "lucide-react";
import { repoPulseStats } from "@/lib/mock/code-content";
import type { Stat } from "@/lib/mock/code-content";

function HeadlineStat({ stat, onClick }: { stat: Stat; onClick?: () => void }) {
  return (
    <button
      onClick={onClick}
      className="flex flex-col gap-1.5 flex-1 min-w-[130px] text-left hover:opacity-70 transition-opacity"
    >
      <p className="text-[10px] uppercase tracking-[0.4px] text-text-secondary font-normal leading-none">
        {stat.label}
      </p>
      <p
        className={`text-[24px] font-medium leading-none ${stat.critical ? "text-status-danger" : "text-text-primary"}`}
      >
        {stat.value}
      </p>
      <div className="flex items-center gap-1">
        {stat.trend === "flat" ? (
          <Minus className="w-[10px] h-[10px] text-text-muted" />
        ) : (
          <TrendingUp className="w-[10px] h-[10px] text-text-muted" />
        )}
        <p className="text-[10px] text-text-secondary leading-none">{stat.sub}</p>
      </div>
    </button>
  );
}

function SecondaryStat({ stat, onClick }: { stat: Stat; onClick?: () => void }) {
  return (
    <button
      onClick={onClick}
      className="flex items-baseline gap-1.5 flex-1 min-w-[140px] text-left hover:opacity-70 transition-opacity"
    >
      <span
        className={`text-[14px] font-medium leading-none ${stat.critical ? "text-status-danger" : "text-text-primary"}`}
      >
        {stat.value}
      </span>
      <span className="text-[11px] text-text-secondary leading-none">{stat.label}</span>
    </button>
  );
}

export function RepositoryPulse({ onStatClick }: { onStatClick: (label: string) => void }) {
  return (
    <div className="bg-surface rounded-card border border-border/60 w-full">
      <div className="p-4">
        <div className="flex items-center gap-2 mb-4">
          <span className="text-[11px] font-medium text-text-primary">Repository Summary</span>
          <div className="flex-1" />
          <RefreshCw className="w-[11px] h-[11px] text-text-secondary" />
        </div>

        <div className="flex flex-wrap gap-x-6 gap-y-5">
          {repoPulseStats.headline.map((s) => (
            <HeadlineStat key={s.label} stat={s} onClick={() => onStatClick(s.label)} />
          ))}
        </div>

        <div className="mt-5 pt-4 border-t border-border flex flex-wrap gap-x-6 gap-y-2">
          {repoPulseStats.secondary.map((s) => (
            <SecondaryStat key={s.label} stat={s} onClick={() => onStatClick(s.label)} />
          ))}
        </div>
      </div>
    </div>
  );
}

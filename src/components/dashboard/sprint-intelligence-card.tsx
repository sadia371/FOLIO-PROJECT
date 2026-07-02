"use client";

import { useState } from "react";
import { ExternalLink, ChevronRight, Target } from "lucide-react";
import { sprintStats, issues } from "@/lib/mock/dashboard-content";
import type { Toast } from "@/components/shared/use-toasts";

export function SprintIntelligenceCard({ addToast }: { addToast: (m: string, t?: Toast["type"]) => void }) {
  const [activeStatFilter, setActiveStatFilter] = useState<string | null>(null);
  const [, setSelectedIssue] = useState<string | null>(null);

  return (
    <div className="flex flex-col p-4 bg-surface border border-border rounded-card">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-[10px] text-text-secondary tracking-[0.04em] uppercase">
          <Target className="h-3.5 w-3.5 text-text-muted translate-y-[-2px]" />
          <p>Sprint Intelligence</p>
        </div>
        <button
          onClick={() => addToast("Opening Jira board...", "action")}
          className="flex items-center px-2 h-[22px] bg-[#007aff]/[0.15] rounded-md text-[10px] text-[#007aff] hover:bg-[#007aff]/25 transition-colors"
        >
          Jira
          <ExternalLink className="w-3 h-3 ml-1" />
        </button>
      </div>
      <div className="flex items-baseline gap-2 mt-2">
        <span className="text-[22px] text-text-primary">Sprint 42</span>
        <span className="text-[11px] text-text-secondary">16 / 44 pts · 36%</span>
      </div>
      <div className="h-[6.8px] bg-border rounded-full mt-2 overflow-hidden">
        <div className="h-full bg-status-success rounded-full transition-all duration-700" style={{ width: "36%" }} />
      </div>
      <p className="text-[12px] text-text-secondary mt-2">
        Complete payment integration and order tracking MVP
      </p>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 mt-3">
        {sprintStats.map(({ count, label, bg, color }) => (
          <button
            key={label}
            onClick={() => {
              setActiveStatFilter(activeStatFilter === label ? null : label);
              addToast(activeStatFilter === label ? "Filter cleared" : `Filtering by: ${label}`, "info");
            }}
            className={`flex flex-col items-center p-2 rounded-control w-full transition-all duration-150 ${
              activeStatFilter === label ? "ring-2 ring-[#007aff] ring-offset-1" : "hover:scale-105"
            }`}
            style={{ background: bg }}
          >
            <span className="text-[22px] leading-[33px]" style={{ color }}>{count}</span>
            <span className="text-[10px] leading-[15px]" style={{ color }}>{label}</span>
          </button>
        ))}
      </div>
      <div className="h-px bg-border mt-3 mb-2" />
      <p className="text-[10px] text-text-secondary tracking-[0.04em] uppercase mb-2">
        Active Issues
      </p>
      <div className="flex flex-col gap-1.5">
        {issues
          .filter((iss) => !activeStatFilter || iss.status === activeStatFilter)
          .map((iss) => (
            <button
              key={iss.id}
              onClick={() => {
                setSelectedIssue((cur) => (cur === iss.id ? null : iss.id));
                addToast(`Opening ${iss.id}...`, "action");
              }}
              className="flex items-center gap-3 hover:bg-canvas rounded-md px-1 py-0.5 -mx-1 transition-colors text-left"
            >
              <span className="text-[11px] text-text-secondary w-14 flex-shrink-0 font-mono">{iss.id}</span>
              <span className="text-[11px] text-text-primary flex-1 truncate">{iss.title}</span>
              <span className="text-[11px] text-text-muted flex-shrink-0">{iss.pts}</span>
              <ChevronRight className="w-3 h-3 text-text-muted flex-shrink-0" />
            </button>
          ))}
      </div>
    </div>
  );
}

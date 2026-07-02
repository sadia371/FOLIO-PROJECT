"use client";

import { FileText, Send, Clock } from "lucide-react";

const stats = [
  { label: "User Stories", value: 12, color: "text-text-primary" },
  { label: "Edge Cases", value: 7, color: "text-text-primary" },
  { label: "Risks Flagged", value: 5, color: "text-status-warning" },
  { label: "High Severity", value: 3, color: "text-status-danger" },
];

const versions = [
  {
    name: "v2.1",
    label: "Current",
    description: "Regenerated with edge-case focus.",
    time: "2 mins ago",
    isCurrent: true,
  },
  {
    name: "v2.0",
    label: null,
    description: "Full risk register added.",
    time: "1 hour ago",
    isCurrent: false,
  },
  {
    name: "v1.0",
    label: null,
    description: "Initial PRD generation.",
    time: "Yesterday",
    isCurrent: false,
  },
];

export function CoverageInsights() {
  return (
    <div className="flex flex-col gap-3">
      {/* ── Coverage Insights card ── */}
      <div className="bg-surface border border-border rounded-xl p-4">
        <p className="text-[10px] font-medium tracking-[0.07em] uppercase text-text-secondary mb-2.5">
          Coverage Insights
        </p>

        {/* Big number */}
        <div className="flex items-baseline gap-2 mb-0.5">
          <span className="text-[38px] font-medium text-text-primary leading-none">87%</span>
        </div>
        <p className="text-[12px] text-text-secondary mb-3">requirement coverage</p>

        {/* Progress bar */}
        <div className="h-1 bg-canvas rounded-full mb-4 overflow-hidden">
          <div
            className="h-full bg-status-success rounded-full transition-all duration-500"
            style={{ width: "87%" }}
          />
        </div>

        {/* Stats */}
        <div className="flex flex-col divide-y divide-border">
          {stats.map((s) => (
            <div key={s.label} className="flex items-center justify-between py-[5px]">
              <span className="text-[12px] text-text-secondary">{s.label}</span>
              <span className={`text-[12px] font-medium ${s.color}`}>{s.value}</span>
            </div>
          ))}
        </div>

        {/* Export actions */}
        <div className="flex flex-col gap-1.5 mt-4">
          <button className="flex items-center justify-center gap-2 w-full py-[7px] text-[12px] text-text-secondary border border-border rounded-lg bg-canvas hover:bg-surface hover:text-text-primary hover:border-text-muted transition-all">
            <FileText className="w-3.5 h-3.5" />
            Export PDF
          </button>
          <button className="flex items-center justify-center gap-2 w-full py-[7px] text-[12px] text-text-secondary border border-border rounded-lg bg-canvas hover:bg-surface hover:text-text-primary hover:border-text-muted transition-all">
            <FileText className="w-3.5 h-3.5" />
            Export Markdown
          </button>
          <button className="flex items-center justify-center gap-2 w-full py-[7px] text-[12px] font-medium text-white bg-[#1d1d1f] rounded-lg hover:opacity-85 transition-opacity">
            <Send className="w-3.5 h-3.5" />
            Send to Jira
          </button>
        </div>
      </div>

      {/* ── Version History card ── */}
      <div className="bg-surface border border-border rounded-xl p-4">
        <p className="text-[10px] font-medium tracking-[0.07em] uppercase text-text-secondary mb-3">
          Version History
        </p>

        <div className="flex flex-col">
          {versions.map((v, i) => (
            <div key={v.name} className="flex gap-2.5 relative">
              {/* Timeline spine */}
              <div className="flex flex-col items-center flex-shrink-0">
                <div
                  className={`w-2 h-2 rounded-full mt-[3px] flex-shrink-0 ${
                    v.isCurrent ? "bg-status-success" : "bg-text-muted"
                  }`}
                />
                {i < versions.length - 1 && (
                  <div className="w-px flex-1 bg-canvas mt-[3px] mb-1 min-h-[16px]" />
                )}
              </div>

              {/* Content */}
              <div className={`pb-3 min-w-0 ${i === versions.length - 1 ? "pb-0" : ""}`}>
                <div className="flex items-center gap-1.5 flex-wrap">
                  <span className="text-[12px] font-medium text-text-primary">{v.name}</span>
                  {v.label && (
                    <span className="text-[10px] font-medium text-status-success">({v.label})</span>
                  )}
                </div>
                <p className="text-[11px] text-text-secondary mt-0.5 leading-[1.4]">
                  {v.description}
                </p>
                <p className="text-[10px] text-text-muted mt-0.5 uppercase tracking-wider">
                  {v.time}
                </p>
              </div>
            </div>
          ))}
        </div>

        <button className="flex items-center justify-center gap-1.5 w-full mt-2 py-[6px] text-[11px] text-text-secondary border border-border rounded-lg bg-canvas hover:bg-surface hover:text-text-primary hover:border-text-muted transition-all">
          <Clock className="w-3 h-3" />
          View all versions
        </button>
      </div>
    </div>
  );
}

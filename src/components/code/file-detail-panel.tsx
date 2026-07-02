"use client";

import { X, Zap } from "lucide-react";
import { Badge, Dot } from "./shared";
import { fileDetailData, fileDetailDefault } from "@/lib/mock/code-content";

export function FileDetailPanel({
  selectedFile,
  onClose,
}: {
  selectedFile: string | null;
  onClose: () => void;
}) {
  const data = selectedFile
    ? fileDetailData[selectedFile] || fileDetailDefault
    : fileDetailData["token-manager.ts"];
  const isSelected = !!selectedFile;

  return (
    <div className="bg-surface rounded-card border border-border/60 w-full lg:w-[260px] shrink-0 self-start p-4 flex flex-col gap-2">
      <div className="flex items-center justify-between">
        <span className="text-[11px] font-medium text-text-primary truncate">
          {selectedFile || "token-manager.ts"}
        </span>
        {isSelected && (
          <button onClick={onClose} className="p-0.5 rounded hover:bg-canvas transition-colors">
            <X className="w-3 h-3 text-text-secondary" />
          </button>
        )}
      </div>

      <div className="flex items-center gap-2">
        <div className="flex gap-2 items-start">
          <div>
            <p className="text-[9px] uppercase tracking-[0.4px] text-text-secondary text-center">Impact</p>
            <p className="text-[22px] font-medium text-text-primary text-center leading-tight">{data.impact}</p>
          </div>
          <div className="w-px bg-border h-9 mt-1" />
          <div>
            <p className="text-[9px] uppercase tracking-[0.4px] text-text-secondary text-center">Risk</p>
            <p className="text-[22px] font-medium text-status-danger text-center leading-tight">{data.riskScore}</p>
          </div>
        </div>
        <div className="flex-1" />
        <div className={`flex items-center gap-1 rounded-md px-1.5 py-1 ${
          data.risk === "high" ? "bg-status-danger/10" : data.risk === "medium" ? "bg-status-warning/12" : "bg-status-success/15"
        }`}>
          <Dot color={data.risk === "high" ? "rgb(var(--status-danger))" : data.risk === "medium" ? "rgb(var(--status-warning))" : "rgb(var(--status-success))"} size={6} />
          <span className={`text-[10px] font-medium ${
            data.risk === "high" ? "text-status-danger" : data.risk === "medium" ? "text-status-warning" : "text-status-success"
          }`}>
            {data.risk === "high" ? "Blocked" : data.risk === "medium" ? "Review" : "Stable"}
          </span>
        </div>
      </div>

      <div className="h-px bg-border" />

      <div className="flex flex-col gap-1.5">
        {[
          { label: "Owner", value: data.owner },
          { label: "Reviewer", value: data.reviewer },
          { label: "Last Commit", value: data.commit },
          { label: "Pipeline", el: <Badge color={data.pipeline === "passing" ? "green" : "red"} size="xs">{data.pipeline}</Badge> },
          { label: "Open Issues", value: "0" },
          { label: "Unresolved Comments", value: "0" },
          { label: "Risk Level", el: <Badge color={data.risk === "high" ? "red" : data.risk === "medium" ? "orange" : "green"} size="xs">{data.risk}</Badge> },
        ].map((d) => (
          <div key={d.label} className="flex items-center justify-between">
            <span className="text-[11px] text-text-secondary">{d.label}</span>
            {d.el || <span className="text-[11px] font-medium text-text-primary">{d.value}</span>}
          </div>
        ))}
      </div>

      <div className="h-px bg-border" />

      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-1">
          <Zap className="w-2.5 h-2.5 text-[#007aff]" />
          <span className="text-[9px] uppercase tracking-[0.4px] text-text-secondary">AI Summary</span>
        </div>
        <p className="text-[11px] text-text-primary leading-[16.5px]">
          {data.summary}
        </p>
      </div>
    </div>
  );
}

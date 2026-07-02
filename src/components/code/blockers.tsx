"use client";

import { AlertCircle, ArrowRight } from "lucide-react";
import { Badge } from "./shared";
import { blockerItems } from "@/lib/mock/code-content";
import type { BlockerItem } from "@/lib/mock/code-content";

function BlockerRow({ item, onAction }: { item: BlockerItem; onAction: (action: string) => void }) {
  const severityColor = { high: "red" as const, medium: "gray" as const, low: "gray" as const };
  const iconColor = item.icon === "red" ? "rgb(var(--status-danger))" : "rgb(var(--text-secondary))";

  return (
    <div className="border-b border-border py-2.5">
      <div className="flex items-start gap-1.5 mb-1">
        <AlertCircle className="w-[11px] h-[11px] mt-px shrink-0" style={{ color: iconColor }} strokeWidth={1.5} />
        <span className="text-[11px] font-medium text-text-primary flex-1 min-w-0">{item.title}</span>
        {item.jira && <Badge color="gray" size="xs">Jira</Badge>}
        <Badge color={severityColor[item.severity]} size="xs">{item.severity}</Badge>
      </div>
      <p className="text-[11px] text-text-secondary pl-4 mb-1">{item.desc}</p>
      {item.meta && <p className="text-[11px] text-text-secondary pl-4 mb-1">{item.meta}</p>}
      <button
        onClick={() => onAction(item.action)}
        className="flex items-center gap-1 pl-4 hover:opacity-70 transition-opacity"
      >
        <ArrowRight className="w-[9px] h-[9px] text-[#007aff]" />
        <span className="text-[10px] text-[#007aff]">{item.action}</span>
      </button>
    </div>
  );
}

export function Blockers({ onAction }: { onAction: (action: string) => void }) {
  return (
    <div className="bg-surface rounded-card border border-border/60 w-full p-4 flex flex-col">
      <div className="flex items-center mb-2">
        <span className="text-[11px] font-medium text-text-primary">Blockers</span>
        <span className="ml-2 text-[9px] text-status-danger-on-tint bg-status-danger/10 rounded px-1.5 py-0.5">
          2 high
        </span>
      </div>
      <div className="flex flex-col mt-1">
        {blockerItems.map((item) => (
          <BlockerRow key={item.title} item={item} onAction={onAction} />
        ))}
      </div>
    </div>
  );
}

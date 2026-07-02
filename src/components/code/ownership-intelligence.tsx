"use client";

import { GitBranch } from "lucide-react";
import { Avatar, Badge, WorkloadBar } from "./shared";
import { ownershipRows, ownershipColumns } from "@/lib/mock/code-content";

export function OwnershipIntelligence({ onModuleClick }: { onModuleClick: (module: string) => void }) {
  return (
    <div className="bg-surface rounded-card border border-border/60 w-full p-4 flex flex-col">
      <span className="text-[11px] font-medium text-text-primary">Ownership Intelligence</span>
      <div className="mt-2.5 overflow-x-auto">
        <div className="grid gap-2 border-b border-border pb-1.5 mb-0 min-w-[480px]" style={{ gridTemplateColumns: "1.4fr 40px 50px 1.3fr 1.1fr 40px 1fr" }}>
          {ownershipColumns.map((c) => (
            <span key={c} className="text-[9px] uppercase tracking-[0.4px] font-medium text-text-secondary leading-none">
              {c}
            </span>
          ))}
        </div>

        {ownershipRows.map((row) => (
          <button
            key={row.module}
            onClick={() => onModuleClick(row.module)}
            className="grid gap-2 items-center border-b border-border py-2 min-w-[480px] w-full text-left hover:bg-canvas transition-colors px-1 -mx-1 rounded"
            style={{ gridTemplateColumns: "1.4fr 40px 50px 1.3fr 1.1fr 40px 1fr" }}
          >
            <span className="text-[11px] font-medium text-text-primary">{row.module}</span>
            <Avatar initials={row.owner} />
            <Avatar initials={row.reviewer} />
            <Badge color={row.review.color} size="xs">{row.review.label}</Badge>
            <div className="flex items-center gap-1 min-w-0">
              <GitBranch className="w-[9px] h-[9px] text-text-secondary shrink-0" />
              <span className="text-[10px] text-text-secondary truncate">{row.branch}</span>
            </div>
            {row.pr ? (
              <Badge color="gray" size="xs">{row.pr}</Badge>
            ) : (
              <span className="text-[11px] text-text-muted">—</span>
            )}
            <WorkloadBar pct={row.workload.pct} color={row.workload.color} />
          </button>
        ))}
      </div>
    </div>
  );
}

"use client";

import { memo } from "react";
import { Dot } from "./shared";
import {
  repoGraphLegend as legend,
  repoGraphCol1 as col1,
  repoGraphCol2 as col2,
  repoGraphCol3 as col3,
} from "@/lib/mock/code-content";
import type { FileNode, FileStatus } from "@/lib/mock/code-content";

const FileNodeCard = memo(function FileNodeCard({
  node,
  onFileClick,
}: {
  node: FileNode;
  onFileClick: (name: string) => void;
}) {
  const statusColors: Record<FileStatus, { bg: string; text: string }> = {
    Stable: { bg: "rgb(var(--status-success) / 0.13)", text: "rgb(var(--status-success))" },
    Active: { bg: "rgba(0,122,255,0.1)", text: "#007aff" },
    "Under Review": { bg: "rgb(var(--status-warning) / 0.12)", text: "rgb(var(--status-warning))" },
    Blocked: { bg: "rgb(var(--status-danger) / 0.1)", text: "rgb(var(--status-danger))" },
  };
  const s = statusColors[node.status];

  return (
    <button
      onClick={() => onFileClick(node.name)}
      className="bg-surface rounded-lg border px-3 pt-2 pb-2.5 w-[175px] shrink-0 relative text-left hover:shadow-md transition-shadow"
      style={{
        borderColor: node.highlighted ? "rgb(var(--status-danger))" : "rgb(var(--border))",
        background: node.highlighted ? "rgb(var(--status-danger) / 0.05)" : "rgb(var(--surface))",
        borderWidth: node.highlighted ? 1.5 : 0.8,
      }}
    >
      <p className="text-[12.5px] text-text-primary leading-none mb-1.5">{node.name}</p>
      <div className="flex items-center gap-1.5">
        <span className="text-[10px] rounded px-1.5 py-0.5" style={{ background: s.bg, color: s.text }}>
          {node.status}
        </span>
        {node.extra && (
          <span className="text-[10px] rounded px-1.5 py-0.5" style={{ background: "rgb(var(--status-warning) / 0.12)", color: "rgb(var(--status-warning))" }}>
            {node.extra}
          </span>
        )}
      </div>
    </button>
  );
});

function ConnectorLine({ dashed = false }: { dashed?: boolean }) {
  return (
    <div className="flex items-center flex-1 min-w-8 max-w-16">
      <div className="h-px flex-1" style={{ borderTop: dashed ? "1px dashed rgb(var(--border))" : "1px solid rgb(var(--border))" }} />
    </div>
  );
}

export function RepositoryGraph({ onFileClick }: { onFileClick: (name: string) => void }) {
  return (
    <div className="bg-surface rounded-card border border-border/60 flex-1 min-w-0 p-4 flex flex-col">
      <div className="flex items-center gap-2 mb-4 h-6 flex-wrap">
        <span className="text-[11px] font-medium text-text-primary">Repository Intelligence Graph</span>
        <div className="flex-1" />
        <div className="flex items-center gap-2">
          {legend.map((l) => (
            <div key={l.label} className="flex items-center gap-1">
              <Dot color={l.color} size={6} />
              <span className="text-[9px] text-text-secondary">{l.label}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="flex-1 flex items-center justify-center overflow-x-auto py-2">
        <div className="flex gap-0 items-center justify-center min-w-[640px]">
          <div className="flex flex-col gap-4">
            {col1.map((n) => (
              <FileNodeCard key={n.name} node={n} onFileClick={onFileClick} />
            ))}
          </div>

          <div className="flex flex-col gap-4">
            {col1.map((_, i) => (
              <div key={i} className="h-[44px] flex items-center">
                <ConnectorLine dashed={i === 2} />
              </div>
            ))}
          </div>

          <div className="flex flex-col gap-4">
            {col2.map((n) => (
              <FileNodeCard key={n.name} node={n} onFileClick={onFileClick} />
            ))}
          </div>

          <div className="flex flex-col gap-4">
            {[0, 1].map((i) => (
              <div key={i} className="h-[44px] flex items-center">
                <ConnectorLine />
              </div>
            ))}
            <div className="h-[44px]" />
          </div>

          <div className="flex flex-col gap-4">
            {col3.map((n) => (
              <FileNodeCard key={n.name} node={n} onFileClick={onFileClick} />
            ))}
            <div className="h-[44px]" />
          </div>
        </div>
      </div>
    </div>
  );
}

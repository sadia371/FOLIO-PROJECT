"use client";

import { ArrowRight } from "lucide-react";
import { issueRelationships } from "@/lib/mock/code-content";

function CodeChip({ children }: { children: React.ReactNode }) {
  return (
    <span className="bg-canvas rounded text-[9px] font-mono text-text-primary px-1.5 py-0.5">
      {children}
    </span>
  );
}

function IssueRow({
  num,
  title,
  files,
  nextNum,
  onClick,
}: {
  num: string;
  title: string;
  files: string[];
  nextNum?: string;
  onClick: (file: string) => void;
}) {
  return (
    <div className="border border-border rounded-control p-[10.8px] flex flex-col gap-1.5 hover:border-text-muted transition-colors">
      <div className="flex items-center gap-1.5">
        <span className="text-[10px] font-medium text-text-secondary">{num}</span>
        <span className="text-[11px] font-medium text-text-primary">{title}</span>
      </div>
      <div className="flex items-center flex-wrap gap-1">
        {files.map((f, i) => (
          <span key={f} className="flex items-center gap-1">
            <button onClick={() => onClick(f)}>
              <CodeChip>{f}</CodeChip>
            </button>
            {i < files.length - 1 && <ArrowRight className="w-[9px] h-[9px] text-text-muted" />}
          </span>
        ))}
        {nextNum && (
          <>
            <ArrowRight className="w-[9px] h-[9px] text-text-muted" />
            <span className="text-[9px] text-text-secondary">{nextNum}</span>
          </>
        )}
      </div>
    </div>
  );
}

export function IssueRelationship({ onFileClick }: { onFileClick: (file: string) => void }) {
  return (
    <div className="bg-surface rounded-card border border-border/60 w-full p-4 flex flex-col">
      <span className="text-[11px] font-medium text-text-primary">Issue Relationship View</span>
      <div className="flex flex-col gap-3 mt-2.5">
        {issueRelationships.map((issue) => (
          <IssueRow key={issue.num} {...issue} onClick={onFileClick} />
        ))}
      </div>
    </div>
  );
}

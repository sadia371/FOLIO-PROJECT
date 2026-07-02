"use client";

import { Clock, MessageCircle, MoreHorizontal } from "lucide-react";
import { Badge } from "./shared";
import { reviewQueueItems } from "@/lib/mock/code-content";
import type { QueueItem } from "@/lib/mock/code-content";

function QueueRow({ item, onClick }: { item: QueueItem; onClick: () => void }) {
  const priorityColor = { high: "red" as const, medium: "gray" as const, low: "gray" as const };
  return (
    <button
      onClick={onClick}
      className="border-b border-border py-2.5 w-full text-left hover:bg-canvas transition-colors px-1 -mx-1 rounded"
    >
      <div className="flex items-center gap-1.5 mb-1">
        <span className="text-[11px] font-mono text-text-primary flex-1 min-w-0 truncate">
          {item.file}
        </span>
        <Badge color={priorityColor[item.priority]} size="xs">
          {item.priority}
        </Badge>
      </div>
      <p className="text-[11px] text-text-secondary mb-1">{item.desc}</p>
      <div className="flex items-center gap-2">
        <div className="flex items-center gap-0.5">
          <Clock className="w-[9px] h-[9px] text-text-muted" />
          <span className="text-[10px] text-text-muted"> {item.waiting}</span>
        </div>
        <div className="flex items-center gap-0.5">
          <MessageCircle className="w-[9px] h-[9px] text-text-muted" />
          <span className="text-[10px] text-text-muted"> {item.comments}</span>
        </div>
      </div>
    </button>
  );
}

export function ReviewQueue({ onItemClick }: { onItemClick: (file: string) => void }) {
  return (
    <div className="bg-surface rounded-card border border-border/60 w-full p-4 flex flex-col">
      <div className="flex items-center mb-2">
        <span className="text-[11px] font-medium text-text-primary">Review Queue</span>
        <span className="ml-2 text-[9px] text-status-warning-on-tint bg-status-warning/12 rounded px-1.5 py-0.5">
          4 waiting
        </span>
        <div className="flex-1" />
        <MoreHorizontal className="w-[13px] h-[13px] text-text-secondary" />
      </div>
      <div className="flex flex-col mt-1">
        {reviewQueueItems.map((item) => (
          <QueueRow key={item.file} item={item} onClick={() => onItemClick(item.file)} />
        ))}
      </div>
    </div>
  );
}

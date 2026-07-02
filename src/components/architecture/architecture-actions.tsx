"use client";

import { GitBranch, MemoryStick } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const actions = [
  {
    title: "Message Queue Protocol",
    description: "Evaluate RabbitMQ vs Kafka for event bus",
    icon: GitBranch,
    status: "review" as const,
  },
  {
    title: "Caching Layer",
    description: "Pending Redis configuration spec",
    icon: MemoryStick,
    status: "blocked" as const,
  },
];

const statusStyles = {
  review: "bg-amber-50 text-amber-700",
  blocked: "bg-red-50 text-red-600",
};

export function ArchitectureActions() {
  return (
    <div>
      <div className="mb-3 flex items-center justify-between">
        <h3 className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-text-muted">
          Action Required
        </h3>
        <button className="text-[11px] font-bold text-text-muted hover:text-text-primary underline">
          View all
        </button>
      </div>
      <div className="space-y-2">
        {actions.map((item) => {
          const Icon = item.icon;
          return (
            <div
              key={item.title}
              className="flex cursor-pointer items-center justify-between rounded-lg border border-border-soft bg-surface px-3 py-2.5 transition-all hover:border-accent-green/40"
            >
              <div className="flex items-center gap-2.5">
                <div className="flex h-7 w-7 items-center justify-center rounded-md bg-surface-container-low text-text-muted/40">
                  <Icon className="h-3.5 w-3.5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-text-primary">{item.title}</h4>
                  <p className="text-[11px] text-text-muted">{item.description}</p>
                </div>
              </div>
              <Badge className={`shrink-0 border-0 text-[9px] ${statusStyles[item.status]}`}>
                {item.status === "review" ? "Needs Review" : "Blocked"}
              </Badge>
            </div>
          );
        })}
      </div>
    </div>
  );
}

"use client";

import { userStories } from "@/lib/mock/requirements-intelligence";
import { Database, Pencil, RefreshCw } from "lucide-react";

const priorityStyles = {
  high: "bg-status-danger/10 text-status-danger-on-tint",
  medium: "bg-status-warning/10 text-status-warning-on-tint",
  low: "bg-accent-green/10 text-status-success-on-tint",
};

const statusStyles = {
  in_progress: { dot: "bg-accent-green", label: "In Progress" },
  backlog: { dot: "bg-border", label: "Backlog" },
  done: { dot: "bg-accent-green", label: "Done" },
};

export function UserStoriesPanel() {
  return (
    <div className="flex-1 flex flex-col gap-5">
      {userStories.map((story) => (
        <article
          key={story.id}
          className="bg-surface border border-border-soft rounded-xl p-5 group hover:border-accent-green/40 transition-colors"
        >
          <div className="flex justify-between items-start mb-3">
            <div className="flex items-center gap-3">
              <span className="font-mono text-[11px] text-text-muted">{story.id}</span>
              <span className={`px-2 py-0.5 rounded text-[10px] font-mono uppercase tracking-wide ${priorityStyles[story.priority]}`}>
                {story.priority} Priority
              </span>
            </div>
            <div className="flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
              <button aria-label="Edit story" className="p-1.5 hover:bg-surface-container rounded-full text-text-muted">
                <Pencil className="h-3.5 w-3.5" />
              </button>
              <button aria-label="Regenerate story" className="p-1.5 hover:bg-surface-container rounded-full text-text-muted">
                <RefreshCw className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
          <h3 className="text-sm font-bold text-text-primary mb-2">{story.title}</h3>
          <p className="text-xs text-text-muted italic mb-4">&quot;{story.statement}&quot;</p>

          {story.acceptanceCriteria.length > 0 && (
            <div className="space-y-2 mb-4">
              {story.acceptanceCriteria.map((ac, i) => (
                <div key={i} className="flex items-center gap-2.5">
                  <span className="text-accent-green text-sm">☑</span>
                  <span className="text-xs text-text-primary">{ac}</span>
                </div>
              ))}
            </div>
          )}

          <div className="flex items-center justify-between pt-4 border-t border-border-soft/20">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1.5 font-mono text-[11px] text-text-muted">
                <Database className="h-3 w-3" />
                {story.points} pts
              </div>
              <div className="flex items-center gap-1.5 font-mono text-[11px] text-text-muted">
                <span className={`w-2 h-2 rounded-full ${statusStyles[story.status].dot}`} />
                {statusStyles[story.status].label}
              </div>
            </div>
            <button className="px-3 py-1 rounded-full border border-border-soft text-xs text-text-muted hover:bg-surface-container-high transition-all">
              View Traceability
            </button>
          </div>
        </article>
      ))}
    </div>
  );
}

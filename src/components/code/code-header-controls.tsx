"use client";

import { GitBranch, RefreshCw, Bell } from "lucide-react";

export function CodeHeaderControls({
  onRefresh,
  lastRefresh,
}: {
  onRefresh: () => void;
  lastRefresh: string;
}) {
  return (
    <>
      {/* Git branch info */}
      <div className="flex items-center gap-1.5 pl-1 hidden md:flex truncate">
        <GitBranch className="w-3.5 h-3.5 text-text-secondary shrink-0" />
        <span className="text-[12px] text-text-secondary truncate max-w-[120px]">food-delivery-api</span>
        <span className="text-[12px] text-text-muted shrink-0">·</span>
        <span className="text-[12px] text-text-secondary shrink-0">main</span>
        <span className="text-[12px] text-text-muted shrink-0">·</span>
        <span className="text-[12px] text-text-secondary shrink-0">3 open PRs</span>
      </div>

      <div className="flex items-center gap-1.5 ml-auto">
        <button
          onClick={onRefresh}
          aria-label="Refresh data"
          className="flex items-center gap-1.5 px-2 py-1 rounded-md hover:bg-border/30 transition-colors"
          title="Refresh data"
        >
          <RefreshCw className="w-3.5 h-3.5 text-text-secondary" />
          <span className="text-[10px] text-text-secondary hidden sm:inline">Updated {lastRefresh}</span>
        </button>

        <button aria-label="Notifications (3 unread)" className="flex items-center gap-1.5 p-1.5 rounded-md hover:bg-border/30 transition-colors relative">
          <Bell className="w-3.5 h-3.5 text-text-secondary" />
          <span className="absolute -top-0.5 -right-0.5 w-3.5 h-3.5 bg-status-danger rounded-full text-[8px] text-white flex items-center justify-center font-bold">
            3
          </span>
        </button>
      </div>
    </>
  );
}

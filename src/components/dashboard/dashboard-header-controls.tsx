"use client";

import { Search, Bell } from "lucide-react";

export function DashboardHeaderControls() {
  return (
    <div className="flex items-center gap-1.5 ml-auto">
      <button aria-label="Search" className="flex items-center gap-1.5 p-1.5 rounded-md hover:bg-border/30 transition-colors">
        <Search className="w-3.5 h-3.5 text-text-secondary" />
      </button>

      <button aria-label="Notifications (3 unread)" className="flex items-center gap-1.5 p-1.5 rounded-md hover:bg-border/30 transition-colors relative">
        <Bell className="w-3.5 h-3.5 text-text-secondary" />
        <span className="absolute -top-0.5 -right-0.5 w-3.5 h-3.5 bg-status-danger rounded-full text-[8px] text-white flex items-center justify-center font-bold">
          3
        </span>
      </button>
    </div>
  );
}

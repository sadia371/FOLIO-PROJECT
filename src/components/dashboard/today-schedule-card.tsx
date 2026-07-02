"use client";

import { useState } from "react";
import { Clock, ExternalLink, Copy, Mail } from "lucide-react";
import { scheduleItems } from "@/lib/mock/dashboard-content";
import type { Toast } from "@/components/shared/use-toasts";

export function TodayScheduleCard({ addToast }: { addToast: (m: string, t?: Toast["type"]) => void }) {
  const [selectedSchedule, setSelectedSchedule] = useState<number | null>(null);

  return (
    <div className="flex flex-col p-4 border-b sm:border-b-0 sm:border-r border-border flex-1">
      <div className="mb-3 flex items-center gap-2 text-[10px] text-text-secondary tracking-[0.04em] uppercase">
        <Mail className="h-3.5 w-3.5 text-text-muted translate-y-[-2px]" />
        <p>Today&apos;s Schedule</p>
      </div>
      {scheduleItems.map((item, i) => (
        <div key={i}>
          <button
            onClick={() => setSelectedSchedule(selectedSchedule === i ? null : i)}
            className={`w-full flex items-start justify-between py-3 text-left transition-colors rounded-md px-1 -mx-1 ${
              selectedSchedule === i ? "bg-[#007aff]/[0.04]" : "hover:bg-canvas"
            }`}
          >
            <div>
              <div className="text-[14px] text-text-primary">{item.title}</div>
              <div className={`text-[12px] flex items-center gap-1 ${item.subMuted ? "text-text-muted" : "text-text-secondary"}`}>
                <Clock className="w-3 h-3" />
                {item.sub}
              </div>
            </div>
            <span
              className="flex items-center px-2 h-5 rounded-md text-[10px] whitespace-nowrap"
              style={{ background: item.bc, color: item.tc }}
            >
              {item.badge}
            </span>
          </button>
          {selectedSchedule === i && (
            <div className="px-2 pb-3 space-y-2 animate-[fadeIn_0.15s_ease-out]">
              <div className="flex items-center gap-2 text-[11px] text-text-secondary">
                <span className="font-medium text-text-primary">Attendees:</span>
                {item.attendees.join(", ")}
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => addToast(`Joined ${item.title} meeting`, "action")}
                  className="flex items-center gap-1 px-2.5 py-1 bg-[#007aff] text-white text-[10px] rounded-md hover:bg-[#0066d6] transition-colors"
                >
                  <ExternalLink className="w-3 h-3" />
                  Join
                </button>
                <button
                  onClick={() => {
                    navigator.clipboard?.writeText(`${item.title} - ${item.sub}`);
                    addToast("Meeting details copied", "success");
                  }}
                  className="flex items-center gap-1 px-2.5 py-1 bg-canvas text-text-primary text-[10px] rounded-md hover:bg-border transition-colors"
                >
                  <Copy className="w-3 h-3" />
                  Copy
                </button>
              </div>
            </div>
          )}
          {i < scheduleItems.length - 1 && <div className="h-px bg-border" />}
        </div>
      ))}
    </div>
  );
}




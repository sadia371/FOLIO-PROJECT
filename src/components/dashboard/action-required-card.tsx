"use client";

import { useState } from "react";
import { X, CheckCircle2, Bell } from "lucide-react";
import { actions } from "@/lib/mock/dashboard-content";
import type { Toast } from "@/components/shared/use-toasts";

export function ActionRequiredCard({ addToast }: { addToast: (m: string, t?: Toast["type"]) => void }) {
  const [actionStates, setActionStates] = useState<Record<number, "pending" | "responded" | "dismissed">>({
    0: "pending",
    1: "pending",
    2: "pending",
  });

  const respondToAction = (idx: number) => {
    setActionStates((s) => ({ ...s, [idx]: "responded" }));
    addToast(`Responded to ${actions[idx].name}`, "success");
  };
  const dismissAction = (idx: number) => {
    setActionStates((s) => ({ ...s, [idx]: "dismissed" }));
    addToast("Action dismissed", "info");
  };

  return (
    <div className="flex flex-col p-4 flex-1">
      <div className="flex items-center gap-2 mb-3">
        <Bell className="h-3.5 w-3.5 text-text-muted translate-y-[-1px]" />
        <p className="text-[10px] text-text-secondary tracking-[0.04em] uppercase">
          Action Required
        </p>
        <div className="flex items-center justify-center w-[15px] h-[15px] bg-status-danger rounded-full">
          <span className="text-[10px] text-white">
            {Object.values(actionStates).filter((s) => s === "pending").length}
          </span>
        </div>
      </div>
      {actions.map((a, i) => (
        <div key={i}>
          <div className={`flex items-start gap-3 py-3 transition-opacity ${actionStates[i] === "dismissed" ? "opacity-40" : ""}`}>
            <div className="flex items-center justify-center w-[30px] h-[30px] bg-canvas rounded-full flex-shrink-0">
              <span className="text-[10px] text-text-secondary">{a.initials}</span>
            </div>
            <div className="flex flex-col flex-1 min-w-0">
              <span className="text-[12px] text-text-primary">{a.name}</span>
              <span className="text-[10px] text-text-secondary">{a.desc}</span>
            </div>
            {actionStates[i] === "pending" ? (
              <div className="flex gap-1 flex-shrink-0">
                <button
                  onClick={() => respondToAction(i)}
                  aria-label={`Respond to ${a.name}`}
                  className="flex items-center px-2 h-5 rounded-md text-[10px] bg-status-warning/[0.12] text-status-warning-on-tint hover:bg-status-warning/25 transition-colors"
                >
                  {a.badge}
                </button>
                <button
                  onClick={() => dismissAction(i)}
                  aria-label="Dismiss action"
                  className="flex items-center justify-center w-5 h-5 rounded-md hover:bg-canvas transition-colors"
                >
                  <X className="w-3 h-3 text-text-muted" />
                </button>
              </div>
            ) : (
              <span className="flex items-center gap-1 px-2 h-5 rounded-md text-[10px] bg-accent-green/[0.12] text-status-success-on-tint">
                <CheckCircle2 className="w-3 h-3" />
                {actionStates[i] === "responded" ? "Responded" : "Dismissed"}
              </span>
            )}
          </div>
          {i < actions.length - 1 && <div className="h-px bg-border" />}
        </div>
      ))}
    </div>
  );
}



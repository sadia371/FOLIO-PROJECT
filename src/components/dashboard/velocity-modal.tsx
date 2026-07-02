"use client";

import { X } from "lucide-react";
import { VelocityDonut } from "./velocity-donut";
import type { Toast } from "@/components/shared/use-toasts";

export function VelocityModal({
  open,
  onClose,
  addToast,
}: {
  open: boolean;
  onClose: () => void;
  addToast: (m: string, t?: Toast["type"]) => void;
}) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4" onClick={onClose}>
      <div
        className="bg-surface rounded-2xl p-6 w-full max-w-[340px] shadow-2xl animate-[fadeIn_0.2s_ease-out]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-[16px] font-medium text-text-primary">Project Velocity</h3>
          <button onClick={onClose} className="p-1 rounded-md hover:bg-canvas transition-colors">
            <X className="w-4 h-4 text-text-secondary" />
          </button>
        </div>
        <div className="flex flex-col items-center gap-3 mb-4">
          <VelocityDonut onClick={() => {}} />
          <div className="text-center">
            <p className="text-[28px] font-medium text-text-primary">36%</p>
            <p className="text-[12px] text-text-secondary">Sprint completion rate</p>
          </div>
        </div>
        <div className="space-y-3">
          <div className="flex justify-between text-[12px]">
            <span className="text-text-secondary">Points completed</span>
            <span className="text-text-primary font-medium">16 / 44</span>
          </div>
          <div className="flex justify-between text-[12px]">
            <span className="text-text-secondary">Velocity trend</span>
            <span className="text-accent-green font-medium">+5% this week</span>
          </div>
          <div className="flex justify-between text-[12px]">
            <span className="text-text-secondary">Avg. daily output</span>
            <span className="text-text-primary font-medium">5.7 pts/day</span>
          </div>
          <div className="flex justify-between text-[12px]">
            <span className="text-text-secondary">Estimated finish</span>
            <span className="text-[#007aff] font-medium">Jun 28</span>
          </div>
        </div>
        <button
          onClick={() => {
            onClose();
            addToast("Opening full velocity report...", "action");
          }}
          className="w-full mt-4 py-2 bg-[#1d1d1f] text-white text-[12px] font-medium rounded-lg hover:bg-[#3a3a3c] transition-colors"
        >
          View full report
        </button>
      </div>
    </div>
  );
}

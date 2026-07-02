"use client";

import { useState } from "react";
import { ChevronRight, Copy, ExternalLink, Brain } from "lucide-react";
import { memoryTimeline } from "@/lib/mock/dashboard-content";
import type { Toast } from "@/components/shared/use-toasts";

export function ProjectMemoryCard({ addToast }: { addToast: (m: string, t?: Toast["type"]) => void }) {
  const [showTimeline, setShowTimeline] = useState(false);
  const [selectedMemory, setSelectedMemory] = useState<number | null>(null);

  return (
    <div className="flex flex-col p-4 bg-surface border border-border rounded-card">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2 text-[10px] text-text-secondary tracking-[0.04em] uppercase">
          <Brain className="h-3.5 w-3.5 text-text-muted translate-y-[-1px]" />
          <p>Project Memory</p>
        </div>
        <button
          onClick={() => setShowTimeline(!showTimeline)}
          className="text-[11px] text-[#007aff] hover:underline flex items-center gap-1"
        >
          {showTimeline ? "Show summary" : "View full timeline →"}
        </button>
      </div>
      <div className="flex flex-col">
        {memoryTimeline.map((item, i) => (
          <div key={i}>
            <button
              onClick={() => setSelectedMemory(selectedMemory === i ? null : i)}
              className="w-full flex gap-3 items-start text-left hover:bg-canvas rounded-md p-1 -m-1 transition-colors"
            >
              <div className="flex items-start pt-[5px] flex-shrink-0">
                <div className="w-1.5 h-1.5 rounded-full bg-accent-green" />
              </div>
              <div className="flex flex-col flex-1">
                <div className="flex items-center justify-between">
                  <span className="text-[13px] text-text-primary">{item.title}</span>
                  <span className="text-[11px] text-text-muted">{item.date}</span>
                </div>
                <p className="text-[11px] text-text-secondary mt-1">
                  {showTimeline ? item.fullDesc : item.desc}
                </p>
              </div>
              <ChevronRight className={`w-3 h-3 text-text-muted flex-shrink-0 mt-1 transition-transform ${selectedMemory === i ? "rotate-90" : ""}`} />
            </button>
            {selectedMemory === i && (
              <div className="ml-5 mt-1 mb-2 flex gap-2 animate-[fadeIn_0.15s_ease-out]">
                <button
                  onClick={() => {
                    navigator.clipboard?.writeText(item.fullDesc);
                    addToast("Memory entry copied", "success");
                  }}
                  className="flex items-center gap-1 px-2 py-1 bg-canvas text-[10px] text-text-primary rounded-md hover:bg-border transition-colors"
                >
                  <Copy className="w-3 h-3" />
                  Copy
                </button>
                <button
                  onClick={() => addToast(`Opening ${item.title} details...`, "action")}
                  className="flex items-center gap-1 px-2 py-1 bg-[#007aff] text-[10px] text-white rounded-md hover:bg-[#0066d6] transition-colors"
                >
                  <ExternalLink className="w-3 h-3" />
                  Open
                </button>
              </div>
            )}
            {i < memoryTimeline.length - 1 && <div className="h-px bg-border my-2" />}
          </div>
        ))}
      </div>
    </div>
  );
}

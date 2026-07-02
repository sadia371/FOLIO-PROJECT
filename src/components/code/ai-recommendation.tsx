"use client";

import { AlertTriangle, ArrowRight } from "lucide-react";
import { aiRecommendationReasons as reasons, aiRecommendationImpacts as impacts } from "@/lib/mock/code-content";

export function AiRecommendation({ onOpenFile }: { onOpenFile: (file: string) => void }) {
  return (
    <div className="bg-[#28282a] rounded-card w-full">
      <div className="p-3 flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <span className="text-[9px] uppercase tracking-[0.4px] text-white/50 leading-none">
            Recommended Next Action
          </span>
          <span className="text-[9px] font-medium text-white/70 bg-white/10 rounded px-1.5 py-px leading-none">
            92% confidence
          </span>
          <div className="flex-1" />
        </div>

        <div className="flex items-center gap-1.5">
          <span className="text-[12px] text-white/60">Review:</span>
          <button
            onClick={() => onOpenFile("project-context.tsx")}
            className="text-[14px] text-white font-mono hover:text-accent-green transition-colors"
          >
            project-context.tsx
          </button>
        </div>

        <div className="flex gap-8 pt-1">
          <div className="flex flex-col gap-1 flex-1">
            <p className="text-[9px] uppercase tracking-[0.4px] text-white/40 leading-none">Reason</p>
            {reasons.map((r, i) => (
              <div key={i} className="flex items-start gap-1.5 pt-1">
                <AlertTriangle className="w-2.5 h-2.5 text-white/40 mt-px shrink-0" />
                <span className="text-[11px] text-white/70 leading-[16.5px]">{r}</span>
              </div>
            ))}
          </div>

          <div className="flex flex-col gap-1.5">
            <p className="text-[9px] uppercase tracking-[0.4px] text-white/40 leading-none">Potential Impact</p>
            <div className="flex flex-wrap gap-1.5 pt-1.5">
              {impacts.map((tag) => (
                <span
                  key={tag}
                  className="text-[10px] text-white/70 bg-white/8 rounded px-2 py-[3px] leading-none"
                  style={{ background: "rgba(255,255,255,0.08)" }}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="pt-3">
          <button
            onClick={() => onOpenFile("project-context.tsx")}
            className="bg-accent-green text-white text-[11px] font-medium rounded-lg px-3 py-1.5 flex items-center gap-1.5 w-full justify-center hover:bg-accent-green-dim transition-colors"
          >
            Open File
            <ArrowRight className="w-[11px] h-[11px]" strokeWidth={1.5} />
          </button>
        </div>
      </div>
    </div>
  );
}

"use client";

import { useState } from "react";
import { X } from "lucide-react";
import { tagData } from "@/lib/mock/dashboard-content";
import { VelocityDonut } from "./velocity-donut";

export function HeroSection({ onVelocityClick }: { onVelocityClick: () => void }) {
  const [visibleTags, setVisibleTags] = useState([0, 1, 2]);
  const dismissTag = (idx: number) => setVisibleTags((t) => t.filter((i) => i !== idx));

  return (
    <div className="flex flex-col sm:flex-row sm:items-start justify-between w-full gap-4 sm:gap-0">
      <div className="flex flex-col">
        <h1 className="font-medium text-[32px] sm:text-[36px] text-text-primary leading-[1.1]">
          Good morning, Waqas!
        </h1>
        <p className="text-[13px] sm:text-[14px] text-text-secondary mt-1">
          You&apos;re on track to hit Testing by Friday.
        </p>
        <div className="flex flex-wrap items-center gap-2 mt-3">
          {tagData.map((tag, i) =>
            visibleTags.includes(i) ? (
              <div key={i} className={`flex items-center gap-1.5 px-3 h-6 ${tag.bg} rounded-full group shrink-0 whitespace-nowrap`}>
                <div className={`w-1.5 h-1.5 rounded-full ${tag.dot}`} />
                <span className={`text-[11px] ${tag.text}`}>{tag.label}</span>
                <button
                  onClick={() => dismissTag(i)}
                  aria-label={`Dismiss tag: ${tag.label}`}
                  className="w-0 overflow-hidden opacity-0 group-hover:w-3 group-hover:opacity-100 group-hover:ml-1 transition-all duration-200 flex items-center justify-center"
                >
                  <X className="w-3 h-3 text-current opacity-50 hover:opacity-100" />
                </button>
              </div>
            ) : null
          )}
        </div>
      </div>
      <div className="flex items-center sm:flex-col gap-3 sm:gap-1 bg-surface sm:bg-transparent px-3 py-2 sm:p-0 rounded-xl border border-border sm:border-0 self-start sm:self-auto shrink-0 shadow-sm sm:shadow-none">
        <VelocityDonut onClick={onVelocityClick} />
        <div className="flex flex-col sm:items-center">
          <span className="text-[10px] text-text-secondary tracking-[0.04em] uppercase">
            Project Velocity
          </span>
          <span className="text-[10px] text-accent-green font-medium">+5% this week</span>
        </div>
      </div>
    </div>
  );
}

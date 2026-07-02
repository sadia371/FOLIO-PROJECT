"use client";

import { useState } from "react";
import { CheckCircle2, ChevronDown, FileUp } from "lucide-react";

export function RequirementsInput() {
  const [description, setDescription] = useState(
    "A self-serve onboarding flow that lets new B2B customers invite teammates, assign roles, and connect their billing provider before their first project is created."
  );
  const [detail, setDetail] = useState<"Simple" | "Standard" | "Deep">("Standard");
  const [tone, setTone] = useState<"Product" | "Technical">("Technical");

  return (
    <section className="bg-surface border border-border-soft rounded-xl p-4 sm:p-5 mb-6">
      <div className="flex flex-col gap-4">
        <div className="relative bg-surface-container-low border border-border-soft rounded-lg overflow-hidden transition-all focus-within:border-accent-green">
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full h-20 sm:h-28 p-4 bg-transparent border-none focus:ring-0 text-sm resize-none placeholder:text-text-muted"
            placeholder="Describe your feature..."
          />
          <div className="absolute bottom-3 right-3 flex items-center gap-2">
            <button className="px-3 py-1 border border-border-soft rounded-full text-xs text-text-muted hover:bg-surface-container-high transition-all flex items-center gap-1.5">
              <FileUp className="h-3.5 w-3.5" />
              Upload document
            </button>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-x-8 gap-y-3">
          <div className="flex items-center gap-3">
            <span className="font-mono text-[11px] text-text-muted">DETAIL:</span>
            <div className="flex bg-surface-container rounded-full p-0.5 border border-border-soft">
              {(["Simple", "Standard", "Deep"] as const).map((d) => (
                <button
                  key={d}
                  onClick={() => setDetail(d)}
                  className={`px-3 py-1 text-xs rounded-full transition-all ${
                    detail === d
                      ? "font-bold bg-surface text-text-primary shadow-sm"
                      : "text-text-muted hover:text-text-primary"
                  }`}
                >
                  {d}
                </button>
              ))}
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className="font-mono text-[11px] text-text-muted">TONE:</span>
            <div className="flex bg-surface-container rounded-full p-0.5 border border-border-soft">
              {(["Product", "Technical"] as const).map((t) => (
                <button
                  key={t}
                  onClick={() => setTone(t)}
                  className={`px-3 py-1 text-xs rounded-full transition-all ${
                    tone === t
                      ? "font-bold bg-surface text-text-primary shadow-sm"
                      : "text-text-muted hover:text-text-primary"
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className="font-mono text-[11px] text-text-muted">FRAMEWORK:</span>
            <button className="px-3 py-1 bg-surface-container rounded-full border border-border-soft text-xs text-text-primary hover:bg-surface-container-high transition-all flex items-center gap-1.5">
              Agile
              <ChevronDown className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-3 border-t border-border-soft/30">
          <div className="flex flex-wrap items-center gap-2">
            {["PRD", "User Stories", "Edge Cases", "Risk Register"].map((label) => (
              <button
                key={label}
                className="px-3 py-1.5 bg-accent-green/10 text-accent-green rounded-full text-xs font-semibold flex items-center gap-1.5"
              >
                <CheckCircle2 className="h-3.5 w-3.5" />
                {label}
              </button>
            ))}
          </div>
          <button className="w-full sm:w-auto px-6 h-10 bg-[#1d1d1f] text-white rounded-full text-sm font-semibold hover:opacity-90 transition-all">
            Generate
          </button>
        </div>
      </div>
    </section>
  );
}

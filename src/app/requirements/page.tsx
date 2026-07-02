"use client";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { useState, useRef, useEffect } from "react";
/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  ChevronDown,
  Check,
  Bell,
  Search,
  CheckCircle2,
  MessageCircle,
  Plus,
} from "lucide-react";
/* eslint-enable @typescript-eslint/no-unused-vars */
import { useHeaderSlot } from "@/components/layout/header-slot";
import { RequirementsInput } from "@/components/requirements/requirements-input";
import { StatusStrip } from "@/components/requirements/status-strip";
import { RequirementTabBar, type RequirementTab } from "@/components/requirements/requirement-tab-bar";
import { CoverageInsights } from "@/components/requirements/coverage-insights";
import { PrdPanel } from "@/components/requirements/prd-panel";
import { UserStoriesPanel } from "@/components/requirements/user-stories-panel";
import { EdgeCasesPanel } from "@/components/requirements/edge-cases-panel";
import { RisksPanel } from "@/components/requirements/risks-panel";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { projectSwitcherNames as projects } from "@/lib/mock/projects";

interface Toast {
  id: number;
  message: string;
  type: "success" | "info" | "action";
}

let toastId = 0;

export default function RequirementsPage() {
  const [tab, setTab] = useState<RequirementTab>("stories");
  // Toast system
  const [toasts, setToasts] = useState<Toast[]>([]);
  const addToast = (message: string, type: Toast["type"] = "info") => {
    const id = ++toastId;
    setToasts((t) => [...t, { id, message, type }]);
    setTimeout(() => setToasts((t) => t.filter((x) => x.id !== id)), 3000);
  };

  const panels: Record<RequirementTab, React.ReactNode> = {
    prd: <PrdPanel />,
    stories: <UserStoriesPanel />,
    edge_cases: <EdgeCasesPanel />,
    risks: <RisksPanel />,
  };

  useHeaderSlot(
    () => (
      <div className="flex items-center gap-1.5 ml-auto">
        <button className="flex items-center gap-1.5 p-1.5 rounded-md hover:bg-border/30 transition-colors flex-shrink-0">
          <Search className="w-3.5 h-3.5 text-text-secondary" />
        </button>

        <button className="flex items-center gap-1.5 p-1.5 rounded-md hover:bg-border/30 transition-colors relative flex-shrink-0">
          <Bell className="w-3.5 h-3.5 text-text-secondary" />
          <span className="absolute -top-0.5 -right-0.5 w-3.5 h-3.5 bg-status-danger rounded-full text-[8px] text-white flex items-center justify-center font-bold">
            3
          </span>
        </button>
      </div>
    ),
    []
  );

  return (
    <>
      {/* Toast notifications */}
      <div className="fixed top-4 right-4 z-[100] flex flex-col gap-2 max-w-[calc(100vw-2rem)]">
        {toasts.map((t) => (
          <div
            key={t.id}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-[12px] font-medium shadow-lg animate-[slideIn_0.2s_ease-out] ${
              t.type === "success"
                ? "bg-status-success text-white"
                : t.type === "action"
                ? "bg-[#007aff] text-white"
                : "bg-[#1d1d1f] text-white"
            }`}
          >
            {t.type === "success" ? (
              <CheckCircle2 className="w-3.5 h-3.5 flex-shrink-0" />
            ) : t.type === "action" ? (
              <MessageCircle className="w-3.5 h-3.5 flex-shrink-0" />
            ) : (
              <Bell className="w-3.5 h-3.5 flex-shrink-0" />
            )}
            <span className="truncate">{t.message}</span>
          </div>
        ))}
      </div>

      {/* Scrollable body */}
      <div className="relative overflow-x-hidden">
          <div className="flex flex-col gap-3.5 px-3 sm:px-5 pt-4 sm:pt-5 pb-8 min-w-0 max-w-[1200px] mx-auto">
            {/* Hero Section */}
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between w-full gap-3">
              <div className="flex flex-col min-w-0">
                <h1 className="font-medium text-2xl sm:text-[32px] text-text-primary leading-[1.1]">
                  Requirements Intelligence
                </h1>
                <p className="text-[13px] text-text-secondary mt-2 max-w-2xl">
                  Generate PRDs, user stories, edge cases, and risk registers from a plain-English
                  description using our fine-tuned reasoning models.
                </p>
              </div>
              <button className="self-start sm:self-auto flex-shrink-0 px-4 sm:px-5 h-10 bg-[#1d1d1f] text-white rounded-full text-sm font-semibold hover:opacity-90 transition-all flex items-center gap-2">
                <Plus className="h-4 w-4" />
                <span className="whitespace-nowrap">New Requirement Set</span>
              </button>
            </div>

            {/* Input Card */}
            <RequirementsInput />

            {/* Status Strip */}
            <StatusStrip />

            {/* Tab Bar */}
            <RequirementTabBar active={tab} onChange={setTab} />

            {/* Content area: tab panel + copilot LEFT, insights RIGHT */}
            <div className="flex flex-col lg:flex-row gap-3 min-w-0">
              {/* LEFT COLUMN: Tab content */}
              <div className="flex-1 flex flex-col gap-3 min-w-0">
                {/* Tab panel */}
                <div className="min-w-0 w-full">{panels[tab]}</div>
              </div>

              {/* RIGHT COLUMN: Coverage Insights + AI Copilot */}
              <div className="w-full lg:w-[320px] shrink-0 flex flex-col gap-3">
                <CoverageInsights />

              </div>
            </div>

            {/* Footer */}
            <div className="flex flex-col sm:flex-row items-center sm:justify-between gap-2 pt-1">
              <span className="text-[11px] text-text-secondary">© 2026</span>
              <div className="flex flex-wrap justify-center sm:justify-end gap-3">
                {["Privacy", "Terms", "API Status", "Changelog"].map((link) => (
                  <button
                    key={link}
                    onClick={() => addToast(`Opening ${link}...`, "info")}
                    className="text-[11px] text-text-secondary hover:text-text-primary transition-colors"
                  >
                    {link}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

      <style jsx global>{`
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateX(20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-4px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </>
  );
}

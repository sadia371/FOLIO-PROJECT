"use client";

export type RequirementTab = "prd" | "stories" | "edge_cases" | "risks";

interface RequirementTabBarProps {
  active: RequirementTab;
  onChange: (tab: RequirementTab) => void;
}

const tabs: { key: RequirementTab; label: string; count: number }[] = [
  { key: "prd", label: "PRD", count: 0 },
  { key: "stories", label: "User Stories", count: 12 },
  { key: "edge_cases", label: "Edge Cases", count: 7 },
  { key: "risks", label: "Risk Register", count: 5 },
];

export function RequirementTabBar({ active, onChange }: RequirementTabBarProps) {
  return (
    <div className="flex gap-1.5 p-1 bg-surface-container border border-border-soft rounded-full max-w-full overflow-x-auto scrollbar-hide mb-6 whitespace-nowrap">
      {tabs.map((tab) => (
        <button
          key={tab.key}
          onClick={() => onChange(tab.key)}
          className={`px-5 py-2 rounded-full text-sm transition-all ${
            active === tab.key
              ? "font-bold bg-surface text-accent-green border border-border-soft shadow-sm"
              : "text-text-muted hover:text-text-primary"
          }`}
        >
          {tab.label}
          {tab.count > 0 && ` (${tab.count})`}
        </button>
      ))}
    </div>
  );
}

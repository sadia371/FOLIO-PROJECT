"use client";

export type TabName = "Overview" | "Monitoring";

const tabs: TabName[] = ["Overview", "Monitoring"];

export function DeploymentTabs({
  active,
  setActive,
}: {
  active: TabName;
  setActive: (tab: TabName) => void;
}) {
  return (
    <div className="flex justify-end p-1">

      <div className="inline-flex rounded-control border border-border bg-canvas p-[3px]">

        {tabs.map((tab) => {
          const isActive = active === tab;

          return (
            <button
              key={tab}
              onClick={() => setActive(tab)}
              className={`px-3 py-1 text-xs rounded-md transition ${
                isActive
                  ? "bg-accent text-white font-medium"
                  : "text-text-secondary hover:text-text-primary"
              }`}
            >
              {tab}
            </button>
          );
        })}

      </div>

    </div>
  );
}

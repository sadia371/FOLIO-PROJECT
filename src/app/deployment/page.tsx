"use client";

import { useState } from "react";

import { DeploymentHero } from "@/components/deployment/deployment-hero";
import {
  DeploymentTabs,
  type TabName,
} from "@/components/deployment/deployment-tabs";
import { OverviewPanel } from "@/components/deployment/overview-panel";
import { MonitoringPanel } from "@/components/deployment/monitoring-panel";

export default function DeploymentPage() {
  const [activeTab, setActiveTab] = useState<TabName>("Overview");

  return (
    <div className="space-y-6 p-4 lg:p-6 pb-10 max-w-[1200px] mx-auto w-full">

      <DeploymentHero />

      {/* HEADER */}
      <div className="rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 shadow-sm p-5">

        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">

          <div>
            <h2 className="text-xl font-semibold text-slate-900 dark:text-white">
              Deployment Dashboard
            </h2>
            <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
              Infrastructure, CI/CD and monitoring in one place.
            </p>
          </div>

          <DeploymentTabs active={activeTab} setActive={setActiveTab} />

        </div>
      </div>

      <div className="pt-1">
        {activeTab === "Overview" ? <OverviewPanel /> : <MonitoringPanel />}
      </div>

    </div>
  );
}


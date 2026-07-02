"use client";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { useState, useRef, useEffect } from "react";
import { useHeaderSlot } from "@/components/layout/header-slot";
import { useToasts } from "@/components/shared/use-toasts";
import { ToastStack } from "@/components/shared/toast-stack";
import { DashboardHeaderControls } from "@/components/dashboard/dashboard-header-controls";
import { HeroSection } from "@/components/dashboard/hero-section";
import { TodayScheduleCard } from "@/components/dashboard/today-schedule-card";
import { ActionRequiredCard } from "@/components/dashboard/action-required-card";
import { ActivityCard } from "@/components/dashboard/activity-card";
import { SprintIntelligenceCard } from "@/components/dashboard/sprint-intelligence-card";
import { QuickNotesCard } from "@/components/dashboard/quick-notes-card";
import dynamic from "next/dynamic";

const VelocityModal = dynamic(() => import("@/components/dashboard/velocity-modal").then(mod => mod.VelocityModal), {
  ssr: false,
});
const ProjectMemoryCard = dynamic(() => import("@/components/dashboard/project-memory-card").then(mod => mod.ProjectMemoryCard), {
  ssr: false,
});
const DashboardFooter = dynamic(() => import("@/components/dashboard/dashboard-footer").then(mod => mod.DashboardFooter), {
  ssr: false,
});

export default function DashboardPage() {
  const [showVelocityModal, setShowVelocityModal] = useState(false);
  const { toasts, addToast } = useToasts();

  useHeaderSlot(
    () => <DashboardHeaderControls />,
    []
  );

  return (
    <>
      <ToastStack toasts={toasts} />

      <div className="relative overflow-x-hidden">
        <div className="flex flex-col gap-3.5 px-5 pt-5 pb-8 min-w-0 max-w-[1200px] mx-auto">
          <HeroSection onVelocityClick={() => setShowVelocityModal(true)} />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
            <div className="lg:col-span-2 flex flex-col sm:flex-row bg-surface border border-border rounded-card overflow-hidden">
              <TodayScheduleCard addToast={addToast} />
              <ActionRequiredCard addToast={addToast} />
            </div>
            <ActivityCard addToast={addToast} />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <SprintIntelligenceCard addToast={addToast} />
            <QuickNotesCard addToast={addToast} />
          </div>

          <ProjectMemoryCard addToast={addToast} />
          <DashboardFooter addToast={addToast} />
        </div>
      </div>

      <VelocityModal open={showVelocityModal} onClose={() => setShowVelocityModal(false)} addToast={addToast} />

      <style jsx global>{`
        @keyframes slideIn {
          from { opacity: 0; transform: translateX(20px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-4px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </>
  );
}

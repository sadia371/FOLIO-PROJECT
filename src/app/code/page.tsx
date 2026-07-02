"use client";

import { useState, useCallback } from "react";
import { useHeaderSlot } from "@/components/layout/header-slot";
import { useToasts } from "@/components/shared/use-toasts";
import { ToastStack } from "@/components/shared/toast-stack";
import { CodeHeaderControls } from "@/components/code/code-header-controls";
import { RepositoryPulse } from "@/components/code/repository-pulse";
import { AiRecommendation } from "@/components/code/ai-recommendation";
import { RepositoryGraph } from "@/components/code/repository-graph";
import { FileDetailPanel } from "@/components/code/file-detail-panel";
import { ReviewQueue } from "@/components/code/review-queue";
import { Blockers } from "@/components/code/blockers";
import { IssueRelationship } from "@/components/code/issue-relationship";
import { OwnershipIntelligence } from "@/components/code/ownership-intelligence";
import { CodeFooter } from "@/components/code/code-footer";

export default function CodePage() {
  const [selectedFile, setSelectedFile] = useState<string | null>(null);
  const [lastRefresh, setLastRefresh] = useState("just now");

  const { toasts, addToast } = useToasts();

  const handleRefresh = useCallback(() => {
    setLastRefresh("just now");
    addToast("Repository data refreshed", "success");
  }, [addToast]);

  const handleOpenFile = useCallback(
    (file: string) => {
      setSelectedFile(file);
      addToast(`Opening ${file}...`, "action");
    },
    [addToast]
  );

  const handleStatClick = useCallback(
    (label: string) => {
      addToast(`Viewing ${label} details`, "info");
    },
    [addToast]
  );

  const handleBlockerAction = useCallback(
    (action: string) => {
      if (action === "View in Jira") {
        addToast("Opening Jira board...", "action");
      } else {
        addToast(`Action: ${action}`, "info");
      }
    },
    [addToast]
  );

  const handleModuleClick = useCallback(
    (module: string) => {
      addToast(`Viewing ${module} ownership details`, "info");
    },
    [addToast]
  );

  useHeaderSlot(
    () => <CodeHeaderControls onRefresh={handleRefresh} lastRefresh={lastRefresh} />,
    [handleRefresh, lastRefresh]
  );

  return (
    <>
      <ToastStack toasts={toasts} />

      <div className="flex flex-col gap-4 p-4 lg:p-6 max-w-[1200px] mx-auto">
        <RepositoryPulse onStatClick={handleStatClick} />

        <AiRecommendation onOpenFile={handleOpenFile} />

        <div className="flex gap-4 items-stretch flex-wrap lg:flex-nowrap">
          <RepositoryGraph onFileClick={handleOpenFile} />
          <FileDetailPanel selectedFile={selectedFile} onClose={() => setSelectedFile(null)} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <ReviewQueue onItemClick={handleOpenFile} />
          <Blockers onAction={handleBlockerAction} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <IssueRelationship onFileClick={handleOpenFile} />
          <OwnershipIntelligence onModuleClick={handleModuleClick} />
        </div>

        <CodeFooter />
      </div>

      <style jsx global>{`
        @keyframes slideIn {
          from { opacity: 0; transform: translateX(20px); }
          to { opacity: 1; transform: translateX(0); }
        }
      `}</style>
    </>
  );
}

"use client";

import { ReactNode, useState } from "react";
import { Copy, RefreshCw, Save } from "lucide-react";
import { useProject } from "@/context/project-context";
import { simulateGeneration } from "@/lib/simulate-ai";
import { ModuleResponse, SDLCPhase, PHASE_LABELS } from "@/types";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { OutputTabs } from "./output-tabs";

interface ModuleShellProps {
  phase: SDLCPhase;
  title: string;
  description: string;
  contextSummary: string;
  inputPanel: ReactNode;
  getResponse: () => ModuleResponse;
  generateLabel?: string;
  initialResponse?: ModuleResponse;
}

export function ModuleShell({
  phase,
  title,
  description,
  contextSummary,
  inputPanel,
  getResponse,
  generateLabel = "Generate",
  initialResponse,
}: ModuleShellProps) {
  const { addMemoryEntry } = useProject();
  const [loading, setLoading] = useState(false);
  const [tabs, setTabs] = useState<ModuleResponse["tabs"]>(initialResponse?.tabs ?? []);
  const [lastResponse, setLastResponse] = useState<ModuleResponse | null>(
    initialResponse ?? null
  );
  const [copied, setCopied] = useState(false);

  const handleGenerate = async () => {
    setLoading(true);
    setTabs([]);
    const response = await simulateGeneration(getResponse());
    setTabs(response.tabs);
    setLastResponse(response);
    setLoading(false);
  };

  const handleSave = () => {
    if (!lastResponse) return;
    addMemoryEntry({
      phase,
      type: "ai_response",
      title: lastResponse.memoryTitle,
      summary: lastResponse.memorySummary,
      icon: phase === "code" ? "shield" : phase === "architecture" ? "database" : "code",
    });
  };

  const handleCopy = async () => {
    if (!lastResponse) return;
    const text = lastResponse.tabs.map((t) => `## ${t.label}\n${t.content}`).join("\n\n");
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-4 animate-in fade-in duration-150">
      <div>
        <h1 className="text-2xl font-semibold">{title}</h1>
        <p className="text-sm text-muted mt-1">{description}</p>
      </div>

      <Card className="border-accent/30 bg-accent/5 px-4 py-3">
        <p className="text-xs font-semibold uppercase tracking-wide text-accent mb-1">
          Context Chain — {PHASE_LABELS[phase]}
        </p>
        <p className="text-sm text-text-primary">{contextSummary}</p>
      </Card>

      <div className="grid gap-4 lg:grid-cols-5">
        <Card className="lg:col-span-2 p-4">
          <h2 className="text-sm font-semibold mb-3">Input</h2>
          {inputPanel}
          <Button
            className="mt-4 w-full"
            onClick={handleGenerate}
            disabled={loading}
          >
            {loading ? "Generating..." : generateLabel}
          </Button>
        </Card>

        <Card className="lg:col-span-3 p-4">
          <h2 className="text-sm font-semibold mb-3">Output</h2>
          <OutputTabs tabs={tabs} loading={loading} />
        </Card>
      </div>

      <div className="flex flex-wrap gap-2 border-t border-border pt-4">
        <Button
          variant="outline"
          size="sm"
          onClick={handleCopy}
          disabled={!lastResponse}
        >
          <Copy className="h-3.5 w-3.5" />
          {copied ? "Copied!" : "Copy"}
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={handleSave}
          disabled={!lastResponse}
        >
          <Save className="h-3.5 w-3.5" />
          Save to Memory
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={handleGenerate}
          disabled={loading}
        >
          <RefreshCw className="h-3.5 w-3.5" />
          Regenerate
        </Button>
      </div>
    </div>
  );
}

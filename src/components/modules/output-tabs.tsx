"use client";

import { useEffect, useRef, useState } from "react";
import { ModuleTab } from "@/types";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Skeleton } from "@/components/ui/skeleton";
import { MarkdownContent } from "@/components/ui/markdown-content";

let mermaidInitialized = false;

function MermaidDiagram({ chart }: { chart: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [svg, setSvg] = useState("");

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const { default: mermaid } = await import("mermaid");
      if (!mermaidInitialized) {
        mermaid.initialize({ startOnLoad: false, theme: "neutral", securityLevel: "loose" });
        mermaidInitialized = true;
      }
      const id = `mermaid-${Math.random().toString(36).slice(2)}`;
      const { svg: rendered } = await mermaid.render(id, chart);
      if (!cancelled) setSvg(rendered);
    })();
    return () => {
      cancelled = true;
    };
  }, [chart]);

  return (
    <div
      ref={ref}
      className="overflow-x-auto rounded-card border border-border bg-canvas p-4"
      dangerouslySetInnerHTML={{ __html: svg }}
    />
  );
}

function TabContent({ tab }: { tab: ModuleTab }) {
  if (tab.id === "diagram" && tab.content.startsWith("MERMAID:")) {
    const chart = tab.content.replace("MERMAID:", "");
    return <MermaidDiagram chart={chart} />;
  }

  if (tab.isCode) {
    return (
      <pre className="overflow-x-auto rounded-card border border-border bg-canvas p-4 text-xs font-mono leading-relaxed">
        <code>{tab.content}</code>
      </pre>
    );
  }

  return <MarkdownContent content={tab.content} className="max-w-none" />;
}

export function OutputTabs({
  tabs,
  loading,
}: {
  tabs: ModuleTab[];
  loading?: boolean;
}) {
  if (loading) {
    return (
      <div className="space-y-3 p-4">
        <Skeleton className="h-8 w-full" />
        <Skeleton className="h-4 w-3/4" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-5/6" />
        <Skeleton className="h-32 w-full" />
      </div>
    );
  }

  if (tabs.length === 0) {
    return (
      <div className="flex h-full items-center justify-center p-8 text-sm text-muted">
        Click Generate to see AI output here.
      </div>
    );
  }

  return (
    <Tabs defaultValue={tabs[0].id} className="h-full">
      <TabsList>
        {tabs.map((tab) => (
          <TabsTrigger key={tab.id} value={tab.id}>
            {tab.label}
          </TabsTrigger>
        ))}
      </TabsList>
      {tabs.map((tab) => (
        <TabsContent key={tab.id} value={tab.id} className="max-h-[60vh] overflow-y-auto">
          <TabContent tab={tab} />
        </TabsContent>
      ))}
    </Tabs>
  );
}

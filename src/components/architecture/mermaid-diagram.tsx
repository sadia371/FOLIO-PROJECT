"use client";

import { useEffect, useRef, useState } from "react";
import type { Mermaid } from "mermaid";

const diagramDefinition = `graph LR
    subgraph Frontend
        C[Customer App]
        R[Restaurant Dashboard]
        D[Delivery App]
        A[Admin Panel]
    end

    subgraph Backend
        API[Application Server]
        AUTH[Authentication Service]
        ORDER[Order Management Service]
    end

    subgraph Data
        DB[(MySQL Database)]
    end

    subgraph External Services
        PAY[Payment Gateway]
        MAP[Google Maps API]
        MSG[Push Notification Service]
    end

    C --> API
    R --> API
    D --> API
    A --> API

    API --> AUTH
    API --> ORDER

    AUTH --> DB
    ORDER --> DB

    ORDER --> PAY
    ORDER --> MAP
    ORDER --> MSG

    classDef frontend fill:#e8f5e9,stroke:#3d8b5e,color:#1a1a2e
    classDef backend fill:#e3f2fd,stroke:#5b8def,color:#1a1a2e
    classDef data fill:#fff3e0,stroke:#e89c3a,color:#1a1a2e
    classDef external fill:#f3e5f5,stroke:#9c27b0,color:#1a1a2e

    class C,R,D,A frontend
    class API,AUTH,ORDER backend
    class DB data
    class PAY,MAP,MSG external`;

let diagramCounter = 0;

let initialized = false;
function ensureInitialized(mermaid: Mermaid) {
  if (initialized) return;
  mermaid.initialize({
    startOnLoad: false,
    theme: "base",
    themeVariables: {
      primaryColor: "#e3f2fd",
      primaryBorderColor: "#5b8def",
      primaryTextColor: "#1a1a2e",
      lineColor: "#5b8def",
      secondaryColor: "#e8f5e9",
      tertiaryColor: "#fff3e0",
      fontFamily: "Inter, sans-serif",
      fontSize: "14px",
    },
    flowchart: {
      curve: "basis",
      padding: 12,
      htmlLabels: true,
      nodeSpacing: 20,
      rankSpacing: 50,
    },
  });
  initialized = true;
}

export function MermaidDiagram() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [svg, setSvg] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    let cancelled = false;
    const render = async () => {
      try {
        const { default: mermaid } = await import("mermaid");
        ensureInitialized(mermaid);
        diagramCounter += 1;
        const id = `arch-diagram-${diagramCounter}`;
        const { svg: rendered } = await mermaid.render(id, diagramDefinition);
        if (!cancelled) {
          const cleaned = rendered.replace(
            /<svg([^>]*)>/,
            (match, attrs) => {
              const cleanedAttrs = attrs
                .replace(/\s*width="[^"]*"/g, '')
                .replace(/\s*height="[^"]*"/g, '');
              return `<svg${cleanedAttrs} style="width:100%;height:auto">`;
            }
          );
          setSvg(cleaned);
          setLoading(false);
        }
      } catch (e) {
        if (!cancelled) {
          setError(e instanceof Error ? e.message : String(e));
          setLoading(false);
        }
      }
    };
    render();
    return () => { cancelled = true; };
  }, []);

  return (
    <div className="rounded-xl border border-border-soft bg-surface p-4">
      <div className="mb-3 flex items-center justify-between">
        <h3 className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-text-muted">
          System Architecture
        </h3>
        <span className="text-[10px] text-text-muted">Live Diagram</span>
      </div>
      <div
        ref={containerRef}
        className="flex items-center justify-center overflow-auto rounded-lg bg-white/60"
      >
        {loading ? (
          <div className="flex flex-col items-center gap-2 text-text-muted">
            <div className="h-6 w-6 animate-spin rounded-full border-2 border-accent-green border-t-transparent" />
            <span className="text-[11px]">Rendering diagram...</span>
          </div>
        ) : error ? (
          <div className="flex flex-col items-center gap-1 text-center">
            <span className="text-[11px] text-red-500">Failed to render diagram</span>
            <span className="max-w-[200px] text-[9px] text-text-muted">{error}</span>
          </div>
        ) : svg ? (
          <div
            className="w-full [&>svg]:!block [&>svg]:!w-full [&>svg]:!h-auto"
            dangerouslySetInnerHTML={{ __html: svg }}
          />
        ) : null}
      </div>
    </div>
  );
}

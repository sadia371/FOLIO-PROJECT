"use client";

import { useState } from "react";
import { Check, Database, GitBranch, Network, Server, Timer } from "lucide-react";
import { useProject, usePhaseHours } from "@/context/project-context";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const stackDetails = {
  language: { label: "Language", color: "bg-phase-code/15 text-phase-code" },
  framework: { label: "Framework", color: "bg-phase-architecture/15 text-phase-architecture" },
  database: { label: "Database", color: "bg-phase-testing/15 text-phase-testing" },
};

interface ModuleItem {
  id: string;
  label: string;
  done: boolean;
  detail: string;
}

const defaultModules: ModuleItem[] = [
  { id: "auth", label: "Auth Module", done: true, detail: "JWT + refresh tokens + role guards" },
  { id: "order-api", label: "Order API", done: true, detail: "2/5 endpoints — create + list" },
  { id: "restaurant-api", label: "Restaurant API", done: false, detail: "Menu management pending" },
  { id: "payment", label: "Payment Flow", done: false, detail: "Stripe sandbox not yet wired" },
  { id: "realtime", label: "Real-time Tracking", done: false, detail: "Polling fallback ready, WebSocket v2" },
];

export function ArchitectureStatsCard() {
  const { currentProject } = useProject();
  const phaseHours = usePhaseHours();
  const [modules, setModules] = useState<ModuleItem[]>(defaultModules);
  const stack = currentProject.stackContext;
  const totalPhaseHours = Object.values(phaseHours).reduce((sum, value) => sum + value, 0);
  const completedCount = modules.filter((m) => m.done).length;

  const toggleModule = (id: string) => {
    setModules((prev) =>
      prev.map((m) => (m.id === id ? { ...m, done: !m.done } : m))
    );
  };

  const stats = [
    {
      label: "Core Services",
      value: "4",
      detail: "Auth, Orders, Restaurants, Payments",
      icon: Server,
    },
    {
      label: "API Endpoints",
      value: "14",
      detail: "v1 REST routes defined",
      icon: Network,
    },
    {
      label: "DB Entities",
      value: "5",
      detail: "users, restaurants, menu_items, orders, order_items",
      icon: Database,
    },
    {
      label: "Hours Logged",
      value: `${totalPhaseHours.toFixed(1)}h`,
      detail: "Across all SDLC phases",
      icon: Timer,
    },
  ];

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle className="normal-case tracking-normal">Current Architecture Snapshot</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
            {stats.map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.label} className="rounded-card border border-border bg-canvas/35 p-3">
                  <p className="mb-2 flex items-center gap-2 text-xs font-medium uppercase tracking-wide text-muted">
                    <Icon className="h-3.5 w-3.5" />
                    {item.label}
                  </p>
                  <p className="text-xl font-semibold text-text-primary">{item.value}</p>
                  <p className="mt-1 text-xs text-muted">{item.detail}</p>
                </div>
              );
            })}
          </div>

          {stack && (
            <div className="rounded-card border border-border bg-canvas/35 p-3">
              <p className="mb-2 flex items-center gap-2 text-xs font-medium uppercase tracking-wide text-muted">
                <GitBranch className="h-3.5 w-3.5" />
                Active Stack
              </p>
              <div className="flex flex-wrap gap-2">
                {(["language", "framework", "database"] as const).map((key) => (
                  <Badge key={key} className={cn("border-0", stackDetails[key].color)}>
                    {stackDetails[key].label}: {stack[key]}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          <div className="rounded-card border border-border bg-canvas/35 p-3">
            <div className="mb-3 flex items-center justify-between">
              <p className="text-xs font-medium uppercase tracking-wide text-muted">
                Module Build Progress
              </p>
              <Badge variant="default" className="text-[10px]">
                {completedCount}/{modules.length} done
              </Badge>
            </div>
            <div className="space-y-2">
              {modules.map((mod) => (
                <div
                  key={mod.id}
                  className="flex items-center justify-between gap-2 rounded-badge px-2 py-1.5 transition-colors duration-150 hover:bg-surface"
                >
                  <div className="flex items-center gap-2">
                    <span
                      className={cn(
                        "h-2 w-2 rounded-full",
                        mod.done ? "bg-phase-testing" : "bg-border"
                      )}
                    />
                    <span className={cn("text-sm", mod.done && "text-muted line-through")}>
                      {mod.label}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-muted">{mod.detail}</span>
                    {!mod.done ? (
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-6 px-2 text-[11px]"
                        onClick={() => toggleModule(mod.id)}
                      >
                        <Check className="h-3 w-3" />
                        Mark done
                      </Button>
                    ) : (
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-6 px-2 text-[11px] text-muted"
                        onClick={() => toggleModule(mod.id)}
                      >
                        Undo
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

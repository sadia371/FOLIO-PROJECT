"use client";

import { useState } from "react";
import {
  ArrowRight,
  Cloud,
  Database,
  Globe,
  Layers,
  ShieldCheck,
  Sparkles,
  Users,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const tabs = [
  "System Context",
  "Containers",
  "Components",
  "Data Flow",
];

/* ── Tab 0: System Context ── */
const actors = [
  {
    icon: Users,
    title: "Students / Customers",
    description: "Browse restaurants, place orders, track delivery in real-time",
    type: "Primary User",
  },
  {
    icon: ShieldCheck,
    title: "Restaurant Owners",
    description: "Manage menus, view incoming orders, update preparation status",
    type: "Primary User",
  },
  {
    icon: Globe,
    title: "Payment Gateway",
    description: "Stripe API for payment processing, refunds, and webhook events",
    type: "External System",
  },
  {
    icon: Cloud,
    title: "Cloud Infrastructure",
    description: "AWS ECS for compute, RDS for PostgreSQL, S3 for backups",
    type: "External System",
  },
];

const contextBadges = [
  { label: "System Boundary", value: "NestJS API + Next.js Frontend" },
  { label: "Trust Level", value: "JWT-authenticated, role-based" },
  { label: "Data Ownership", value: "University-hosted, GDPR-aware" },
];

/* ── Tab 1: Containers ── */
const containers = [
  { label: "Entry Point", title: "API Gateway", icon: Globe, verified: true },
  { label: "Microservice", title: "Auth Service", icon: ShieldCheck, verified: true },
  { label: "Persistence", title: "Primary Database", icon: Database, verified: true },
];

const containerBadges = [
  { label: "Primary Protocol", value: "HTTPS / JSON REST" },
  { label: "Auth Mechanism", value: "JWT / OAuth 2.0" },
  { label: "Backup Strategy", value: "Daily Snapshots (AWS S3)" },
];

/* ── Tab 2: Components ── */
const components = [
  {
    title: "Auth Module",
    description: "JWT + refresh tokens, role guards, session management",
    status: "implemented",
    endpoints: 4,
  },
  {
    title: "Order Module",
    description: "Create, track, update order lifecycle with status machine",
    status: "partial",
    endpoints: 4,
  },
  {
    title: "Restaurant Module",
    description: "Menu management, restaurant CRUD, availability toggles",
    status: "planned",
    endpoints: 3,
  },
  {
    title: "Payment Module",
    description: "Stripe intent creation, webhook handler, refund flow",
    status: "planned",
    endpoints: 2,
  },
  {
    title: "Real-time Module",
    description: "Socket.io gateway for live order tracking, driver location",
    status: "planned",
    endpoints: 1,
  },
];

const statusStyles: Record<string, string> = {
  implemented: "bg-accent-green-light text-accent-green",
  partial: "bg-amber-50 text-amber-700",
  planned: "bg-surface-container text-text-muted",
};

const statusLabels: Record<string, string> = {
  implemented: "Implemented",
  partial: "Partial",
  planned: "Planned",
};

/* ── Tab 3: Data Flow ── */
const flows = [
  {
    step: "01",
    title: "Order Placement",
    from: "Student App",
    to: "API Gateway",
    description: "HTTPS request with JWT token, validated by auth middleware",
    protocol: "REST / JSON",
  },
  {
    step: "02",
    title: "Auth Verification",
    from: "API Gateway",
    to: "Auth Module",
    description: "Token validated, role extracted, request context enriched",
    protocol: "Internal",
  },
  {
    step: "03",
    title: "Order Persistence",
    from: "Order Module",
    to: "PostgreSQL",
    description: "ACID transaction: create order + order_items, deduct inventory",
    protocol: "Prisma ORM",
  },
  {
    step: "04",
    title: "Payment Processing",
    from: "Payment Module",
    to: "Stripe API",
    description: "Create payment intent, await confirmation, handle webhook",
    protocol: "HTTPS / Webhook",
  },
  {
    step: "05",
    title: "Real-time Update",
    from: "Order Module",
    to: "Socket.io",
    description: "Broadcast status change to connected client(s)",
    protocol: "WebSocket",
  },
];

export function ArchitectureExplorer() {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <Card className="overflow-hidden border-border-soft bg-surface">
      {/* Tabs */}
      <div className="border-b border-border-soft px-5">
        <div className="flex gap-6 overflow-x-auto scrollbar-hide">
          {tabs.map((tab, i) => (
            <button
              key={tab}
              onClick={() => setActiveTab(i)}
              className={cn(
                "whitespace-nowrap py-3 text-xs transition-colors",
                activeTab === i
                  ? "border-b-2 border-accent-green font-bold text-text-primary"
                  : "border-b-2 border-transparent font-medium text-text-muted hover:text-text-primary"
              )}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Tab 0: System Context */}
      {activeTab === 0 && (
        <CardContent className="p-5 md:p-6">
          <div className="overflow-x-auto scrollbar-hide">
            <div className="min-w-[600px] space-y-4">
              <div className="grid gap-3 sm:grid-cols-2">
                {actors.map((actor) => {
                  const Icon = actor.icon;
                  return (
                    <div
                      key={actor.title}
                      className="flex items-start gap-3 rounded-lg border border-border-soft bg-surface p-3 transition-colors hover:border-accent-green/40"
                    >
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-accent-green-light">
                        <Icon className="h-4 w-4 text-accent-green" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="mb-0.5 flex items-center gap-1.5">
                          <h4 className="text-xs font-bold text-text-primary">{actor.title}</h4>
                          <Badge className="shrink-0 border-0 bg-surface-container-low text-[8px] text-text-muted">
                            {actor.type}
                          </Badge>
                        </div>
                        <p className="text-[11px] leading-relaxed text-text-muted">{actor.description}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
              <div className="flex min-w-[600px] justify-center gap-3">
                {contextBadges.map((b) => (
                  <div
                    key={b.label}
                    className="flex flex-1 flex-col items-center justify-center rounded-lg border border-border-soft bg-surface-container-low/50 p-3 text-center"
                  >
                    <span className="mb-0.5 block font-mono text-[9px] uppercase tracking-widest text-text-muted">
                      {b.label}
                    </span>
                    <span className="text-xs font-medium text-text-primary">{b.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      )}

      {/* Tab 1: Containers */}
      {activeTab === 1 && (
        <CardContent className="p-6 md:p-8">
          <div className="overflow-x-auto scrollbar-hide">
            <div className="min-w-[700px] space-y-5">
              <div className="flex items-center justify-center gap-5 py-6 md:gap-8">
                {containers.map((item, i) => {
                  const Icon = item.icon;
                  return (
                    <div key={item.title} className="flex items-center gap-4 md:gap-5">
                      <div className="flex w-48 flex-col items-center gap-2.5 rounded-xl border border-border-soft bg-surface p-4 transition-colors hover:border-accent-green/40">
                        <Icon className="h-7 w-7 text-text-muted/40" />
                        <div className="text-center">
                          <span className="mb-0.5 block font-mono text-[9px] uppercase tracking-widest text-text-muted">
                            {item.label}
                          </span>
                          <h4 className="text-xs font-bold text-text-primary">{item.title}</h4>
                        </div>
                        {item.verified && (
                          <span className="flex items-center gap-1 rounded-full bg-accent-green-light px-2 py-0.5 text-[9px] font-bold text-accent-green">
                            <Sparkles className="h-2 w-2" />
                            AI VERIFIED
                          </span>
                        )}
                      </div>
                      {i < containers.length - 1 && (
                        <ArrowRight className="h-4 w-4 shrink-0 text-border" />
                      )}
                    </div>
                  );
                })}
              </div>
              <div className="flex min-w-[700px] justify-center gap-4">
                {containerBadges.map((b) => (
                  <div
                    key={b.label}
                    className="flex w-48 flex-col items-center justify-center rounded-lg border border-border-soft bg-surface-container-low/50 p-4 text-center"
                  >
                    <span className="mb-0.5 block font-mono text-[9px] uppercase tracking-widest text-text-muted">
                      {b.label}
                    </span>
                    <span className="text-xs font-medium text-text-primary">{b.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      )}

      {/* Tab 2: Components */}
      {activeTab === 2 && (
        <CardContent className="p-5 md:p-6">
          <div className="space-y-2">
            {components.map((comp) => (
              <div
                key={comp.title}
                className="flex items-center justify-between rounded-lg border border-border-soft bg-surface px-3 py-2.5 transition-colors hover:border-accent-green/40"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-7 w-7 items-center justify-center rounded-md bg-surface-container-low">
                    <Layers className="h-3.5 w-3.5 text-text-muted/50" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-text-primary">{comp.title}</h4>
                    <p className="text-[11px] text-text-muted">{comp.description}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-mono text-[9px] text-text-muted">
                    {comp.endpoints}ep
                  </span>
                  <Badge className={`shrink-0 border-0 text-[9px] ${statusStyles[comp.status]}`}>
                    {statusLabels[comp.status]}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      )}

      {/* Tab 3: Data Flow */}
      {activeTab === 3 && (
        <CardContent className="p-5 md:p-6">
          <div className="space-y-0">
            {flows.map((flow, i) => (
              <div key={flow.step} className="flex gap-4">
                <div className="flex flex-col items-center">
                  <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-accent-green-light font-mono text-[10px] font-bold text-accent-green">
                    {flow.step}
                  </div>
                  {i < flows.length - 1 && <div className="w-px flex-1 bg-border-soft" />}
                </div>
                <div className="flex-1 pb-5">
                  <div className="flex items-center gap-2">
                    <h4 className="text-xs font-bold text-text-primary">{flow.title}</h4>
                    <Badge className="border-0 bg-surface-container-low text-[8px] font-mono text-text-muted">
                      {flow.protocol}
                    </Badge>
                  </div>
                  <div className="mt-1 flex items-center gap-1.5 text-[11px] text-text-muted">
                    <span className="font-medium text-text-secondary">{flow.from}</span>
                    <ArrowRight className="h-2.5 w-2.5" />
                    <span className="font-medium text-text-secondary">{flow.to}</span>
                  </div>
                  <p className="mt-1 text-[11px] leading-relaxed text-text-muted">{flow.description}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      )}
    </Card>
  );
}

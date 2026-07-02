"use client";

import {
  CheckCircle2,
  GitBranch,
  Package,
  Cloud,
  Server,
} from "lucide-react";

const pipeline = [
  { icon: GitBranch, title: "GitHub", subtitle: "Repo" },
  { icon: Package, title: "Docker", subtitle: "Build" },
  { icon: Cloud, title: "ECR", subtitle: "Registry" },
  { icon: Server, title: "ECS", subtitle: "Prod" },
];

export function DeploymentHero() {
  return (
    <section className="rounded-card border border-border bg-surface shadow-sm p-5">

      <div className="grid lg:grid-cols-2 gap-5 items-start">

        {/* LEFT */}
        <div>

          <span className="flex items-center px-2 h-5 text-[10px] rounded-badge bg-status-success/10 text-status-success font-medium border border-status-success/20 w-fit">
            ● Production
          </span>

          <h1 className="mt-3 text-xl font-semibold text-text-primary">
            Deployment Center
          </h1>

          <p className="mt-1 text-xs text-text-secondary">
            Monitor CI/CD, AWS infrastructure and services.
          </p>

          <div className="mt-4 flex gap-2 flex-wrap">
            <button className="px-3 py-1.5 text-xs rounded-control bg-accent text-white hover:bg-accent/90 transition-colors">
              Guide
            </button>
            <button className="px-3 py-1.5 text-xs rounded-control border border-border bg-surface text-text-primary hover:bg-canvas transition-colors">
              Pipeline
            </button>
            <button className="px-3 py-1.5 text-xs rounded-control border border-border bg-surface text-text-primary hover:bg-canvas transition-colors">
              AWS
            </button>
          </div>

          {/* STATS */}
          <div className="grid grid-cols-3 gap-3 mt-5">

            <div className="rounded-control border border-border bg-canvas/50 p-3">
              <p className="text-lg font-semibold text-text-primary">4</p>
              <p className="text-[11px] text-text-secondary">Live</p>
            </div>

            <div className="rounded-control border border-border bg-canvas/50 p-3">
              <p className="text-lg font-semibold text-text-primary">99.8%</p>
              <p className="text-[11px] text-text-secondary">Success</p>
            </div>

            <div className="rounded-control border border-border bg-canvas/50 p-3">
              <p className="text-lg font-semibold text-text-primary">2m</p>
              <p className="text-[11px] text-text-secondary">Deploy</p>
            </div>

          </div>

        </div>

        {/* RIGHT */}
        <div className="rounded-card border border-border bg-canvas/50 p-5">

          <div className="flex justify-between mb-4">

            <div>
              <h3 className="text-sm font-semibold text-text-primary">CI/CD Pipeline</h3>
              <p className="text-[11px] text-text-secondary">GitHub → Prod</p>
            </div>

            <span className="flex items-center px-2 h-5 text-[10px] rounded-badge bg-status-success/10 text-status-success font-medium border border-status-success/20">
              Running
            </span>

          </div>

          <div className="space-y-3">

            {pipeline.map((step, i) => {
              const Icon = step.icon;

              return (
                <div key={step.title}>
                  <div className="flex justify-between items-center">

                    <div className="flex items-center gap-3">
                      <div className="h-9 w-9 rounded-full bg-green-100 dark:bg-green-900/20 flex items-center justify-center">
                        <Icon className="h-4 w-4 text-green-600" />
                      </div>

                      <div>
                        <p className="text-xs font-medium text-text-primary">{step.title}</p>
                        <p className="text-[11px] text-text-secondary">{step.subtitle}</p>
                      </div>
                    </div>

                    <CheckCircle2 className="h-4 w-4 text-green-500" />

                  </div>

                  {i !== pipeline.length - 1 && (
                    <div className="h-3 w-px bg-green-400 ml-4" />
                  )}
                </div>
              );
            })}

          </div>

        </div>

      </div>
    </section>
  );
}

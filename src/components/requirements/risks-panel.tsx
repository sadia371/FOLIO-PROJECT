"use client";

import { ShieldAlert } from "lucide-react";

type Severity = "CRITICAL" | "HIGH" | "MEDIUM";
type Status = "open" | "review" | "mitigated";

interface Risk {
  id: string;
  severity: Severity;
  title: string;
  category: string;
  mitigation: string;
  status: Status;
}

const risks: Risk[] = [
  {
    id: "R-001",
    severity: "CRITICAL",
    title: "Stripe API rate limiting during peak onboarding",
    category: "Integration",
    mitigation: "Implement exponential backoff and request queuing.",
    status: "open",
  },
  {
    id: "R-002",
    severity: "HIGH",
    title: "Email delivery failures for invitation system",
    category: "Infrastructure",
    mitigation: "Use SendGrid with fallback to AWS SES.",
    status: "review",
  },
  {
    id: "R-003",
    severity: "CRITICAL",
    title: "Role permission escalation vulnerability",
    category: "Security",
    mitigation: "Enforce RBAC at API layer with audit logging enabled.",
    status: "open",
  },
  {
    id: "R-004",
    severity: "HIGH",
    title: "Database connection pool exhaustion under load",
    category: "Performance",
    mitigation: "Implement pgBouncer connection pooling with max pool size limits.",
    status: "review",
  },
  {
    id: "R-005",
    severity: "MEDIUM",
    title: "Third-party OAuth token expiry handling",
    category: "Auth",
    mitigation: "Silent refresh flow with user session recovery fallback.",
    status: "mitigated",
  },
  {
    id: "R-006",
    severity: "CRITICAL",
    title: "PII data exposure via unfiltered API responses",
    category: "Compliance",
    mitigation: "Apply field-level masking and response envelope filtering on all user endpoints.",
    status: "open",
  },
];

const severityConfig: Record<
  Severity,
  { badge: string; border: string; icon: string; iconBg: string }
> = {
  CRITICAL: {
    badge: "bg-status-danger/10 text-status-danger-on-tint",
    border: "border-l-[3px] border-l-status-danger",
    icon: "text-status-danger",
    iconBg: "bg-status-danger/10",
  },
  HIGH: {
    badge: "bg-status-warning/10 text-status-warning-on-tint",
    border: "border-l-[3px] border-l-status-warning",
    icon: "text-status-warning",
    iconBg: "bg-status-warning/10",
  },
  MEDIUM: {
    badge: "bg-[#E6F1FB] text-[#185FA5]",
    border: "border-l-[3px] border-l-[#378ADD]",
    icon: "text-[#378ADD]",
    iconBg: "bg-[#E6F1FB]",
  },
};

const statusConfig: Record<Status, { dot: string; label: string }> = {
  open: { dot: "bg-status-danger", label: "Open" },
  review: { dot: "bg-status-warning", label: "In review" },
  mitigated: { dot: "bg-status-success", label: "Mitigated" },
};

export function RisksPanel() {
  return (
    <div className="flex flex-col gap-3">
      {/* Header */}
      <div className="flex items-center justify-between">
        <span className="text-[13px] font-medium text-text-primary">Risk Register</span>
        <span className="text-[11px] text-text-secondary">
          {risks.length} risks · {risks.filter((r) => r.severity === "CRITICAL").length} critical
        </span>
      </div>

      {/* 2-column responsive grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        {risks.map((risk) => {
          const s = severityConfig[risk.severity];
          const st = statusConfig[risk.status];
          return (
            <div
              key={risk.id}
              className={`
                flex flex-col gap-[6px] bg-surface rounded-xl
                border border-border ${s.border}
                px-3 pt-3 pb-2.5
                hover:border-text-muted transition-colors
              `}
            >
              {/* Top row: id + badge + icon */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <span className="text-[10px] font-medium text-text-secondary tracking-wider">
                    {risk.id}
                  </span>
                  <span
                    className={`text-[10px] font-medium px-1.5 py-[1px] rounded ${s.badge} tracking-wider`}
                  >
                    {risk.severity}
                  </span>
                </div>
                <div className={`w-5 h-5 rounded flex items-center justify-center ${s.iconBg}`}>
                  <ShieldAlert className={`w-3 h-3 ${s.icon}`} />
                </div>
              </div>

              {/* Title */}
              <p className="text-[12px] font-medium text-text-primary leading-[1.35]">
                {risk.title}
              </p>

              {/* Category tag */}
              <div>
                <span className="inline-block text-[10px] text-text-secondary px-2 py-[2px] rounded border border-border bg-canvas">
                  {risk.category}
                </span>
              </div>

              {/* Mitigation */}
              <p className="text-[11px] text-text-secondary leading-[1.45] border-t border-border pt-1.5">
                {risk.mitigation}
              </p>

              {/* Footer: status + action */}
              <div className="flex items-center justify-between pt-0.5">
                <div className="flex items-center gap-1.5">
                  <div className={`w-1.5 h-1.5 rounded-full ${st.dot}`} />
                  <span className="text-[10px] text-text-secondary">{st.label}</span>
                </div>
                <button className="text-[10px] text-text-secondary hover:text-text-primary px-2 py-[3px] border border-border rounded bg-canvas hover:bg-surface hover:border-text-muted transition-all">
                  View Traceability
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

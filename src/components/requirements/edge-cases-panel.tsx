"use client";

import { edgeCases } from "@/lib/mock/requirements-intelligence";

const severityStyles = {
  high: "bg-status-danger/10 text-status-danger-on-tint",
  medium: "bg-status-warning/10 text-status-warning-on-tint",
  low: "bg-accent-green/10 text-status-success-on-tint",
};

export function EdgeCasesPanel() {
  return (
    <div className="w-full min-w-0 flex flex-col gap-3 sm:gap-4 lg:gap-5">
      {edgeCases.map((ec) => (
        <article
          key={ec.id}
          className="
            w-full min-w-0
            bg-surface
            border border-border-soft
            rounded-xl
            p-3 sm:p-4 lg:p-5
            group
            hover:border-accent-green/40
            transition-colors
          "
        >
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2 mb-3">
            <div className="flex flex-wrap items-center gap-2 sm:gap-3 min-w-0">
              <span className="font-mono text-[10px] sm:text-[11px] text-text-muted truncate">
                {ec.id}
              </span>

              <span
                className={`
                  px-2 py-0.5 rounded
                  text-[9px] sm:text-[10px]
                  font-mono uppercase tracking-wide
                  whitespace-nowrap
                  ${severityStyles[ec.severity]}
                `}
              >
                {ec.severity} Severity
              </span>
            </div>
          </div>

          {/* Title */}
          <h3
            className="
              text-xs sm:text-sm lg:text-sm
              font-bold
              text-text-primary
              mb-3
              break-words
            "
          >
            {ec.title}
          </h3>

          {/* Module Badge */}
          <div className="mb-4 flex flex-wrap gap-2">
            <span
              className="
                px-2 sm:px-2.5
                py-1
                rounded-full
                bg-surface-container
                text-text-muted
                font-mono
                text-[9px] sm:text-[10px]
                break-all
              "
            >
              {ec.module}
            </span>
          </div>

          {/* Footer Action */}
          <div className="flex justify-start sm:justify-end pt-3 sm:pt-4 border-t border-border-soft/20">
            <button
              className="
                w-full sm:w-auto
                px-3 py-1.5
                rounded-full
                border border-border-soft
                text-[11px] sm:text-xs
                text-text-muted
                hover:bg-surface-container-high
                transition-all
              "
            >
              View Traceability
            </button>
          </div>
        </article>
      ))}
    </div>
  );
}
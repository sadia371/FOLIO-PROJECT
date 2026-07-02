"use client";

import type { Toast } from "@/components/shared/use-toasts";

export function DashboardFooter({ addToast }: { addToast: (m: string, t?: Toast["type"]) => void }) {
  return (
    <div className="flex items-center justify-between pt-1">
      <span className="text-[11px] text-text-secondary">© 2026</span>
      <div className="flex gap-3">
        {["Privacy", "Terms", "API Status", "Changelog"].map((link) => (
          <button
            key={link}
            onClick={() => addToast(`Opening ${link}...`, "info")}
            className="text-[11px] text-text-secondary hover:text-text-primary transition-colors"
          >
            {link}
          </button>
        ))}
      </div>
    </div>
  );
}

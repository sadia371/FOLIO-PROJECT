"use client";

import { CheckCircle2, MessageCircle, Bell } from "lucide-react";
import type { Toast } from "@/components/shared/use-toasts";

export function ToastStack({ toasts }: { toasts: Toast[] }) {
  return (
    <div className="fixed top-4 right-4 z-[100] flex flex-col gap-2">
      {toasts.map((t) => (
        <div
          key={t.id}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-[12px] font-medium shadow-lg animate-[slideIn_0.2s_ease-out] ${
            t.type === "success"
              ? "bg-status-success text-white"
              : t.type === "action"
              ? "bg-[#007aff] text-white"
              : "bg-[#1d1d1f] text-white"
          }`}
        >
          {t.type === "success" ? (
            <CheckCircle2 className="w-3.5 h-3.5" />
          ) : t.type === "action" ? (
            <MessageCircle className="w-3.5 h-3.5" />
          ) : (
            <Bell className="w-3.5 h-3.5" />
          )}
          {t.message}
        </div>
      ))}
    </div>
  );
}

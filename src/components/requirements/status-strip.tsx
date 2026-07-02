"use client";

export function StatusStrip() {
  return (
    <div className="flex items-center gap-4 mb-8">
      <div className="font-mono text-[11px] text-accent-green flex items-center gap-2 whitespace-nowrap">
        <span className="w-2 h-2 rounded-full bg-accent-green animate-pulse" />
        AI GENERATING — 60%
      </div>
      <div className="flex-1 h-1 bg-surface-container-high rounded-full overflow-hidden">
        <div className="h-full bg-accent-green w-[60%] transition-all duration-1000 ease-in-out" />
      </div>
    </div>
  );
}

"use client";

const decisions = [
  {
    title: "PostgreSQL chosen over MongoDB",
    detail: "High relational integrity required for financial ledger.",
    date: "Jun 16",
    active: true,
  },
  {
    title: "Adopted Hub-and-Spoke Topology",
    detail: "Scalability focus for Sprint 45 delivery.",
    date: "Jun 14",
    active: false,
  },
  {
    title: "Event-Driven Over REST for Inter-Service",
    detail: "Decouples order and inventory services. Kafka selected.",
    date: "Jun 12",
    active: false,
  },
  {
    title: "JWT + OAuth2 Hybrid Auth",
    detail: "SSO for partners via OAuth2; internal services use JWT.",
    date: "Jun 10",
    active: false,
  },
  {
    title: "Feature Flags via LaunchDarkly",
    detail: "Gradual rollouts for payment gateway migration.",
    date: "Jun 8",
    active: false,
  },
  {
    title: "Container Orchestration on EKS",
    detail: "Moving from ECS to EKS for horizontal auto-scaling.",
    date: "Jun 5",
    active: false,
  },
  {
    title: "CQRS for Read-Heavy Dashboards",
    detail: "Separated read/write models for analytics pipeline.",
    date: "Jun 3",
    active: false,
  },
];

export function DecisionMemory() {
  return (
    <div className="rounded-xl border border-border-soft bg-surface p-4">
      <h3 className="mb-3 font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-text-muted">
        Decision Memory
      </h3>
      <div className="relative ml-3 max-h-[480px] space-y-4 overflow-y-auto pr-1">
        <div className="absolute left-[-13px] top-2 bottom-2 w-px bg-border-soft" />
        {decisions.map((d) => (
          <div key={d.title} className="relative flex flex-col gap-0.5">
            <div
              className={`absolute left-[-16px] top-1.5 h-2 w-2 rounded-full border border-white ${
                d.active ? "bg-accent-green" : "bg-border"
              }`}
            />
            <span className="text-xs font-bold text-text-primary">{d.title}</span>
            <p className="text-[11px] leading-relaxed text-text-muted">
              {d.date} &bull; {d.detail}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

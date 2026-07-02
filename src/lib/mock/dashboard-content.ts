export const tagData = [
  { dot: "bg-accent", bg: "bg-accent/10", text: "text-accent", label: "Week 4 – Code phase" },
  { dot: "bg-status-warning", bg: "bg-status-warning/10", text: "text-status-warning-on-tint", label: "Sprint review in 2h 15m" },
  { dot: "bg-status-danger", bg: "bg-status-danger/10", text: "text-status-danger-on-tint", label: "3 PR comments pending" },
];

export const scheduleItems = [
  { title: "Sprint Review", sub: "3:00–4:00 PM", badge: "2h 15m", bc: "rgb(var(--status-warning) / 0.12)", tc: "rgb(var(--status-warning-on-tint))", attendees: ["Waqas", "Jawad", "Fahad"], link: "#" },
  { title: "Architecture Walkthrough", sub: "11:00 AM · Jawad", badge: "Done", bc: "rgb(var(--status-success) / 0.12)", tc: "rgb(var(--status-success-on-tint))", attendees: ["Waqas", "Jawad"], link: "#" },
  { title: "1:1 with Supervisor", sub: "Tomorrow · 10:00 AM", badge: "Tomorrow", bc: "rgb(var(--text-primary) / 0.06)", tc: "rgb(var(--text-secondary))", subMuted: true, attendees: ["Waqas", "Supervisor"], link: "#" },
];

export const actions = [
  { initials: "FR", name: "Fahad Rahman", desc: "PR Review: 3 comments on token handling", badge: "Respond", bc: "rgb(var(--status-warning) / 0.12)", tc: "rgb(var(--status-warning-on-tint))" },
  { initials: "SM", name: "Supervisor", desc: "Which cloud provider did you finalize?", badge: "Respond", bc: "rgb(var(--status-warning) / 0.12)", tc: "rgb(var(--status-warning-on-tint))" },
  { initials: "GH", name: "GitHub CI", desc: "CI passed · feature/auth-jwt", badge: "Info", bc: "rgb(var(--status-success) / 0.12)", tc: "rgb(var(--status-success-on-tint))" },
];

export const sprintStats = [
  { count: "3", label: "Done", bg: "rgb(var(--status-success) / 0.08)", color: "rgb(var(--status-success-on-tint))" },
  { count: "3", label: "In Progress", bg: "rgb(var(--status-warning) / 0.08)", color: "rgb(var(--status-warning-on-tint))" },
  { count: "2", label: "To Do", bg: "rgb(var(--text-secondary) / 0.08)", color: "rgb(var(--text-secondary))" },
  { count: "2", label: "Bugs", bg: "rgb(var(--status-danger) / 0.08)", color: "rgb(var(--status-danger-on-tint))" },
];

export const issues = [
  { id: "FD-104", title: "Integrate Stripe payment intent creation", pts: "8 pts", status: "In Progress" },
  { id: "FD-105", title: "Build order tracking WebSocket gateway", pts: "5 pts", status: "To Do" },
  { id: "FD-106", title: "Fix menu item price rounding bug", pts: "2 pts", status: "Bugs" },
];

export const memoryTimeline = [
  { title: "Kickoff meeting", date: "Jun 9", desc: "Goals and scope defined — notes auto-saved to project memory", fullDesc: "Initial kickoff with full team. Defined project scope, milestones, and communication channels. All decisions logged to project memory." },
  { title: "API versioning", date: "Jun 12", desc: "REST API v1 with /api prefix — GraphQL deferred to v2", fullDesc: "Decided on REST for v1 to ship faster. GraphQL schema drafted but deferred to v2 for complexity management. Team agreed on /api prefix convention." },
  { title: "Requirements signed off", date: "Jun 13", desc: "14 user stories approved by supervisor", fullDesc: "All 14 user stories reviewed and approved. Acceptance criteria finalized. Ready to begin Sprint 42 implementation." },
];

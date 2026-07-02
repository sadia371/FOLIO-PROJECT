export type FileStatus = "Stable" | "Active" | "Under Review" | "Blocked";

export interface FileNode {
  name: string;
  status: FileStatus;
  extra?: string;
  highlighted?: boolean;
}

export interface Stat {
  label: string;
  value: string;
  sub?: string;
  critical?: boolean;
  trend?: "up" | "down" | "flat";
}

export const repoPulseStats: { headline: Stat[]; secondary: Stat[] } = {
  headline: [
    { label: "REPO HEALTH", value: "87%", sub: "+3% this week", trend: "up" },
    { label: "OPEN PRS", value: "4", sub: "+2 since yesterday", trend: "up" },
    { label: "CRITICAL ISSUES", value: "2", sub: "+1 new", critical: true, trend: "up" },
    { label: "VELOCITY", value: "On Track", sub: "+12% vs last week", trend: "up" },
  ],
  secondary: [
    { label: "Awaiting review", value: "3" },
    { label: "Blocked PRs", value: "1", critical: true },
    { label: "Failed pipelines", value: "0" },
    { label: "Unresolved comments", value: "7" },
  ],
};

export const aiRecommendationReasons = [
  "3 unresolved comments on auth flow changes",
  "12 dependent files across Dashboard, Memory Feed, and AI Briefing",
  "Scheduled for deployment tomorrow",
];
export const aiRecommendationImpacts = ["Dashboard", "Memory Feed", "AI Briefing", "Hours Summary"];

export const repoGraphLegend = [
  { label: "Stable", color: "rgb(var(--status-success))" },
  { label: "Active", color: "#007aff" },
  { label: "Under Review", color: "rgb(var(--status-warning))" },
  { label: "Blocked", color: "rgb(var(--status-danger))" },
];

export const repoGraphCol1: FileNode[] = [
  { name: "layout.tsx", status: "Stable" },
  { name: "app-shell.tsx", status: "Active" },
  { name: "module-shell.tsx", status: "Stable" },
];
export const repoGraphCol2: FileNode[] = [
  { name: "page.tsx", status: "Active" },
  { name: "briefing-card.tsx", status: "Under Review" },
  { name: "token-manager.ts", status: "Blocked", highlighted: true },
];
export const repoGraphCol3: FileNode[] = [
  { name: "project-context.tsx", status: "Under Review", extra: "4:48" },
  { name: "dashboard.ts", status: "Stable" },
];

export interface FileDetail {
  owner: string;
  reviewer: string;
  commit: string;
  pipeline: string;
  risk: string;
  summary: string;
  impact: number;
  riskScore: number;
}

export const fileDetailData: Record<string, FileDetail> = {
  "layout.tsx": { owner: "Waqas", reviewer: "Sarah Chen", commit: "2h ago", pipeline: "passing", risk: "low", summary: "Stable layout component. No issues detected.", impact: 30, riskScore: 2 },
  "app-shell.tsx": { owner: "Waqas", reviewer: "Alice Chen", commit: "1h ago", pipeline: "passing", risk: "medium", summary: "Active development. 2 pending review comments.", impact: 65, riskScore: 5 },
  "module-shell.tsx": { owner: "Sarah Chen", reviewer: "Waqas", commit: "1d ago", pipeline: "passing", risk: "low", summary: "Stable module wrapper. Well tested.", impact: 25, riskScore: 1 },
  "page.tsx": { owner: "Waqas", reviewer: "Sarah Chen", commit: "30m ago", pipeline: "failing", risk: "medium", summary: "Active changes. Pipeline failing on lint.", impact: 70, riskScore: 6 },
  "briefing-card.tsx": { owner: "Alice Chen", reviewer: "Waqas", commit: "3h ago", pipeline: "passing", risk: "medium", summary: "Under review. Layout regression on mobile.", impact: 55, riskScore: 4 },
  "token-manager.ts": { owner: "Waqas", reviewer: "Sarah Chen", commit: "5h ago", pipeline: "passing", risk: "high", summary: "Blocked by race condition in refresh endpoint. Do not merge until #43 is resolved.", impact: 80, riskScore: 9 },
  "project-context.tsx": { owner: "Waqas", reviewer: "Alice Chen", commit: "4h ago", pipeline: "passing", risk: "medium", summary: "Under review. 3 unresolved comments.", impact: 60, riskScore: 5 },
  "dashboard.ts": { owner: "Sarah Chen", reviewer: "Waqas", commit: "2d ago", pipeline: "passing", risk: "low", summary: "Stable mock data. No changes pending.", impact: 20, riskScore: 1 },
};

export const fileDetailDefault: FileDetail = {
  owner: "Waqas", reviewer: "Sarah Chen", commit: "5h ago", pipeline: "passing", risk: "low", summary: "File selected. No critical issues.", impact: 40, riskScore: 3,
};

export interface QueueItem {
  file: string;
  priority: "high" | "medium" | "low";
  desc: string;
  waiting: string;
  comments: string;
}

export const reviewQueueItems: QueueItem[] = [
  { file: "auth/jwt.service.ts", priority: "high", desc: "Security concern detected on token rotation logic", waiting: "Waiting 3 days", comments: "5 comments" },
  { file: "components/dashboard/briefing-card.tsx", priority: "medium", desc: "Layout regression on mobile viewport", waiting: "Waiting 1 day", comments: "2 comments" },
  { file: "api/routes/orders.ts", priority: "low", desc: "Missing input validation on POST handler", waiting: "Waiting 5 hrs", comments: "1 comments" },
];

export interface BlockerItem {
  title: string;
  severity: "high" | "medium" | "low";
  desc: string;
  action: string;
  meta?: string;
  jira?: boolean;
  icon?: "red" | "gray";
}

export const blockerItems: BlockerItem[] = [
  {
    title: "E2E test suite failing on CI",
    severity: "high",
    desc: "Playwright browser timeout after 30s — tests depend on network access",
    action: "Add network mock layer or increase timeout to 60s",
    icon: "red",
  },
  {
    title: "Stale branch: feature/stripe-webhook",
    severity: "low",
    desc: "No commits in 7 days — conflicts with main branch",
    action: "Rebase onto main or close the branch",
    icon: "gray",
  },
  {
    title: "FD-118 · Rate limiting on auth endpoints",
    severity: "high",
    desc: "In Progress · Alice Chen · 2pts",
    action: "View in Jira",
    jira: true,
    icon: "red",
  },
];

export const issueRelationships = [
  {
    num: "#42",
    title: "Token refresh race condition",
    files: ["token-manager.ts", "project-context.tsx", "client.ts", "app-shell.tsx"],
    nextNum: "#43",
  },
  {
    num: "#39",
    title: "Memory feed not updating on page switch",
    files: ["project-context.tsx", "activity-feed.tsx", "project-memory-timeline.tsx"],
    nextNum: "#41",
  },
];

export interface OwnershipRow {
  module: string;
  owner: string;
  reviewer: string;
  review: { label: string; color: "red" | "green" | "orange" | "gray" };
  branch: string;
  pr: string | null;
  workload: { pct: number; color: string };
}

export const ownershipRows: OwnershipRow[] = [
  {
    module: "Auth Module",
    owner: "SC",
    reviewer: "ML",
    review: { label: "Changes Requested", color: "red" },
    branch: "feature/jwt-rotation",
    pr: "Open",
    workload: { pct: 85, color: "rgb(var(--status-danger))" },
  },
  {
    module: "Dashboard",
    owner: "AH",
    reviewer: "SC",
    review: { label: "Approved", color: "gray" },
    branch: "main",
    pr: null,
    workload: { pct: 60, color: "rgb(var(--text-muted))" },
  },
  {
    module: "Memory Feed",
    owner: "ML",
    reviewer: "AH",
    review: { label: "Pending", color: "gray" },
    branch: "fix/memory-sync",
    pr: "Open",
    workload: { pct: 45, color: "rgb(var(--text-muted))" },
  },
  {
    module: "Deployment Guide",
    owner: "SC",
    reviewer: "AH",
    review: { label: "—", color: "gray" },
    branch: "main",
    pr: null,
    workload: { pct: 30, color: "rgb(var(--text-muted))" },
  },
];

export const ownershipColumns = ["MODULE", "OWNER", "REVIEWER", "REVIEW", "BRANCH", "PR", "WORKLOAD"];

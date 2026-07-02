export interface UserStory {
  id: string;
  title: string;
  statement: string;
  priority: "high" | "medium" | "low";
  points: number;
  status: "in_progress" | "backlog" | "done";
  acceptanceCriteria: string[];
}

export interface EdgeCase {
  id: string;
  title: string;
  severity: "high" | "medium" | "low";
  module: string;
}

export interface Risk {
  id: string;
  title: string;
  severity: "critical" | "high" | "medium" | "low";
  category: string;
  mitigation: string;
}

export interface PrdSection {
  title: string;
  tag: string;
  content: string;
  items?: string[];
  inScope?: string[];
  outScope?: string[];
}

export interface VersionEntry {
  version: string;
  label: string;
  description: string;
  time: string;
  current: boolean;
}

export const userStories: UserStory[] = [
  {
    id: "US-014",
    title: "Invite teammates via email",
    statement: "As a workspace admin, I want to invite teammates by email so that they can access the project before setup is finished.",
    priority: "high",
    points: 5,
    status: "in_progress",
    acceptanceCriteria: [
      "Admin can input multiple comma-separated emails.",
      "Invitation links expire after 48 hours for security.",
      "System prevents duplicate invitations for active users.",
    ],
  },
  {
    id: "US-015",
    title: "Assign workspace roles",
    statement: "As a workspace admin, I want to assign roles to teammates so that I can control access to sensitive billing data.",
    priority: "medium",
    points: 3,
    status: "backlog",
    acceptanceCriteria: [
      "Admin can assign Owner, Editor, or Viewer roles.",
      "Role changes take effect immediately without re-login.",
    ],
  },
  {
    id: "US-016",
    title: "Connect Stripe account",
    statement: "As a user, I want to connect my Stripe account during onboarding so that I can start billing immediately.",
    priority: "low",
    points: 8,
    status: "backlog",
    acceptanceCriteria: [
      "OAuth flow redirects to Stripe and back.",
      "Connection status is persisted and displayed.",
    ],
  },
  {
    id: "US-017",
    title: "Set up project workspace",
    statement: "As a new user, I want to create my first project workspace so that I can start organizing my work.",
    priority: "high",
    points: 5,
    status: "done",
    acceptanceCriteria: [
      "Workspace is created with default template.",
      "User is redirected to the workspace dashboard.",
    ],
  },
  {
    id: "US-018",
    title: "Configure notification preferences",
    statement: "As a user, I want to configure my notification preferences so that I only receive relevant alerts.",
    priority: "low",
    points: 2,
    status: "backlog",
    acceptanceCriteria: [
      "User can toggle email, push, and in-app notifications.",
      "Preferences are saved per-workspace.",
    ],
  },
  {
    id: "US-019",
    title: "Manage billing providers",
    statement: "As a workspace owner, I want to manage multiple billing providers so that I can handle different payment methods.",
    priority: "medium",
    points: 5,
    status: "backlog",
    acceptanceCriteria: [
      "Support Stripe, PayPal, and wire transfer.",
      "Default provider can be set per workspace.",
    ],
  },
];

export const edgeCases: EdgeCase[] = [
  { id: "EC-001", title: "User attempts to invite an already-registered teammate.", severity: "high", module: "Invitation Engine" },
  { id: "EC-002", title: "Admin assigns a role that exceeds the current seat limit.", severity: "medium", module: "RBAC Module" },
  { id: "EC-003", title: "Stripe webhook fires before the invitation is accepted.", severity: "high", module: "Billing Integration" },
  { id: "EC-004", title: "User uploads a profile picture that exceeds 5MB.", severity: "low", module: "Profile Service" },
  { id: "EC-005", title: "Concurrent role changes by two admins on the same user.", severity: "medium", module: "RBAC Module" },
  { id: "EC-006", title: "Invitation email bounces due to invalid address.", severity: "medium", module: "Invitation Engine" },
  { id: "EC-007", title: "User disconnects Stripe during an active billing cycle.", severity: "high", module: "Billing Integration" },
];

export const risks: Risk[] = [
  { id: "R-001", title: "Stripe API rate limiting during peak onboarding", severity: "critical", category: "Integration", mitigation: "Implement exponential backoff and request queuing." },
  { id: "R-002", title: "Email delivery failures for invitation system", severity: "high", category: "Infrastructure", mitigation: "Use SendGrid with fallback to AWS SES." },
  { id: "R-003", title: "Role permission escalation vulnerability", severity: "critical", category: "Security", mitigation: "Enforce server-side RBAC checks on every mutation." },
  { id: "R-004", title: "Onboarding flow abandonment above 40%", severity: "medium", category: "UX", mitigation: "Add save-and-resume capability with progress persistence." },
  { id: "R-005", title: "Data loss during workspace migration", severity: "high", category: "Data Integrity", mitigation: "Implement transactional migration with rollback support." },
];

export const prdSections: PrdSection[] = [
  {
    title: "Self-Serve Onboarding Flow",
    tag: "OVERVIEW",
    content: "A streamlined, end-to-end onboarding experience designed for B2B customers. The flow facilitates team expansion and financial setup immediately upon account creation, ensuring users reach their first project milestone with a fully configured workspace.",
  },
  {
    title: "Goals",
    tag: "GOALS",
    content: "",
    items: [
      "Reduce time-to-value by automating workspace configuration.",
      "Increase invitation conversion rates through frictionless email flows.",
      "Ensure 100% billing compliance before project initiation.",
    ],
  },
  {
    title: "Scope",
    tag: "SCOPE",
    content: "",
    inScope: [
      "Email-based teammate invitations",
      "Role-based access control (RBAC)",
      "Stripe Connect integration",
    ],
    outScope: [
      "SSO / SAML integration (v2)",
      "Multi-currency billing support",
      "Custom branding for invitation emails",
    ],
  },
];

export const versions: VersionEntry[] = [
  { version: "v2.1", label: "Current", description: "Regenerated with edge-case focus.", time: "2 MINS AGO", current: true },
  { version: "v2.0", label: "", description: "Initial generation results.", time: "1 HOUR AGO", current: false },
  { version: "v1.4", label: "", description: "Legacy draft from PRD upload.", time: "MAY 12, 2024", current: false },
];

export const coverageStats = {
  percentage: 87,
  userStories: 12,
  edgeCases: 7,
  risksFlagged: 5,
  highSeverity: 3,
};

import {
  BriefingQuickAction,
  InboxItem,
  Integration,
  Meeting,
  Notification,
} from "@/types";

export const briefingText =
  "You're in **Week 4 — Code phase**. Yesterday you logged 3.5h, mostly on the auth module. Sprint review is today at 3:00 PM — 2h 15m away. Fahad left 3 comments on your PR that need a response. Based on your velocity, you're on track to hit the Testing phase by Friday.";

export const standupText = `## Daily Standup — Tue, Jun 16

**Yesterday:** Completed JWT token refresh logic in auth/jwt.service.ts. Addressed 2 security findings from code review. Logged 3.5h on auth module.

**Today:** Respond to Fahad's PR comments on token handling. Prep demo for Sprint Review at 3:00 PM. Start order-tracking endpoint implementation.

**Blockers:** Waiting on supervisor's decision on cloud provider (AWS vs GCP) — flagged in inbox.`;

export const quickActions: BriefingQuickAction[] = [
  {
    id: "focus",
    label: "What to focus on",
    content: `**Top priorities for today:**

1. **Respond to Fahad's PR comments** — 3 comments on token handling in feature/auth-jwt. Estimated 45 min.
2. **Sprint Review prep** — Demo auth module + order API progress. Meeting at 3:00 PM.
3. **Order tracking endpoint** — Continue implementation; 2 of 5 endpoints complete.

**Velocity note:** On track. 12h logged in Code phase this week vs. 10h planned.`,
  },
  {
    id: "sprint-prep",
    label: "Prep sprint review",
    content: `**Sprint Review Talking Points**

1. Auth module complete — JWT login, refresh tokens, role-based guards
2. 2 security issues found and patched in jwt.service.ts
3. Order API: 2/5 endpoints done (create order, list orders)
4. Architecture decision: PostgreSQL over MongoDB — rationale documented
5. On track for Testing phase by Friday

**Demo flow:** Login → Create order → View order status`,
  },
  {
    id: "week-summary",
    label: "Week summary",
    content: `**Week 4 Summary — Code Phase**

| Phase | Hours | Planned |
|-------|-------|---------|
| Code | 12h | 10h |
| Architecture | 6h | 6h |
| Meetings | 4h | 3h |
| Testing | 1h | 2h |

**Highlights:** Auth module shipped. 14 user stories approved. PostgreSQL schema finalized.

**Next week:** Testing phase — unit tests for auth + order modules.`,
  },
];

export const meetings: Meeting[] = [
  {
    id: "m1",
    title: "Sprint Review",
    time: "3:00 - 4:00 PM",
    status: "upcoming",
    countdown: "In 2h 15m",
    talkingPoints: [
      "Demo auth module: login, refresh tokens, and role guards",
      "Share security patch summary for jwt.service.ts",
      "Show order API progress — 2 of 5 endpoints complete",
      "Confirm Testing phase start date: Friday",
      "Ask supervisor about cloud provider decision",
    ],
  },
  {
    id: "m2",
    title: "Architecture Walkthrough",
    time: "11:00 AM",
    detail: "with Jawad",
    status: "done",
    talkingPoints: [
      "Reviewed PostgreSQL schema for orders and users",
      "Confirmed NestJS module structure",
      "Discussed API versioning approach",
    ],
  },
  {
    id: "m3",
    title: "1:1 with Supervisor",
    time: "Tomorrow - 10:00 AM",
    status: "tomorrow",
    talkingPoints: [
      "Weekly progress update — on track for Testing phase",
      "Cloud provider decision needed (AWS vs GCP)",
      "Internship milestone check-in for Week 4",
    ],
  },
];

export const inboxItems: InboxItem[] = [
  {
    id: "i1",
    sender: "Fahad Rahman",
    subject: "PR Review: 3 comments on token handling",
    initials: "FR",
    status: "needs_response",
    detail:
      "Left 3 inline comments on feature/auth-jwt PR:\n\n1. Token expiry should use configurable env var, not hardcoded 3600s\n2. Refresh token rotation not implemented — security risk\n3. Missing rate limiting on /auth/refresh endpoint\n\nPlease address before merge.",
  },
  {
    id: "i2",
    sender: "Supervisor",
    subject: "Which cloud provider did you finalize?",
    initials: "SM",
    status: "needs_response",
    detail:
      "Hi Arhan — for the deployment phase next week, I need to know if you've decided between AWS and GCP. The architecture doc mentions both. Can you confirm by EOD?",
  },
  {
    id: "i3",
    sender: "GitHub",
    subject: "CI passed - feature/auth-jwt",
    initials: "GH",
    status: "info",
    detail:
      "All checks passed for PR #42 (feature/auth-jwt):\n- Unit tests: 24/24 passed\n- Lint: clean\n- Build: success",
  },
];

export const notifications: Notification[] = [
  {
    id: "n1",
    title: "PR comments",
    message: "Fahad left 3 comments on feature/auth-jwt",
    time: "2h ago",
  },
  {
    id: "n2",
    title: "Meeting reminder",
    message: "Sprint Review in 2h 15m",
    time: "30m ago",
  },
  {
    id: "n3",
    title: "CI passed",
    message: "feature/auth-jwt — all checks green",
    time: "4h ago",
  },
];

export const integrations: Integration[] = [
  { id: "gmail", name: "Gmail", status: "live", icon: "mail" },
  { id: "calendar", name: "Calendar", status: "live", icon: "calendar" },
  { id: "github", name: "GitHub", status: "live", icon: "github" },
];

export type SDLCPhase =
  | "requirements"
  | "architecture"
  | "code"
  | "deployment";

export interface StackContext {
  language: string;
  framework: string;
  database: string;
}

export interface Project {
  id: string;
  name: string;
  description: string;
  currentPhase: SDLCPhase;
  weekNumber: number;
  totalWeeks: number;
  stackContext?: StackContext;
}

export interface PhaseProgress {
  phase: SDLCPhase;
  label: string;
  hours: number;
  isActive?: boolean;
}

export interface HoursSummary {
  label: string;
  hours: number;
  color: string;
}

export type PhaseHours = Record<SDLCPhase, number>;

export interface Integration {
  id: string;
  name: string;
  status: "live" | "offline";
  icon: string;
}

export type MemoryEntryType =
  | "ai_response"
  | "decision"
  | "user_note"
  | "activity";

export interface MemoryEntry {
  id: string;
  phase: SDLCPhase | "planning";
  type: MemoryEntryType;
  title: string;
  summary: string;
  timestamp: string;
  sortDate: string;
  icon: string;
}

export interface Meeting {
  id: string;
  title: string;
  time: string;
  detail?: string;
  status?: "upcoming" | "done" | "tomorrow";
  countdown?: string;
  talkingPoints?: string[];
}

export interface InboxItem {
  id: string;
  sender: string;
  subject: string;
  initials: string;
  status?: "needs_response" | "info";
  detail?: string;
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  time: string;
}

export interface BriefingQuickAction {
  id: string;
  label: string;
  content: string;
}

export interface ModuleTab {
  id: string;
  label: string;
  content: string;
  isCode?: boolean;
}

export interface ModuleResponse {
  tabs: ModuleTab[];
  memoryTitle: string;
  memorySummary: string;
}

export interface DashboardChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
}

export interface DashboardNote {
  id: string;
  text: string;
}

export type FileTag = "bug" | "working" | "stable" | "review";

export interface TeamMember {
  name: string;
  initials: string;
  role: string;
  status: "active" | "reviewing" | "idle";
}

export interface RepoFileNode {
  id: string;
  path: string;
  x: number;
  y: number;
  links: string[];
  timeSpent: string;
  lastEdited: string;
  tags: FileTag[];
  snippet: string;
  teamMembers: TeamMember[];
}

export const PHASE_ROUTES: Record<SDLCPhase, string> = {
  requirements: "/requirements",
  architecture: "/architecture",
  code: "/code",
  deployment: "/deployment",
};

export const PHASE_LABELS: Record<SDLCPhase, string> = {
  requirements: "Requirements",
  architecture: "Architecture",
  code: "Code",
  deployment: "Deployment",
};

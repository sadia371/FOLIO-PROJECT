"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Calendar,
  Code,
  GitBranch,
  Mail,
  MapPin,
  Shield,
  Link as LinkIcon,
  FileText,
  GitMerge,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

type Tab = "overview" | "security" | "integrations" | "activity";

const tabs: { id: Tab; label: string }[] = [
  { id: "overview", label: "Overview" },
  { id: "security", label: "Security" },
  { id: "integrations", label: "Integrations" },
  { id: "activity", label: "Activity" },
];

interface ToggleProps {
  checked: boolean;
  onChange: (v: boolean) => void;
}

function Toggle({ checked, onChange }: ToggleProps) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      onClick={() => onChange(!checked)}
      className={cn(
        "relative inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full transition-colors",
        checked ? "bg-accent-green" : "bg-border"
      )}
    >
      <span
        className={cn(
          "pointer-events-none inline-block h-5 w-5 rounded-full bg-surface shadow-sm transition-transform",
          checked ? "translate-x-5" : "translate-x-0.5"
        )}
      />
    </button>
  );
}

const stats = [
  { label: "Active Projects", value: "24", suffix: "/ LIVE" },
  { label: "PRDs Generated", value: "142", suffix: "/ TOTAL" },
  { label: "Stories Shipped", value: "38", suffix: "/ Q1" },
  { label: "Day Streak", value: "17", suffix: "/ FLAMING" },
];

const integrations = [
  { name: "GitHub", icon: Code, connected: true, detail: "alexchen" },
  { name: "Slack", icon: Mail, connected: false, detail: "" },
  { name: "Google Calendar", icon: Calendar, connected: false, detail: "" },
  { name: "Jira", icon: GitBranch, connected: true, detail: "food-delivery-api" },
  { name: "Gmail", icon: Mail, connected: false, detail: "" },
];

const recentActivity = [
  { icon: FileText, color: "bg-accent-green-light text-accent-green", text: "Generated PRD for Checkout Redesign", project: "Acme CRM", time: "2h ago" },
  { icon: GitMerge, color: "bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400", text: "Updated System Architecture Diagram", project: "Microservices Audit", time: "5h ago" },
  { icon: Code, color: "bg-purple-50 dark:bg-purple-500/10 text-purple-600 dark:text-purple-400", text: "Shipped Feature: API Rate Limiter", project: "Global Infrastructure", time: "Yesterday" },
];

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState<Tab>("overview");
  const [emailDigest, setEmailDigest] = useState(true);
  const [meetingReminders, setMeetingReminders] = useState(true);
  const [riskAlerts, setRiskAlerts] = useState(false);
  const [weeklyInsights, setWeeklyInsights] = useState(true);
  const [mfaEnabled, setMfaEnabled] = useState(true);
  const [sessionAlerts, setSessionAlerts] = useState(true);

  return (
    <div className="space-y-8 max-w-[1200px] mx-auto p-4 lg:p-6">
      {/* Profile Header Card */}
      <Card className="border-border-soft bg-surface">
        <CardContent className="p-6 flex flex-col sm:flex-row gap-6 items-center sm:items-start text-center sm:text-left">
          <div className="relative shrink-0">
            <div className="h-20 w-20 overflow-hidden rounded-full border-2 border-accent-green p-0.5">
              <Image
                src="/pfp.jfif"
                alt="Profile photo"
                width={80}
                height={80}
                className="h-full w-full rounded-full object-cover"
              />
            </div>
            <div className="absolute -bottom-1 -right-1 flex items-center gap-1 rounded-full border-2 border-surface bg-accent-green px-2 py-0.5 text-[9px] font-bold text-white">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-white" />
              Coding
            </div>
          </div>
          <div className="flex-1 w-full min-w-0">
            <div className="flex flex-col sm:flex-row justify-between items-center sm:items-start gap-4">
              <div>
                <h2 className="text-2xl font-semibold tracking-tight text-text-primary">Alex Chen</h2>
                <p className="mt-0.5 text-sm font-medium text-accent-green">Senior Full-Stack Developer</p>
              </div>
              <Button variant="outline" size="sm" className="border-border-soft text-text-secondary shrink-0">
                Edit Profile
              </Button>
            </div>
            <p className="mt-3 max-w-2xl text-sm text-text-secondary leading-relaxed">
              Building cognitive tools for high-density engineering teams. Focused on React architecture, AI-augmented workflows, and system design clarity.
            </p>
            <div className="mt-4 flex flex-col sm:flex-row items-center gap-4 sm:gap-5 text-text-secondary">
              <div className="flex items-center gap-1.5">
                <MapPin className="h-4 w-4 text-text-muted" />
                <span className="font-mono text-xs">San Francisco</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Calendar className="h-4 w-4 text-text-muted" />
                <span className="font-mono text-xs">Joined March 2024</span>
              </div>
              <div className="flex items-center gap-3 border-t sm:border-t-0 sm:border-l border-border-soft pt-3 sm:pt-0 pl-0 sm:pl-5 w-full sm:w-auto justify-center sm:justify-start">
                <LinkIcon className="h-4 w-4 cursor-pointer hover:text-accent-green transition-colors" />
                <Code className="h-4 w-4 cursor-pointer hover:text-accent-green transition-colors" />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Stats Row */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        {stats.map((s) => (
          <Card key={s.label} className="border-border-soft bg-surface">
            <CardContent className="p-5 flex flex-col justify-between h-28">
              <span className="font-mono text-[9px] font-medium uppercase tracking-widest text-text-muted">{s.label}</span>
              <div className="flex items-baseline gap-1.5">
                <span className="text-2xl font-bold text-accent-green">{s.value}</span>
                <span className="font-mono text-[10px] text-text-muted">{s.suffix}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Tabs */}
      <div className="flex gap-6 border-b border-border-soft overflow-x-auto whitespace-nowrap scrollbar-hide pb-0.5">
        {tabs.map((t) => (
          <button
            key={t.id}
            onClick={() => setActiveTab(t.id)}
            className={cn(
              "pb-3 text-sm font-medium transition-colors shrink-0",
              activeTab === t.id
                ? "border-b-2 border-accent-green text-accent-green"
                : "text-text-muted hover:text-text-primary"
            )}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      {activeTab === "overview" && (
        <div className="grid gap-6 md:grid-cols-2">
          {/* AI Preferences */}
          <Card className="border-border-soft bg-surface">
            <CardContent className="p-6">
              <h4 className="mb-5 text-sm font-bold text-text-primary">AI Generation Preferences</h4>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-text-secondary">Tech Stack</span>
                  <span className="rounded-md bg-surface-container px-2.5 py-1 font-mono text-xs text-text-primary">React + Node.js</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-text-secondary">Detail Level</span>
                  <div className="flex rounded-full bg-surface-container p-0.5">
                    {["Brief", "Standard", "Deep"].map((l) => (
                      <button
                        key={l}
                        className={cn(
                          "rounded-full px-3 py-1 text-[11px] font-medium transition-colors",
                          l === "Standard"
                            ? "bg-surface border border-border-soft font-bold text-text-primary"
                            : "text-text-muted hover:text-text-primary"
                        )}
                      >
                        {l}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-text-secondary">Tone</span>
                  <div className="flex rounded-full bg-surface-container p-0.5">
                    {["Technical", "Narrative"].map((t) => (
                      <button
                        key={t}
                        className={cn(
                          "rounded-full px-3 py-1 text-[11px] font-medium transition-colors",
                          t === "Technical"
                            ? "bg-surface border border-border-soft font-bold text-text-primary"
                            : "text-text-muted hover:text-text-primary"
                        )}
                      >
                        {t}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Notifications */}
          <Card className="border-border-soft bg-surface">
            <CardContent className="p-6">
              <h4 className="mb-5 text-sm font-bold text-text-primary">Notifications</h4>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-text-secondary">Email digest</span>
                  <Toggle checked={emailDigest} onChange={setEmailDigest} />
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-text-secondary">Meeting reminders</span>
                  <Toggle checked={meetingReminders} onChange={setMeetingReminders} />
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-text-secondary">Risk alerts</span>
                  <Toggle checked={riskAlerts} onChange={setRiskAlerts} />
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-text-secondary">Weekly insights</span>
                  <Toggle checked={weeklyInsights} onChange={setWeeklyInsights} />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {activeTab === "security" && (
        <Card className="border-border-soft bg-surface">
          <CardContent className="p-6 space-y-6">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent-green-light">
                  <Shield className="h-5 w-5 text-accent-green" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-text-primary">Multi-Factor Authentication</h3>
                  <p className="text-xs text-text-muted">Add an extra layer of security to your account</p>
                </div>
              </div>
              <Toggle checked={mfaEnabled} onChange={setMfaEnabled} />
            </div>
            <div className="h-px bg-border-soft" />
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50 dark:bg-blue-500/10">
                  <Shield className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-text-primary">Session Alerts</h3>
                  <p className="text-xs text-text-muted">Get notified of new sign-ins to your account</p>
                </div>
              </div>
              <Toggle checked={sessionAlerts} onChange={setSessionAlerts} />
            </div>
            <div className="h-px bg-border-soft" />
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-orange-50 dark:bg-orange-500/10">
                  <Shield className="h-5 w-5 text-orange-500 dark:text-orange-400" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-text-primary">Password</h3>
                  <p className="text-xs text-text-muted">Last changed 3 months ago</p>
                </div>
              </div>
              <Button variant="outline" size="sm" className="border-border-soft text-text-secondary">
                Change
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {activeTab === "integrations" && (
        <Card className="border-border-soft bg-surface overflow-hidden">
          {integrations.map((item, i) => (
            <div key={item.name}>
              <div className="flex items-center justify-between p-5 transition-colors hover:bg-surface-container-low">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-surface-container-high">
                    <item.icon className="h-5 w-5 text-text-secondary" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-sm font-bold text-text-primary">{item.name}</h3>
                      {item.connected ? (
                        <Badge className="border-0 bg-accent-green-light text-[9px] font-bold text-accent-green">
                          Connected
                        </Badge>
                      ) : (
                        <Badge className="border-0 bg-surface-container text-[9px] text-text-muted">
                          Not connected
                        </Badge>
                      )}
                    </div>
                    {item.detail && <p className="text-xs text-text-muted">{item.detail}</p>}
                  </div>
                </div>
                <Button variant="ghost" size="sm" className="h-8 text-[11px]">
                  {item.connected ? "Disconnect" : "Connect"}
                </Button>
              </div>
              {i < integrations.length - 1 && <div className="mx-5 h-px bg-border-soft" />}
            </div>
          ))}
        </Card>
      )}

      {activeTab === "activity" && (
        <Card className="border-border-soft bg-surface overflow-hidden">
          {recentActivity.map((item, i) => (
            <div key={i}>
              <div className="flex items-center justify-between p-5 transition-colors hover:bg-surface-container-low group">
                <div className="flex items-center gap-3">
                  <div className={cn("flex h-10 w-10 items-center justify-center rounded-full", item.color)}>
                    <item.icon className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-text-primary">{item.text}</p>
                    <p className="font-mono text-[10px] text-text-muted">Project: {item.project}</p>
                  </div>
                </div>
                <span className="font-mono text-[10px] text-text-muted group-hover:text-accent-green transition-colors">{item.time}</span>
              </div>
              {i < recentActivity.length - 1 && <div className="mx-5 h-px bg-border-soft" />}
            </div>
          ))}
        </Card>
      )}

      {/* Footer */}
      <footer className="flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-border-soft pt-6 text-[11px] text-text-muted text-center">
        <span>&copy; 2026 DevPilot AI. Built with precision.</span>
        <div className="flex gap-4">
          <Link href="#" className="hover:text-text-primary">Status</Link>
          <Link href="#" className="hover:text-text-primary">Privacy Policy</Link>
          <Link href="#" className="hover:text-text-primary">Terms of Service</Link>
        </div>
      </footer>
    </div>
  );
}

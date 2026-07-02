"use client";

import { useState } from "react";
import {
  AlertTriangle,
  Bell,
  Check,
  CreditCard,
  Loader2,
  Palette,
  Shield,
  Sliders,
  User,
  Link2,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useTheme } from "@/components/theme-provider";

type Section =
  | "profile"
  | "connected"
  | "ai"
  | "notifications"
  | "appearance"
  | "security"
  | "billing"
  | "danger";

function Toggle({ on, set }: { on: boolean; set: (v: boolean) => void }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={on}
      onClick={() => set(!on)}
      className={cn(
        "relative h-[22px] w-[38px] rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-status-success/25",
        on ? "bg-status-success" : "bg-border"
      )}
    >
      <span
        className={cn(
          "absolute left-[3px] top-[3px] h-4 w-4 rounded-full bg-surface shadow-sm transition-transform duration-200",
          on ? "translate-x-4" : "translate-x-0"
        )}
      />
    </button>
  );
}

function Segmented({
  opts,
  val,
  set,
}: {
  opts: string[];
  val: string;
  set: (v: string) => void;
}) {
  return (
    <div className="flex items-center gap-[3px] rounded-lg bg-canvas p-[3px]">
      {opts.map((o) => (
        <button
          key={o}
          type="button"
          onClick={() => set(o)}
          className={cn(
            "rounded-md px-3 py-1.5 text-xs font-medium leading-none transition-all",
            val === o
              ? "bg-surface text-text-primary shadow-sm"
              : "text-text-secondary hover:text-text-primary"
          )}
        >
          {o}
        </button>
      ))}
    </div>
  );
}

function SaveBtn() {
  const [state, setState] = useState<"idle" | "saving" | "saved">("idle");

  async function handle() {
    setState("saving");
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setState("saved");
    setTimeout(() => setState("idle"), 1800);
  }

  return (
    <button
      type="button"
      onClick={handle}
      disabled={state !== "idle"}
      className={cn(
        "flex items-center gap-1.5 rounded-lg px-4 py-2 text-sm font-semibold text-white transition-all active:scale-[0.99]",
        state === "saved" ? "bg-status-success" : "bg-[#1b1b2e] hover:bg-[#252538]",
        state === "saving" && "cursor-not-allowed opacity-70"
      )}
    >
      {state === "saving" && <Loader2 className="h-3.5 w-3.5 animate-spin" />}
      {state === "saved" && <Check className="h-3.5 w-3.5" />}
      {state === "saving" ? "Saving…" : state === "saved" ? "Saved" : "Save changes"}
    </button>
  );
}

function SectionHeading({ title, sub }: { title: string; sub: string }) {
  return (
    <div className="mb-6">
      <h2 className="text-[17px] font-semibold tracking-tight text-text-primary">{title}</h2>
      <p className="mt-0.5 text-sm text-text-secondary">{sub}</p>
    </div>
  );
}

function GroupLabel({ children }: { children: React.ReactNode }) {
  return <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.08em] text-text-secondary px-1">{children}</p>;
}

function Card({ children }: { children: React.ReactNode }) {
  return <div className="overflow-hidden rounded-xl border border-border bg-surface">{children}</div>;
}

function Row({
  label,
  sub,
  children,
  last,
}: {
  label: string;
  sub?: string;
  children: React.ReactNode;
  last?: boolean;
}) {
  return (
    <div className={cn("flex items-center gap-4 px-5 py-4", !last && "border-b border-border") }>
      <div className="min-w-0 flex-1">
        <p className="text-sm font-medium text-text-primary">{label}</p>
        {sub && <p className="mt-0.5 text-xs leading-relaxed text-text-secondary">{sub}</p>}
      </div>
      <div className="shrink-0 flex items-center">{children}</div>
    </div>
  );
}

function FieldInput(props: React.InputHTMLAttributes<HTMLInputElement> & { label?: string }) {
  const { label, className, ...rest } = props;
  return (
    <div className="flex flex-col gap-1.5">
      {label && <label className="text-[10px] font-semibold uppercase tracking-[0.07em] text-text-secondary">{label}</label>}
      <input
        className={cn(
          "w-full rounded-lg border border-border bg-canvas px-3 py-2.5 text-sm text-text-primary outline-none transition-all",
          "focus:border-status-success focus:ring-2 focus:ring-status-success/15",
          className
        )}
        {...rest}
      />
    </div>
  );
}

const SECTIONS: { id: Section; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
  { id: "profile", label: "Profile", icon: User },
  { id: "connected", label: "Connected Accounts", icon: Link2 },
  { id: "ai", label: "AI Preferences", icon: Sliders },
  { id: "notifications", label: "Notifications", icon: Bell },
  { id: "appearance", label: "Appearance", icon: Palette },
  { id: "security", label: "Security", icon: Shield },
  { id: "billing", label: "Billing", icon: CreditCard },
  { id: "danger", label: "Danger Zone", icon: AlertTriangle },
];

function SettingsNav({ active, onChange }: { active: Section; onChange: (s: Section) => void }) {
  return (
    <>
      <nav className="hidden flex-col gap-0.5 px-2 py-5 lg:flex">
        {SECTIONS.map(({ id, label, icon: Icon }) => {
          const isDanger = id === "danger";
          const isActive = active === id;
          return (
            <button
              key={id}
              type="button"
              onClick={() => onChange(id)}
              className={cn(
                "flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm text-left transition-all",
                isDanger && !isActive && "mt-4 text-status-danger hover:bg-red-50/70",
                isDanger && isActive && "mt-4",
                !isDanger && isActive && "bg-canvas font-medium text-text-primary",
                !isDanger && !isActive && "text-text-secondary hover:bg-canvas hover:text-text-primary"
              )}
            >
              <Icon className={cn("h-3.5 w-3.5 shrink-0", isDanger ? "text-status-danger" : isActive ? "text-text-primary" : "text-text-secondary")} />
              <span className={cn(isDanger && "text-status-danger")}>{label}</span>
            </button>
          );
        })}
      </nav>

      <div className="flex items-center gap-1.5 overflow-x-auto border-b border-border px-5 py-3 lg:hidden">
        {SECTIONS.map(({ id, label }) => {
          const isDanger = id === "danger";
          const isActive = active === id;
          return (
            <button
              key={id}
              type="button"
              onClick={() => onChange(id)}
              className={cn(
                "shrink-0 whitespace-nowrap rounded-full px-3 py-1.5 text-xs font-medium transition-all",
                isDanger && !isActive && "border border-status-danger/25 text-status-danger",
                isDanger && isActive && "bg-status-danger text-white",
                !isDanger && isActive && "bg-[#1d1d1f] text-white",
                !isDanger && !isActive && "bg-canvas text-text-secondary hover:bg-border"
              )}
            >
              {label}
            </button>
          );
        })}
      </div>
    </>
  );
}



function PanelLabel({ children }: { children: React.ReactNode }) {
  return <p className="mb-2.5 text-[10px] font-semibold uppercase tracking-[0.08em] text-text-secondary">{children}</p>;
}

function PanelCard({ children }: { children: React.ReactNode }) {
  return <div className="space-y-2.5 rounded-xl border border-border bg-canvas p-4">{children}</div>;
}

function PanelRow({ label, value, accent }: { label: string; value: string; accent?: boolean }) {
  return (
    <div className="flex items-center justify-between gap-3">
      <span className="text-xs text-text-secondary">{label}</span>
      <span className={cn("text-xs font-medium tabular-nums", accent ? "text-status-success" : "text-text-primary")}>{value}</span>
    </div>
  );
}

function Bullet({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-start gap-2">
      <span className="mt-[5px] h-1 w-1 shrink-0 rounded-full bg-status-success" />
      <span className="text-xs leading-relaxed text-text-secondary">{children}</span>
    </div>
  );
}

function ContextPanel({ section }: { section: Section }) {
  if (section === "profile") {
    return (
      <div className="space-y-5">
        <div>
          <PanelLabel>Preview</PanelLabel>
          <div className="flex flex-col items-center gap-2.5 rounded-xl border border-border bg-surface p-4 text-center">
            <div className="flex h-12 w-12 select-none items-center justify-center rounded-full bg-status-success/12 text-lg font-semibold text-status-success">FA</div>
            <div>
              <p className="text-sm font-semibold text-text-primary">Finn Andersen</p>
              <p className="mt-0.5 text-[11px] text-text-secondary">finn.andersen@designstudio.dk</p>
            </div>
            <span className="rounded-full bg-canvas px-2 py-0.5 text-[9px] font-semibold uppercase tracking-wide text-text-secondary">Pro member</span>
          </div>
        </div>
        <div>
          <PanelLabel>Visibility in workspace</PanelLabel>
          <PanelCard>
            <PanelRow label="Sprint boards" value="Visible" accent />
            <PanelRow label="PR reviews" value="Visible" accent />
            <PanelRow label="AI attribution" value="Visible" accent />
          </PanelCard>
        </div>
      </div>
    );
  }

  if (section === "connected") {
    return (
      <div className="space-y-5">
        <div>
          <PanelLabel>Integration health</PanelLabel>
          <PanelCard>
            <PanelRow label="Gmail" value="Connected" accent />
            <PanelRow label="Google Calendar" value="Connected" accent />
            <PanelRow label="GitHub" value="Not connected" />
            <PanelRow label="Slack" value="Not connected" />
          </PanelCard>
        </div>
        <div>
          <PanelLabel>Why connect?</PanelLabel>
          <div className="space-y-2">
            <Bullet>Copilot surfaces relevant email threads in context.</Bullet>
            <Bullet>Calendar conflicts appear next to sprint deadlines.</Bullet>
            <Bullet>Commits link directly to active issues.</Bullet>
          </div>
        </div>
      </div>
    );
  }

  if (section === "ai") {
    return (
      <div className="space-y-5">
        <div>
          <PanelLabel>Copilot usage</PanelLabel>
          <PanelCard>
            <PanelRow label="Model" value="Claude 3.5" accent />
            <PanelRow label="Tokens used" value="6,200 / 10,000" />
            <div className="pt-0.5">
              <div className="h-1 overflow-hidden rounded-full bg-border"><div className="h-full w-[62%] rounded-full bg-status-success" /></div>
              <p className="mt-1 text-[10px] text-text-secondary">Resets Jul 1</p>
            </div>
          </PanelCard>
        </div>
        <div>
          <PanelLabel>Output mode guide</PanelLabel>
          <div className="space-y-3">
            {[
              { label: "Balanced", desc: "Best for most planning tasks" },
              { label: "Concise", desc: "Ideal for stand-ups and updates" },
              { label: "Preset", desc: "Follows your workspace defaults" },
            ].map(({ label, desc }) => (
              <div key={label}>
                <p className="text-xs font-medium text-text-primary">{label}</p>
                <p className="mt-0.5 text-[11px] text-text-secondary">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (section === "notifications") {
    return (
      <div className="space-y-5">
        <div>
          <PanelLabel>Your schedule</PanelLabel>
          <PanelCard>
            <PanelRow label="Daily briefing" value="08:55 AM" accent />
            <PanelRow label="Weekly digest" value="Mondays" />
            <PanelRow label="PR mentions" value="Instant" accent />
          </PanelCard>
        </div>
        <div>
          <PanelLabel>Good to know</PanelLabel>
          <div className="space-y-2">
            <Bullet>Notification settings are personal — each team member controls their own cadence.</Bullet>
            <Bullet>In-app alerts appear in the notification tray regardless of email settings.</Bullet>
          </div>
        </div>
      </div>
    );
  }

  if (section === "appearance") {
    return (
      <div className="space-y-5">
        <div>
          <PanelLabel>Theme preview</PanelLabel>
          <div className="overflow-hidden rounded-xl border border-border">
            <div className="border-b border-border bg-white px-4 py-3">
              <div className="mb-2 flex items-center gap-2"><div className="h-4 w-4 rounded bg-[#1b1b2e]" /><div className="h-1.5 w-14 rounded-full bg-[#f0f0f4]" /></div>
              <div className="space-y-1.5"><div className="h-1.5 w-full rounded-full bg-[#f0f0f4]" /><div className="h-1.5 w-3/4 rounded-full bg-[#f0f0f4]" /></div>
            </div>
            <div className="bg-[#1b1b2e] px-4 py-3">
              <div className="mb-2 flex items-center gap-2"><div className="h-4 w-4 rounded bg-[#22c55e]" /><div className="h-1.5 w-14 rounded-full bg-white/10" /></div>
              <div className="space-y-1.5"><div className="h-1.5 w-full rounded-full bg-white/10" /><div className="h-1.5 w-2/3 rounded-full bg-white/10" /></div>
            </div>
          </div>
        </div>
        <div>
          <PanelLabel>Current settings</PanelLabel>
          <PanelCard>
            <PanelRow label="Theme" value="System" />
            <PanelRow label="Density" value="Default" />
            <PanelRow label="Language" value="English (US)" />
          </PanelCard>
        </div>
      </div>
    );
  }

  if (section === "security") {
    return (
      <div className="space-y-5">
        <div>
          <PanelLabel>Security score</PanelLabel>
          <div className="rounded-xl border border-border bg-surface p-4">
            <div className="mb-2 flex items-center justify-between"><span className="text-sm font-semibold text-text-primary">Fair</span><span className="text-sm font-semibold text-status-warning">60%</span></div>
            <div className="mb-3 h-1.5 overflow-hidden rounded-full bg-canvas"><div className="h-full w-[60%] rounded-full bg-status-warning" /></div>
            <div className="space-y-2">
              {[
                { label: "Strong password", done: true },
                { label: "2FA enabled", done: false },
                { label: "Sign-in alerts on", done: true },
              ].map(({ label, done }) => (
                <div key={label} className="flex items-center gap-2">
                  <div className={cn("flex h-3.5 w-3.5 shrink-0 items-center justify-center rounded-full", done ? "bg-status-success" : "border border-border")}>{done && <Check className="h-2 w-2 text-white" strokeWidth={3} />}</div>
                  <span className={cn("text-xs", done ? "text-text-primary" : "text-text-secondary")}>{label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div>
          <PanelLabel>Recent activity</PanelLabel>
          <PanelCard>
            <PanelRow label="Password updated" value="3 months ago" />
            <PanelRow label="New device login" value="Today" accent />
            <PanelRow label="Session revoked" value="Yesterday" />
          </PanelCard>
        </div>
      </div>
    );
  }

  if (section === "billing") {
    return (
      <div className="space-y-5">
        <div>
          <PanelLabel>Plan summary</PanelLabel>
          <PanelCard>
            <PanelRow label="Plan" value="Pro" accent />
            <PanelRow label="Price" value="$29 / mo" />
            <PanelRow label="Renewal" value="Jul 21, 2026" />
            <PanelRow label="Seats" value="1 of 5 used" />
          </PanelCard>
        </div>
        <div>
          <PanelLabel>AI token usage</PanelLabel>
          <div className="rounded-xl border border-border bg-canvas p-4">
            <div className="mb-2 flex justify-between"><span className="text-xs text-text-secondary">Used this month</span><span className="text-xs font-medium text-text-primary">6,200 / 10,000</span></div>
            <div className="h-1.5 overflow-hidden rounded-full bg-border"><div className="h-full w-[62%] rounded-full bg-status-success" /></div>
            <p className="mt-1.5 text-[10px] text-text-secondary">Resets Jul 1, 2026</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <PanelLabel>Before you proceed</PanelLabel>
      <div className="space-y-2 rounded-xl border border-status-danger/20 bg-status-danger/[0.06] p-4">
        <Bullet>Export your sprint history before deleting.</Bullet>
        <Bullet>All workspaces you own will be removed.</Bullet>
        <Bullet>Teammates in shared workspaces are unaffected.</Bullet>
        <Bullet>Billing stops immediately on deletion.</Bullet>
      </div>
      <p className="text-[11px] leading-relaxed text-text-secondary">Need a break instead? You can deactivate your account — data is preserved and reactivation is instant.</p>
    </div>
  );
}

function renderSection(s: Section) {
  switch (s) {
    case "profile":
      return <ProfileSection />;
    case "connected":
      return <ConnectedSection />;
    case "ai":
      return <AISection />;
    case "notifications":
      return <NotificationsSection />;
    case "appearance":
      return <AppearanceSection />;
    case "security":
      return <SecuritySection />;
    case "billing":
      return <BillingSection />;
    case "danger":
      return <DangerSection />;
  }
}

function ProfileSection() {
  const [firstName, setFirstName] = useState("Finn");
  const [lastName, setLastName] = useState("Andersen");
  const [email, setEmail] = useState("finn.andersen@designstudio.dk");

  return (
    <div className="space-y-5">
      <SectionHeading title="Profile" sub="Manage your personal information and display preferences." />
      <Card>
        <div className="flex items-center gap-4 border-b border-border px-5 py-5">
          <div className="flex h-14 w-14 shrink-0 select-none items-center justify-center rounded-full bg-status-success/12 text-xl font-semibold text-status-success">FA</div>
          <div className="min-w-0 flex-1">
            <p className="text-sm font-semibold text-text-primary">{firstName} {lastName}</p>
            <p className="truncate text-xs text-text-secondary">{email}</p>
          </div>
        </div>
        <div className="p-5">
          <div className="grid gap-4 sm:grid-cols-2">
            <FieldInput label="First Name" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
            <FieldInput label="Last Name" value={lastName} onChange={(e) => setLastName(e.target.value)} />
            <div className="sm:col-span-2"><FieldInput label="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} /></div>
          </div>
        </div>
        <div className="flex justify-end border-t border-border bg-canvas px-5 py-3.5"><SaveBtn /></div>
      </Card>
    </div>
  );
}

function ConnectedSection() {
  const [accounts, setAccounts] = useState([
    { id: "gmail", letter: "G", color: "#EA4335", name: "Gmail", email: "finn.andersen@gmail.com", desc: "Read-only access to relevant communications", connected: true },
    { id: "gcal", letter: "C", color: "#4285F4", name: "Google Calendar", email: null as string | null, desc: "View upcoming events for context", connected: true },
    { id: "github", letter: "H", color: "#24292e", name: "GitHub", email: null as string | null, desc: "Link pull requests and code reviews", connected: false },
    { id: "slack", letter: "S", color: "#4A154B", name: "Slack", email: null as string | null, desc: "Surface notifications and team updates", connected: false },
  ]);

  function toggle(id: string) {
    setAccounts((prev) => prev.map((a) => (a.id === id ? { ...a, connected: !a.connected } : a)));
  }

  return (
    <div className="space-y-5">
      <SectionHeading title="Connected Accounts" sub="Manage third-party integrations and OAuth services." />
      <Card>
        {accounts.map((acc, i) => (
          <div key={acc.id} className={cn("flex items-center gap-3.5 px-5 py-4", i < accounts.length - 1 && "border-b border-border") }>
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-[11px] font-bold text-white" style={{ backgroundColor: acc.color }}>{acc.letter}</div>
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-2"><p className="text-sm font-medium text-text-primary">{acc.name}</p>{acc.connected && <span className="rounded-full bg-status-success/10 px-1.5 py-0.5 text-[9px] font-semibold uppercase leading-none tracking-[0.06em] text-status-success">Connected</span>}</div>
              {acc.email && <p className="mt-0.5 text-xs text-text-secondary">{acc.email}</p>}
              <p className="mt-0.5 text-xs text-text-secondary">{acc.desc}</p>
            </div>
            <button type="button" onClick={() => toggle(acc.id)} className={cn("shrink-0 rounded-lg border px-3 py-1.5 text-xs font-medium transition-all", acc.connected ? "border-border text-text-secondary hover:border-status-danger/30 hover:bg-red-50/60 hover:text-status-danger" : "border-status-success/40 bg-status-success/5 text-status-success hover:bg-status-success/10") }>{acc.connected ? "Disconnect" : "Connect"}</button>
          </div>
        ))}
      </Card>
    </div>
  );
}

function AISection() {
  const [outputStyle, setOutputStyle] = useState("Balanced");
  const [autoGenerate, setAutoGenerate] = useState(true);
  const [techStack, setTechStack] = useState("Next.js, Supabase, Claude API, Tailwind CSS");

  return (
    <div className="space-y-5">
      <SectionHeading title="AI Preferences" sub="Customise how the AI Copilot responds and generates content." />
      <Card>
        <Row label="Default output style" sub="Controls the tone and verbosity of AI responses">
          <Segmented opts={["Formal", "Balanced", "Concise"]} val={outputStyle} set={setOutputStyle} />
        </Row>
        <Row label="Auto-generate requirements" sub="Automatically draft specifications based on chat context">
          <Toggle on={autoGenerate} set={setAutoGenerate} />
        </Row>
        <div className="border-b border-border px-5 py-4">
          <p className="mb-0.5 text-sm font-medium text-text-primary">Default tech stack</p>
          <p className="mb-3 text-xs text-text-secondary">Pre-filled context for architecture and code generation</p>
          <input value={techStack} onChange={(e) => setTechStack(e.target.value)} className="w-full rounded-lg border border-border bg-canvas px-3 py-2.5 text-sm text-text-primary outline-none transition-all focus:border-status-success focus:ring-2 focus:ring-status-success/12" />
        </div>
        <div className="flex justify-end bg-canvas px-5 py-3.5"><SaveBtn /></div>
      </Card>
    </div>
  );
}

function NotificationsSection() {
  const [daily, setDaily] = useState(true);
  const [weekly, setWeekly] = useState(false);
  const [prs, setPrs] = useState(true);
  const [sprints, setSprints] = useState(true);
  const [time, setTime] = useState("08:55");

  return (
    <div className="space-y-6">
      <SectionHeading title="Notifications" sub="Control when and how FolioDesk keeps you informed." />
      <div className="space-y-2">
        <GroupLabel>Email</GroupLabel>
        <Card>
          <div className="flex items-center gap-4 border-b border-border px-5 py-4">
            <div className="min-w-0 flex-1"><p className="text-sm font-medium text-text-primary">Daily briefing reminder</p><p className="mt-0.5 text-xs text-text-secondary">Get a summary of your pending tasks every morning</p></div>
            <div className="flex shrink-0 items-center gap-2.5"><input type="time" value={time} onChange={(e) => setTime(e.target.value)} disabled={!daily} className="rounded-md border border-border bg-canvas px-2 py-1.5 text-xs text-text-primary outline-none transition-all focus:border-status-success disabled:opacity-40" /><Toggle on={daily} set={setDaily} /></div>
          </div>
          <Row label="Weekly email digest" sub="A curated look at your development progress and velocity" last><Toggle on={weekly} set={setWeekly} /></Row>
        </Card>
      </div>
      <div className="space-y-2">
        <GroupLabel>In-App</GroupLabel>
        <Card>
          <Row label="PR comment mentions" sub="Notify when someone mentions you in a pull request"><Toggle on={prs} set={setPrs} /></Row>
          <Row label="Sprint status updates" sub="Receive updates when sprint milestones are reached" last><Toggle on={sprints} set={setSprints} /></Row>
        </Card>
      </div>
    </div>
  );
}

const THEME_LABELS = ["Light", "Dark", "System"] as const;
const themeLabelToValue: Record<string, "light" | "dark" | "system"> = {
  Light: "light",
  Dark: "dark",
  System: "system",
};
const themeValueToLabel: Record<string, string> = {
  light: "Light",
  dark: "Dark",
  system: "System",
};

function AppearanceSection() {
  const { theme, setTheme } = useTheme();
  const [density, setDensity] = useState("Default");
  const [language, setLang] = useState("English (US)");

  return (
    <div className="space-y-5">
      <SectionHeading title="Appearance" sub="Personalise the look and feel of your workspace." />
      <Card>
        <Row label="Theme" sub="Choose your preferred colour scheme">
          <Segmented
            opts={[...THEME_LABELS]}
            val={themeValueToLabel[theme]}
            set={(label) => setTheme(themeLabelToValue[label])}
          />
        </Row>
        <Row label="Interface density" sub="Adjust the spacing density of the UI"><Segmented opts={["Compact", "Default", "Spacious"]} val={density} set={setDensity} /></Row>
        <Row label="Language" sub="Interface display language" last>
          <select value={language} onChange={(e) => setLang(e.target.value)} className="rounded-lg border border-border bg-canvas px-3 py-1.5 text-sm text-text-primary outline-none transition-all focus:border-status-success">
            {["English (US)", "English (UK)", "Danish", "Swedish", "Norwegian"].map((l) => <option key={l}>{l}</option>)}
          </select>
        </Row>
      </Card>
    </div>
  );
}

function SecuritySection() {
  const [twoFA, setTwoFA] = useState(false);
  const [alerts, setAlerts] = useState(true);
  const sessions = [
    { device: "MacBook Pro 16″", loc: "Copenhagen, DK", time: "Active now", current: true },
    { device: "iPhone 15 Pro", loc: "Copenhagen, DK", time: "2 hours ago", current: false },
  ];

  return (
    <div className="space-y-6">
      <SectionHeading title="Security" sub="Manage your password, sessions, and authentication settings." />
      <Card>
        <div className="flex items-center gap-4 border-b border-border px-5 py-4">
          <div className="min-w-0 flex-1"><p className="text-sm font-medium text-text-primary">Password</p><p className="mt-0.5 text-xs text-text-secondary">Last changed 3 months ago</p></div>
          <button type="button" className="shrink-0 rounded-lg border border-border px-3 py-1.5 text-xs font-medium text-text-primary transition-all hover:bg-canvas">Change password</button>
        </div>
        <Row label="Two-factor authentication" sub="Require a second form of verification on sign-in"><Toggle on={twoFA} set={setTwoFA} /></Row>
        <Row label="Sign-in alerts" sub="Notify me when my account is accessed from a new device" last><Toggle on={alerts} set={setAlerts} /></Row>
      </Card>
      <div className="space-y-2">
        <GroupLabel>Active Sessions</GroupLabel>
        <Card>
          {sessions.map((s, i) => (
            <div key={s.device} className={cn("flex items-center gap-4 px-5 py-4", i < sessions.length - 1 && "border-b border-border") }>
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2"><p className="text-sm font-medium text-text-primary">{s.device}</p>{s.current && <span className="rounded-full bg-status-success/10 px-1.5 py-0.5 text-[9px] font-semibold uppercase leading-none tracking-[0.06em] text-status-success">Current</span>}</div>
                <p className="mt-0.5 text-xs text-text-secondary">{s.loc} · {s.time}</p>
              </div>
              {!s.current && <button type="button" className="shrink-0 text-xs font-medium text-status-danger transition-colors hover:text-status-danger/80">Revoke</button>}
            </div>
          ))}
        </Card>
      </div>
    </div>
  );
}

function BillingSection() {
  return (
    <div className="space-y-5">
      <SectionHeading title="Billing" sub="Manage your subscription plan, usage, and payment details." />
      <Card>
        <div className="border-b border-border px-5 py-5">
          <div className="flex items-start justify-between gap-4">
            <div>
              <div className="mb-1 flex items-center gap-2"><p className="text-sm font-semibold text-text-primary">Pro Plan</p><span className="rounded-full bg-black/5 px-1.5 py-0.5 text-[9px] font-semibold uppercase leading-none tracking-[0.06em] text-text-primary">Active</span></div>
              <p className="text-xs text-text-secondary">$29 / month · Renews Jul 21, 2026</p>
            </div>
            <button type="button" className="shrink-0 rounded-lg border border-border px-3 py-1.5 text-xs font-medium text-text-primary transition-all hover:bg-canvas">Manage plan</button>
          </div>
        </div>
        <div className="border-b border-border px-5 py-4">
          <p className="mb-3 text-sm font-medium text-text-primary">AI usage this month</p>
          <div className="flex items-center gap-3"><div className="h-1.5 flex-1 overflow-hidden rounded-full bg-canvas"><div className="h-full w-[62%] rounded-full bg-status-success" /></div><span className="shrink-0 text-xs tabular-nums text-text-secondary">6,200 / 10,000 tokens</span></div>
        </div>
        <Row label="Payment method" sub="Visa ending in 4242 · Expires 08/27" last>
          <button type="button" className="rounded-lg border border-border px-3 py-1.5 text-xs font-medium text-text-primary transition-all hover:bg-canvas">Update</button>
        </Row>
      </Card>
    </div>
  );
}

function DangerSection() {
  const [step, setStep] = useState<"idle" | "confirm" | "deleting">("idle");

  async function confirmDelete() {
    setStep("deleting");
    await new Promise((resolve) => setTimeout(resolve, 1600));
    setStep("idle");
  }

  return (
    <div className="space-y-5">
      <SectionHeading title="Danger Zone" sub="Irreversible actions that permanently affect your account." />
      <div className="overflow-hidden rounded-xl border border-status-danger/20 bg-status-danger/[0.06]">
        <div className="px-5 py-5">
          <div className="flex flex-wrap items-start justify-between gap-4 sm:flex-nowrap">
            <div className="min-w-0">
              <p className="text-sm font-semibold text-text-primary">Delete account</p>
              <p className="mt-1 max-w-sm text-xs leading-relaxed text-text-secondary">Permanently remove your account and all associated data. This action cannot be undone.</p>
            </div>
            {step === "idle" && <button type="button" onClick={() => setStep("confirm")} className="shrink-0 rounded-lg bg-status-danger px-4 py-2 text-sm font-semibold text-white transition-all hover:bg-status-danger/90 active:scale-[0.99]">Delete account</button>}
            {step === "confirm" && (
              <div className="flex shrink-0 flex-wrap items-center gap-2">
                <button type="button" onClick={() => setStep("idle")} className="rounded-lg border border-border px-3 py-1.5 text-xs font-medium text-text-secondary transition-all hover:bg-surface">Cancel</button>
                <button type="button" onClick={confirmDelete} className="flex items-center gap-1.5 rounded-lg bg-status-danger px-3 py-1.5 text-xs font-semibold text-white transition-all hover:bg-status-danger/90">Yes, delete my account</button>
              </div>
            )}
            {step === "deleting" && <div className="flex items-center gap-2 text-sm text-text-secondary"><Loader2 className="h-4 w-4 animate-spin text-status-danger" />Deleting…</div>}
          </div>
        </div>
      </div>
    </div>
  );
}

function Footer() {
  return (
    <div className="mt-14 border-t border-border pt-6 text-[11px] text-text-secondary">
      <p>
        © 2026 FolioDesk · {[
          "Privacy",
          "Terms",
          "API Status",
          "Changelog",
        ].map((label, index, all) => (
          <span key={label}>
            <span className="cursor-pointer transition-colors hover:text-text-primary">{label}</span>
            {index < all.length - 1 && " · "}
          </span>
        ))}
      </p>
    </div>
  );
}

export default function SettingsPage() {
  const [active, setActive] = useState<Section>("profile");

  return (
    <>
        <div className="flex flex-grow flex-1 flex-col overflow-hidden lg:hidden">
          <div className="shrink-0 border-b border-border bg-surface"><SettingsNav active={active} onChange={setActive} /></div>
          <main className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
            {renderSection(active)}
            <Footer />
          </main>
        </div>

        <div className="hidden flex-1 min-h-0 overflow-hidden lg:flex">
          <aside className="w-52 shrink-0 overflow-hidden border-r border-border bg-surface">
            <SettingsNav active={active} onChange={setActive} />
          </aside>
          <div className="flex min-w-0 flex-1 overflow-y-auto">
            <div className="flex min-h-full w-full">
              <main className="min-w-0 flex-1 px-10 py-8">
                {renderSection(active)}
                <Footer />
              </main>
              <aside className="w-72 shrink-0 border-l border-border bg-surface">
                <div className="sticky top-0 space-y-5 px-6 py-8"><ContextPanel section={active} /></div>
              </aside>
            </div>
          </div>
        </div>
    </>
  );
}
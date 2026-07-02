"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  CalendarDays,
  Check,
  Code2,
  FileText,
  Rocket,
  Zap,
} from "lucide-react";

const ONBOARD_KEY = "devpilot_onboarded";

function cn(...classes: (string | boolean | undefined | null)[]) {
  return classes.filter(Boolean).join(" ");
}

/** Forces dark theme while mounted, restores on unmount. */
function useForceDark() {
  useEffect(() => {
    const root = document.documentElement;
    const wasDark = root.classList.contains("dark");
    root.classList.add("dark");
    return () => { if (!wasDark) root.classList.remove("dark"); };
  }, []);
}

/* ── Backdrop ──────────────────────────────────────────────────────────── */

function Backdrop() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div
        className="absolute inset-0 opacity-[0.032]"
        style={{
          backgroundImage:
            "linear-gradient(rgb(255 255 255) 1px,transparent 1px),linear-gradient(90deg,rgb(255 255 255) 1px,transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />
      <div className="blob-move absolute -top-32 -left-32 w-[520px] h-[520px] rounded-full bg-accent-green/[0.07] blur-[130px]" />
      <div
        className="blob-move absolute -bottom-40 -right-20 w-[540px] h-[540px] rounded-full bg-accent/[0.07] blur-[140px]"
        style={{ animationDelay: "3s" }}
      />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] rounded-full bg-accent-green/[0.025] blur-[90px]" />
      <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-canvas/70 to-transparent" />
    </div>
  );
}

/* ── Logo ──────────────────────────────────────────────────────────────── */

function Logo() {
  return (
    <div className="flex items-center gap-2.5">
      <div className="relative w-8 h-8 rounded-lg bg-accent-green flex items-center justify-center font-bold text-sm text-canvas select-none overflow-hidden shadow-md shadow-accent-green/30">
        <span className="relative z-10">D</span>
        <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent" />
      </div>
      <span className="text-[15px] font-semibold tracking-tight text-text-primary">DevPilot</span>
    </div>
  );
}

/* ── Eyebrow badge ─────────────────────────────────────────────────────── */

function EyebrowBadge({ label }: { label: string }) {
  return (
    <span className="au inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-accent-green/25 bg-accent-green/10 text-[11px] font-semibold tracking-wider uppercase text-accent-green mb-6">
      <span className="w-1.5 h-1.5 rounded-full bg-accent-green animate-pulse" />
      {label}
    </span>
  );
}

/* ── Step 1: Welcome ───────────────────────────────────────────────────── */

const SATELLITES = [
  { Icon: FileText,    label: "Specs",    color: "text-status-success", bg: "bg-status-success/10", pos: "top-1 left-1"    },
  { Icon: CalendarDays,label: "Plan",     color: "text-accent",         bg: "bg-accent/10",         pos: "top-1 right-1"   },
  { Icon: Code2,       label: "Code",     color: "text-status-success", bg: "bg-status-success/10", pos: "bottom-1 left-1" },
  { Icon: Rocket,      label: "Ship",     color: "text-status-warning", bg: "bg-status-warning/10", pos: "bottom-1 right-1"},
];

function WelcomeVisual() {
  return (
    <div className="relative w-60 h-60 mx-auto mb-2">
      <div className="absolute inset-0 rounded-full border border-accent-green/10" />
      <div className="absolute inset-8 rounded-full border border-border-soft/30" />

      {/* Core */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="relative">
          <span className="absolute inset-0 rounded-2xl bg-accent-green/30" style={{ animation: "ringPulse 2.6s ease-out infinite" }} />
          <span className="absolute inset-0 rounded-2xl bg-accent-green/30" style={{ animation: "ringPulse 2.6s ease-out infinite", animationDelay: "1.3s" }} />
          <div className="relative w-20 h-20 rounded-2xl bg-accent-green flex items-center justify-center shadow-xl shadow-accent-green/30 ai overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent" />
            <img src="/AI.png" alt="AI Icon" className="relative z-10 w-11 h-11 object-contain" />
          </div>
        </div>
      </div>

      {/* Satellites */}
      {SATELLITES.map(({ Icon, label, color, bg, pos }, i) => (
        <div key={label} className={cn("absolute animate-[nodePop_0.5s_both]", pos)} style={{ animationDelay: `${i * 0.14}s` }}>
          <div className="float-y w-14 h-14 rounded-xl bg-surface border border-border-soft/70 flex flex-col items-center justify-center gap-1 shadow-lg" style={{ animationDelay: `${i * 0.2}s` }}>
            <div className={cn("w-6 h-6 rounded-md flex items-center justify-center", bg)}>
              <Icon className={cn("w-3.5 h-3.5", color)} />
            </div>
            <span className="text-[8px] font-medium text-text-muted">{label}</span>
          </div>
        </div>
      ))}
    </div>
  );
}

/* ── Step 2: Pipeline ──────────────────────────────────────────────────── */

const PHASES = [
  { label: "Requirements", Icon: FileText,     color: "text-status-success", bg: "bg-status-success/10", status: "done"    },
  { label: "Architecture",  Icon: CalendarDays, color: "text-accent",         bg: "bg-accent/10",         status: "done"    },
  { label: "Code",          Icon: Code2,        color: "text-status-success", bg: "bg-status-success/10", status: "active"  },
  { label: "Deployment",    Icon: Rocket,       color: "text-status-warning", bg: "bg-status-warning/10", status: "pending" },
];

function PipelineVisual() {
  return (
    <div className="w-full max-w-lg mx-auto mb-2 space-y-3">
      <div className="relative h-px bg-border mx-4">
        <div
          className="absolute -top-[3px] w-2 h-2 rounded-full bg-accent-green shadow-[0_0_8px_2px_rgba(34,197,94,0.45)]"
          style={{ animation: "flowMove 3.2s linear infinite" }}
        />
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
        {PHASES.map(({ label, Icon, color, bg, status }, i) => (
          <div key={label} className="au" style={{ animationDelay: `${0.06 * i}s` }}>
            <div className={cn(
              "rounded-xl border bg-surface-container/50 backdrop-blur-sm px-2.5 py-3.5 flex flex-col items-center gap-2 text-center transition-transform hover:-translate-y-0.5",
              status === "active" ? "border-accent-green/35 shadow-sm shadow-accent-green/10" : "border-border-soft/60"
            )}>
              <div className={cn("w-9 h-9 rounded-lg flex items-center justify-center", bg)}>
                <Icon className={cn("w-4 h-4", color)} />
              </div>
              <span className="text-[10px] font-medium text-text-secondary leading-tight">{label}</span>
              <div className="flex items-center gap-1">
                {status === "done"    && <Check className="w-2.5 h-2.5 text-status-success" strokeWidth={2.5} />}
                {status === "active"  && <span className="w-1.5 h-1.5 rounded-full bg-accent-green animate-pulse" />}
                {status === "pending" && <span className="w-1.5 h-1.5 rounded-full bg-border" />}
                <span className={cn("text-[9px] font-mono uppercase tracking-wide",
                  status === "done"    ? "text-status-success" :
                  status === "active"  ? "text-accent-green"   : "text-text-muted"
                )}>{status}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── Step 3: Copilot ───────────────────────────────────────────────────── */

function CopilotDots() {
  return (
    <span className="flex items-center gap-1.5" aria-hidden>
      {[0, 1, 2].map((i) => (
        <span key={i} className="h-2 w-2 rounded-full bg-accent-green"
          style={{ animation: `pulse-dot 1.6s ease-in-out ${i * 0.22}s infinite` }} />
      ))}
    </span>
  );
}

function CopilotVisual() {
  return (
    <div className="w-full max-w-sm mx-auto mb-2">
      <style>{`
        @keyframes pulse-dot {
          0%,100%{opacity:.4;transform:scale(.85)}
          50%{opacity:1;transform:scale(1)}
        }
      `}</style>
      <div className="rounded-2xl border border-[#2d3d38] bg-[#1e2b27] shadow-2xl overflow-hidden ai">
        {/* Header — matches FloatingCopilot */}
        <div className="flex items-center gap-2.5 px-4 py-3 border-b border-[#2d3d38]">
          <CopilotDots />
          <span className="text-[10px] font-semibold tracking-[0.15em] text-accent-green uppercase">AI Copilot</span>
        </div>
        {/* Messages */}
        <div className="px-4 py-3 space-y-2.5">
          <div className="au d1 flex justify-end">
            <div className="max-w-[75%] rounded-2xl rounded-br-sm bg-accent-green px-3.5 py-2.5 text-xs text-canvas font-medium leading-relaxed">
              What&apos;s blocking Sprint 42?
            </div>
          </div>
          <div className="au d2 flex justify-start">
            <div className="max-w-[82%] rounded-2xl rounded-bl-sm bg-[#2a3330] px-3.5 py-2.5 text-xs text-[#e2e8e4] leading-relaxed">
              2 issues blocked on FD-104 — Stripe webhook needs review before QA can continue.
            </div>
          </div>
          <div className="au d3 flex justify-start">
            <div className="rounded-2xl rounded-bl-sm bg-[#2a3330] px-3.5 py-2.5 flex items-center gap-1.5">
              {[".15s", ".3s", "0s"].map((d, i) => (
                <span key={i} className="w-1.5 h-1.5 rounded-full bg-[#6b8c7e]"
                  style={{ animation: "typingDot 1.2s infinite", animationDelay: d }} />
              ))}
            </div>
          </div>
        </div>
        {/* Input bar */}
        <div className="flex items-center gap-2 mx-4 mb-3 px-3 py-2 rounded-xl border border-[#2d3d38] bg-black/10">
          <span className="text-xs text-[#6b8c7e] flex-1">Ask anything about your project…</span>
          <div className="w-5 h-5 rounded-md bg-accent-green/20 flex items-center justify-center">
            <Zap className="w-3 h-3 text-accent-green" />
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Steps data ────────────────────────────────────────────────────────── */

interface Step { eyebrow: string; title: string; description: string; visual: React.ReactNode; }

function buildSteps(): Step[] {
  return [
    {
      eyebrow: "Welcome to DevPilot",
      title: "One command center for your whole SDLC",
      description: "DevPilot brings requirements, architecture, code, and deployment into a single AI-powered workspace — so nothing falls through the cracks.",
      visual: <WelcomeVisual />,
    },
    {
      eyebrow: "How it works",
      title: "From idea to production, in sync",
      description: "Move through every phase of the pipeline with shared context. Update a requirement and DevPilot flags what it affects downstream — automatically.",
      visual: <PipelineVisual />,
    },
    {
      eyebrow: "Your AI teammate",
      title: "Ask your Copilot anything, anytime",
      description: "Surface blockers, generate code, explain architecture decisions, or check deployment status — the Copilot is one click away on every page.",
      visual: <CopilotVisual />,
    },
  ];
}

/* ── Main ──────────────────────────────────────────────────────────────── */

export function OnboardingScreen() {
  useForceDark();
  const router = useRouter();
  const steps = useMemo(buildSteps, []);
  const [index, setIndex] = useState(0);
  const [leaving, setLeaving] = useState(false);
  const isLast = index === steps.length - 1;

  function finish() {
    try { window.localStorage.setItem(ONBOARD_KEY, "1"); } catch { /* noop */ }
    setLeaving(true);
    setTimeout(() => router.push("/dashboard"), 260);
  }

  function next() { if (isLast) { finish(); return; } setIndex((i) => Math.min(i + 1, steps.length - 1)); }
  function back() { setIndex((i) => Math.max(i - 1, 0)); }

  const step = steps[index];

  return (
    <div className="relative min-h-screen w-full bg-canvas overflow-hidden flex flex-col">
      <Backdrop />

      <header className="relative z-10 flex items-center justify-between px-6 sm:px-10 py-6">
        <Logo />
        <button onClick={finish} className="text-sm text-text-muted hover:text-text-secondary transition-colors">
          Skip
        </button>
      </header>

      <main className="relative z-10 flex-1 flex items-center justify-center px-6 py-4">
        <div
          key={index}
          className={cn("w-full max-w-2xl text-center", leaving ? "opacity-0 transition-opacity duration-200" : "step-in")}
        >
          <EyebrowBadge label={step.eyebrow} />
          {step.visual}
          <h1 className="au d1 text-2xl sm:text-[28px] font-semibold text-text-primary mt-6 mb-3 leading-tight tracking-tight">
            {step.title}
          </h1>
          <p className="au d2 text-sm sm:text-[15px] text-text-secondary max-w-md mx-auto leading-relaxed">
            {step.description}
          </p>
        </div>
      </main>

      <footer className="relative z-10 flex flex-col items-center gap-5 px-6 pb-10">
        {/* Progress dots — clickable */}
        <div className="flex items-center gap-1.5">
          {steps.map((_, i) => (
            <button
              key={i}
              onClick={() => setIndex(i)}
              aria-label={`Go to step ${i + 1}`}
              className={cn(
                "h-1.5 rounded-full transition-all duration-300",
                i === index  ? "w-6 bg-accent-green" :
                i < index    ? "w-1.5 bg-accent-green/40" :
                               "w-1.5 bg-border"
              )}
            />
          ))}
        </div>

        {/* Navigation buttons */}
        <div className="flex items-center gap-2.5">
          {index > 0 && (
            <button
              onClick={back}
              className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-sm font-medium text-text-secondary hover:text-text-primary border border-border-soft hover:border-border transition-all duration-150 active:scale-[0.98]"
            >
              <ArrowLeft className="w-4 h-4" />
              Back
            </button>
          )}
          <button
            onClick={next}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-canvas bg-accent-green hover:bg-accent-green/90 active:scale-[0.98] transition-all duration-150 shadow-lg shadow-accent-green/25"
          >
            {isLast ? (<>Enter DevPilot <Check className="w-4 h-4" /></>) : (<>Continue <ArrowRight className="w-4 h-4" /></>)}
          </button>
        </div>

        <span className="text-[11px] text-text-muted font-mono tracking-wider tabular-nums">
          {index + 1} / {steps.length}
        </span>
      </footer>
    </div>
  );
}
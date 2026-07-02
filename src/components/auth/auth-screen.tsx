"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowRight,
  BarChart2,
  Check,
  ChevronRight,
  Eye,
  EyeOff,
  Loader2,
  Shield,
  X,
  Users,
  Zap,
} from "lucide-react";

function cn(...classes: (string | boolean | undefined | null)[]) {
  return classes.filter(Boolean).join(" ");
}

function getPasswordStrength(password: string): { score: number; label: string; color: string } {
  if (!password) return { score: 0, label: "", color: "" };
  let score = 0;
  if (password.length >= 8) score++;
  if (password.length >= 12) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;
  if (score <= 1) return { score, label: "Weak", color: "rgb(var(--status-danger))" };
  if (score <= 3) return { score, label: "Fair", color: "rgb(var(--status-warning))" };
  if (score === 4) return { score, label: "Good", color: "#3b82f6" };
  return { score, label: "Strong", color: "rgb(var(--status-success))" };
}

function BrandPanel({ mode }: { mode: "login" | "signup" }) {
  const features = [
    { icon: Zap, text: "AI Copilot for sprint planning & blockers" },
    { icon: BarChart2, text: "Real-time project memory & analytics" },
    { icon: Users, text: "Team collaboration with live issue tracking" },
    { icon: Shield, text: "Enterprise-grade security & audit logs" },
  ];

  return (
    <div className="hidden lg:flex flex-col justify-between h-full bg-[#1b1b2e] text-white px-10 py-12 relative overflow-hidden">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      <div className="relative z-10 flex items-center gap-2.5">
        <div className="w-8 h-8 rounded-lg bg-accent-green flex items-center justify-center font-bold text-sm text-white select-none">
          D
        </div>
        <span className="text-base font-semibold tracking-tight">DevPilot</span>
      </div>

      <div className="relative z-10 flex-1 flex flex-col justify-center -mx-2 mt-10 mb-6">
        <div className="rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm p-4 max-w-[360px] mx-auto w-full">
          <div className="flex items-center justify-between mb-3">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-semibold">Sprint 42</span>
                <span className="text-[10px] font-medium bg-accent-green/20 text-accent-green px-2 py-0.5 rounded-full">
                  Active
                </span>
              </div>
              <div className="text-[10px] text-white/50 mt-0.5">16 / 44 pts · 36%</div>
            </div>
            <div className="text-[10px] text-white/40">Week 4 of 9</div>
          </div>

          <div className="h-1 bg-white/10 rounded-full mb-4 overflow-hidden">
            <div className="h-full w-[36%] bg-accent-green rounded-full" />
          </div>

          <div className="grid grid-cols-4 gap-2 mb-4">
            {[
              { n: "3", label: "Done", color: "#22c55e" },
              { n: "3", label: "In Progress", color: "#f59e0b" },
              { n: "2", label: "To Do", color: "#94a3b8" },
              { n: "2", label: "Bugs", color: "#ef4444" },
            ].map(({ n, label, color }) => (
              <div
                key={label}
                className="rounded-lg py-2 px-1 text-center"
                style={{ backgroundColor: `${color}14` }}
              >
                <div className="text-base font-bold" style={{ color }}>
                  {n}
                </div>
                <div className="text-[9px] mt-0.5" style={{ color: `${color}99` }}>
                  {label}
                </div>
              </div>
            ))}
          </div>

          <div className="space-y-1.5">
            {[
              { id: "FD-104", title: "Integrate Stripe payment intent", pts: "8 pts" },
              { id: "FD-105", title: "Build order tracking WebSocket", pts: "5 pts" },
              { id: "FD-106", title: "Fix menu item price rounding", pts: "2 pts" },
            ].map((item) => (
              <div key={item.id} className="flex items-center gap-2 text-[10px]">
                <span className="text-white/35 font-mono shrink-0">{item.id}</span>
                <span className="text-white/70 flex-1 truncate">{item.title}</span>
                <span className="text-white/35 shrink-0">{item.pts}</span>
              </div>
            ))}
          </div>

          <div className="mt-3 rounded-lg bg-[#252538] p-3 border border-white/5">
            <div className="flex items-center gap-1.5 mb-2">
              <div className="w-1.5 h-1.5 rounded-full bg-accent-green" />
              <span className="text-[9px] uppercase tracking-widest text-white/40">AI Copilot</span>
            </div>
            <div className="text-[10px] text-white/60 mb-2">
              Ask about blockers, priorities, or next actions.
            </div>
            <div className="space-y-1.5">
              {["Show open PRs", "What's blocked?"].map((s) => (
                <div
                  key={s}
                  className="flex items-center justify-between rounded-md bg-white/5 px-2 py-1.5"
                >
                  <span className="text-[10px] text-white/60">{s}</span>
                  <ChevronRight className="w-3 h-3 text-white/30" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="relative z-10">
        <h2 className="text-2xl font-semibold leading-snug mb-6 max-w-[280px]">
          {mode === "login"
            ? "Pick up right where your team left off."
            : "Ship faster with AI-powered project intelligence."}
        </h2>

        <ul className="space-y-3">
          {features.map(({ icon: Icon, text }) => (
            <li key={text} className="flex items-start gap-3">
              <div className="mt-0.5 w-5 h-5 rounded-md bg-accent-green/15 flex items-center justify-center shrink-0">
                <Icon className="w-3 h-3 text-accent-green" />
              </div>
              <span className="text-sm text-white/60 leading-snug">{text}</span>
            </li>
          ))}
        </ul>

        <p className="mt-8 text-xs text-white/30">
          © 2026 DevPilot · Privacy · Terms · API Status
        </p>
      </div>
    </div>
  );
}

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  rightEl?: React.ReactNode;
}

function FormInput({ label, error, rightEl, className, ...props }: InputProps) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-sm font-medium text-text-primary">{label}</label>
      <div className="relative">
        <input
          className={cn(
            "w-full px-3 py-2.5 rounded-lg text-sm bg-canvas border transition-all outline-none",
            error
              ? "border-status-danger bg-red-50/50 focus:ring-2 focus:ring-status-danger/20"
              : "border-border focus:border-accent-green focus:ring-2 focus:ring-accent-green/15",
            rightEl ? "pr-10" : undefined,
            className
          )}
          {...props}
        />
        {rightEl && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2">{rightEl}</div>
        )}
      </div>
      {error && (
        <p className="flex items-center gap-1 text-xs text-status-danger">
          <X className="w-3 h-3 shrink-0" />
          {error}
        </p>
      )}
    </div>
  );
}

function GoogleButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="w-full flex items-center justify-center gap-2.5 px-4 py-2.5 rounded-lg border border-border bg-surface text-sm font-medium text-text-primary hover:bg-canvas active:scale-[0.99] transition-all"
    >
      <svg width="16" height="16" viewBox="0 0 24 24">
        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
        <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
        <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
        <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
      </svg>
      Continue with Google
    </button>
  );
}

function GitHubButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="w-full flex items-center justify-center gap-2.5 px-4 py-2.5 rounded-lg border border-border bg-surface text-sm font-medium text-text-primary hover:bg-canvas active:scale-[0.99] transition-all"
    >
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M12 1C5.37 1 0 6.48 0 13.25c0 5.42 3.44 10.03 8.2 11.66.6.11.82-.27.82-.58 0-.28-.01-1.02-.02-2-3.34.75-4.04-1.66-4.04-1.66-.55-1.42-1.34-1.8-1.34-1.8-1.09-.76.08-.75.08-.75 1.2.09 1.83 1.26 1.83 1.26 1.07 1.88 2.81 1.34 3.5 1.03.11-.79.42-1.34.76-1.65-2.67-.31-5.47-1.38-5.47-6.15 0-1.36.47-2.48 1.24-3.36-.12-.31-.54-1.57.12-3.26 0 0 1.01-.33 3.31 1.28.96-.27 1.98-.41 3-.42 1.02.01 2.04.15 3 .42 2.29-1.61 3.3-1.28 3.3-1.28.66 1.69.24 2.95.12 3.26.77.88 1.24 2 1.24 3.36 0 4.78-2.8 5.84-5.48 6.14.43.38.82 1.12.82 2.25 0 1.63-.01 2.94-.01 3.34 0 .31.21.69.82.57C20.56 23.28 24 18.67 24 13.25 24 6.48 18.63 1 12 1z" />
      </svg>
      Continue with GitHub
    </button>
  );
}

function PasswordStrengthBar({ password }: { password: string }) {
  const { score, label, color } = getPasswordStrength(password);
  if (!password) return null;
  return (
    <div className="mt-1.5 space-y-1">
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((i) => (
          <div
            key={i}
            className="h-1 flex-1 rounded-full transition-all duration-300"
            style={{
              backgroundColor: i <= score ? color : "rgb(var(--border))",
            }}
          />
        ))}
      </div>
      {label && (
        <p className="text-xs" style={{ color }}>
          {label} password
        </p>
      )}
    </div>
  );
}

function OrDivider() {
  return (
    <div className="flex items-center gap-3 my-5">
      <div className="flex-1 h-px bg-border" />
      <span className="text-xs text-text-secondary font-medium">or</span>
      <div className="flex-1 h-px bg-border" />
    </div>
  );
}

function Logo() {
  return (
    <div className="flex items-center gap-2 mb-8">
      <div className="w-8 h-8 rounded-lg bg-[#1b1b2e] flex items-center justify-center font-bold text-sm text-white select-none">
        D
      </div>
      <span className="text-base font-semibold tracking-tight text-text-primary">DevPilot</span>
    </div>
  );
}

function LoginPage({ onSwitch }: { onSwitch: () => void }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const router = useRouter();

  function validate() {
    const e: typeof errors = {};
    if (!email) e.email = "Email is required.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) e.email = "Enter a valid email address.";
    if (!password) e.password = "Password is required.";
    else if (password.length < 6) e.password = "Password must be at least 6 characters.";
    return e;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setErrors({});
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1800));
    setLoading(false);
    setSuccess(true);

    let onboarded = true;
    try {
      window.localStorage.setItem("devpilot_auth", "1");
      onboarded = window.localStorage.getItem("devpilot_onboarded") === "1";
    } catch {
      /* ignore */
    }

    setTimeout(() => {
      router.push(onboarded ? "/dashboard" : "/onboarding");
    }, 1300);
  }

  if (success) {
    return (
      <div className="flex flex-col items-center justify-center h-full gap-4 px-8 text-center">
        <div className="w-14 h-14 rounded-full bg-accent-green/10 flex items-center justify-center mb-2">
          <Check className="w-7 h-7 text-accent-green" />
        </div>
        <h2 className="text-xl font-semibold text-text-primary">Welcome back!</h2>
        <p className="text-sm text-text-secondary max-w-[260px]">
          You&apos;re signed in. Redirecting you to your workspace…
        </p>
        <div className="mt-2 h-1 w-40 bg-canvas rounded-full overflow-hidden">
          <div className="h-full bg-accent-green rounded-full animate-[progress_1.5s_ease-out_forwards]" style={{ width: "100%" }} />
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col justify-center h-full px-4 sm:px-12 max-w-[460px] mx-auto w-full py-8 sm:py-12">
      <Logo />

      <h1 className="text-2xl font-semibold text-text-primary mb-1">Welcome back</h1>
      <p className="text-sm text-text-secondary mb-7">Sign in to continue to your workspace.</p>

      <div className="space-y-2.5">
        <GoogleButton onClick={() => {}} />
      </div>

      <OrDivider />

      <form onSubmit={handleSubmit} noValidate className="space-y-4">
        <FormInput
          label="Email"
          type="email"
          placeholder="you@company.com"
          autoComplete="email"
          value={email}
          onChange={(e) => { setEmail(e.target.value); setErrors((p) => ({ ...p, email: undefined })); }}
          error={errors.email}
        />

        <FormInput
          label="Password"
          type={showPassword ? "text" : "password"}
          placeholder="••••••••"
          autoComplete="current-password"
          value={password}
          onChange={(e) => { setPassword(e.target.value); setErrors((p) => ({ ...p, password: undefined })); }}
          error={errors.password}
          rightEl={
            <button
              type="button"
              onClick={() => setShowPassword((v) => !v)}
              className="text-text-secondary hover:text-text-primary transition-colors"
              tabIndex={-1}
            >
              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          }
        />

        <div className="flex items-center justify-between pt-0.5">
          <label className="flex items-center gap-2 cursor-pointer select-none">
            <div
              onClick={() => setRememberMe((v) => !v)}
              className={cn(
                "w-4 h-4 rounded flex items-center justify-center border transition-all cursor-pointer",
                rememberMe
                  ? "bg-[#1b1b2e] border-[#1b1b2e]"
                  : "border-border bg-surface hover:border-text-muted"
              )}
            >
              {rememberMe && <Check className="w-2.5 h-2.5 text-white" strokeWidth={3} />}
            </div>
            <span className="text-sm text-text-secondary">Remember me</span>
          </label>
          <button
            type="button"
            className="text-sm text-accent-green hover:text-accent-green/80 font-medium transition-colors"
          >
            Forgot password?
          </button>
        </div>

        <button
          type="submit"
          disabled={loading}
          className={cn(
            "mt-1 w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold text-white transition-all",
            loading
              ? "bg-[#1b1b2e]/60 cursor-not-allowed"
              : "bg-[#1b1b2e] hover:bg-[#252538] active:scale-[0.99]"
          )}
        >
          {loading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Signing in…
            </>
          ) : (
            <>
              Sign in
              <ArrowRight className="w-4 h-4" />
            </>
          )}
        </button>
      </form>

      <p className="mt-6 text-center text-sm text-text-secondary">
        Don&apos;t have an account?{" "}
        <button onClick={onSwitch} className="text-accent-green hover:text-accent-green/80 font-medium transition-colors">
          Create one
        </button>
      </p>
    </div>
  );
}

function SignUpPage({ onSwitch }: { onSwitch: () => void }) {
  const router = useRouter();
  const [form, setForm] = useState({ name: "", email: "", password: "", confirm: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [errors, setErrors] = useState<Partial<typeof form & { terms: string }>>({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  function set(key: keyof typeof form) {
    return (e: React.ChangeEvent<HTMLInputElement>) => {
      setForm((f) => ({ ...f, [key]: e.target.value }));
      setErrors((p) => ({ ...p, [key]: undefined }));
    };
  }

  function validate() {
    const e: typeof errors = {};
    if (!form.name.trim()) e.name = "Full name is required.";
    if (!form.email) e.email = "Email is required.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = "Enter a valid email.";
    if (!form.password) e.password = "Password is required.";
    else if (form.password.length < 8) e.password = "Use at least 8 characters.";
    if (!form.confirm) e.confirm = "Please confirm your password.";
    else if (form.confirm !== form.password) e.confirm = "Passwords don't match.";
    if (!agreeTerms) e.terms = "You must agree to the terms.";
    return e;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setErrors({});
    setLoading(true);
    await new Promise((r) => setTimeout(r, 2000));
    setLoading(false);
    setSuccess(true);

    try {
      window.localStorage.setItem("devpilot_auth", "1");
      window.localStorage.removeItem("devpilot_onboarded");
    } catch {
      /* ignore */
    }

    setTimeout(() => router.push("/onboarding"), 1600);
  }

  if (success) {
    return (
      <div className="flex flex-col items-center justify-center h-full gap-4 px-8 text-center">
        <div className="w-14 h-14 rounded-full bg-accent-green/10 flex items-center justify-center mb-2">
          <Check className="w-7 h-7 text-accent-green" />
        </div>
        <h2 className="text-xl font-semibold text-text-primary">Account created!</h2>
        <p className="text-sm text-text-secondary max-w-[260px]">
          Welcome to DevPilot. Setting up your first workspace…
        </p>
        <div className="mt-3 flex flex-col items-start w-full max-w-[260px] gap-2">
          {["Account created", "Workspace initialised", "AI Copilot activated"].map((step) => (
            <div key={step} className="flex items-center gap-2.5">
              <div className="w-4 h-4 rounded-full bg-accent-green/15 flex items-center justify-center shrink-0">
                <Check className="w-2.5 h-2.5 text-accent-green" strokeWidth={3} />
              </div>
              <span className="text-sm text-text-secondary">{step}</span>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col justify-center h-full px-4 sm:px-12 max-w-[460px] mx-auto w-full py-8 sm:py-12">
      <Logo />

      <h1 className="text-2xl font-semibold text-text-primary mb-1">Create your account</h1>
      <p className="text-sm text-text-secondary mb-7">Start shipping faster with AI-powered project intelligence.</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
        <GoogleButton onClick={() => {}} />
        <GitHubButton onClick={() => {}} />
      </div>

      <OrDivider />

      <form onSubmit={handleSubmit} noValidate className="space-y-4">
        <FormInput
          label="Full Name"
          type="text"
          placeholder="Alex Johnson"
          autoComplete="name"
          value={form.name}
          onChange={set("name")}
          error={errors.name}
        />

        <FormInput
          label="Work Email"
          type="email"
          placeholder="you@company.com"
          autoComplete="email"
          value={form.email}
          onChange={set("email")}
          error={errors.email}
        />

        <div>
          <FormInput
            label="Password"
            type={showPassword ? "text" : "password"}
            placeholder="Min. 8 characters"
            autoComplete="new-password"
            value={form.password}
            onChange={set("password")}
            error={errors.password}
            rightEl={
              <button
                type="button"
                onClick={() => setShowPassword((v) => !v)}
                className="text-text-secondary hover:text-text-primary transition-colors"
                tabIndex={-1}
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            }
          />
          <PasswordStrengthBar password={form.password} />
        </div>

        <FormInput
          label="Confirm Password"
          type={showConfirm ? "text" : "password"}
          placeholder="Re-enter your password"
          autoComplete="new-password"
          value={form.confirm}
          onChange={set("confirm")}
          error={errors.confirm}
          rightEl={
            <button
              type="button"
              onClick={() => setShowConfirm((v) => !v)}
              className="text-text-secondary hover:text-text-primary transition-colors"
              tabIndex={-1}
            >
              {showConfirm ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          }
        />

        <div className="space-y-1">
          <label className="flex items-start gap-2.5 cursor-pointer select-none">
            <div
              onClick={() => { setAgreeTerms((v) => !v); setErrors((p) => ({ ...p, terms: undefined })); }}
              className={cn(
                "mt-0.5 w-4 h-4 rounded flex items-center justify-center border transition-all cursor-pointer shrink-0",
                agreeTerms
                  ? "bg-[#1b1b2e] border-[#1b1b2e]"
                  : errors.terms
                  ? "border-status-danger bg-red-50/40"
                  : "border-border bg-surface hover:border-text-muted"
              )}
            >
              {agreeTerms && <Check className="w-2.5 h-2.5 text-white" strokeWidth={3} />}
            </div>
            <span className="text-sm text-text-secondary leading-snug">
              I agree to the{" "}
              <span className="text-accent-green hover:text-accent-green/80 cursor-pointer font-medium">
                Terms of Service
              </span>{" "}
              and{" "}
              <span className="text-accent-green hover:text-accent-green/80 cursor-pointer font-medium">
                Privacy Policy
              </span>
            </span>
          </label>
          {errors.terms && (
            <p className="flex items-center gap-1 text-xs text-status-danger ml-6">
              <X className="w-3 h-3 shrink-0" />
              {errors.terms}
            </p>
          )}
        </div>

        <button
          type="submit"
          disabled={loading}
          className={cn(
            "mt-1 w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold text-white transition-all",
            loading
              ? "bg-[#1b1b2e]/60 cursor-not-allowed"
              : "bg-[#1b1b2e] hover:bg-[#252538] active:scale-[0.99]"
          )}
        >
          {loading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Creating account…
            </>
          ) : (
            <>
              Create account
              <ArrowRight className="w-4 h-4" />
            </>
          )}
        </button>
      </form>

      <p className="mt-6 text-center text-sm text-text-secondary">
        Already have an account?{" "}
        <button onClick={onSwitch} className="text-accent-green hover:text-accent-green/80 font-medium transition-colors">
          Sign in
        </button>
      </p>
    </div>
  );
}

export function AuthScreen({ initialMode }: { initialMode: "login" | "signup" }) {
  const [mode, setMode] = useState<"login" | "signup">(initialMode);
  const [animating, setAnimating] = useState(false);

  useEffect(() => {
    setMode(initialMode);
  }, [initialMode]);

  function switchMode() {
    if (animating) return;
    setAnimating(true);
    setTimeout(() => {
      setMode((current) => (current === "login" ? "signup" : "login"));
      setAnimating(false);
    }, 180);
  }

  return (
    <div
      className="min-h-screen w-full grid lg:grid-cols-[480px_1fr] bg-canvas"
      style={{ fontFamily: "'Inter', sans-serif" }}
    >
      <BrandPanel mode={mode} />
      <div className="flex items-center justify-center min-h-screen lg:min-h-0 overflow-y-auto">
        <div className="w-full transition-opacity duration-180" style={{ opacity: animating ? 0 : 1 }}>
          {mode === "login" ? <LoginPage onSwitch={switchMode} /> : <SignUpPage onSwitch={switchMode} />}
        </div>
      </div>
    </div>
  );
}
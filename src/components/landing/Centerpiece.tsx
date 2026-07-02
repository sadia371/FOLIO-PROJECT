"use client";
import { AnimatePresence, motion, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";

const stages = [
  { id: "prompt", label: "Prompt" },
  { id: "prd", label: "Requirements" },
  { id: "arch", label: "Architecture" },
  { id: "code", label: "Code Intelligence" },
  { id: "deploy", label: "Deployment" },
] as const;

type StageId = (typeof stages)[number]["id"];

export function Centerpiece() {
  const [active, setActive] = useState<StageId>("prompt");
  const [paused, setPaused] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const inView = useInView(containerRef, { margin: "0px 0px -20% 0px" });

  useEffect(() => {
    if (paused || !inView) return;
    const t = setInterval(() => {
      setActive((curr) => {
        const i = stages.findIndex((s) => s.id === curr);
        return stages[(i + 1) % stages.length].id;
      });
    }, 3200);
    return () => clearInterval(t);
  }, [paused, inView]);

  return (
    <div
      ref={containerRef}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      className="relative mx-auto w-full max-w-5xl"
    >
      {/* Backdrop */}
      <div className="pointer-events-none absolute inset-0 -z-10 lp-bg-aurora" />

      {/* Stage selector rail */}
      <div className="mx-auto mb-6 flex w-full max-w-2xl items-center justify-between gap-1 rounded-full lp-glass p-1 text-[12px]">
        {stages.map((s) => {
          const isActive = s.id === active;
          return (
            <button
              key={s.id}
              onClick={() => setActive(s.id)}
              className="relative flex-1 rounded-full px-3 py-1.5 font-medium transition-colors"
            >
              {isActive && (
                <motion.span
                  layoutId="stage-pill"
                  className="absolute inset-0 rounded-full lp-bg-fore"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
              <span className={`relative z-10 ${isActive ? "lp-text-back" : "lp-text-muted"}`}>
                {s.label}
              </span>
            </button>
          );
        })}
      </div>

      {/* Canvas */}
      <div className="relative overflow-hidden rounded-3xl border lp-hairline lp-bg-elevated lp-shadow-float">
        <div className="absolute inset-0 lp-bg-grid opacity-60" />
        <div className="relative grid min-h-[440px] grid-cols-12 gap-0">
          {/* Left: input column */}
          <aside className="col-span-12 border-b lp-hairline p-6 md:col-span-4 md:border-b-0 md:border-r">
            <div className="mb-4 flex items-center gap-2 text-[11px] uppercase tracking-[0.18em] lp-text-muted">
              <span className="inline-block h-1.5 w-1.5 animate-pulse rounded-full lp-bg-signal" />
              Live prompt
            </div>
            <p className="lp-font-display text-[17px] leading-snug tracking-tight lp-text-fore">
              &ldquo;Build a multi-tenant analytics dashboard with role-based access, Stripe billing, and a webhook layer.&rdquo;
            </p>
            <div className="mt-6 space-y-2">
              {["Next.js 14", "Postgres + RLS", "Stripe", "Webhooks"].map((t) => (
                <div key={t} className="flex items-center gap-2 text-[12px] lp-text-muted">
                  <Check />
                  {t}
                </div>
              ))}
            </div>
          </aside>

          {/* Right: morphing stage */}
          <section className="relative col-span-12 p-6 md:col-span-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, y: 14, filter: "blur(6px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: -10, filter: "blur(6px)" }}
                transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                className="h-full"
              >
                {active === "prompt" && <PromptStage />}
                {active === "prd" && <PRDStage />}
                {active === "arch" && <ArchStage />}
                {active === "code" && <CodeStage />}
                {active === "deploy" && <DeployStage />}
              </motion.div>
            </AnimatePresence>
          </section>
        </div>

        {/* Footer status bar */}
        <div className="flex items-center justify-between border-t lp-hairline px-5 py-2.5 font-mono text-[11px] lp-text-muted">
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full lp-bg-signal" /> reasoning
            </span>
            <span>/</span>
            <span>devpilot.run/session/8af2</span>
          </div>
          <div className="hidden items-center gap-3 sm:flex">
            <span>tokens 24,180</span>
            <span>/</span>
            <span>1.4s</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function Check() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
      <path d="M2.5 6.5L5 9L9.5 3.5" stroke="hsl(var(--lp-signal))" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function PromptStage() {
  const lines = [
    "-> Parsing intent",
    "-> Extracting entities: tenants, roles, billing",
    "-> Drafting acceptance criteria",
    "-> Reasoning across 14 documents",
  ];
  return (
    <div className="flex h-full flex-col">
      <Heading kicker="Stage 01" title="Reasoning over the request" />
      <div className="mt-5 space-y-1.5 font-mono text-[12px] lp-text-muted">
        {lines.map((l, i) => (
          <motion.div
            key={l}
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.12, duration: 0.4 }}
            className="flex items-center gap-2"
          >
            <span className="lp-text-signal">{l}</span>
          </motion.div>
        ))}
        <div className="mt-3 h-1 w-full overflow-hidden rounded-full lp-bg-secondary">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: "72%" }}
            transition={{ duration: 1.4, ease: "easeOut" }}
            className="h-full lp-bg-fore"
          />
        </div>
      </div>
    </div>
  );
}

function PRDStage() {
  const items = [
    { t: "Tenant isolation", d: "Schema-per-tenant with RLS policies" },
    { t: "Role matrix", d: "Owner / Admin / Member / Viewer" },
    { t: "Billing", d: "Stripe metered + usage caps" },
    { t: "Webhooks", d: "Signed payloads, retries, DLQ" },
  ];
  return (
    <div>
      <Heading kicker="Stage 02" title="A requirements doc, fully reasoned" />
      <div className="mt-5 grid grid-cols-2 gap-2.5">
        {items.map((i, idx) => (
          <motion.div
            key={i.t}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.08 }}
            className="rounded-xl border lp-hairline lp-bg-back/60 p-3"
          >
            <div className="text-[12px] font-medium lp-text-fore">{i.t}</div>
            <div className="mt-0.5 text-[11px] leading-relaxed lp-text-muted">{i.d}</div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function ArchStage() {
  const nodes = [
    { id: "edge", label: "Edge", x: 12, y: 28 },
    { id: "api", label: "API", x: 42, y: 18 },
    { id: "auth", label: "Auth", x: 42, y: 62 },
    { id: "db", label: "Postgres", x: 74, y: 18 },
    { id: "queue", label: "Queue", x: 74, y: 62 },
  ];
  const edges: [string, string][] = [
    ["edge", "api"],
    ["edge", "auth"],
    ["api", "db"],
    ["api", "queue"],
    ["auth", "db"],
  ];
  const map = Object.fromEntries(nodes.map((n) => [n.id, n]));
  return (
    <div className="h-full">
      <Heading kicker="Stage 03" title="An architecture that explains itself" />
      <div className="relative mt-4 h-[280px] w-full">
        <svg viewBox="0 0 100 80" className="absolute inset-0 h-full w-full" preserveAspectRatio="none">
          {edges.map(([a, b], i) => (
            <motion.line
              key={`${a}-${b}`}
              x1={map[a].x}
              y1={map[a].y}
              x2={map[b].x}
              y2={map[b].y}
              stroke="hsl(var(--lp-foreground))"
              strokeOpacity="0.35"
              strokeWidth="0.3"
              strokeDasharray="1.2 1.2"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ delay: 0.15 + i * 0.08, duration: 0.8 }}
            />
          ))}
        </svg>
        {nodes.map((n, i) => (
          <motion.div
            key={n.id}
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 + i * 0.07, type: "spring", bounce: 0.3 }}
            className="absolute -translate-x-1/2 -translate-y-1/2 rounded-xl border lp-hairline lp-bg-back px-3 py-1.5 text-[11px] font-medium lp-shadow-elevated"
            style={{ left: `${n.x}%`, top: `${n.y * 1.25}%` }}
          >
            <span className="mr-1.5 inline-block h-1.5 w-1.5 rounded-full lp-bg-signal" />
            {n.label}
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function CodeStage() {
  const code = [
    { t: "export async function ", c: "" },
    { t: "createTenant", c: "fn" },
    { t: "(input: TenantInput) {", c: "" },
    { t: "  const tenant = await db.tenants.insert(input);", c: "line" },
    { t: "  await rls.scope(tenant.id);", c: "line" },
    { t: "  await billing.attach(tenant.id, 'starter');", c: "line" },
    { t: "  return tenant;", c: "line" },
    { t: "}", c: "" },
  ];
  return (
    <div>
      <Heading kicker="Stage 04" title="Code intelligence, across the repo" />
      <div className="mt-4 overflow-hidden rounded-xl border lp-hairline lp-bg-ink text-[12px]">
        <div className="flex items-center gap-1.5 border-b border-white/5 px-3 py-2">
          <span className="h-2 w-2 rounded-full bg-white/15" />
          <span className="h-2 w-2 rounded-full bg-white/15" />
          <span className="h-2 w-2 rounded-full bg-white/15" />
          <span className="ml-2 font-mono text-[11px] text-white/40">src/tenants/create.ts</span>
        </div>
        <pre className="p-4 font-mono text-[12px] leading-relaxed text-white/85">
          {code.map((l, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -6 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.06 }}
            >
              <span className="mr-3 inline-block w-4 text-right text-white/25">{i + 1}</span>
              <span className={l.c === "fn" ? "lp-text-signal" : l.c === "line" ? "text-white/85" : "text-white/60"}>
                {l.t}
              </span>
            </motion.div>
          ))}
        </pre>
      </div>
    </div>
  );
}

function DeployStage() {
  const steps = [
    { t: "build", s: "done", d: "12.4s" },
    { t: "test", s: "done", d: "8.9s" },
    { t: "migrate", s: "done", d: "2.1s" },
    { t: "deploy", s: "live", d: "1.7s" },
  ];
  return (
    <div>
      <Heading kicker="Stage 05" title="Shipped. Observed. Learning." />
      <div className="mt-4 space-y-2">
        {steps.map((s, i) => (
          <motion.div
            key={s.t}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="flex items-center justify-between rounded-xl border lp-hairline lp-bg-back/60 px-4 py-2.5"
          >
            <div className="flex items-center gap-3">
              <span className={`h-2 w-2 rounded-full ${s.s === "live" ? "lp-bg-signal" : "lp-bg-fore/50"}`} />
              <span className="font-mono text-[12px] lp-text-fore">{s.t}</span>
            </div>
            <div className="flex items-center gap-3 font-mono text-[11px] lp-text-muted">
              <span>{s.d}</span>
              <span className="rounded-full lp-bg-secondary px-2 py-0.5 lp-text-fore">{s.s}</span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function Heading({ kicker, title }: { kicker: string; title: string }) {
  return (
    <div>
      <div className="font-mono text-[11px] uppercase tracking-[0.18em] lp-text-muted">{kicker}</div>
      <h2 className="mt-1.5 lp-font-display text-[20px] font-semibold tracking-tight lp-text-fore">{title}</h2>
    </div>
  );
}



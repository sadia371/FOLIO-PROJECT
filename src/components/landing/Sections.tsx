"use client";

import {
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import Image from "next/image";
import { useRef, type PointerEvent, type ReactNode } from "react";
import { AuroraOrb } from "./AuroraOrb";
import { Reveal } from "./Reveal";

export function SectionDivider() {
  return (
    <div className="px-6" aria-hidden>
      <div className="lp-divider" />
    </div>
  );
}

export function LogoStrip() {
  const integrations = [
    { name: "Jira", src: "/logos/jira.svg" },
    { name: "GitHub", src: "/logos/github.svg" },
    { name: "Gmail", src: "/logos/gmail.webp" },
    { name: "Google Calendar", src: "/logos/google-calendar.svg" },
    { name: "Bitbucket", src: "/logos/bitbucket.svg" },
  ];
  const row = [...integrations, ...integrations, ...integrations];

  return (
    <section className="relative overflow-hidden border-y lp-hairline py-10">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white to-transparent opacity-80" />
      <div className="mx-auto mb-6 max-w-6xl px-6 text-center font-mono text-[11px] uppercase tracking-[0.22em] lp-text-muted">
        Designed to sit beside the stack your team already uses
      </div>
      <div className="lp-marquee overflow-hidden">
        <div className="flex w-max lp-animate-marquee gap-3 pr-3">
          {row.map((item, i) => (
            <div
              key={`${item.name}-${i}`}
              className="inline-flex h-12 items-center gap-3 rounded-full border lp-hairline lp-bg-elevated px-4 lp-shadow-elevated"
            >
              <span className="grid h-7 w-7 place-items-center rounded-lg bg-white shadow-[inset_0_0_0_1px_rgba(15,23,42,0.08)]">
                <Image src={item.src} alt={item.name} width={18} height={18} className="object-contain" />
              </span>
              <span className="lp-font-display text-[18px] font-semibold tracking-tight lp-text-fore/85">
                {item.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
export function Features() {
  return (
    <section id="product" className="relative overflow-hidden px-6 py-32">
      <div className="pointer-events-none absolute left-1/2 top-0 h-[560px] w-[900px] -translate-x-1/2 rounded-full bg-[radial-gradient(ellipse,hsl(var(--lp-signal)/0.08),transparent_68%)] blur-3xl" />
      <div className="relative mx-auto max-w-6xl">
        <Reveal>
          <div className="mb-16 max-w-2xl">
            <Kicker>Four surfaces. One reasoning loop.</Kicker>
            <h2 className="mt-3 lp-font-display text-[40px] font-semibold leading-[1.02] tracking-tight text-balance md:text-[52px]">
              The work between an idea and a deploy,{" "}
              <span className="lp-text-muted">collapsed into a single canvas.</span>
            </h2>
          </div>
        </Reveal>
        <div className="grid grid-cols-12 gap-4">
          <Reveal className="col-span-12 lg:col-span-7">
            <FeatureCard
              kicker="Requirements Intelligence"
              title="Specs that argue for themselves."
              body="Drop a paragraph. DevPilot returns a structured PRD with edge cases, acceptance criteria and a traceable rationale for every decision."
              tall
            >
              <PRDPreview />
            </FeatureCard>
          </Reveal>
          <Reveal className="col-span-12 lg:col-span-5" delay={0.05}>
            <FeatureCard
              kicker="Architecture Visualization"
              title="Diagrams that stay in sync."
              body="A living system map generated from your repo. Hover to inspect. Click to navigate."
              tall
            >
              <ArchPreview />
            </FeatureCard>
          </Reveal>
          <Reveal className="col-span-12 lg:col-span-5" delay={0.05}>
            <FeatureCard
              kicker="Code Intelligence"
              title="Reads your codebase like a senior engineer."
              body="Cross-file references, type-aware refactors, and explanations rooted in your actual conventions."
            >
              <CodePreview />
            </FeatureCard>
          </Reveal>
          <Reveal className="col-span-12 lg:col-span-7" delay={0.1}>
            <FeatureCard
              kicker="Deployment Monitoring"
              title="The runway, not just the launch."
              body="Pipelines, env diffs, rollbacks, and post-deploy signals - narrated, not just visualized."
            >
              <DeployPreview />
            </FeatureCard>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function FeatureCard({
  kicker,
  title,
  body,
  children,
  tall,
}: {
  kicker: string;
  title: string;
  body: string;
  children: ReactNode;
  tall?: boolean;
}) {
  const reduceMotion = useReducedMotion();
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const glowX = useMotionValue("50%");
  const glowY = useMotionValue("0%");
  const smoothX = useSpring(rotateX, { stiffness: 260, damping: 24, mass: 0.4 });
  const smoothY = useSpring(rotateY, { stiffness: 260, damping: 24, mass: 0.4 });
  const glow = useTransform(
    [glowX, glowY],
    ([x, y]) => `radial-gradient(circle at ${x} ${y}, hsl(var(--lp-signal) / 0.16), transparent 34%)`
  );

  const onPointerMove = (event: PointerEvent<HTMLDivElement>) => {
    if (reduceMotion) return;
    const rect = event.currentTarget.getBoundingClientRect();
    const px = (event.clientX - rect.left) / rect.width;
    const py = (event.clientY - rect.top) / rect.height;
    rotateX.set((0.5 - py) * 7);
    rotateY.set((px - 0.5) * 8);
    glowX.set(`${px * 100}%`);
    glowY.set(`${py * 100}%`);
  };

  const onPointerLeave = () => {
    rotateX.set(0);
    rotateY.set(0);
    glowX.set("50%");
    glowY.set("0%");
  };

  return (
    <motion.div
      onPointerMove={onPointerMove}
      onPointerLeave={onPointerLeave}
      style={{ rotateX: smoothX, rotateY: smoothY, transformPerspective: 1000 }}
      className={`lp-feature-card lp-tilt-card group relative h-full overflow-hidden rounded-[28px] border lp-hairline lp-bg-elevated p-7 lp-shadow-elevated md:p-8 ${
        tall ? "min-h-[520px]" : "min-h-[440px]"
      }`}
    >
      <motion.div
        className="lp-card-glow pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{ background: glow }}
      />
      <div className="pointer-events-none absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-white to-transparent opacity-80" />
      <div className="relative flex h-full flex-col">
        <Kicker>{kicker}</Kicker>
        <h3 className="mt-4 lp-font-display text-[24px] font-semibold leading-tight tracking-tight">
          {title}
        </h3>
        <p className="mt-3 max-w-md text-[14px] leading-relaxed lp-text-muted">{body}</p>
        <div className="relative mt-8 flex-1">{children}</div>
      </div>
    </motion.div>
  );
}

function PRDPreview() {
  const rows = [
    { t: "Goal", d: "Reduce activation time from 6d to 1d" },
    { t: "Users", d: "Engineering managers, staff engineers" },
    { t: "Edge", d: "Org with 0 repos; token expired mid-flow" },
    { t: "Success", d: "60% of new teams ship within 24h" },
  ];
  return (
    <div className="absolute inset-0 top-0 flex flex-col gap-2">
      {rows.map((row, i) => (
        <motion.div
          key={row.t}
          initial={{ opacity: 0, x: -6 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 + i * 0.08 }}
          className="flex items-start gap-4 rounded-2xl border lp-hairline lp-bg-back/70 px-5 py-4"
        >
          <span className="mt-0.5 w-20 shrink-0 font-mono text-[11px] uppercase tracking-wider lp-text-muted">
            {row.t}
          </span>
          <span className="text-[13px] lp-text-fore">{row.d}</span>
        </motion.div>
      ))}
      <div className="mt-auto rounded-2xl border lp-hairline lp-bg-secondary/40 px-5 py-4 text-[12px] lp-text-muted">
        <span className="font-mono text-[10px] uppercase tracking-wider lp-text-fore">
          Rationale
        </span>{" "}
        Activation friction comes from environment setup, not product complexity.
      </div>
    </div>
  );
}

function ArchPreview() {
  const nodes = [
    { x: 40, y: 40, w: 90, h: 36, l: "Edge" },
    { x: 180, y: 30, w: 100, h: 36, l: "API Gateway" },
    { x: 40, y: 110, w: 90, h: 36, l: "Auth" },
    { x: 180, y: 110, w: 100, h: 36, l: "Postgres" },
    { x: 110, y: 185, w: 100, h: 36, l: "Queue" },
  ];
  const edges = [
    ["130,58", "180,48"],
    ["130,128", "180,128"],
    ["230,66", "230,110"],
    ["85,146", "160,185"],
    ["230,146", "210,185"],
  ];

  return (
    <svg viewBox="0 0 320 240" className="absolute inset-0 h-full w-full">
      <defs>
        <pattern id="dotPattern" width="14" height="14" patternUnits="userSpaceOnUse">
          <circle cx="1" cy="1" r="1" fill="hsl(var(--lp-hairline))" />
        </pattern>
        <filter id="nodeGlow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="4" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      <rect width="320" height="240" fill="url(#dotPattern)" opacity="0.55" />
      {edges.map(([a, b], i) => (
        <motion.line
          key={i}
          x1={a.split(",")[0]}
          y1={a.split(",")[1]}
          x2={b.split(",")[0]}
          y2={b.split(",")[1]}
          stroke="hsl(var(--lp-foreground))"
          strokeOpacity="0.32"
          strokeWidth="1"
          strokeDasharray="3 3"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 + i * 0.07, duration: 0.7 }}
        />
      ))}
      {nodes.map((node, i) => (
        <motion.g
          key={node.l}
          initial={{ opacity: 0, y: 6 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 + i * 0.08 }}
          filter={i === 1 ? "url(#nodeGlow)" : undefined}
        >
          <rect
            x={node.x}
            y={node.y}
            width={node.w}
            height={node.h}
            rx="10"
            fill="hsl(var(--lp-background))"
            stroke="hsl(var(--lp-hairline))"
          />
          <circle cx={node.x + 12} cy={node.y + 18} r="2.5" fill="hsl(var(--lp-signal))" />
          <text
            x={node.x + 22}
            y={node.y + 22}
            fontSize="11"
            fill="hsl(var(--lp-foreground))"
            fontFamily="Inter,sans-serif"
            fontWeight="500"
          >
            {node.l}
          </text>
        </motion.g>
      ))}
    </svg>
  );
}

function CodePreview() {
  const lines = [
    { t: "// Suggested refactor - 3 references", c: "muted" },
    { t: "- function getUser(id) {", c: "del" },
    { t: "+ async function getUser(id: UserId) {", c: "add" },
    { t: "+   const cached = await cache.get(id);", c: "add" },
    { t: "+   if (cached) return cached;", c: "add" },
    { t: "    return db.users.findById(id);", c: "" },
    { t: "  }", c: "" },
  ];
  return (
    <div className="absolute inset-0 overflow-hidden rounded-2xl lp-bg-ink">
      <div className="flex items-center justify-between border-b border-white/5 px-3 py-2">
        <span className="font-mono text-[10px] text-white/40">src/users/get.ts</span>
        <span className="rounded-full bg-white/10 px-2 py-0.5 font-mono text-[10px] text-white/70">
          3 refs
        </span>
      </div>
      <pre className="p-5 font-mono text-[12px] leading-[1.9]">
        {lines.map((line, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 + i * 0.06 }}
            className={
              line.c === "add"
                ? "lp-text-signal"
                : line.c === "del"
                  ? "text-white/30 line-through"
                  : line.c === "muted"
                    ? "text-white/40"
                    : "text-white/80"
            }
          >
            {line.t}
          </motion.div>
        ))}
      </pre>
    </div>
  );
}

function DeployPreview() {
  return (
    <div className="absolute inset-0 flex flex-col gap-4">
      <div className="rounded-2xl border lp-hairline lp-bg-back/70 p-5">
        <div className="flex items-center justify-between gap-4 text-[12px]">
          <span className="truncate font-mono lp-text-muted">prod / main@9af2e3c</span>
          <span className="inline-flex items-center gap-1.5 rounded-full lp-bg-signal/10 px-2 py-0.5 font-mono text-[10px] lp-text-signal">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full lp-bg-signal" /> live
          </span>
        </div>
        <div className="mt-3 flex h-2 overflow-hidden rounded-full lp-bg-secondary">
          {[36, 24, 18, 22].map((width, i) => (
            <motion.span
              key={i}
              initial={{ width: 0 }}
              whileInView={{ width: `${width}%` }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 + i * 0.1, duration: 0.6 }}
              className={["lp-bg-fore", "lp-bg-fore/70", "lp-bg-fore/50", "lp-bg-signal"][i]}
            />
          ))}
        </div>
        <div className="mt-2 flex justify-between font-mono text-[10px] uppercase tracking-wider lp-text-muted">
          <span>build</span>
          <span>test</span>
          <span>migrate</span>
          <span>deploy</span>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-3">
        {[
          { k: "p95", v: "182ms" },
          { k: "error", v: "0.02%" },
          { k: "saved", v: "4.2h" },
        ].map((metric) => (
          <div key={metric.k} className="rounded-2xl border lp-hairline lp-bg-back/70 p-4">
            <div className="font-mono text-[10px] uppercase tracking-wider lp-text-muted">
              {metric.k}
            </div>
            <div className="mt-1 lp-font-display text-[20px] font-semibold tracking-tight">
              {metric.v}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function Workflow() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const line = useTransform(scrollYProgress, [0.05, 0.9], ["0%", "100%"]);
  const steps = [
    {
      n: "01",
      t: "Describe",
      d: "Plain English. Voice memos. A messy doc. The reasoning loop accepts what people actually write.",
    },
    {
      n: "02",
      t: "Reason",
      d: "DevPilot interrogates the request, surfaces unknowns, and produces a structured plan.",
    },
    {
      n: "03",
      t: "Synthesize",
      d: "PRD, architecture and code intelligence are generated in lockstep - each one citing the others.",
    },
    {
      n: "04",
      t: "Ship",
      d: "Pipelines run. Diffs land. Production speaks back: telemetry feeds the next iteration.",
    },
  ];
  return (
    <section id="workflow" ref={ref} className="relative px-6 py-32">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <div className="mb-20 max-w-2xl">
            <Kicker>The Workflow</Kicker>
            <h2 className="mt-3 lp-font-display text-[40px] font-semibold leading-[1.02] tracking-tight text-balance md:text-[52px]">
              From rough thought to running system,{" "}
              <span className="lp-text-muted">in one continuous motion.</span>
            </h2>
          </div>
        </Reveal>
        <div className="relative grid grid-cols-12 gap-8">
          <div className="relative col-span-1 hidden md:block">
            <div className="sticky top-32 ml-3 h-[60vh] w-px lp-bg-hairline">
              <motion.div style={{ height: line }} className="absolute left-0 top-0 w-px lp-bg-fore" />
            </div>
          </div>
          <div className="col-span-12 space-y-24 md:col-span-11">
            {steps.map((step, i) => (
              <Reveal key={step.n} delay={i * 0.05}>
                <div className="grid items-start gap-6 md:grid-cols-12">
                  <div className="md:col-span-3">
                    <div className="font-mono text-[11px] uppercase tracking-[0.22em] lp-text-muted">
                      Step {step.n}
                    </div>
                    <div className="mt-2 lp-font-display text-[28px] font-semibold tracking-tight">
                      {step.t}
                    </div>
                  </div>
                  <div className="md:col-span-9">
                    <p className="max-w-2xl lp-font-display text-[22px] leading-snug tracking-tight text-pretty">
                      <span className="lp-text-fore">{step.d.split(".")[0]}.</span>
                      <span className="lp-text-muted"> {step.d.split(".").slice(1).join(".")}</span>
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export function Philosophy() {
  const pillars = [
    {
      t: "Reasoning, not autocomplete",
      d: "Every artifact has a why. Nothing arrives without rationale.",
    },
    {
      t: "Continuity, not handoffs",
      d: "PRD, architecture, code and deploy share one memory.",
    },
    {
      t: "Quiet, not magical",
      d: "Restraint is a feature. The interface gets out of the way.",
    },
  ];

  return (
    <section id="philosophy" className="relative overflow-hidden lp-bg-ink px-6 py-32 lp-text-back">
      <div className="pointer-events-none absolute inset-0 opacity-[0.08] lp-bg-grid-dark" />
      <div className="pointer-events-none absolute -right-56 -top-44 opacity-50">
        <AuroraOrb size={620} variant="accent" />
      </div>
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/25 to-transparent" />
      <div className="relative mx-auto grid max-w-6xl grid-cols-12 gap-8">
        <Reveal className="col-span-12 md:col-span-4">
          <div className="font-mono text-[11px] uppercase tracking-[0.22em] text-white/50">
            Philosophy
          </div>
          <h2 className="mt-3 max-w-[16rem] lp-font-display text-[20px] font-medium text-white/70">
            Why we built DevPilot.
          </h2>
        </Reveal>
        <Reveal className="col-span-12 md:col-span-8" delay={0.1}>
          <p className="lp-font-display text-[34px] font-medium leading-[1.1] tracking-tight text-white text-balance md:text-[48px]">
            Software should not be slowed down by the distance between an idea and the people
            who can implement it.
            <span className="text-white/50">
              {" "}
              DevPilot closes that distance by reasoning beside you.
            </span>
          </p>
          <div className="mt-12 flex snap-x gap-4 overflow-x-auto pb-4 md:grid md:grid-cols-3 md:overflow-visible md:pb-0">
            {pillars.map((pillar, i) => (
              <div
                key={pillar.t}
                className="min-w-[76%] snap-start rounded-2xl border border-white/10 bg-white/[0.04] p-5 backdrop-blur md:min-w-0"
              >
                <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-white/35">
                  0{i + 1}
                </div>
                <div className="mt-4 lp-font-display text-[16px] font-semibold text-white">
                  {pillar.t}
                </div>
                <div className="mt-2 text-[13px] leading-relaxed text-white/60">{pillar.d}</div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export function SocialProof() {
  return (
    <section className="relative px-6 py-24">
      <div className="mx-auto grid max-w-6xl grid-cols-12 gap-8">
        <Reveal className="col-span-12 md:col-span-7">
          <blockquote className="lp-font-display text-[32px] font-medium leading-[1.18] tracking-tight text-balance md:text-[42px]">
            &quot;We replaced four tools and a recurring Tuesday meeting with DevPilot.{" "}
            <span className="lp-text-muted">
              Specs land structured. Architecture stays honest. Our junior engineers ship like
              seniors.
            </span>
            &quot;
          </blockquote>
          <figcaption className="mt-6 flex items-center gap-3 text-[13px]">
            <span className="grid h-9 w-9 place-items-center rounded-full lp-bg-fore font-mono text-[12px] lp-text-back">
              EM
            </span>
            <span>
              <span className="font-medium lp-text-fore">Elena Mihailov</span>
              <span className="lp-text-muted"> / Head of Platform, Northwind</span>
            </span>
          </figcaption>
        </Reveal>
        <Reveal className="col-span-12 md:col-span-5 md:col-start-8" delay={0.1}>
          <div className="grid grid-cols-2 gap-3">
            {[
              { k: "Faster cycles", v: "4.6x" },
              { k: "Specs accepted first pass", v: "92%" },
              { k: "Rollback rate", v: "-71%" },
              { k: "Onboard new repo", v: "8 min" },
            ].map((stat) => (
              <div
                key={stat.k}
                className="rounded-2xl border lp-hairline lp-bg-elevated p-5 lp-shadow-elevated"
              >
                <div className="lp-font-display text-[32px] font-semibold tracking-tight">
                  {stat.v}
                </div>
                <div className="mt-1 text-[12px] lp-text-muted">{stat.k}</div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export function Pricing() {
  const tiers = [
    {
      n: "Solo",
      p: "$0",
      sub: "For individual engineers and side projects.",
      f: ["3 active workspaces", "Requirements + Architecture", "Community support"],
      cta: "Start free",
      featured: false,
    },
    {
      n: "Team",
      p: "$24",
      sub: "Per editor / month. For teams shipping weekly.",
      f: [
        "Unlimited workspaces",
        "Code Intelligence across the repo",
        "Deployment monitoring",
        "Shared memory",
      ],
      cta: "Start 14-day trial",
      featured: true,
    },
    {
      n: "Enterprise",
      p: "Custom",
      sub: "For organizations with compliance and scale.",
      f: ["SSO, SCIM, audit logs", "Dedicated reasoning capacity", "Private deployment", "Solutions engineering"],
      cta: "Talk to sales",
      featured: false,
    },
  ];
  return (
    <section id="pricing" className="relative px-6 py-32">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <div className="mb-14 max-w-2xl">
            <Kicker>Pricing</Kicker>
            <h2 className="mt-3 lp-font-display text-[40px] font-semibold leading-[1.02] tracking-tight md:text-[52px]">
              Priced like a tool. <span className="lp-text-muted">Felt like a teammate.</span>
            </h2>
          </div>
        </Reveal>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {tiers.map((tier, i) => (
            <Reveal key={tier.n} delay={i * 0.06}>
              <div
                className={`relative flex h-full flex-col rounded-[28px] border p-7 ${
                  tier.featured
                    ? "border-lp-fore lp-bg-elevated lp-shadow-float"
                    : "lp-hairline lp-bg-elevated lp-shadow-elevated"
                }`}
              >
                {tier.featured && (
                  <span className="absolute -top-3 left-7 rounded-full lp-bg-fore px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider lp-text-back">
                    Recommended
                  </span>
                )}
                <div className="lp-font-display text-[16px] font-semibold tracking-tight">
                  {tier.n}
                </div>
                <div className="mt-4 flex items-baseline gap-1">
                  <span className="lp-font-display text-[44px] font-semibold tracking-tight">
                    {tier.p}
                  </span>
                  {tier.p.startsWith("$") && tier.p !== "$0" && (
                    <span className="text-[13px] lp-text-muted">/ mo</span>
                  )}
                </div>
                <p className="mt-2 text-[13px] lp-text-muted">{tier.sub}</p>
                <ul className="mt-6 space-y-2.5">
                  {tier.f.map((feature) => (
                    <li key={feature} className="flex items-start gap-2.5 text-[13px]">
                      <CheckIcon />
                      <span className="lp-text-fore">{feature}</span>
                    </li>
                  ))}
                </ul>
                <a
                  href={tier.featured ? "/sign-up" : "#"}
                  className={`mt-8 inline-flex items-center justify-center gap-1.5 rounded-full px-4 py-2.5 text-[13px] font-medium transition-all ${
                    tier.featured
                      ? "lp-bg-fore lp-text-back hover:scale-[1.02]"
                      : "border lp-hairline lp-text-fore hover:lp-bg-secondary"
                  }`}
                >
                  {tier.cta}
                </a>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export function FinalCTA() {
  return (
    <section className="relative overflow-hidden px-6 py-40">
      <div className="absolute inset-0 -z-10 lp-bg-aurora" />
      <div className="pointer-events-none absolute left-1/2 top-1/2 -z-10 -translate-x-1/2 -translate-y-1/2 opacity-55">
        <AuroraOrb size={760} variant="cta" globalScroll />
      </div>
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-white to-transparent" />
      <div className="relative mx-auto max-w-4xl text-center">
        <Reveal>
          <div className="relative mx-auto inline-flex items-center gap-2 overflow-hidden rounded-full border lp-hairline lp-bg-back/70 px-3 py-1 font-mono text-[11px] uppercase tracking-[0.18em] lp-text-muted backdrop-blur">
            <span className="lp-shimmer opacity-30" />
            <span className="relative z-10 flex items-center gap-2">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full lp-bg-signal" />
              Now in public preview
            </span>
          </div>
        </Reveal>
        <Reveal delay={0.05}>
          <h2 className="mx-auto mt-6 max-w-3xl lp-font-display text-[52px] font-semibold leading-[0.98] tracking-tight text-balance md:text-[76px]">
            Start with a sentence. <span className="lp-text-muted">Ship a system.</span>
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="mx-auto mt-6 max-w-xl text-[16px] leading-relaxed lp-text-muted">
            Two minutes to your first PRD. A weekend to your first deploy. A team that finally
            moves as fast as it thinks.
          </p>
        </Reveal>
        <Reveal delay={0.15}>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
            <a
              href="/sign-up"
              className="inline-flex items-center gap-1.5 rounded-full lp-bg-fore px-5 py-3 text-[14px] font-medium lp-text-back transition-transform hover:scale-[1.02]"
            >
              Get started free
              <ArrowIcon />
            </a>
            <a
              href="#"
              className="inline-flex items-center gap-1.5 rounded-full border lp-hairline lp-bg-back/75 px-5 py-3 text-[14px] font-medium lp-text-fore backdrop-blur transition-colors hover:lp-bg-secondary"
            >
              Talk to an engineer
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export function Footer() {
  const cols = [
    { h: "Product", l: ["Requirements", "Architecture", "Code", "Deployment"] },
    { h: "Company", l: ["Philosophy", "Customers", "Careers", "Press"] },
    { h: "Resources", l: ["Docs", "Changelog", "Status", "Security"] },
  ];
  return (
    <footer className="border-t lp-hairline px-6 py-16">
      <div className="mx-auto grid max-w-6xl grid-cols-12 gap-8">
        <div className="col-span-12 md:col-span-5">
          <div className="lp-font-display text-[22px] font-semibold tracking-tight">DevPilot</div>
          <p className="mt-2 max-w-xs text-[13px] lp-text-muted">
            Software engineering, accelerated by reasoning.
          </p>
        </div>
        {cols.map((col) => (
          <div key={col.h} className="col-span-6 md:col-span-2">
            <div className="font-mono text-[11px] uppercase tracking-[0.18em] lp-text-muted">
              {col.h}
            </div>
            <ul className="mt-3 space-y-2 text-[13px]">
              {col.l.map((link) => (
                <li key={link}>
                  <a href="#" className="lp-text-fore/80 transition-colors hover:lp-text-fore">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
        <div className="col-span-12 md:col-span-1 md:text-right">
          <div className="font-mono text-[11px] uppercase tracking-[0.18em] lp-text-muted">
            2026
          </div>
        </div>
      </div>
    </footer>
  );
}

function Kicker({ children }: { children: ReactNode }) {
  return (
    <div className="inline-flex items-center gap-2 rounded-full border lp-hairline lp-bg-back/60 px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.18em] lp-text-muted">
      <span className="h-1.5 w-1.5 rounded-full lp-bg-signal" />
      {children}
    </div>
  );
}

function CheckIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 12 12" fill="none" className="mt-1 shrink-0">
      <path
        d="M2.5 6.5L5 9L9.5 3.5"
        stroke="hsl(var(--lp-signal))"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ArrowIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 12 12" fill="none">
      <path
        d="M3 6h6m0 0L6 3m3 3L6 9"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}









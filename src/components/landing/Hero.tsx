"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { ExternalLink } from "lucide-react";
import { useRef } from "react";
import { AuroraOrb } from "./AuroraOrb";
import { Centerpiece } from "./Centerpiece";
import { MagneticButton } from "./MagneticButton";
import { WordReveal } from "./Reveal";

export function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, -86]);
  const opacity = useTransform(scrollYProgress, [0, 0.68], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.55], [1, 0.96]);
  const demoY = useTransform(scrollYProgress, [0, 1], [0, -34]);

  return (
    <section ref={ref} className="relative overflow-hidden px-6 pb-24 pt-36 md:pt-44">
      <div className="pointer-events-none absolute inset-0 -z-10 lp-bg-aurora" />
      <div className="pointer-events-none absolute inset-0 -z-10 lp-bg-grid" />
      <div className="pointer-events-none absolute inset-0 -z-10 lp-particle-field" />
      <div className="pointer-events-none absolute left-1/2 top-24 -z-10 h-[460px] w-[78vw] -translate-x-1/2 rounded-full bg-white/70 blur-3xl" />

      <div
        className="pointer-events-none absolute -z-10"
        style={{ top: "50%", left: "50%", transform: "translate(-50%, -58%)", opacity: 0.62 }}
      >
        <AuroraOrb size={820} variant="hero" globalScroll />
      </div>

      <motion.div style={{ y, opacity, scale }} className="mx-auto max-w-5xl text-center">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative mx-auto inline-flex items-center gap-2 overflow-hidden rounded-full border lp-hairline lp-bg-back/65 px-3 py-1 font-mono text-[11px] uppercase tracking-[0.18em] lp-text-muted backdrop-blur"
        >
          <span className="lp-shimmer opacity-40" />
          <span className="relative z-10 flex items-center gap-2">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full lp-bg-signal" />
            Software engineering, accelerated by reasoning
          </span>
        </motion.div>

        <h1 className="lp-font-display mx-auto mt-7 max-w-4xl text-[44px] md:text-[72px] lg:text-[86px] font-semibold leading-[0.96] tracking-tight text-balance">
          <WordReveal text="From Plain-English Features" className="block" immediate />
          <span className="mt-1 block lp-text-muted">
            <WordReveal text="to Shipped Codebases." immediate />
          </span>
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.7 }}
          className="mx-auto mt-8 max-w-2xl text-[17px] leading-relaxed lp-text-muted"
        >
          DevPilot is the reasoning layer for product engineering. It turns natural language into PRDs,
          architecture diagrams, code intelligence and deployment workflows - connected by one continuous memory.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.65, duration: 0.7 }}
          className="mt-10 flex flex-wrap items-center justify-center gap-3"
        >
          <MagneticButton href="/sign-up" variant="primary">
            Get Started Free
            <ArrowIcon />
          </MagneticButton>
          <MagneticButton href="/dashboard" target="_blank" rel="noreferrer" variant="ghost">
            Open Dashboard <ExternalLink size={15} strokeWidth={1.8} />
          </MagneticButton>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9, duration: 0.8 }}
          className="mt-5 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 font-mono text-[11px] uppercase tracking-[0.18em] lp-text-muted"
        >
          <span>No credit card</span>
          <span className="hidden h-1 w-1 rounded-full lp-bg-signal/50 sm:block" />
          <span>2 min setup</span>
          <span className="hidden h-1 w-1 rounded-full lp-bg-signal/50 sm:block" />
          <span>Self-host ready</span>
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 50, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ delay: 0.4, duration: 1, ease: [0.22, 1, 0.36, 1] }}
        style={{ y: demoY }}
        className="relative mt-24"
      >
        <Centerpiece />
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.8 }}
        className="lp-scroll-hint absolute bottom-8 left-1/2 flex -translate-x-1/2 flex-col items-center gap-1.5"
      >
        <span className="font-mono text-[9px] uppercase tracking-[0.22em] lp-text-muted">Scroll</span>
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="lp-text-muted/40">
          <path
            d="M8 3v10M4 9l4 4 4-4"
            stroke="currentColor"
            strokeWidth="1.4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </motion.div>
    </section>
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




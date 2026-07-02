"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useState } from "react";

export function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Scroll progress for the thin progress bar
  const { scrollYProgress } = useScroll();
  const scaleX = useTransform(scrollYProgress, [0, 1], [0, 1]);

  const links = [
    { label: "Product",    href: "#product" },
    { label: "Workflow",   href: "#workflow" },
    { label: "Philosophy", href: "#philosophy" },
    { label: "Pricing",    href: "#pricing" },
  ];

  return (
    <motion.header
      initial={{ y: -24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="fixed top-0 left-0 right-0 z-50 flex justify-center px-4 pt-4"
    >
      {/* Scroll progress bar - sits at very top of viewport */}
      <motion.div
        className="lp-progress-bar"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          height: "2px",
          scaleX,
          transformOrigin: "left",
          background: "linear-gradient(90deg, hsl(var(--lp-signal)), hsl(212 100% 60%))",
          zIndex: 60,
        }}
      />

      <div
        className={`flex w-full max-w-6xl items-center justify-between rounded-full px-5 py-2.5 transition-all duration-500 ${
          scrolled ? "lp-glass lp-shadow-elevated" : "bg-transparent border border-transparent"
        }`}
      >
        {/* Logo */}
        <a href="#" className="flex items-center gap-2.5">
          <Mark />
          <span className="lp-font-display text-[15px] font-semibold tracking-tight">DevPilot</span>
        </a>

        {/* Nav links */}
        <nav className="hidden items-center gap-1 md:flex">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="relative rounded-full px-3.5 py-1.5 text-[13px] lp-text-muted transition-all duration-200 hover:lp-text-fore group"
            >
              <span className="relative z-10">{l.label}</span>
              {/* hover bg pill */}
              <span className="absolute inset-0 rounded-full lp-bg-secondary opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
            </a>
          ))}
        </nav>

        {/* CTAs */}
        <div className="flex items-center gap-2">
          <a
            href="/sign-in"
            className="hidden rounded-full px-3.5 py-1.5 text-[13px] lp-text-muted transition-colors hover:lp-text-fore sm:inline-block"
          >
            Sign in
          </a>
          <a
            href="/sign-up"
            className="group relative inline-flex items-center gap-1.5 overflow-hidden rounded-full lp-bg-fore px-3.5 py-1.5 text-[13px] font-medium lp-text-back transition-transform hover:scale-[1.03] active:scale-[0.98]"
          >
            {/* shimmer sweep on the CTA button */}
            <span className="lp-shimmer" />
            <span className="relative z-10 flex items-center gap-1.5">
              Get started
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="transition-transform duration-200 group-hover:translate-x-0.5">
                <path d="M3 6h6m0 0L6 3m3 3L6 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
          </a>
        </div>
      </div>
    </motion.header>
  );
}

function Mark() {
  return (
    <span className="relative grid h-7 w-7 place-items-center rounded-lg lp-bg-fore overflow-hidden">
      <span className="lp-shimmer opacity-60" />
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="relative z-10">
        <path
          d="M2 11L7 2L12 11M4.5 7.5H9.5"
          stroke="hsl(var(--lp-background))"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </span>
  );
}



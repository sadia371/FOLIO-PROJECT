"use client";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useRef } from "react";

interface AuroraOrbProps {
  size?: number;
  className?: string;
  variant?: "hero" | "cta" | "accent";
  /** If true, orb morphs on document scroll instead of a local ref */
  globalScroll?: boolean;
}

export function AuroraOrb({
  size = 600,
  className = "",
  variant = "hero",
  globalScroll = false,
}: AuroraOrbProps) {
  const localRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll(
    globalScroll ? undefined : { target: localRef, offset: ["start end", "end start"] }
  );

  const smoothProgress = useSpring(scrollYProgress, { stiffness: 40, damping: 20 });

  // Scroll-driven transforms
  const rotate    = useTransform(smoothProgress, [0, 1], [0, 120]);
  const scaleVal  = useTransform(smoothProgress, [0, 0.5, 1], [1, 1.12, 0.92]);
  const yShift    = useTransform(smoothProgress, [0, 1], [0, -80]);

  // Distinct gradient combos per variant
  const gradients =
    variant === "hero"
      ? {
          outer: "radial-gradient(ellipse at 40% 40%, hsl(222 10% 54% / 0.62), hsl(210 14% 76% / 0.34) 50%, transparent 72%)",
          mid:   "radial-gradient(ellipse at 60% 55%, hsl(214 20% 58% / 0.48), hsl(235 16% 64% / 0.24) 55%, transparent 75%)",
          inner: "radial-gradient(ellipse at 50% 50%, hsl(0 0% 96% / 0.38), hsl(218 12% 46% / 0.26) 60%, transparent 80%)",
          glow:  "hsl(220 10% 48% / 0.18)",
        }
      : variant === "cta"
      ? {
          outer: "radial-gradient(ellipse at 55% 45%, hsl(222 25% 10% / 0.9), hsl(222 25% 20% / 0.5) 55%, transparent 75%)",
          mid:   "radial-gradient(ellipse at 40% 60%, hsl(218 12% 54% / 0.28), hsl(206 28% 66% / 0.18) 60%, transparent 80%)",
          inner: "radial-gradient(ellipse at 50% 50%, hsl(210 18% 76% / 0.22), transparent 70%)",
          glow:  "hsl(222 25% 8% / 0.3)",
        }
      : {
          outer: "radial-gradient(ellipse at 50% 40%, hsl(214 18% 62% / 0.46), hsl(235 16% 62% / 0.22) 55%, transparent 75%)",
          mid:   "radial-gradient(ellipse at 60% 55%, hsl(218 14% 76% / 0.28), hsl(220 10% 46% / 0.16) 60%, transparent 80%)",
          inner: "radial-gradient(ellipse at 45% 50%, hsl(0 0% 96% / 0.24), transparent 70%)",
          glow:  "hsl(214 18% 58% / 0.14)",
        };

  return (
    <div
      ref={localRef}
      className={`pointer-events-none select-none ${className}`}
      style={{ width: size, height: size, position: "relative" }}
      aria-hidden
    >
      {/* Outer glow halo */}
      <div
        style={{
          position: "absolute",
          inset: -size * 0.15,
          borderRadius: "50%",
          background: gradients.outer,
          filter: `blur(${size * 0.12}px)`,
        }}
      />

      {/* Main morphing body */}
      <motion.div
        style={{
          position: "absolute",
          inset: 0,
          background: gradients.outer,
          filter: `blur(${size * 0.025}px)`,
          rotate,
          scale: scaleVal,
          y: yShift,
          willChange: "transform",
        }}
        className="lp-orb-morph"
      />

      {/* Mid layer - offsets for depth */}
      <motion.div
        style={{
          position: "absolute",
          inset: size * 0.08,
          background: gradients.mid,
          filter: `blur(${size * 0.035}px)`,
          rotate: useTransform(smoothProgress, [0, 1], [0, -80]),
          scale: useTransform(smoothProgress, [0, 0.5, 1], [0.95, 1.08, 0.88]),
          mixBlendMode: "screen",
        }}
        className="lp-orb-morph-mid"
      />

      {/* Inner core highlight - static for perf, depth illusion preserved by mid layer */}
      <div
        style={{
          position: "absolute",
          inset: size * 0.22,
          background: gradients.inner,
          filter: `blur(${size * 0.045}px)`,
          mixBlendMode: "screen",
        }}
        className="lp-orb-morph-inner"
      />

      {/* Specular highlight - static small dot for depth illusion */}
      <div
        style={{
          position: "absolute",
          top: "18%",
          left: "22%",
          width: size * 0.16,
          height: size * 0.1,
          background: "radial-gradient(ellipse, hsl(0 0% 100% / 0.55), transparent 70%)",
          filter: `blur(${size * 0.018}px)`,
          borderRadius: "50%",
          transform: "rotate(-30deg)",
        }}
      />
    </div>
  );
}




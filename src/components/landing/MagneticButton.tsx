"use client";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useRef, type ComponentPropsWithoutRef, type ReactNode } from "react";

type Props = ComponentPropsWithoutRef<"a"> & {
  variant?: "primary" | "ghost";
  children: ReactNode;
};

export function MagneticButton({ children, variant = "primary", className = "", ...rest }: Props) {
  const ref = useRef<HTMLAnchorElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 250, damping: 18, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 250, damping: 18, mass: 0.4 });
  const tx = useTransform(sx, (v) => `${v}px`);
  const ty = useTransform(sy, (v) => `${v}px`);

  const onMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    x.set(((e.clientX - r.left) / r.width - 0.5) * 14);
    y.set(((e.clientY - r.top) / r.height - 0.5) * 14);
  };
  const onLeave = () => {
    x.set(0);
    y.set(0);
  };

  const base =
    "group relative inline-flex items-center gap-2 rounded-full px-5 py-3 text-[14px] font-medium transition-colors will-change-transform";
  const styles =
    variant === "primary"
      ? "lp-bg-fore lp-text-back lp-shadow-elevated hover:opacity-90"
      : "border lp-hairline lp-bg-back lp-text-fore hover:lp-bg-secondary";

  return (
    <motion.a
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{ x: tx, y: ty }}
      className={`${base} ${styles} ${className}`}
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      {...(rest as any)}
    >
      {children}
    </motion.a>
  );
}

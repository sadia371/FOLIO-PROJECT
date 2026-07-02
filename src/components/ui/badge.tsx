import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-badge border px-2 py-0.5 text-xs font-medium transition-colors duration-150",
  {
    variants: {
      variant: {
        default: "border-transparent bg-accent text-white",
        secondary: "border-border bg-canvas text-text-primary",
        success: "border-transparent bg-phase-testing/15 text-phase-testing",
        warning: "border-transparent bg-status-warning/12 text-status-warning-on-tint",
        danger: "border-transparent bg-status-danger/12 text-status-danger-on-tint",
        outline: "border-border text-muted",
        active: "border-transparent bg-phase-code/15 text-phase-code",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };

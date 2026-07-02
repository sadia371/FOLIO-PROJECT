"use client";

import { forwardRef } from "react";
import { Download, FileText } from "lucide-react";
import { useProject } from "@/context/project-context";
import { Button } from "@/components/ui/button";

interface HeroProps {
  onReview?: () => void;
}

export const ArchitectureHero = forwardRef<HTMLDivElement, HeroProps>(
  function ArchitectureHero({ onReview }, ref) {
    const { currentProject } = useProject();
    const today = new Date().toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
    });

    return (
      <section
        ref={ref}
        className="relative overflow-hidden rounded-xl border border-accent-green/15 bg-accent-green-light/40 px-6 py-5 md:px-8 md:py-6"
      >
        <div className="relative z-10 flex items-center justify-between gap-6">
          <div className="min-w-0 flex-1">
            <span className="mb-1.5 block font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-text-muted">
              Architecture Briefing &bull; {today}
            </span>
            <h2 className="text-lg font-bold tracking-tight text-text-primary md:text-xl">
              Architecture plan generated.{" "}
              <span className="text-accent-green">2 decisions</span> require your review.
            </h2>
            <p className="mt-1 text-sm leading-relaxed text-text-secondary">
              {currentProject.name} — microservices architecture prioritizing relational
              integrity and real-time observability.
            </p>
          </div>
          <div className="flex shrink-0 gap-2">
            <Button
              size="sm"
              className="bg-accent-green text-white hover:bg-accent-green/90"
              onClick={onReview}
            >
              <FileText className="mr-1.5 h-3.5 w-3.5" />
              Review Plan
            </Button>
            <Button size="sm" variant="outline" className="border-border-soft">
              <Download className="mr-1.5 h-3.5 w-3.5" />
              Export
            </Button>
          </div>
        </div>
        <div className="pointer-events-none absolute -bottom-12 -right-12 h-64 w-64 rounded-full bg-accent-green/10 blur-3xl" />
      </section>
    );
  }
);

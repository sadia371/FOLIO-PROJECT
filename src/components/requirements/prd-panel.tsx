"use client";

import { prdSections } from "@/lib/mock/requirements-intelligence";
import { CheckCircle2 } from "lucide-react";

export function PrdPanel() {
  return (
    <div className="flex-1 flex flex-col gap-6">
      <article className="bg-surface border border-border-soft rounded-xl p-6 space-y-8">
        {prdSections.map((section, i) => (
          <section key={i}>
            <div>
              <span className="font-mono text-[9px] uppercase tracking-widest text-accent-green mb-2 block">
                {section.tag}
              </span>
              {section.tag === "OVERVIEW" ? (
                <h2 className="text-xl font-bold text-text-primary mb-3">{section.title}</h2>
              ) : (
                <h3 className="text-sm font-bold text-text-primary mb-3">{section.title}</h3>
              )}
              {section.content && (
                <p className="text-sm text-text-muted leading-relaxed">{section.content}</p>
              )}
              {section.items && (
                <ul className="space-y-2.5">
                  {section.items.map((item, j) => (
                    <li key={j} className="flex items-start gap-2.5">
                      <CheckCircle2 className="h-4 w-4 text-accent-green mt-0.5 shrink-0" />
                      <span className="text-sm text-text-primary">{item}</span>
                    </li>
                  ))}
                </ul>
              )}
              {(section.inScope || section.outScope) && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-3">
                  {section.inScope && (
                    <div>
                      <h4 className="font-mono text-[10px] text-text-muted uppercase mb-2">In-Scope</h4>
                      <ul className="list-disc pl-4 text-xs text-text-primary space-y-1">
                        {section.inScope.map((item, j) => (
                          <li key={j}>{item}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                  {section.outScope && (
                    <div>
                      <h4 className="font-mono text-[10px] text-text-muted uppercase mb-2">Out-of-Scope</h4>
                      <ul className="list-disc pl-4 text-xs text-text-muted space-y-1">
                        {section.outScope.map((item, j) => (
                          <li key={j}>{item}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              )}
            </div>
          </section>
        ))}
      </article>
    </div>
  );
}

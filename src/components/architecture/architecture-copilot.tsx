"use client";

import { useState } from "react";
import { Bot, MoreHorizontal, Send, User } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface Message {
  id: string;
  role: "assistant" | "user";
  content: string;
}

const initialMessages: Message[] = [
  {
    id: "1",
    role: "assistant",
    content:
      "I've noticed your architecture uses three different Stripe integration points. Would you like me to suggest a unified Payment Abstraction Layer to simplify maintenance?",
  },
  {
    id: "2",
    role: "user",
    content:
      "Yes, please. Can you also generate a sequence diagram for how that would handle failed transactions?",
  },
  {
    id: "3",
    role: "assistant",
    content:
      "Generating sequence diagram now... I'll optimize for a Circuit Breaker pattern to ensure high availability during Stripe downtime.",
  },
];

export function ArchitectureCopilot() {
  const [messages] = useState<Message[]>(initialMessages);
  const [input, setInput] = useState("");

  return (
    <Card className="flex h-[300px] sm:h-[380px] lg:h-[420px] flex-col overflow-hidden border-border-soft bg-surface">
      <CardHeader className="flex-row items-center justify-between border-b border-border-soft bg-surface p-3">
        <div className="flex items-center gap-2">
          <Bot className="h-4 w-4 text-accent-green" />
          <CardTitle className="text-[10px] font-bold normal-case tracking-widest text-text-primary">
            AI Copilot
          </CardTitle>
        </div>
        <button className="text-text-muted hover:text-text-primary">
          <MoreHorizontal className="h-3.5 w-3.5" />
        </button>
      </CardHeader>

      <CardContent className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={cn(
              "flex max-w-[85%] gap-2.5",
              msg.role === "user" && "ml-auto flex-row-reverse"
            )}
          >
            <div
              className={cn(
                "flex h-6 w-6 shrink-0 items-center justify-center rounded-md",
                msg.role === "assistant"
                  ? "bg-accent-green-light text-accent-green"
                  : "bg-text-primary text-white"
              )}
            >
              {msg.role === "assistant" ? (
                <Bot className="h-3 w-3" />
              ) : (
                <User className="h-3 w-3" />
              )}
            </div>
            <div
              className={cn(
                "rounded-xl p-3 text-xs leading-relaxed",
                msg.role === "assistant"
                  ? "rounded-tl-none bg-accent-green-light/30 text-text-primary"
                  : "rounded-tr-none border border-border-soft bg-surface text-text-primary shadow-soft"
              )}
            >
              {msg.content}
            </div>
          </div>
        ))}
      </CardContent>

      <div className="border-t border-border-soft bg-surface p-3">
        <div className="relative flex items-center">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about the architecture..."
            className="w-full rounded-lg bg-surface-container-low py-2.5 pl-4 pr-12 text-xs text-text-primary outline-none placeholder:text-text-muted/50 focus:ring-1 focus:ring-accent-green/30"
          />
          <button className="absolute right-1.5 flex h-8 w-8 items-center justify-center rounded-md bg-text-primary text-white transition-opacity hover:opacity-90">
            <Send className="h-3 w-3" />
          </button>
        </div>
      </div>
    </Card>
  );
}

"use client";

import { useState, useRef, useEffect } from "react";
import { Send, X, Minus, Bot, Loader2 } from "lucide-react";
import { usePathname } from "next/navigation";
import { cn, uuid } from "@/lib/utils";

// ─── Types ───────────────────────────────────────────────────────────────────

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

interface QuickAction {
  label: string;
  prompt: string;
}

interface PageConfig {
  welcome: string;
  quickActions: QuickAction[];
}

// ─── Constants ───────────────────────────────────────────────────────────────

const PAGE_CONFIGS: Record<string, PageConfig> = {
  "/dashboard": {
    welcome: "Ask about blockers, priorities, or next actions for this project.",
    quickActions: [
      { label: "Show open PRs",    prompt: "Show me all open pull requests for this project." },
      { label: "What's blocked?",  prompt: "What tasks or issues are currently blocked?" },
      { label: "Start test plan",  prompt: "Help me draft a test plan for the current sprint." },
    ],
  },
  "/requirements": {
    welcome: "Ask about product requirements, user stories, edge cases, or risks.",
    quickActions: [
      { label: "Review requirements",  prompt: "Can you analyze and review the current requirement set?" },
      { label: "Generate PRD summary", prompt: "Generate a PRD summary with product vision and features." },
      { label: "Export to Jira",       prompt: "How do I export my current requirements to Jira?" },
    ],
  },
  "/architecture": {
    welcome: "Ask about system architecture, components, and integration decisions.",
    quickActions: [
      { label: "Show components",      prompt: "Show me a list of all components in this architecture." },
      { label: "Kafka vs RabbitMQ",    prompt: "Which message queue should I choose: RabbitMQ or Kafka?" },
      { label: "Stripe abstraction",   prompt: "Suggest a unified Payment Abstraction Layer for our Stripe integrations." },
    ],
  },
};

const DEFAULT_CONFIG: PageConfig = {
  welcome: "Ask about the codebase, files, deployment pipelines, or settings.",
  quickActions: [
    { label: "Explain repository",    prompt: "Explain the repository structure and main packages." },
    { label: "Check pipeline status", prompt: "Is the GitHub CI passing? What is the current commit risk?" },
    { label: "What's next?",          prompt: "What are the recommended next steps for this project?" },
  ],
};

// ─── Dot indicator ───────────────────────────────────────────────────────────

function StatusDots() {
  return (
    <span className="flex items-center gap-1.5" aria-hidden>
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          className="h-2.5 w-2.5 rounded-full bg-[#22C55E]"
          style={{
            animation: `pulse-dot 1.6s ease-in-out ${i * 0.22}s infinite`,
          }}
        />
      ))}
    </span>
  );
}

// ─── Single message bubble ────────────────────────────────────────────────────

function MessageBubble({ msg }: { msg: Message }) {
  const isUser = msg.role === "user";
  return (
    <div className={cn("flex w-full", isUser ? "justify-end" : "justify-start")}>
      <div
        className={cn(
          "max-w-[82%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed",
          isUser
            ? "bg-[#22C55E] text-[#0F0F0F] font-medium rounded-br-sm"
            : "bg-[#2a3330] text-[#e2e8e4] rounded-bl-sm"
        )}
      >
        {msg.content}
      </div>
    </div>
  );
}

// ─── Typing indicator ────────────────────────────────────────────────────────

function TypingIndicator() {
  return (
    <div className="flex justify-start">
      <div className="flex items-center gap-1.5 rounded-2xl rounded-bl-sm bg-[#2a3330] px-4 py-3">
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            className="h-1.5 w-1.5 rounded-full bg-[#22C55E]/70"
            style={{ animation: `bounce-dot 1.2s ease-in-out ${i * 0.18}s infinite` }}
          />
        ))}
      </div>
    </div>
  );
}

// ─── Main component ──────────────────────────────────────────────────────────

export default function FloatingCopilot() {
  const pathname                  = usePathname();
  const [open, setOpen]           = useState(false);
  const [minimised, setMinimised] = useState(false);
  const [messages, setMessages]   = useState<Message[]>([]);
  const [input, setInput]         = useState("");
  const [loading, setLoading]     = useState(false);
  const [mounted, setMounted]     = useState(false);

  const bottomRef  = useRef<HTMLDivElement>(null);
  const inputRef   = useRef<HTMLTextAreaElement>(null);

  const config = PAGE_CONFIGS[pathname] || DEFAULT_CONFIG;

  // Mount guard for SSR
  useEffect(() => setMounted(true), []);

  // Reset messages when path changes
  useEffect(() => {
    setMessages([]);
  }, [pathname]);

  // Auto-scroll
  useEffect(() => {
    if (open && !minimised) {
      bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, loading, open, minimised]);

  // Focus input when panel opens
  useEffect(() => {
    if (open && !minimised) {
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [open, minimised]);

  const handleOpen = () => {
    setOpen(true);
    setMinimised(false);
  };

  const handleClose = () => {
    setOpen(false);
    setMinimised(false);
  };

  const sendMessage = async (text: string) => {
    const trimmed = text.trim();
    if (!trimmed || loading) return;

    const userMsg: Message = {
      id:        uuid(),
      role:      "user",
      content:   trimmed,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    // Build history for context
    const history = [...messages, userMsg].map((m) => ({
      role:    m.role,
      content: m.content,
    }));

    try {
      const res = await fetch("/api/copilot", {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body:    JSON.stringify({ messages: history, path: pathname }),
      });

      if (!res.ok) throw new Error("API error");

      const data = await res.json();
      const reply =
        data?.content?.[0]?.text ??
        data?.message ??
        "I couldn't process that. Please try again.";

      setMessages((prev) => [
        ...prev,
        {
          id:        uuid(),
          role:      "assistant",
          content:   reply,
          timestamp: new Date(),
        },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          id:        uuid(),
          role:      "assistant",
          content:   "Something went wrong. Check your connection and retry.",
          timestamp: new Date(),
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage(input);
    }
  };

  if (!mounted) return null;
  if (pathname.startsWith("/landing")) return null;

  return (
    <>
      {/* ── Keyframe styles ── */}
      <style>{`
        @keyframes pulse-dot {
          0%, 100% { opacity: 0.4; transform: scale(0.85); }
          50%       { opacity: 1;   transform: scale(1);    }
        }
        @keyframes bounce-dot {
          0%, 100% { transform: translateY(0);    opacity: 0.5; }
          50%       { transform: translateY(-4px); opacity: 1;   }
        }
        @keyframes fab-enter {
          from { opacity: 0; transform: scale(0.6) rotate(-15deg); }
          to   { opacity: 1; transform: scale(1)   rotate(0deg);   }
        }
        @keyframes panel-enter {
          from { opacity: 0; transform: translateY(16px) scale(0.97); }
          to   { opacity: 1; transform: translateY(0)    scale(1);    }
        }
        @keyframes pulse-ring {
          0%   { transform: scale(1); opacity: 0.6; }
          70%  { transform: scale(1.4); opacity: 0; }
          100% { transform: scale(1.4); opacity: 0; }
        }
        .fab-btn { animation: fab-enter 0.4s cubic-bezier(0.34,1.56,0.64,1) both; }
        .panel   { animation: panel-enter 0.3s cubic-bezier(0.22,1,0.36,1) both; }
      `}</style>

      {/* ── Fixed container (bottom-right) ── */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">

        {/* ─────────────────── CHAT PANEL ─────────────────── */}
        {open && (
          <div
            className={cn(
              "panel w-[360px] rounded-2xl border border-[#2d3d38] bg-[#1e2b27] shadow-2xl",
              "flex flex-col overflow-hidden",
              "transition-all duration-300 ease-in-out",
              minimised ? "h-[52px]" : "h-[480px]"
            )}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-[#2d3d38] flex-shrink-0">
              <div className="flex items-center gap-2.5">
                <StatusDots />
                <span className="text-[10px] font-semibold tracking-[0.15em] text-[#22C55E] uppercase">
                  AI Copilot
                </span>
              </div>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => setMinimised((v) => !v)}
                  className="flex h-6 w-6 items-center justify-center rounded-md text-[#6b8c7e] transition-colors hover:bg-[#2d3d38] hover:text-[#e2e8e4]"
                  aria-label={minimised ? "Expand" : "Minimise"}
                >
                  <Minus size={14} />
                </button>
                <button
                  onClick={handleClose}
                  className="flex h-6 w-6 items-center justify-center rounded-md text-[#6b8c7e] transition-colors hover:bg-[#2d3d38] hover:text-[#e2e8e4]"
                  aria-label="Close copilot"
                >
                  <X size={14} />
                </button>
              </div>
            </div>

            {/* Body — hidden when minimised */}
            {!minimised && (
              <>
                {/* Message list */}
                <div className="flex-1 overflow-y-auto px-4 py-3 flex flex-col gap-2.5 scroll-smooth">
                  {messages.length === 0 && (
                    <div className="flex flex-col gap-2 mt-1">
                      <p className="text-sm text-[#9ab8ad] leading-snug">
                        {config.welcome}
                      </p>
                      <div className="flex flex-col gap-2 mt-2">
                        {config.quickActions.map((qa) => (
                          <button
                            key={qa.label}
                            onClick={() => sendMessage(qa.prompt)}
                            className="group flex items-center justify-between rounded-xl bg-[#243029] px-4 py-3 text-sm text-[#c8ddd5] transition-colors hover:bg-[#2d3d38] hover:text-white text-left"
                          >
                            <span>{qa.label}</span>
                            <span className="text-[#22C55E] opacity-60 transition-opacity group-hover:opacity-100">→</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {messages.map((msg) => (
                    <MessageBubble key={msg.id} msg={msg} />
                  ))}

                  {loading && <TypingIndicator />}
                  <div ref={bottomRef} />
                </div>

                {/* Input */}
                <div className="flex-shrink-0 border-t border-[#2d3d38] px-3 py-2.5">
                  <div className="flex items-end gap-2 rounded-xl bg-[#243029] px-3 py-2">
                    <textarea
                      ref={inputRef}
                      rows={1}
                      value={input}
                      onChange={(e) => {
                        setInput(e.target.value);
                        // Auto-grow
                        e.target.style.height = "auto";
                        e.target.style.height = Math.min(e.target.scrollHeight, 96) + "px";
                      }}
                      onKeyDown={handleKeyDown}
                      placeholder="Ask Copilot…"
                      disabled={loading}
                      className={cn(
                        "flex-1 resize-none bg-transparent text-sm text-[#e2e8e4]",
                        "placeholder:text-[#4d6b5e] outline-none",
                        "disabled:opacity-50 max-h-24 leading-relaxed"
                      )}
                      style={{ height: "24px" }}
                    />
                    <button
                      onClick={() => sendMessage(input)}
                      disabled={!input.trim() || loading}
                      className={cn(
                        "flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-lg transition-all",
                        input.trim() && !loading
                          ? "bg-[#22C55E] text-[#0F0F0F] hover:bg-[#16a34a] active:scale-95"
                          : "bg-[#2d3d38] text-[#4d6b5e] cursor-not-allowed"
                      )}
                      aria-label="Send"
                    >
                      {loading
                        ? <Loader2 size={13} className="animate-spin" />
                        : <Send size={13} />
                      }
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        )}

        {/* ─────────────────── FAB BUTTON ─────────────────── */}
        {!open && (
          <button
            onClick={handleOpen}
            className={cn(
              "fab-btn group relative flex h-14 w-14 items-center justify-center",
              "rounded-full bg-[#22C55E] text-[#0F0F0F]",
              "shadow-lg shadow-[#22C55E]/25",
              "transition-[transform] duration-200 hover:scale-110",
              "active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#22C55E] focus-visible:ring-offset-2"
            )}
            aria-label="Open AI Copilot"
          >
            {/* Subtle ring pulse on idle */}
            <span
              className="absolute inset-0 rounded-full bg-[#22C55E] pointer-events-none"
              style={{ animation: "pulse-ring 2.8s cubic-bezier(0.215, 0.610, 0.355, 1) 1.2s infinite" }}
              aria-hidden
            />
            <Bot size={24} strokeWidth={1.75} className="relative z-10" />
          </button>
        )}
      </div>
    </>
  );
}

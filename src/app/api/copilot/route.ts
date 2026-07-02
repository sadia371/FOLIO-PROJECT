import { NextRequest, NextResponse } from "next/server";

// POST /api/copilot
// Body: { messages: { role: "user" | "assistant", content: string }[] }
export async function POST(req: NextRequest) {
  try {
    if (!process.env.ANTHROPIC_API_KEY) {
      return NextResponse.json(
        { error: "Anthropic API key is not configured." },
        { status: 500 }
      );
    }

    const { messages, path } = await req.json();

    if (!Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json({ error: "messages array required" }, { status: 400 });
    }

    let pageContext = "";
    if (path === "/architecture") {
      pageContext = "\nThe user is currently viewing the Architecture page. Focus on microservices planning, component design, Kafka vs RabbitMQ choices, and Payment Abstraction Layer recommendations.";
    } else if (path === "/requirements") {
      pageContext = "\nThe user is currently viewing the Requirements page. Focus on PRD summarizing, user story validation, edge case identification, and Jira exports.";
    } else if (path === "/dashboard") {
      pageContext = "\nThe user is currently viewing the main dashboard page. Focus on project blockers, Sprint 42 metrics, and open PR status.";
    } else {
      pageContext = "\nFocus on the general codebase structure, deployment pipelines, settings, or project navigation.";
    }

    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": process.env.ANTHROPIC_API_KEY,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: process.env.ANTHROPIC_MODEL ?? "claude-sonnet-4-6",
        max_tokens: 1024,
        system: `You are DevPilot's AI Copilot — a sharp, concise engineering assistant embedded 
inside an AI-powered SDLC co-pilot. Your job is to help developers with:
- Project blockers and prioritisation
- Pull request reviews and status
- Test planning and coverage
- Sprint planning and next actions
- Architecture and code decisions

Be direct and actionable. Use bullet points for lists. Keep responses tight — 
no fluff. If you don't have live project data, acknowledge that and offer 
what you can reason about from context.${pageContext}`,
        messages,
      }),
    });

    if (!response.ok) {
      const err = await response.text();
      console.error("Anthropic API error:", err);
      return NextResponse.json({ error: "Upstream API error" }, { status: 502 });
    }

    const data = await response.json();
    const text = data.content?.[0]?.text ?? "No response received.";

    return NextResponse.json({ content: [{ text }] });
  } catch (err) {
    console.error("Copilot route error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

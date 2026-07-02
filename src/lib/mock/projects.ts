import { Project } from "@/types";

export const projects: Project[] = [
  {
    id: "food-delivery",
    name: "Food Delivery API",
    description:
      "A campus-focused food delivery platform connecting university students with local restaurants, featuring real-time order tracking, JWT auth, and Stripe payments.",
    currentPhase: "code",
    weekNumber: 4,
    totalWeeks: 9,
    stackContext: {
      language: "TypeScript",
      framework: "NestJS",
      database: "PostgreSQL",
    },
  },
  {
    id: "ride-share",
    name: "Acme CRM",
    description:
      "Ride-sharing app for university students with carpool matching and campus-only geofencing.",
    currentPhase: "requirements",
    weekNumber: 2,
    totalWeeks: 9,
    stackContext: {
      language: "TypeScript",
      framework: "Next.js",
      database: "MongoDB",
    },
  },
  {
    id: "study-buddy",
    name: "Microservices Audit",
    description:
      "AI-powered study group matcher that pairs students by course, schedule, and learning style.",
    currentPhase: "architecture",
    weekNumber: 3,
    totalWeeks: 9,
    stackContext: {
      language: "Python",
      framework: "FastAPI",
      database: "PostgreSQL",
    },
  },
];

export const defaultProjectId = "food-delivery";

// Display names used by the lightweight project-switcher dropdown in page
// headers (dashboard, requirements). Kept separate from `projects` above
// since the switcher is presentational and not yet wired to real project
// records — but centralized here instead of duplicated per-page.
export const projectSwitcherNames = [
  "FolioDesk",
  "Acme CRM",
  "Food Delivery API",
  "Microservices Audit",
];

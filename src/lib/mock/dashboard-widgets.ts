import { DashboardChatMessage, DashboardNote } from "@/types";

export const initialChatMessagesByProject: Record<string, DashboardChatMessage[]> = {
  "food-delivery": [
    {
      id: "m-1",
      role: "assistant",
      content:
        "Hey, I am your DevPilot assistant. Ask me about blockers, priorities, or next actions for this project.",
    },
  ],
  "ride-share": [
    {
      id: "m-1",
      role: "assistant",
      content: "Welcome to CampusRide. Want a quick checklist for this week's requirements?",
    },
  ],
  "study-buddy": [
    {
      id: "m-1",
      role: "assistant",
      content: "StudyBuddy context loaded. I can help you prep architecture talking points.",
    },
  ],
};

export const initialNotesByProject: Record<string, DashboardNote[]> = {
  "food-delivery": [
    { id: "n-1", text: "Follow up on cloud provider decision by EOD." },
    { id: "n-2", text: "Demo rehearsal at 2:30 PM with auth + order flow." },
  ],
  "ride-share": [
    { id: "n-1", text: "Finalize 10 core user stories before architecture handoff." },
  ],
  "study-buddy": [
    { id: "n-1", text: "Confirm schema choices for matching preferences and schedules." },
  ],
};

"use client";

import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
  useMemo,
  useRef,
} from "react";
import { usePathname } from "next/navigation";
import { projects, defaultProjectId } from "@/lib/mock/projects";
import { initialMemoryEntries } from "@/lib/mock/memory";
import {
  DashboardChatMessage,
  DashboardNote,
  MemoryEntry,
  PhaseHours,
  Project,
  SDLCPhase,
} from "@/types";
import {
  initialChatMessagesByProject,
  initialNotesByProject,
} from "@/lib/mock/dashboard-widgets";

const pathPhaseMap: Record<string, SDLCPhase> = {
  "/requirements": "requirements",
  "/architecture": "architecture",
  "/code": "code",
  "/deployment": "deployment",
};

function createPhaseHours(initial: Partial<PhaseHours> = {}): PhaseHours {
  return {
    requirements: initial.requirements ?? 0,
    architecture: initial.architecture ?? 0,
    code: initial.code ?? 0,
    deployment: initial.deployment ?? 0,
  };
}

function phaseFromPath(pathname: string): SDLCPhase | null {
  return pathPhaseMap[pathname] ?? null;
}

const EMPTY_CHAT_MESSAGES: DashboardChatMessage[] = [];
const EMPTY_NOTES: DashboardNote[] = [];

interface ProjectContextType {
  currentProject: Project;
  projects: Project[];
  memoryEntries: MemoryEntry[];
  chatMessages: DashboardChatMessage[];
  notes: DashboardNote[];
  setCurrentProjectId: (id: string) => void;
  addMemoryEntry: (entry: Omit<MemoryEntry, "id" | "timestamp" | "sortDate">) => void;
  addChatMessage: (message: Omit<DashboardChatMessage, "id">) => void;
  addNote: (text: string) => void;
  removeNote: (id: string) => void;
  activePhase: SDLCPhase;
}

const ProjectContext = createContext<ProjectContextType | undefined>(undefined);
const PhaseHoursContext = createContext<PhaseHours | undefined>(undefined);

export function ProjectProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [currentProjectId, setCurrentProjectIdState] = useState(defaultProjectId);
  const [memoryEntries, setMemoryEntries] = useState<MemoryEntry[]>(initialMemoryEntries);
  const [chatMessagesByProject, setChatMessagesByProject] = useState<
    Record<string, DashboardChatMessage[]>
  >(initialChatMessagesByProject);
  const [notesByProject, setNotesByProject] = useState<Record<string, DashboardNote[]>>(
    initialNotesByProject
  );
  const [phaseHoursByProject, setPhaseHoursByProject] = useState<Record<string, PhaseHours>>({
    "food-delivery": createPhaseHours({
      requirements: 4,
      architecture: 6,
      code: 13,
    }),
    "ride-share": createPhaseHours({
      requirements: 5,
      architecture: 2,
    }),
    "study-buddy": createPhaseHours({
      requirements: 3,
      architecture: 7,
      code: 1,
    }),
  });
  const trackingSessionRef = useRef({
    projectId: defaultProjectId,
    phase: phaseFromPath(pathname),
    startedAt: Date.now(),
  });

  // Low-frequency tick so the active tracking session's elapsed time is
  // reflected in `phaseHours` while the user stays on a page, without
  // re-rendering on every tick of the clock (Date.now() itself can't be a
  // useMemo dependency without causing continuous re-renders).
  const [tick, setTick] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => setTick((t) => t + 1), 60_000);
    return () => clearInterval(interval);
  }, []);

  const currentProject =
    projects.find((p) => p.id === currentProjectId) ?? projects[0];

  const setCurrentProjectId = useCallback((id: string) => {
    setCurrentProjectIdState(id);
  }, []);

  useEffect(() => {
    const now = Date.now();
    const previous = trackingSessionRef.current;

    setPhaseHoursByProject((prev) => {
      if (!previous.phase) {
        return prev;
      }

      const elapsedMinutes = (now - previous.startedAt) / 60000;
      const projectHours = prev[previous.projectId] ?? createPhaseHours();

      return {
        ...prev,
        [previous.projectId]: {
          ...projectHours,
          [previous.phase]: Number(
            (projectHours[previous.phase] + elapsedMinutes).toFixed(2)
          ),
        },
      };
    });

    trackingSessionRef.current = {
      projectId: currentProjectId,
      phase: phaseFromPath(pathname),
      startedAt: now,
    };
  }, [pathname, currentProjectId]);

  const phaseHours = useMemo(() => {
    const base =
      phaseHoursByProject[currentProjectId] ??
      createPhaseHours({
        [currentProject.currentPhase]: 1,
      });

    const trackingSession = trackingSessionRef.current;

    if (
      trackingSession.projectId !== currentProjectId ||
      !trackingSession.phase
    ) {
      return base;
    }

    const elapsedMinutes = (Date.now() - trackingSession.startedAt) / 60000;
    return {
      ...base,
      [trackingSession.phase]: Number(
        (base[trackingSession.phase] + elapsedMinutes).toFixed(2)
      ),
    };
  }, [currentProject.currentPhase, currentProjectId, phaseHoursByProject, tick]);

  const activePhase = phaseFromPath(pathname) ?? currentProject.currentPhase;

  const addMemoryEntry = useCallback(
    (entry: Omit<MemoryEntry, "id" | "timestamp" | "sortDate">) => {
      const newEntry: MemoryEntry = {
        ...entry,
        id: `mem-${Date.now()}`,
        timestamp: "Just now",
        sortDate: new Date().toISOString(),
      };
      setMemoryEntries((prev) => [newEntry, ...prev]);
    },
    []
  );

  const chatMessages = chatMessagesByProject[currentProjectId] ?? EMPTY_CHAT_MESSAGES;
  const notes = notesByProject[currentProjectId] ?? EMPTY_NOTES;

  const addChatMessage = useCallback(
    (message: Omit<DashboardChatMessage, "id">) => {
      const nextMessage: DashboardChatMessage = {
        id: `chat-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
        ...message,
      };

      setChatMessagesByProject((prev) => ({
        ...prev,
        [currentProjectId]: [...(prev[currentProjectId] ?? []), nextMessage],
      }));
    },
    [currentProjectId]
  );

  const addNote = useCallback(
    (text: string) => {
      const trimmed = text.trim();
      if (!trimmed) {
        return;
      }

      const nextNote: DashboardNote = {
        id: `note-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
        text: trimmed,
      };

      setNotesByProject((prev) => ({
        ...prev,
        [currentProjectId]: [nextNote, ...(prev[currentProjectId] ?? [])],
      }));
    },
    [currentProjectId]
  );

  const removeNote = useCallback(
    (id: string) => {
      setNotesByProject((prev) => ({
        ...prev,
        [currentProjectId]: (prev[currentProjectId] ?? []).filter((note) => note.id !== id),
      }));
    },
    [currentProjectId]
  );

  // phaseHours updates on every navigation (see effect above). Keeping it in
  // its own context means the many consumers that only need currentProject/
  // notes/chat don't re-render on every route change.
  const contextValue = useMemo(
    () => ({
      currentProject,
      projects,
      memoryEntries,
      chatMessages,
      notes,
      setCurrentProjectId,
      addMemoryEntry,
      addChatMessage,
      addNote,
      removeNote,
      activePhase,
    }),
    [
      currentProject,
      memoryEntries,
      chatMessages,
      notes,
      setCurrentProjectId,
      addMemoryEntry,
      addChatMessage,
      addNote,
      removeNote,
      activePhase,
    ]
  );

  return (
    <ProjectContext.Provider value={contextValue}>
      <PhaseHoursContext.Provider value={phaseHours}>
        {children}
      </PhaseHoursContext.Provider>
    </ProjectContext.Provider>
  );
}

export function useProject() {
  const context = useContext(ProjectContext);
  if (!context) {
    throw new Error("useProject must be used within ProjectProvider");
  }
  return context;
}

export function usePhaseHours() {
  const context = useContext(PhaseHoursContext);
  if (!context) {
    throw new Error("usePhaseHours must be used within ProjectProvider");
  }
  return context;
}

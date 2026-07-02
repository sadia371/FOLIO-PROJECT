"use client";

import { useState } from "react";
import { X, FileText } from "lucide-react";
import type { Toast } from "@/components/shared/use-toasts";

export function QuickNotesCard({ addToast }: { addToast: (m: string, t?: Toast["type"]) => void }) {
  const [notes, setNotes] = useState([
    "Follow up on cloud provider decision by EOD.",
    "Demo rehearsal at 2:30 PM — auth + order flow.",
  ]);
  const [newNote, setNewNote] = useState("");

  const addNote = () => {
    if (newNote.trim()) {
      setNotes((n) => [...n, newNote.trim()]);
      setNewNote("");
      addToast("Note saved", "success");
    }
  };

  return (
    <div className="flex flex-col p-4 bg-surface border border-border rounded-card">
      <div className="mb-3 flex items-center gap-2 text-[10px] text-text-secondary tracking-[0.04em] uppercase">
        <FileText className="h-3.5 w-3.5 text-text-muted translate-y-[-2px]" />
        <p>Quick Notes</p>
      </div>
      <div className="flex flex-col gap-2 flex-1 min-h-[220px]">
        {notes.map((note, i) => (
          <div key={i} className="flex items-center justify-between p-3 bg-surface-container border border-border rounded-lg group hover:bg-surface-container-high hover:border-border-soft transition-colors">
            <span className="text-[11px] text-text-primary flex-1 mr-2">{note}</span>
            <button
              onClick={() => {
                setNotes((n) => n.filter((_, idx) => idx !== i));
                addToast("Note deleted", "info");
              }}
              aria-label="Delete note"
              className="opacity-0 group-hover:opacity-100 text-[14px] text-text-secondary hover:text-status-danger transition-all flex-shrink-0"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        ))}
        <div className="flex items-center justify-between px-3 py-2 bg-border rounded-md mt-auto focus-within:bg-border/80 transition-colors">
          <input
            type="text"
            placeholder="Add a note..."
            value={newNote}
            onChange={(e) => setNewNote(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && addNote()}
            className="flex-1 bg-transparent text-[11px] text-text-primary placeholder-text-muted outline-none"
          />
          <button
            onClick={addNote}
            disabled={!newNote.trim()}
            className="ml-2 flex items-center justify-center px-2.5 py-1.5 bg-[#1d1d1f] rounded-md hover:bg-[#3a3a3c] transition-colors disabled:opacity-30"
          >
            <span className="text-[10px] text-white">Save</span>
          </button>
        </div>
      </div>
    </div>
  );
}

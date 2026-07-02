"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";

// Split into two contexts so pages that only *write* via useHeaderSlot (the
// setter, stable for the provider's lifetime) never resubscribe to the
// *value* context that AppShell reads — otherwise a page would re-render
// every time it updates its own header content, looping forever.
const SetHeaderSlotContext = createContext<((node: React.ReactNode) => void) | undefined>(undefined);
const HeaderSlotValueContext = createContext<React.ReactNode>(null);

export function HeaderSlotProvider({ children }: { children: React.ReactNode }) {
  const [headerSlot, setHeaderSlot] = useState<React.ReactNode>(null);
  return (
    <SetHeaderSlotContext.Provider value={setHeaderSlot}>
      <HeaderSlotValueContext.Provider value={headerSlot}>
        {children}
      </HeaderSlotValueContext.Provider>
    </SetHeaderSlotContext.Provider>
  );
}

/**
 * Lets a page inject content into the shared AppShell header (e.g. a project switcher).
 *
 * `factory` is only re-invoked when an entry in `deps` changes (same semantics as
 * `useMemo`), so passing inline JSX no longer creates a new node reference — and
 * therefore doesn't re-trigger the effect — on every render of the calling page.
 */
export function useHeaderSlot(factory: () => React.ReactNode, deps: React.DependencyList) {
  const setHeaderSlot = useContext(SetHeaderSlotContext);
  if (!setHeaderSlot) {
    throw new Error("useHeaderSlot must be used within HeaderSlotProvider");
  }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const node = useMemo(factory, deps);
  useEffect(() => {
    setHeaderSlot(node);
    return () => setHeaderSlot(null);
  }, [node, setHeaderSlot]);
}

export function useHeaderSlotValue() {
  return useContext(HeaderSlotValueContext);
}

'use client';

import { usePathname } from 'next/navigation';
import * as React from 'react';

type SidebarState = {
  /** lg+ : folded to the icon rail */
  collapsed: boolean;
  toggleCollapsed: () => void;
  /** below lg : the drawer is open */
  mobileOpen: boolean;
  setMobileOpen: (open: boolean) => void;
  /** the search field should take focus (the rail's search button expands the sidebar first) */
  searchRequested: number;
  requestSearch: () => void;
};

const SidebarContext = React.createContext<SidebarState | null>(null);

export function SidebarProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = React.useState(false);
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [searchRequested, setSearchRequested] = React.useState(0);

  // the drawer closes whenever the route changes (a link inside it was followed)
  const [lastPath, setLastPath] = React.useState(pathname);
  if (pathname !== lastPath) {
    setLastPath(pathname);
    setMobileOpen(false);
  }

  const value = React.useMemo<SidebarState>(
    () => ({
      collapsed,
      toggleCollapsed: () => setCollapsed((c) => !c),
      mobileOpen,
      setMobileOpen,
      searchRequested,
      requestSearch: () => {
        setCollapsed(false);
        setSearchRequested((n) => n + 1);
      },
    }),
    [collapsed, mobileOpen, searchRequested],
  );

  return <SidebarContext.Provider value={value}>{children}</SidebarContext.Provider>;
}

export function useSidebar() {
  const ctx = React.useContext(SidebarContext);
  if (!ctx) throw new Error('useSidebar must be used inside <SidebarProvider>');
  return ctx;
}

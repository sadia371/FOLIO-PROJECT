"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import {
  Home,
  FileText,
  CalendarDays,
  Code2,
  Rocket,
  MessageSquare,
  Settings,
  User,
  ChevronRight,
  Menu,
  Moon,
  Sun,
  X,
  Check,
  ChevronDown,
  LogOut,
} from "lucide-react";
import { useTheme } from "@/components/theme-provider";
import { useHeaderSlotValue } from "@/components/layout/header-slot";
import { useProject } from "@/context/project-context";

const navItems = [
  { icon: Home, href: "/dashboard", label: "Dashboard" },
  { icon: FileText, href: "/requirements", label: "Requirements" },
  { icon: CalendarDays, href: "/architecture", label: "Architecture" },
  { icon: Code2, href: "/code", label: "Code" },
  { icon: Rocket, href: "/deployment", label: "Deployment" },
  { icon: MessageSquare, href: "#", label: "Copilot" },
  { icon: Settings, href: "/settings", label: "Settings" },
];

function Dot({ color = "green", size = 6 }: { color?: string; size?: number }) {
  return (
    <span
      className="inline-block rounded-full shrink-0"
      style={{ width: size, height: size, backgroundColor: color }}
    />
  );
}

export function Sidebar({
  isOpen,
  onClose,
  isExpanded = false,
}: {
  isOpen?: boolean;
  onClose?: () => void;
  isExpanded?: boolean;
}) {
  const pathname = usePathname();

  return (
    <>
      {/* Mobile Backdrop Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden backdrop-blur-sm transition-opacity duration-300"
          onClick={onClose}
        />
      )}

      {/* Sidebar container */}
      <div
        className={`fixed inset-y-0 left-0 z-50 w-64 ${
          isExpanded ? "md:w-64" : "md:w-16"
        } h-full shrink-0 flex flex-col py-3 gap-1 transition-all duration-300 ease-in-out md:translate-x-0 md:static md:z-auto ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
        style={{ background: "rgb(var(--sidebar-bg) / 0.95)", backdropFilter: "blur(20px)" }}
      >
        {/* Mobile Header inside drawer */}
        <div className="flex items-center justify-between px-4 pb-4 mb-2 border-b border-white/10 md:hidden">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-control bg-white/10 flex items-center justify-center">
              <span className="text-white text-[11px] font-medium">F</span>
            </div>
            <span className="text-white font-medium text-sm">DevPilot</span>
          </div>
          <button
            onClick={onClose}
            aria-label="Close sidebar"
            className="p-1.5 rounded-lg text-white/60 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Desktop Logo */}
        <div className={`hidden md:flex mb-1 pb-2 w-full ${isExpanded ? "px-4" : "flex-col items-center"}`}>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-control bg-white/10 flex items-center justify-center">
              <span className="text-white text-[11px] font-medium">F</span>
            </div>
            {isExpanded && <span className="text-white font-medium text-sm transition-opacity duration-300">DevPilot</span>}
          </div>
        </div>

        {/* Navigation Items */}
        <div className={`flex flex-col gap-1.5 md:gap-1 flex-1 px-3 md:px-0 w-full ${isExpanded ? "md:items-stretch" : "md:items-center"}`}>
          {navItems.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href + item.label}
                href={item.href}
                onClick={onClose}
                className={`w-full h-11 md:h-10 rounded-control flex items-center transition-colors ${
                  active ? "bg-status-success/15" : "hover:bg-white/5"
                } ${
                  isExpanded ? "md:w-full md:px-4" : "md:w-10 md:justify-center md:px-0"
                }`}
                title={item.label}
              >
                <div className="flex items-center gap-3">
                  <item.icon
                    className={`w-[18px] h-[18px] ${active ? "text-status-success" : "text-white/45"}`}
                    strokeWidth={1.5}
                  />
                  <span
                    className={`text-sm font-medium ${
                      active ? "text-status-success" : "text-white/70"
                    } ${isExpanded ? "md:inline-block" : "md:hidden"}`}
                  >
                    {item.label}
                  </span>
                </div>
              </Link>
            );
          })}
        </div>

        {/* Profile Avatar / Link at Bottom */}
        <div className={`px-4 md:px-0 w-full flex flex-col gap-1 pt-2 border-t border-white/10 md:border-t-0 ${isExpanded ? "md:px-4" : "md:items-center md:w-auto"}`}>
          <Link
            href="/profile"
            onClick={onClose}
            className={`w-full flex items-center gap-3 hover:bg-white/5 transition-colors px-2 ${
              isExpanded
                ? "md:w-full md:px-4 md:py-2 md:rounded-control"
                : "md:w-8 md:h-8 md:rounded-full md:bg-white/15 md:justify-center md:px-0"
            }`}
          >
            <div className="w-7 h-7 rounded-full bg-white/15 flex items-center justify-center shrink-0">
              <User className="w-3.5 h-3.5 text-white" />
            </div>
            <span className={`text-sm font-medium text-white/70 ${isExpanded ? "md:inline-block" : "md:hidden"}`}>My Profile</span>
          </Link>
          <SignOutButton isExpanded={isExpanded} onNavigate={onClose} />
        </div>
      </div>
    </>
  );
}

function SignOutButton({ isExpanded, onNavigate }: { isExpanded: boolean; onNavigate?: () => void }) {
  const router = useRouter();

  function handleSignOut() {
    try {
      window.localStorage.removeItem("devpilot_auth");
    } catch {
      /* ignore */
    }
    onNavigate?.();
    router.push("/sign-in");
  }

  return (
    <button
      onClick={handleSignOut}
      title="Sign out"
      className={`w-full flex items-center gap-3 hover:bg-white/5 transition-colors px-2 rounded-control ${
        isExpanded
          ? "md:w-full md:px-4 md:py-2"
          : "md:w-8 md:h-8 md:justify-center md:px-0"
      }`}
    >
      <div className="w-7 h-7 flex items-center justify-center shrink-0">
        <LogOut className="w-3.5 h-3.5 text-white/50" strokeWidth={1.75} />
      </div>
      <span className={`text-sm font-medium text-white/50 ${isExpanded ? "md:inline-block" : "md:hidden"}`}>Sign out</span>
    </button>
  );
}

function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const isDark = resolvedTheme === "dark";

  return (
    <button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
      className="p-1.5 rounded-control text-text-secondary hover:bg-canvas hover:text-text-primary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent shrink-0"
    >
      {isDark ? <Sun className="w-4 h-4" strokeWidth={1.75} /> : <Moon className="w-4 h-4" strokeWidth={1.75} />}
    </button>
  );
}

function getPageTitle(pathname: string): string {
  const titles: Record<string, string> = {
    "/dashboard": "Dashboard",
    "/code": "Codebase",
    "/requirements": "Requirements",
    "/architecture": "Architecture",
    "/deployment": "Deployment",
    "/settings": "Settings",
    "/profile": "Profile",
  };
  return titles[pathname] || "DevPilot";
}

export function Header({
  children,
  onToggleSidebar,
}: {
  breadcrumb?: { label: string; href?: string }[];
  children?: React.ReactNode;
  onToggleSidebar?: () => void;
}) {
  const { currentProject, projects, setCurrentProjectId } = useProject();
  const [showProjectDropdown, setShowProjectDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setShowProjectDropdown(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div
      className="h-[52px] w-full flex items-center px-3 sm:px-4 gap-2 sm:gap-3 shrink-0 border-b border-border select-none"
      style={{ background: "rgb(var(--header-bg) / 0.85)" }}
    >
      {/* Hamburger menu trigger */}
      {onToggleSidebar && (
        <button
          onClick={onToggleSidebar}
          className="p-1.5 -ml-1 rounded-lg text-text-primary hover:bg-border/30 transition-colors shrink-0"
          aria-label="Toggle sidebar"
        >
          <Menu className="w-5 h-5" strokeWidth={2} />
        </button>
      )}

      <div className="flex items-center gap-1 sm:gap-1.5">
        {/* Project Selector Dropdown */}
        <div className="relative shrink-0" ref={dropdownRef}>
          <button
            onClick={() => setShowProjectDropdown((v) => !v)}
            className="flex items-center px-2 py-0.5 rounded hover:bg-border/30 transition-colors gap-0.5 text-[12px] sm:text-[13px] font-medium text-text-secondary hover:text-text-primary"
          >
            <span>{currentProject.name}</span>
            <ChevronDown className={`w-3 h-3 text-text-secondary transition-transform ${showProjectDropdown ? "rotate-180" : ""}`} />
          </button>
          
          {showProjectDropdown && (
            <div className="absolute top-full left-0 mt-1 w-48 bg-surface border border-border rounded-lg shadow-lg overflow-hidden z-50">
              {projects.map((p) => (
                <button
                  key={p.id}
                  onClick={() => {
                    setCurrentProjectId(p.id);
                    setShowProjectDropdown(false);
                  }}
                  className={`w-full flex items-center px-3 py-2 text-[12px] text-left hover:bg-canvas transition-colors ${
                    p.id === currentProject.id ? "bg-accent-green/10 text-accent-green font-medium" : "text-text-primary"
                  }`}
                >
                  {p.name}
                  {p.id === currentProject.id && <Check className="w-3 h-3 ml-auto text-accent-green" />}
                </button>
              ))}
            </div>
          )}
        </div>

        <ChevronRight className="w-3 h-3 text-text-muted shrink-0" />

        <span className="text-[12px] sm:text-[13px] font-medium text-text-primary truncate">
          {getPageTitle(pathname)}
        </span>
      </div>

      <div className="hidden sm:flex items-center gap-1.5 bg-surface-container rounded-full px-2 py-1 shrink-0">
        <Dot color="rgb(var(--status-success))" size={6} />
        <span className="text-[10px] sm:text-[11px] font-medium text-text-primary">Sprint 42 Active</span>
      </div>

      {children}

      <div className="flex-1" />

      <span className="text-[11px] sm:text-[12px] text-text-secondary shrink-0 hidden sm:inline">Week 4 of 9</span>
      <ThemeToggle />
      <Dot color="rgb(var(--status-danger))" size={8} />
    </div>
  );
}

export function AppShell({
  children,
  breadcrumb,
}: {
  children: React.ReactNode;
  breadcrumb?: { label: string; href?: string }[];
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarExpanded, setSidebarExpanded] = useState(false);
  const headerSlot = useHeaderSlotValue();

  return (
    <div
      className="flex h-screen w-full overflow-hidden bg-canvas"
      style={{ fontFamily: "'Inter', sans-serif" }}
    >
      <Sidebar
        isOpen={sidebarOpen}
        onClose={() => {
          setSidebarOpen(false);
          setSidebarExpanded(false);
        }}
        isExpanded={sidebarExpanded}
      />
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden relative">
        <Header
          breadcrumb={breadcrumb}
          onToggleSidebar={() => {
            setSidebarOpen((prev) => !prev);
            setSidebarExpanded((prev) => !prev);
          }}
        >
          {headerSlot}
        </Header>
        <main className="flex-1 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
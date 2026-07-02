"use client";

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { ThemeProvider } from "@/components/theme-provider";
import { ProjectProvider } from "@/context/project-context";
import { AppShell } from "@/components/layout/app-shell";
import { HeaderSlotProvider } from "@/components/layout/header-slot";
import FloatingCopilot from "@/components/FloatingCopilot";

const AUTH_ROUTES = ["/sign-in", "/sign-up"];
// "/" is the marketing/landing page — treated as fullscreen (no AppShell, no breadcrumb,
// AuthGuard skips redirect check) because page.tsx now owns its own auth logic.
const FULLSCREEN_ROUTES = [...AUTH_ROUTES, "/onboarding"];

function isRootLanding(pathname: string) {
  return pathname === "/";
}

function AuthGuard({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const isFullscreenRoute =
    isRootLanding(pathname) || FULLSCREEN_ROUTES.some((r) => pathname.startsWith(r));

  useEffect(() => {
    if (isFullscreenRoute) return;
    try {
      const isAuthed = window.localStorage.getItem("devpilot_auth") === "1";
      if (!isAuthed) router.replace("/sign-in");
    } catch {
      /* ignore — no localStorage access, let the page render */
    }
  }, [pathname, isFullscreenRoute, router]);

  return <>{children}</>;
}

export function Providers({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAuthRoute = AUTH_ROUTES.some((r) => pathname.startsWith(r));
  const isOnboardingRoute = pathname.startsWith("/onboarding");
  const isLandingRoute = isRootLanding(pathname);
  const isFullscreenRoute = isAuthRoute || isOnboardingRoute || isLandingRoute;

  const breadcrumb = isFullscreenRoute
    ? undefined
    : [{ label: "FolioDesk", href: "/dashboard" }, { label: getPageTitle(pathname) }];

  return (
    <ThemeProvider>
      <ProjectProvider>
        <HeaderSlotProvider>
          <AuthGuard>
            {isFullscreenRoute ? (
              children
            ) : (
              <AppShell breadcrumb={breadcrumb}>{children}</AppShell>
            )}
          </AuthGuard>
        </HeaderSlotProvider>
      </ProjectProvider>
      {!isFullscreenRoute && <FloatingCopilot />}
    </ThemeProvider>
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
export default function LandingLayout({ children }: { children: React.ReactNode }) {
  // Landing page has its own Nav - no app shell, no FloatingCopilot
  return <>{children}</>;
}



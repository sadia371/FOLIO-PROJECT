"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import LandingPage from "@/components/landing/landing-page";

export default function Home() {
  const router = useRouter();
  const [authState, setAuthState] = useState<"loading" | "unauthenticated">("loading");

  useEffect(() => {
    try {
      const isAuthed = window.localStorage.getItem("devpilot_auth") === "1";
      const isOnboarded = window.localStorage.getItem("devpilot_onboarded") === "1";
      if (!isAuthed) {
        setAuthState("unauthenticated");
      } else if (!isOnboarded) {
        router.replace("/onboarding");
      } else {
        router.replace("/dashboard");
      }
    } catch {
      setAuthState("unauthenticated");
    }
  }, [router]);

  if (authState === "loading") {
    return <div className="min-h-screen w-full bg-canvas" />;
  }

  return <LandingPage />;
}
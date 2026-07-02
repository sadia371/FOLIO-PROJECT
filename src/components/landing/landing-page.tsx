"use client";

import { Nav } from "@/components/landing/Nav";
import { Hero } from "@/components/landing/Hero";
import {
  Features,
  FinalCTA,
  Footer,
  LogoStrip,
  Philosophy,
  Pricing,
  SectionDivider,
  SocialProof,
  Workflow,
} from "@/components/landing/Sections";

export default function LandingPage() {
  return (
    <main className="lp-root relative min-h-screen overflow-x-clip">
      <Nav />
      <Hero />
      <LogoStrip />
      <SectionDivider />
      <Features />
      <SectionDivider />
      <Workflow />
      <Philosophy />
      <SocialProof />
      <SectionDivider />
      <Pricing />
      <FinalCTA />
      <Footer />
    </main>
  );
}

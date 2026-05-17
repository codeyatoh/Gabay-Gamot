import { CtaSection } from "@/components/landing/CtaSection";
import { FeaturesSection } from "@/components/landing/FeaturesSection";
import { HeroSection } from "@/components/landing/HeroSection";
import { ProblemSolutionSection } from "@/components/landing/ProblemSolutionSection";
import { RolesSection } from "@/components/landing/RolesSection";
import { TechnologySection } from "@/components/landing/TechnologySection";
import { WorkflowSection } from "@/components/landing/WorkflowSection";
import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";

export function LandingPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <HeroSection />
        <ProblemSolutionSection />
        <FeaturesSection />
        <WorkflowSection />
        <RolesSection />
        <TechnologySection />
        <CtaSection />
      </main>
      <Footer />
    </div>
  );
}

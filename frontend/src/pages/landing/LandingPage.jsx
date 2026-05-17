import { FaqSection } from "@/components/landing/FaqSection";
import { FeaturesSection } from "@/components/landing/FeaturesSection";
import { HeroSection } from "@/components/landing/HeroSection";
import { TechnologySection } from "@/components/landing/TechnologySection";
import { TeamSection } from "@/components/landing/TeamSection";
import { WorkflowSection } from "@/components/landing/WorkflowSection";
import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";

export function LandingPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-16">
        <HeroSection />
        <FeaturesSection />
        <WorkflowSection />
        <TechnologySection />
        <TeamSection />
        <FaqSection />
      </main>
      <Footer />
    </div>
  );
}

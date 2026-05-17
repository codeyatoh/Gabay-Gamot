import { ArrowRight, CheckCircle2, ShieldCheck } from "lucide-react";

import { ProductPreview } from "@/components/landing/ProductPreview";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const proofPoints = ["OCR-assisted encoding", "Barangay referrals", "AI stock recommendations"];

export function HeroSection() {
  return (
    <section id="home" className="relative overflow-hidden bg-[linear-gradient(180deg,#f8fbf5_0%,#ffffff_72%)]">
      <div className="section-shell grid min-h-[calc(100vh-4rem)] items-center gap-14 py-16 lg:grid-cols-[0.95fr_1.05fr] lg:py-20">
        <div className="max-w-2xl reveal">
          <Badge className="mb-6 rounded-full border-[#dbe9d5] bg-white px-3 py-1 text-[#0b6b35] shadow-sm">
            <ShieldCheck className="mr-2 h-3.5 w-3.5" />
            Built for barangay medicine coordination
          </Badge>

          <h1 className="text-4xl font-semibold leading-tight text-slate-950 sm:text-5xl lg:text-6xl">
            Reduce medicine waste before shortages reach patients.
          </h1>

          <p className="mt-6 max-w-xl text-base leading-8 text-slate-600 sm:text-lg">
            GabayGamot helps health workers scan medicines, monitor inventory, track dispensing,
            and generate referrals when nearby barangays have available stock.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button size="lg" className="h-12 rounded-xl bg-[#0b6b35] px-6 text-white shadow-panel hover:bg-[#08552b]">
              Get Started
              <ArrowRight className="h-4 w-4" />
            </Button>
            <Button size="lg" variant="outline" className="h-12 rounded-xl border-slate-200 bg-white px-6 text-slate-800">
              View Workflow
            </Button>
          </div>

          <div className="mt-8 grid gap-3 text-sm text-slate-600 sm:grid-cols-3">
            {proofPoints.map((point) => (
              <div key={point} className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-[#0b6b35]" />
                <span>{point}</span>
              </div>
            ))}
          </div>
        </div>

        <ProductPreview />
      </div>
    </section>
  );
}

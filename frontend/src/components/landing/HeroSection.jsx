import { ArrowRight, SearchCheck } from "lucide-react";

import logoUrl from "@/assets/images/gabay-gamot-logo-sm.png";
import { Button } from "@/components/ui/button";

export function HeroSection() {
  return (
    <section id="home" className="relative flex min-h-[calc(100vh-4rem)] items-center justify-center overflow-hidden bg-[#f8fbf5] px-4 py-16 dark:bg-[#0a0f0d]">
      <div className="absolute inset-0 overflow-hidden">
        <div className="relative min-h-full w-full">
          {/* Grid pattern */}
          <div
            className="absolute inset-0 z-0 opacity-[0.30] dark:opacity-[0.45]"
            style={{
              backgroundImage: `
                linear-gradient(to right, #0b6b35 1px, transparent 1px),
                linear-gradient(to bottom, #0b6b35 1px, transparent 1px)
              `,
              backgroundSize: "22px 22px",
              backgroundPosition: "0 0, 0 0",
              maskImage: `
                repeating-linear-gradient(
                  to right,
                  black 0px,
                  black 3px,
                  transparent 3px,
                  transparent 9px
                ),
                repeating-linear-gradient(
                  to bottom,
                  black 0px,
                  black 3px,
                  transparent 3px,
                  transparent 9px
                ),
                radial-gradient(ellipse 72% 62% at 50% 4%, #000 56%, transparent 100%)
              `,
              WebkitMaskImage: `
                repeating-linear-gradient(
                  to right,
                  black 0px,
                  black 3px,
                  transparent 3px,
                  transparent 9px
                ),
                repeating-linear-gradient(
                  to bottom,
                  black 0px,
                  black 3px,
                  transparent 3px,
                  transparent 9px
                ),
                radial-gradient(ellipse 72% 62% at 50% 4%, #000 56%, transparent 100%)
              `,
              maskComposite: "intersect",
              WebkitMaskComposite: "source-in",
            }}
          />
          {/* Radial glow */}
          <div
            className="absolute inset-0 z-0"
            style={{
              background:
                "radial-gradient(120% 120% at 50% 8%, rgba(248,251,245,0) 38%, rgba(11,107,53,0.2) 100%)",
            }}
          />
          <div className="absolute left-1/2 top-20 h-72 w-72 -translate-x-1/2 rounded-full bg-[#45b52c]/14 blur-3xl dark:bg-[#16a34a]/10" />
          <div className="absolute bottom-0 left-1/2 h-56 w-[42rem] -translate-x-1/2 rounded-full bg-[#0b6b35]/10 blur-3xl dark:bg-[#16a34a]/8" />
        </div>
      </div>

      <div className="section-shell relative z-10 flex flex-col items-center text-center">
        <img src={logoUrl} alt="GabayGamot" className="h-24 w-24 object-contain drop-shadow-sm transition-all dark:drop-shadow-[0_0_12px_rgba(74,222,128,0.5)] sm:h-28 sm:w-28" />

        <h1 className="mt-8 max-w-4xl text-balance text-5xl font-extrabold leading-[0.95] tracking-normal text-slate-950 dark:text-slate-50 sm:text-6xl lg:text-8xl">
          GabayGamot
        </h1>

        <div className="flex max-w-2xl flex-col items-center justify-center px-2 pt-8 text-center">
          <p className="text-balance text-base leading-8 text-slate-600 dark:text-slate-400 sm:text-lg">
            A medicine coordination system for scanning inventory, monitoring expiry, dispensing
            stock, and finding nearby barangay referrals.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Button className="h-12 rounded-full bg-[#0b6b35] px-7 text-white shadow-panel hover:bg-[#08552b] dark:bg-[#16a34a] dark:hover:bg-[#15803d] md:h-14 md:px-9">
              Get Started
              <ArrowRight className="h-4 w-4" />
            </Button>
            <Button
              variant="secondary"
              className="h-12 rounded-full border border-[#d6e8cf] bg-white/80 px-7 text-[#083f24] shadow-sm backdrop-blur-md hover:bg-[#eef8e9] dark:border-white/10 dark:bg-white/5 dark:text-slate-200 dark:hover:bg-white/10 md:h-14 md:px-9"
            >
              <SearchCheck className="h-4 w-4" />
              View Workflow
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

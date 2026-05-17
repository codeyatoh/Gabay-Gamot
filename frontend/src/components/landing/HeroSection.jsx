import { ArrowRight, CheckCircle2, ClipboardList, MapPinned, PackageCheck, ShieldCheck } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const proofPoints = ["OCR-assisted encoding", "Barangay referrals", "AI stock recommendations"];

export function HeroSection() {
  return (
    <section id="home" className="relative overflow-hidden bg-[linear-gradient(180deg,#f8fbf5_0%,#ffffff_84%)] px-3 pb-8 pt-3 sm:px-4">
      <div className="section-shell px-0">
        <div className="relative min-h-[calc(100vh-9rem)] overflow-hidden rounded-[2rem] border border-[#d6e8cf] bg-[#f8fbf5] shadow-soft lg:rounded-[3rem]">
          <AnimatedCapsuleBackdrop />

          <div className="relative z-10 flex min-h-[calc(100vh-9rem)] flex-col justify-end px-6 pb-10 pt-28 sm:px-8 lg:px-12 lg:pb-16">
            <div className="max-w-2xl reveal">
              <Badge className="mb-6 rounded-full border-[#dbe9d5] bg-white/82 px-3 py-1 text-[#0b6b35] shadow-sm backdrop-blur-md">
                <ShieldCheck className="mr-2 h-3.5 w-3.5" />
                Built for barangay medicine coordination
              </Badge>

              <h1 className="max-w-2xl text-balance text-4xl font-semibold leading-tight text-slate-950 sm:text-5xl lg:text-6xl">
                Reduce medicine waste before shortages reach patients.
              </h1>

              <p className="mt-6 max-w-xl text-balance text-base leading-8 text-slate-600 sm:text-lg">
                GabayGamot helps health workers scan medicines, monitor inventory, track dispensing,
                and generate referrals when nearby barangays have available stock.
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Button size="lg" className="h-12 rounded-full bg-[#0b6b35] pl-6 pr-4 text-white shadow-panel hover:bg-[#08552b]">
                  Get Started
                  <ArrowRight className="h-4 w-4" />
                </Button>
                <Button
                  size="lg"
                  variant="ghost"
                  className="h-12 rounded-full border border-[#dbe9d5] bg-white/76 px-6 text-slate-800 shadow-sm backdrop-blur-md hover:bg-[#eef8e9] hover:text-[#0b6b35]"
                >
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
          </div>
        </div>
      </div>
    </section>
  );
}

function AnimatedCapsuleBackdrop() {
  const capsules = [
    "left-[58%] top-[20%] h-12 w-32 rotate-[-18deg] animate-capsule-float bg-[linear-gradient(90deg,#ffffff_0_50%,#45b52c_50%)]",
    "left-[78%] top-[28%] h-10 w-28 rotate-[19deg] animate-capsule-drift bg-[linear-gradient(90deg,#dff0d2_0_50%,#0b6b35_50%)]",
    "left-[64%] top-[58%] h-9 w-24 rotate-[14deg] animate-capsule-float bg-[linear-gradient(90deg,#ffffff_0_50%,#9bd974_50%)]",
    "left-[84%] top-[63%] h-11 w-28 rotate-[-25deg] animate-capsule-drift bg-[linear-gradient(90deg,#eef8e9_0_50%,#0f5a32_50%)]",
  ];

  const signals = [
    { label: "OCR scan ready", value: "Medicine labels digitized", icon: ClipboardList, className: "right-[17%] top-[23%]" },
    { label: "Expiry alert", value: "12 items need review", icon: PackageCheck, className: "right-[9%] top-[45%]" },
    { label: "Referral found", value: "Stock available nearby", icon: MapPinned, className: "right-[22%] bottom-[18%]" },
  ];

  return (
    <div aria-hidden="true" className="absolute inset-0 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_78%_24%,rgba(69,181,44,0.22),transparent_30%),linear-gradient(110deg,rgba(255,255,255,0.96)_0%,rgba(255,255,255,0.84)_42%,rgba(238,248,233,0.64)_58%,rgba(8,63,36,0.96)_100%)]" />
      <div className="absolute right-[-14%] top-[-20%] h-[34rem] w-[52rem] rounded-bl-[9rem] rounded-tl-[16rem] bg-[#083f24] shadow-[0_40px_120px_rgba(8,63,36,0.28)]" />
      <div className="absolute right-[7%] top-[8%] h-64 w-64 rounded-full border border-white/15 bg-white/10 blur-[1px]" />
      <div className="absolute bottom-[-18%] right-[6%] h-96 w-96 rounded-full bg-[#45b52c]/18 blur-3xl" />
      <div className="absolute left-[6%] top-[12%] h-60 w-60 rounded-full bg-[#dff0d2]/45 blur-3xl" />

      <div className="absolute right-[10%] top-[16%] hidden h-[24rem] w-[24rem] rounded-full border border-white/10 bg-white/5 backdrop-blur-[1px] md:block" />
      <div className="absolute right-[13%] top-[25%] hidden h-44 w-44 rounded-full border border-[#9bd974]/20 md:block" />

      {capsules.map((className) => (
        <span
          key={className}
          className={`${className} absolute hidden rounded-full border border-white/45 shadow-[0_20px_50px_rgba(8,63,36,0.2)] md:block`}
        >
          <span className="absolute left-1/2 top-1/2 h-[calc(100%-8px)] w-px -translate-y-1/2 bg-white/70" />
        </span>
      ))}

      {signals.map((signal) => {
        const Icon = signal.icon;
        return (
          <div
            key={signal.label}
            className={`absolute ${signal.className} hidden w-64 rounded-2xl border border-white/55 bg-white/82 p-4 shadow-panel backdrop-blur-xl lg:block`}
          >
            <div className="flex items-start gap-3">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#eef8e9] text-[#0b6b35]">
                <Icon className="h-4 w-4" />
              </span>
              <span>
                <span className="block text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">{signal.label}</span>
                <span className="mt-1 block text-sm font-semibold text-slate-900">{signal.value}</span>
              </span>
            </div>
          </div>
        );
      })}

      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#f8fbf5] via-[#f8fbf5]/74 to-transparent" />
      <div className="absolute inset-y-0 left-0 w-[70%] bg-[linear-gradient(90deg,#f8fbf5_0%,#f8fbf5_58%,rgba(248,251,245,0.82)_75%,transparent_100%)]" />
    </div>
  );
}

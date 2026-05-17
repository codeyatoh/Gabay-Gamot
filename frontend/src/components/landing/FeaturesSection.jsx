import { Bell, Brain, FileText, MapPin, Pill, ScanLine } from "lucide-react";

const features = [
  {
    icon: ScanLine,
    title: "OCR medicine scanning",
    text: "Extracts medicine name, expiry date, and category before user review.",
  },
  {
    icon: Pill,
    title: "Inventory monitoring",
    text: "Tracks available stock and supports cleaner medicine records.",
  },
  {
    icon: Bell,
    title: "Expiry and stock alerts",
    text: "Highlights medicines that need attention before they become waste.",
  },
  {
    icon: FileText,
    title: "Dispensing logs",
    text: "Records patient, medicine, quantity, date, worker, and remarks.",
  },
  {
    icon: MapPin,
    title: "Nearby referrals",
    text: "Finds available medicine in nearby barangays and prepares referral details.",
  },
  {
    icon: Brain,
    title: "AI recommendations",
    text: "Supports redistribution, shortage prevention, and procurement planning.",
  },
];

export function FeaturesSection() {
  return (
    <section
      id="features"
      className="bg-[#f8fbf5] pb-24 pt-36"
      style={{ scrollMarginTop: "8rem", paddingTop: "9rem" }}
    >
      <div className="section-shell flex min-h-[calc(100vh-8rem)] flex-col items-center justify-center">
        <div className="relative w-full overflow-hidden rounded-md border border-[#0b6b35]/40 bg-white/46 shadow-soft backdrop-blur-sm">
          <DotPattern />

          <div className="absolute -left-1.5 -top-1.5 h-3 w-3 rounded-md bg-[#0b6b35]" />
          <div className="absolute -bottom-1.5 -left-1.5 h-3 w-3 rounded-md bg-[#0b6b35]" />
          <div className="absolute -right-1.5 -top-1.5 h-3 w-3 rounded-md bg-[#0b6b35]" />
          <div className="absolute -bottom-1.5 -right-1.5 h-3 w-3 rounded-md bg-[#0b6b35]" />

          <div className="relative p-6 sm:p-10 md:py-16 lg:p-16">
            <p className="text-xs font-medium uppercase tracking-[0.22em] text-[#0b6b35] md:text-sm">
              Core features
            </p>

            <div className="mt-5 text-center text-3xl leading-[1.05] tracking-normal text-slate-950 sm:text-5xl lg:text-6xl xl:text-7xl md:text-left">
              <p>
                <span className="font-semibold">Everything starts</span>{" "}
                <span className="font-thin">with clearer</span>
              </p>
              <p>
                <span className="font-thin">medicine visibility</span>{" "}
                <span className="font-semibold">for daily</span>
              </p>
              <p>
                <span className="font-thin">barangay</span>{" "}
                <span className="font-semibold">health workflows.</span>
              </p>
            </div>

            <p className="mt-6 max-w-2xl text-center text-sm leading-7 text-slate-600 md:text-left md:text-base">
              Each feature is designed around the health worker's daily flow, not a generic
              inventory template.
            </p>

            <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {features.map((feature) => (
                <div
                  key={feature.title}
                  className="group rounded-md border border-[#dbe9d5] bg-white/82 p-4 shadow-sm backdrop-blur-md transition duration-200 hover:-translate-y-0.5 hover:border-[#0b6b35]/45 hover:bg-[#eef8e9]"
                >
                  <div className="flex items-start gap-3">
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-[#eef8e9] text-[#0b6b35] transition group-hover:bg-[#0b6b35] group-hover:text-white">
                      <feature.icon className="h-4 w-4" />
                    </span>
                    <span>
                      <span className="block text-sm font-semibold text-slate-950">{feature.title}</span>
                      <span className="mt-1 block text-xs leading-5 text-slate-600">{feature.text}</span>
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function DotPattern() {
  return (
    <svg className="pointer-events-none absolute inset-0 h-full w-full text-[#0b6b35]/20" aria-hidden="true">
      <defs>
        <pattern id="feature-dot-pattern" width="10" height="10" patternUnits="userSpaceOnUse">
          <circle cx="1" cy="1" r="0.7" fill="currentColor" />
        </pattern>
        <radialGradient id="feature-dot-fade" cx="50%" cy="45%" r="72%">
          <stop offset="0%" stopColor="white" />
          <stop offset="72%" stopColor="white" />
          <stop offset="100%" stopColor="transparent" />
        </radialGradient>
        <mask id="feature-dot-mask">
          <rect width="100%" height="100%" fill="url(#feature-dot-fade)" />
        </mask>
      </defs>
      <rect width="100%" height="100%" fill="url(#feature-dot-pattern)" mask="url(#feature-dot-mask)" />
    </svg>
  );
}

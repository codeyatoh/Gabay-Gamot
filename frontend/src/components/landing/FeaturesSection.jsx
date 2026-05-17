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

          <div className="relative p-6 sm:p-10 md:py-20 lg:p-16">
            <p className="text-xs font-medium uppercase tracking-[0.22em] text-[#0b6b35] md:text-sm">
              Core features
            </p>

            <div className="mt-5 text-center text-3xl leading-[1.05] tracking-normal text-slate-950 sm:text-5xl lg:text-7xl xl:text-7xl md:text-left">
              <p>
                <span className="font-semibold">Scan medicines</span>{" "}
                <span className="font-thin">and track</span>
              </p>
              <p>
                <span className="font-thin">inventory, expiry,</span>{" "}
                <span className="font-semibold">dispensing</span>
              </p>
              <p>
                <span className="font-thin">and nearby</span>{" "}
                <span className="font-semibold">barangay referrals.</span>
              </p>
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

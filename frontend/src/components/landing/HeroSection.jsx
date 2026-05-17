import { Button } from "@/components/ui/button";
import heroVideo from "@/assets/videos/gabaygamot-hero.mp4";

export function HeroSection() {
  return (
    <section
      id="home"
      className="relative flex min-h-[calc(100svh-4rem)] flex-col justify-end overflow-hidden"
    >
      {/* Video Background */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="size-full object-cover invert dark:invert-0"
          src={heroVideo}
        ></video>
        {/* Subtle dynamic tint to make text pop without ruining the video */}
        <div className="absolute inset-0 z-[1] bg-white/40 dark:bg-black/50" />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full px-5 pb-14 pt-28 sm:px-6 sm:pb-16 sm:pt-32 lg:px-12 lg:pb-28 lg:pt-40">
        <div className="mx-auto w-full max-w-7xl">
          <div className="w-full max-w-5xl">
            <h1 className="text-balance font-mono text-[clamp(3.5rem,18vw,8.75rem)] font-black leading-[0.86] tracking-normal text-slate-950 dark:text-white">
              <span className="block">Gabay</span>
              <span className="block">Gamot</span>
            </h1>

            <p className="mt-8 max-w-2xl text-balance font-mono text-sm leading-6 text-slate-900 dark:text-slate-200 sm:text-base sm:leading-7 md:mt-10">
              A medicine coordination system for scanning inventory, monitoring
              expiry, dispensing stock, and finding nearby barangay referrals.
            </p>

            <div className="mt-8 flex flex-col items-start gap-3 sm:flex-row sm:items-center">
              <Button className="h-12 rounded-md bg-[#0b6b35] px-8 font-mono text-xs font-semibold uppercase tracking-normal text-white shadow-panel hover:bg-[#08552b] dark:bg-[#16a34a] dark:hover:bg-[#15803d] md:h-14 md:px-10">
                <span className="text-nowrap">Get Started</span>
              </Button>
              <Button
                variant="secondary"
                className="h-12 rounded-md border border-slate-300 bg-white/90 px-8 font-mono text-xs font-semibold uppercase tracking-normal text-[#083f24] shadow-sm backdrop-blur-md hover:bg-slate-50 dark:border-white/20 dark:bg-black/50 dark:text-slate-200 dark:hover:bg-black/70 md:h-14 md:px-10"
              >
                <span className="text-nowrap">View Workflow</span>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

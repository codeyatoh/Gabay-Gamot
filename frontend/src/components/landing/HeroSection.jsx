import { Button } from "@/components/ui/button";

export function HeroSection() {
  return (
    <section id="home" className="relative flex min-h-[calc(100vh-4rem)] flex-col justify-end overflow-hidden">
      {/* Video Background */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="size-full object-cover invert -scale-x-100 dark:invert-0 dark:opacity-80"
          src="https://videos.pexels.com/video-files/35968183/15249566_1920_1080_30fps.mp4"
        ></video>
      </div>
      <div className="absolute inset-0 z-[1] bg-gradient-to-t from-[#f8fbf5] via-[#f8fbf5]/88 to-[#f8fbf5]/30 dark:from-black/90 dark:via-black/62 dark:to-black/20" />

      {/* Content */}
      <div className="relative z-10 w-full px-5 pb-14 sm:px-6 sm:pb-16 lg:px-12 lg:pb-28">
        <div className="mx-auto flex w-full max-w-7xl justify-center lg:justify-start">
          <div className="flex max-w-5xl flex-col items-center text-center lg:items-start lg:text-left">
            <h1 className="text-balance font-mono text-[clamp(3.25rem,13vw,8.75rem)] font-black leading-[0.86] tracking-normal text-slate-950 dark:text-white">
              Gabay
              <br />
              Gamot
            </h1>

            <p className="mt-8 max-w-2xl text-balance font-mono text-sm leading-6 text-slate-900 dark:text-slate-200 sm:text-base sm:leading-7 md:mt-10">
              A medicine coordination system for scanning inventory, monitoring expiry,
              dispensing stock, and finding nearby barangay referrals.
            </p>

            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row lg:justify-start">
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

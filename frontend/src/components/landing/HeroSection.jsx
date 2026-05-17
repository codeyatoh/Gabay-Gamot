import { useEffect, useRef } from "react";
import { ArrowRight, SearchCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroVideo from "@/assets/videos/gabaygamot-hero.mp4";

export function HeroSection() {
  const videoRef = useRef(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 0.6; // Slows down video to 60% speed
    }
  }, []);

  return (
    <section id="home" className="relative flex min-h-[calc(100dvh-4rem)] flex-col justify-end overflow-hidden">
      {/* Video Background */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          className="size-full object-cover invert contrast-[1.15] brightness-105 saturate-[1.2] dark:invert-0"
          src={heroVideo}
        ></video>
        {/* Subtle dynamic tint to make text pop without ruining the video */}
        <div className="absolute inset-0 z-[1] bg-white/40 dark:bg-black/50" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex w-full flex-col justify-end px-4 pb-[max(1.5rem,env(safe-area-inset-bottom))] sm:px-6 sm:pb-10 md:px-8 lg:px-10 lg:pb-24 xl:pb-32 2xl:px-16">
        <div className="mx-auto w-full max-w-screen-xl 2xl:max-w-screen-2xl">
          <div className="max-w-xl sm:max-w-2xl lg:max-w-3xl">
            <h1 className="font-sans text-balance text-4xl font-extrabold leading-[1.1] tracking-normal text-slate-950 dark:text-white sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl">
              GabayGamot
            </h1>
            
            <p className="font-sans mt-4 max-w-2xl text-balance text-sm leading-6 text-slate-800 dark:text-slate-200 sm:mt-6 sm:text-base sm:leading-7 md:text-lg md:leading-8">
              A medicine coordination system for scanning inventory, monitoring expiry, dispensing stock, and finding nearby barangay referrals.
            </p>

            <div className="mt-8 flex w-full flex-col flex-wrap items-stretch gap-3 sm:w-auto sm:flex-row sm:items-center">
              <Button asChild className="h-12 rounded-full bg-[#16a34a] px-6 text-sm text-white shadow-panel hover:bg-[#15803d] sm:px-7 sm:text-base md:h-14 md:px-9">
                <a href="/login">
                  <span className="text-nowrap">Get Started</span>
                  <ArrowRight className="ml-2 h-4 w-4" />
                </a>
              </Button>
              <Button
                asChild
                variant="secondary"
                className="h-12 rounded-full border border-slate-300 bg-white/80 px-6 text-sm text-slate-900 shadow-sm backdrop-blur-md hover:bg-slate-50 sm:px-7 sm:text-base dark:border-white/20 dark:bg-black/40 dark:text-white dark:hover:bg-black/60 md:h-14 md:px-9"
              >
                <a href="#workflow">
                  <SearchCheck className="mr-2 h-4 w-4" />
                  <span className="text-nowrap">View Workflow</span>
                </a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

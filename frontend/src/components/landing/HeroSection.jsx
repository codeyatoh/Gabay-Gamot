import React, { useEffect, useRef } from "react";
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
    <section id="home" className="relative flex min-h-[calc(100vh-4rem)] flex-col justify-end overflow-hidden">
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
      <div className="relative z-10 flex w-full flex-col justify-end px-6 pb-6 lg:pb-32">
        <div className="mx-auto w-full max-w-7xl">
          <div className="max-w-2xl">
            <h1 className="font-sans text-balance text-[2.75rem] leading-[1.1] font-extrabold tracking-tight text-slate-950 dark:text-white sm:text-6xl md:text-7xl xl:text-8xl">
              GabayGamot
            </h1>
            
            <p className="font-sans mt-4 text-balance text-base leading-7 text-slate-800 dark:text-slate-200 sm:mt-6 sm:text-lg sm:leading-8">
              A medicine coordination system for scanning inventory, monitoring expiry, dispensing stock, and finding nearby barangay referrals.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Button className="h-12 rounded-full bg-[#16a34a] px-7 text-base text-white shadow-panel hover:bg-[#15803d] md:h-14 md:px-9">
                <span className="text-nowrap">Get Started</span>
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button
                variant="secondary"
                className="h-12 rounded-full border border-slate-300 bg-white/80 px-7 text-base text-slate-900 shadow-sm backdrop-blur-md hover:bg-slate-50 dark:border-white/20 dark:bg-black/40 dark:text-white dark:hover:bg-black/60 md:h-14 md:px-9"
              >
                <SearchCheck className="mr-2 h-4 w-4" />
                <span className="text-nowrap">View Workflow</span>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

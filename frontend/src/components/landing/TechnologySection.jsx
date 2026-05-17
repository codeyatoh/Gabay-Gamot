import React from "react";
import { cn } from "@/lib/utils";

/**
 * Flicker-free infinite marquee.
 * Uses a single flex strip with items duplicated internally,
 * animated to -50% so the loop point is invisible.
 */
function Marquee({ children, gap = "2rem", duration = "40s", slowOnHover = true, className }) {
  const scrollerRef = React.useRef(null);

  const handleMouseEnter = () => {
    if (!slowOnHover || !scrollerRef.current) return;
    scrollerRef.current.getAnimations().forEach((anim) => {
      anim.playbackRate = 0.2; // Slower speed on hover
    });
  };

  const handleMouseLeave = () => {
    if (!slowOnHover || !scrollerRef.current) return;
    scrollerRef.current.getAnimations().forEach((anim) => {
      anim.playbackRate = 1; // Normal speed
    });
  };

  return (
    <div
      className={cn("flex overflow-hidden select-none", className)}
      style={{ "--duration": duration }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div
        ref={scrollerRef}
        className="flex shrink-0 animate-marquee items-center transition-all duration-500"
        style={{ gap }}
      >
        {children}
        {/* Duplicate for seamless loop */}
        {children}
      </div>
    </div>
  );
}

const GeminiLogo = () => (
  <div className="flex items-center gap-2 text-xl font-semibold tracking-normal text-slate-800 transition-all duration-300 hover:opacity-100 sm:text-2xl dark:text-white dark:opacity-90">
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-[#1a73e8] dark:text-[#60a5fa]">
      <path d="M12 0C12 6.62742 6.62742 12 0 12C6.62742 12 12 17.3726 12 24C12 17.3726 17.3726 12 24 12C17.3726 12 12 6.62742 12 0Z" fill="currentColor"/>
      <path d="M21.5 3C21.5 4.933 19.933 6.5 18 6.5C19.933 6.5 21.5 8.067 21.5 10C21.5 8.067 23.067 6.5 25 6.5C23.067 6.5 21.5 4.933 21.5 3Z" fill="currentColor" opacity="0.6"/>
    </svg>
    Gemini
  </div>
);

const ReactLogo = () => (
  <div className="flex items-center gap-3 text-xl font-bold tracking-normal text-slate-800 transition-all duration-300 hover:opacity-100 sm:text-2xl dark:text-white dark:opacity-90">
    <img src="https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg" alt="React" className="h-9 w-9" />
    React
  </div>
);

const NodeLogo = () => (
  <div className="flex items-center gap-3 text-xl font-bold tracking-normal text-slate-800 transition-all duration-300 hover:opacity-100 sm:text-2xl dark:text-white dark:opacity-90">
    <img src="https://cdn.worldvectorlogo.com/logos/nodejs-icon.svg" alt="Node.js" className="h-9 w-9 object-contain" />
    Node.js
  </div>
);

const FirebaseLogo = () => (
  <div className="flex items-center gap-2 text-xl font-bold tracking-normal text-slate-800 transition-all duration-300 hover:opacity-100 sm:text-2xl dark:text-white dark:opacity-90">
    <img src="https://firebase.google.com/downloads/brand-guidelines/SVG/logo-logomark.svg" alt="Firebase" className="h-9 w-9 object-contain" />
    Firebase
  </div>
);

const ViteLogo = () => (
  <div className="flex items-center gap-3 text-xl font-bold tracking-normal text-slate-800 transition-all duration-300 hover:opacity-100 sm:text-2xl dark:text-white dark:opacity-90">
    <img src="https://upload.wikimedia.org/wikipedia/commons/f/f1/Vitejs-logo.svg" alt="Vite" className="h-9 w-9" />
    Vite
  </div>
);

const MapboxLogo = () => (
  <img
    src="https://upload.wikimedia.org/wikipedia/commons/1/1f/Mapbox_logo_2019.svg"
    alt="Mapbox"
    className="h-8 w-auto object-contain transition-all duration-300 hover:opacity-100 dark:opacity-90 dark:brightness-0 dark:invert"
  />
);

const logos = [
  <ReactLogo key="react" />,
  <ViteLogo key="vite" />,
  <NodeLogo key="node" />,
  <FirebaseLogo key="firebase" />,
  <MapboxLogo key="mapbox" />,
  <GeminiLogo key="gemini" />,
];

export function TechnologySection() {
  return (
    <section id="built-with" className="overflow-hidden bg-white py-12 dark:bg-[#0a0f0d] sm:py-14 md:py-16 lg:py-20">
      <div className="section-shell group relative">
        <div className="flex flex-col items-center gap-5 md:flex-row md:gap-8">
          {/* Left Text Column */}
          <div className="w-full md:max-w-48 md:border-r md:border-[#dbe9d5] md:pr-8 dark:border-white/10">
            <h2 className="text-center text-sm font-semibold tracking-wide text-slate-500 uppercase md:text-right dark:text-slate-400">
              Built with modern technologies
            </h2>
          </div>
          
          {/* Right Marquee Column */}
          <div className="relative w-full overflow-hidden py-4 md:flex-1 [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)] [mask-repeat:no-repeat] [mask-size:100%_100%]">
            <Marquee gap="clamp(2rem,8vw,6rem)" duration="35s">
              {logos}
            </Marquee>
          </div>
        </div>
      </div>
    </section>
  );
}

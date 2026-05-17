import React from "react";
import { cn } from "@/lib/utils";

/**
 * Flicker-free infinite marquee.
 * Uses a single flex strip with items duplicated internally,
 * animated to -50% so the loop point is invisible.
 */
function Marquee({ children, gap = "2rem", duration = "40s", className }) {
  return (
    <div
      className={cn("flex overflow-hidden select-none", className)}
      style={{ "--duration": duration }}
    >
      <div
        className="flex shrink-0 animate-marquee items-center"
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
  <div className="flex items-center gap-2 text-[28px] font-semibold tracking-tight text-[#1a73e8] dark:text-[#60a5fa]">
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 0C12 6.62742 6.62742 12 0 12C6.62742 12 12 17.3726 12 24C12 17.3726 17.3726 12 24 12C17.3726 12 12 6.62742 12 0Z" fill="currentColor"/>
      <path d="M21.5 3C21.5 4.933 19.933 6.5 18 6.5C19.933 6.5 21.5 8.067 21.5 10C21.5 8.067 23.067 6.5 25 6.5C23.067 6.5 21.5 4.933 21.5 3Z" fill="currentColor" opacity="0.6"/>
    </svg>
    Gemini
  </div>
);

const ReactLogo = () => (
  <div className="flex items-center gap-3 text-[28px] font-bold tracking-tight text-slate-800 dark:text-slate-200">
    <img src="https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg" alt="React" className="h-9 w-9" />
    React
  </div>
);

const NodeLogo = () => (
  <img
    src="https://upload.wikimedia.org/wikipedia/commons/d/d9/Node.js_logo.svg"
    alt="Node.js"
    className="h-9 w-auto object-contain dark:brightness-90"
  />
);

/* Firebase_Logo.svg from Wikimedia squeezes wordmark into a square — use inline SVG instead */
const FirebaseLogo = () => (
  <div className="flex items-center gap-2 text-[28px] font-bold tracking-tight text-slate-800 dark:text-slate-200">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 48 48"
      className="h-9 w-9 shrink-0"
      aria-label="Firebase"
    >
      <path fill="#FF8F00" d="M8 37L14.2 8.9c.2-.9 1.4-1.1 1.9-.3L20 16l-12 21z"/>
      <path fill="#FFA000" d="M8 37l9.6-18.8c.4-.8 1.5-.8 1.9 0L28 37H8z"/>
      <path fill="#FF6F00" d="M28 37L20 16l8-7.1V37z"/>
      <path fill="#FFC400" d="M8 37l20-24 12 24H8z"/>
    </svg>
    Firebase
  </div>
);

const ViteLogo = () => (
  <div className="flex items-center gap-3 text-[28px] font-bold tracking-tight text-slate-800 dark:text-slate-200">
    <img src="https://upload.wikimedia.org/wikipedia/commons/f/f1/Vitejs-logo.svg" alt="Vite" className="h-9 w-9" />
    Vite
  </div>
);

const MapboxLogo = () => (
  <img
    src="https://upload.wikimedia.org/wikipedia/commons/1/1f/Mapbox_logo_2019.svg"
    alt="Mapbox"
    className="h-8 w-auto object-contain dark:brightness-0 dark:invert dark:opacity-60"
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
    <section id="built-with" className="flex flex-col items-center justify-center bg-white py-16 dark:bg-[#0a0f0d]">
      <h2 className="mb-10 px-20 text-center text-sm font-medium tracking-wide text-slate-400 uppercase dark:text-slate-600">
        Built with modern, industry-leading technologies
      </h2>

      <div className="mx-auto w-full max-w-5xl overflow-hidden px-6 [mask-image:linear-gradient(to_right,transparent,black_15%,black_85%,transparent)] [mask-repeat:no-repeat] [mask-size:100%_100%]">
        <Marquee gap="96px" duration="35s">
          {logos}
        </Marquee>
      </div>
    </section>
  );
}

import React from "react";
import { Activity, Equal, Pill, X } from "lucide-react";

import { HeaderMenus } from "@/components/layout/HeaderMenus";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const navItems = [
  { label: "Features", href: "#features" },
  { label: "Workflow", href: "#workflow" },
  { label: "Roles", href: "#roles" },
  { label: "Technology", href: "#technology" },
];

export function Navbar() {
  const [menuState, setMenuState] = React.useState(false);
  const [isScrolled, setIsScrolled] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 4);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header>
      <nav
        data-state={menuState ? "active" : "closed"}
        className={cn(
          "fixed left-0 top-0 z-50 w-full px-3 transition-all duration-300 md:px-4",
          isScrolled ? "pt-2" : "border-b border-slate-200/70 bg-white/80 pt-0 backdrop-blur-xl"
        )}
      >
        <div
          className={cn(
            "mx-auto max-w-7xl transition-all duration-300",
            isScrolled &&
              "max-w-5xl rounded-2xl border border-slate-200 bg-white/86 px-3 shadow-panel backdrop-blur-xl"
          )}
        >
          <div className="relative flex flex-wrap items-center justify-between gap-3 py-3">
            <div className="flex w-full items-center justify-between lg:w-auto">
              <a href="#home" aria-label="GabayGamot home" className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-teal-700 text-white shadow-panel">
                  <Pill className="h-5 w-5" />
                </span>
                <span className="leading-tight">
                  <span className="block text-sm font-semibold text-slate-950">GabayGamot</span>
                  <span className="block text-xs text-slate-500">Medicine coordination</span>
                </span>
              </a>

              <button
                onClick={() => setMenuState((value) => !value)}
                aria-label={menuState ? "Close menu" : "Open menu"}
                className="relative z-20 flex h-10 w-10 cursor-pointer items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-700 shadow-sm transition hover:bg-teal-50 lg:hidden"
              >
                <Equal
                  className={cn(
                    "absolute h-5 w-5 transition duration-200",
                    menuState ? "scale-0 rotate-180 opacity-0" : "scale-100 rotate-0 opacity-100"
                  )}
                />
                <X
                  className={cn(
                    "absolute h-5 w-5 transition duration-200",
                    menuState ? "scale-100 rotate-0 opacity-100" : "scale-0 -rotate-180 opacity-0"
                  )}
                />
              </button>
            </div>

            <div className="absolute inset-0 m-auto hidden size-fit lg:block">
              <HeaderMenus />
            </div>

            <div
              className={cn(
                "hidden w-full flex-wrap items-center justify-end rounded-2xl border border-slate-200 bg-white/95 p-3 shadow-panel backdrop-blur-2xl lg:m-0 lg:flex lg:w-fit lg:gap-4 lg:border-transparent lg:bg-transparent lg:p-0 lg:shadow-none",
                menuState && "block"
              )}
            >
              <div className="block p-3 lg:hidden">
                <ul className="space-y-5 text-base">
                  {navItems.map((item) => (
                    <li key={item.href}>
                      <a
                        href={item.href}
                        onClick={() => setMenuState(false)}
                        className="block text-sm font-medium text-slate-600 transition hover:text-teal-700"
                      >
                        {item.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex w-full flex-col gap-3 border-t border-slate-100 pt-3 sm:flex-row sm:items-center lg:w-fit lg:border-0 lg:pt-0">
                <Button variant="ghost" className="justify-start text-slate-700 lg:justify-center">
                  Login
                </Button>
                <Button className="bg-teal-700 text-white shadow-panel hover:bg-teal-800">
                  <Activity className="h-4 w-4" />
                  Request Access
                </Button>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}

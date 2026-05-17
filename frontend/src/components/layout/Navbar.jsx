import React from "react";
import { Activity, Equal, X } from "lucide-react";

import { HeaderMenus } from "@/components/layout/HeaderMenus";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import logoUrl from "@/assets/images/gabay-gamot-logo-sm.png";

const navItems = [
  { label: "Features", href: "#features" },
  { label: "Workflow", href: "#workflow" },
  { label: "Roles", href: "#roles" },
  { label: "Security", href: "#security" },
  { label: "FAQs", href: "#faqs" },
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
          "fixed left-0 top-0 z-50 w-full px-3 transition-colors duration-300 md:px-4",
          isScrolled ? "border-transparent" : "border-b border-[#dbe9d5]/80 bg-white/78 backdrop-blur-xl"
        )}
      >
        <div
          className={cn(
            "mx-auto mt-2 max-w-7xl transition-all duration-300",
            isScrolled &&
              "max-w-5xl rounded-2xl border border-[#cfe3c7] bg-white/86 px-3 shadow-panel backdrop-blur-xl"
          )}
        >
          <div className="relative flex flex-wrap items-center justify-between gap-3 py-3">
            <div className="flex w-full justify-between lg:w-auto">
              <a href="#home" aria-label="GabayGamot home" className="flex items-center gap-3">
                <img
                  src={logoUrl}
                  alt="GabayGamot"
                  className="z-10 h-10 w-10 rounded-xl object-contain"
                />
                <span className="leading-tight">
                  <span className="block text-sm font-semibold text-slate-950">GabayGamot</span>
                  <span className="block text-xs text-slate-500">Medicine coordination</span>
                </span>
              </a>

              <button
                onClick={() => setMenuState((value) => !value)}
                aria-label={menuState ? "Close menu" : "Open menu"}
                className="relative z-20 block cursor-pointer p-2.5 pr-4 text-slate-700 lg:hidden"
              >
                <Equal
                  className={cn(
                    "m-auto h-5 w-5 transition duration-200",
                    menuState ? "scale-0 rotate-180 opacity-0" : "scale-110 rotate-0 opacity-100"
                  )}
                />
                <X
                  className={cn(
                    "absolute inset-0 m-auto h-6 w-6 transition duration-200",
                    menuState ? "scale-110 rotate-0 opacity-100" : "scale-0 -rotate-180 opacity-0"
                  )}
                />
              </button>
            </div>

            <div className="absolute inset-0 m-auto hidden size-fit lg:block">
              <HeaderMenus />
            </div>

            <div
              className={cn(
                "hidden w-full flex-wrap items-center justify-end space-y-8 rounded-sm border border-[#dbe9d5] bg-white/92 p-3 shadow-zinc-300/20 backdrop-blur-2xl lg:m-0 lg:flex lg:w-fit lg:gap-6 lg:space-y-0 lg:border-transparent lg:bg-transparent lg:p-0 lg:shadow-none",
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
                        className="block rounded-md px-3 py-2 text-sm text-slate-600 duration-150 hover:bg-[#eef8e9] hover:text-[#0b6b35]"
                      >
                        {item.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex w-full flex-col gap-3 border-t border-slate-100 pt-3 sm:flex-row sm:items-center lg:w-fit lg:border-0 lg:pt-0">
                <Button
                  variant="ghost"
                  className="justify-start rounded-xl border border-[#b8d8aa] bg-white/92 text-[#083f24] shadow-sm backdrop-blur-md transition hover:border-[#0b6b35]/40 hover:bg-[#eef8e9] hover:text-[#083f24] lg:justify-center"
                >
                  Login
                </Button>
                <Button className={cn("bg-[#0b6b35] text-white shadow-panel hover:bg-[#08552b]", isScrolled && "lg:hidden")}>
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

import React from "react";
import { Equal, Moon, Sun, X } from "lucide-react";

import { HeaderMenus } from "@/components/layout/HeaderMenus";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useTheme } from "@/hooks/useTheme.jsx";
import logoUrl from "@/assets/images/gabay-gamot-logo-sm.png";

const navItems = [
  { label: "Features", href: "#features" },
  { label: "Workflow", href: "#workflow" },
  { label: "Built With", href: "#built-with" },
  { label: "Team", href: "#team" },
  { label: "FAQs", href: "#faqs" },
];

export function Navbar() {
  const [menuState, setMenuState] = React.useState(false);
  const [isScrolled, setIsScrolled] = React.useState(false);
  const { theme, toggleTheme } = useTheme();
  const isDarkMode = theme === "dark";

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
          "fixed left-0 top-0 z-50 w-full px-6 pt-safe transition-colors duration-300 sm:px-8 md:px-10 lg:px-12 xl:px-14 2xl:px-16",
          isScrolled
            ? "border-transparent"
            : "border-transparent bg-white/90 backdrop-blur-xl dark:border-transparent dark:bg-[#0d1117]"
        )}
      >
        <div
          className={cn(
            "mx-auto mt-2 w-full max-w-screen-xl transition-all duration-300 2xl:max-w-screen-2xl",
            (isScrolled || menuState) &&
              "rounded-2xl border border-[#cfe3c7] bg-white/95 px-6 shadow-panel backdrop-blur-xl dark:border-white/10 dark:bg-[#0d1117]"
          )}
        >
          <div className="relative flex min-h-14 flex-wrap items-center justify-between gap-3 py-3">
            <div className="flex w-full justify-between lg:w-auto">
              <a href="#home" aria-label="GabayGamot home" className="flex min-h-11 min-w-0 items-center gap-3">
                <img
                  src={logoUrl}
                  alt="GabayGamot"
                  className="z-10 h-10 w-10 rounded-xl object-contain transition-all dark:drop-shadow-[0_0_8px_rgba(74,222,128,0.5)]"
                />
                <span className="min-w-0 leading-tight">
                  <span className="block truncate text-sm font-semibold text-slate-950 dark:text-slate-50">GabayGamot</span>
                  <span className="block truncate text-xs text-slate-500 dark:text-slate-400">Medicine coordination</span>
                </span>
              </a>

              <button
                onClick={() => setMenuState((value) => !value)}
                aria-label={menuState ? "Close menu" : "Open menu"}
                className="relative z-20 flex min-h-11 min-w-11 cursor-pointer items-center justify-center rounded-xl p-2.5 text-slate-700 transition-all active:scale-95 dark:text-slate-300 lg:hidden"
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
                "absolute -left-3 -right-3 top-[calc(100%+0.5rem)] z-50 mx-auto hidden w-auto flex-wrap items-center justify-end space-y-6 rounded-2xl border border-[#cfe3c7] bg-[#fcfdfa] p-3 shadow-panel backdrop-blur-xl dark:border-white/[0.08] dark:bg-[#0f1319] sm:p-4 lg:static lg:m-0 lg:flex lg:w-fit lg:max-w-none lg:gap-6 lg:space-y-0 lg:border-transparent lg:bg-transparent lg:p-0 lg:shadow-none lg:backdrop-blur-none dark:lg:bg-transparent dark:lg:border-transparent dark:lg:shadow-none",
                menuState && "block"
              )}
            >
              <div className="block p-1 sm:p-3 lg:hidden">
                <ul className="space-y-2 text-base">
                  {navItems.map((item) => (
                    <li key={item.href}>
                      <a
                        href={item.href}
                        onClick={() => setMenuState(false)}
                        className="block min-h-11 rounded-xl px-4 py-3 text-sm font-medium text-slate-600 transition-all duration-150 active:scale-95 hover:bg-[#eef8e9] hover:text-[#0b6b35] dark:text-slate-300 dark:hover:bg-white/[0.06] dark:hover:text-[#4ade80]"
                      >
                        {item.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex w-full flex-col gap-3 border-t border-[#e5f0e1] pt-4 dark:border-white/[0.05] sm:flex-row lg:w-fit lg:border-0 lg:pt-0">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={toggleTheme}
                  aria-label="Toggle theme"
                  data-state={isDarkMode ? "on" : "off"}
                  className="group relative flex min-h-11 min-w-11 shrink-0 items-center justify-center rounded-xl text-[#083f24] transition-all hover:bg-[#eef8e9] data-[state=on]:bg-transparent dark:text-slate-300 dark:hover:bg-white/8 max-sm:w-full"
                >
                  <Moon
                    size={16}
                    className="absolute shrink-0 scale-0 opacity-0 transition-all duration-300 ease-in-out group-data-[state=on]:scale-100 group-data-[state=on]:opacity-100"
                    aria-hidden="true"
                  />
                  <Sun
                    size={16}
                    className="absolute shrink-0 scale-100 opacity-100 transition-all duration-300 ease-in-out group-data-[state=on]:scale-0 group-data-[state=on]:opacity-0"
                    aria-hidden="true"
                  />
                </Button>
                <Button
                  asChild
                  className={cn(
                    "flex-1 justify-center rounded-xl bg-[#0b6b35] px-6 text-white shadow-md transition-all hover:bg-[#08552b] dark:bg-[#16a34a] dark:hover:bg-[#15803d] lg:flex-none",
                    isScrolled && "lg:hidden"
                  )}
                >
                  <a href="/login">Login</a>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}

import { Activity, Menu, Pill } from "lucide-react";

import { Button } from "@/components/ui/button";

const navItems = [
  { label: "Features", href: "#features" },
  { label: "Workflow", href: "#workflow" },
  { label: "Roles", href: "#roles" },
  { label: "Technology", href: "#technology" },
];

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/70 bg-white/82 backdrop-blur-xl">
      <div className="section-shell flex h-16 items-center justify-between">
        <a href="#home" className="flex items-center gap-3" aria-label="GabayGamot home">
          <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-emerald-600 text-white shadow-panel">
            <Pill className="h-5 w-5" />
          </span>
          <span className="leading-tight">
            <span className="block text-sm font-semibold text-slate-950">GabayGamot</span>
            <span className="block text-xs text-slate-500">Medicine coordination</span>
          </span>
        </a>

        <nav className="hidden items-center gap-7 text-sm font-medium text-slate-600 md:flex">
          {navItems.map((item) => (
            <a key={item.href} href={item.href} className="transition hover:text-emerald-700">
              {item.label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <Button variant="ghost" className="text-slate-700">
            Login
          </Button>
          <Button className="bg-emerald-600 text-white shadow-panel hover:bg-emerald-700">
            <Activity className="h-4 w-4" />
            Request Access
          </Button>
        </div>

        <Button variant="ghost" size="icon" className="md:hidden" aria-label="Open navigation">
          <Menu className="h-5 w-5" />
        </Button>
      </div>
    </header>
  );
}

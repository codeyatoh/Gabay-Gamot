import { useMemo, useState } from "react";
import {
  Bell,
  ChevronRight,
  LogOut,
  Menu,
  Moon,
  Search,
  ShieldCheck,
  Sun,
  X,
} from "lucide-react";

import logoUrl from "@/assets/images/gabay-gamot-logo-sm.png";
import {
  getNavItemByPath,
  superAdminNavGroups,
  superAdminUser,
} from "@/data/superAdminMockData";
import { useTheme } from "@/hooks/useTheme.jsx";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

export function SuperAdminLayout({ children, pathname }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const currentItem = useMemo(() => getNavItemByPath(pathname), [pathname]);
  const pageTitle = currentItem?.title || "Overview";

  return (
    <div className="min-h-screen min-h-dvh overflow-x-hidden bg-background pb-safe pt-safe text-foreground">
      <div className="flex min-h-screen min-h-dvh w-full overflow-x-hidden">
        <SuperAdminSidebar
          pathname={pathname}
          isOpen={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
        />

        {isSidebarOpen && (
          <button
            type="button"
            aria-label="Close sidebar overlay"
            className="fixed inset-0 z-30 bg-foreground/30 backdrop-blur-sm lg:hidden"
            onClick={() => setIsSidebarOpen(false)}
          />
        )}

        <div className="flex min-w-0 flex-1 flex-col lg:pl-72">
          <header className="sticky top-0 z-20 flex h-16 shrink-0 items-center border-b bg-background/92 px-4 backdrop-blur-xl sm:px-6 lg:h-[4.5rem] lg:px-8">
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="mr-2 lg:hidden"
              onClick={() => setIsSidebarOpen(true)}
            >
              <Menu />
              <span className="sr-only">Open sidebar</span>
            </Button>

            <div className="min-w-0">
              <div className="flex items-center gap-2 text-xs font-medium uppercase tracking-wider text-muted-foreground">
                <span>Super Admin</span>
                <ChevronRight className="h-3.5 w-3.5" />
                <span className="truncate text-primary">{pageTitle}</span>
              </div>
              <h1 className="mt-0.5 truncate text-base font-semibold sm:text-lg">
                {pageTitle}
              </h1>
            </div>

            <div className="ml-auto flex min-w-0 items-center gap-2">
              <label className="hidden h-10 min-w-0 items-center gap-2 rounded-lg border bg-card px-3 text-sm text-muted-foreground shadow-sm md:flex md:w-64 lg:w-80">
                <Search className="h-4 w-4 shrink-0" />
                <span className="truncate">Search approvals, centers, users</span>
              </label>

              <Button variant="outline" size="icon" className="hidden sm:inline-flex">
                <Bell />
                <span className="sr-only">Notifications</span>
              </Button>

              <Button type="button" variant="outline" size="icon" onClick={toggleTheme}>
                {theme === "dark" ? <Sun /> : <Moon />}
                <span className="sr-only">Toggle theme</span>
              </Button>
            </div>
          </header>

          <main className="min-w-0 flex-1 overflow-x-hidden px-4 py-5 sm:px-6 lg:px-8 lg:py-7">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}

function SuperAdminSidebar({ pathname, isOpen, onClose }) {
  return (
    <aside
      className={cn(
        "fixed inset-y-0 left-0 z-40 flex w-72 flex-col border-r bg-card transition-transform duration-200 lg:translate-x-0",
        isOpen ? "translate-x-0" : "-translate-x-full"
      )}
    >
      <div className="flex h-16 items-center gap-3 border-b px-4 lg:h-[4.5rem]">
        <a href="/super-admin" className="flex min-w-0 flex-1 items-center gap-3">
          <img
            src={logoUrl}
            alt="GabayGamot"
            className="h-10 w-10 rounded-lg border bg-background object-contain p-1"
          />
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold">GabayGamot</p>
            <p className="truncate text-xs text-muted-foreground">
              Health command center
            </p>
          </div>
        </a>
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="lg:hidden"
          onClick={onClose}
        >
          <X />
          <span className="sr-only">Close sidebar</span>
        </Button>
      </div>

      <div className="min-h-0 flex-1 overflow-y-auto px-3 py-4">
        <div className="mb-4 rounded-lg border bg-primary/5 p-3">
          <div className="flex items-center gap-2 text-sm font-medium">
            <ShieldCheck className="h-4 w-4 text-primary" />
            Super Admin Access
          </div>
          <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
            Role claim, approvals, inventory, and health signals.
          </p>
        </div>

        <nav className="space-y-5" aria-label="Super Admin navigation">
          {superAdminNavGroups.map((group) => (
            <div key={group.label}>
              <p className="px-2 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                {group.label}
              </p>
              <div className="mt-2 space-y-1">
                {group.items.map((item) => {
                  const Icon = item.icon;
                  const isActive = pathname === item.href;

                  return (
                    <a
                      key={item.href}
                      href={item.href}
                      className={cn(
                        "group flex min-h-11 items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors",
                        isActive
                          ? "bg-primary text-primary-foreground shadow-sm"
                          : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                      )}
                      onClick={onClose}
                    >
                      <Icon className="h-4 w-4 shrink-0" />
                      <span className="truncate">{item.title}</span>
                    </a>
                  );
                })}
              </div>
            </div>
          ))}
        </nav>
      </div>

      <div className="border-t p-3">
        <div className="flex items-center gap-3 rounded-lg border bg-background p-2">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary text-sm font-semibold text-primary-foreground">
            {superAdminUser.initials}
          </div>
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-medium">{superAdminUser.name}</p>
            <p className="truncate text-xs text-muted-foreground">{superAdminUser.email}</p>
          </div>
          <Button type="button" variant="ghost" size="icon" className="h-9 w-9 min-h-9 min-w-9">
            <LogOut className="h-4 w-4" />
            <span className="sr-only">Log out</span>
          </Button>
        </div>
      </div>
    </aside>
  );
}

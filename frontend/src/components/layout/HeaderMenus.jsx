import * as React from "react";
import { cn } from "@/lib/utils";

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";

const menuItems = [
  { label: "Features", href: "#features" },
  { label: "Workflow", href: "#workflow" },
  { label: "Built With", href: "#built-with" },
  { label: "Team", href: "#team" },
  { label: "FAQs", href: "#faqs" },
];

export function HeaderMenus() {
  return (
    <NavigationMenu>
      <NavigationMenuList className="gap-1">
        {menuItems.map((item) => (
          <NavigationMenuItem key={item.label}>
            <NavigationMenuLink
              asChild
              className={cn(
                navigationMenuTriggerStyle(),
                "bg-transparent text-sm font-medium text-slate-600 transition-colors hover:bg-[#eef8e9] hover:text-[#0b6b35] rounded-xl dark:text-slate-400 dark:hover:bg-white/8 dark:hover:text-[#4ade80]"
              )}
            >
              <a href={item.href}>{item.label}</a>
            </NavigationMenuLink>
          </NavigationMenuItem>
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  );
}

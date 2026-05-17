import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";

const menuItems = [
  { label: "Features", href: "#features" },
  { label: "Workflow", href: "#workflow" },
  { label: "Roles", href: "#roles" },
  { label: "Technology", href: "#technology" },
];

export function HeaderMenus() {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        {menuItems.map((item) => (
          <MenuLink key={item.href} href={item.href}>
            {item.label}
          </MenuLink>
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  );
}

function MenuLink({ href, children }) {
  return (
    <NavigationMenuItem>
      <NavigationMenuLink
        asChild
        className={cn(
          navigationMenuTriggerStyle(),
          "group relative h-9 rounded-full bg-transparent px-3 text-xs font-semibold text-slate-600 transition duration-200 hover:bg-teal-700 hover:text-white focus:bg-teal-700 focus:text-white"
        )}
      >
        <a href={href}>
          {children}
          <span className="pointer-events-none absolute inset-x-3 -bottom-1 h-0.5 scale-x-0 rounded-full bg-teal-700 transition duration-200 group-hover:scale-x-100 group-focus:scale-x-100" />
        </a>
      </NavigationMenuLink>
    </NavigationMenuItem>
  );
}

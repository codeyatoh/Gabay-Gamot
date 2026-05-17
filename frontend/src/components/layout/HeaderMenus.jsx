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
          "h-9 rounded-full bg-transparent px-3 text-xs font-medium text-slate-600 hover:bg-teal-50 hover:text-teal-700 focus:bg-teal-50"
        )}
      >
        <a href={href}>{children}</a>
      </NavigationMenuLink>
    </NavigationMenuItem>
  );
}

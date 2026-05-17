import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";

const resources = [
  {
    title: "OCR Scanning",
    href: "#features",
    description: "Extract medicine details from labels, then let health workers review.",
  },
  {
    title: "Inventory Alerts",
    href: "#features",
    description: "Track low stocks, expiry risks, and medicine availability.",
  },
  {
    title: "Referral Flow",
    href: "#workflow",
    description: "Find nearby barangays with available medicines and prepare referrals.",
  },
  {
    title: "AI Insights",
    href: "#technology",
    description: "Support redistribution, demand forecasting, and procurement planning.",
  },
  {
    title: "Admin View",
    href: "#roles",
    description: "Monitor users, inventory, referrals, logs, and reports.",
  },
  {
    title: "Health Worker View",
    href: "#roles",
    description: "Scan medicines, dispense stock, and record daily medicine activity.",
  },
];

export function HeaderMenus() {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <MenuLink href="#features">Features</MenuLink>
        <MenuLink href="#workflow">Workflow</MenuLink>
        <MenuLink href="#roles">Roles</MenuLink>
        <NavigationMenuItem>
          <NavigationMenuTrigger className="h-9 bg-transparent px-3 text-xs font-medium text-slate-600 hover:bg-emerald-50 hover:text-emerald-700 focus:bg-emerald-50 data-[state=open]:bg-emerald-50">
            System
          </NavigationMenuTrigger>
          <NavigationMenuContent className="p-2">
            <ul className="grid w-[34rem] gap-2 md:grid-cols-2">
              {resources.map((resource) => (
                <ListItem key={resource.title} title={resource.title} href={resource.href}>
                  {resource.description}
                </ListItem>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <MenuLink href="#technology">Technology</MenuLink>
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
          "h-9 bg-transparent px-3 text-xs font-medium text-slate-600 hover:bg-emerald-50 hover:text-emerald-700 focus:bg-emerald-50"
        )}
      >
        <a href={href}>{children}</a>
      </NavigationMenuLink>
    </NavigationMenuItem>
  );
}

function ListItem({ title, children, href, ...props }) {
  return (
    <li {...props}>
      <NavigationMenuLink asChild>
        <a
          className="block rounded-xl p-3 transition hover:bg-emerald-50 focus:bg-emerald-50 focus:outline-none"
          href={href}
        >
          <div className="text-sm font-semibold leading-none text-slate-950">{title}</div>
          <p className="mt-2 line-clamp-2 text-xs leading-5 text-slate-500">{children}</p>
        </a>
      </NavigationMenuLink>
    </li>
  );
}

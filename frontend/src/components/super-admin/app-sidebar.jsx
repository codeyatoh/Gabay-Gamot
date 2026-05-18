"use client"

import { ChevronRight, ChevronsUpDown, HeartPulse } from "lucide-react"

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import { NavUser } from "./nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar"
import logoUrl from "@/assets/images/gabay-gamot-logo-sm.png"
import { auth } from "@/config/firebase"
import { superAdminNavGroups } from "@/data/superAdminMockData"

const data = {
  user: {
    name: "Super Admin",
    email: "superadmin@gabaygamot.com",
    avatar: "",
  },
}

export function AppSidebar({ ...props }) {
  const currentUser = auth?.currentUser;
  const currentPath = typeof window !== "undefined" ? window.location.pathname : "";
  
  const userData = {
    name: currentUser?.displayName || data.user.name,
    email: currentUser?.email || data.user.email,
    avatar: currentUser?.photoURL || data.user.avatar,
  };

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <a href="/super-admin" aria-label="Go to Super Admin overview">
                <div className="flex aspect-square size-8 items-center justify-center">
                  <img
                    src={logoUrl}
                    alt="GabayGamot"
                    className="size-8 rounded-none object-contain drop-shadow-[0_1px_2px_rgba(15,23,42,0.25)] dark:brightness-125 dark:saturate-125 dark:drop-shadow-[0_0_8px_rgba(45,212,191,0.42)]"
                  />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium">GabayGamot</span>
                  <span className="truncate text-xs">Super Admin</span>
                </div>
                <ChevronsUpDown className="ml-auto size-4" />
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Platform</SidebarGroupLabel>
          <SidebarMenu>
            {superAdminNavGroups.map((group) => {
              const isActiveGroup = group.items.some((item) => item.href === currentPath)
              const GroupIcon = group.items[0]?.icon || HeartPulse

              return (
                <Collapsible
                  key={group.label}
                  asChild
                  defaultOpen={isActiveGroup}
                  className="group/collapsible"
                >
                  <SidebarMenuItem>
                    <CollapsibleTrigger asChild>
                      <SidebarMenuButton tooltip={group.label}>
                        <GroupIcon />
                        <span>{group.label}</span>
                        <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                      </SidebarMenuButton>
                    </CollapsibleTrigger>
                    <CollapsibleContent>
                      <SidebarMenuSub>
                        {group.items.map((item) => (
                          <SidebarMenuSubItem key={item.href}>
                            <SidebarMenuSubButton asChild isActive={currentPath === item.href}>
                              <a href={item.href}>
                                <span>{item.title}</span>
                              </a>
                            </SidebarMenuSubButton>
                          </SidebarMenuSubItem>
                        ))}
                      </SidebarMenuSub>
                    </CollapsibleContent>
                  </SidebarMenuItem>
                </Collapsible>
              )
            })}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={userData} />
      </SidebarFooter>
    </Sidebar>
  )
}

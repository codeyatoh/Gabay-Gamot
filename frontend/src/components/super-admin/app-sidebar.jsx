"use client"

import * as React from "react"
import {
  IconActivity,
  IconBuildingHospital,
  IconDashboard,
  IconDatabase,
  IconHelp,
  IconReport,
  IconSettings,
  IconShieldCheck,
  IconUsers,
} from "@tabler/icons-react"

import { NavDocuments } from "./nav-documents"
import { NavMain } from "./nav-main"
import { NavSecondary } from "./nav-secondary"
import { NavUser } from "./nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import logoUrl from "@/assets/images/gabay-gamot-logo-sm.png"
import { auth } from "@/config/firebase"

const data = {
  user: {
    name: "Super Admin",
    email: "superadmin@gabaygamot.com",
    avatar: "",
  },
  navMain: [
    {
      title: "Overview",
      url: "/super-admin",
      icon: IconDashboard,
    },
    {
      title: "Approvals",
      url: "/super-admin/approvals",
      icon: IconShieldCheck,
    },
    {
      title: "Health Centers",
      url: "/super-admin/centers",
      icon: IconBuildingHospital,
    },
    {
      title: "User Registry",
      url: "/super-admin/users",
      icon: IconUsers,
    },
    {
      title: "System Audit",
      url: "/super-admin/audit",
      icon: IconActivity,
    },
  ],
  navSecondary: [
    {
      title: "Settings",
      url: "/super-admin/settings",
      icon: IconSettings,
    },
    {
      title: "Support",
      url: "#",
      icon: IconHelp,
    },
  ],
  documents: [
    {
      name: "Global Inventory",
      url: "/super-admin/inventory",
      icon: IconDatabase,
    },
    {
      name: "Analytics & Reports",
      url: "/super-admin/reports",
      icon: IconReport,
    },
  ],
}

export function AppSidebar({ ...props }) {
  const currentUser = auth?.currentUser;
  
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
              className="data-[slot=sidebar-menu-button]:p-1.5!"
            >
              <a href="/super-admin">
                <img src={logoUrl} alt="Logo" className="size-5 rounded-sm" />
                <span className="text-base font-semibold">GabayGamot</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavDocuments items={data.documents} />
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={userData} />
      </SidebarFooter>
    </Sidebar>
  )
}

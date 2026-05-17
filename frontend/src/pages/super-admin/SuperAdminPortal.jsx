import { AppSidebar } from "@/components/super-admin/app-sidebar"
import { ChartAreaInteractive } from "@/components/super-admin/chart-area-interactive"
import { DataTable } from "@/components/super-admin/data-table"
import { SectionCards } from "@/components/super-admin/section-cards"
import { SiteHeader } from "@/components/super-admin/site-header"
import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar"

import { approvalQueue } from "@/data/superAdminMockData"

export function SuperAdminPortal() {
  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "calc(var(--spacing) * 72)",
          "--header-height": "calc(var(--spacing) * 12)",
        }
      }
    >
      <AppSidebar variant="inset" />
      <SidebarInset>
        <SiteHeader title="Super Admin Dashboard" />
        <div className="flex flex-1 flex-col">
          <div className="@container/main flex flex-1 flex-col gap-2">
            <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
              <SectionCards />
              <div className="px-4 lg:px-6">
                <ChartAreaInteractive />
              </div>
              <DataTable data={approvalQueue} />
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}

import { AppSidebar } from "@/components/super-admin/app-sidebar"
import { AiInsightPanel } from "@/components/super-admin/ai-insight-panel"
import { ChartAreaInteractive } from "@/components/super-admin/chart-area-interactive"
import { HealthCentersMap } from "@/components/super-admin/health-centers-map"
import { MedicineShortageChart } from "@/components/super-admin/medicine-shortage-chart"
import { SectionCards } from "@/components/super-admin/section-cards"
import { SiteHeader } from "@/components/super-admin/site-header"
import {
  CompactSelect,
  PageIntro,
  TabbedTableCard,
} from "@/components/super-admin/SuperAdminBlocks"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar"

import {
  dailyBarangayMedicineSignals,
  getPageBlueprint,
  healthCenterLocations,
  pageGuides,
  quickFilters,
} from "@/data/superAdminMockData"

export function SuperAdminPortal({ pathname = "/super-admin" }) {
  const activePath = normalizeSuperAdminPath(pathname)
  const isOverview = activePath === "/super-admin"
  const pageTitle = isOverview
    ? "Super Admin Dashboard"
    : getPageBlueprint(activePath).title

  return (
    <SidebarProvider>
      <AppSidebar variant="inset" />
      <SidebarInset>
        <SiteHeader title={pageTitle} />
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
          {isOverview ? (
            <OverviewPage />
          ) : (
            <BlueprintPage pathname={activePath} />
          )}
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}

function OverviewPage() {
  const guide = pageGuides["/super-admin"]

  return (
    <>
      <SectionCards />
      <div className="grid gap-4 xl:grid-cols-[minmax(0,1.4fr)_minmax(320px,0.6fr)]">
        <ChartAreaInteractive />
        <MedicineShortageChart signals={dailyBarangayMedicineSignals} />
      </div>
      <AiInsightPanel
        guide={guide}
        dailySignals={dailyBarangayMedicineSignals}
      />
    </>
  )
}

function BlueprintPage({ pathname }) {
  const page = getPageBlueprint(pathname)
  const isHealthCentersPage = pathname === "/super-admin/health-centers"

  return (
    <div className="space-y-5">
      <PageIntro
        eyebrow={page.eyebrow}
        title={page.title}
        description={page.description}
        action={page.primaryAction}
        notes={page.sidePanel}
      >
        <CompactSelect label="Date range" options={quickFilters} />
      </PageIntro>

      <div className="grid gap-3 md:grid-cols-3">
        {page.stats.map((stat) => (
          <Card key={stat.label} className="rounded-xl bg-muted/50 shadow-none">
            <CardHeader className="border-b p-4">
              <CardDescription>{stat.label}</CardDescription>
              <CardTitle className="mt-2 text-2xl font-semibold tabular-nums">
                {stat.value}
              </CardTitle>
            </CardHeader>
            <CardContent className="px-4 pb-4 pt-0 text-sm text-muted-foreground">
              {stat.helper}
            </CardContent>
          </Card>
        ))}
      </div>

      {isHealthCentersPage && <HealthCentersMap centers={healthCenterLocations} />}

      <TabbedTableCard
        title={page.title}
        description={page.description}
        tabs={page.tabs}
        columns={page.columns}
        rows={page.rows}
      />
    </div>
  )
}

function normalizeSuperAdminPath(pathname) {
  if (pathname === "/super-admin/centers") {
    return "/super-admin/health-centers"
  }

  if (pathname === "/super-admin/audit") {
    return "/super-admin/audit-logs"
  }

  return pathname
}

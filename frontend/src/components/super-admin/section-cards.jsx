import { ArrowUpRight, MapPinned, ShieldCheck, TriangleAlert } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export function SectionCards() {
  const cards = [
    {
      label: "Admin Requests",
      value: "18",
      helper: "New admin signups waiting for review",
      badge: "Needs review",
      icon: ShieldCheck,
      href: "/super-admin/approvals",
      tone: "text-amber-600 border-amber-500/20 bg-amber-500/10",
    },
    {
      label: "Health Centers",
      value: "142",
      helper: "Verified centers registered in the system",
      badge: "+5.2%",
      icon: MapPinned,
      href: "/super-admin/health-centers",
      tone: "text-emerald-600 border-emerald-500/20 bg-emerald-500/10",
    },
    {
      label: "Medicine Alerts",
      value: "24",
      helper: "Low-stock or expiring medicines",
      badge: "+3 alerts",
      icon: TriangleAlert,
      href: "/super-admin/inventory",
      tone: "text-rose-600 border-rose-500/20 bg-rose-500/10",
    },
  ]

  return (
    <div className="grid auto-rows-min gap-4 md:grid-cols-3">
      {cards.map((card) => {
        const Icon = card.icon

        return (
          <Card key={card.label} className="rounded-xl bg-muted/50 shadow-none">
            <CardHeader className="border-b p-4">
              <CardDescription className="flex items-center gap-2">
                <Icon className="size-4" />
                {card.label}
              </CardDescription>
              <CardTitle className="text-3xl font-semibold tabular-nums">
                {card.value}
              </CardTitle>
              <CardAction className="right-4 top-4">
                <Badge variant="outline" className={card.tone}>
                  {card.badge}
                </Badge>
              </CardAction>
            </CardHeader>
            <CardFooter className="justify-between gap-3 p-4 text-sm">
              <span className="text-muted-foreground">{card.helper}</span>
              <a
                href={card.href}
                className="inline-flex shrink-0 items-center gap-1 text-xs font-medium text-primary"
              >
                View
                <ArrowUpRight className="size-3.5" />
              </a>
            </CardFooter>
          </Card>
        )
      })}
    </div>
  )
}

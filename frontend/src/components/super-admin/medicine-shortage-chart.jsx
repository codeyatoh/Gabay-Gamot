"use client"

import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

const chartConfig = {
  casesToday: {
    label: "Cases today",
    color: "#22c55e",
  },
  usableStockCount: {
    label: "Usable stock",
    color: "#38bdf8",
  },
}

export function MedicineShortageChart({ signals }) {
  const chartData = signals.map((signal) => ({
    barangay: signal.barangay,
    casesToday: signal.casesToday,
    usableStockCount: Number.parseInt(signal.usableStock, 10) || 0,
    medicine: signal.medicineNeeded,
  }))

  return (
    <Card className="rounded-xl shadow-none">
      <CardHeader className="border-b">
        <CardTitle>Cases vs Medicine Stock</CardTitle>
        <CardDescription>
          Compare today&apos;s illness cases with usable medicine stock.
        </CardDescription>
      </CardHeader>
      <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
        <ChartContainer config={chartConfig} className="aspect-auto h-[250px] w-full">
          <BarChart data={chartData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="barangay"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="dot" />}
            />
            <Bar
              dataKey="casesToday"
              fill="var(--color-casesToday)"
              radius={[4, 4, 0, 0]}
            />
            <Bar
              dataKey="usableStockCount"
              fill="var(--color-usableStockCount)"
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}

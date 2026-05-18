"use client"

import * as React from "react"
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts"

import { useIsMobile } from "@/hooks/use-mobile"
import {
  Card,
  CardAction,
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  ToggleGroup,
  ToggleGroupItem,
} from "@/components/ui/toggle-group"

export const description = "An interactive area chart"

const chartData = [
  { date: "2024-04-01", fever: 222, cough: 150 },
  { date: "2024-04-02", fever: 97, cough: 180 },
  { date: "2024-04-03", fever: 167, cough: 120 },
  { date: "2024-04-04", fever: 242, cough: 260 },
  { date: "2024-04-05", fever: 373, cough: 290 },
  { date: "2024-04-06", fever: 301, cough: 340 },
  { date: "2024-04-07", fever: 245, cough: 180 },
  { date: "2024-04-08", fever: 409, cough: 320 },
  { date: "2024-04-09", fever: 59, cough: 110 },
  { date: "2024-04-10", fever: 261, cough: 190 },
  { date: "2024-04-11", fever: 327, cough: 350 },
  { date: "2024-04-12", fever: 292, cough: 210 },
  { date: "2024-04-13", fever: 342, cough: 380 },
  { date: "2024-04-14", fever: 137, cough: 220 },
  { date: "2024-04-15", fever: 120, cough: 170 },
  { date: "2024-04-16", fever: 138, cough: 190 },
  { date: "2024-04-17", fever: 446, cough: 360 },
  { date: "2024-04-18", fever: 364, cough: 410 },
  { date: "2024-04-19", fever: 243, cough: 180 },
  { date: "2024-04-20", fever: 89, cough: 150 },
  { date: "2024-04-21", fever: 137, cough: 200 },
  { date: "2024-04-22", fever: 224, cough: 170 },
  { date: "2024-04-23", fever: 138, cough: 230 },
  { date: "2024-04-24", fever: 387, cough: 290 },
  { date: "2024-04-25", fever: 215, cough: 250 },
  { date: "2024-04-26", fever: 75, cough: 130 },
  { date: "2024-04-27", fever: 383, cough: 420 },
  { date: "2024-04-28", fever: 122, cough: 180 },
  { date: "2024-04-29", fever: 315, cough: 240 },
  { date: "2024-04-30", fever: 454, cough: 380 },
  { date: "2024-05-01", fever: 165, cough: 220 },
  { date: "2024-05-02", fever: 293, cough: 310 },
  { date: "2024-05-03", fever: 247, cough: 190 },
  { date: "2024-05-04", fever: 385, cough: 420 },
  { date: "2024-05-05", fever: 481, cough: 390 },
  { date: "2024-05-06", fever: 498, cough: 520 },
  { date: "2024-05-07", fever: 388, cough: 300 },
  { date: "2024-05-08", fever: 149, cough: 210 },
  { date: "2024-05-09", fever: 227, cough: 180 },
  { date: "2024-05-10", fever: 293, cough: 330 },
  { date: "2024-05-11", fever: 335, cough: 270 },
  { date: "2024-05-12", fever: 197, cough: 240 },
  { date: "2024-05-13", fever: 197, cough: 160 },
  { date: "2024-05-14", fever: 448, cough: 490 },
  { date: "2024-05-15", fever: 473, cough: 380 },
  { date: "2024-05-16", fever: 338, cough: 400 },
  { date: "2024-05-17", fever: 499, cough: 420 },
  { date: "2024-05-18", fever: 315, cough: 350 },
  { date: "2024-05-19", fever: 235, cough: 180 },
  { date: "2024-05-20", fever: 177, cough: 230 },
  { date: "2024-05-21", fever: 82, cough: 140 },
  { date: "2024-05-22", fever: 81, cough: 120 },
  { date: "2024-05-23", fever: 252, cough: 290 },
  { date: "2024-05-24", fever: 294, cough: 220 },
  { date: "2024-05-25", fever: 201, cough: 250 },
  { date: "2024-05-26", fever: 213, cough: 170 },
  { date: "2024-05-27", fever: 420, cough: 460 },
  { date: "2024-05-28", fever: 233, cough: 190 },
  { date: "2024-05-29", fever: 78, cough: 130 },
  { date: "2024-05-30", fever: 340, cough: 280 },
  { date: "2024-05-31", fever: 178, cough: 230 },
  { date: "2024-06-01", fever: 178, cough: 200 },
  { date: "2024-06-02", fever: 470, cough: 410 },
  { date: "2024-06-03", fever: 103, cough: 160 },
  { date: "2024-06-04", fever: 439, cough: 380 },
  { date: "2024-06-05", fever: 88, cough: 140 },
  { date: "2024-06-06", fever: 294, cough: 250 },
  { date: "2024-06-07", fever: 323, cough: 370 },
  { date: "2024-06-08", fever: 385, cough: 320 },
  { date: "2024-06-09", fever: 438, cough: 480 },
  { date: "2024-06-10", fever: 155, cough: 200 },
  { date: "2024-06-11", fever: 92, cough: 150 },
  { date: "2024-06-12", fever: 492, cough: 420 },
  { date: "2024-06-13", fever: 81, cough: 130 },
  { date: "2024-06-14", fever: 426, cough: 380 },
  { date: "2024-06-15", fever: 307, cough: 350 },
  { date: "2024-06-16", fever: 371, cough: 310 },
  { date: "2024-06-17", fever: 475, cough: 520 },
  { date: "2024-06-18", fever: 107, cough: 170 },
  { date: "2024-06-19", fever: 341, cough: 290 },
  { date: "2024-06-20", fever: 408, cough: 450 },
  { date: "2024-06-21", fever: 169, cough: 210 },
  { date: "2024-06-22", fever: 317, cough: 270 },
  { date: "2024-06-23", fever: 480, cough: 530 },
  { date: "2024-06-24", fever: 132, cough: 180 },
  { date: "2024-06-25", fever: 141, cough: 190 },
  { date: "2024-06-26", fever: 434, cough: 380 },
  { date: "2024-06-27", fever: 448, cough: 490 },
  { date: "2024-06-28", fever: 149, cough: 200 },
  { date: "2024-06-29", fever: 103, cough: 160 },
  { date: "2024-06-30", fever: 446, cough: 400 },
]

const chartConfig = {
  visitors: {
    label: "Cases",
  },
  fever: {
    label: "Fever/Flu",
    color: "var(--color-primary, #0f172a)",
  },
  cough: {
    label: "Cough/Colds",
    color: "var(--color-primary, #0f172a)",
  },
}

export function ChartAreaInteractive() {
  const isMobile = useIsMobile()
  const [timeRange, setTimeRange] = React.useState("90d")

  React.useEffect(() => {
    if (isMobile) {
      setTimeRange("7d")
    }
  }, [isMobile])

  const filteredData = chartData.filter((item) => {
    const date = new Date(item.date)
    const referenceDate = new Date("2024-06-30")
    let daysToSubtract = 90
    if (timeRange === "30d") {
      daysToSubtract = 30
    } else if (timeRange === "7d") {
      daysToSubtract = 7
    }
    const startDate = new Date(referenceDate)
    startDate.setDate(startDate.getDate() - daysToSubtract)
    return date >= startDate
  })

  return (
    <Card className="rounded-xl shadow-none">
      <CardHeader className="border-b">
        <CardTitle>Recorded Health Cases</CardTitle>
        <CardDescription>
          <span className="hidden sm:block">
            Cases reported by all Health Centers
          </span>
          <span className="sm:hidden">Total Cases</span>
        </CardDescription>
        <CardAction>
          <ToggleGroup
            type="single"
            value={timeRange}
            onValueChange={(val) => { if(val) setTimeRange(val) }}
            variant="outline"
            className="hidden md:flex"
          >
            <ToggleGroupItem value="90d">Last 3 months</ToggleGroupItem>
            <ToggleGroupItem value="30d">Last 30 days</ToggleGroupItem>
            <ToggleGroupItem value="7d">Last 7 days</ToggleGroupItem>
          </ToggleGroup>
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger
              className="flex w-40 md:hidden"
              aria-label="Select a value"
            >
              <SelectValue placeholder="Last 3 months" />
            </SelectTrigger>
            <SelectContent className="rounded-xl">
              <SelectItem value="90d" className="rounded-lg">
                Last 3 months
              </SelectItem>
              <SelectItem value="30d" className="rounded-lg">
                Last 30 days
              </SelectItem>
              <SelectItem value="7d" className="rounded-lg">
                Last 7 days
              </SelectItem>
            </SelectContent>
          </Select>
        </CardAction>
      </CardHeader>
      <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[250px] w-full"
        >
          <AreaChart data={filteredData}>
            <defs>
              <linearGradient id="fillFever" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="#ef4444"
                  stopOpacity={1.0}
                />
                <stop
                  offset="95%"
                  stopColor="#ef4444"
                  stopOpacity={0.1}
                />
              </linearGradient>
              <linearGradient id="fillCough" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="#3b82f6"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="#3b82f6"
                  stopOpacity={0.1}
                />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value) => {
                const date = new Date(value)
                return date.toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                })
              }}
            />
            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  labelFormatter={(value) => {
                    return new Date(value).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                    })
                  }}
                  indicator="dot"
                />
              }
            />
            <Area
              dataKey="cough"
              type="natural"
              fill="url(#fillCough)"
              stroke="#3b82f6"
              stackId="a"
              name="Cough/Colds"
            />
            <Area
              dataKey="fever"
              type="natural"
              fill="url(#fillFever)"
              stroke="#ef4444"
              stackId="a"
              name="Fever/Flu"
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}

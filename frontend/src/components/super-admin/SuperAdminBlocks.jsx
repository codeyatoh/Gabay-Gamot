import {
  ArrowRight,
  ChevronDown,
  MoreVertical,
  TrendingDown,
  TrendingUp,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const toneClasses = {
  good: "border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-500/20 dark:bg-emerald-500/10 dark:text-emerald-200",
  warning: "border-amber-200 bg-amber-50 text-amber-700 dark:border-amber-500/20 dark:bg-amber-500/10 dark:text-amber-200",
  danger: "border-rose-200 bg-rose-50 text-rose-700 dark:border-rose-500/20 dark:bg-rose-500/10 dark:text-rose-200",
  info: "border-sky-200 bg-sky-50 text-sky-700 dark:border-sky-500/20 dark:bg-sky-500/10 dark:text-sky-200",
  neutral: "border-border bg-muted text-muted-foreground",
};

export function StatusPill({ children, tone = "neutral", className }) {
  return (
    <span
      className={cn(
        "inline-flex min-h-7 items-center gap-1.5 rounded-full border px-2.5 text-xs font-medium",
        toneClasses[tone] || toneClasses.neutral,
        className
      )}
    >
      {children}
    </span>
  );
}

export function PageIntro({ eyebrow, title, description, action, actionHref, children }) {
  return (
    <div className="mb-5 flex flex-col gap-4 lg:mb-6 lg:flex-row lg:items-end lg:justify-between">
      <div className="min-w-0">
        <p className="text-xs font-semibold uppercase tracking-wider text-primary">
          {eyebrow}
        </p>
        <h2 className="mt-1 text-2xl font-semibold tracking-tight sm:text-3xl">
          {title}
        </h2>
        <p className="mt-2 max-w-3xl text-sm leading-relaxed text-muted-foreground">
          {description}
        </p>
      </div>
      <div className="flex flex-wrap items-center gap-2">
        {children}
        {action && actionHref && (
          <Button asChild>
            <a href={actionHref}>
              {action}
              <ArrowRight />
            </a>
          </Button>
        )}
        {action && !actionHref && (
          <Button>
            {action}
            <ArrowRight />
          </Button>
        )}
      </div>
    </div>
  );
}

export function MetricGrid({ metrics }) {
  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
      {metrics.map((metric) => {
        const Icon = metric.icon;
        const TrendIcon = metric.tone === "danger" ? TrendingDown : TrendingUp;

        return (
          <Card
            key={metric.label}
            className="overflow-hidden rounded-lg bg-gradient-to-t from-primary/5 to-card shadow-sm"
          >
            <CardHeader className="flex-row items-start justify-between space-y-0 p-4">
              <div className="min-w-0">
                <CardDescription className="truncate">{metric.label}</CardDescription>
                <CardTitle className="mt-2 text-2xl font-semibold tabular-nums">
                  {metric.value}
                </CardTitle>
              </div>
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border bg-background text-primary">
                <Icon className="h-5 w-5" />
              </div>
            </CardHeader>
            <CardContent className="px-4 pb-4 pt-0">
              <div className="flex flex-wrap items-center gap-2">
                <StatusPill tone={metric.tone}>
                  <TrendIcon className="h-3.5 w-3.5" />
                  {metric.delta}
                </StatusPill>
                <span className="text-xs text-muted-foreground">{metric.detail}</span>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}

export function BentoGrid({ children }) {
  return (
    <div className="grid auto-rows-[minmax(150px,auto)] grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-6">
      {children}
    </div>
  );
}

export function BentoPanel({ children, className }) {
  return (
    <Card className={cn("overflow-hidden rounded-lg shadow-sm", className)}>
      {children}
    </Card>
  );
}

export function MiniLineChart({ data, primaryKey = "cases", secondaryKey = "dispensing" }) {
  const maxValue = Math.max(
    ...data.map((item) => Math.max(item[primaryKey], item[secondaryKey] || 0))
  );
  const points = data
    .map((item, index) => {
      const x = data.length === 1 ? 0 : (index / (data.length - 1)) * 100;
      const y = 100 - (item[primaryKey] / maxValue) * 78 - 10;
      return `${x},${y}`;
    })
    .join(" ");
  const secondaryPoints = data
    .map((item, index) => {
      const x = data.length === 1 ? 0 : (index / (data.length - 1)) * 100;
      const y = 100 - ((item[secondaryKey] || 0) / maxValue) * 72 - 12;
      return `${x},${y}`;
    })
    .join(" ");

  return (
    <div className="h-full min-h-56 w-full">
      <svg className="h-44 w-full overflow-visible" viewBox="0 0 100 100" preserveAspectRatio="none">
        <defs>
          <linearGradient id="caseTrendFill" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.28" />
            <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0" />
          </linearGradient>
        </defs>
        <polyline
          points={`0,100 ${points} 100,100`}
          fill="url(#caseTrendFill)"
          stroke="none"
        />
        <polyline
          points={secondaryPoints}
          fill="none"
          stroke="hsl(var(--muted-foreground))"
          strokeDasharray="3 3"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          vectorEffect="non-scaling-stroke"
        />
        <polyline
          points={points}
          fill="none"
          stroke="hsl(var(--primary))"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2.5"
          vectorEffect="non-scaling-stroke"
        />
      </svg>
      <div className="grid grid-cols-7 gap-1 text-center text-[10px] uppercase tracking-wider text-muted-foreground">
        {data.map((item) => (
          <span key={item.label}>{item.label}</span>
        ))}
      </div>
    </div>
  );
}

export function DataTable({ columns, rows, caption }) {
  return (
    <div className="min-w-0 max-w-full">
      <div className="space-y-3 md:hidden">
        {rows.map((row) => (
          <div key={row.join("-")} className="rounded-lg border bg-card p-4 shadow-sm">
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <p className="truncate text-sm font-semibold">{row[0]}</p>
                <p className="mt-1 truncate text-xs text-muted-foreground">
                  {columns[1]}: {row[1]}
                </p>
              </div>
              {isStatusCell(row[row.length - 1]) && (
                <StatusPill tone={getStatusTone(row[row.length - 1])}>
                  {row[row.length - 1]}
                </StatusPill>
              )}
            </div>
            <div className="mt-4 grid gap-2 text-sm">
              {row.slice(2, -1).map((cell, index) => (
                <div key={`${cell}-${index}`} className="flex items-center justify-between gap-4">
                  <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                    {columns[index + 2]}
                  </span>
                  <span className="min-w-0 truncate text-right text-muted-foreground">{cell}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="hidden overflow-hidden rounded-lg border md:block">
        <div className="block max-w-full overflow-x-auto">
        <table className="w-full min-w-[720px] border-collapse text-sm">
          {caption && <caption className="sr-only">{caption}</caption>}
          <thead className="bg-muted/80 text-xs uppercase tracking-wider text-muted-foreground">
            <tr>
              {columns.map((column) => (
                <th key={column} className="whitespace-nowrap px-4 py-3 text-left font-semibold">
                  {column}
                </th>
              ))}
              <th className="w-12 px-4 py-3">
                <span className="sr-only">Actions</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.join("-")} className="border-t bg-card transition-colors hover:bg-accent/50">
                {row.map((cell, index) => (
                  <td
                    key={`${cell}-${index}`}
                    className={cn(
                      "px-4 py-3 align-middle",
                      index === 0 ? "font-medium text-foreground" : "text-muted-foreground"
                    )}
                  >
                    {isStatusCell(cell) ? (
                      <StatusPill tone={getStatusTone(cell)}>{cell}</StatusPill>
                    ) : (
                      cell
                    )}
                  </td>
                ))}
                <td className="px-4 py-3 text-right">
                  <Button variant="ghost" size="icon" className="h-8 w-8 min-h-8 min-w-8">
                    <MoreVertical className="h-4 w-4" />
                    <span className="sr-only">Open row actions</span>
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        </div>
      </div>
    </div>
  );
}

export function TabsBar({ tabs }) {
  return (
    <div className="flex w-full flex-wrap gap-2">
      {tabs.map((tab, index) => (
        <button
          key={tab}
          type="button"
          className={cn(
            "min-h-10 shrink-0 rounded-lg border px-3 text-sm font-medium transition-colors",
            index === 0
              ? "border-primary bg-primary text-primary-foreground"
              : "bg-card text-muted-foreground hover:bg-accent hover:text-accent-foreground"
          )}
        >
          {tab}
        </button>
      ))}
    </div>
  );
}

export function CompactSelect({ label, options }) {
  return (
    <label className="flex min-h-10 items-center gap-2 rounded-lg border bg-card px-3 text-sm text-muted-foreground">
      <span className="whitespace-nowrap">{label}</span>
      <ChevronDown className="h-4 w-4" />
      <select className="sr-only" defaultValue={options[0]}>
        {options.map((option) => (
          <option key={option}>{option}</option>
        ))}
      </select>
    </label>
  );
}

export function DetailList({ items }) {
  return (
    <div className="space-y-3">
      {items.map((item) => (
        <div key={item} className="flex gap-3 rounded-lg border bg-background p-3">
          <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-primary" />
          <p className="text-sm leading-relaxed text-muted-foreground">{item}</p>
        </div>
      ))}
    </div>
  );
}

function isStatusCell(value) {
  const statuses = [
    "Pending review",
    "Needs more info",
    "Duplicate warning",
    "Low stock",
    "Expiring soon",
    "Stockout risk",
    "Stockout",
    "Spike watch",
    "Monitor",
    "Review",
    "Open",
    "Acknowledged",
    "Ready",
    "Generating",
    "Success",
    "Failure",
    "Active",
    "Disabled",
    "Pending setup",
    "Needs admin",
    "Sent",
    "Accepted",
    "Fulfilled",
    "Expired",
    "Draft",
    "Clear",
  ];

  return statuses.includes(value);
}

function getStatusTone(value) {
  if (
    ["Active", "Ready", "Success", "Fulfilled", "Stable", "Clear"].includes(value)
  ) {
    return "good";
  }

  if (
    [
      "Needs more info",
      "Duplicate warning",
      "Expiring soon",
      "Stockout risk",
      "Spike watch",
      "Review",
      "Monitor",
      "Acknowledged",
      "Generating",
      "Pending setup",
      "Needs admin",
      "Sent",
      "Accepted",
      "Draft",
    ].includes(value)
  ) {
    return "warning";
  }

  if (["Low stock", "Stockout", "Open", "Failure", "Disabled", "Expired"].includes(value)) {
    return "danger";
  }

  return "neutral";
}

import {
  AlertTriangle,
  BrainCircuit,
  DatabaseZap,
  LockKeyhole,
  Sparkles,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export function AiInsightPanel({ guide, dailySignals = [] }) {
  const topSignal = dailySignals[0];

  return (
    <Card className="overflow-hidden rounded-xl bg-muted/50 shadow-none">
      <CardHeader className="gap-4 border-b p-4 sm:p-5">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
          <div className="flex items-center gap-3">
            <span className="flex h-9 w-9 items-center justify-center rounded-lg border bg-background text-primary">
              <BrainCircuit className="h-5 w-5" />
            </span>
            <div>
              <CardTitle className="text-lg">AI Assistant</CardTitle>
              <CardDescription>
                Daily summary for cases and medicine stock.
              </CardDescription>
            </div>
          </div>
          <Badge variant="outline" className="w-fit shrink-0 bg-background text-[11px] text-primary">
            Powered by Gemini AI
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="space-y-3 p-4 sm:p-5">
        <div className="rounded-lg border bg-background p-4">
          <div className="mb-3 flex items-center justify-between gap-3">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              <Sparkles className="h-3.5 w-3.5 text-primary" />
              Today
            </div>
            <span className="inline-flex items-center gap-1.5 text-[11px] font-medium text-emerald-600 dark:text-emerald-300">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
              Auto preview
            </span>
          </div>
          <p className="text-sm leading-relaxed text-foreground">
            {guide.aiInsight || guide.aiPreview}
          </p>
        </div>

        <div className="grid gap-2 sm:grid-cols-2">
          <StatusRow
            icon={DatabaseZap}
            label="Reads"
            value="Cases + stock"
          />
          <StatusRow
            icon={topSignal?.shortage === "Critical" ? AlertTriangle : LockKeyhole}
            label="Watch first"
            value={topSignal ? `${topSignal.barangay}: ${topSignal.medicineNeeded}` : "Frontend preview"}
          />
        </div>
      </CardContent>
    </Card>
  );
}

function StatusRow({ icon: Icon, label, value }) {
  return (
    <div className="flex items-center justify-between gap-3 rounded-md border bg-background px-3 py-2">
      <div className="flex min-w-0 items-center gap-2">
        <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-primary/10 text-primary">
          <Icon className="h-3.5 w-3.5" />
        </span>
        <span className="truncate text-sm font-medium">{label}</span>
      </div>
      <span className="min-w-0 truncate text-right text-xs text-muted-foreground">
        {value}
      </span>
    </div>
  );
}

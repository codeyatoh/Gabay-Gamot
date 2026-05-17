import {
  Activity,
  Bell,
  Brain,
  CheckCircle2,
  FileText,
  MapPin,
  Pill,
  ScanLine,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";

const inventoryRows = [
  { name: "Paracetamol", stock: "284", state: "Stable", color: "bg-[#45b52c]" },
  { name: "Amoxicillin", stock: "38", state: "Low", color: "bg-amber-500" },
  { name: "ORS Sachet", stock: "112", state: "Stable", color: "bg-sky-500" },
];

export function ProductPreview() {
  return (
    <div className="relative mx-auto w-full max-w-xl reveal">
      <div className="absolute -inset-2 rounded-2xl bg-[#dff0d2]/55 blur-3xl sm:-inset-4" />
      <Card className="relative overflow-hidden rounded-2xl border-slate-200 bg-white/92 p-3 shadow-soft backdrop-blur sm:p-4">
        <div className="flex flex-col gap-3 border-b border-slate-100 pb-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="min-w-0">
            <p className="text-sm font-semibold text-slate-950">Barangay Inventory</p>
            <p className="text-xs text-slate-500">Live stock and referral signals</p>
          </div>
          <Badge className="rounded-full bg-[#eef8e9] text-[#0b6b35] shadow-none">
            <span className="mr-2 h-2 w-2 rounded-full bg-[#45b52c] animate-soft-pulse" />
            Online
          </Badge>
        </div>

        <div className="grid gap-4 py-4 md:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]">
          <div className="space-y-3">
            {inventoryRows.map((item) => (
              <div
                key={item.name}
                className="group flex min-h-14 items-center justify-between gap-3 rounded-2xl border border-slate-100 bg-slate-50/80 p-3 transition duration-300 hover:-translate-y-0.5 hover:bg-white hover:shadow-panel"
              >
                <div className="flex items-center gap-3">
                  <span className={`h-2.5 w-2.5 rounded-full ${item.color}`} />
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-slate-900">{item.name}</p>
                    <p className="truncate text-xs text-slate-500">{item.stock} units available</p>
                  </div>
                </div>
                <span className="text-xs font-semibold text-slate-600">{item.state}</span>
              </div>
            ))}
          </div>

          <div className="relative rounded-2xl border border-slate-200 bg-[#083f24] p-4 text-white shadow-panel">
            <div className="mb-3 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <ScanLine className="h-4 w-4 text-[#dff0d2]" />
                <span className="text-xs font-medium text-slate-200">OCR scan</span>
              </div>
              <span className="text-[11px] text-[#dff0d2]">Review required</span>
            </div>
            <div className="relative h-40 overflow-hidden rounded-xl border border-[#2d8a3d] bg-[#0b3421]/80 p-3">
              <div className="absolute left-3 right-3 top-4 h-0.5 bg-[#b7e08f]/90 shadow-[0_0_18px_rgba(183,224,143,0.75)] animate-scan" />
              <div className="space-y-3 pt-4 text-xs">
                <div className="h-3 w-28 rounded-full bg-white/18" />
                <div className="h-3 w-36 rounded-full bg-white/14" />
                <div className="h-3 w-24 rounded-full bg-white/14" />
                <div className="mt-8 rounded-lg bg-white/10 p-2">
                  <p className="text-[11px] text-slate-200">Detected expiry</p>
                  <p className="font-semibold">Aug 2026</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid gap-3 border-t border-slate-100 pt-4 sm:grid-cols-3">
          <PreviewSignal icon={Bell} label="Expiry alert" value="12 items" />
          <PreviewSignal icon={MapPin} label="Nearby stock" value="3 barangays" />
          <PreviewSignal icon={Brain} label="AI insight" value="Restock soon" />
        </div>
      </Card>

      <Card className="relative mx-0 mt-4 rounded-2xl border-sky-100 bg-white p-4 shadow-panel sm:mx-4 sm:ml-8 sm:w-72">
        <div className="flex items-start gap-3">
          <span className="rounded-xl bg-sky-50 p-2 text-sky-700">
            <FileText className="h-4 w-4" />
          </span>
          <div>
            <p className="text-sm font-semibold text-slate-900">Referral ready</p>
            <p className="mt-1 text-xs leading-5 text-slate-500">
              Amoxicillin found at Barangay San Isidro.
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
}

function PreviewSignal({ icon: Icon, label, value }) {
  return (
    <div className="min-h-24 rounded-2xl bg-slate-50 p-3">
      <div className="mb-3 flex items-center gap-2 text-slate-500">
        <Icon className="h-4 w-4" />
        <span className="text-[11px] font-medium uppercase">{label}</span>
      </div>
      <div className="flex items-center gap-2">
        <CheckCircle2 className="h-4 w-4 text-[#0b6b35]" />
        <p className="text-sm font-semibold text-slate-900">{value}</p>
      </div>
    </div>
  );
}

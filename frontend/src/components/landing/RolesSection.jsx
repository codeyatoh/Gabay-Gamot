import { BarChart3, ClipboardList, ScanLine, ShieldCheck, UsersRound } from "lucide-react";

import { SectionHeading } from "@/components/common/SectionHeading";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const roles = {
  admin: [
    "Manage users and barangay records",
    "Monitor inventory, referrals, and dispensing logs",
    "Review analytics, reports, and AI recommendations",
  ],
  worker: [
    "Scan medicines and update inventory",
    "Record medicines dispensed to patients",
    "Generate referrals when local stock is unavailable",
  ],
};

export function RolesSection() {
  return (
    <section id="roles" className="bg-slate-50 py-20">
      <div className="section-shell grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
        <SectionHeading
          align="left"
          eyebrow="User roles"
          title="Two views, one coordinated medicine system."
          description="Admins get monitoring and reporting depth. Barangay Health Workers get fast tools for daily inventory and dispensing work."
        />

        <Tabs defaultValue="admin" className="rounded-[1.5rem] border border-white bg-white p-3 shadow-soft">
          <TabsList className="grid h-auto grid-cols-2 rounded-2xl bg-slate-100 p-1">
            <TabsTrigger value="admin" className="rounded-xl py-3">Admin</TabsTrigger>
            <TabsTrigger value="worker" className="rounded-xl py-3">Health Worker</TabsTrigger>
          </TabsList>
          <TabsContent value="admin" className="mt-4 rounded-2xl bg-emerald-950 p-6 text-white">
            <RolePanel
              icon={ShieldCheck}
              title="Admin operations"
              subtitle="System-wide control for monitoring and decision-making."
              items={roles.admin}
              metricIcon={BarChart3}
              metric="Reports and analytics"
            />
          </TabsContent>
          <TabsContent value="worker" className="mt-4 rounded-2xl bg-emerald-950 p-6 text-white">
            <RolePanel
              icon={UsersRound}
              title="Barangay Health Worker flow"
              subtitle="Daily tools for scanning, dispensing, and referrals."
              items={roles.worker}
              metricIcon={ScanLine}
              metric="Fast medicine scanning"
            />
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
}

function RolePanel({ icon: Icon, title, subtitle, items, metricIcon: MetricIcon, metric }) {
  return (
    <div>
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10 text-emerald-100">
            <Icon className="h-6 w-6" />
          </div>
          <h3 className="text-2xl font-semibold">{title}</h3>
          <p className="mt-2 text-sm leading-6 text-emerald-50/75">{subtitle}</p>
        </div>
        <div className="hidden rounded-2xl bg-white/10 p-4 text-right sm:block">
          <MetricIcon className="ml-auto h-5 w-5 text-cyan-200" />
          <p className="mt-3 text-xs text-emerald-100">{metric}</p>
        </div>
      </div>
      <div className="mt-8 grid gap-3">
        {items.map((item) => (
          <div key={item} className="flex items-center gap-3 rounded-2xl bg-white/9 p-4">
            <ClipboardList className="h-4 w-4 text-cyan-200" />
            <span className="text-sm font-medium text-emerald-50">{item}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

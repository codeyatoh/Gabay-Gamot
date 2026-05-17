import { AlertTriangle, Boxes, Clock3, FileSearch, Route } from "lucide-react";

import { SectionHeading } from "@/components/common/SectionHeading";
import { Card } from "@/components/ui/card";

const problems = [
  {
    icon: AlertTriangle,
    title: "Expired or unused medicine",
    text: "Manual monitoring makes it harder to catch expiry risks early.",
  },
  {
    icon: Boxes,
    title: "Disconnected barangay stocks",
    text: "One barangay may have shortage while another has excess stock.",
  },
  {
    icon: Clock3,
    title: "Delayed referrals",
    text: "Health workers lose time checking medicine availability manually.",
  },
];

const solutions = [
  "Centralized inventory visibility",
  "Expiry and low-stock alerts",
  "Dispensing logs with automatic deduction",
  "Nearby barangay referral generation",
];

export function ProblemSolutionSection() {
  return (
    <section className="bg-white py-20">
      <div className="section-shell grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
        <SectionHeading
          align="left"
          eyebrow="Problem to solve"
          title="Medicine access suffers when inventory lives in notebooks."
          description="GabayGamot turns daily stock work into a connected workflow, from scanning to dispensing to barangay referral."
        />

        <div className="grid gap-4">
          {problems.map((item, index) => (
            <Card
              key={item.title}
              className="reveal rounded-2xl border-slate-100 bg-slate-50/70 p-5 shadow-none transition duration-300 hover:-translate-y-1 hover:bg-white hover:shadow-panel"
              style={{ animationDelay: `${index * 90}ms` }}
            >
              <div className="flex gap-4">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-white text-emerald-700 shadow-sm">
                  <item.icon className="h-5 w-5" />
                </span>
                <div>
                  <h3 className="font-semibold text-slate-950">{item.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-600">{item.text}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>

        <Card className="lg:col-span-2 rounded-[1.5rem] border-emerald-100 bg-emerald-950 p-6 text-white shadow-soft">
          <div className="grid gap-8 lg:grid-cols-[0.75fr_1.25fr] lg:items-center">
            <div>
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10 text-emerald-100">
                <Route className="h-6 w-6" />
              </div>
              <h3 className="text-2xl font-semibold">A coordinated medicine flow</h3>
              <p className="mt-3 text-sm leading-7 text-emerald-50/80">
                The system connects stock records, health worker actions, and referral decisions into one operational view.
              </p>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {solutions.map((solution) => (
                <div key={solution} className="flex items-center gap-3 rounded-2xl bg-white/9 p-4">
                  <FileSearch className="h-4 w-4 text-cyan-200" />
                  <span className="text-sm font-medium text-emerald-50">{solution}</span>
                </div>
              ))}
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
}

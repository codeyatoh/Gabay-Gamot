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
    <section className="bg-white py-14 sm:py-16 md:py-20">
      <div className="section-shell grid gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:items-center lg:gap-12">
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
              className="reveal rounded-2xl border-slate-100 bg-slate-50/70 p-4 shadow-none transition duration-300 hover:-translate-y-1 hover:bg-white hover:shadow-panel sm:p-5"
              style={{ animationDelay: `${index * 90}ms` }}
            >
              <div className="flex gap-3 sm:gap-4">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-white text-[#0b6b35] shadow-sm">
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

        <Card className="rounded-2xl border-slate-200 bg-[#083f24] p-5 text-white shadow-soft sm:p-6 lg:col-span-2">
          <div className="grid gap-8 lg:grid-cols-[minmax(0,0.75fr)_minmax(0,1.25fr)] lg:items-center">
            <div>
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10 text-slate-200">
                <Route className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold sm:text-2xl">A coordinated medicine flow</h3>
              <p className="mt-3 text-sm leading-6 text-[#eef8e9]/80 sm:leading-7">
                The system connects stock records, health worker actions, and referral decisions into one operational view.
              </p>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {solutions.map((solution) => (
                <div key={solution} className="flex min-h-14 items-center gap-3 rounded-2xl bg-white/[0.09] p-4">
                  <FileSearch className="h-4 w-4 text-sky-200" />
                  <span className="text-sm font-medium text-[#eef8e9]">{solution}</span>
                </div>
              ))}
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
}

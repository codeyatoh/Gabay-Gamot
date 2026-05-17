import { ArrowRight, Check, Database, ScanLine, Send, UserCheck } from "lucide-react";

import { SectionHeading } from "@/components/common/SectionHeading";
import { Card } from "@/components/ui/card";

const steps = [
  {
    icon: ScanLine,
    title: "Scan and review",
    text: "OCR extracts medicine details, then the health worker confirms the data.",
  },
  {
    icon: Database,
    title: "Save inventory",
    text: "Validated medicine records are stored in the centralized database.",
  },
  {
    icon: UserCheck,
    title: "Dispense and deduct",
    text: "Dispensing logs record medicine usage and automatically update stock.",
  },
  {
    icon: Send,
    title: "Refer when needed",
    text: "If unavailable, the system searches nearby barangays and prepares a referral.",
  },
];

export function WorkflowSection() {
  return (
    <section id="workflow" className="bg-white py-20">
      <div className="section-shell">
        <SectionHeading
          align="left"
          eyebrow="Workflow"
          title="A daily health center process, cleaned up into four steps."
          description="The landing page can show the actual product logic early, so users understand what the full system will become."
        />

        <div className="mt-12 grid gap-4 lg:grid-cols-4">
          {steps.map((step, index) => (
            <Card key={step.title} className="relative rounded-2xl border-slate-100 bg-white p-5 shadow-none">
              {index < steps.length - 1 ? (
                <ArrowRight className="absolute -right-5 top-10 hidden h-5 w-5 text-[#9ccc76] lg:block" />
              ) : null}
              <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-2xl bg-sky-50 text-sky-700">
                <step.icon className="h-5 w-5" />
              </div>
              <div className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase text-[#0b6b35]">
                <Check className="h-3.5 w-3.5" />
                Step {index + 1}
              </div>
              <h3 className="font-semibold text-slate-950">{step.title}</h3>
              <p className="mt-3 text-sm leading-6 text-slate-600">{step.text}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

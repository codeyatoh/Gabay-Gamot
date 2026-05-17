import { Asterisk, CornerDownRight } from "lucide-react";
import React from "react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const process = [
  {
    step: "01",
    title: "Scan and Review",
    description:
      "OCR extracts medicine details instantly. Health workers then confirm the extracted data to ensure absolute accuracy.",
  },
  {
    step: "02",
    title: "Save Inventory",
    description:
      "Validated medicine records are securely stored in the centralized database, keeping stock levels updated in real-time.",
  },
  {
    step: "03",
    title: "Dispense and Deduct",
    description:
      "Every time a medicine is dispensed to a patient, the system records usage and automatically deducts it from the available stock.",
  },
  {
    step: "04",
    title: "Refer When Needed",
    description:
      "If a prescribed medicine is out of stock, the system searches nearby barangays and automatically prepares a digital referral.",
  },
];

export function WorkflowSection({ className }) {
  return (
    <section id="workflow" className={cn("bg-white py-24 dark:bg-[#0a0f0d] md:py-32", className)}>
      <div className="section-shell">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-6 lg:gap-20">
          <div className="col-span-2 h-fit w-full space-y-7 py-8 lg:sticky lg:top-32">
            <div className="relative w-fit text-4xl font-semibold tracking-tight text-slate-900 dark:text-slate-50 lg:text-6xl">
              <h2 className="w-fit">Our Workflow</h2>
              <Asterisk className="absolute -right-6 -top-4 size-6 text-[#0b6b35] dark:text-[#4ade80] md:size-8 lg:-right-10" />
            </div>
            <p className="text-base text-slate-600 dark:text-slate-500">
              A simplified daily health center process designed to eliminate errors, optimize medicine stocks, and ensure no patient is left behind.
            </p>

            <Button
              variant="ghost"
              className="group flex h-12 items-center justify-start gap-2 rounded-xl border border-slate-200 px-6 text-slate-700 transition hover:bg-[#f8fbf5] hover:text-[#0b6b35] dark:border-white/10 dark:text-slate-300 dark:hover:bg-white/5 dark:hover:text-[#4ade80]"
            >
              <CornerDownRight className="size-4 text-[#0b6b35] transition-transform group-hover:translate-x-1 group-hover:translate-y-1 dark:text-[#4ade80]" />
              Try the system
            </Button>
          </div>
          <ul className="relative col-span-4 w-full lg:pl-16">
            {process.map((step, index) => (
              <li
                key={index}
                className="relative flex flex-col justify-between gap-6 border-t border-slate-100 py-10 dark:border-white/5 md:flex-row md:gap-10 lg:py-16"
              >
                <Illustration className="absolute right-0 top-6 hidden sm:block" />

                <div className="flex size-14 shrink-0 items-center justify-center rounded-xl bg-[#f8fbf5] text-lg font-bold tracking-tighter text-[#0b6b35] dark:bg-white/5 dark:text-[#4ade80]">
                  {step.step}
                </div>
                <div className="max-w-lg">
                  <h3 className="mb-4 text-2xl font-semibold tracking-tight text-slate-900 dark:text-slate-100 lg:text-3xl">
                    {step.title}
                  </h3>
                  <p className="text-base leading-relaxed text-slate-600 dark:text-slate-500">
                    {step.description}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

const Illustration = (props) => {
  return (
    <svg
      width="22"
      height="20"
      viewBox="0 0 22 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <line
        x1="0.607422"
        y1="2.57422"
        x2="21.5762"
        y2="2.57422"
        stroke="#cfe3c7"
        strokeWidth="3"
        strokeLinecap="round"
        className="dark:stroke-white/15"
      />
      <line
        x1="19.5762"
        y1="19.624"
        x2="19.5762"
        y2="4.57422"
        stroke="#cfe3c7"
        strokeWidth="3"
        strokeLinecap="round"
        className="dark:stroke-white/15"
      />
    </svg>
  );
};

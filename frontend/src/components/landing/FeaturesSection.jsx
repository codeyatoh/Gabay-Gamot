import { Bell, Brain, FileText, MapPin, Pill, ScanLine } from "lucide-react";

import { SectionHeading } from "@/components/common/SectionHeading";
import { Card } from "@/components/ui/card";

const features = [
  {
    icon: ScanLine,
    title: "OCR medicine scanning",
    text: "Extracts medicine name, expiry date, and category before user review.",
  },
  {
    icon: Pill,
    title: "Inventory monitoring",
    text: "Tracks available stock and supports cleaner medicine records.",
  },
  {
    icon: Bell,
    title: "Expiry and stock alerts",
    text: "Highlights medicines that need attention before they become waste.",
  },
  {
    icon: FileText,
    title: "Dispensing logs",
    text: "Records patient, medicine, quantity, date, worker, and remarks.",
  },
  {
    icon: MapPin,
    title: "Nearby referrals",
    text: "Finds available medicine in nearby barangays and prepares referral details.",
  },
  {
    icon: Brain,
    title: "AI recommendations",
    text: "Supports redistribution, shortage prevention, and procurement planning.",
  },
];

export function FeaturesSection() {
  return (
    <section id="features" className="bg-slate-50 py-20">
      <div className="section-shell">
        <div className="mx-auto flex justify-center">
          <SectionHeading
            eyebrow="Core features"
            title="Everything starts with clearer medicine visibility."
            description="Each feature is designed around the health worker's daily flow, not a generic inventory template."
          />
        </div>

        <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <Card
              key={feature.title}
              className="reveal group rounded-2xl border-white bg-white p-6 shadow-none transition duration-300 hover:-translate-y-1 hover:border-slate-200 hover:shadow-panel"
              style={{ animationDelay: `${index * 70}ms` }}
            >
              <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-2xl bg-[#eef8e9] text-[#0b6b35] transition duration-300 group-hover:bg-[#0b6b35] group-hover:text-white">
                <feature.icon className="h-5 w-5" />
              </div>
              <h3 className="text-lg font-semibold text-slate-950">{feature.title}</h3>
              <p className="mt-3 text-sm leading-6 text-slate-600">{feature.text}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

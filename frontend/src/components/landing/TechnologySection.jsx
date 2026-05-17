import { Bot, Database, Flame, Layers3, Map, ScanText, Server, Shield } from "lucide-react";

import { SectionHeading } from "@/components/common/SectionHeading";
import { Badge } from "@/components/ui/badge";

const tech = [
  { icon: Layers3, label: "React + Vite", detail: "Frontend app" },
  { icon: Server, label: "Node + Express", detail: "Backend API" },
  { icon: Flame, label: "Firebase Auth", detail: "User accounts" },
  { icon: Database, label: "Firestore", detail: "Central database" },
  { icon: ScanText, label: "Tesseract.js", detail: "OCR scanning" },
  { icon: Map, label: "Mapbox", detail: "Nearby barangays" },
  { icon: Bot, label: "Gemini API", detail: "AI recommendations" },
  { icon: Shield, label: "Rate limits", detail: "API protection" },
];

export function TechnologySection() {
  return (
    <section id="technology" className="bg-white py-20">
      <div className="section-shell">
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
          <SectionHeading
            align="left"
            eyebrow="Technology"
            title="Built on a practical stack for a real web app."
            description="The landing page introduces the system clearly, while the stack is ready for authentication, database work, OCR, maps, and AI-assisted planning."
          />

          <div className="grid gap-3 sm:grid-cols-2">
            {tech.map((item) => (
              <div
                key={item.label}
                className="group flex items-center gap-4 rounded-2xl border border-slate-100 bg-slate-50 p-4 transition duration-300 hover:-translate-y-0.5 hover:bg-white hover:shadow-panel"
              >
                <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white text-teal-700 shadow-sm transition group-hover:bg-teal-700 group-hover:text-white">
                  <item.icon className="h-5 w-5" />
                </span>
                <div>
                  <p className="font-semibold text-slate-950">{item.label}</p>
                  <p className="text-sm text-slate-500">{item.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-10 flex flex-wrap gap-2">
          {["secure by design", "role-based access", "barangay coordination", "AI assisted"].map((label) => (
            <Badge key={label} variant="outline" className="rounded-full border-teal-100 bg-teal-50/70 px-3 py-1 text-teal-700">
              {label}
            </Badge>
          ))}
        </div>
      </div>
    </section>
  );
}

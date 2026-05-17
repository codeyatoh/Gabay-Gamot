import { Pill } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white">
      <div className="section-shell flex flex-col gap-4 py-8 text-sm text-slate-500 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-teal-700 text-white">
            <Pill className="h-4 w-4" />
          </span>
          <span>GabayGamot medicine monitoring system</span>
        </div>
        <span>Built for barangay health center coordination.</span>
      </div>
    </footer>
  );
}

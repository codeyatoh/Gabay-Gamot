import { ArrowRight, ShieldCheck } from "lucide-react";

import { Button } from "@/components/ui/button";

export function CtaSection() {
  return (
    <section className="bg-slate-50 px-4 py-20">
      <div className="mx-auto max-w-6xl overflow-hidden rounded-[2rem] bg-[#083f24] px-6 py-12 text-white shadow-soft sm:px-10 lg:px-14">
        <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
          <div>
            <div className="mb-5 flex w-fit items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-sm text-slate-200">
              <ShieldCheck className="h-4 w-4" />
              Ready for the first landing page build
            </div>
            <h2 className="max-w-2xl text-3xl font-semibold leading-tight sm:text-4xl">
              Start with a landing page that already feels like the product.
            </h2>
            <p className="mt-4 max-w-2xl text-sm leading-7 text-[#eef8e9]/75 sm:text-base">
              GabayGamot can grow from this page into the full inventory, dispensing, referral,
              and reporting system without losing its visual direction.
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
            <Button size="lg" className="h-12 rounded-xl bg-white px-6 text-slate-900 hover:bg-[#eef8e9]">
              Request Access
              <ArrowRight className="h-4 w-4" />
            </Button>
            <Button size="lg" variant="outline" className="h-12 rounded-xl border-white/20 bg-transparent px-6 text-white hover:bg-white/10 hover:text-white">
              Login
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { ArrowRightLeft, BellRing, QrCode } from "lucide-react";
import React from "react";

export function FeaturesSection() {
    return (
        <section id="features" className="bg-[#fcfdfa] py-16 dark:bg-[#0d1117] sm:py-20 md:py-24 lg:py-28 xl:py-32">
            <div className="section-shell">
                <div className="text-center">
                    <h2 className="text-balance text-3xl font-semibold leading-tight text-slate-900 dark:text-slate-50 sm:text-4xl lg:text-5xl">
                        Built for Barangay Centers
                    </h2>
                    <p className="mx-auto mt-4 max-w-2xl text-sm leading-6 text-slate-600 dark:text-slate-400 sm:text-base sm:leading-7">
                        A unified ecosystem to streamline medicine coordination, inventory tracking, and patient referrals.
                    </p>
                </div>
                <Card className="mx-auto mt-10 grid w-full max-w-md divide-y overflow-hidden border-[#cfe3c7] shadow-panel *:text-center dark:border-white/10 dark:bg-[#111318] sm:mt-12 md:mt-16 md:max-w-full md:grid-cols-3 md:divide-x md:divide-y-0">
                    <div className="group border-[#cfe3c7]/50 transition-colors duration-300 hover:bg-[#f8fbf5]/50 dark:border-white/5 dark:hover:bg-white/5">
                        <CardHeader className="pb-3">
                            <CardDecorator>
                                <QrCode className="size-6 text-[#0b6b35] dark:text-[#4ade80]" aria-hidden="true" />
                            </CardDecorator>
                            <h3 className="mt-6 font-semibold text-slate-900 dark:text-slate-100">Smart Scanning</h3>
                        </CardHeader>
                        <CardContent>
                            <p className="text-sm text-slate-600 dark:text-slate-500">
                                Instantly scan medicines using OCR. Track inventory levels, active components, and expiration dates seamlessly.
                            </p>
                        </CardContent>
                    </div>

                    <div className="group border-[#cfe3c7]/50 transition-colors duration-300 hover:bg-[#f8fbf5]/50 dark:border-white/5 dark:hover:bg-white/5">
                        <CardHeader className="pb-3">
                            <CardDecorator>
                                <ArrowRightLeft className="size-6 text-[#0b6b35] dark:text-[#4ade80]" aria-hidden="true" />
                            </CardDecorator>
                            <h3 className="mt-6 font-semibold text-slate-900 dark:text-slate-100">Real-time Referrals</h3>
                        </CardHeader>
                        <CardContent>
                            <p className="mt-3 text-sm text-slate-600 dark:text-slate-500">
                                Coordinate and refer patients to nearby health centers based on live medicine availability to ensure no prescription goes unfilled.
                            </p>
                        </CardContent>
                    </div>

                    <div className="group border-[#cfe3c7]/50 transition-colors duration-300 hover:bg-[#f8fbf5]/50 dark:border-white/5 dark:hover:bg-white/5">
                        <CardHeader className="pb-3">
                            <CardDecorator>
                                <BellRing className="size-6 text-[#0b6b35] dark:text-[#4ade80]" aria-hidden="true" />
                            </CardDecorator>
                            <h3 className="mt-6 font-semibold text-slate-900 dark:text-slate-100">Expiry Alerts</h3>
                        </CardHeader>
                        <CardContent>
                            <p className="mt-3 text-sm text-slate-600 dark:text-slate-500">
                                Receive proactive warnings for nearing expiration dates to reduce medical waste and ensure optimum patient safety.
                            </p>
                        </CardContent>
                    </div>
                </Card>
            </div>
        </section>
    );
}

const CardDecorator = ({ children }) => (
    <div
        className="relative mx-auto size-28 duration-200 [--color-border:color-mix(in_oklab,#0b6b35_15%,transparent)] group-hover:[--color-border:color-mix(in_oklab,#0b6b35_30%,transparent)] dark:[--color-border:color-mix(in_oklab,#4ade80_22%,transparent)] dark:group-hover:[--color-border:color-mix(in_oklab,#4ade80_40%,transparent)] sm:size-32 lg:size-36"
        style={{ maskImage: 'radial-gradient(circle at center, black 40%, transparent 60%)', WebkitMaskImage: 'radial-gradient(circle at center, black 40%, transparent 60%)' }}
    >
        <div
            aria-hidden="true"
            className="absolute inset-0 transition-colors duration-300 bg-[linear-gradient(to_right,var(--color-border)_1px,transparent_1px),linear-gradient(to_bottom,var(--color-border)_1px,transparent_1px)] bg-[size:24px_24px]"
        />
        <div className="absolute inset-0 m-auto flex size-12 items-center justify-center rounded-sm border-l border-t border-[#cfe3c7] bg-white shadow-sm transition-transform duration-300 group-hover:scale-110 dark:border-white/10 dark:bg-[#1a1f2e]">
            {children}
        </div>
    </div>
);

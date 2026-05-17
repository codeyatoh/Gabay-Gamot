import { Facebook, Instagram, Linkedin, Twitter } from "lucide-react";
import logoUrl from "@/assets/images/gabay-gamot-logo-sm.png";

const links = [
  {
    group: "Platform",
    items: [
      { title: "Features", href: "#features" },
      { title: "Workflow", href: "#workflow" },
      { title: "Built With", href: "#built-with" },
      { title: "FAQs", href: "#faqs" },
    ],
  },
  {
    group: "Capabilities",
    items: [
      { title: "Medicine Inventory", href: "#" },
      { title: "Barangay Referrals", href: "#" },
      { title: "Expiry Alerts", href: "#" },
      { title: "OCR Scanning", href: "#" },
    ],
  },
  {
    group: "Resources",
    items: [
      { title: "Help Center", href: "#" },
      { title: "User Guides", href: "#" },
      { title: "FAQs", href: "#faqs" },
      { title: "Contact Support", href: "#" },
    ],
  },
  {
    group: "Legal",
    items: [
      { title: "Terms of Service", href: "#" },
      { title: "Privacy Policy", href: "#" },
      { title: "Data Security", href: "#" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="flex flex-col items-center justify-center border-t border-[#e5f0e1] bg-[#fcfdfa] py-16 dark:border-white/[0.04] dark:bg-[#0d1117] sm:py-24">
      <div className="mx-auto w-full max-w-7xl px-6">
        <div className="grid gap-12 md:grid-cols-5">
          <div className="flex flex-col items-start md:col-span-2">
            <a href="#home" aria-label="GabayGamot home" className="flex items-center gap-3">
              <img
                src={logoUrl}
                alt="GabayGamot"
                className="h-10 w-10 rounded-xl object-contain transition-all dark:drop-shadow-[0_0_8px_rgba(74,222,128,0.5)]"
              />
              <span className="leading-tight">
                <span className="block text-sm font-semibold text-slate-950 dark:text-slate-50">GabayGamot</span>
                <span className="block text-xs text-slate-500 dark:text-slate-500">Medicine coordination</span>
              </span>
            </a>
            <p className="mt-6 max-w-xs text-sm text-slate-500 dark:text-slate-500">
              A unified ecosystem designed to streamline medicine coordination, inventory tracking, and patient referrals across barangay health centers.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-4 md:col-span-3">
            {links.map((link, index) => (
              <div key={index} className="space-y-4 text-sm">
                <span className="block font-semibold text-slate-900 dark:text-slate-200">{link.group}</span>
                {link.items.map((item, idx) => (
                  <a
                    key={idx}
                    href={item.href}
                    className="block text-slate-500 transition-colors duration-150 hover:text-[#0b6b35] dark:text-slate-500 dark:hover:text-[#4ade80]"
                  >
                    <span>{item.title}</span>
                  </a>
                ))}
              </div>
            ))}
          </div>
        </div>

        <div className="mt-16 flex flex-wrap items-center justify-between gap-6 border-t border-[#e5f0e1] pt-8 dark:border-white/5">
          <span className="order-last block text-center text-sm text-slate-500 dark:text-slate-600 md:order-first">
            © {new Date().getFullYear()} GabayGamot, All rights reserved.
          </span>
          <div className="order-first flex flex-wrap items-center justify-center gap-6 text-sm md:order-last">
            {[
              { icon: Twitter, label: "Twitter" },
              { icon: Linkedin, label: "LinkedIn" },
              { icon: Facebook, label: "Facebook" },
              { icon: Instagram, label: "Instagram" },
            ].map(({ icon: Icon, label }) => (
              <a
                key={label}
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="text-slate-400 transition-colors hover:text-[#0b6b35] dark:text-slate-600 dark:hover:text-[#4ade80]"
              >
                <Icon className="h-5 w-5" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

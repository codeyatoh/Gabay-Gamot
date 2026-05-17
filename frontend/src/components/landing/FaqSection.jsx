import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqData = [
  {
    question: "What is GabayGamot for?",
    answer:
      "GabayGamot is planned as a medicine coordination system for barangay health centers. It helps with medicine scanning, inventory monitoring, dispensing records, and referral support.",
  },
  {
    question: "How does medicine scanning help health workers?",
    answer:
      "The system uses OCR-assisted encoding to extract medicine details such as name, category, and expiry date. A health worker still reviews the result before saving it.",
  },
  {
    question: "What happens when medicine stock is low or unavailable?",
    answer:
      "GabayGamot can support nearby barangay referrals by checking where medicine may still be available, then preparing referral details for the patient workflow.",
  },
  {
    question: "Why are expiry alerts important?",
    answer:
      "Expiry monitoring helps health workers catch expired or unused medicine earlier, reducing waste and improving visibility before stock problems affect patients.",
  },
  {
    question: "Who are the main users?",
    answer:
      "The system is designed around admins and barangay health workers. Admins monitor records and reports, while health workers handle scanning, inventory updates, dispensing, and referrals.",
  },
  {
    question: "What security basics are planned?",
    answer:
      "The planned system includes authenticated access, role-based permissions, API rate limits, protected routes, and careful handling of inventory and user actions.",
  },
];

export function FaqSection() {
  return (
    <section id="faqs" className="bg-white py-24" style={{ scrollMarginTop: "8rem" }}>
      <div className="section-shell">
        <div className="mx-auto flex max-w-5xl flex-col gap-8 lg:flex-row lg:gap-12">
          <div className="flex w-full flex-col gap-4 lg:flex-1 lg:py-5">
            <p className="text-xs font-medium uppercase tracking-[0.22em] text-[#0b6b35]">FAQs</p>
            <h2 className="text-4xl font-semibold leading-tight tracking-normal text-slate-950 sm:text-5xl">
              Frequently Asked Questions
            </h2>
            <p className="text-base leading-7 text-slate-600">
              Short answers for the first version of GabayGamot, based on the planned medicine
              coordination workflow.
            </p>
          </div>

          <div className="w-full lg:flex-1">
            <Accordion type="single" collapsible className="w-full rounded-md border border-[#dbe9d5] bg-[#f8fbf5]">
              {faqData.map((item, index) => (
                <AccordionItem key={item.question} value={`item-${index}`} className="border-[#dbe9d5] last:border-b-0">
                  <AccordionTrigger className="p-5 text-left text-base font-medium text-slate-950 hover:no-underline hover:text-[#0b6b35]">
                    {item.question}
                  </AccordionTrigger>

                  <AccordionContent className="px-5 pb-5 text-sm leading-6 text-slate-600">
                    {item.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </div>
    </section>
  );
}

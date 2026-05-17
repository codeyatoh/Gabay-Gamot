const faqs = [
  {
    question: "What does GabayGamot help with?",
    answer: "It helps barangay health workers scan medicines, monitor inventory, track dispensing, and prepare referrals.",
  },
  {
    question: "Why does it track expiry dates?",
    answer: "Expiry monitoring helps flag medicine that needs attention before it becomes waste.",
  },
  {
    question: "How do referrals work?",
    answer: "When local stock is unavailable, the system can look for available medicine in nearby barangays.",
  },
  {
    question: "Who will use the system?",
    answer: "The planned users are admins and barangay health workers who manage medicine records and daily dispensing.",
  },
];

export function FaqSection() {
  return (
    <section id="faqs" className="bg-white py-24" style={{ scrollMarginTop: "8rem" }}>
      <div className="section-shell">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-xs font-medium uppercase tracking-[0.22em] text-[#0b6b35]">FAQs</p>
          <h2 className="mt-5 text-balance text-4xl font-semibold tracking-normal text-slate-950 sm:text-5xl">
            Simple answers for the first version.
          </h2>
        </div>

        <div className="mx-auto mt-10 grid max-w-3xl gap-3">
          {faqs.map((faq) => (
            <details
              key={faq.question}
              className="group rounded-md border border-[#dbe9d5] bg-[#f8fbf5] p-5 shadow-sm transition hover:border-[#0b6b35]/40"
            >
              <summary className="cursor-pointer list-none text-sm font-semibold text-slate-950 marker:hidden">
                <span className="flex items-center justify-between gap-4">
                  {faq.question}
                  <span className="text-lg font-thin text-[#0b6b35] transition group-open:rotate-45">+</span>
                </span>
              </summary>
              <p className="mt-3 text-sm leading-6 text-slate-600">{faq.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

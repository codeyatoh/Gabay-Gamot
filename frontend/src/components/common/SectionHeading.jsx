import { Badge } from "@/components/ui/badge";

export function SectionHeading({ eyebrow, title, description, align = "center" }) {
  const alignment = align === "left" ? "items-start text-left" : "items-center text-center";

  return (
    <div className={`flex w-full max-w-3xl flex-col gap-4 ${alignment}`}>
      {eyebrow ? (
        <Badge className="w-fit rounded-full border-[#dbe9d5] bg-[#eef8e9] px-3 py-1 text-[#0b6b35] shadow-none">
          {eyebrow}
        </Badge>
      ) : null}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold leading-tight text-slate-950 sm:text-3xl lg:text-4xl">
          {title}
        </h2>
        {description ? (
          <p className="text-sm leading-6 text-slate-600 sm:text-base sm:leading-7 lg:text-lg">{description}</p>
        ) : null}
      </div>
    </div>
  );
}

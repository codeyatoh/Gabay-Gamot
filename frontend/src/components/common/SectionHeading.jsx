import { Badge } from "@/components/ui/badge";

export function SectionHeading({ eyebrow, title, description, align = "center" }) {
  const alignment = align === "left" ? "items-start text-left" : "items-center text-center";

  return (
    <div className={`flex max-w-3xl flex-col gap-4 ${alignment}`}>
      {eyebrow ? (
        <Badge className="w-fit rounded-full border-emerald-200 bg-emerald-50 px-3 py-1 text-emerald-700 shadow-none">
          {eyebrow}
        </Badge>
      ) : null}
      <div className="space-y-4">
        <h2 className="text-3xl font-semibold leading-tight text-slate-950 sm:text-4xl">
          {title}
        </h2>
        {description ? (
          <p className="text-base leading-7 text-slate-600 sm:text-lg">{description}</p>
        ) : null}
      </div>
    </div>
  );
}

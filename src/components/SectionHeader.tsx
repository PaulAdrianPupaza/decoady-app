import { cn } from "@/lib/utils";

export default function SectionHeader({
  eyebrow,
  title,
  text,
  align = "left",
  as: Heading = "h2",
  className,
}: {
  eyebrow?: string;
  title: string;
  text?: string;
  align?: "left" | "center";
  as?: "h1" | "h2";
  className?: string;
}) {
  return (
    <div className={cn("max-w-2xl", align === "center" && "mx-auto text-center", className)}>
      {eyebrow && <p className="eyebrow mb-4">{eyebrow}</p>}
      <Heading className={cn(Heading === "h1" ? "text-4xl md:text-6xl" : "text-3xl md:text-5xl", "leading-[1.08]")}>{title}</Heading>
      {text && <p className="mt-5 text-lg leading-relaxed text-ink-600">{text}</p>}
    </div>
  );
}

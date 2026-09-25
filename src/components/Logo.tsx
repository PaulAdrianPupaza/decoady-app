import { cn } from "@/lib/utils";

export default function Logo({ className, inverted = false }: { className?: string; inverted?: boolean }) {
  return (
    <span className={cn("inline-flex items-center gap-3", className)}>
      <span
        className={cn(
          "grid h-10 w-10 place-items-center rounded-sm font-serif text-xl leading-none",
          inverted ? "bg-sand-100 text-ink-900" : "bg-ink-900 text-sand-50"
        )}
        aria-hidden="true"
      >
        D
      </span>
      <span className="flex flex-col leading-none">
        <span className={cn("font-serif text-xl tracking-tight", inverted ? "text-sand-50" : "text-ink-900")}>Decoady</span>
        <span className={cn("mt-1 text-[10px] font-semibold uppercase tracking-eyebrow", inverted ? "text-sand-300" : "text-clay-600")}>
          Reformas · Ibiza
        </span>
      </span>
    </span>
  );
}

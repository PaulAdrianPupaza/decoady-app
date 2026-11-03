import { cn } from "@/lib/utils";
import LogoMark from "@/components/LogoMark";

export default function Logo({ className, inverted = false }: { className?: string; inverted?: boolean }) {
  return (
    <span className={cn("inline-flex items-center gap-3", className)}>
      <LogoMark className="h-11 w-11 shrink-0" />
      <span className="flex flex-col leading-none">
        <span className={cn("font-serif text-xl tracking-tight", inverted ? "text-sand-50" : "text-ink-900")}>Decoady</span>
        <span className={cn("mt-1 text-[10px] font-semibold uppercase tracking-eyebrow", inverted ? "text-sand-300" : "text-clay-600")}>
          Reformas · Ibiza
        </span>
      </span>
    </span>
  );
}

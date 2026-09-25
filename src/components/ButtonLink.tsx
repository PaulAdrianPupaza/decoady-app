import Link from "next/link";
import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "dark" | "outline" | "outlineLight" | "light";

const variants: Record<Variant, string> = {
  primary: "bg-clay-500 text-white hover:bg-clay-600",
  dark: "bg-ink-900 text-sand-50 hover:bg-ink-700",
  outline: "border border-ink-900/20 text-ink-900 hover:border-ink-900 hover:bg-ink-900 hover:text-sand-50",
  outlineLight: "border border-white/40 text-white hover:bg-white hover:text-ink-900",
  light: "bg-sand-50 text-ink-900 hover:bg-white",
};

export const buttonClass = (variant: Variant = "primary", className?: string) =>
  cn(
    "inline-flex items-center justify-center gap-2 rounded-sm px-6 py-3.5 text-sm font-semibold tracking-wide transition-colors duration-200 disabled:cursor-not-allowed disabled:opacity-60",
    variants[variant],
    className
  );

export default function ButtonLink({
  variant = "primary",
  className,
  ...props
}: ComponentProps<typeof Link> & { variant?: Variant }) {
  return <Link className={buttonClass(variant, className)} {...props} />;
}

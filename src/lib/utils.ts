import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const dateLocales = { es: "es-ES", en: "en-GB", ca: "ca-ES" } as const;

/** "2019-02" → "febrero de 2019" */
export function formatMonth(isoMonth: string, locale: keyof typeof dateLocales): string {
  const [y, m] = isoMonth.split("-").map(Number);
  return new Intl.DateTimeFormat(dateLocales[locale], { month: "long", year: "numeric" }).format(new Date(y, m - 1, 1));
}

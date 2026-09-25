import type { Locale } from "./config";
import es, { type Dictionary } from "./dictionaries/es";
import en from "./dictionaries/en";
import ca from "./dictionaries/ca";

const dictionaries: Record<Locale, Dictionary> = { es, en, ca };

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale];
}

export type { Dictionary };
export * from "./config";

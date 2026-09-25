export const locales = ["es", "en", "ca"] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "es";

export const localeNames: Record<Locale, string> = {
  es: "Español",
  en: "English",
  ca: "Català",
};

export const ogLocales: Record<Locale, string> = {
  es: "es_ES",
  en: "en_GB",
  ca: "ca_ES",
};

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}

/** Construye la URL de una página para un idioma. El español va sin prefijo. */
export function localePath(locale: Locale, path: string = "/"): string {
  const clean = path.startsWith("/") ? path : `/${path}`;
  if (locale === defaultLocale) return clean;
  return clean === "/" ? `/${locale}` : `/${locale}${clean}`;
}

/** Quita el prefijo de idioma de una ruta del navegador ("/en/proyectos" → "/proyectos"). */
export function stripLocale(pathname: string): string {
  const [, first, ...rest] = pathname.split("/");
  if (first && isLocale(first) && first !== defaultLocale) {
    return `/${rest.join("/")}`;
  }
  return pathname || "/";
}

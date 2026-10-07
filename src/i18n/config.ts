export const locales = ["es", "en", "ca"] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale = "es" satisfies Locale;

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

// ── URLs traducidas ─────────────────────────────────────────────────────────
// Internamente (carpetas de src/app y datos) todas las rutas están en español.
// Hacia fuera, cada idioma tiene sus propias URLs: /en/services/pools, /ca/serveis/piscines…
// El middleware traduce de la URL pública a la interna; localePath() hace lo contrario.

type Translations = Record<Exclude<Locale, "es">, string>;

const sections: Record<string, Translations> = {
  servicios: { en: "services", ca: "serveis" },
  proyectos: { en: "projects", ca: "projectes" },
  contacto: { en: "contact", ca: "contacte" },
  legal: { en: "legal", ca: "legal" },
};

const slugs: Record<string, Record<string, Translations>> = {
  servicios: {
    "reformas-integrales": { en: "full-renovations", ca: "reformes-integrals" },
    "reforma-de-cocinas": { en: "kitchen-renovation", ca: "reforma-de-cuines" },
    "reforma-de-banos": { en: "bathroom-renovation", ca: "reforma-de-banys" },
    piscinas: { en: "pools", ca: "piscines" },
    "locales-comerciales": { en: "commercial-renovation", ca: "locals-comercials" },
    "reparaciones-y-mantenimiento": { en: "repairs-and-maintenance", ca: "reparacions-i-manteniment" },
  },
  proyectos: {
    "chalet-en-ibiza": { en: "family-home-ibiza", ca: "xalet-a-eivissa" },
    "piscina-y-piscina-de-agua-fria": { en: "pool-and-cold-plunge-pool", ca: "piscina-i-piscina-d-aigua-freda" },
    "apartamento-reformado-ibiza": { en: "apartment-renovation-ibiza", ca: "apartament-reformat-eivissa" },
    "la-esquina-puerto-de-ibiza": { en: "la-esquina-ibiza-harbour", ca: "la-esquina-port-d-eivissa" },
  },
};

function findKey(map: Record<string, Translations>, locale: Exclude<Locale, "es">, value: string): string | undefined {
  return Object.keys(map).find((key) => map[key][locale] === value);
}

/** Construye la URL pública de una página interna ("/servicios/piscinas") para un idioma. El español va sin prefijo. */
export function localePath(locale: Locale, path: string = "/"): string {
  const clean = path.startsWith("/") ? path : `/${path}`;
  if (locale === defaultLocale) return clean;
  if (clean === "/") return `/${locale}`;
  const [section, slug, ...rest] = clean.slice(1).split("/");
  const publicSection = sections[section]?.[locale] ?? section;
  const publicSlug = slug === undefined ? undefined : (slugs[section]?.[slug]?.[locale] ?? slug);
  return `/${[locale, publicSection, publicSlug, ...rest].filter((s) => s !== undefined).join("/")}`;
}

/**
 * Interpreta una URL pública: devuelve el idioma, la ruta interna equivalente
 * y si la URL usaba los nombres en español en un idioma que tiene los suyos (/en/servicios → hay que redirigir).
 */
export function parsePath(pathname: string): { locale: Locale; path: string; legacy: boolean } {
  const [, first = "", ...rest] = pathname.split("/");
  if (!isLocale(first)) {
    return { locale: defaultLocale, path: pathname || "/", legacy: false };
  }
  // "/es/..." es la ruta interna del español: aparece al generar las páginas estáticas
  // (en el navegador la URL va sin prefijo). Tiene que dar la misma ruta en ambos casos.
  if (first === defaultLocale) {
    return { locale: defaultLocale, path: `/${rest.join("/")}`, legacy: false };
  }
  const locale = first;
  const [publicSection, publicSlug, ...tail] = rest;
  if (!publicSection) return { locale, path: "/", legacy: false };

  let legacy = false;
  let section = findKey(sections, locale, publicSection);
  if (!section && sections[publicSection]) {
    section = publicSection;
    legacy = sections[publicSection][locale] !== publicSection;
  }
  section ??= publicSection;

  let slug = publicSlug;
  if (publicSlug !== undefined && slugs[section]) {
    const translated = findKey(slugs[section], locale, publicSlug);
    if (translated) slug = translated;
    else if (slugs[section][publicSlug]) legacy = legacy || slugs[section][publicSlug][locale] !== publicSlug;
  }

  const path = `/${[section, slug, ...tail].filter((s) => s !== undefined).join("/")}`;
  return { locale, path, legacy };
}

import type { Metadata } from "next";
import { defaultLocale, localePath, locales, ogLocales, type Locale } from "@/i18n/config";
import { COMPANY, SITE_URL } from "./site";

export function absoluteUrl(path: string): string {
  return `${SITE_URL}${path === "/" ? "" : path}` || SITE_URL;
}

/** Canonical + hreflang de una ruta (sin prefijo de idioma) */
export function alternates(lang: Locale, path: string) {
  const languages: Record<string, string> = {};
  for (const l of locales) languages[l] = absoluteUrl(localePath(l, path));
  languages["x-default"] = absoluteUrl(localePath(defaultLocale, path));
  return { canonical: absoluteUrl(localePath(lang, path)), languages };
}

export function pageMetadata({
  lang,
  path,
  title,
  description,
  image,
}: {
  lang: Locale;
  path: string;
  title: string;
  description: string;
  image?: string;
}): Metadata {
  return {
    title,
    description,
    alternates: alternates(lang, path),
    openGraph: {
      type: "website",
      siteName: COMPANY.name,
      locale: ogLocales[lang],
      url: absoluteUrl(localePath(lang, path)),
      title,
      description,
      images: [image ? { url: image } : { url: "/og.jpg", width: 1200, height: 630 }],
    },
    twitter: { card: "summary_large_image", title, description, images: [image ?? "/og.jpg"] },
  };
}

/** Datos estructurados de la empresa (ficha de negocio local para Google) */
export function localBusinessJsonLd(lang: Locale, description: string) {
  return {
    "@context": "https://schema.org",
    "@type": "GeneralContractor",
    "@id": `${SITE_URL}/#business`,
    name: COMPANY.name,
    description,
    url: absoluteUrl(localePath(lang, "/")),
    telephone: COMPANY.phone.replace(/\s/g, ""),
    email: COMPANY.email,
    foundingDate: String(COMPANY.foundedYear),
    image: `${SITE_URL}/images/proyectos/chalet-en-ibiza/01.jpg`,
    logo: `${SITE_URL}/icon.svg`,
    priceRange: "€€",
    address: {
      "@type": "PostalAddress",
      streetAddress: COMPANY.address.street,
      postalCode: COMPANY.address.postalCode,
      addressLocality: COMPANY.address.city,
      addressRegion: COMPANY.address.region,
      addressCountry: COMPANY.address.country,
    },
    geo: { "@type": "GeoCoordinates", latitude: COMPANY.geo.lat, longitude: COMPANY.geo.lng },
    areaServed: COMPANY.areaServed.map((name) => ({ "@type": "City", name })),
    openingHoursSpecification: COMPANY.hours.map((h) => ({
      "@type": "OpeningHoursSpecification",
      dayOfWeek: h.days === "Mo-Fr" ? ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"] : ["Saturday"],
      opens: h.opens,
      closes: h.closes,
    })),
    ...(COMPANY.sameAs.length ? { sameAs: COMPANY.sameAs } : {}),
  };
}

export function breadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

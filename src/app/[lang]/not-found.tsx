import { getDictionary, localePath, locales } from "@/i18n";
import NotFoundContent, { type NotFoundTexts } from "@/components/NotFoundContent";

// No usa headers() ni cookies(): si lo hiciera, Next.js volvería dinámicas (y no cacheables) todas las páginas.
// Se generan los textos de los tres idiomas y el cliente elige según la URL.
export default function NotFound() {
  const texts = Object.fromEntries(
    locales.map((lang) => {
      const t = getDictionary(lang).notFound;
      return [lang, { ...t, homeHref: localePath(lang, "/"), projectsHref: localePath(lang, "/proyectos") }];
    })
  ) as NotFoundTexts;

  return <NotFoundContent texts={texts} />;
}

import { headers } from "next/headers";
import { getDictionary, isLocale, localePath, defaultLocale } from "@/i18n";
import ButtonLink from "@/components/ButtonLink";

export default async function NotFound() {
  const h = (await headers()).get("x-locale") ?? defaultLocale;
  const lang = isLocale(h) ? h : defaultLocale;
  const t = getDictionary(lang);

  return (
    <section className="section">
      <div className="container max-w-2xl py-10 text-center">
        <p className="font-serif text-7xl text-clay-500">404</p>
        <h1 className="mt-6 text-4xl">{t.notFound.title}</h1>
        <p className="mt-4 text-lg text-ink-600">{t.notFound.text}</p>
        <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row">
          <ButtonLink href={localePath(lang, "/")} variant="dark">
            {t.notFound.home}
          </ButtonLink>
          <ButtonLink href={localePath(lang, "/proyectos")} variant="outline">
            {t.notFound.projects}
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}

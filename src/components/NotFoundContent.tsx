"use client";

import { useParams, usePathname } from "next/navigation";
import { isLocale, parsePath, type Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n";
import ButtonLink from "./ButtonLink";

export type NotFoundTexts = Record<Locale, Dictionary["notFound"] & { homeHref: string; projectsHref: string }>;

export default function NotFoundContent({ texts }: { texts: NotFoundTexts }) {
  // El parámetro [lang] ya está disponible al renderizar en el servidor; la URL sirve de respaldo
  const param = useParams<{ lang?: string }>()?.lang;
  const pathLocale = parsePath(usePathname()).locale;
  const t = texts[param && isLocale(param) ? param : pathLocale];

  return (
    <section className="section">
      <div className="container max-w-2xl py-10 text-center">
        <p className="font-serif text-7xl text-clay-500">404</p>
        <h1 className="mt-6 text-4xl">{t.title}</h1>
        <p className="mt-4 text-lg text-ink-600">{t.text}</p>
        <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row">
          <ButtonLink href={t.homeHref} variant="dark">
            {t.home}
          </ButtonLink>
          <ButtonLink href={t.projectsHref} variant="outline">
            {t.projects}
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}

import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { getDictionary, localePath, type Locale } from "@/i18n";
import { services } from "@/data/services";
import { pageMetadata } from "@/lib/seo";
import CtaBand from "@/components/CtaBand";
import Icon from "@/components/Icon";
import PageIntro from "@/components/PageIntro";

export async function generateMetadata({ params }: { params: Promise<{ lang: Locale }> }): Promise<Metadata> {
  const { lang } = await params;
  const t = getDictionary(lang).meta;
  return pageMetadata({ lang, path: "/servicios", title: t.servicesTitle, description: t.servicesDescription });
}

export default async function ServicesPage({ params }: { params: Promise<{ lang: Locale }> }) {
  const { lang } = await params;
  const t = getDictionary(lang);

  return (
    <>
      <PageIntro
        breadcrumbs={[
          { name: t.common.home, path: localePath(lang, "/") },
          { name: t.nav.services, path: localePath(lang, "/servicios") },
        ]}
        eyebrow={t.services.eyebrow}
        title={t.services.title}
        text={t.services.intro}
      />

      <section className="section">
        <div className="container space-y-20 md:space-y-28">
          {services.map((s, i) => (
            <article key={s.slug} className="grid items-center gap-10 lg:grid-cols-2 lg:gap-20">
              <Link
                href={localePath(lang, `/servicios/${s.slug}`)}
                className={`relative block aspect-[4/3] overflow-hidden rounded-sm bg-sand-200 ${i % 2 === 1 ? "lg:order-2" : ""}`}
                tabIndex={-1}
                aria-hidden="true"
              >
                <Image src={s.image} alt="" fill sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover transition-transform duration-700 hover:scale-[1.03]" />
              </Link>
              <div>
                <Icon name={s.icon} className="h-9 w-9 text-clay-600" />
                <h2 className="mt-6 text-3xl md:text-4xl">
                  <Link href={localePath(lang, `/servicios/${s.slug}`)} className="hover:text-clay-600">
                    {s.title[lang]}
                  </Link>
                </h2>
                <p className="mt-4 text-lg text-ink-600">{s.short[lang]}</p>
                <ul className="mt-8 grid gap-3 sm:grid-cols-2">
                  {s.included[lang].slice(0, 4).map((item) => (
                    <li key={item} className="flex gap-3 text-ink-700">
                      <Icon name="check" className="mt-0.5 h-5 w-5 shrink-0 text-clay-600" />
                      {item}
                    </li>
                  ))}
                </ul>
                <Link
                  href={localePath(lang, `/servicios/${s.slug}`)}
                  className="group mt-10 inline-flex items-center gap-2 text-sm font-semibold text-ink-900"
                >
                  {t.services.more}
                  <Icon name="arrow" className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      <CtaBand lang={lang} cta={t.cta} />
    </>
  );
}

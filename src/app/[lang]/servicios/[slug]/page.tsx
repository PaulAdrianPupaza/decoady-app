import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getDictionary, localePath, locales, type Locale } from "@/i18n";
import { getService, services } from "@/data/services";
import { projects } from "@/data/projects";
import { COMPANY, SITE_URL } from "@/lib/site";
import { absoluteUrl, pageMetadata } from "@/lib/seo";
import ButtonLink, { buttonClass } from "@/components/ButtonLink";
import CtaBand from "@/components/CtaBand";
import Icon from "@/components/Icon";
import JsonLd from "@/components/JsonLd";
import PageIntro from "@/components/PageIntro";
import ProjectCard from "@/components/ProjectCard";

type Params = Promise<{ lang: Locale; slug: string }>;


export function generateStaticParams() {
  return locales.flatMap((lang) => services.map((s) => ({ lang, slug: s.slug })));
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { lang, slug } = await params;
  const service = getService(slug);
  if (!service) return {};
  return pageMetadata({
    lang,
    path: `/servicios/${slug}`,
    title: service.metaTitle[lang],
    description: service.metaDescription[lang],
    image: service.image,
  });
}

export default async function ServicePage({ params }: { params: Params }) {
  const { lang, slug } = await params;
  const service = getService(slug);
  if (!service) notFound();
  const t = getDictionary(lang);
  const related = projects.filter((p) => p.services.includes(slug));
  const others = services.filter((s) => s.slug !== slug);
  const path = localePath(lang, `/servicios/${slug}`);

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Service",
          name: service.title[lang],
          description: service.metaDescription[lang],
          url: absoluteUrl(path),
          serviceType: service.title[lang],
          provider: { "@id": `${SITE_URL}/#business` },
          areaServed: { "@type": "Place", name: "Ibiza" },
        }}
      />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: service.faqs[lang].map((f) => ({
            "@type": "Question",
            name: f.q,
            acceptedAnswer: { "@type": "Answer", text: f.a },
          })),
        }}
      />

      <PageIntro
        breadcrumbs={[
          { name: t.common.home, path: localePath(lang, "/") },
          { name: t.nav.services, path: localePath(lang, "/servicios") },
          { name: service.title[lang], path },
        ]}
        eyebrow={t.services.eyebrow}
        title={service.metaTitle[lang]}
        text={service.short[lang]}
      />

      <section className="section">
        <div className="container grid gap-14 lg:grid-cols-12 lg:gap-20">
          <div className="lg:col-span-7">
            <div className="relative aspect-[16/10] overflow-hidden rounded-sm bg-sand-200">
              <Image src={service.image} alt={service.title[lang]} fill priority sizes="(min-width: 1024px) 58vw, 100vw" className="object-cover" />
            </div>
            <div className="prose-body mt-12 text-lg leading-relaxed text-ink-700">
              {service.intro[lang].map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>

            <h2 className="mt-16 text-3xl">{t.services.faq}</h2>
            <div className="mt-8 divide-y divide-ink-900/10 border-y border-ink-900/10">
              {service.faqs[lang].map((f) => (
                <details key={f.q} className="group py-6">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-6 text-lg font-medium text-ink-900 [&::-webkit-details-marker]:hidden">
                    {f.q}
                    <Icon name="chevronDown" className="h-5 w-5 shrink-0 text-ink-500 transition-transform group-open:rotate-180" />
                  </summary>
                  <p className="mt-4 leading-relaxed text-ink-600">{f.a}</p>
                </details>
              ))}
            </div>
          </div>

          <aside className="lg:col-span-5">
            <div className="rounded-sm border border-ink-900/10 bg-white p-8 lg:sticky lg:top-28">
              <h2 className="text-2xl">{t.services.included}</h2>
              <ul className="mt-6 space-y-4">
                {service.included[lang].map((item) => (
                  <li key={item} className="flex gap-3 text-ink-700">
                    <Icon name="check" className="mt-0.5 h-5 w-5 shrink-0 text-clay-600" />
                    {item}
                  </li>
                ))}
              </ul>
              <div className="mt-8 flex flex-col gap-3 border-t border-ink-900/10 pt-8">
                <ButtonLink href={localePath(lang, "/contacto")} variant="primary">
                  {t.cta.primary}
                  <Icon name="arrow" className="h-4 w-4" />
                </ButtonLink>
                <a href={COMPANY.phoneHref} className={buttonClass("outline")}>
                  <Icon name="phone" className="h-4 w-4" />
                  {COMPANY.phone}
                </a>
              </div>
            </div>
          </aside>
        </div>
      </section>

      {related.length > 0 && (
        <section className="section bg-sand-100">
          <div className="container">
            <h2 className="text-3xl md:text-4xl">{t.services.relatedProjects}</h2>
            <div className="mt-12 grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((p) => (
                <ProjectCard key={p.slug} project={p} lang={lang} t={t.projects} />
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="section">
        <div className="container">
          <h2 className="text-3xl md:text-4xl">{t.services.others}</h2>
          <ul className="mt-10 grid gap-px overflow-hidden rounded-sm border border-ink-900/10 bg-ink-900/10 sm:grid-cols-2 lg:grid-cols-5">
            {others.map((s) => (
              <li key={s.slug}>
                <Link href={localePath(lang, `/servicios/${s.slug}`)} className="group flex h-full flex-col bg-sand-50 p-6 hover:bg-white">
                  <Icon name={s.icon} className="h-7 w-7 text-clay-600" />
                  <span className="mt-5 font-serif text-lg text-ink-900 group-hover:text-clay-600">{s.title[lang]}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <CtaBand lang={lang} cta={t.cta} />
    </>
  );
}

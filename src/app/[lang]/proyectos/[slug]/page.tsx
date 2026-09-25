import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getDictionary, localePath, locales, type Locale } from "@/i18n";
import { getProject, projectCover, projectPhotos, projects } from "@/data/projects";
import { getService } from "@/data/services";
import { SITE_URL } from "@/lib/site";
import { absoluteUrl, pageMetadata } from "@/lib/seo";
import { formatMonth } from "@/lib/utils";
import Breadcrumbs from "@/components/Breadcrumbs";
import CtaBand from "@/components/CtaBand";
import Gallery from "@/components/Gallery";
import Icon from "@/components/Icon";
import JsonLd from "@/components/JsonLd";
import ProjectCard from "@/components/ProjectCard";

type Params = Promise<{ lang: Locale; slug: string }>;


export function generateStaticParams() {
  return locales.flatMap((lang) => projects.map((p) => ({ lang, slug: p.slug })));
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { lang, slug } = await params;
  const project = getProject(slug);
  if (!project) return {};
  return pageMetadata({
    lang,
    path: `/proyectos/${slug}`,
    title: project.title[lang],
    description: `${project.summary[lang]} ${project.description[lang][0]}`.slice(0, 160),
    image: projectCover(project),
  });
}

export default async function ProjectPage({ params }: { params: Params }) {
  const { lang, slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();
  const t = getDictionary(lang);
  const photos = projectPhotos(project);
  const others = projects.filter((p) => p.slug !== slug).slice(0, 3);
  const path = localePath(lang, `/proyectos/${slug}`);

  const facts = [
    { label: t.projects.category, value: t.projects.categories[project.category] },
    { label: t.projects.location, value: project.location ?? "Ibiza" },
    ...(project.startDate && project.endDate
      ? [{ label: t.projects.period, value: `${formatMonth(project.startDate, lang)} – ${formatMonth(project.endDate, lang)}` }]
      : []),
  ];

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "CreativeWork",
          name: project.title[lang],
          description: project.description[lang].join(" "),
          url: absoluteUrl(path),
          image: photos.map((p) => `${SITE_URL}${p}`),
          creator: { "@id": `${SITE_URL}/#business` },
          locationCreated: { "@type": "Place", name: project.location ?? "Ibiza" },
        }}
      />

      {/* Cabecera con foto */}
      <section className="relative isolate bg-ink-900">
        <Image src={photos[0]} alt={project.title[lang]} fill priority sizes="100vw" className="-z-10 object-cover opacity-70" />
        <div className="absolute inset-0 -z-10 bg-gradient-to-t from-ink-900/90 via-ink-900/40 to-ink-900/30" />
        <div className="container flex min-h-[60vh] flex-col justify-between pb-14 pt-10 md:min-h-[70vh]">
          <div className="[&_a:hover]:text-white [&_a]:text-sand-300 [&_nav]:text-sand-300 [&_span[aria-current]]:text-white">
            <Breadcrumbs
              items={[
                { name: t.common.home, path: localePath(lang, "/") },
                { name: t.nav.projects, path: localePath(lang, "/proyectos") },
                { name: project.title[lang], path },
              ]}
            />
          </div>
          <div className="max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-eyebrow text-clay-300">{t.projects.categories[project.category]}</p>
            <h1 className="mt-4 text-4xl leading-[1.05] text-white md:text-6xl">{project.title[lang]}</h1>
            <p className="mt-5 text-lg text-sand-200 md:text-xl">{project.summary[lang]}</p>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container grid gap-14 lg:grid-cols-12 lg:gap-20">
          <div className="lg:col-span-7">
            <div className="prose-body text-lg leading-relaxed text-ink-700 md:text-xl">
              {project.description[lang].map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
            {project.features[lang].length > 0 && (
              <>
                <h2 className="mt-12 font-sans text-xs font-semibold uppercase tracking-eyebrow text-ink-500">{t.projects.features}</h2>
                <ul className="mt-5 flex flex-wrap gap-2">
                  {project.features[lang].map((f) => (
                    <li key={f} className="rounded-full border border-ink-900/15 px-4 py-2 text-sm text-ink-700">
                      {f}
                    </li>
                  ))}
                </ul>
              </>
            )}
          </div>
          <aside className="lg:col-span-5">
            <dl className="divide-y divide-ink-900/10 border-y border-ink-900/10">
              {facts.map((f) => (
                <div key={f.label} className="flex justify-between gap-6 py-4">
                  <dt className="text-sm text-ink-500">{f.label}</dt>
                  <dd className="text-right text-sm font-medium text-ink-900">{f.value}</dd>
                </div>
              ))}
            </dl>
            <div className="mt-6 flex flex-wrap gap-2">
              {project.services.map((s) => {
                const service = getService(s);
                return service ? (
                  <Link
                    key={s}
                    href={localePath(lang, `/servicios/${s}`)}
                    className="inline-flex items-center gap-2 rounded-sm bg-sand-100 px-3 py-2 text-sm text-ink-700 hover:bg-sand-200"
                  >
                    <Icon name={service.icon} className="h-4 w-4 text-clay-600" />
                    {service.title[lang]}
                  </Link>
                ) : null;
              })}
            </div>
          </aside>
        </div>

        <div className="container mt-20">
          <h2 className="text-3xl md:text-4xl">
            {t.projects.gallery} <span className="font-sans text-base text-ink-500">· {photos.length} {t.projects.photos}</span>
          </h2>
          <div className="mt-10">
            <Gallery photos={photos} alt={project.title[lang]} t={t.common} />
          </div>
          <Link href={localePath(lang, "/proyectos")} className="group mt-12 inline-flex items-center gap-2 text-sm font-semibold text-ink-900">
            <Icon name="arrowLeft" className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
            {t.projects.back}
          </Link>
        </div>
      </section>

      <CtaBand lang={lang} cta={t.cta} title={t.projects.similarTitle} text={t.projects.similarText} />

      {others.length > 0 && (
        <section className="section">
          <div className="container">
            <h2 className="text-3xl md:text-4xl">{t.projects.more}</h2>
            <div className="mt-12 grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
              {others.map((p) => (
                <ProjectCard key={p.slug} project={p} lang={lang} t={t.projects} />
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}

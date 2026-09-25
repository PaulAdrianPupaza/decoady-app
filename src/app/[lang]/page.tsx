import Image from "next/image";
import Link from "next/link";
import { getDictionary, localePath, type Locale } from "@/i18n";
import { projects } from "@/data/projects";
import { services } from "@/data/services";
import { COMPANY } from "@/lib/site";
import ButtonLink from "@/components/ButtonLink";
import CtaBand from "@/components/CtaBand";
import Icon from "@/components/Icon";
import ProjectCard from "@/components/ProjectCard";
import SectionHeader from "@/components/SectionHeader";

export default async function HomePage({ params }: { params: Promise<{ lang: Locale }> }) {
  const { lang } = await params;
  const t = getDictionary(lang);

  const stats = [
    { value: `${COMPANY.yearsOfExperience}+`, label: t.stats.years },
    { value: `${COMPANY.projectsCompleted}+`, label: t.stats.projects },
    { value: t.stats.islandValue, label: t.stats.island },
    { value: t.stats.quoteValue, label: t.stats.quote },
  ];

  return (
    <>
      {/* Hero */}
      <section className="relative isolate overflow-hidden bg-ink-900">
        <Image
          src="/images/proyectos/chalet-en-ibiza/01.jpg"
          alt=""
          fill
          priority
          sizes="100vw"
          className="-z-10 object-cover opacity-80"
        />
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-ink-900/90 via-ink-900/60 to-ink-900/10" />
        <div className="absolute inset-x-0 bottom-0 -z-10 h-40 bg-gradient-to-t from-ink-900/60 to-transparent" />
        <div className="container flex min-h-[78vh] flex-col justify-center py-24 md:min-h-[86vh]">
          <div className="max-w-2xl animate-fade-up">
            <p className="text-xs font-semibold uppercase tracking-eyebrow text-clay-300">{t.hero.eyebrow}</p>
            <h1 className="mt-6 text-5xl leading-[1.02] text-white md:text-7xl">{t.hero.title}</h1>
            <p className="mt-7 max-w-xl text-lg leading-relaxed text-sand-200 md:text-xl">{t.hero.subtitle}</p>
            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              <ButtonLink href={localePath(lang, "/contacto")} variant="primary">
                {t.hero.primary}
                <Icon name="arrow" className="h-4 w-4" />
              </ButtonLink>
              <ButtonLink href={localePath(lang, "/proyectos")} variant="outlineLight">
                {t.hero.secondary}
              </ButtonLink>
            </div>
          </div>
        </div>
      </section>

      {/* Cifras */}
      <section className="border-b border-ink-900/10 bg-sand-50">
        <div className="container">
          <dl className="grid grid-cols-2 gap-px bg-ink-900/10 lg:grid-cols-4">
            {stats.map((s) => (
              <div key={s.label} className="bg-sand-50 px-5 py-8 md:px-8 md:py-10">
                <dt className="sr-only">{s.label}</dt>
                <dd>
                  <span className="block font-serif text-4xl text-ink-900 md:text-5xl">{s.value}</span>
                  <span className="mt-2 block text-sm text-ink-500">{s.label}</span>
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* Quiénes somos */}
      <section className="section">
        <div className="container grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
          <div>
            <SectionHeader eyebrow={t.home.introEyebrow} title={t.home.introTitle} />
            <div className="prose-body mt-8 max-w-xl text-lg leading-relaxed text-ink-600">
              {t.home.introText.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
            <ButtonLink href={localePath(lang, "/servicios")} variant="outline" className="mt-10">
              {t.home.allServices}
              <Icon name="arrow" className="h-4 w-4" />
            </ButtonLink>
          </div>
          <div className="grid grid-cols-5 gap-4">
            <div className="relative col-span-3 aspect-[3/4] overflow-hidden rounded-sm">
              <Image src="/images/proyectos/apartamento-reformado-ibiza/05.jpg" alt={t.services.eyebrow} fill sizes="(min-width: 1024px) 30vw, 60vw" className="object-cover" />
            </div>
            <div className="col-span-2 flex flex-col gap-4 pt-16">
              <div className="relative aspect-[3/4] overflow-hidden rounded-sm">
                <Image src="/images/proyectos/piscina-y-piscina-de-agua-fria/06.jpg" alt="" fill sizes="(min-width: 1024px) 20vw, 40vw" className="object-cover" />
              </div>
              <div className="relative aspect-square overflow-hidden rounded-sm">
                <Image src="/images/proyectos/chalet-en-ibiza/03.jpg" alt="" fill sizes="(min-width: 1024px) 20vw, 40vw" className="object-cover" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Servicios */}
      <section className="section bg-sand-100">
        <div className="container">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <SectionHeader eyebrow={t.home.servicesEyebrow} title={t.home.servicesTitle} text={t.home.servicesText} />
            <Link href={localePath(lang, "/servicios")} className="group inline-flex shrink-0 items-center gap-2 text-sm font-semibold text-ink-900">
              {t.home.allServices}
              <Icon name="arrow" className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
          <div className="mt-14 grid gap-px overflow-hidden rounded-sm border border-ink-900/10 bg-ink-900/10 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((s) => (
              <Link
                key={s.slug}
                href={localePath(lang, `/servicios/${s.slug}`)}
                className="group flex flex-col bg-sand-50 p-8 transition-colors hover:bg-white md:p-10"
              >
                <Icon name={s.icon} className="h-9 w-9 text-clay-600" />
                <h3 className="mt-8 text-2xl">{s.title[lang]}</h3>
                <p className="mt-3 flex-1 text-ink-600">{s.short[lang]}</p>
                <span className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-ink-900">
                  {t.services.more}
                  <Icon name="arrow" className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Proyectos */}
      <section className="section">
        <div className="container">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <SectionHeader eyebrow={t.home.projectsEyebrow} title={t.home.projectsTitle} text={t.home.projectsText} />
            <Link href={localePath(lang, "/proyectos")} className="group inline-flex shrink-0 items-center gap-2 text-sm font-semibold text-ink-900">
              {t.home.allProjects}
              <Icon name="arrow" className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
          <div className="mt-14 grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
            {projects.slice(0, 3).map((p) => (
              <ProjectCard key={p.slug} project={p} lang={lang} t={t.projects} />
            ))}
          </div>
        </div>
      </section>

      {/* Proceso */}
      <section className="section bg-sand-100">
        <div className="container">
          <SectionHeader eyebrow={t.home.processEyebrow} title={t.home.processTitle} />
          <ol className="mt-14 grid gap-10 md:grid-cols-2 lg:grid-cols-4">
            {t.home.process.map((step, i) => (
              <li key={step.title} className="border-t border-ink-900 pt-6">
                <span className="font-serif text-lg text-clay-600">0{i + 1}</span>
                <h3 className="mt-4 text-xl">{step.title}</h3>
                <p className="mt-3 text-ink-600">{step.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Por qué elegirnos + zona */}
      <section className="section">
        <div className="container grid gap-16 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <SectionHeader eyebrow={t.home.whyEyebrow} title={t.home.whyTitle} />
            <ul className="mt-12 grid gap-x-10 gap-y-10 sm:grid-cols-2">
              {t.home.why.map((item) => (
                <li key={item.title}>
                  <Icon name="check" className="h-6 w-6 text-clay-600" />
                  <h3 className="mt-4 font-sans text-base font-semibold">{item.title}</h3>
                  <p className="mt-2 text-ink-600">{item.text}</p>
                </li>
              ))}
            </ul>
          </div>
          <aside className="self-start rounded-sm bg-ink-900 p-8 text-sand-200 md:p-10 lg:col-span-5">
            <p className="text-xs font-semibold uppercase tracking-eyebrow text-clay-300">{t.home.areaEyebrow}</p>
            <h2 className="mt-4 text-3xl text-white">{t.home.areaTitle}</h2>
            <p className="mt-5 leading-relaxed">{t.home.areaText}</p>
            <ul className="mt-8 flex flex-wrap gap-2">
              {COMPANY.areaServed.map((town) => (
                <li key={town} className="rounded-full border border-white/20 px-3 py-1.5 text-sm">
                  {town}
                </li>
              ))}
            </ul>
            <a href={COMPANY.phoneHref} className="mt-10 flex items-center gap-3 text-lg font-medium text-white hover:text-clay-300">
              <Icon name="phone" className="h-5 w-5" />
              {COMPANY.phone}
            </a>
          </aside>
        </div>
      </section>

      <CtaBand lang={lang} cta={t.cta} />
    </>
  );
}

import type { Metadata } from "next";
import { getDictionary, localePath, type Locale } from "@/i18n";
import { COMPANY } from "@/lib/site";
import { pageMetadata } from "@/lib/seo";
import ContactForm from "@/components/ContactForm";
import Icon, { type IconName } from "@/components/Icon";
import PageIntro from "@/components/PageIntro";

export async function generateMetadata({ params }: { params: Promise<{ lang: Locale }> }): Promise<Metadata> {
  const { lang } = await params;
  const t = getDictionary(lang).meta;
  return pageMetadata({ lang, path: "/contacto", title: t.contactTitle, description: t.contactDescription });
}

export default async function ContactPage({ params }: { params: Promise<{ lang: Locale }> }) {
  const { lang } = await params;
  const t = getDictionary(lang);
  const c = t.contact;

  const channels: { icon: IconName; label: string; value: string; href: string; hint?: string; external?: boolean }[] = [
    { icon: "phone", label: c.phoneLabel, value: COMPANY.phone, href: COMPANY.phoneHref },
    { icon: "whatsapp", label: c.whatsappLabel, value: COMPANY.phone, href: COMPANY.whatsappHref, hint: c.whatsappText, external: true },
    { icon: "mail", label: c.emailLabel, value: COMPANY.email, href: `mailto:${COMPANY.email}`, hint: c.responseTime },
    {
      icon: "pin",
      label: c.addressLabel,
      value: `${COMPANY.address.street}, ${COMPANY.address.postalCode} ${COMPANY.address.city}`,
      href: COMPANY.mapsHref,
      hint: c.openMaps,
      external: true,
    },
  ];

  return (
    <>
      <PageIntro
        breadcrumbs={[
          { name: t.common.home, path: localePath(lang, "/") },
          { name: t.nav.contact, path: localePath(lang, "/contacto") },
        ]}
        eyebrow={c.eyebrow}
        title={c.title}
        text={c.intro}
      />

      <section className="section">
        <div className="container grid gap-16 lg:grid-cols-12 lg:gap-20">
          <div className="lg:col-span-7">
            <h2 className="text-3xl">{c.formTitle}</h2>
            <div className="mt-10">
              <ContactForm lang={lang} t={c} internal={getDictionary("es").contact} />
            </div>
          </div>

          <aside className="lg:col-span-5">
            <h2 className="text-3xl">{c.directTitle}</h2>
            <ul className="mt-10 divide-y divide-ink-900/10 border-y border-ink-900/10">
              {channels.map((ch) => (
                <li key={ch.label}>
                  <a
                    href={ch.href}
                    {...(ch.external ? { target: "_blank", rel: "noopener" } : {})}
                    className="group flex gap-5 py-6"
                  >
                    <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-sand-100 text-clay-600 transition-colors group-hover:bg-clay-500 group-hover:text-white">
                      <Icon name={ch.icon} className="h-5 w-5" />
                    </span>
                    <span className="min-w-0">
                      <span className="block text-xs font-semibold uppercase tracking-eyebrow text-ink-500">{ch.label}</span>
                      <span className="mt-1 block break-words text-lg font-medium text-ink-900">{ch.value}</span>
                      {ch.hint && <span className="mt-1 block text-sm text-ink-500">{ch.hint}</span>}
                    </span>
                  </a>
                </li>
              ))}
            </ul>

            <div className="mt-10 rounded-sm bg-sand-100 p-8">
              <h3 className="flex items-center gap-3 font-sans text-base font-semibold">
                <Icon name="clock" className="h-5 w-5 text-clay-600" />
                {c.hoursLabel}
              </h3>
              <dl className="mt-5 space-y-3 text-sm">
                {c.hours.map((h) => (
                  <div key={h.day} className="flex justify-between gap-4">
                    <dt className="text-ink-600">{h.day}</dt>
                    <dd className="font-medium text-ink-900">{h.time}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}

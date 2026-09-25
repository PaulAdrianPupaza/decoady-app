import Link from "next/link";
import { localePath, type Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n";
import { services } from "@/data/services";
import { COMPANY } from "@/lib/site";
import Icon from "@/components/Icon";
import Logo from "@/components/Logo";

export default function Footer({ lang, dict }: { lang: Locale; dict: Dictionary }) {
  const { footer, nav, contact } = dict;
  return (
    <footer className="bg-ink-900 text-sand-300">
      <div className="container grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <Logo inverted />
          <p className="mt-6 max-w-sm text-sm leading-relaxed text-sand-300/80">{footer.about}</p>
        </div>

        <div className="lg:col-span-3">
          <h2 className="font-sans text-xs font-semibold uppercase tracking-eyebrow text-sand-50">{nav.services}</h2>
          <ul className="mt-5 space-y-3 text-sm">
            {services.map((s) => (
              <li key={s.slug}>
                <Link href={localePath(lang, `/servicios/${s.slug}`)} className="hover:text-white">
                  {s.title[lang]}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="lg:col-span-2">
          <h2 className="font-sans text-xs font-semibold uppercase tracking-eyebrow text-sand-50">{footer.explore}</h2>
          <ul className="mt-5 space-y-3 text-sm">
            <li><Link href={localePath(lang, "/")} className="hover:text-white">{nav.home}</Link></li>
            <li><Link href={localePath(lang, "/servicios")} className="hover:text-white">{nav.services}</Link></li>
            <li><Link href={localePath(lang, "/proyectos")} className="hover:text-white">{nav.projects}</Link></li>
            <li><Link href={localePath(lang, "/contacto")} className="hover:text-white">{nav.contact}</Link></li>
          </ul>
        </div>

        <div className="lg:col-span-3">
          <h2 className="font-sans text-xs font-semibold uppercase tracking-eyebrow text-sand-50">{footer.contact}</h2>
          <ul className="mt-5 space-y-4 text-sm">
            <li>
              <a href={COMPANY.phoneHref} className="flex items-center gap-3 hover:text-white">
                <Icon name="phone" className="h-4 w-4 shrink-0 text-clay-300" />
                {COMPANY.phone}
              </a>
            </li>
            <li>
              <a href={COMPANY.whatsappHref} target="_blank" rel="noopener" className="flex items-center gap-3 hover:text-white">
                <Icon name="whatsapp" className="h-4 w-4 shrink-0 text-clay-300" />
                WhatsApp
              </a>
            </li>
            <li>
              <a href={`mailto:${COMPANY.email}`} className="flex items-center gap-3 break-all hover:text-white">
                <Icon name="mail" className="h-4 w-4 shrink-0 text-clay-300" />
                {COMPANY.email}
              </a>
            </li>
            <li className="flex gap-3">
              <Icon name="pin" className="mt-0.5 h-4 w-4 shrink-0 text-clay-300" />
              <span>
                {COMPANY.address.street}
                <br />
                {COMPANY.address.postalCode} {COMPANY.address.city}, {COMPANY.address.region}
              </span>
            </li>
            <li className="flex gap-3">
              <Icon name="clock" className="mt-0.5 h-4 w-4 shrink-0 text-clay-300" />
              <span>
                {contact.hours.slice(0, 2).map((h) => (
                  <span key={h.day} className="block">
                    {h.day}: {h.time}
                  </span>
                ))}
              </span>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container flex flex-col gap-3 py-6 text-xs text-sand-300/70 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {COMPANY.name}. {footer.rights}
          </p>
          <Link href={localePath(lang, "/legal")} className="hover:text-white">
            {footer.legal}
          </Link>
        </div>
      </div>
    </footer>
  );
}

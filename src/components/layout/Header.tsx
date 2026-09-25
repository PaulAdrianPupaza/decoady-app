"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { localePath, stripLocale, type Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n";
import { COMPANY } from "@/lib/site";
import { cn } from "@/lib/utils";
import Icon from "@/components/Icon";
import Logo from "@/components/Logo";
import { buttonClass } from "@/components/ButtonLink";
import LanguageSwitcher from "./LanguageSwitcher";

export default function Header({ lang, nav }: { lang: Locale; nav: Dictionary["nav"] }) {
  const pathname = usePathname();
  const basePath = stripLocale(pathname);
  const [open, setOpen] = useState(false);

  // Cierra el menú al navegar y bloquea el scroll mientras está abierto
  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const links = [
    { href: "/servicios", label: nav.services },
    { href: "/proyectos", label: nav.projects },
    { href: "/contacto", label: nav.contact },
  ];

  const isActive = (href: string) => basePath === href || basePath.startsWith(`${href}/`);

  return (
    <>
      <header className="sticky top-0 z-40 border-b border-ink-900/10 bg-sand-50/90 backdrop-blur-md">
        <div className="container flex h-20 items-center justify-between gap-6">
          <Link href={localePath(lang, "/")} aria-label={COMPANY.name}>
            <Logo />
          </Link>
  
          <nav className="hidden items-center gap-9 lg:flex" aria-label="Principal">
            {links.map((link) => (
              <Link
                key={link.href}
                href={localePath(lang, link.href)}
                className={cn(
                  "relative py-2 text-sm font-medium text-ink-600 transition-colors hover:text-ink-900",
                  isActive(link.href) && "text-ink-900 after:absolute after:inset-x-0 after:-bottom-px after:h-px after:bg-clay-500"
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>
  
          <div className="hidden items-center gap-5 lg:flex">
            <a href={COMPANY.phoneHref} className="flex items-center gap-2 text-sm font-medium text-ink-700 hover:text-ink-900">
              <Icon name="phone" className="h-4 w-4 text-clay-600" />
              {COMPANY.phone}
            </a>
            <LanguageSwitcher lang={lang} label={nav.language} />
            <Link href={localePath(lang, "/contacto")} className={buttonClass("dark", "px-5 py-3")}>
              {nav.quote}
            </Link>
          </div>
  
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="-mr-2 grid h-11 w-11 place-items-center rounded-sm text-ink-900 lg:hidden"
            aria-label={open ? nav.close : nav.menu}
            aria-expanded={open}
            aria-controls="mobile-menu"
          >
            <Icon name={open ? "close" : "menu"} className="h-6 w-6" />
          </button>
        </div>
      </header>

      {/* Menú móvil: fuera del <header>, porque su backdrop-blur haría que "fixed" fuese relativo al header */}
      <div
        id="mobile-menu"
        className={cn(
          "fixed inset-x-0 bottom-0 top-20 z-40 flex flex-col overflow-y-auto bg-sand-50 px-5 pb-8 pt-4 transition-opacity duration-200 lg:hidden",
          open ? "opacity-100" : "pointer-events-none opacity-0"
        )}
        hidden={!open}
      >
        <nav className="flex flex-col" aria-label="Móvil">
          <Link href={localePath(lang, "/")} className="border-b border-ink-900/10 py-4 font-serif text-2xl text-ink-900">
            {nav.home}
          </Link>
          {links.map((link) => (
            <Link
              key={link.href}
              href={localePath(lang, link.href)}
              className="border-b border-ink-900/10 py-4 font-serif text-2xl text-ink-900"
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="mt-8 flex flex-col gap-3">
          <Link href={localePath(lang, "/contacto")} className={buttonClass("primary", "w-full")}>
            {nav.quote}
          </Link>
          <a href={COMPANY.phoneHref} className={buttonClass("outline", "w-full")}>
            <Icon name="phone" className="h-4 w-4" />
            {COMPANY.phone}
          </a>
        </div>
        <div className="mt-auto pt-8">
          <LanguageSwitcher lang={lang} label={nav.language} variant="inline" />
        </div>
      </div>
    </>
  );
}

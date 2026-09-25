import { localePath, type Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n";
import { COMPANY } from "@/lib/site";
import ButtonLink, { buttonClass } from "./ButtonLink";
import Icon from "./Icon";

export default function CtaBand({ lang, cta, title, text }: { lang: Locale; cta: Dictionary["cta"]; title?: string; text?: string }) {
  return (
    <section className="bg-ink-900">
      <div className="container grid items-center gap-10 py-20 md:py-24 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <h2 className="text-3xl leading-tight text-sand-50 md:text-5xl">{title ?? cta.title}</h2>
          <p className="mt-5 max-w-xl text-lg text-sand-300">{text ?? cta.text}</p>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row lg:col-span-5 lg:justify-end">
          <ButtonLink href={localePath(lang, "/contacto")} variant="primary">
            {cta.primary}
            <Icon name="arrow" className="h-4 w-4" />
          </ButtonLink>
          <a href={COMPANY.whatsappHref} target="_blank" rel="noopener" className={buttonClass("outlineLight")}>
            <Icon name="whatsapp" className="h-4 w-4" />
            {cta.whatsapp}
          </a>
        </div>
      </div>
    </section>
  );
}

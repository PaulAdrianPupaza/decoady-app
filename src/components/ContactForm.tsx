"use client";

import Link from "next/link";
import { track } from "@vercel/analytics";
import { useState, type FormEvent } from "react";
import { localeNames, localePath, type Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n";
import { sendEmail } from "@/lib/emailjs";
import { COMPANY } from "@/lib/site";
import { buttonClass } from "./ButtonLink";
import Icon from "./Icon";

type Status = "idle" | "sending" | "success" | "error";

type ContactTexts = Dictionary["contact"];
type ProjectType = keyof ContactTexts["projectTypes"];
type Timeline = keyof ContactTexts["timelines"];

export default function ContactForm({
  lang,
  t,
  internal,
}: {
  lang: Locale;
  t: ContactTexts;
  /** Textos en español para el aviso interno, sea cual sea el idioma del visitante */
  internal: ContactTexts;
}) {
  const [status, setStatus] = useState<Status>("idle");

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    // Campo trampa para bots: los humanos no lo ven
    if (data.get("website")) return;

    setStatus("sending");
    const field = (name: string) => String(data.get(name) || "").trim();
    const name = field("name");
    const type = field("projectType") as ProjectType | "";
    const timeline = field("timeline") as Timeline | "";
    const reply = t.autoReply;

    // Los nombres de estos parámetros son las variables {{...}} de las plantillas de EmailJS (docs/emailjs)
    const ok = await sendEmail({
      // Aviso interno (en español)
      from_name: name,
      from_email: field("email"),
      phone: field("phone") || internal.autoReply.notProvided,
      project_type: type ? internal.projectTypes[type] : internal.autoReply.notProvided,
      timeline: timeline ? internal.timelines[timeline] : internal.autoReply.notProvided,
      message: field("message"),
      language: localeNames[lang],
      sent_at: new Intl.DateTimeFormat("es-ES", { dateStyle: "full", timeStyle: "short", timeZone: "Europe/Madrid" }).format(new Date()),
      // Respuesta automática al cliente (en su idioma)
      reply_subject: reply.subject,
      reply_greeting: `${reply.greeting} ${name.split(" ")[0]},`,
      reply_intro: reply.intro,
      reply_summary: reply.summary,
      reply_project_type: type ? t.projectTypes[type] : reply.notProvided,
      reply_timeline: timeline ? t.timelines[timeline] : reply.notProvided,
      reply_next: reply.next,
      reply_closing: reply.closing,
      reply_label_type: t.projectType,
      reply_label_timeline: t.timeline,
      reply_label_message: t.message,
      site_url: window.location.origin,
    });
    setStatus(ok ? "success" : "error");
    if (ok) {
      form.reset();
      track("lead_form", { type: type || "none" });
    }
  }

  if (status === "success") {
    return (
      <div className="rounded-sm border border-emerald-700/20 bg-emerald-50 p-8" role="status">
        <Icon name="check" className="h-8 w-8 text-emerald-700" />
        <p className="mt-4 text-lg font-medium text-emerald-900">{t.success}</p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="field-label">
            {t.name} <span className="text-clay-600">*</span>
          </label>
          <input id="name" name="name" required autoComplete="name" className="field" />
        </div>
        <div>
          <label htmlFor="phone" className="field-label">
            {t.phone}
          </label>
          <input id="phone" name="phone" type="tel" autoComplete="tel" className="field" />
        </div>
      </div>

      <div>
        <label htmlFor="email" className="field-label">
          {t.email} <span className="text-clay-600">*</span>
        </label>
        <input id="email" name="email" type="email" required autoComplete="email" className="field" />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="projectType" className="field-label">
            {t.projectType}
          </label>
          <select id="projectType" name="projectType" className="field" defaultValue="">
            <option value="">{t.select}</option>
            {Object.entries(t.projectTypes).map(([value, label]) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="timeline" className="field-label">
            {t.timeline}
          </label>
          <select id="timeline" name="timeline" className="field" defaultValue="">
            <option value="">{t.select}</option>
            {Object.entries(t.timelines).map(([value, label]) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label htmlFor="message" className="field-label">
          {t.message} <span className="text-clay-600">*</span>
        </label>
        <textarea id="message" name="message" required rows={5} placeholder={t.messagePlaceholder} className="field resize-y" />
      </div>

      <div className="hidden" aria-hidden="true">
        <label htmlFor="website">Website</label>
        <input id="website" name="website" tabIndex={-1} autoComplete="off" />
      </div>

      <label className="flex items-start gap-3 text-sm text-ink-600">
        <input type="checkbox" required className="mt-0.5 h-4 w-4 rounded-sm border-sand-400 accent-clay-500" />
        <span>
          {t.privacyPrefix}{" "}
          <Link href={localePath(lang, "/legal")} className="text-ink-900 underline underline-offset-2 hover:text-clay-600" target="_blank">
            {t.privacyLink}
          </Link>
          .
        </span>
      </label>

      {status === "error" && (
        <p className="rounded-sm border border-red-700/20 bg-red-50 p-4 text-sm text-red-800" role="alert">
          {t.error}{" "}
          <a href={`mailto:${COMPANY.email}`} className="font-medium underline">
            {COMPANY.email}
          </a>
        </p>
      )}

      <button type="submit" disabled={status === "sending"} className={buttonClass("primary", "w-full sm:w-auto")}>
        {status === "sending" ? t.sending : t.submit}
        {status !== "sending" && <Icon name="arrow" className="h-4 w-4" />}
      </button>
    </form>
  );
}

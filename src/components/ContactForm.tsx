"use client";

import Link from "next/link";
import { track } from "@vercel/analytics";
import { useState, type FormEvent } from "react";
import { localePath, type Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n";
import { sendEmail } from "@/lib/emailjs";
import { COMPANY } from "@/lib/site";
import { buttonClass } from "./ButtonLink";
import Icon from "./Icon";

type Status = "idle" | "sending" | "success" | "error";

export default function ContactForm({ lang, t }: { lang: Locale; t: Dictionary["contact"] }) {
  const [status, setStatus] = useState<Status>("idle");

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    // Campo trampa para bots: los humanos no lo ven
    if (data.get("website")) return;

    setStatus("sending");
    const type = String(data.get("projectType") || "");
    const timeline = String(data.get("timeline") || "");
    const ok = await sendEmail({
      // Mismos nombres que la plantilla de EmailJS existente
      from_name: String(data.get("name") || ""),
      from_email: String(data.get("email") || ""),
      phone: String(data.get("phone") || ""),
      subject: `Solicitud web: ${type ? t.projectTypes[type as keyof typeof t.projectTypes] : "Presupuesto"}`,
      message: String(data.get("message") || ""),
      project_type: type,
      timeline,
      language: lang,
      to_email: COMPANY.email,
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

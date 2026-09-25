"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { localeNames, localePath, locales, stripLocale, type Locale } from "@/i18n/config";
import { cn } from "@/lib/utils";
import Icon from "@/components/Icon";

export default function LanguageSwitcher({
  lang,
  label,
  variant = "dropdown",
}: {
  lang: Locale;
  label: string;
  variant?: "dropdown" | "inline";
}) {
  const basePath = stripLocale(usePathname());
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("mousedown", onClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  if (variant === "inline") {
    return (
      <div className="flex items-center gap-2" aria-label={label}>
        <Icon name="globe" className="h-4 w-4 text-ink-500" />
        {locales.map((l) => (
          <Link
            key={l}
            href={localePath(l, basePath)}
            hrefLang={l}
            className={cn(
              "rounded-sm px-3 py-2 text-sm font-medium",
              l === lang ? "bg-ink-900 text-sand-50" : "text-ink-600 hover:text-ink-900"
            )}
          >
            {localeNames[l]}
          </Link>
        ))}
      </div>
    );
  }

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-1.5 rounded-sm px-2 py-2 text-sm font-medium uppercase text-ink-700 hover:text-ink-900"
        aria-label={label}
        aria-expanded={open}
      >
        <Icon name="globe" className="h-4 w-4" />
        {lang}
        <Icon name="chevronDown" className={cn("h-3.5 w-3.5 transition-transform", open && "rotate-180")} />
      </button>
      {open && (
        <ul className="absolute right-0 top-full mt-2 w-40 overflow-hidden rounded-sm border border-ink-900/10 bg-white py-1 shadow-lg">
          {locales.map((l) => (
            <li key={l}>
              <Link
                href={localePath(l, basePath)}
                hrefLang={l}
                onClick={() => setOpen(false)}
                className={cn(
                  "flex items-center justify-between px-4 py-2.5 text-sm hover:bg-sand-100",
                  l === lang ? "font-semibold text-ink-900" : "text-ink-600"
                )}
              >
                {localeNames[l]}
                {l === lang && <Icon name="check" className="h-4 w-4 text-clay-600" />}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

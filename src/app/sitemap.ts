import type { MetadataRoute } from "next";
import { locales, localePath } from "@/i18n/config";
import { projects } from "@/data/projects";
import { services } from "@/data/services";
import { absoluteUrl } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages: { path: string; priority: number }[] = [
    { path: "/", priority: 1 },
    { path: "/servicios", priority: 0.9 },
    ...services.map((s) => ({ path: `/servicios/${s.slug}`, priority: 0.9 })),
    { path: "/proyectos", priority: 0.8 },
    ...projects.map((p) => ({ path: `/proyectos/${p.slug}`, priority: 0.7 })),
    { path: "/contacto", priority: 0.8 },
    { path: "/legal", priority: 0.2 },
  ];

  const lastModified = new Date();

  return pages.flatMap(({ path, priority }) =>
    locales.map((lang) => ({
      url: absoluteUrl(localePath(lang, path)),
      lastModified,
      priority: lang === "es" ? priority : Math.round(priority * 0.9 * 10) / 10,
      alternates: {
        languages: Object.fromEntries(locales.map((l) => [l, absoluteUrl(localePath(l, path))])),
      },
    }))
  );
}

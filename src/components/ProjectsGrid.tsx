"use client";

import { useState } from "react";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n";
import type { Project, ProjectCategory } from "@/data/projects";
import { cn } from "@/lib/utils";
import ProjectCard from "./ProjectCard";

export default function ProjectsGrid({ projects, lang, t }: { projects: Project[]; lang: Locale; t: Dictionary["projects"] }) {
  const [filter, setFilter] = useState<ProjectCategory | "all">("all");
  const categories = Array.from(new Set(projects.map((p) => p.category)));
  const visible = filter === "all" ? projects : projects.filter((p) => p.category === filter);

  const chip = (value: ProjectCategory | "all", label: string) => (
    <button
      key={value}
      type="button"
      onClick={() => setFilter(value)}
      aria-pressed={filter === value}
      className={cn(
        "rounded-full border px-4 py-2 text-sm font-medium transition-colors",
        filter === value ? "border-ink-900 bg-ink-900 text-sand-50" : "border-ink-900/15 text-ink-700 hover:border-ink-900/40"
      )}
    >
      {label}
    </button>
  );

  return (
    <>
      <div className="flex flex-wrap gap-2">
        {chip("all", t.all)}
        {categories.map((c) => chip(c, t.categories[c]))}
      </div>
      {visible.length === 0 ? (
        <p className="mt-12 text-ink-600">{t.empty}</p>
      ) : (
        <div className="mt-12 grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
          {visible.map((p, i) => (
            <ProjectCard key={p.slug} project={p} lang={lang} t={t} priority={i < 3} />
          ))}
        </div>
      )}
    </>
  );
}

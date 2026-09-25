import Image from "next/image";
import Link from "next/link";
import { localePath, type Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n";
import { projectCover, type Project } from "@/data/projects";
import Icon from "./Icon";

export default function ProjectCard({
  project,
  lang,
  t,
  priority = false,
}: {
  project: Project;
  lang: Locale;
  t: Dictionary["projects"];
  priority?: boolean;
}) {
  return (
    <Link href={localePath(lang, `/proyectos/${project.slug}`)} className="group block">
      <div className="relative aspect-[4/3] overflow-hidden rounded-sm bg-sand-200">
        <Image
          src={projectCover(project)}
          alt={project.title[lang]}
          fill
          priority={priority}
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
        />
        <span className="absolute bottom-3 right-3 inline-flex items-center gap-1.5 rounded-sm bg-ink-900/70 px-2.5 py-1 text-xs font-medium text-white backdrop-blur-sm">
          <Icon name="camera" className="h-3.5 w-3.5" />
          {project.photoCount}
        </span>
      </div>
      <div className="mt-5">
        <p className="eyebrow">{t.categories[project.category]}</p>
        <h3 className="mt-2 text-2xl leading-snug transition-colors group-hover:text-clay-600">{project.title[lang]}</h3>
        <p className="mt-2 line-clamp-2 text-ink-600">{project.summary[lang]}</p>
      </div>
    </Link>
  );
}

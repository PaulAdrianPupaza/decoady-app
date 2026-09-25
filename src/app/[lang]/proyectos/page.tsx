import type { Metadata } from "next";
import { getDictionary, localePath, type Locale } from "@/i18n";
import { projectCover, projects } from "@/data/projects";
import { pageMetadata } from "@/lib/seo";
import CtaBand from "@/components/CtaBand";
import PageIntro from "@/components/PageIntro";
import ProjectsGrid from "@/components/ProjectsGrid";

export async function generateMetadata({ params }: { params: Promise<{ lang: Locale }> }): Promise<Metadata> {
  const { lang } = await params;
  const t = getDictionary(lang).meta;
  return pageMetadata({
    lang,
    path: "/proyectos",
    title: t.projectsTitle,
    description: t.projectsDescription,
    image: projectCover(projects[0]),
  });
}

export default async function ProjectsPage({ params }: { params: Promise<{ lang: Locale }> }) {
  const { lang } = await params;
  const t = getDictionary(lang);

  return (
    <>
      <PageIntro
        breadcrumbs={[
          { name: t.common.home, path: localePath(lang, "/") },
          { name: t.nav.projects, path: localePath(lang, "/proyectos") },
        ]}
        eyebrow={t.projects.eyebrow}
        title={t.projects.title}
        text={t.projects.intro}
      />
      <section className="section">
        <div className="container">
          <ProjectsGrid projects={projects} lang={lang} t={t.projects} />
        </div>
      </section>
      <CtaBand lang={lang} cta={t.cta} />
    </>
  );
}

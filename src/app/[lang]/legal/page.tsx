import type { Metadata } from "next";
import { getDictionary, localePath, type Locale } from "@/i18n";
import { pageMetadata } from "@/lib/seo";
import PageIntro from "@/components/PageIntro";

export async function generateMetadata({ params }: { params: Promise<{ lang: Locale }> }): Promise<Metadata> {
  const { lang } = await params;
  const t = getDictionary(lang).meta;
  return pageMetadata({ lang, path: "/legal", title: t.legalTitle, description: t.legalDescription });
}

export default async function LegalPage({ params }: { params: Promise<{ lang: Locale }> }) {
  const { lang } = await params;
  const t = getDictionary(lang);

  return (
    <>
      <PageIntro
        breadcrumbs={[
          { name: t.common.home, path: localePath(lang, "/") },
          { name: t.legal.title, path: localePath(lang, "/legal") },
        ]}
        eyebrow={t.legal.updated}
        title={t.legal.title}
      />
      <section className="section">
        <div className="container max-w-3xl space-y-12">
          {t.legal.sections.map((s) => (
            <div key={s.heading}>
              <h2 className="text-2xl">{s.heading}</h2>
              <div className="prose-body mt-4 leading-relaxed text-ink-700">
                {s.body.map((p) => (
                  <p key={p}>{p}</p>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}

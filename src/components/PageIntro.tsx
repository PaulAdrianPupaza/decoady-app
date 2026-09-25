import Breadcrumbs from "./Breadcrumbs";

export default function PageIntro({
  breadcrumbs,
  eyebrow,
  title,
  text,
}: {
  breadcrumbs: { name: string; path: string }[];
  eyebrow: string;
  title: string;
  text?: string;
}) {
  return (
    <section className="border-b border-ink-900/10 bg-sand-100">
      <div className="container pb-16 pt-10 md:pb-20">
        <Breadcrumbs items={breadcrumbs} />
        <div className="mt-12 max-w-3xl md:mt-16">
          <p className="eyebrow mb-4">{eyebrow}</p>
          <h1 className="text-4xl leading-[1.05] md:text-6xl">{title}</h1>
          {text && <p className="mt-6 max-w-2xl text-lg leading-relaxed text-ink-600">{text}</p>}
        </div>
      </div>
    </section>
  );
}

import Icon from "./Icon";
import JsonLd from "./JsonLd";

/** Preguntas frecuentes desplegables + datos estructurados FAQPage para Google */
export default function FaqList({ faqs }: { faqs: { q: string; a: string }[] }) {
  return (
    <>
      <div className="divide-y divide-ink-900/10 border-y border-ink-900/10">
        {faqs.map((f) => (
          <details key={f.q} className="group py-6">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-6 text-lg font-medium text-ink-900 [&::-webkit-details-marker]:hidden">
              {f.q}
              <Icon name="chevronDown" className="h-5 w-5 shrink-0 text-ink-500 transition-transform group-open:rotate-180" />
            </summary>
            <p className="mt-4 leading-relaxed text-ink-600">{f.a}</p>
          </details>
        ))}
      </div>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: faqs.map((f) => ({
            "@type": "Question",
            name: f.q,
            acceptedAnswer: { "@type": "Answer", text: f.a },
          })),
        }}
      />
    </>
  );
}

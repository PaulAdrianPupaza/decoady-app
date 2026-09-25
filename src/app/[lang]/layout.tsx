import type { Metadata, Viewport } from "next";
import { Fraunces, Inter } from "next/font/google";
import { notFound } from "next/navigation";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { getDictionary, isLocale, locales } from "@/i18n";
import { COMPANY, SITE_URL } from "@/lib/site";
import { localBusinessJsonLd, pageMetadata } from "@/lib/seo";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import JsonLd from "@/components/JsonLd";
import WhatsAppFab from "@/components/WhatsAppFab";
import "../globals.css";

const sans = Inter({ subsets: ["latin"], variable: "--font-sans", display: "swap" });
const serif = Fraunces({ subsets: ["latin"], variable: "--font-serif", display: "swap", axes: ["opsz"] });


export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export const viewport: Viewport = {
  themeColor: "#fcfbf8",
};

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  const t = getDictionary(lang).meta;
  return {
    ...pageMetadata({ lang, path: "/", title: t.siteTitle, description: t.siteDescription }),
    metadataBase: new URL(SITE_URL),
    title: { default: t.siteTitle, template: `%s · ${COMPANY.name}` },
    applicationName: COMPANY.name,
    formatDetection: { telephone: false },
  };
}

export default async function LangLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const dict = getDictionary(lang);

  return (
    <html lang={lang} className={`${sans.variable} ${serif.variable}`}>
      <body className="flex min-h-screen flex-col font-sans">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:bg-ink-900 focus:px-4 focus:py-2 focus:text-white"
        >
          Skip to content
        </a>
        <Header lang={lang} nav={dict.nav} />
        <main id="main" className="flex-1">
          {children}
        </main>
        <Footer lang={lang} dict={dict} />
        <WhatsAppFab label={dict.common.whatsappFab} />
        <JsonLd data={localBusinessJsonLd(lang, dict.meta.siteDescription)} />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}

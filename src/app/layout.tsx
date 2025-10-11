import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { COMPANY_NAME, COMPANY_TAGLINE } from "@/constants";
import LanguageProvider from "@/components/providers/LanguageProvider";
import MetadataProvider from "@/components/providers/MetadataProvider";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: COMPANY_NAME,
    template: `%s | ${COMPANY_NAME}`,
  },
  description: COMPANY_TAGLINE + ". Construcción y reformas con más de 15 años de experiencia en Madrid. Proyectos residenciales, comerciales e industriales.",
  keywords: ["construcción", "reformas", "obra nueva", "rehabilitación", "Madrid", "constructora", "arquitectura"],
  authors: [{ name: COMPANY_NAME }],
  creator: COMPANY_NAME,
  publisher: COMPANY_NAME,
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    type: "website",
    locale: "es_ES",
    siteName: COMPANY_NAME,
    title: COMPANY_NAME,
    description: COMPANY_TAGLINE,
  },
  twitter: {
    card: "summary_large_image",
    title: COMPANY_NAME,
    description: COMPANY_TAGLINE,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} font-sans antialiased bg-white text-gray-900`}
      >
        <LanguageProvider>
          <MetadataProvider>
            <Header />
            <main>{children}</main>
            <Footer />
          </MetadataProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}

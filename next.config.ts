import type { NextConfig } from "next";

// Antiguas URLs de proyectos (IDs de Supabase) → nuevas URLs legibles.
// Mantienen el posicionamiento de las URLs que Google ya tenía indexadas.
const legacyProjectIds: Record<string, string> = {
  "9d604d0c-46b0-45d1-b84a-1f8f7148934f": "apartamento-reformado-ibiza",
  "6547f72a-e489-41eb-8de3-32872f183805": "piscina-y-piscina-de-agua-fria",
  "3b248894-3114-4be0-83a0-1be25a788ea7": "chalet-en-ibiza",
  "74571001-59b6-4b48-b5ee-4f7f689d5092": "la-esquina-puerto-de-ibiza",
};

const nextConfig: NextConfig = {
  poweredByHeader: false,
  images: {
    formats: ["image/avif", "image/webp"],
  },
  async redirects() {
    return [
      { source: "/es", destination: "/", permanent: true },
      { source: "/es/:path*", destination: "/:path*", permanent: true },
      ...Object.entries(legacyProjectIds).map(([id, slug]) => ({
        source: `/proyectos/${id}`,
        destination: `/proyectos/${slug}`,
        permanent: true,
      })),
    ];
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Frame-Options", value: "DENY" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
        ],
      },
    ];
  },
};

export default nextConfig;

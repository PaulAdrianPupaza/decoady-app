// Datos de la empresa. Todo lo que aparece en la web sale de aquí.

function resolveSiteUrl(): string {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL;
  if (explicit) return explicit.replace(/\/$/, "");
  // Vercel expone el dominio de producción automáticamente
  const vercel = process.env.VERCEL_PROJECT_PRODUCTION_URL;
  if (vercel) return `https://${vercel}`;
  return "http://localhost:3000";
}

export const SITE_URL = resolveSiteUrl();

export const COMPANY = {
  name: "Decoady Reformas",
  legalName: "Decoady Reformas",
  foundedYear: 2001,
  yearsOfExperience: 25,
  projectsCompleted: 400,
  phone: "+34 650 242 511",
  phoneHref: "tel:+34650242511",
  whatsappHref: "https://wa.me/34650242511",
  email: "decoadyreformas@gmail.com",
  address: {
    street: "Carrer des Figueral, 11",
    postalCode: "07800",
    city: "Eivissa",
    region: "Illes Balears",
    country: "ES",
  },
  geo: { lat: 38.9066, lng: 1.4366 },
  mapsHref: "https://www.google.com/maps/search/?api=1&query=Carrer+des+Figueral+11+07800+Eivissa",
  // Municipios donde se trabaja (SEO local)
  areaServed: ["Eivissa", "Sant Josep de sa Talaia", "Sant Antoni de Portmany", "Santa Eulària des Riu", "Sant Joan de Labritja"],
  hours: [
    { days: "Mo-Fr", opens: "08:00", closes: "18:00" },
    { days: "Sa", opens: "09:00", closes: "14:00" },
  ],
  // Añade aquí los perfiles cuando existan (Instagram, Google Business, Houzz...)
  sameAs: [] as string[],
} as const;

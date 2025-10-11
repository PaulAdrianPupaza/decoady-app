// Constantes de la aplicación

export const COMPANY_NAME = "DecoAdyReformas";
export const COMPANY_TAGLINE = "Construyendo tus sueños con calidad y confianza";

export const NAVIGATION_ITEMS = [
  { name: 'Inicio', href: '/' },
  { name: 'Servicios', href: '/servicios' },
  { name: 'Proyectos', href: '/proyectos' },
  { name: 'Nosotros', href: '/nosotros' },
  { name: 'Contacto', href: '/contacto' },
] as const;

export const CONTACT_INFO = {
  phone: '+34 650 242 511',
  email: 'decoadyreformas@gmail.com',
  address: 'Carrer des Figueral, 11, 07800 Eivissa, Illes Balears',
  businessHours: {
    'Lunes - Viernes': '8:00 - 18:00',
    'Sábado': '9:00 - 14:00',
    'Domingo': 'Cerrado',
  },
  coordinates: {
    lat: 38.9066,
    lng: 1.4366,
  },
} as const;

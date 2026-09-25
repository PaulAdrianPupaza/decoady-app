import type { Locale } from "@/i18n/config";

export type ProjectCategory = "residential" | "renovation" | "commercial" | "pool";

type Localized<T> = Record<Locale, T>;

export interface Project {
  slug: string;
  category: ProjectCategory;
  location?: string;
  /** Fechas en formato ISO (AAAA-MM) */
  startDate?: string;
  endDate?: string;
  /** Número de fotos en /public/images/proyectos/<slug>/NN.jpg */
  photoCount: number;
  /** Foto de portada (número de la foto) */
  cover: number;
  services: string[];
  title: Localized<string>;
  summary: Localized<string>;
  description: Localized<string[]>;
  features: Localized<string[]>;
}

export const projects: Project[] = [
  {
    slug: "chalet-en-ibiza",
    category: "residential",
    photoCount: 7,
    cover: 1,
    services: ["reformas-integrales", "reforma-de-cocinas"],
    title: { es: "Chalet en Ibiza", en: "Family home in Ibiza", ca: "Xalet a Eivissa" },
    summary: {
      es: "Reforma completa de una vivienda: espacios amplios, cálidos y elegantes.",
      en: "Complete renovation of a home: spacious, warm and elegant living spaces.",
      ca: "Reforma completa d'un habitatge: espais amplis, càlids i elegants.",
    },
    description: {
      es: [
        "Espacios amplios, cálidos y elegantes. Esta vivienda en Ibiza fue completamente reformada por nuestro equipo, creando un ambiente sereno y acogedor, con una mezcla de diseño moderno y detalles naturales.",
        "La iluminación tenue, los materiales nobles y la conexión fluida entre el interior y el exterior hacen de esta casa un verdadero refugio en la isla.",
      ],
      en: [
        "Spacious, warm and elegant. This home in Ibiza was completely renovated by our team, creating a calm and welcoming atmosphere that blends modern design with natural details.",
        "Soft lighting, noble materials and a seamless connection between inside and outside make this house a true retreat on the island.",
      ],
      ca: [
        "Espais amplis, càlids i elegants. Aquest habitatge a Eivissa va ser reformat completament pel nostre equip, creant un ambient serè i acollidor, amb una barreja de disseny modern i detalls naturals.",
        "La il·luminació tènue, els materials nobles i la connexió fluida entre l'interior i l'exterior fan d'aquesta casa un veritable refugi a l'illa.",
      ],
    },
    features: {
      es: ["Reforma integral", "Cocina a medida", "Iluminación indirecta", "Acceso y exteriores"],
      en: ["Full renovation", "Bespoke kitchen", "Indirect lighting", "Entrance and outdoor areas"],
      ca: ["Reforma integral", "Cuina a mida", "Il·luminació indirecta", "Accés i exteriors"],
    },
  },
  {
    slug: "piscina-y-piscina-de-agua-fria",
    category: "pool",
    photoCount: 7,
    cover: 1,
    services: ["piscinas"],
    title: {
      es: "Piscina y piscina de agua fría",
      en: "Pool and cold plunge pool",
      ca: "Piscina i piscina d'aigua freda",
    },
    summary: {
      es: "Una gran piscina exterior y una piscina de agua fría integrada en la tarima.",
      en: "A large outdoor pool and a cold plunge pool set into the timber deck.",
      ca: "Una gran piscina exterior i una piscina d'aigua freda integrada a la tarima.",
    },
    description: {
      es: [
        "Piscinas exteriores: una gran piscina elegante y una piscina de agua fría.",
        "La piscina de agua fría se integra en la tarima de madera, rodeada de muros de piedra y vegetación. En la galería puedes ver también el proceso de construcción.",
      ],
      en: [
        "Outdoor pools: a large, elegant swimming pool and a cold plunge pool.",
        "The plunge pool is set into the timber deck, surrounded by stone walls and planting. The gallery also shows the construction process.",
      ],
      ca: [
        "Piscines exteriors: una gran piscina elegant i una piscina d'aigua freda.",
        "La piscina d'aigua freda s'integra a la tarima de fusta, envoltada de murs de pedra i vegetació. A la galeria també pots veure el procés de construcció.",
      ],
    },
    features: {
      es: ["Piscina exterior", "Piscina de agua fría", "Tarima de madera", "Zona de descanso"],
      en: ["Outdoor pool", "Cold plunge pool", "Timber decking", "Lounge area"],
      ca: ["Piscina exterior", "Piscina d'aigua freda", "Tarima de fusta", "Zona de descans"],
    },
  },
  {
    slug: "apartamento-reformado-ibiza",
    category: "renovation",
    photoCount: 13,
    cover: 1,
    services: ["reformas-integrales", "reforma-de-banos", "reforma-de-cocinas"],
    title: {
      es: "Apartamento reformado en Ibiza",
      en: "Apartment renovation in Ibiza",
      ca: "Apartament reformat a Eivissa",
    },
    summary: {
      es: "Reforma integral de un apartamento: salón, cocina, baños y terrazas.",
      en: "Full renovation of an apartment: living room, kitchen, bathrooms and terraces.",
      ca: "Reforma integral d'un apartament: saló, cuina, banys i terrasses.",
    },
    description: {
      es: [
        "Apartamento reformado al completo en Ibiza.",
        "La reforma abarcó salón, dormitorio, cocina, baños revestidos en mármol y las terrazas exteriores con tarima de madera.",
      ],
      en: [
        "A complete apartment renovation in Ibiza.",
        "The work covered the living room, bedroom, kitchen, marble-clad bathrooms and the outdoor terraces with timber decking.",
      ],
      ca: [
        "Apartament reformat completament a Eivissa.",
        "La reforma va incloure saló, dormitori, cuina, banys revestits de marbre i les terrasses exteriors amb tarima de fusta.",
      ],
    },
    features: {
      es: ["Reforma integral", "Baños en mármol", "Cocina nueva", "Terrazas con tarima"],
      en: ["Full renovation", "Marble bathrooms", "New kitchen", "Decked terraces"],
      ca: ["Reforma integral", "Banys de marbre", "Cuina nova", "Terrasses amb tarima"],
    },
  },
  {
    slug: "la-esquina-puerto-de-ibiza",
    category: "commercial",
    location: "Carrer Bisbe Torres Mayans, 1, Eivissa",
    startDate: "2018-12",
    endDate: "2019-02",
    photoCount: 10,
    cover: 2,
    services: ["locales-comerciales"],
    title: {
      es: "La Esquina, puerto de Ibiza",
      en: "La Esquina, Ibiza harbour",
      ca: "La Esquina, port d'Eivissa",
    },
    summary: {
      es: "Diseño y reforma completa de un bar-restaurante en el puerto de Ibiza.",
      en: "Design and full renovation of a bar-restaurant in Ibiza harbour.",
      ca: "Disseny i reforma completa d'un bar-restaurant al port d'Eivissa.",
    },
    description: {
      es: [
        "Nos encargamos del diseño y la reforma completa de La Esquina en el puerto de Ibiza. Renovamos cada rincón, desde la fachada hasta el interior, creando un espacio moderno, fresco y con mucha personalidad.",
        "El resultado: un lugar único, pensado para disfrutar tanto de día como de noche, con el estilo auténtico de la isla.",
      ],
      en: [
        "We handled the design and full renovation of La Esquina in Ibiza harbour. We renewed every corner, from the façade to the interior, creating a modern, fresh space with plenty of personality.",
        "The result: a unique place to enjoy by day and by night, with the authentic style of the island.",
      ],
      ca: [
        "Ens vam encarregar del disseny i la reforma completa de La Esquina al port d'Eivissa. Vam renovar cada racó, des de la façana fins a l'interior, creant un espai modern, fresc i amb molta personalitat.",
        "El resultat: un lloc únic, pensat per gaudir tant de dia com de nit, amb l'estil autèntic de l'illa.",
      ],
    },
    features: {
      es: ["Diseño interior", "Reforma de fachada", "Barra y zona de servicio", "Hostelería"],
      en: ["Interior design", "Façade renovation", "Bar and service area", "Hospitality"],
      ca: ["Disseny interior", "Reforma de façana", "Barra i zona de servei", "Hostaleria"],
    },
  },
];

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export function projectPhoto(slug: string, n: number): string {
  return `/images/proyectos/${slug}/${String(n).padStart(2, "0")}.jpg`;
}

/** Fotos del proyecto con la portada en primer lugar */
export function projectPhotos(project: Project): string[] {
  const order = [project.cover, ...Array.from({ length: project.photoCount }, (_, i) => i + 1).filter((n) => n !== project.cover)];
  return order.map((n) => projectPhoto(project.slug, n));
}

export function projectCover(project: Project): string {
  return projectPhoto(project.slug, project.cover);
}

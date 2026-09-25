import type { Locale } from "@/i18n/config";

type Localized<T> = Record<Locale, T>;

export interface Service {
  slug: string;
  icon: "home" | "kitchen" | "bath" | "pool" | "store" | "tools";
  image: string;
  title: Localized<string>;
  short: Localized<string>;
  metaTitle: Localized<string>;
  metaDescription: Localized<string>;
  intro: Localized<string[]>;
  included: Localized<string[]>;
  faqs: Localized<{ q: string; a: string }[]>;
}

export const services: Service[] = [
  {
    slug: "reformas-integrales",
    icon: "home",
    image: "/images/proyectos/apartamento-reformado-ibiza/09.jpg",
    title: { es: "Reformas integrales", en: "Full renovations", ca: "Reformes integrals" },
    short: {
      es: "Renovación completa de viviendas, apartamentos y villas, llave en mano.",
      en: "Complete, turnkey renovation of homes, apartments and villas.",
      ca: "Renovació completa d'habitatges, apartaments i viles, clau en mà.",
    },
    metaTitle: {
      es: "Reformas integrales en Ibiza · Viviendas y villas",
      en: "Full home & villa renovations in Ibiza",
      ca: "Reformes integrals a Eivissa · Habitatges i viles",
    },
    metaDescription: {
      es: "Reformas integrales de pisos, casas y villas en Ibiza. Un solo equipo, presupuesto detallado por partidas y gestión de permisos. Pide presupuesto gratis.",
      en: "Full renovations of apartments, houses and villas in Ibiza. One team, itemised quote and permit management. Get a free quote.",
      ca: "Reformes integrals de pisos, cases i viles a Eivissa. Un sol equip, pressupost detallat per partides i gestió de permisos. Demana pressupost gratuït.",
    },
    intro: {
      es: [
        "Una reforma integral es la forma más eficaz de transformar una vivienda: redistribución de espacios, instalaciones nuevas, acabados de calidad y un resultado coherente de principio a fin.",
        "En Decoady Reformas coordinamos todos los oficios —albañilería, fontanería, electricidad, carpintería, pintura— con un único responsable de obra. Tú tienes un solo interlocutor y un presupuesto cerrado por partidas.",
      ],
      en: [
        "A full renovation is the most effective way to transform a property: new layouts, new installations, quality finishes and a consistent result from start to finish.",
        "At Decoady Reformas we coordinate every trade —masonry, plumbing, electrics, carpentry, painting— under one site manager. You have a single point of contact and a fixed, itemised quote.",
      ],
      ca: [
        "Una reforma integral és la manera més eficaç de transformar un habitatge: redistribució d'espais, instal·lacions noves, acabats de qualitat i un resultat coherent de principi a fi.",
        "A Decoady Reformas coordinam tots els oficis —paleta, lampisteria, electricitat, fusteria, pintura— amb un únic responsable d'obra. Tens un sol interlocutor i un pressupost tancat per partides.",
      ],
    },
    included: {
      es: ["Visita, medición y estudio previo", "Presupuesto detallado por partidas", "Gestión de permisos y licencias", "Albañilería, fontanería y electricidad", "Carpintería, pintura y acabados", "Limpieza final de obra"],
      en: ["Site visit, measurements and survey", "Itemised quote", "Permit and licence management", "Masonry, plumbing and electrics", "Carpentry, painting and finishes", "Final clean-up"],
      ca: ["Visita, mesurament i estudi previ", "Pressupost detallat per partides", "Gestió de permisos i llicències", "Paleta, lampisteria i electricitat", "Fusteria, pintura i acabats", "Neteja final d'obra"],
    },
    faqs: {
      es: [
        { q: "¿Cuánto dura una reforma integral?", a: "Depende del tamaño y del alcance. Tras la visita te damos un calendario de obra realista junto con el presupuesto." },
        { q: "¿Necesito licencia de obra?", a: "Depende de los trabajos. Las obras menores suelen requerir una comunicación previa al ayuntamiento y las mayores, licencia. Te asesoramos y nos encargamos de la documentación." },
        { q: "¿El presupuesto es gratuito?", a: "Sí. La visita y el presupuesto son gratuitos y sin compromiso." },
      ],
      en: [
        { q: "How long does a full renovation take?", a: "It depends on the size and scope. After the visit we give you a realistic schedule together with the quote." },
        { q: "Do I need a building permit?", a: "It depends on the work. Minor works usually need a prior notice to the town hall, while major works need a licence. We advise you and handle the paperwork." },
        { q: "Is the quote free?", a: "Yes. The visit and the quote are free and without obligation." },
      ],
      ca: [
        { q: "Quant dura una reforma integral?", a: "Depèn de la mida i de l'abast. Després de la visita et donam un calendari d'obra realista juntament amb el pressupost." },
        { q: "Necessit llicència d'obra?", a: "Depèn dels treballs. Les obres menors solen requerir una comunicació prèvia a l'ajuntament i les majors, llicència. T'assessoram i ens encarregam de la documentació." },
        { q: "El pressupost és gratuït?", a: "Sí. La visita i el pressupost són gratuïts i sense compromís." },
      ],
    },
  },
  {
    slug: "reforma-de-cocinas",
    icon: "kitchen",
    image: "/images/proyectos/chalet-en-ibiza/04.jpg",
    title: { es: "Reforma de cocinas", en: "Kitchen renovation", ca: "Reforma de cuines" },
    short: {
      es: "Cocinas funcionales y a medida, con instalaciones nuevas y acabados duraderos.",
      en: "Functional, bespoke kitchens with new installations and durable finishes.",
      ca: "Cuines funcionals i a mida, amb instal·lacions noves i acabats duradors.",
    },
    metaTitle: {
      es: "Reforma de cocinas en Ibiza · Cocinas a medida",
      en: "Kitchen renovation in Ibiza · Bespoke kitchens",
      ca: "Reforma de cuines a Eivissa · Cuines a mida",
    },
    metaDescription: {
      es: "Reformamos tu cocina en Ibiza: distribución, fontanería, electricidad, muebles y encimeras. Presupuesto gratuito y sin compromiso.",
      en: "We renovate your kitchen in Ibiza: layout, plumbing, electrics, units and worktops. Free, no-obligation quote.",
      ca: "Reformam la teva cuina a Eivissa: distribució, lampisteria, electricitat, mobles i taulells. Pressupost gratuït i sense compromís.",
    },
    intro: {
      es: [
        "La cocina es el espacio que más se usa de la casa. Una buena reforma mejora la distribución, el almacenaje y la iluminación, y renueva unas instalaciones que suelen ser las más castigadas.",
        "Nos encargamos de todo: desmontaje, instalaciones de agua y electricidad, revestimientos, montaje de mobiliario y encimeras, e iluminación.",
      ],
      en: [
        "The kitchen is the most used room in the house. A good renovation improves layout, storage and lighting, and renews installations that usually take the most wear.",
        "We take care of everything: strip-out, water and electrical installations, wall and floor finishes, fitting units and worktops, and lighting.",
      ],
      ca: [
        "La cuina és l'espai més utilitzat de la casa. Una bona reforma millora la distribució, l'emmagatzematge i la il·luminació, i renova unes instal·lacions que solen ser les més castigades.",
        "Ens encarregam de tot: desmuntatge, instal·lacions d'aigua i electricitat, revestiments, muntatge de mobiliari i taulells, i il·luminació.",
      ],
    },
    included: {
      es: ["Diseño y distribución", "Fontanería y desagües", "Instalación eléctrica y puntos de luz", "Suelos y revestimientos", "Muebles, encimeras y electrodomésticos", "Iluminación indirecta"],
      en: ["Design and layout", "Plumbing and drainage", "Electrical installation and lighting points", "Floors and wall finishes", "Units, worktops and appliances", "Indirect lighting"],
      ca: ["Disseny i distribució", "Lampisteria i desguassos", "Instal·lació elèctrica i punts de llum", "Terres i revestiments", "Mobles, taulells i electrodomèstics", "Il·luminació indirecta"],
    },
    faqs: {
      es: [
        { q: "¿Puedo seguir viviendo en casa durante la obra?", a: "En la mayoría de casos sí. Organizamos la obra para reducir al mínimo las molestias y los días sin cocina." },
        { q: "¿Os encargáis también de los muebles?", a: "Sí, podemos suministrar e instalar muebles, encimeras y electrodomésticos, o montar los que tú elijas." },
      ],
      en: [
        { q: "Can I stay at home during the works?", a: "In most cases, yes. We plan the job to keep disruption and days without a kitchen to a minimum." },
        { q: "Do you also supply the units?", a: "Yes, we can supply and fit units, worktops and appliances, or install the ones you choose." },
      ],
      ca: [
        { q: "Puc seguir vivint a casa durant l'obra?", a: "En la majoria de casos sí. Organitzam l'obra per reduir al mínim les molèsties i els dies sense cuina." },
        { q: "Us encarregau també dels mobles?", a: "Sí, podem subministrar i instal·lar mobles, taulells i electrodomèstics, o muntar els que triïs." },
      ],
    },
  },
  {
    slug: "reforma-de-banos",
    icon: "bath",
    image: "/images/proyectos/apartamento-reformado-ibiza/05.jpg",
    title: { es: "Reforma de baños", en: "Bathroom renovation", ca: "Reforma de banys" },
    short: {
      es: "Baños nuevos: platos de ducha, revestimientos, sanitarios e impermeabilización.",
      en: "New bathrooms: showers, tiling, sanitaryware and waterproofing.",
      ca: "Banys nous: plats de dutxa, revestiments, sanitaris i impermeabilització.",
    },
    metaTitle: {
      es: "Reforma de baños en Ibiza · Cambio de bañera por ducha",
      en: "Bathroom renovation in Ibiza · Walk-in showers",
      ca: "Reforma de banys a Eivissa · Canvi de banyera per dutxa",
    },
    metaDescription: {
      es: "Reforma de baños en Ibiza: cambio de bañera por plato de ducha, revestimientos, sanitarios y fontanería. Presupuesto gratis.",
      en: "Bathroom renovation in Ibiza: bath-to-shower conversions, tiling, sanitaryware and plumbing. Free quote.",
      ca: "Reforma de banys a Eivissa: canvi de banyera per plat de dutxa, revestiments, sanitaris i lampisteria. Pressupost gratuït.",
    },
    intro: {
      es: [
        "Reformar el baño es una de las mejoras que más se notan en el día a día. Renovamos instalaciones, impermeabilizamos correctamente y colocamos revestimientos y sanitarios de calidad.",
        "Desde el cambio de bañera por plato de ducha hasta baños completos en mármol o microcemento, cuidamos los remates para que el resultado dure.",
      ],
      en: [
        "A bathroom renovation is one of the improvements you notice most day to day. We renew installations, waterproof properly and fit quality tiling and sanitaryware.",
        "From replacing a bath with a walk-in shower to complete marble or microcement bathrooms, we take care over the finishing so the result lasts.",
      ],
      ca: [
        "Reformar el bany és una de les millores que més es noten en el dia a dia. Renovam instal·lacions, impermeabilitzam correctament i col·locam revestiments i sanitaris de qualitat.",
        "Des del canvi de banyera per plat de dutxa fins a banys complets de marbre o microciment, cuidam els acabats perquè el resultat duri.",
      ],
    },
    included: {
      es: ["Desmontaje y retirada de escombros", "Fontanería y desagües nuevos", "Impermeabilización", "Alicatado, suelos o microcemento", "Sanitarios, grifería y mamparas", "Iluminación y ventilación"],
      en: ["Strip-out and waste removal", "New plumbing and drainage", "Waterproofing", "Tiling, flooring or microcement", "Sanitaryware, taps and screens", "Lighting and ventilation"],
      ca: ["Desmuntatge i retirada de runa", "Lampisteria i desguassos nous", "Impermeabilització", "Enrajolat, terres o microciment", "Sanitaris, aixeteria i mampares", "Il·luminació i ventilació"],
    },
    faqs: {
      es: [
        { q: "¿Podéis cambiar la bañera por un plato de ducha?", a: "Sí, es uno de los trabajos más habituales. Revisamos los desagües y dejamos el plato a ras de suelo cuando es posible." },
        { q: "¿Cuánto tiempo estaré sin baño?", a: "Depende del alcance de la reforma. Te lo indicamos en el presupuesto para que puedas organizarte." },
      ],
      en: [
        { q: "Can you replace a bath with a shower?", a: "Yes, it is one of our most common jobs. We check the drainage and fit the shower tray flush with the floor where possible." },
        { q: "How long will I be without a bathroom?", a: "It depends on the scope of the work. We tell you in the quote so you can plan ahead." },
      ],
      ca: [
        { q: "Podeu canviar la banyera per un plat de dutxa?", a: "Sí, és un dels treballs més habituals. Revisam els desguassos i deixam el plat a ras de terra quan és possible." },
        { q: "Quant de temps estaré sense bany?", a: "Depèn de l'abast de la reforma. T'ho indicam al pressupost perquè et puguis organitzar." },
      ],
    },
  },
  {
    slug: "piscinas",
    icon: "pool",
    image: "/images/proyectos/piscina-y-piscina-de-agua-fria/07.jpg",
    title: { es: "Piscinas y exteriores", en: "Pools & outdoor areas", ca: "Piscines i exteriors" },
    short: {
      es: "Construcción y reforma de piscinas, tarimas, terrazas y muros de piedra.",
      en: "Building and renovating pools, decking, terraces and stone walls.",
      ca: "Construcció i reforma de piscines, tarimes, terrasses i murs de pedra.",
    },
    metaTitle: {
      es: "Construcción y reforma de piscinas en Ibiza",
      en: "Pool construction & renovation in Ibiza",
      ca: "Construcció i reforma de piscines a Eivissa",
    },
    metaDescription: {
      es: "Construimos y reformamos piscinas en Ibiza: piscinas nuevas, piscinas de agua fría, tarimas de madera, terrazas y muros de piedra. Presupuesto gratis.",
      en: "We build and renovate pools in Ibiza: new pools, cold plunge pools, timber decking, terraces and stone walls. Free quote.",
      ca: "Construïm i reformam piscines a Eivissa: piscines noves, piscines d'aigua freda, tarimes de fusta, terrasses i murs de pedra. Pressupost gratuït.",
    },
    intro: {
      es: [
        "En Ibiza el exterior es parte de la casa. Construimos piscinas nuevas, reformamos piscinas existentes y creamos zonas exteriores pensadas para disfrutar del clima de la isla.",
        "Trabajamos la piscina junto con su entorno: tarimas de madera, pavimentos, muros de piedra, zonas de descanso e iluminación exterior.",
      ],
      en: [
        "In Ibiza, the outdoors is part of the home. We build new pools, renovate existing ones and create outdoor spaces designed to enjoy the island's climate.",
        "We design the pool together with its surroundings: timber decking, paving, stone walls, lounge areas and outdoor lighting.",
      ],
      ca: [
        "A Eivissa l'exterior és part de la casa. Construïm piscines noves, reformam piscines existents i cream zones exteriors pensades per gaudir del clima de l'illa.",
        "Treballam la piscina juntament amb el seu entorn: tarimes de fusta, paviments, murs de pedra, zones de descans i il·luminació exterior.",
      ],
    },
    included: {
      es: ["Piscinas de obra nuevas", "Piscinas de agua fría", "Reforma y revestimiento de piscinas", "Tarimas y pavimentos exteriores", "Muros de piedra", "Iluminación exterior"],
      en: ["New concrete pools", "Cold plunge pools", "Pool renovation and resurfacing", "Decking and outdoor paving", "Stone walls", "Outdoor lighting"],
      ca: ["Piscines d'obra noves", "Piscines d'aigua freda", "Reforma i revestiment de piscines", "Tarimes i paviments exteriors", "Murs de pedra", "Il·luminació exterior"],
    },
    faqs: {
      es: [
        { q: "¿Cuál es el mejor momento para hacer una piscina?", a: "Lo ideal es empezar en otoño o invierno para tenerla lista antes del verano. Te recomendamos pedir presupuesto con antelación." },
        { q: "¿Reformáis piscinas antiguas?", a: "Sí: revestimientos, bordes, pavimento perimetral e instalaciones." },
      ],
      en: [
        { q: "When is the best time to build a pool?", a: "Ideally start in autumn or winter so it is ready before summer. We recommend requesting a quote well in advance." },
        { q: "Do you renovate old pools?", a: "Yes: finishes, copings, surrounding paving and equipment." },
      ],
      ca: [
        { q: "Quin és el millor moment per fer una piscina?", a: "L'ideal és començar a la tardor o l'hivern per tenir-la llesta abans de l'estiu. Et recomanam demanar pressupost amb antelació." },
        { q: "Reformau piscines antigues?", a: "Sí: revestiments, vores, paviment perimetral i instal·lacions." },
      ],
    },
  },
  {
    slug: "locales-comerciales",
    icon: "store",
    image: "/images/proyectos/la-esquina-puerto-de-ibiza/07.jpg",
    title: { es: "Locales y hostelería", en: "Commercial & hospitality", ca: "Locals i hostaleria" },
    short: {
      es: "Reforma de bares, restaurantes, tiendas y oficinas con plazos ajustados.",
      en: "Renovation of bars, restaurants, shops and offices on tight schedules.",
      ca: "Reforma de bars, restaurants, botigues i oficines amb terminis ajustats.",
    },
    metaTitle: {
      es: "Reforma de locales, bares y restaurantes en Ibiza",
      en: "Bar, restaurant & shop fit-outs in Ibiza",
      ca: "Reforma de locals, bars i restaurants a Eivissa",
    },
    metaDescription: {
      es: "Reformamos locales comerciales, bares y restaurantes en Ibiza. Obra rápida y organizada para abrir a tiempo para la temporada. Presupuesto gratis.",
      en: "We renovate commercial premises, bars and restaurants in Ibiza. Fast, well-organised works so you open in time for the season. Free quote.",
      ca: "Reformam locals comercials, bars i restaurants a Eivissa. Obra ràpida i organitzada per obrir a temps per a la temporada. Pressupost gratuït.",
    },
    intro: {
      es: [
        "En un local comercial cada día de obra cuenta. Planificamos los trabajos para cumplir plazos y que puedas abrir a tiempo para la temporada.",
        "Hemos reformado bares y restaurantes en Ibiza de principio a fin: fachada, interiorismo, barra, zona de servicio, iluminación e instalaciones.",
      ],
      en: [
        "In commercial premises every day of work counts. We plan the job to meet deadlines so you can open in time for the season.",
        "We have renovated bars and restaurants in Ibiza from start to finish: façade, interior design, bar counter, service area, lighting and installations.",
      ],
      ca: [
        "En un local comercial cada dia d'obra compta. Planificam els treballs per complir terminis i que puguis obrir a temps per a la temporada.",
        "Hem reformat bars i restaurants a Eivissa de principi a fi: façana, interiorisme, barra, zona de servei, il·luminació i instal·lacions.",
      ],
    },
    included: {
      es: ["Diseño e interiorismo", "Reforma de fachadas", "Barras y zonas de servicio", "Instalaciones eléctricas y de fontanería", "Iluminación decorativa", "Planificación por plazos"],
      en: ["Design and interiors", "Façade renovation", "Bar counters and service areas", "Electrical and plumbing installations", "Decorative lighting", "Deadline-driven planning"],
      ca: ["Disseny i interiorisme", "Reforma de façanes", "Barres i zones de servei", "Instal·lacions elèctriques i de lampisteria", "Il·luminació decorativa", "Planificació per terminis"],
    },
    faqs: {
      es: [
        { q: "¿Podéis trabajar fuera de temporada?", a: "Sí, y es lo más recomendable: planificamos la obra en invierno para que el local esté listo antes de abrir." },
        { q: "¿Os encargáis del diseño?", a: "Sí, podemos encargarnos del diseño y la ejecución, o trabajar sobre el proyecto de tu arquitecto o interiorista." },
      ],
      en: [
        { q: "Can you work off-season?", a: "Yes, and it is what we recommend: we plan the works in winter so the premises are ready before opening." },
        { q: "Do you handle the design?", a: "Yes, we can handle both design and build, or work from your architect's or interior designer's plans." },
      ],
      ca: [
        { q: "Podeu treballar fora de temporada?", a: "Sí, i és el més recomanable: planificam l'obra a l'hivern perquè el local estigui llest abans d'obrir." },
        { q: "Us encarregau del disseny?", a: "Sí, ens podem encarregar del disseny i l'execució, o treballar sobre el projecte del teu arquitecte o interiorista." },
      ],
    },
  },
  {
    slug: "reparaciones-y-mantenimiento",
    icon: "tools",
    image: "/images/proyectos/apartamento-reformado-ibiza/12.jpg",
    title: { es: "Reparaciones y mantenimiento", en: "Repairs & maintenance", ca: "Reparacions i manteniment" },
    short: {
      es: "Reparaciones rápidas y mantenimiento de viviendas, villas y apartamentos turísticos.",
      en: "Prompt repairs and maintenance for homes, villas and holiday rentals.",
      ca: "Reparacions ràpides i manteniment d'habitatges, viles i apartaments turístics.",
    },
    metaTitle: {
      es: "Reparaciones y mantenimiento de villas en Ibiza",
      en: "Villa repairs & maintenance in Ibiza",
      ca: "Reparacions i manteniment de viles a Eivissa",
    },
    metaDescription: {
      es: "Reparaciones y mantenimiento de casas, villas y alquileres vacacionales en Ibiza: humedades, pintura, fontanería, electricidad y puesta a punto antes de temporada.",
      en: "Repairs and maintenance for houses, villas and holiday rentals in Ibiza: damp, painting, plumbing, electrics and pre-season checks.",
      ca: "Reparacions i manteniment de cases, viles i lloguers vacacionals a Eivissa: humitats, pintura, lampisteria, electricitat i posada a punt abans de temporada.",
    },
    intro: {
      es: [
        "No todo son grandes obras. Nos ocupamos también de reparaciones y trabajos de mantenimiento para que tu casa o tu alquiler vacacional esté siempre en perfecto estado.",
        "Si vives fuera de la isla, podemos encargarnos de la puesta a punto de la vivienda antes de tu llegada o del inicio de la temporada, y mantenerte informado con fotos.",
      ],
      en: [
        "It is not all big projects. We also carry out repairs and maintenance so your home or holiday rental is always in perfect condition.",
        "If you live abroad, we can get the property ready before you arrive or before the season starts, and keep you updated with photos.",
      ],
      ca: [
        "No tot són grans obres. També ens ocupam de reparacions i treballs de manteniment perquè la teva casa o el teu lloguer vacacional estigui sempre en perfecte estat.",
        "Si vius fora de l'illa, ens podem encarregar de la posada a punt de l'habitatge abans de la teva arribada o de l'inici de la temporada, i mantenir-te informat amb fotos.",
      ],
    },
    included: {
      es: ["Humedades y filtraciones", "Pintura interior y exterior", "Pequeñas reparaciones de fontanería", "Reparaciones eléctricas", "Carpintería y cerramientos", "Puesta a punto antes de temporada"],
      en: ["Damp and leaks", "Interior and exterior painting", "Minor plumbing repairs", "Electrical repairs", "Carpentry, doors and windows", "Pre-season property checks"],
      ca: ["Humitats i filtracions", "Pintura interior i exterior", "Petites reparacions de lampisteria", "Reparacions elèctriques", "Fusteria i tancaments", "Posada a punt abans de temporada"],
    },
    faqs: {
      es: [
        { q: "¿Hacéis trabajos pequeños?", a: "Sí. Cuéntanos lo que necesitas, mejor con fotos por WhatsApp, y te decimos cómo podemos ayudarte." },
        { q: "No vivo en Ibiza, ¿podéis gestionarlo?", a: "Sí. Coordinamos el acceso a la vivienda y te enviamos fotos del trabajo terminado." },
      ],
      en: [
        { q: "Do you take on small jobs?", a: "Yes. Tell us what you need, ideally with photos on WhatsApp, and we will tell you how we can help." },
        { q: "I don't live in Ibiza, can you manage it?", a: "Yes. We coordinate access to the property and send you photos of the finished work." },
      ],
      ca: [
        { q: "Feis treballs petits?", a: "Sí. Explica'ns el que necessites, millor amb fotos per WhatsApp, i et direm com et podem ajudar." },
        { q: "No visc a Eivissa, ho podeu gestionar?", a: "Sí. Coordinam l'accés a l'habitatge i t'enviam fotos del treball acabat." },
      ],
    },
  },
];

export function getService(slug: string): Service | undefined {
  return services.find((s) => s.slug === slug);
}

import type { Locale } from "@/i18n/config";

// Contenido largo de cada página de servicio (apartados y preguntas frecuentes adicionales).
// Está separado de services.ts para que ese archivo siga siendo fácil de leer.

type Localized<T> = Record<Locale, T>;
type Section = { heading: string; paragraphs: string[] };
type Faq = { q: string; a: string };

export interface ServiceContent {
  sections: Localized<Section[]>;
  faqs: Localized<Faq[]>;
}

export const serviceContent: Record<string, ServiceContent> = {
  "reformas-integrales": {
    sections: {
      es: [
        {
          heading: "Reformas de pisos y apartamentos en Ibiza",
          paragraphs: [
            "Buena parte de los pisos de Ibiza tienen instalaciones de hace décadas: tuberías antiguas, cuadros eléctricos que ya no cumplen la normativa y distribuciones pensadas para otra forma de vivir. En una reforma integral de piso renovamos todo eso de una vez y aprovechamos para ganar luz y espacio.",
            "En edificios con comunidad de vecinos coordinamos los horarios, la protección de zonas comunes y la retirada de escombros. Si el piso está en el centro o en Dalt Vila, planificamos los accesos y la descarga de material para que la obra moleste lo mínimo.",
          ],
        },
        {
          heading: "Reformas de casas y villas",
          paragraphs: [
            "En las casas de campo y villas de la isla una reforma integral suele ir más allá del interior: cubiertas, fachadas, carpinterías exteriores, terrazas, piscina y jardín. Trabajamos con materiales pensados para el clima de Ibiza, con mucha humedad y sol intenso, y respetamos el carácter de la construcción tradicional cuando la casa lo tiene.",
            "Muchos propietarios no viven en la isla todo el año. En esos casos te mantenemos al día con fotos y vídeos de cada fase y coordinamos con quien gestione la vivienda.",
          ],
        },
        {
          heading: "Cómo es una reforma integral con nosotros",
          paragraphs: [
            "Primero visitamos la vivienda, tomamos medidas y hablamos de lo que necesitas. Después te entregamos un presupuesto por partidas, en el que ves qué cuesta cada trabajo, y un calendario realista. Durante la obra un responsable coordina a todos los oficios y es tu único interlocutor. Al terminar, entregamos la vivienda limpia y lista para entrar a vivir.",
          ],
        },
      ],
      en: [
        {
          heading: "Apartment renovations in Ibiza",
          paragraphs: [
            "Many apartments in Ibiza still have decades-old installations: old pipework, electrical panels that no longer meet regulations and layouts designed for another way of living. A full renovation replaces all of it at once, and is the perfect moment to gain light and space.",
            "In buildings with a residents' association we coordinate working hours, protect communal areas and handle waste removal. If the apartment is in the town centre or Dalt Vila, we plan access and deliveries to keep disruption to a minimum.",
          ],
        },
        {
          heading: "House and villa renovations",
          paragraphs: [
            "In the island's country houses and villas, a full renovation often goes beyond the interior: roofs, façades, external joinery, terraces, pool and garden. We use materials suited to Ibiza's climate, with high humidity and strong sun, and respect the character of traditional buildings where the house has it.",
            "Many owners don't live on the island all year. In that case we keep you updated with photos and videos of every stage and coordinate with whoever manages the property.",
          ],
        },
        {
          heading: "What a full renovation with us looks like",
          paragraphs: [
            "First we visit the property, take measurements and talk about what you need. Then you get an itemised quote showing the cost of each job, plus a realistic schedule. During the works one site manager coordinates every trade and is your single point of contact. At the end we hand over the property clean and ready to move in.",
          ],
        },
      ],
      ca: [
        {
          heading: "Reformes de pisos i apartaments a Eivissa",
          paragraphs: [
            "Bona part dels pisos d'Eivissa tenen instal·lacions de fa dècades: canonades antigues, quadres elèctrics que ja no compleixen la normativa i distribucions pensades per a una altra manera de viure. En una reforma integral de pis ho renovam tot d'una vegada i aprofitam per guanyar llum i espai.",
            "En edificis amb comunitat de veïns coordinam els horaris, la protecció de les zones comunes i la retirada de runa. Si el pis és al centre o a Dalt Vila, planificam els accessos i la descàrrega de material perquè l'obra molesti el mínim.",
          ],
        },
        {
          heading: "Reformes de cases i viles",
          paragraphs: [
            "A les cases de camp i viles de l'illa una reforma integral sol anar més enllà de l'interior: cobertes, façanes, fusteria exterior, terrasses, piscina i jardí. Treballam amb materials pensats per al clima d'Eivissa, amb molta humitat i sol intens, i respectam el caràcter de la construcció tradicional quan la casa el té.",
            "Molts propietaris no viuen a l'illa tot l'any. En aquests casos et mantenim al dia amb fotos i vídeos de cada fase i coordinam amb qui gestioni l'habitatge.",
          ],
        },
        {
          heading: "Com és una reforma integral amb nosaltres",
          paragraphs: [
            "Primer visitam l'habitatge, prenem mides i parlam del que necessites. Després t'entregam un pressupost per partides, on veus què costa cada treball, i un calendari realista. Durant l'obra un responsable coordina tots els oficis i és el teu únic interlocutor. En acabar, lliuram l'habitatge net i a punt per entrar-hi a viure.",
          ],
        },
      ],
    },
    faqs: {
      es: [
        { q: "¿Cuánto cuesta reformar un piso en Ibiza?", a: "Depende de los metros, del estado de las instalaciones y de los acabados. Tras la visita te damos un presupuesto por partidas, para que sepas exactamente qué pagas y puedas ajustar lo que quieras." },
        { q: "¿Puedo reformar el piso por fases?", a: "Sí. Si no puedes o no quieres hacerlo todo a la vez, planificamos la reforma por fases (por ejemplo, primero cocina y baño) para que cada parte quede bien terminada." },
      ],
      en: [
        { q: "How much does it cost to renovate an apartment in Ibiza?", a: "It depends on the size, the condition of the installations and the finishes. After the visit we give you an itemised quote so you know exactly what you're paying for and can adjust anything you like." },
        { q: "Can I renovate in stages?", a: "Yes. If you can't or don't want to do everything at once, we plan the renovation in stages (for example kitchen and bathroom first) so each part is properly finished." },
      ],
      ca: [
        { q: "Quant costa reformar un pis a Eivissa?", a: "Depèn dels metres, de l'estat de les instal·lacions i dels acabats. Després de la visita et donam un pressupost per partides, perquè sàpigues exactament què pagues i puguis ajustar el que vulguis." },
        { q: "Puc reformar el pis per fases?", a: "Sí. Si no pots o no vols fer-ho tot alhora, planificam la reforma per fases (per exemple, primer cuina i bany) perquè cada part quedi ben acabada." },
      ],
    },
  },

  "reforma-de-cocinas": {
    sections: {
      es: [
        {
          heading: "Una cocina pensada para cómo vives",
          paragraphs: [
            "Antes de elegir muebles estudiamos cómo usas la cocina: cuántas personas cocinan, qué necesitas tener a mano y si quieres abrirla al salón. A partir de ahí proponemos la distribución, los puntos de agua, luz y extracción y el almacenaje.",
            "En las viviendas de alquiler vacacional priorizamos materiales resistentes y fáciles de limpiar, que aguanten el uso intensivo de la temporada.",
          ],
        },
        {
          heading: "Instalaciones nuevas, no solo muebles",
          paragraphs: [
            "Una reforma de cocina bien hecha renueva también lo que no se ve: tuberías, desagües, circuitos eléctricos independientes para los electrodomésticos y una buena salida de humos. Así evitas averías y sustos dentro de pocos años.",
          ],
        },
      ],
      en: [
        {
          heading: "A kitchen designed around how you live",
          paragraphs: [
            "Before choosing units we look at how you use the kitchen: how many people cook, what you need close at hand and whether you want it open to the living room. From there we propose the layout, water, power and extraction points, and storage.",
            "For holiday rentals we prioritise tough, easy-to-clean materials that stand up to heavy use during the season.",
          ],
        },
        {
          heading: "New installations, not just new units",
          paragraphs: [
            "A well-done kitchen renovation also renews what you can't see: pipes, drainage, dedicated electrical circuits for appliances and proper extraction. That way you avoid breakdowns and nasty surprises a few years down the line.",
          ],
        },
      ],
      ca: [
        {
          heading: "Una cuina pensada per a com vius",
          paragraphs: [
            "Abans de triar mobles estudiam com fas servir la cuina: quantes persones cuinen, què necessites tenir a mà i si la vols obrir al menjador. A partir d'aquí proposam la distribució, els punts d'aigua, llum i extracció i l'emmagatzematge.",
            "En els habitatges de lloguer vacacional prioritzam materials resistents i fàcils de netejar, que aguantin l'ús intensiu de la temporada.",
          ],
        },
        {
          heading: "Instal·lacions noves, no només mobles",
          paragraphs: [
            "Una reforma de cuina ben feta renova també el que no es veu: canonades, desguassos, circuits elèctrics independents per als electrodomèstics i una bona sortida de fums. Així evites avaries i ensurts d'aquí a pocs anys.",
          ],
        },
      ],
    },
    faqs: {
      es: [{ q: "¿Cuánto dura la reforma de una cocina?", a: "Depende del alcance y de los plazos de entrega del mobiliario. Te damos un calendario concreto junto con el presupuesto." }],
      en: [{ q: "How long does a kitchen renovation take?", a: "It depends on the scope and on furniture lead times. We give you a specific schedule together with the quote." }],
      ca: [{ q: "Quant dura la reforma d'una cuina?", a: "Depèn de l'abast i dels terminis de lliurament del mobiliari. Et donam un calendari concret juntament amb el pressupost." }],
    },
  },

  "reforma-de-banos": {
    sections: {
      es: [
        {
          heading: "Del baño antiguo a un baño cómodo y seguro",
          paragraphs: [
            "Cambiar la bañera por un plato de ducha a ras de suelo, ganar almacenaje y mejorar la ventilación son las mejoras que más se notan. Es también la reforma que más valor añade si piensas alquilar o vender la vivienda.",
            "La clave de un buen baño está en lo que no se ve: desagües con la pendiente correcta e impermeabilización bajo el plato y en las paredes de la ducha. Lo hacemos con cuidado para que no haya filtraciones con los años.",
          ],
        },
        {
          heading: "Materiales para el clima de Ibiza",
          paragraphs: [
            "La humedad de la isla castiga los baños. Por eso recomendamos revestimientos y juntas resistentes, buena extracción de aire y grifería de calidad, que soporte bien la cal del agua.",
          ],
        },
      ],
      en: [
        {
          heading: "From an old bathroom to a comfortable, safe one",
          paragraphs: [
            "Swapping the bath for a level-access shower, gaining storage and improving ventilation are the upgrades you notice most. It's also the renovation that adds most value if you plan to rent out or sell.",
            "The key to a good bathroom is what you can't see: drainage with the right fall and waterproofing under the tray and on the shower walls. We do it carefully so there are no leaks over the years.",
          ],
        },
        {
          heading: "Materials for Ibiza's climate",
          paragraphs: [
            "The island's humidity is hard on bathrooms. That's why we recommend durable tiling and grout, good extraction and quality taps that cope well with hard water.",
          ],
        },
      ],
      ca: [
        {
          heading: "Del bany antic a un bany còmode i segur",
          paragraphs: [
            "Canviar la banyera per un plat de dutxa a nivell de terra, guanyar emmagatzematge i millorar la ventilació són les millores que més es noten. És també la reforma que més valor afegeix si penses llogar o vendre l'habitatge.",
            "La clau d'un bon bany és el que no es veu: desguassos amb el pendent correcte i impermeabilització sota el plat i a les parets de la dutxa. Ho feim amb cura perquè no hi hagi filtracions amb els anys.",
          ],
        },
        {
          heading: "Materials per al clima d'Eivissa",
          paragraphs: [
            "La humitat de l'illa castiga els banys. Per això recomanam revestiments i juntes resistents, una bona extracció d'aire i aixeteria de qualitat, que suporti bé la calç de l'aigua.",
          ],
        },
      ],
    },
    faqs: {
      es: [{ q: "¿Hacéis baños adaptados?", a: "Sí: platos de ducha a ras de suelo, barras de apoyo, suelos antideslizantes y puertas más anchas cuando el espacio lo permite." }],
      en: [{ q: "Do you build accessible bathrooms?", a: "Yes: level-access showers, grab rails, non-slip floors and wider doors where space allows." }],
      ca: [{ q: "Feis banys adaptats?", a: "Sí: plats de dutxa a nivell de terra, barres de suport, terres antilliscants i portes més amples quan l'espai ho permet." }],
    },
  },

  piscinas: {
    sections: {
      es: [
        {
          heading: "Piscinas nuevas y reforma de piscinas en Ibiza",
          paragraphs: [
            "Construimos piscinas de obra adaptadas al terreno y al estilo de la casa, y también piscinas de agua fría integradas en tarimas o terrazas. Si ya tienes piscina, la renovamos: revestimiento, bordes, pavimento perimetral e instalaciones.",
            "Una piscina en Ibiza se disfruta tanto como su entorno. Por eso la diseñamos junto con las zonas de descanso, la sombra, la iluminación y los muros de piedra, para que todo el exterior funcione como un conjunto.",
          ],
        },
        {
          heading: "Planifícala con tiempo",
          paragraphs: [
            "Para tenerla lista antes del verano conviene empezar en otoño o invierno. Además, varios ayuntamientos restringen las obras ruidosas en zonas turísticas durante la temporada alta, así que planificamos el calendario contigo desde la primera visita.",
          ],
        },
      ],
      en: [
        {
          heading: "New pools and pool renovation in Ibiza",
          paragraphs: [
            "We build concrete pools adapted to the plot and the style of the house, as well as cold plunge pools set into decks or terraces. If you already have a pool, we renovate it: finish, copings, surrounding paving and equipment.",
            "In Ibiza a pool is enjoyed as much as its surroundings. That's why we design it together with lounge areas, shade, lighting and stone walls, so the whole outdoor space works as one.",
          ],
        },
        {
          heading: "Plan it early",
          paragraphs: [
            "To have it ready before summer it's best to start in autumn or winter. Several town councils also restrict noisy work in tourist areas during the high season, so we plan the schedule with you from the first visit.",
          ],
        },
      ],
      ca: [
        {
          heading: "Piscines noves i reforma de piscines a Eivissa",
          paragraphs: [
            "Construïm piscines d'obra adaptades al terreny i a l'estil de la casa, i també piscines d'aigua freda integrades en tarimes o terrasses. Si ja tens piscina, la renovam: revestiment, vores, paviment perimetral i instal·lacions.",
            "Una piscina a Eivissa es gaudeix tant com el seu entorn. Per això la dissenyam juntament amb les zones de descans, l'ombra, la il·luminació i els murs de pedra, perquè tot l'exterior funcioni com un conjunt.",
          ],
        },
        {
          heading: "Planifica-la amb temps",
          paragraphs: [
            "Per tenir-la llesta abans de l'estiu convé començar a la tardor o a l'hivern. A més, diversos ajuntaments restringeixen les obres sorolloses a zones turístiques durant la temporada alta, així que planificam el calendari amb tu des de la primera visita.",
          ],
        },
      ],
    },
    faqs: {
      es: [{ q: "¿Hacéis piscinas de agua fría?", a: "Sí. Puedes ver una que hicimos, integrada en una tarima de madera, en nuestros proyectos." }],
      en: [{ q: "Do you build cold plunge pools?", a: "Yes. You can see one we built, set into a timber deck, in our projects." }],
      ca: [{ q: "Feis piscines d'aigua freda?", a: "Sí. En pots veure una que vam fer, integrada en una tarima de fusta, als nostres projectes." }],
    },
  },

  "locales-comerciales": {
    sections: {
      es: [
        {
          heading: "Reformas para abrir a tiempo",
          paragraphs: [
            "En hostelería y comercio el calendario manda: cada semana de retraso es una semana sin facturar en plena temporada. Por eso cerramos fechas desde el principio y organizamos los oficios para trabajar en paralelo siempre que se puede.",
            "Lo ideal es reformar entre noviembre y marzo, cuando la isla está más tranquila y es más fácil conseguir materiales y mano de obra.",
          ],
        },
        {
          heading: "Diseño con personalidad",
          paragraphs: [
            "Un local en Ibiza tiene que funcionar y también transmitir algo. Cuidamos la barra y la zona de servicio para que el equipo trabaje cómodo, y la iluminación, los materiales y la fachada para que el sitio tenga carácter propio, como hicimos en La Esquina, en el puerto de Ibiza.",
          ],
        },
      ],
      en: [
        {
          heading: "Renovations that open on time",
          paragraphs: [
            "In hospitality and retail the calendar rules: every week of delay is a week without trading in peak season. That's why we fix dates from the outset and organise the trades to work in parallel wherever possible.",
            "The best time to renovate is between November and March, when the island is quieter and materials and labour are easier to get.",
          ],
        },
        {
          heading: "Design with personality",
          paragraphs: [
            "A venue in Ibiza has to work and also say something. We take care of the bar and service area so the team works comfortably, and of lighting, materials and the façade so the place has its own character, as we did at La Esquina in Ibiza harbour.",
          ],
        },
      ],
      ca: [
        {
          heading: "Reformes per obrir a temps",
          paragraphs: [
            "En hostaleria i comerç el calendari mana: cada setmana de retard és una setmana sense facturar en plena temporada. Per això tancam dates des del principi i organitzam els oficis per treballar en paral·lel sempre que es pot.",
            "L'ideal és reformar entre novembre i març, quan l'illa està més tranquil·la i és més fàcil aconseguir materials i mà d'obra.",
          ],
        },
        {
          heading: "Disseny amb personalitat",
          paragraphs: [
            "Un local a Eivissa ha de funcionar i també transmetre alguna cosa. Cuidam la barra i la zona de servei perquè l'equip treballi còmode, i la il·luminació, els materials i la façana perquè el lloc tengui caràcter propi, com vam fer a La Esquina, al port d'Eivissa.",
          ],
        },
      ],
    },
    faqs: {
      es: [{ q: "¿Reformáis tiendas y oficinas, además de bares?", a: "Sí. Trabajamos en todo tipo de locales: bares, restaurantes, tiendas y oficinas." }],
      en: [{ q: "Do you renovate shops and offices as well as bars?", a: "Yes. We work on all kinds of premises: bars, restaurants, shops and offices." }],
      ca: [{ q: "Reformau botigues i oficines, a més de bars?", a: "Sí. Treballam en tota mena de locals: bars, restaurants, botigues i oficines." }],
    },
  },

  "reparaciones-y-mantenimiento": {
    sections: {
      es: [
        {
          heading: "Mantenimiento de casas en Ibiza mientras no estás",
          paragraphs: [
            "Muchas casas y villas de Ibiza pasan meses vacías. La humedad, el salitre y las lluvias de otoño se notan: manchas, pintura que se levanta, carpinterías que se hinchan, pequeñas filtraciones. Revisarlas a tiempo evita que un problema pequeño acabe en una reforma.",
            "Nos ocupamos del mantenimiento de tu casa cuando no estás en la isla: revisiones periódicas, reparaciones y avisos con fotos de lo que encontramos, para que decidas con información.",
          ],
        },
        {
          heading: "Puesta a punto antes de temporada",
          paragraphs: [
            "Si alquilas tu vivienda, la puesta a punto antes del verano es imprescindible: pintura, revisión de fontanería y electricidad, persianas, puertas, terrazas y exteriores. Así la casa está lista para los primeros huéspedes y evitas incidencias en plena temporada.",
          ],
        },
      ],
      en: [
        {
          heading: "House maintenance in Ibiza while you're away",
          paragraphs: [
            "Many houses and villas in Ibiza stand empty for months. Humidity, sea salt and autumn rain take their toll: stains, peeling paint, swollen joinery, small leaks. Checking them in time stops a small problem turning into a renovation.",
            "We take care of your house while you're off the island: regular checks, repairs and updates with photos of what we find, so you can decide with full information.",
          ],
        },
        {
          heading: "Pre-season preparation",
          paragraphs: [
            "If you rent out your property, getting it ready before summer is essential: painting, plumbing and electrical checks, shutters, doors, terraces and outdoor areas. That way the house is ready for the first guests and you avoid problems in peak season.",
          ],
        },
      ],
      ca: [
        {
          heading: "Manteniment de cases a Eivissa mentre no hi ets",
          paragraphs: [
            "Moltes cases i viles d'Eivissa passen mesos buides. La humitat, el salnitre i les pluges de tardor es noten: taques, pintura que s'aixeca, fusteries que s'inflen, petites filtracions. Revisar-les a temps evita que un problema petit acabi en una reforma.",
            "Ens ocupam del manteniment de la teva casa quan no ets a l'illa: revisions periòdiques, reparacions i avisos amb fotos del que trobam, perquè decideixis amb informació.",
          ],
        },
        {
          heading: "Posada a punt abans de temporada",
          paragraphs: [
            "Si llogues el teu habitatge, la posada a punt abans de l'estiu és imprescindible: pintura, revisió de lampisteria i electricitat, persianes, portes, terrasses i exteriors. Així la casa està llesta per als primers hostes i evites incidències en plena temporada.",
          ],
        },
      ],
    },
    faqs: {
      es: [{ q: "¿Ofrecéis mantenimiento periódico?", a: "Sí. Podemos acordar revisiones periódicas de tu casa o villa y avisarte con fotos si encontramos algo que reparar." }],
      en: [{ q: "Do you offer regular maintenance?", a: "Yes. We can agree regular checks of your house or villa and let you know, with photos, if we find anything that needs fixing." }],
      ca: [{ q: "Oferiu manteniment periòdic?", a: "Sí. Podem acordar revisions periòdiques de la teva casa o vila i avisar-te amb fotos si trobam alguna cosa per reparar." }],
    },
  },
};

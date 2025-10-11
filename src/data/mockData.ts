import type { Project, Service, Testimonial, CompanyInfo } from '@/types';

// Información de la empresa
export const companyInfo: CompanyInfo = {
  name: 'Decoady Reformas',
  description: 'Somos un grupo de personas líder en construcción y reformas en Ibiza con más de 15 años de experiencia en el sector. Nos especializamos en proyectos residenciales, comerciales e industriales, siempre con los más altos estándares de calidad.',
  foundedYear: 2001,
  projectsCompleted: 400,
  clientsSatisfied: 400,
  yearsOfExperience: 25, 
  averageRating: 4.5,
  mission: 'Transformar espacios y crear hogares de ensueño con la máxima calidad, innovación y compromiso con nuestros clientes.',
  vision: 'Ser la empresa de referencia en construcción y reformas, reconocida por nuestra excelencia, sostenibilidad e innovación.',
  values: [
    'Calidad en cada detalle',
    'Compromiso con el cliente',
    'Innovación constante',
    'Sostenibilidad ambiental',
    'Transparencia total',
    'Puntualidad en entregas'
  ]   
};

// Servicios
export const services: Service[] = [
  {
    id: '1',
    name: 'Reparaciones',
    description: 'Reparaciones rápidas y eficientes para tu hogar o negocio.',
    icon: '🔧',
    category: 'reparaciones',
    features: [
      'Reparaciones rápidas',
      'Materiales de primera calidad',
      'Equipos especializados',
      'Supervisión constante'
    ],
    featured: true,
    created_at: new Date(),
    updated_at: new Date()
  },
  {
    id: '2',
    name: 'Reformas Integrales',
    description: 'Renovación completa de viviendas y locales comerciales con diseño personalizado.',
    icon: '🔨',
    category: 'renovation',
    features: [
      'Diseño personalizado',
      'Reforma sin mudarse',
      'Gestión de permisos',
      'Acabados premium',
      'Limpieza incluida'
    ],
    featured: true,
    created_at: new Date(),
    updated_at: new Date()
  },
  {
    id: '3',
    name: 'Consultoría Técnica',
    description: 'Asesoramiento experto en todas las fases de tu proyecto de construcción.',
    icon: '💼',
    category: 'consulting',
    features: [
      'Viabilidad de proyectos',
      'Gestión de licencias',
      'Control de calidad',
      'Optimización de costes',
      'Seguimiento continuo'
      ],
    featured: true,
    created_at: new Date(),
    updated_at: new Date()
  }
];

// Proyectos destacados
export const projects: Project[] = [
  
];

// Testimonios
export const testimonials: Testimonial[] = [
  
]; 
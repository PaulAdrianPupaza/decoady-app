// Servicios para manejar los datos de la aplicación (Controlador en MVC)

import type { Project, Service, Testimonial } from '@/types';
import { projects, services, testimonials, companyInfo } from '@/data/mockData';

// Servicio de proyectos
export class ProjectService {
  static getFeaturedProjects(limit: number = 3): Project[] {
    return projects
      .filter(project => project.status === 'completed')
      .slice(0, limit);
  }

  static getProjectById(id: string): Project | undefined {
    return projects.find(project => project.id === id);
  }
}

// Servicio de servicios
export class ServiceService {
  static getFeaturedServices(limit: number = 4): Service[] {
    return services.slice(0, limit);
  }
}

// Servicio de testimonios
export class TestimonialService {
  static getFeaturedTestimonials(limit: number = 3): Testimonial[] {
    return testimonials
      .sort((a, b) => b.rating - a.rating)
      .slice(0, limit);
  }

  static getAverageRating(): number {
    if (testimonials.length === 0) return 0;
    const totalRating = testimonials.reduce((sum, testimonial) => sum + testimonial.rating, 0);
    return Math.round((totalRating / testimonials.length) * 10) / 10;
  }
}

// Servicio de empresa
export class CompanyService {
  static getCompanyStats() {
    return {
      projectsCompleted: companyInfo.projectsCompleted,
      clientsSatisfied: companyInfo.clientsSatisfied,
      yearsOfExperience: companyInfo.yearsOfExperience,
      averageRating: companyInfo.averageRating,
    };
  }
} 
// Tipos principales para el dominio de constructora

// Database types
export interface Project {
  id: string;
  title: string;
  description: string;
  category: ProjectCategory;
  status: ProjectStatus;
  location: string;
  start_date?: Date;
  completion_date?: Date;
  featured: boolean;
  created_at: Date;
  updated_at: Date;
  // Related data
  images?: ProjectImage[];
  features?: ProjectFeature[];
  main_image?: string; // URL of main image
}

export interface ProjectImage {
  id: string;
  project_id: string;
  image_path: string; // Path in Supabase storage
  image_url: string; // Full public URL
  is_main: boolean;
  alt_text?: string;
  sort_order: number;
  created_at: Date;
}

export interface ProjectFeature {
  id: string;
  project_id: string;
  feature: string;
  sort_order: number;
}

// Forms and creation types
export interface CreateProjectData {
  title: string;
  description: string;
  category: ProjectCategory;
  status: ProjectStatus;
  location?: string;
  start_date?: Date;
  completion_date?: Date;
  featured?: boolean;
  features?: string[];
}

export interface Service {
  id: string;
  name: string;
  description: string;
  icon: string;
  category: ServiceCategory;
  featured: boolean;
  image_path?: string; // Path de imagen en Supabase
  image_url?: string; // URL completa de la imagen
  features: string[];
  created_at: Date;
  updated_at: Date;
}

export interface CreateServiceData {
  name: string;
  description: string;
  icon: string;
  category: ServiceCategory;
  featured?: boolean;
  features: string[];
}

export interface Testimonial {
  id: string;
  clientName: string;
  clientPosition?: string;
  content: string;
  rating: number;
  date: Date;
  projectId?: string;
}

export interface CompanyInfo {
  name: string;
  description: string;
  foundedYear: number;
  averageRating: number;
  projectsCompleted: number;
  clientsSatisfied: number;
  yearsOfExperience: number;
  mission: string;
  vision: string;
  values: string[];
}

// Enums
export type ProjectCategory = 
  | 'residential'
  | 'commercial'
  | 'industrial'
  | 'renovation'
  | 'infrastructure';

export type ProjectStatus = 
  | 'planning'
  | 'in-progress'
  | 'completed'
  | 'on-hold';

export type ServiceCategory = 
  | 'reparaciones'
  | 'renovation'
  | 'design'
  | 'consulting'
  | 'maintenance'; 
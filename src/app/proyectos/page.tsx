import { DatabaseService } from "@/services/databaseService";
import ProjectsClient from "./ProjectsClient";
import { projects } from "@/data/mockData";

export const metadata = {
  title: 'Proyectos - Decoady Reformas',
  description: 'Descubre todos nuestros proyectos de construcción y reforma. Viviendas, locales comerciales y proyectos industriales.',
}

export default async function ProyectosPage() {
  // Try to get all projects from database, fallback to mock data
  let allProjects;
  try {
    allProjects = await DatabaseService.getAllProjects();
    // If no projects in DB, use mock data
    if (allProjects.length === 0) {
      allProjects = projects;
    }
  } catch {
    console.log('Database not available, using mock data');
    allProjects = projects;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative bg-blue-600 py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Nuestros Proyectos
          </h1>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto">
            Explora nuestra cartera completa de proyectos de construcción, reforma y diseño. 
            Cada proyecto representa nuestro compromiso con la calidad y la innovación.
          </p>
        </div>
      </section>

      {/* Projects Section */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <ProjectsClient initialProjects={allProjects} />
        </div>
      </section>
    </div>
  );
} 
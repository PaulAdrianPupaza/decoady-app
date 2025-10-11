import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { DatabaseService } from '@/services/databaseService'
import { ProjectService } from '@/services/dataService'
import { formatDate } from '@/lib/utils'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import Button from '@/components/ui/Button'
import ProjectGallery from './ProjectGallery'

interface ProjectPageProps {
  params: Promise<{ id: string }>
}

// Required for static export with dynamic routes
export async function generateStaticParams() {
  try {
    const projects = await DatabaseService.getAllProjects()
    return projects.map((project) => ({
      id: project.id,
    }))
  } catch {
    console.log('Database not available for static generation, using empty array')
    return []
  }
}

export async function generateMetadata({ params }: ProjectPageProps) {
  const { id } = await params;
  let project;
  
  try {
    project = await DatabaseService.getProject(id);
    if (!project) {
      // Try mock data as fallback
      project = ProjectService.getProjectById(id);
    }
  } catch {
    project = ProjectService.getProjectById(id);
  }

  if (!project) {
    return {
      title: 'Proyecto no encontrado - Decoady Reformas',
    }
  }

  return {
    title: `${project.title} - Proyectos - Decoady Reformas`,
    description: project.description,
  }
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { id } = await params;
  let project;
  
  try {
    project = await DatabaseService.getProject(id);
    if (!project) {
      // Try mock data as fallback
      project = ProjectService.getProjectById(id);
    }
  } catch {
    project = ProjectService.getProjectById(id);
  }

  if (!project) {
    notFound()
  }

  // Build gallery images ensuring main_image is first and deduplicated
  const galleryImages: string[] = (() => {
    const urls = (project.images || []).map(img => img.image_url)
    const list = [] as string[]
    if (project.main_image) list.push(project.main_image)
    for (const url of urls) {
      if (!list.includes(url)) list.push(url)
    }
    return list
  })()

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800'
      case 'in-progress': return 'bg-blue-100 text-blue-800'
      case 'planning': return 'bg-yellow-100 text-yellow-800'
      case 'on-hold': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'completed': return 'Completado'
      case 'in-progress': return 'En Progreso'
      case 'planning': return 'Planificación'
      case 'on-hold': return 'En Pausa'
      default: return status
    }
  }

  const getCategoryLabel = (category: string) => {
    switch (category) {
      case 'residential': return 'Residencial'
      case 'commercial': return 'Comercial'
      case 'industrial': return 'Industrial'
      case 'renovation': return 'Reforma'
      case 'infrastructure': return 'Infraestructura'
      default: return category
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <nav className="flex items-center text-sm text-gray-600">
            <Link href="/" className="hover:text-blue-600">
              Inicio
            </Link>
            <span className="mx-2">/</span>
            <Link href="/proyectos" className="hover:text-blue-600">
              Proyectos
            </Link>
            <span className="mx-2">/</span>
            <span className="text-gray-900 font-medium">{project.title}</span>
          </nav>
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative">
        <div className="relative h-96 md:h-[500px] overflow-hidden">
          <Image
            src={project.main_image || "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"}
            alt={project.title}
            fill
            className="object-cover"
            priority
          />
          {/* Clickable overlay to open lightbox in gallery */}
          <a
            href="#lightbox"
            aria-label="Ampliar imagen principal"
            className="absolute inset-0"
          />
          <div className="absolute inset-0 bg-black bg-opacity-40"></div>
          
          {/* Project Info Overlay */}
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-8">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex flex-wrap gap-3 mb-4">
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(project.status)}`}>
                  {getStatusLabel(project.status)}
                </span>
                <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                  {getCategoryLabel(project.category)}
                </span>
                {project.featured && (
                  <span className="bg-amber-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                    ⭐ Destacado
                  </span>
                )}
              </div>
              
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
                {project.title}
              </h1>
              
              <div className="flex flex-wrap gap-6 text-white text-lg">
                {project.location && (
                  <span className="flex items-center">
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    </svg>
                    {project.location}
                  </span>
                )}
                {project.completion_date && (
                  <span className="flex items-center">
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3a1 1 0 011-1h6a1 1 0 011 1v4m4 8a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {formatDate(project.completion_date)}
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Description */}
              <Card>
                <CardHeader>
                  <CardTitle>Descripción del Proyecto</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="prose prose-gray max-w-none">
                    <p className="text-gray-700 leading-relaxed text-lg">
                      {project.description}
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Features */}
              {project.features && project.features.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle>Características Destacadas</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {project.features.map((feature, index) => (
                        <div key={index} className="flex items-center">
                          <svg className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          <span className="text-gray-700">
                            {typeof feature === 'string' ? feature : feature.feature}
                          </span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Gallery */}
              {project.images && project.images.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle>Galería de Imágenes</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ProjectGallery images={galleryImages} />
                  </CardContent>
                </Card>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Project Details */}
              <Card>
                <CardHeader>
                  <CardTitle>Detalles del Proyecto</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center py-2 border-b">
                      <span className="text-gray-600">Estado</span>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(project.status)}`}>
                        {getStatusLabel(project.status)}
                      </span>
                    </div>
                    
                    <div className="flex justify-between items-center py-2 border-b">
                      <span className="text-gray-600">Categoría</span>
                      <span className="font-medium">{getCategoryLabel(project.category)}</span>
                    </div>



                    {project.start_date && (
                      <div className="flex justify-between items-center py-2 border-b">
                        <span className="text-gray-600">Fecha de Inicio</span>
                        <span className="font-medium">{formatDate(project.start_date)}</span>
                      </div>
                    )}

                    {project.completion_date && (
                      <div className="flex justify-between items-center py-2 border-b">
                        <span className="text-gray-600">Fecha de Finalización</span>
                        <span className="font-medium">{formatDate(project.completion_date)}</span>
                      </div>
                    )}

                    {project.images && project.images.length > 0 && (
                      <div className="flex justify-between items-center py-2">
                        <span className="text-gray-600">Imágenes</span>
                        <span className="font-medium">{project.images.length} fotos</span>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Contact CTA */}
              <Card>
                <CardContent className="p-6 text-center">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">
                    ¿Te interesa un proyecto similar?
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Contáctanos para discutir tu proyecto y obtener un presupuesto personalizado.
                  </p>
                  <div className="space-y-3">
                    <a href="/contacto">
                      <Button variant="outline" className="w-full">
                        Contactar Ahora
                      </Button>
                    </a>
                  </div>
                </CardContent>
              </Card>

              {/* Back to Projects */}
              <div className="text-center">
                <Link href="/proyectos">
                  <Button variant="outline">
                    ← Volver a Proyectos
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
} 
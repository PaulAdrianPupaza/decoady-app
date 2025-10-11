'use client'

import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import Image from 'next/image'
import { Project } from '@/types'
import { DatabaseService } from '@/services/databaseService'
import { formatDate } from '@/lib/utils'
import Button from './Button'
import { Card, CardContent } from './Card'

interface ProjectListProps {
  onEdit?: (project: Project) => void
  onView?: (project: Project) => void
  refreshTrigger?: number
}

export default function ProjectList({ onEdit, onView, refreshTrigger }: ProjectListProps) {
  const { t } = useTranslation()
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)
  const [deletingId, setDeletingId] = useState<string | null>(null)

  const loadProjects = async () => {
    setLoading(true)
    try {
      const data = await DatabaseService.getAllProjects()
      setProjects(data)
    } catch (error) {
      console.error('Error loading projects:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadProjects()
  }, [refreshTrigger])

  const handleDelete = async (project: Project) => {
    if (!confirm(`¿Estás seguro de que quieres eliminar el proyecto "${project.title}"?`)) {
      return
    }

    setDeletingId(project.id)
    try {
      const success = await DatabaseService.deleteProject(project.id)
      if (success) {
        setProjects(prev => prev.filter(p => p.id !== project.id))
      } else {
        alert('Error al eliminar el proyecto')
      }
    } catch (error) {
      console.error('Error deleting project:', error)
      alert('Error al eliminar el proyecto')
    } finally {
      setDeletingId(null)
    }
  }

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

  if (loading) {
    return (
      <Card>
        <CardContent className="p-8 text-center">
          <div className="inline-flex items-center px-4 py-2 bg-blue-50 text-blue-700 rounded-lg">
            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-blue-700" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Cargando proyectos...
          </div>
        </CardContent>
      </Card>
    )
  }

  if (projects.length === 0) {
    return (
      <Card>
        <CardContent className="p-8 text-center">
          <div className="text-gray-500">
            <svg className="w-16 h-16 mx-auto mb-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No hay proyectos</h3>
            <p className="text-gray-500">Crea tu primer proyecto para empezar</p>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold text-gray-900">
          Proyectos ({projects.length})
        </h3>
        <Button onClick={loadProjects} variant="outline" size="sm">
          🔄 Actualizar
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {projects.map((project) => (
          <Card key={project.id} className="group hover:shadow-lg transition-shadow duration-200">
            <div className="relative">
              {/* Project Image */}
              <div className="relative h-48 bg-gray-200 rounded-t-lg overflow-hidden">
                {project.main_image ? (
                  <Image
                    src={project.main_image}
                    alt={project.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gray-100">
                    <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                )}

                {/* Badges */}
                <div className="absolute top-3 left-3 flex gap-2">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(project.status)}`}>
                    {getStatusLabel(project.status)}
                  </span>
                  {project.featured && (
                    <span className="bg-amber-100 text-amber-800 px-2 py-1 rounded-full text-xs font-medium">
                      ⭐ {t('projects.featured')}
                    </span>
                  )}
                </div>

                {/* Image count */}
                {project.images && project.images.length > 0 && (
                  <div className="absolute top-3 right-3 bg-black bg-opacity-50 text-white px-2 py-1 rounded text-xs">
                    📷 {project.images.length}
                  </div>
                )}
              </div>

              {/* Project Info */}
              <CardContent className="p-4">
                <div className="mb-3">
                  <h4 className="font-semibold text-gray-900 mb-1 line-clamp-1">
                    {project.title}
                  </h4>
                  <p className="text-sm text-gray-600 line-clamp-2">
                    {project.description}
                  </p>
                </div>

                <div className="space-y-2 text-sm text-gray-500">
                  <div className="flex justify-between items-start">
                    <div className="flex flex-col space-y-1">
                      {project.location && (
                        <span>📍 {project.location}</span>
                      )}
                    </div>
                    <span className="text-xs font-medium text-gray-600">
                      {getCategoryLabel(project.category)}
                    </span>
                  </div>
                  {project.completion_date && (
                    <div className="text-xs text-green-600">
                      ✅ Finalizado: {formatDate(project.completion_date)}
                    </div>
                  )}
                </div>

                {/* Features */}
                {project.features && project.features.length > 0 && (
                  <div className="mt-3">
                    <div className="flex flex-wrap gap-1">
                      {project.features.slice(0, 2).map((feature, index) => (
                        <span key={index} className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs">
                          {feature.feature}
                        </span>
                      ))}
                      {project.features.length > 2 && (
                        <span className="text-xs text-gray-500">
                          +{project.features.length - 2} más
                        </span>
                      )}
                    </div>
                  </div>
                )}

                {/* Actions */}
                <div className="flex gap-2 mt-4 pt-3 border-t">
                  {onView && (
                    <Button
                      onClick={() => onView(project)}
                      variant="outline"
                      size="sm"
                      className="flex-1"
                    >
                      👁️ Ver
                    </Button>
                  )}
                  {onEdit && (
                    <Button
                      onClick={() => onEdit(project)}
                      variant="outline"
                      size="sm"
                      className="flex-1"
                    >
                      ✏️ Editar
                    </Button>
                  )}
                  <Button
                    onClick={() => handleDelete(project)}
                    variant="outline"
                    size="sm"
                    className="text-red-600 hover:bg-red-50 border-red-200"
                    disabled={deletingId === project.id}
                  >
                    {deletingId === project.id ? '⏳' : '🗑️'}
                  </Button>
                </div>
              </CardContent>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
} 
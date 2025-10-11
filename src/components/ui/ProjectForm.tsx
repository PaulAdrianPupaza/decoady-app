'use client'

import { useState, useEffect } from 'react'
import { Project, CreateProjectData, ProjectCategory, ProjectStatus } from '@/types'
import { DatabaseService } from '@/services/databaseService'
import Button from './Button'
import { Card, CardContent, CardHeader, CardTitle } from './Card'
import ImageUpload from './ImageUpload'

interface ProjectFormProps {
  project?: Project
  onSubmit?: (project: Project) => void
  onCancel?: () => void
}

const categories: { value: ProjectCategory; label: string }[] = [
  { value: 'residential', label: 'Residencial' },
  { value: 'commercial', label: 'Comercial' },
  { value: 'industrial', label: 'Industrial' },
  { value: 'renovation', label: 'Reforma' },
  { value: 'infrastructure', label: 'Infraestructura' }
]

const statuses: { value: ProjectStatus; label: string }[] = [
  { value: 'planning', label: 'Planificación' },
  { value: 'in-progress', label: 'En Progreso' },
  { value: 'completed', label: 'Completado' },
  { value: 'on-hold', label: 'En Pausa' }
]

export default function ProjectForm({ project, onSubmit, onCancel }: ProjectFormProps) {
  const [formData, setFormData] = useState<CreateProjectData>({
    title: '',
    description: '',
    category: 'residential',
    status: 'completed',
    location: '',
    featured: false,
    features: []
  })

  const [loading, setLoading] = useState(false)
  const [newFeature, setNewFeature] = useState('')
  const [uploadedImages, setUploadedImages] = useState<string[]>([])

  useEffect(() => {
    if (project) {
      setFormData({
        title: project.title,
        description: project.description,
        category: project.category,
        status: project.status,
        location: project.location || '',
        start_date: project.start_date,
        completion_date: project.completion_date,
        featured: project.featured,
        features: project.features?.map(f => f.feature) || []
      })
    }
  }, [project])

  const handleInputChange = (field: keyof CreateProjectData, value: string | Date | boolean | undefined) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const addFeature = () => {
    if (newFeature.trim() && !formData.features?.includes(newFeature.trim())) {
      setFormData(prev => ({
        ...prev,
        features: [...(prev.features || []), newFeature.trim()]
      }))
      setNewFeature('')
    }
  }

  const removeFeature = (feature: string) => {
    setFormData(prev => ({
      ...prev,
      features: prev.features?.filter(f => f !== feature) || []
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      let result: Project | null = null

      if (project) {
        // Update existing project
        result = await DatabaseService.updateProject(project.id, formData)
      } else {
        // Create new project
        result = await DatabaseService.createProject(formData)
      }

      if (result) {
        // Add uploaded images to the project
        for (const imageUrl of uploadedImages) {
          const imagePath = imageUrl.split('/').pop() || ''
          await DatabaseService.addProjectImage(
            result.id,
            imagePath,
            imageUrl,
            uploadedImages.indexOf(imageUrl) === 0, // First image is main
            `${result.title} - Imagen ${uploadedImages.indexOf(imageUrl) + 1}`
          )
        }

        onSubmit?.(result)
      }
    } catch (error) {
      console.error('Error saving project:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleImageUpload = (results: { success: boolean; url?: string }[]) => {
    const successfulUploads = results
      .filter(r => r.success && r.url)
      .map(r => r.url!)
    
    setUploadedImages(prev => [...prev, ...successfulUploads])
  }

  return (
    <div className="max-w-4xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>
            {project ? 'Editar Proyecto' : 'Crear Nuevo Proyecto'}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Basic Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Título del Proyecto *
                </label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => handleInputChange('title', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Ej: Villa Moderna en Las Rozas"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Ubicación
                </label>
                <input
                  type="text"
                  value={formData.location}
                  onChange={(e) => handleInputChange('location', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Ej: Las Rozas, Madrid"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Categoría *
                </label>
                <select
                  required
                  value={formData.category}
                  onChange={(e) => handleInputChange('category', e.target.value as ProjectCategory)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {categories.map(cat => (
                    <option key={cat.value} value={cat.value}>
                      {cat.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Estado *
                </label>
                <select
                  required
                  value={formData.status}
                  onChange={(e) => handleInputChange('status', e.target.value as ProjectStatus)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {statuses.map(status => (
                    <option key={status.value} value={status.value}>
                      {status.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Descripción *
              </label>
              <textarea
                required
                value={formData.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Describe el proyecto en detalle..."
              />
            </div>

            {/* Dates */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Fecha de Inicio
                </label>
                <input
                  type="date"
                  value={formData.start_date ? formData.start_date.toISOString().split('T')[0] : ''}
                  onChange={(e) => handleInputChange('start_date', e.target.value ? new Date(e.target.value) : undefined)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Fecha de Finalización
                </label>
                <input
                  type="date"
                  value={formData.completion_date ? formData.completion_date.toISOString().split('T')[0] : ''}
                  onChange={(e) => handleInputChange('completion_date', e.target.value ? new Date(e.target.value) : undefined)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            {/* Featured */}
            <div className="flex items-center">
              <input
                type="checkbox"
                id="featured"
                checked={formData.featured}
                onChange={(e) => handleInputChange('featured', e.target.checked)}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="featured" className="ml-2 block text-sm text-gray-900">
                Proyecto destacado (aparecerá en la página principal)
              </label>
            </div>

            {/* Features */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Características del Proyecto
              </label>
              <div className="space-y-2">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={newFeature}
                    onChange={(e) => setNewFeature(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addFeature())}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Añadir característica..."
                  />
                  <Button
                    type="button"
                    onClick={addFeature}
                    variant="outline"
                  >
                    Añadir
                  </Button>
                </div>
                
                {formData.features && formData.features.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-2">
                    {formData.features.map((feature, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-blue-100 text-blue-800"
                      >
                        {feature}
                        <button
                          type="button"
                          onClick={() => removeFeature(feature)}
                          className="ml-2 text-blue-600 hover:text-blue-800"
                        >
                          ×
                        </button>
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Image Upload */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Imágenes del Proyecto
              </label>
              <ImageUpload
                category="projects"
                onUploadComplete={handleImageUpload}
                maxFiles={10}
                className="mb-4"
              />
              
              {uploadedImages.length > 0 && (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                  {uploadedImages.map((url, index) => (
                    <div key={index} className="relative aspect-square">
                      <img
                        src={url}
                        alt={`Imagen ${index + 1}`}
                        className="w-full h-full object-cover rounded-lg"
                      />
                      <div className="absolute top-2 left-2 bg-blue-600 text-white text-xs px-2 py-1 rounded">
                        {index === 0 ? 'Principal' : `#${index + 1}`}
                      </div>
                      <button
                        type="button"
                        onClick={() => setUploadedImages(prev => prev.filter((_, i) => i !== index))}
                        className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Actions */}
            <div className="flex justify-end gap-4 pt-6 border-t">
              {onCancel && (
                <Button
                  type="button"
                  onClick={onCancel}
                  variant="outline"
                  disabled={loading}
                >
                  Cancelar
                </Button>
              )}
              <Button
                type="submit"
                variant="primary"
                disabled={loading}
              >
                {loading ? 'Guardando...' : project ? 'Actualizar Proyecto' : 'Crear Proyecto'}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
} 
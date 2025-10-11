'use client'

import { useState, useEffect, useCallback } from 'react'
import Image from 'next/image'
import ImageUpload from '@/components/ui/ImageUpload'
import SupabaseDiagnostic from '@/components/ui/SupabaseDiagnostic'
import ConfigurationChecker from '@/components/ui/ConfigurationChecker'
import ProjectForm from '@/components/ui/ProjectForm'
import ProjectList from '@/components/ui/ProjectList'
import { ImageService, ImageCategory, ImageUploadResult } from '@/services/imageService'
import { Project } from '@/types'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import Button from '@/components/ui/Button'

interface ImageFile {
  name: string
  path: string
  url: string
  size?: number
  lastModified?: string
}

type AdminView = 'projects' | 'images' | 'services' | 'analytics'

export default function AdminPage() {
  const [currentView, setCurrentView] = useState<AdminView>('projects')
  const [selectedCategory, setSelectedCategory] = useState<ImageCategory>('projects')
  const [images, setImages] = useState<ImageFile[]>([])
  const [loading, setLoading] = useState(false)
  const [uploadStatus, setUploadStatus] = useState<string>('')
  const [showProjectForm, setShowProjectForm] = useState(false)
  const [editingProject, setEditingProject] = useState<Project | undefined>()
  const [projectRefreshTrigger, setProjectRefreshTrigger] = useState(0)

  const categories: { value: ImageCategory; label: string; description: string }[] = [
    { value: 'projects', label: 'Proyectos', description: 'Fotos de proyectos completados' },
    { value: 'services', label: 'Servicios', description: 'Imágenes representativas de servicios' },
    { value: 'hero', label: 'Banners', description: 'Imágenes para secciones principales' },
    { value: 'team', label: 'Equipo', description: 'Fotos del equipo de trabajo' },
    { value: 'testimonials', label: 'Testimonios', description: 'Fotos relacionadas con testimonios' }
  ]

  const adminViews = [
    { value: 'projects' as AdminView, label: '🏗️ Proyectos', description: 'Gestionar proyectos completos' },
    { value: 'images' as AdminView, label: '📸 Imágenes', description: 'Subir imágenes por categoría' },
    { value: 'services' as AdminView, label: '🔧 Servicios', description: 'Gestionar servicios' },
    { value: 'analytics' as AdminView, label: '📊 Estadísticas', description: 'Ver estadísticas del sitio' }
  ]

  // Load images for current category
  const loadImages = useCallback(async () => {
    setLoading(true)
    try {
      const categoryImages = await ImageService.getImagesByCategory(selectedCategory)
      setImages(categoryImages)
    } catch (error) {
      console.error('Error loading images:', error)
      setImages([])
    } finally {
      setLoading(false)
    }
  }, [selectedCategory])

  // Handle successful upload
  const handleUploadComplete = (results: ImageUploadResult[]) => {
    const successful = results.filter(r => r.success)
    const failed = results.filter(r => !r.success)
    
    if (successful.length > 0) {
      setUploadStatus(`✅ ${successful.length} imagen${successful.length > 1 ? 'es' : ''} subida${successful.length > 1 ? 's' : ''} correctamente`)
      loadImages() // Reload images
    }
    
    if (failed.length > 0) {
      setUploadStatus(`❌ ${failed.length} imagen${failed.length > 1 ? 'es fallaron' : ' falló'} al subir`)
    }

    // Clear status after 5 seconds
    setTimeout(() => setUploadStatus(''), 5000)
  }

  const handleUploadStart = () => {
    setUploadStatus('📤 Subiendo imágenes...')
  }

  // Delete image
  const deleteImage = async (path: string) => {
    if (!confirm('¿Estás seguro de que quieres eliminar esta imagen?')) return
    
    try {
      const success = await ImageService.deleteImage(path)
      if (success) {
        setUploadStatus('✅ Imagen eliminada correctamente')
        loadImages() // Reload images
      } else {
        setUploadStatus('❌ Error al eliminar la imagen')
      }
    } catch (error) {
      console.error('Error deleting image:', error)
      setUploadStatus('❌ Error al eliminar la imagen')
    }

    setTimeout(() => setUploadStatus(''), 3000)
  }

  // Copy URL to clipboard
  const copyUrl = async (url: string) => {
    try {
      await navigator.clipboard.writeText(url)
      setUploadStatus('📋 URL copiada al portapapeles')
      setTimeout(() => setUploadStatus(''), 2000)
    } catch (error) {
      console.error('Error copying to clipboard:', error)
    }
  }

  // Project management functions
  const handleCreateProject = () => {
    setEditingProject(undefined)
    setShowProjectForm(true)
  }

  const handleEditProject = (project: Project) => {
    setEditingProject(project)
    setShowProjectForm(true)
  }

  const handleProjectSubmit = () => {
    setShowProjectForm(false)
    setEditingProject(undefined)
    setProjectRefreshTrigger(prev => prev + 1)
    setUploadStatus('✅ Proyecto guardado correctamente')
    setTimeout(() => setUploadStatus(''), 3000)
  }

  const handleProjectCancel = () => {
    setShowProjectForm(false)
    setEditingProject(undefined)
  }

  // Load images when category changes
  useEffect(() => {
    if (currentView === 'images') {
      loadImages()
    }
  }, [selectedCategory, currentView, loadImages])

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Panel de Administración
        </h1>
        <p className="text-gray-600">
          Gestiona proyectos, imágenes y contenido de tu sitio web
        </p>
      </div>

      {/* Configuration Check */}
      <div className="mb-8">
        <ConfigurationChecker />
      </div>

      {/* Upload Status */}
      {uploadStatus && (
        <div className={`mb-6 p-4 border rounded-lg ${
          uploadStatus.includes('✅') ? 'bg-green-50 border-green-200 text-green-800' :
          uploadStatus.includes('❌') ? 'bg-red-50 border-red-200 text-red-800' :
          'bg-blue-50 border-blue-200 text-blue-800'
        }`}>
          <p className="font-medium">{uploadStatus}</p>
        </div>
      )}

      {/* Navigation Tabs */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Seleccionar Sección</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {adminViews.map((view) => (
              <button
                key={view.value}
                onClick={() => setCurrentView(view.value)}
                className={`p-4 rounded-lg border text-left transition-colors ${
                  currentView === view.value
                    ? 'border-blue-500 bg-blue-50 text-blue-700'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="font-medium">{view.label}</div>
                <div className="text-sm text-gray-500 mt-1">{view.description}</div>
              </button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Content based on selected view */}
      {currentView === 'projects' && (
        <div className="space-y-8">
          {showProjectForm ? (
            <ProjectForm
              project={editingProject}
              onSubmit={handleProjectSubmit}
              onCancel={handleProjectCancel}
            />
          ) : (
            <>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle>Gestión de Proyectos</CardTitle>
                  <Button onClick={handleCreateProject} variant="primary">
                    ➕ Crear Proyecto
                  </Button>
                </CardHeader>
              </Card>
              
              <ProjectList
                onEdit={handleEditProject}
                refreshTrigger={projectRefreshTrigger}
              />
            </>
          )}
        </div>
      )}

      {currentView === 'images' && (
        <div className="space-y-8">
          {/* Category Selection for Images */}
          <Card>
            <CardHeader>
              <CardTitle>Gestión de Imágenes por Categoría</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
                {categories.map((category) => (
                  <button
                    key={category.value}
                    onClick={() => setSelectedCategory(category.value)}
                    className={`p-4 rounded-lg border text-left transition-colors ${
                      selectedCategory === category.value
                        ? 'border-blue-500 bg-blue-50 text-blue-700'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="font-medium">{category.label}</div>
                    <div className="text-sm text-gray-500 mt-1">{category.description}</div>
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>
          {/* Upload Section */}
          <Card>
            <CardHeader>
              <CardTitle>Subir Imágenes a &quot;{categories.find(c => c.value === selectedCategory)?.label}&quot;</CardTitle>
            </CardHeader>
            <CardContent>
              <ImageUpload
                category={selectedCategory}
                onUploadComplete={handleUploadComplete}
                onUploadStart={handleUploadStart}
                maxFiles={20}
              />
            </CardContent>
          </Card>

          {/* Images Gallery */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>
                Imágenes Actuales ({images.length})
              </CardTitle>
              <Button
                onClick={loadImages}
                disabled={loading}
                variant="outline"
                size="sm"
              >
                {loading ? 'Cargando...' : 'Actualizar'}
              </Button>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="text-center py-8">
                  <div className="inline-flex items-center px-4 py-2 bg-gray-50 text-gray-700 rounded-lg">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-gray-700" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Cargando imágenes...
                  </div>
                </div>
              ) : images.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  No hay imágenes en esta categoría. ¡Sube algunas arriba!
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {images.map((image) => (
                    <div key={image.path} className="group relative bg-white border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                      <div className="aspect-square bg-gray-100 relative">
                        <Image
                          src={image.url}
                          alt={image.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      
                      <div className="p-3">
                        <div className="text-sm font-medium text-gray-900 truncate" title={image.name}>
                          {image.name}
                        </div>
                        {image.size && (
                          <div className="text-xs text-gray-500 mt-1">
                            {(image.size / 1024 / 1024).toFixed(2)} MB
                          </div>
                        )}
                        
                        <div className="flex gap-2 mt-3">
                          <Button
                            onClick={() => copyUrl(image.url)}
                            variant="outline"
                            size="sm"
                            className="flex-1 text-xs"
                          >
                            Copiar URL
                          </Button>
                          <Button
                            onClick={() => deleteImage(image.path)}
                            variant="outline"
                            size="sm"
                            className="text-red-600 hover:bg-red-50 border-red-200"
                          >
                            🗑️
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      )}

      {currentView === 'services' && (
        <Card>
          <CardHeader>
            <CardTitle>🔧 Gestión de Servicios</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center py-8 text-gray-500">
              <p>Gestión de servicios - Próximamente disponible</p>
              <p className="text-sm mt-2">Actualmente puedes gestionar servicios a través de la base de datos</p>
            </div>
          </CardContent>
        </Card>
      )}

      {currentView === 'analytics' && (
        <Card>
          <CardHeader>
            <CardTitle>📊 Estadísticas</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center py-8 text-gray-500">
              <p>Panel de estadísticas - Próximamente disponible</p>
              <p className="text-sm mt-2">Visualización de métricas del sitio web</p>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Instructions */}
      <Card className="mt-8">
        <CardHeader>
          <CardTitle>📝 Instrucciones de Uso</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-sm text-gray-600">
          <p><strong>1. Configuración:</strong> Asegúrate de tener configuradas las variables de entorno en .env.local</p>
          <p><strong>2. Organización:</strong> Las imágenes se organizan automáticamente en carpetas por categoría</p>
          <p><strong>3. URLs:</strong> Una vez subidas, puedes copiar las URLs para usar en tu aplicación</p>
          <p><strong>4. Formatos:</strong> Se admiten JPG, PNG, WEBP hasta 10MB por imagen</p>
          <p><strong>5. Eliminación:</strong> Ten cuidado al eliminar, no se puede deshacer</p>
        </CardContent>
      </Card>

      {/* Diagnostic Tool */}
      <div className="mt-8">
        <SupabaseDiagnostic />
      </div>
    </div>
  )
} 
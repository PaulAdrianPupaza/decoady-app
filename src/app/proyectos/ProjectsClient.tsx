'use client'

import { useState, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import Image from 'next/image'
import Link from 'next/link'
import { Project, ProjectCategory, ProjectStatus } from '@/types'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import Button from '@/components/ui/Button'
import { formatDate } from '@/lib/utils'

interface ProjectsClientProps {
  initialProjects: Project[]
}

type FilterType = 'all' | ProjectCategory
type StatusFilter = 'all' | ProjectStatus

export default function ProjectsClient({ initialProjects }: ProjectsClientProps) {
  const { t } = useTranslation()
  const [searchTerm, setSearchTerm] = useState('')
  const [categoryFilter, setCategoryFilter] = useState<FilterType>('all')
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('all')
  const [sortBy, setSortBy] = useState<'date' | 'title'>('date')

  const categories = [
    { value: 'all' as FilterType, label: 'Todas las Categorías', count: initialProjects.length },
    { value: 'residential' as FilterType, label: 'Residencial', count: initialProjects.filter(p => p.category === 'residential').length },
    { value: 'commercial' as FilterType, label: 'Comercial', count: initialProjects.filter(p => p.category === 'commercial').length },
    { value: 'industrial' as FilterType, label: 'Industrial', count: initialProjects.filter(p => p.category === 'industrial').length },
    { value: 'renovation' as FilterType, label: 'Reforma', count: initialProjects.filter(p => p.category === 'renovation').length },
    { value: 'infrastructure' as FilterType, label: 'Infraestructura', count: initialProjects.filter(p => p.category === 'infrastructure').length },
  ]

  const statuses = [
    { value: 'all' as StatusFilter, label: 'Todos los Estados' },
    { value: 'completed' as StatusFilter, label: 'Completados' },
    { value: 'in-progress' as StatusFilter, label: 'En Progreso' },
    { value: 'planning' as StatusFilter, label: 'Planificación' },
  ]

  const filteredAndSortedProjects = useMemo(() => {
    const filtered = initialProjects.filter(project => {
      const matchesSearch = project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           (project.location && project.location.toLowerCase().includes(searchTerm.toLowerCase()))
      
      const matchesCategory = categoryFilter === 'all' || project.category === categoryFilter
      const matchesStatus = statusFilter === 'all' || project.status === statusFilter
      
      return matchesSearch && matchesCategory && matchesStatus
    })

    // Sort projects
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'title':
          return a.title.localeCompare(b.title)
        case 'date':
        default:
          const dateA = a.completion_date || a.created_at
          const dateB = b.completion_date || b.created_at
          return new Date(dateB).getTime() - new Date(dateA).getTime()
      }
    })

    return filtered
  }, [initialProjects, searchTerm, categoryFilter, statusFilter, sortBy])

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
    <div className="space-y-8">
      {/* Filters Section */}
      <Card>
        <CardHeader>
          <CardTitle>Filtrar Proyectos</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {/* Search */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Buscar
              </label>
              <input
                type="text"
                placeholder="Buscar por nombre, descripción o ubicación..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Category Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Categoría
              </label>
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <button
                    key={category.value}
                    onClick={() => setCategoryFilter(category.value)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                      categoryFilter === category.value
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {category.label} ({category.count})
                  </button>
                ))}
              </div>
            </div>

            {/* Status and Sort */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Estado
                </label>
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value as StatusFilter)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {statuses.map((status) => (
                    <option key={status.value} value={status.value}>
                      {status.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Ordenar por
                </label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as 'date' | 'title')}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="date">Fecha más reciente</option>
                  <option value="title">Nombre (A-Z)</option>
                </select>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Results Summary */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">
          {filteredAndSortedProjects.length} proyecto{filteredAndSortedProjects.length !== 1 ? 's' : ''} encontrado{filteredAndSortedProjects.length !== 1 ? 's' : ''}
        </h2>
        
        {(searchTerm || categoryFilter !== 'all' || statusFilter !== 'all') && (
          <Button
            onClick={() => {
              setSearchTerm('')
              setCategoryFilter('all')
              setStatusFilter('all')
            }}
            variant="outline"
            size="sm"
          >
            Limpiar filtros
          </Button>
        )}
      </div>

      {/* Projects Grid */}
      {filteredAndSortedProjects.length === 0 ? (
        <Card>
          <CardContent className="p-12 text-center">
            <div className="text-gray-500">
              <svg className="w-16 h-16 mx-auto mb-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0120 12a8 8 0 01-8 8 8 8 0 01-8-8 8 8 0 018-8 7.962 7.962 0 015.291 2z" />
              </svg>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No se encontraron proyectos</h3>
              <p className="text-gray-500">Intenta ajustar los filtros para ver más resultados</p>
            </div>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredAndSortedProjects.map((project) => (
            <Link key={project.id} href={`/proyectos/${project.id}`} className="block h-full">
              <Card className="group overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer h-full flex flex-col">
                <div className="relative h-64 overflow-hidden">
                  <Image
                    src={project.main_image || "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"}
                    alt={project.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  
                  {/* Badges */}
                  <div className="absolute top-4 left-4 flex gap-2">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(project.status)}`}>
                      {getStatusLabel(project.status)}
                    </span>
                    {project.featured && (
                      <span className="bg-amber-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                        ⭐ {t('projects.featured')}
                      </span>
                    )}
                  </div>

                  {/* Category */}
                  <div className="absolute bottom-4 left-4">
                    <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-medium">
                      {getCategoryLabel(project.category)}
                    </span>
                  </div>

                  {/* Image count */}
                  {project.images && project.images.length > 0 && (
                    <div className="absolute top-4 right-4 bg-black bg-opacity-50 text-white px-2 py-1 rounded text-xs">
                      📷 {project.images.length}
                    </div>
                  )}
                </div>

                <CardContent className="p-6 flex-1 flex flex-col">
                  <div className="flex-1">
                    <CardTitle className="mb-3 line-clamp-2">{project.title}</CardTitle>
                    <p className="text-gray-600 mb-4 line-clamp-3">{project.description}</p>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between items-center text-sm text-gray-500">
                      <span className="flex items-center">
                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        </svg>
                        {project.location || 'Sin ubicación'}
                      </span>
                    </div>
                    
                    {project.completion_date && (
                      <div className="text-sm text-gray-500">
                        Completado: {formatDate(project.completion_date)}
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
} 
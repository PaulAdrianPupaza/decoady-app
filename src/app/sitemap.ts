import type { MetadataRoute } from 'next'
import { DatabaseService } from '@/services/databaseService'
import { projects as mockProjects } from '@/data/mockData'

export const dynamic = 'force-static'
export const revalidate = false

function getBaseUrl(): string {
  const envUrl = process.env.NEXT_PUBLIC_SITE_URL || process.env.SITE_URL
  if (envUrl) return envUrl.replace(/\/$/, '')
  // Fallback to known deployment URL
  return 'https://decoady.netlify.app'
}

async function getAllProjectIds(): Promise<string[]> {
  try {
    const projects = await DatabaseService.getAllProjects()
    if (projects && projects.length > 0) {
      return projects.map(p => p.id)
    }
  } catch {
    // ignore
  }
  // Fallback to mock data (typed)
  const mockIds = Array.isArray(mockProjects) ? mockProjects.map(p => p.id) : []
  return mockIds
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = getBaseUrl()
  const now = new Date()

  const staticEntries: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}/`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${baseUrl}/proyectos/`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/contacto/`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.6,
    },
  ]

  const projectIds = await getAllProjectIds()
  const projectEntries: MetadataRoute.Sitemap = projectIds.map((projectId) => ({
    url: `${baseUrl}/proyectos/${projectId}/`,
    lastModified: now,
    changeFrequency: 'monthly',
    priority: 0.8,
  }))

  return [...staticEntries, ...projectEntries]
}



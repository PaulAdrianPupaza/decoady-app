import { supabase } from '@/lib/supabase'
import { Project, ProjectImage, ProjectFeature, ProjectCategory, ProjectStatus, CreateProjectData, Service, ServiceCategory } from '@/types'

export class DatabaseService {
  
  // ===== PROJECTS CRUD =====
  
  static async getAllProjects(): Promise<Project[]> {
    try {
      const { data, error } = await supabase
        .from('projects')
        .select(`
          *,
          images:project_images(*),
          features:project_features(*)
        `)
        .order('created_at', { ascending: false })

      if (error) throw error

      return data?.map(this.transformProject) || []
    } catch (error) {
      console.error('Error fetching projects:', error)
      return []
    }
  }

  static async getFeaturedProjects(limit?: number): Promise<Project[]> {
    try {
      let query = supabase
        .from('projects')
        .select(`
          *,
          images:project_images(*),
          features:project_features(*)
        `)
        .eq('featured', true)
        .order('created_at', { ascending: false })

      if (limit) {
        query = query.limit(limit)
      }

      const { data, error } = await query

      if (error) throw error

      return data?.map(this.transformProject) || []
    } catch (error) {
      console.error('Error fetching featured projects:', error)
      return []
    }
  }

  static async getProject(id: string): Promise<Project | null> {
    try {
      const { data, error } = await supabase
        .from('projects')
        .select(`
          *,
          images:project_images(*),
          features:project_features(*)
        `)
        .eq('id', id)
        .single()

      if (error) throw error

      return data ? this.transformProject(data) : null
    } catch (error) {
      console.error('Error fetching project:', error)
      return null
    }
  }

  static async createProject(projectData: CreateProjectData): Promise<Project | null> {
    try {
      console.log('Creating project:', projectData)

      // Insert project
      const { data: project, error: projectError } = await supabase
        .from('projects')
        .insert([{
          title: projectData.title,
          description: projectData.description,
          category: projectData.category,
          status: projectData.status,
          location: projectData.location,
          start_date: projectData.start_date,
          completion_date: projectData.completion_date,
          featured: projectData.featured || false
        }])
        .select()
        .single()

      if (projectError) throw projectError

      // Insert features if provided
      if (projectData.features && projectData.features.length > 0) {
        const features = projectData.features.map((feature, index) => ({
          project_id: project.id,
          feature,
          sort_order: index
        }))

        const { error: featuresError } = await supabase
          .from('project_features')
          .insert(features)

        if (featuresError) {
          console.error('Error inserting features:', featuresError)
        }
      }

      // Fetch the complete project with relations
      return await this.getProject(project.id)
    } catch (error) {
      console.error('Error creating project:', error)
      return null
    }
  }

  static async updateProject(id: string, projectData: Partial<CreateProjectData>): Promise<Project | null> {
    try {
      const { error } = await supabase
        .from('projects')
        .update({
          title: projectData.title,
          description: projectData.description,
          category: projectData.category,
          status: projectData.status,
          location: projectData.location,
          start_date: projectData.start_date,
          completion_date: projectData.completion_date,
          featured: projectData.featured
        })
        .eq('id', id)
        .select()
        .single()

      if (error) throw error

      // Update features if provided
      if (projectData.features) {
        // Delete existing features
        await supabase
          .from('project_features')
          .delete()
          .eq('project_id', id)

        // Insert new features
        if (projectData.features.length > 0) {
          const features = projectData.features.map((feature, index) => ({
            project_id: id,
            feature,
            sort_order: index
          }))

          await supabase
            .from('project_features')
            .insert(features)
        }
      }

      return await this.getProject(id)
    } catch (error) {
      console.error('Error updating project:', error)
      return null
    }
  }

  static async deleteProject(id: string): Promise<boolean> {
    try {
      const { error } = await supabase
        .from('projects')
        .delete()
        .eq('id', id)

      if (error) throw error

      return true
    } catch (error) {
      console.error('Error deleting project:', error)
      return false
    }
  }

  // ===== PROJECT IMAGES =====

  static async addProjectImage(projectId: string, imagePath: string, imageUrl: string, isMain: boolean = false, altText?: string): Promise<ProjectImage | null> {
    try {
      // If this is the main image, unset other main images for this project
      if (isMain) {
        await supabase
          .from('project_images')
          .update({ is_main: false })
          .eq('project_id', projectId)
          .eq('is_main', true)
      }

      const { data, error } = await supabase
        .from('project_images')
        .insert([{
          project_id: projectId,
          image_path: imagePath,
          image_url: imageUrl,
          is_main: isMain,
          alt_text: altText
        }])
        .select()
        .single()

      if (error) throw error

      return data
    } catch (error) {
      console.error('Error adding project image:', error)
      return null
    }
  }

  static async removeProjectImage(imageId: string): Promise<boolean> {
    try {
      const { error } = await supabase
        .from('project_images')
        .delete()
        .eq('id', imageId)

      if (error) throw error

      return true
    } catch (error) {
      console.error('Error removing project image:', error)
      return false
    }
  }

  static async setMainImage(projectId: string, imageId: string): Promise<boolean> {
    try {
      // Unset all main images for this project
      await supabase
        .from('project_images')
        .update({ is_main: false })
        .eq('project_id', projectId)

      // Set the new main image
      const { error } = await supabase
        .from('project_images')
        .update({ is_main: true })
        .eq('id', imageId)

      if (error) throw error

      return true
    } catch (error) {
      console.error('Error setting main image:', error)
      return false
    }
  }

  // ===== SERVICES CRUD =====

  static async getAllServices(): Promise<Service[]> {
    try {
      const { data, error } = await supabase
        .from('services')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) throw error

      return data?.map(this.transformService) || []
    } catch (error) {
      console.error('Error fetching services:', error)
      return []
    }
  }

  static async getFeaturedServices(limit?: number): Promise<Service[]> {
    try {
      let query = supabase
        .from('services')
        .select('*')
        .eq('featured', true)
        .order('created_at', { ascending: false })

      if (limit) {
        query = query.limit(limit)
      }

      const { data, error } = await query

      if (error) throw error

      return data?.map(this.transformService) || []
    } catch (error) {
      console.error('Error fetching featured services:', error)
      return []
    }
  }

  // ===== HELPER METHODS =====

  private static transformProject(data: Record<string, unknown>): Project {
    return {
      id: data.id as string,
      title: data.title as string,
      description: data.description as string,
      category: data.category as ProjectCategory,
      status: data.status as ProjectStatus,
      location: data.location as string,
      featured: data.featured as boolean,
      created_at: new Date(data.created_at as string),
      updated_at: new Date(data.updated_at as string),
      start_date: data.start_date ? new Date(data.start_date as string) : undefined,
      completion_date: data.completion_date ? new Date(data.completion_date as string) : undefined,
      images: (data.images as ProjectImage[]) || [],
      features: (data.features as ProjectFeature[]) || [],
      main_image: Array.isArray(data.images) && data.images.length > 0 
        ? (data.images[0] as Record<string, unknown>)?.image_url as string || undefined
        : undefined
    }
  }

  private static transformService(data: Record<string, unknown>): Service {
    return {
      id: data.id as string,
      name: data.name as string,
      description: data.description as string,
      icon: data.icon as string,
      category: data.category as ServiceCategory,
      featured: data.featured as boolean,
      created_at: new Date(data.created_at as string),
      updated_at: new Date(data.updated_at as string),
      features: (data.features as string[]) || []
    }
  }

  // ===== TESTING METHODS =====

  static async testConnection(): Promise<boolean> {
    try {
      const { error } = await supabase
        .from('projects')
        .select('count')
        .limit(1)

      return !error
    } catch (error) {
      console.error('Database connection test failed:', error)
      return false
    }
  }
} 
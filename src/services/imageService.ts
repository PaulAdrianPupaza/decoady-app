import { getPublicUrl, uploadImage, deleteImage as deleteImageFromSupabase, listImages } from '@/lib/supabase'

export type ImageCategory = 'projects' | 'services' | 'team' | 'hero' | 'testimonials'

export interface ImageUploadResult {
  success: boolean
  path?: string
  url?: string
  error?: string
}

// Helper function to sanitize file names
const sanitizeFileName = (fileName: string): string => {
  // Remove or replace problematic characters
  return fileName
    .replace(/\s+/g, '_') // Replace spaces with underscores
    .replace(/[^a-zA-Z0-9._-]/g, '') // Remove special characters except . _ -
    .replace(/_{2,}/g, '_') // Replace multiple underscores with single
    .toLowerCase() // Convert to lowercase
    .substring(0, 100) // Limit length
}

export class ImageService {
  
  // Upload image to specific category folder
  static async uploadToCategory(
    file: File, 
    category: ImageCategory, 
    fileName?: string
  ): Promise<ImageUploadResult> {
    try {
      console.log(`📤 Starting upload process:`, {
        originalName: file.name,
        size: `${(file.size / 1024 / 1024).toFixed(2)}MB`,
        type: file.type,
        category: category,
        timestamp: new Date().toISOString()
      })

      // Validate file
      if (!file || file.size === 0) {
        throw new Error('Archivo inválido o vacío')
      }

      if (file.size > 10 * 1024 * 1024) { // 10MB limit
        throw new Error('El archivo es demasiado grande (máximo 10MB)')
      }

      // Validate file type
      const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp']
      if (!validTypes.includes(file.type)) {
        throw new Error('Tipo de archivo no válido. Usa JPG, PNG o WEBP')
      }
      
      // Generate and sanitize filename
      const sanitizedOriginalName = sanitizeFileName(file.name)
      const finalFileName = fileName 
        ? sanitizeFileName(fileName)
        : `${Date.now()}_${sanitizedOriginalName}`
      
      const path = `${category}/${finalFileName}`
      
      console.log(`🎯 Upload details:`, {
        originalFileName: file.name,
        sanitizedFileName: finalFileName,
        fullPath: path,
        category: category
      })

      // Check if Supabase is configured
      const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
      const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

      if (!supabaseUrl || !supabaseKey) {
        throw new Error('Supabase no está configurado. Verifica las variables de entorno en .env.local')
      }
      
      const data = await uploadImage(file, path)
      console.log(`✅ Upload successful:`, data)
      
      if (!data || !data.path) {
        throw new Error('No se recibió confirmación de la subida')
      }
      
      const url = getPublicUrl(data.path)
      console.log(`🔗 Generated public URL: ${url}`)
      
      return {
        success: true,
        path: data.path,
        url: url
      }
    } catch (error) {
      console.error(`❌ Upload failed for ${file.name}:`, {
        error: error,
        errorMessage: error instanceof Error ? error.message : 'Unknown error',
        errorStack: error instanceof Error ? error.stack : undefined,
        fileName: file.name,
        fileSize: file.size,
        fileType: file.type,
        category: category
      })
      
      let errorMessage = 'Error desconocido durante la subida'
      
      if (error instanceof Error) {
        errorMessage = error.message
        
        // Provide specific error messages based on common Supabase errors
        if (error.message.includes('Invalid API key') || error.message.includes('JWT')) {
          errorMessage = '🔑 Error de autenticación: Verifica tu SUPABASE_ANON_KEY en .env.local'
        } else if (error.message.includes('not found') || error.message.includes('The resource was not found')) {
          errorMessage = '📁 Bucket no encontrado: Crea el bucket "project-images" en Supabase Storage'
        } else if (error.message.includes('Invalid URL') || error.message.includes('fetch')) {
          errorMessage = '🌐 URL de Supabase inválida: Verifica SUPABASE_URL en .env.local'
        } else if (error.message.includes('policy') || error.message.includes('permission')) {
          errorMessage = '🚫 Sin permisos: Configura las políticas del bucket como público'
        } else if (error.message.includes('Row level security')) {
          errorMessage = '🔒 Problema de seguridad: Desactiva RLS o configura políticas públicas'
        } else if (error.message.includes('network') || error.message.includes('Failed to fetch')) {
          errorMessage = '📡 Error de conexión: Verifica tu conexión a internet'
        } else if (error.message.includes('already exists')) {
          errorMessage = '📄 El archivo ya existe. Inténtalo con otro nombre'
        }
      } else if (typeof error === 'object' && error !== null) {
        // Handle non-Error objects
        errorMessage = `Error de objeto: ${JSON.stringify(error)}`
      }
      
      return {
        success: false,
        error: errorMessage
      }
    }
  }

  // Get all images from a category
  static async getImagesByCategory(category: ImageCategory) {
    try {
      const files = await listImages(category)
      
      // Filter out non-image files and system/metadata files
      const validImageFiles = files.filter(file => {
        const fileName = file.name.toLowerCase()
        
        // Skip system/metadata files
        if (fileName.startsWith('.') || fileName.includes('placeholder') || fileName.includes('metadata')) {
          console.log(`Skipping non-image file: ${fileName}`)
          return false
        }
        
        // Only include valid image extensions
        const validExtensions = ['.jpg', '.jpeg', '.png', '.webp', '.gif', '.bmp', '.tiff']
        const hasValidExtension = validExtensions.some(ext => fileName.endsWith(ext))
        
        if (!hasValidExtension) {
          console.log(`Skipping file with invalid extension: ${fileName}`)
          return false
        }
        
        return true
      })
      
      return validImageFiles.map(file => ({
        name: file.name,
        path: `${category}/${file.name}`,
        url: getPublicUrl(`${category}/${file.name}`),
        size: file.metadata?.size,
        lastModified: file.updated_at
      }))
    } catch (error) {
      console.error(`Error getting images from ${category}:`, error)
      return []
    }
  }

  // Delete image
  static async deleteImage(path: string): Promise<boolean> {
    try {
      console.log('🗑️ Deleting image:', path)
      await deleteImageFromSupabase(path)
      console.log('✅ Image deleted successfully:', path)
      return true
    } catch (error) {
      console.error('❌ Error deleting image:', error)
      return false
    }
  }

  // Get direct URL for existing image path
  static getImageUrl(path: string): string {
    return getPublicUrl(path)
  }

  // Upload multiple images at once
  static async uploadMultiple(
    files: File[], 
    category: ImageCategory
  ): Promise<ImageUploadResult[]> {
    const results = await Promise.all(
      files.map(file => this.uploadToCategory(file, category))
    )
    return results
  }

  // Predefined paths for common image types
  static readonly PATHS = {
    // Hero/Banner images
    HERO_MAIN: 'hero/main-banner.jpg',
    HERO_ABOUT: 'hero/about-banner.jpg',
    HERO_SERVICES: 'hero/services-banner.jpg',
    HERO_PROJECTS: 'hero/projects-banner.jpg',
    HERO_CONTACT: 'hero/contact-banner.jpg',
    
    // Default service images
    SERVICE_CONSTRUCTION: 'services/construction.jpg',
    SERVICE_RENOVATION: 'services/renovation.jpg',
    SERVICE_DESIGN: 'services/design.jpg',
    SERVICE_MAINTENANCE: 'services/maintenance.jpg',
    
    // Team placeholder
    TEAM_PLACEHOLDER: 'team/placeholder.jpg',
    
    // Company logo
    LOGO: 'hero/logo.png',
    LOGO_WHITE: 'hero/logo-white.png'
  } as const

  // Get URL for predefined paths
  static getCommonImageUrl(pathKey: keyof typeof ImageService.PATHS): string {
    return getPublicUrl(ImageService.PATHS[pathKey])
  }

  // Get first available image from a category (for homepage)
  static async getFirstImageFromCategory(category: ImageCategory): Promise<string | null> {
    try {
      const images = await this.getImagesByCategory(category)
      return images.length > 0 ? images[0].url : null
    } catch (error) {
      console.error(`Error getting first image from ${category}:`, error)
      return null
    }
  }

  // Get multiple random images from a category
  static async getRandomImagesFromCategory(category: ImageCategory, count: number = 3): Promise<string[]> {
    try {
      const images = await this.getImagesByCategory(category)
      if (images.length === 0) return []
      
      // Shuffle and take first 'count' images
      const shuffled = images.sort(() => Math.random() - 0.5)
      return shuffled.slice(0, count).map(img => img.url)
    } catch (error) {
      console.error(`Error getting random images from ${category}:`, error)
      return []
    }
  }

  // Get image URL with fallback to Unsplash
  static getImageWithFallback(supabasePath?: string, unsplashUrl?: string): string {
    if (supabasePath) {
      return getPublicUrl(supabasePath)
    }
    return unsplashUrl || 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
  }

  // Get all hero images for carousel
  static async getHeroImages(): Promise<string[]> {
    try {
      const images = await this.getImagesByCategory('hero')
      return images.map(img => img.url)
    } catch (error) {
      console.error('Error getting hero images:', error)
      return []
    }
  }
} 
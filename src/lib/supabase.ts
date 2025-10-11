import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

// Debug: Log configuration (remove in production)
console.log('🔧 Supabase Config Check:')
console.log('URL:', supabaseUrl ? '✅ Configured' : '❌ Missing')
console.log('Key:', supabaseAnonKey ? '✅ Configured' : '❌ Missing')

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('❌ SUPABASE NOT CONFIGURED: Check your .env.local file')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Storage bucket name
export const BUCKET_NAME = 'project-images'

// Helper function to get public URL for an image
export const getPublicUrl = (path: string) => {
  const { data } = supabase.storage.from(BUCKET_NAME).getPublicUrl(path)
  return data.publicUrl
}

// Helper function to upload image
export const uploadImage = async (file: File, path: string) => {
  console.log(`🔄 Starting upload to Supabase:`, {
    fileName: file.name,
    fileSize: file.size,
    fileType: file.type,
    targetPath: path,
    bucketName: BUCKET_NAME
  })

  try {
    const { data, error } = await supabase.storage
      .from(BUCKET_NAME)
      .upload(path, file, {
        cacheControl: '3600',
        upsert: false // Don't overwrite existing files
      })

    if (error) {
      console.error('❌ Supabase upload error details:', {
        message: error.message,
        details: error,
        path: path,
        fileName: file.name
      })
      throw error
    }

    console.log('✅ Supabase upload successful:', data)
    return data
  } catch (err) {
    console.error('❌ Unexpected upload error:', err)
    throw err
  }
}

// Helper function to delete image
export const deleteImage = async (path: string) => {
  const { data, error } = await supabase.storage
    .from(BUCKET_NAME)
    .remove([path])

  if (error) {
    throw error
  }

  return data
}

// Helper function to list images in a folder
export const listImages = async (folderPath: string = '') => {
  const { data, error } = await supabase.storage
    .from(BUCKET_NAME)
    .list(folderPath)

  if (error) {
    throw error
  }

  return data
} 
'use client'

import { useState, useRef, DragEvent, ChangeEvent } from 'react'
import Image from 'next/image'
import { ImageService, ImageCategory, ImageUploadResult } from '@/services/imageService'
import Button from './Button'

interface ImageUploadProps {
  category: ImageCategory
  onUploadComplete?: (results: ImageUploadResult[]) => void
  onUploadStart?: () => void
  maxFiles?: number
  acceptedTypes?: string[]
  className?: string
}

interface PreviewImage {
  file: File
  url: string
  id: string
}

export default function ImageUpload({
  category,
  onUploadComplete,
  onUploadStart,
  maxFiles = 10,
  acceptedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'],
  className = ''
}: ImageUploadProps) {
  const [previews, setPreviews] = useState<PreviewImage[]>([])
  const [uploading, setUploading] = useState(false)
  const [isDragOver, setIsDragOver] = useState(false)
  const [uploadProgress, setUploadProgress] = useState<string>('')
  const [errors, setErrors] = useState<string[]>([])
  const fileInputRef = useRef<HTMLInputElement>(null)

  const generateId = () => Math.random().toString(36).substr(2, 9)

  const handleFiles = (files: FileList | File[]) => {
    const fileArray = Array.from(files)
    
    // Filter valid files
    const validFiles = fileArray.filter(file => 
      acceptedTypes.includes(file.type) && file.size <= 10 * 1024 * 1024 // 10MB max
    )

    // Limit number of files
    const limitedFiles = validFiles.slice(0, maxFiles - previews.length)

    // Create previews
    const newPreviews: PreviewImage[] = limitedFiles.map(file => ({
      file,
      url: URL.createObjectURL(file),
      id: generateId()
    }))

    setPreviews(prev => [...prev, ...newPreviews])
  }

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setIsDragOver(true)
  }

  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setIsDragOver(false)
  }

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setIsDragOver(false)
    
    const files = e.dataTransfer.files
    handleFiles(files)
  }

  const handleFileInput = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files) {
      handleFiles(files)
    }
  }

  const removePreview = (id: string) => {
    setPreviews(prev => {
      const updated = prev.filter(p => p.id !== id)
      // Cleanup object URLs
      const removed = prev.find(p => p.id === id)
      if (removed) {
        URL.revokeObjectURL(removed.url)
      }
      return updated
    })
  }

  const uploadImages = async () => {
    if (previews.length === 0) return

    setUploading(true)
    setErrors([])
    setUploadProgress('Preparando subida...')
    onUploadStart?.()

    try {
      const files = previews.map(p => p.file)
      console.log(`🚀 Starting upload of ${files.length} files to category: ${category}`)
      
      setUploadProgress(`Subiendo ${files.length} imagen${files.length > 1 ? 'es' : ''}...`)
      
      // Upload files one by one for better progress tracking
      const results: ImageUploadResult[] = []
      const uploadErrors: string[] = []
      
      for (let i = 0; i < files.length; i++) {
        const file = files[i]
        setUploadProgress(`Subiendo ${i + 1}/${files.length}: ${file.name}`)
        
        try {
          const result = await ImageService.uploadToCategory(file, category)
          results.push(result)
          
          if (!result.success) {
            const errorMsg = `❌ ${file.name}: ${result.error || 'Error desconocido'}`
            uploadErrors.push(errorMsg)
            console.error(`Upload failed for ${file.name}:`, result.error)
          } else {
            console.log(`✅ Successfully uploaded ${file.name} to ${result.url}`)
          }
        } catch (error) {
          console.error(`Unexpected error uploading ${file.name}:`, {
            error,
            fileName: file.name,
            fileSize: file.size,
            fileType: file.type,
            category
          })
          
          const errorMessage = error instanceof Error ? error.message : 'Error inesperado'
          uploadErrors.push(`❌ ${file.name}: ${errorMessage}`)
          results.push({
            success: false,
            error: errorMessage
          })
        }
      }
      
      setErrors(uploadErrors)
      onUploadComplete?.(results)
      
      const successful = results.filter(r => r.success).length
      if (successful > 0) {
        setUploadProgress(`✅ ${successful} imagen${successful > 1 ? 'es' : ''} subida${successful > 1 ? 's' : ''} correctamente`)
        
        // Clear previews after successful upload
        previews.forEach(preview => URL.revokeObjectURL(preview.url))
        setPreviews([])
        
        // Reset file input
        if (fileInputRef.current) {
          fileInputRef.current.value = ''
        }
      } else {
        setUploadProgress('❌ No se pudo subir ninguna imagen')
      }
      
    } catch (error) {
      console.error('Upload error:', error)
      setUploadProgress('❌ Error durante la subida')
      setErrors([`Error general: ${error instanceof Error ? error.message : 'Error desconocido'}`])
    } finally {
      setUploading(false)
      setTimeout(() => {
        setUploadProgress('')
        setErrors([])
      }, 10000) // Clear messages after 10 seconds
    }
  }

  const openFileDialog = () => {
    fileInputRef.current?.click()
  }

  return (
    <div className={`space-y-4 ${className}`}>
      {/* Upload Area */}
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={openFileDialog}
        className={`
          border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors
          ${isDragOver 
            ? 'border-blue-500 bg-blue-50' 
            : 'border-gray-300 hover:border-gray-400'
          }
          ${uploading ? 'pointer-events-none opacity-50' : ''}
        `}
      >
        <div className="space-y-2">
          <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48">
            <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <div className="text-sm text-gray-600">
            <span className="font-medium text-blue-600">Haz clic para subir</span> o arrastra las imágenes aquí
          </div>
          <p className="text-xs text-gray-500">
            PNG, JPG, WEBP hasta 10MB cada una (máx. {maxFiles} archivos)
          </p>
        </div>
      </div>

      {/* Hidden file input */}
      <input
        ref={fileInputRef}
        type="file"
        multiple
        accept={acceptedTypes.join(',')}
        onChange={handleFileInput}
        className="hidden"
      />

      {/* Preview Grid */}
      {previews.length > 0 && (
        <div className="space-y-4">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {previews.map((preview) => (
              <div key={preview.id} className="relative group">
                <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
                  <Image
                    src={preview.url}
                    alt="Preview"
                    fill
                    className="object-cover"
                  />
                </div>
                <button
                  onClick={() => removePreview(preview.id)}
                  className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  ×
                </button>
                <div className="absolute bottom-2 left-2 right-2 bg-black bg-opacity-50 text-white text-xs p-1 rounded truncate">
                  {preview.file.name}
                </div>
              </div>
            ))}
          </div>

          {/* Upload Button */}
          <div className="flex justify-center">
            <Button
              onClick={uploadImages}
              disabled={uploading}
              variant="primary"
              className="px-8"
            >
              {uploading ? 'Subiendo...' : `Subir ${previews.length} imagen${previews.length > 1 ? 'es' : ''}`}
            </Button>
          </div>
        </div>
      )}

      {/* Upload Status */}
      {(uploading || uploadProgress) && (
        <div className="text-center space-y-2">
          <div className={`inline-flex items-center px-4 py-2 rounded-lg ${
            uploadProgress.includes('❌') ? 'bg-red-50 text-red-700' :
            uploadProgress.includes('✅') ? 'bg-green-50 text-green-700' :
            'bg-blue-50 text-blue-700'
          }`}>
            {uploading && (
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            )}
            {uploadProgress || 'Subiendo imágenes a Supabase...'}
          </div>
        </div>
      )}

      {/* Errors */}
      {errors.length > 0 && (
        <div className="space-y-2">
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <h4 className="font-medium text-red-800 mb-2">⚠️ Errores durante la subida:</h4>
            <ul className="space-y-1 text-sm text-red-700">
              {errors.map((error, index) => (
                <li key={index} className="flex items-start">
                  <span className="inline-block w-2 h-2 bg-red-400 rounded-full mt-2 mr-2 flex-shrink-0"></span>
                  {error}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  )
} 
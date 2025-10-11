'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import Button from '@/components/ui/Button'

interface ProjectGalleryProps {
  images: string[]
}

export default function ProjectGallery({ images }: ProjectGalleryProps) {
  const [selectedImage, setSelectedImage] = useState<number | null>(null)

  const openLightbox = (index: number) => {
    setSelectedImage(index)
  }

  const closeLightbox = () => {
    setSelectedImage(null)
    if (typeof window !== 'undefined') {
      const urlWithoutHash = window.location.pathname + window.location.search
      history.replaceState(null, '', urlWithoutHash)
    }
  }

  const nextImage = () => {
    if (selectedImage !== null) {
      setSelectedImage((selectedImage + 1) % images.length)
    }
  }

  const prevImage = () => {
    if (selectedImage !== null) {
      setSelectedImage((selectedImage - 1 + images.length) % images.length)
    }
  }

  // Open lightbox when navigating with #lightbox (used by hero main image link)
  useEffect(() => {
    if (typeof window === 'undefined') return
    const maybeOpen = () => {
      if (window.location.hash === '#lightbox') {
        setSelectedImage(0)
      }
    }
    maybeOpen()
    const onHashChange = () => maybeOpen()
    window.addEventListener('hashchange', onHashChange)
    return () => window.removeEventListener('hashchange', onHashChange)
  }, [])

  if (!images || images.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        <svg className="w-16 h-16 mx-auto mb-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
        <p>No hay imágenes disponibles para este proyecto</p>
      </div>
    )
  }

  return (
    <>
      <div className="space-y-6">
        {/* Main Image */}
        {images.length > 0 && (
          <div
            className="relative aspect-video overflow-hidden rounded-lg cursor-pointer group"
            onClick={() => openLightbox(0)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault()
                openLightbox(0)
              }
            }}
          >
            <Image
              src={images[0]}
              alt="Imagen principal del proyecto"
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-opacity duration-300 flex items-center justify-center">
              <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                </svg>
              </div>
            </div>
            {images.length > 1 && (
              <div className="absolute top-4 right-4 bg-black bg-opacity-50 text-white px-2 py-1 rounded text-sm">
                1 / {images.length}
              </div>
            )}
          </div>
        )}

        {/* Thumbnail Grid */}
        {images.length > 1 && (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {images.slice(1).map((image, index) => (
              <div
                key={index + 1}
                className="relative aspect-square overflow-hidden rounded-lg cursor-pointer group"
                onClick={() => openLightbox(index + 1)}
              >
                <Image
                  src={image}
                  alt={`Imagen ${index + 2} del proyecto`}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-opacity duration-300 flex items-center justify-center">
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                    </svg>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* View All Button */}
        {images.length > 8 && (
          <div className="text-center">
            <Button 
              variant="outline" 
              onClick={() => openLightbox(0)}
              className="px-6 py-2"
            >
              Ver todas las imágenes ({images.length})
            </Button>
          </div>
        )}
      </div>

      {/* Lightbox Modal */}
      {selectedImage !== null && (
        <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4">
          <div className="relative max-w-7xl max-h-full w-full h-full flex items-center justify-center">
            {/* Close Button */}
            <button
              onClick={closeLightbox}
              className="absolute top-4 right-4 z-10 text-white hover:text-gray-300 transition-colors"
              aria-label="Cerrar galería"
            >
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Image */}
            <div className="relative w-full h-full max-w-5xl max-h-[90vh]">
              <Image
                src={images[selectedImage]}
                alt={`Imagen ${selectedImage + 1} del proyecto`}
                fill
                className="object-contain"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 70vw"
              />
            </div>

            {/* Navigation */}
            {images.length > 1 && (
              <>
                {/* Previous Button */}
                <button
                  onClick={prevImage}
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white hover:text-gray-300 transition-colors p-2"
                  aria-label="Imagen anterior"
                >
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>

                {/* Next Button */}
                <button
                  onClick={nextImage}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white hover:text-gray-300 transition-colors p-2"
                  aria-label="Siguiente imagen"
                >
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>

                {/* Image Counter */}
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-50 text-white px-4 py-2 rounded">
                  {selectedImage + 1} / {images.length}
                </div>
              </>
            )}

            {/* Thumbnail Strip */}
            {images.length > 1 && images.length <= 10 && (
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 max-w-full overflow-x-auto">
                {images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`relative w-16 h-16 flex-shrink-0 rounded overflow-hidden ${
                      index === selectedImage ? 'ring-2 ring-white' : 'opacity-70 hover:opacity-100'
                    }`}
                  >
                    <Image
                      src={image}
                      alt={`Miniatura ${index + 1}`}
                      fill
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Click outside to close */}
          <div 
            className="absolute inset-0 -z-10" 
            onClick={closeLightbox}
          />
        </div>
      )}

      {/* Keyboard Navigation */}
      {selectedImage !== null && (
        <div
          className="fixed inset-0 pointer-events-none"
          onKeyDown={(e) => {
            if (e.key === 'ArrowLeft') prevImage()
            if (e.key === 'ArrowRight') nextImage()
            if (e.key === 'Escape') closeLightbox()
          }}
          tabIndex={-1}
        />
      )}
    </>
  )
} 
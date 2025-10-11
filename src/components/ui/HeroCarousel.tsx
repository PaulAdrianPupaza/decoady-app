'use client'

import { useEffect, useState } from 'react'

interface HeroCarouselProps {
  children: React.ReactNode
  className?: string
}

export default function HeroCarousel({ children, className = '' }: HeroCarouselProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(false)

  // Imágenes de construcción simplificadas
  const heroImages = [
    'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80',
    'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80'
  ]

  // Auto-rotate images every 5 seconds
  useEffect(() => {
    if (heroImages.length <= 1 || isPaused) return

    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => 
        prevIndex === heroImages.length - 1 ? 0 : prevIndex + 1
      )
    }, 5000) // Change every 5 seconds

    return () => clearInterval(interval)
  }, [isPaused, heroImages.length])

  const currentImage = heroImages[currentImageIndex]

  return (
    <section 
      className={`relative h-[80vh] min-h-[600px] flex items-center justify-center overflow-hidden ${className}`}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-all duration-1000"
        style={{
          backgroundImage: `url('${currentImage}')`
        }}
      />
      
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-900/70 to-blue-800/60"></div>
      
      {/* Content */}
      <div className="relative z-10 w-full">
        {children}
      </div>

      {/* Image indicators (dots) */}
      {heroImages.length > 1 && (
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10 flex space-x-2">
          {heroImages.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentImageIndex(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentImageIndex 
                  ? 'bg-white scale-125' 
                  : 'bg-white/50 hover:bg-white/75'
              }`}
              aria-label={`Ir a imagen ${index + 1}`}
            />
          ))}
        </div>
      )}
    </section>
  )
} 
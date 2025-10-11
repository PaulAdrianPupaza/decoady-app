import Link from 'next/link'
import Button from '@/components/ui/Button'
import { Card, CardContent } from '@/components/ui/Card'

export default function ProjectNotFound() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <Card className="max-w-2xl mx-auto text-center">
          <CardContent className="p-12">
            {/* 404 Icon */}
            <div className="text-gray-300 mb-8">
              <svg className="w-24 h-24 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0120 12a8 8 0 01-8 8 8 8 0 01-8-8 8 8 0 018-8 7.962 7.962 0 015.291 2z" />
              </svg>
            </div>

            {/* Error Message */}
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Proyecto no encontrado
            </h1>
            
            <p className="text-xl text-gray-600 mb-8">
              Lo sentimos, el proyecto que buscas no existe o ha sido eliminado.
            </p>

            <p className="text-gray-500 mb-8">
              Es posible que el enlace esté desactualizado o que se haya producido un error. 
              Te invitamos a explorar nuestros otros proyectos.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/proyectos">
                <Button variant="primary" size="lg" className="w-full sm:w-auto">
                  Ver Todos los Proyectos
                </Button>
              </Link>
              
              <Link href="/">
                <Button variant="outline" size="lg" className="w-full sm:w-auto">
                  Volver al Inicio
                </Button>
              </Link>
            </div>

            {/* Contact Section */}
            <div className="mt-12 pt-8 border-t border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                ¿Necesitas ayuda?
              </h3>
              <p className="text-gray-600 mb-4">
                Si llegaste aquí a través de un enlace específico, puedes contactarnos para obtener ayuda.
              </p>
              <Button variant="outline" size="sm">
                Contactar Soporte
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
} 
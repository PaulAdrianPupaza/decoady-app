'use client'

import { useState } from 'react'
import { supabase, BUCKET_NAME } from '@/lib/supabase'
import { Card, CardContent, CardHeader, CardTitle } from './Card'
import Button from './Button'

interface DiagnosticResult {
  test: string
  status: 'success' | 'error' | 'warning' | 'pending'
  message: string
  details?: string
}

export default function SupabaseDiagnostic() {
  const [results, setResults] = useState<DiagnosticResult[]>([])
  const [testing, setTesting] = useState(false)

  const runDiagnostics = async () => {
    setTesting(true)
    const diagnostics: DiagnosticResult[] = []

    // Test 1: Environment variables
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

    diagnostics.push({
      test: 'Variables de Entorno',
      status: supabaseUrl && supabaseKey ? 'success' : 'error',
      message: supabaseUrl && supabaseKey 
        ? 'Variables NEXT_PUBLIC_SUPABASE_URL y NEXT_PUBLIC_SUPABASE_ANON_KEY configuradas' 
        : 'Faltan variables de entorno en .env.local',
      details: `URL: ${supabaseUrl ? '✅ Configurada' : '❌ Falta'}, Key: ${supabaseKey ? '✅ Configurada' : '❌ Falta'}`
    })

    if (!supabaseUrl || !supabaseKey) {
      setResults(diagnostics)
      setTesting(false)
      return
    }

    // Test 2: Connection to Supabase
    try {
      const { error } = await supabase.auth.getSession()
      diagnostics.push({
        test: 'Conexión a Supabase',
        status: error ? 'error' : 'success',
        message: error ? 'Error de conexión a Supabase' : 'Conexión exitosa a Supabase',
        details: error ? error.message : 'Cliente de Supabase inicializado correctamente'
      })
    } catch (error) {
      diagnostics.push({
        test: 'Conexión a Supabase',
        status: 'error',
        message: 'Error al conectar con Supabase',
        details: error instanceof Error ? error.message : 'Error desconocido'
      })
    }

    // Test 3: Storage bucket access
    try {
      const { data, error } = await supabase.storage.from(BUCKET_NAME).list('', { limit: 1 })
      
      if (error) {
        if (error.message.includes('not found')) {
          diagnostics.push({
            test: 'Bucket de Storage',
            status: 'error',
            message: `Bucket "${BUCKET_NAME}" no encontrado`,
            details: 'Crea el bucket "project-images" en Supabase Storage'
          })
        } else if (error.message.includes('policy')) {
          diagnostics.push({
            test: 'Bucket de Storage',
            status: 'error',
            message: 'Sin permisos para acceder al bucket',
            details: 'Configura las políticas del bucket como público para lectura'
          })
        } else {
          diagnostics.push({
            test: 'Bucket de Storage',
            status: 'error',
            message: 'Error de acceso al bucket',
            details: error.message
          })
        }
      } else {
        diagnostics.push({
          test: 'Bucket de Storage',
          status: 'success',
          message: `Bucket "${BUCKET_NAME}" accesible`,
          details: `Encontrados ${data?.length || 0} elementos en la raíz`
        })
      }
    } catch (error) {
      diagnostics.push({
        test: 'Bucket de Storage',
        status: 'error',
        message: 'Error al verificar bucket',
        details: error instanceof Error ? error.message : 'Error desconocido'
      })
    }

    // Test 4: Upload permissions (simulate)
    try {
      // Try to get public URL for a test path
      const { data } = supabase.storage.from(BUCKET_NAME).getPublicUrl('test/test.jpg')
      
      if (data.publicUrl) {
        diagnostics.push({
          test: 'URLs Públicas',
          status: 'success',
          message: 'Generación de URLs públicas funcional',
          details: `URL de ejemplo: ${data.publicUrl}`
        })
      } else {
        diagnostics.push({
          test: 'URLs Públicas',
          status: 'warning',
          message: 'No se pudo generar URL pública',
          details: 'Puede ser un problema de configuración del bucket'
        })
      }
    } catch (error) {
      diagnostics.push({
        test: 'URLs Públicas',
        status: 'error',
        message: 'Error al generar URLs públicas',
        details: error instanceof Error ? error.message : 'Error desconocido'
      })
    }

    setResults(diagnostics)
    setTesting(false)
  }

  const getStatusIcon = (status: DiagnosticResult['status']) => {
    switch (status) {
      case 'success': return '✅'
      case 'error': return '❌'
      case 'warning': return '⚠️'
      case 'pending': return '⏳'
      default: return '❔'
    }
  }

  const getStatusColor = (status: DiagnosticResult['status']) => {
    switch (status) {
      case 'success': return 'text-green-700 bg-green-50 border-green-200'
      case 'error': return 'text-red-700 bg-red-50 border-red-200'
      case 'warning': return 'text-yellow-700 bg-yellow-50 border-yellow-200'
      case 'pending': return 'text-blue-700 bg-blue-50 border-blue-200'
      default: return 'text-gray-700 bg-gray-50 border-gray-200'
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>🔧 Diagnóstico de Supabase</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex justify-between items-center">
          <p className="text-gray-600">
            Verifica la configuración de Supabase para identificar problemas
          </p>
          <Button
            onClick={runDiagnostics}
            disabled={testing}
            variant="outline"
          >
            {testing ? 'Verificando...' : 'Ejecutar Diagnóstico'}
          </Button>
        </div>

        {results.length > 0 && (
          <div className="space-y-3">
            {results.map((result, index) => (
              <div
                key={index}
                className={`p-4 rounded-lg border ${getStatusColor(result.status)}`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-2">
                    <span className="text-lg">{getStatusIcon(result.status)}</span>
                    <div>
                      <h4 className="font-medium">{result.test}</h4>
                      <p className="text-sm">{result.message}</p>
                      {result.details && (
                        <p className="text-xs opacity-75 mt-1">{result.details}</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Instructions */}
        <div className="mt-6 p-4 bg-gray-50 rounded-lg">
          <h4 className="font-medium text-gray-900 mb-2">📋 Pasos para configurar Supabase:</h4>
          <ol className="text-sm text-gray-600 space-y-1 list-decimal list-inside">
            <li>Crear cuenta en <a href="https://supabase.com" target="_blank" className="text-blue-600 underline">supabase.com</a></li>
            <li>Crear nuevo proyecto (elige región más cercana)</li>
            <li>Ir a Storage → Create bucket → Nombre: &quot;project-images&quot; → ✅ Public bucket</li>
            <li>Ir a Settings → API → Copiar URL y anon key</li>
            <li>Crear archivo .env.local con las credenciales</li>
            <li>Ejecutar este diagnóstico para verificar</li>
          </ol>
        </div>
      </CardContent>
    </Card>
  )
} 
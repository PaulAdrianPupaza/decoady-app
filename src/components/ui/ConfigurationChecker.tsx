'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from './Card'

interface ConfigStatus {
  envVars: boolean
  envDetails: {
    hasUrl: boolean
    hasKey: boolean
    urlValue?: string
    keyValue?: string
  }
}

export default function ConfigurationChecker() {
  const [config, setConfig] = useState<ConfigStatus | null>(null)

  useEffect(() => {
    const checkConfig = () => {
      const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
      const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

      setConfig({
        envVars: !!(supabaseUrl && supabaseKey),
        envDetails: {
          hasUrl: !!supabaseUrl,
          hasKey: !!supabaseKey,
          urlValue: supabaseUrl ? `${supabaseUrl.substring(0, 30)}...` : undefined,
          keyValue: supabaseKey ? `${supabaseKey.substring(0, 20)}...` : undefined
        }
      })
    }

    checkConfig()
  }, [])

  if (!config) {
    return (
      <Card className="border-blue-200 bg-blue-50">
        <CardContent className="p-4">
          <div className="flex items-center space-x-2">
            <div className="animate-spin h-4 w-4 border-2 border-blue-500 border-t-transparent rounded-full"></div>
            <span className="text-blue-700">Verificando configuración...</span>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className={`border-2 ${config.envVars ? 'border-green-200 bg-green-50' : 'border-red-200 bg-red-50'}`}>
      <CardHeader>
        <CardTitle className={`flex items-center space-x-2 ${config.envVars ? 'text-green-800' : 'text-red-800'}`}>
          <span className="text-2xl">{config.envVars ? '✅' : '❌'}</span>
          <span>Estado de Configuración</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {config.envVars ? (
          <div className="space-y-2">
            <div className="flex items-center space-x-2 text-green-700">
              <span>✅</span>
              <span className="font-medium">Supabase configurado correctamente</span>
            </div>
            <div className="text-sm text-green-600 pl-6 space-y-1">
              <div>🔗 URL: {config.envDetails.urlValue}</div>
              <div>🔑 Key: {config.envDetails.keyValue}</div>
            </div>
            <div className="text-sm text-green-600 font-medium">
              ✅ Listo para subir imágenes
            </div>
          </div>
        ) : (
          <div className="space-y-3">
            <div className="text-red-700 font-medium">
              ⚠️ Configuración incompleta de Supabase
            </div>
            
            <div className="space-y-2 text-sm">
              <div className={`flex items-center space-x-2 ${config.envDetails.hasUrl ? 'text-green-600' : 'text-red-600'}`}>
                <span>{config.envDetails.hasUrl ? '✅' : '❌'}</span>
                <span>NEXT_PUBLIC_SUPABASE_URL</span>
              </div>
              
              <div className={`flex items-center space-x-2 ${config.envDetails.hasKey ? 'text-green-600' : 'text-red-600'}`}>
                <span>{config.envDetails.hasKey ? '✅' : '❌'}</span>
                <span>NEXT_PUBLIC_SUPABASE_ANON_KEY</span>
              </div>
            </div>

            <div className="bg-red-100 border border-red-200 rounded-lg p-3 mt-3">
              <div className="font-medium text-red-800 mb-2">🔧 Para configurar:</div>
              <ol className="text-sm text-red-700 space-y-1 list-decimal list-inside">
                <li>Crea el archivo <code className="bg-red-200 px-1 rounded">.env.local</code> en la raíz de decoady-app/</li>
                <li>Agrega las variables de entorno de Supabase</li>
                <li>Reinicia el servidor (<code className="bg-red-200 px-1 rounded">npm run dev</code>)</li>
              </ol>
            </div>

            <div className="bg-gray-100 border border-gray-200 rounded-lg p-3 mt-2">
              <div className="font-medium text-gray-800 mb-2">📋 Contenido del archivo .env.local:</div>
              <pre className="text-xs text-gray-700 bg-white p-2 rounded border overflow-x-auto">
{`NEXT_PUBLIC_SUPABASE_URL=https://tu-proyecto.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=tu-anon-key-aqui`}
              </pre>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
} 
# 🚀 Guía de Deployment en Netlify

## Pasos para hacer deploy de DecoAdy Reformas en Netlify

### 1. Preparación del Proyecto

El proyecto ya está configurado para deployment estático con:
- ✅ `next.config.ts` configurado para `output: 'export'`
- ✅ `netlify.toml` con configuración de build
- ✅ Scripts de build actualizados

### 2. Variables de Entorno

Crea un archivo `.env.local` con tus variables de entorno:

```bash
# Supabase Configuration (OBLIGATORIO)
NEXT_PUBLIC_SUPABASE_URL=tu_url_de_supabase
NEXT_PUBLIC_SUPABASE_ANON_KEY=tu_clave_anonima_de_supabase
```

### 3. Deploy en Netlify

#### Opción A: Deploy desde Git (Recomendado)

1. **Sube tu código a GitHub/GitLab:**
   ```bash
   git add .
   git commit -m "Ready for Netlify deployment"
   git push origin main
   ```

2. **En Netlify Dashboard:**
   - Ve a [netlify.com](https://netlify.com) y haz login
   - Click "New site from Git"
   - Conecta tu repositorio
   - Configuración automática detectada:
     - **Build command:** `npm run build`
     - **Publish directory:** `out`
     - **Base directory:** `decoady-app`

3. **Configurar Variables de Entorno en Netlify:**
   - Ve a Site settings > Environment variables
   - Añade:
     - `NEXT_PUBLIC_SUPABASE_URL`
     - `NEXT_PUBLIC_SUPABASE_ANON_KEY`

4. **Deploy:**
   - Click "Deploy site"
   - Netlify construirá y desplegará automáticamente

#### Opción B: Deploy Manual

1. **Build local:**
   ```bash
   cd decoady-app
   npm run build
   ```

2. **Sube la carpeta `out`:**
   - Arrastra la carpeta `out` a Netlify dashboard
   - O usa Netlify CLI:
     ```bash
     npx netlify deploy --prod --dir=out
     ```

### 4. Configuración Post-Deploy

#### Custom Domain (Opcional)
- Site settings > Domain management
- Add custom domain

#### HTTPS (Automático)
- Netlify proporciona SSL automáticamente

#### Redirects
- Ya configurados en `netlify.toml` para SPA routing

### 5. Testing

Después del deploy, verifica:
- ✅ Página principal carga correctamente
- ✅ Navegación entre rutas funciona
- ✅ Cambio de idiomas funciona
- ✅ Conexión a Supabase (si tienes datos)
- ✅ Imágenes se cargan correctamente

### 6. Deploy Automático

Para deployments automáticos:
- Cada push a `main` desplegará automáticamente
- Pull requests crearán preview deployments

### 7. Troubleshooting

#### Error: "Module not found"
- Verifica que todas las dependencias estén en `package.json`
- Run `npm install` localmente

#### Error: "Build failed"
- Verifica variables de entorno en Netlify
- Revisa el log de build en Netlify dashboard

#### Imágenes no cargan
- Verifica configuración de `remotePatterns` en `next.config.ts`
- Asegúrate que `unoptimized: true` esté configurado

#### Rutas no funcionan
- Verifica que `netlify.toml` esté en la raíz del proyecto
- Redirect rules están configurados correctamente

### 8. Performance

El sitio estático tendrá:
- ⚡ Carga súper rápida
- 🌍 CDN global de Netlify
- 📱 Perfect Lighthouse scores
- 🔒 HTTPS automático

### 9. Costos

- Netlify Free Plan incluye:
  - 100GB bandwidth/mes
  - 300 build minutes/mes
  - Deploy automático
  - HTTPS
  - Formularios básicos

¡Tu sitio estará listo en minutos! 🎉 
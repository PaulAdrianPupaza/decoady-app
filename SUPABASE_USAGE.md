# 🖼️ Uso de Imágenes de Supabase

## ✅ **Estado Actual**
- ✅ Supabase configurado correctamente
- ✅ Subida de imágenes funcionando
- ✅ Next.js configurado para mostrar imágenes de Supabase
- ✅ Componentes listos para usar

## 🎯 **Cómo Usar Imágenes de Supabase en tu Aplicación**

### **1. Componente SupabaseImage (Recomendado)**

```tsx
import SupabaseImage from '@/components/ui/SupabaseImage'

// Usar primera imagen de una categoría con fallback
<SupabaseImage
  category="projects"
  alt="Proyecto destacado"
  fill
  className="object-cover"
  fallbackUrl="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c"
/>

// Usar imagen aleatoria de una categoría
<SupabaseImage
  category="projects"
  alt="Proyecto aleatorio"
  width={800}
  height={600}
  useRandomImage={true}
/>
```

### **2. Hook useSupabaseImage**

```tsx
import { useSupabaseImage } from '@/components/ui/SupabaseImage'

function MyComponent() {
  const { imageUrl, loading } = useSupabaseImage('projects', 'fallback-url.jpg')
  
  if (loading) return <div>Cargando...</div>
  
  return <img src={imageUrl} alt="Mi imagen" />
}
```

### **3. Servicios Directos**

```tsx
import { ImageService } from '@/services/imageService'

// Obtener primera imagen de una categoría
const projectImage = await ImageService.getFirstImageFromCategory('projects')

// Obtener múltiples imágenes aleatorias
const randomImages = await ImageService.getRandomImagesFromCategory('projects', 3)

// URL con fallback
const imageUrl = ImageService.getImageWithFallback(
  'projects/mi-imagen.jpg', 
  'https://unsplash.com/fallback.jpg'
)
```

## 🔄 **Actualizar Homepage para Usar Supabase**

### **Ejemplo: Reemplazar Imágenes de Proyectos**

**Antes (Unsplash fijo):**
```tsx
<Image
  src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c"
  alt={project.title}
  fill
  className="object-cover"
/>
```

**Después (Supabase con fallback):**
```tsx
<SupabaseImage
  category="projects"
  alt={project.title}
  fill
  className="object-cover group-hover:scale-110 transition-transform duration-500"
  useRandomImage={true}
  fallbackUrl="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c"
/>
```

### **Actualización Completa de la Sección Proyectos**

Reemplaza la sección de proyectos en `src/app/page.tsx`:

```tsx
{/* Featured Projects Section - CON SUPABASE */}
<section className="py-20 bg-gray-50">
  <div className="container mx-auto px-4 sm:px-6 lg:px-8">
    <div className="text-center mb-16">
      <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
        Proyectos Destacados
      </h2>
      <p className="text-xl text-gray-600 max-w-3xl mx-auto">
        Descubre algunos de nuestros trabajos más recientes y exitosos
      </p>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {featuredProjects.map((project, index) => (
        <Card key={project.id} className="group overflow-hidden hover:shadow-xl transition-all duration-300">
          <div className="relative h-64 overflow-hidden">
            <SupabaseImage
              category="projects"
              alt={project.title}
              fill
              className="object-cover group-hover:scale-110 transition-transform duration-500"
              useRandomImage={true}
              fallbackUrl="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
            />
            <div className="absolute top-4 left-4">
              <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                {project.category}
              </span>
            </div>
          </div>
          {/* Resto del contenido igual... */}
        </Card>
      ))}
    </div>
  </div>
</section>
```

## 📂 **Organización de Imágenes**

### **Categorías Disponibles:**
- `projects/` - Fotos de proyectos completados
- `services/` - Imágenes representativas de servicios
- `hero/` - Banners para secciones principales
- `team/` - Fotos del equipo de trabajo
- `testimonials/` - Fotos relacionadas con testimonios

### **Flujo de Trabajo Recomendado:**

1. **Subir imágenes** en `/admin` organizadas por categoría
2. **Usar SupabaseImage** en lugar de Image normal
3. **Mantener fallbacks** a Unsplash para mejor UX
4. **Probar localmente** antes de desplegar

## 🚀 **Pasos Siguientes**

### **Para usar en tu homepage:**

1. **Reinicia el servidor** (para aplicar next.config.ts):
   ```bash
   npm run dev
   ```

2. **Sube algunas imágenes** en `/admin`:
   - Categoría "projects": 3-5 fotos de proyectos
   - Categoría "hero": 1-2 imágenes para banner
   - Categoría "services": 4 imágenes de servicios

3. **Actualiza la homepage** reemplazando las imágenes fijas por SupabaseImage

4. **Verifica** que las imágenes se cargan correctamente

## 🔍 **Debugging**

### **Ver qué imágenes tienes:**
```tsx
// En la consola del navegador
const images = await ImageService.getImagesByCategory('projects')
console.log(images)
```

### **Probar URLs:**
```tsx
// Ver si se genera URL correctamente
const url = ImageService.getImageWithFallback('projects/mi-imagen.jpg')
console.log(url)
```

## 🎯 **Resultado Final**

- ✅ **Imágenes dinámicas** desde Supabase
- ✅ **Fallback automático** a Unsplash si no hay imágenes
- ✅ **Carga optimizada** con lazy loading
- ✅ **URLs públicas** funcionando correctamente
- ✅ **Gestión fácil** desde `/admin`

¡Tu aplicación ahora puede usar tanto imágenes de Supabase como de Unsplash de forma automática! 🎉 
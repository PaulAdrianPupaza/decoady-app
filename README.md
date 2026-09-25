# Decoady Reformas

Web corporativa de Decoady Reformas (reformas y construcción en Ibiza).
Next.js 15 · React 19 · Tailwind CSS · desplegada en Vercel.

## Desarrollo

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # compilación de producción
npm run typecheck  # comprobación de tipos
```

## Idiomas y URLs

| Idioma  | URL de ejemplo              |
| ------- | --------------------------- |
| Español | `/proyectos` (sin prefijo)  |
| English | `/en/proyectos`             |
| Català  | `/ca/proyectos`             |

`src/middleware.ts` reescribe internamente las rutas en español a `/es/...`.
Todas las páginas se generan como HTML estático, con `hreflang`, canonical y datos estructurados (Schema.org).

## Dónde se edita el contenido

| Qué                                    | Archivo                                  |
| -------------------------------------- | ---------------------------------------- |
| Teléfono, email, dirección, horarios   | `src/lib/site.ts`                        |
| Textos generales (ES / EN / CA)        | `src/i18n/dictionaries/{es,en,ca}.ts`    |
| Servicios (una página SEO por servicio) | `src/data/services.ts`                   |
| Proyectos                              | `src/data/projects.ts`                   |
| Fotos de proyectos                     | `public/images/proyectos/<slug>/NN.jpg`  |

### Añadir un proyecto

1. Crea la carpeta `public/images/proyectos/<slug>/` y guarda las fotos como `01.jpg`, `02.jpg`… (máx. ~2000 px de ancho).
2. Añade una entrada en `src/data/projects.ts` con el mismo `slug`, el número de fotos (`photoCount`) y los textos en los tres idiomas.
3. Haz commit y push: Vercel publica automáticamente y el sitemap se actualiza solo.

## Despliegue en Vercel

1. En [vercel.com/new](https://vercel.com/new), importa el repositorio de GitHub (Vercel detecta Next.js y no hace falta configurar nada).
2. En **Settings → Environment Variables** añade:
   - `NEXT_PUBLIC_EMAILJS_SERVICE_ID`
   - `NEXT_PUBLIC_EMAILJS_TEMPLATE_ID`
   - `NEXT_PUBLIC_EMAILJS_PUBLIC_KEY`
   - `NEXT_PUBLIC_SITE_URL`: el dominio definitivo, por ejemplo `https://www.decoady.com` (opcional; si no existe, se usa el dominio de producción de Vercel).
3. En **Analytics** y **Speed Insights**, pulsa *Enable* (plan gratuito, sin cookies).
4. En **Settings → Domains**, añade el dominio propio.

Cada `git push` a `main` publica una nueva versión; las ramas y los PR generan previsualizaciones.

## Formulario de contacto

Se envía con EmailJS. La plantilla recibe `from_name`, `from_email`, `phone`, `subject`, `message`, `project_type`, `timeline` y `language`.
Cuando un envío tiene éxito, se registra el evento `lead_form` en Vercel Analytics. Los eventos personalizados solo se ven en el plan Pro de Vercel; en el plan gratuito, cuenta los envíos que llegan desde EmailJS.

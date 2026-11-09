import { NextResponse, type NextRequest } from "next/server";
import { localePath, parsePath } from "@/i18n/config";

// Las URLs públicas están traducidas (/proyectos, /en/projects, /ca/projectes) y aquí se
// reescriben a la ruta interna en español (/es/proyectos, /en/proyectos, /ca/proyectos).
// No se tocan las cabeceras de la petición: así las páginas siguen siendo estáticas y cacheables.
export function middleware(request: NextRequest) {
  const { locale, path, legacy } = parsePath(request.nextUrl.pathname);
  const url = request.nextUrl.clone();

  // URL antigua con nombres en español (p. ej. /en/servicios/piscinas) → URL traducida
  if (legacy) {
    url.pathname = localePath(locale, path);
    return NextResponse.redirect(url, 308);
  }

  url.pathname = `/${locale}${path === "/" ? "" : path}`;
  return NextResponse.rewrite(url);
}

export const config = {
  // Todo excepto recursos internos y archivos (con extensión)
  matcher: ["/((?!_next|api|.*\\..*).*)"],
};

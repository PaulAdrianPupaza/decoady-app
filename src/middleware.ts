import { NextResponse, type NextRequest } from "next/server";
import { defaultLocale, isLocale } from "@/i18n/config";

// El español se sirve sin prefijo (/proyectos) y se reescribe internamente a /es/proyectos.
// Inglés y catalán llevan prefijo visible (/en/proyectos, /ca/proyectos).
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const first = pathname.split("/")[1];

  const locale = isLocale(first) && first !== defaultLocale ? first : defaultLocale;
  const headers = new Headers(request.headers);
  headers.set("x-locale", locale);

  if (isLocale(first) && first !== defaultLocale) {
    return NextResponse.next({ request: { headers } });
  }

  const url = request.nextUrl.clone();
  url.pathname = `/${defaultLocale}${pathname === "/" ? "" : pathname}`;
  return NextResponse.rewrite(url, { request: { headers } });
}

export const config = {
  // Todo excepto recursos internos y archivos (con extensión)
  matcher: ["/((?!_next|api|.*\\..*).*)"],
};

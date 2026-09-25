import { notFound } from "next/navigation";

// Cualquier ruta desconocida muestra la página 404 dentro del diseño del sitio
export default function CatchAll() {
  notFound();
}

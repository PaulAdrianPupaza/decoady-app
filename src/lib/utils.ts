// Utilidades comunes para la aplicación

import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

// Función para combinar clases de Tailwind
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Formatear fechas
export function formatDate(date: Date, format: 'short' | 'long' = 'short'): string {
  const options: Intl.DateTimeFormatOptions = format === 'long' 
    ? { year: 'numeric', month: 'long', day: 'numeric' }
    : { year: 'numeric', month: 'short', day: 'numeric' };
    
  return new Intl.DateTimeFormat('es-ES', options).format(date);
}

 
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import { cn } from '@/lib/utils';
import { CONTACT_INFO } from '@/constants';
import Button from '@/components/ui/Button';
import LanguageSelector from '@/components/ui/LanguageSelector';

export default function Header() {
  const { t } = useTranslation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <header className="sticky top-0 z-50 bg-white shadow-md">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20 lg:h-24 gap-6">
          
          {/* Logo y nombre de la empresa */}
          <Link href="/" className="flex items-center space-x-4 group">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg flex items-center justify-center group-hover:scale-105 transition-transform">
              <span className="text-white font-bold text-xl">D</span>
            </div>
            <div className="hidden sm:block">
              <h1 className="text-xl lg:text-2xl font-bold text-gray-900">{t('company.name')}</h1>
              <p className="text-xs text-gray-600 -mt-0.5">{t('company.tagline')}</p>
            </div>
          </Link>

          {/* Navegación desktop */}
          <nav className="hidden lg:flex items-center space-x-10">
            <Link
              href="/"
              className="text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200 relative group"
            >
              {t('navigation.home')}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-200 group-hover:w-full"></span>
            </Link>
            <Link
              href="/proyectos"
              className="text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200 relative group"
            >
              {t('navigation.projects')}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-200 group-hover:w-full"></span>
            </Link>
            <Link
              href="/contacto"
              className="text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200 relative group"
            >
              {t('navigation.contact')}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-200 group-hover:w-full"></span>
            </Link>
          </nav>

          {/* Botones de acción y menú móvil */}
          <div className="flex items-center space-x-6">
            
            {/* Teléfono (solo desktop) */}
            <a 
              href={`tel:${CONTACT_INFO.phone}`}
              className="hidden lg:flex items-center space-x-2 text-gray-700 hover:text-blue-600 transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              <span className="text-sm font-medium">{CONTACT_INFO.phone}</span>
            </a>

            {/* Selector de idioma */}
            <LanguageSelector />

            {/* Botón CTA */}
            <Link href="/contacto">
              <Button 
                variant="primary" 
                size="sm"
                className="hidden sm:inline-flex"
              >
                {t('contact.freeQuote')}
              </Button>
            </Link>

            {/* Botón menú móvil */}
            <button
              onClick={toggleMenu}
              className="lg:hidden p-3 rounded-md text-gray-700 hover:text-blue-600 hover:bg-gray-100 transition-colors"
              aria-label="Abrir menú"
            >
              <svg 
                className={cn("w-6 h-6 transition-transform", isMenuOpen && "rotate-90")} 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Menú móvil */}
        <div className={cn(
          "lg:hidden overflow-hidden transition-all duration-300 ease-in-out",
          isMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        )}>
          <nav className="py-6 border-t border-gray-100">
            <div className="flex flex-col space-y-5">
              <Link
                href="/"
                className="text-gray-700 hover:text-blue-600 font-medium transition-colors px-2 py-1"
                onClick={() => setIsMenuOpen(false)}
              >
                {t('navigation.home')}
              </Link>
              <Link
                href="/proyectos"
                className="text-gray-700 hover:text-blue-600 font-medium transition-colors px-2 py-1"
                onClick={() => setIsMenuOpen(false)}
              >
                {t('navigation.projects')}
              </Link>
              <Link
                href="/contacto"
                className="text-gray-700 hover:text-blue-600 font-medium transition-colors px-2 py-1"
                onClick={() => setIsMenuOpen(false)}
              >
                {t('navigation.contact')}
              </Link>
              
              {/* Botones móviles */}
              <div className="flex flex-col space-y-4 pt-6 border-t border-gray-100">
                <a 
                  href={`tel:${CONTACT_INFO.phone}`}
                  className="flex items-center space-x-2 text-gray-700 hover:text-blue-600 transition-colors px-2 py-1"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <span className="text-sm font-medium">{CONTACT_INFO.phone}</span>
                </a>
                
                <div className="px-2 py-1">
                  <LanguageSelector />
                </div>
                
                <div className="px-2 pt-2">
                  <Link href="/contacto">
                    <Button variant="primary" size="sm" className="w-full">
                      {t('contact.freeQuote')}
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
} 
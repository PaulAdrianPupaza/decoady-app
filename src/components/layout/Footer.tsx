'use client'

import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import { CONTACT_INFO } from '@/constants';

export default function Footer() {
  const { t } = useTranslation();
  
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {/* Información de la empresa */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">D</span>
              </div>
              <div>
                <h3 className="text-xl font-bold">{t('company.name')}</h3>
                <p className="text-gray-300 text-sm">{t('company.tagline')}</p>
              </div>
            </div>
            <p className="text-gray-300 mb-4 max-w-md">
              {t('company.description')}
            </p>
          </div>

          {/* Enlaces rápidos */}
          <div>
            <h4 className="font-semibold text-lg mb-4">{t('footer.quickLinks')}</h4>
            <ul className="space-y-2">
              <li>
                <Link 
                  href="/"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  {t('navigation.home')}
                </Link>
              </li>
              <li>
                <Link 
                  href="/proyectos"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  {t('navigation.projects')}
                </Link>
              </li>
              <li>
                <Link 
                  href="/contacto"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  {t('navigation.contact')}
                </Link>
              </li>
             
            </ul>
          </div>

          {/* Información de contacto */}
          <div>
            <h4 className="font-semibold text-lg mb-4">{t('footer.contact')}</h4>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <svg className="w-5 h-5 text-blue-400 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <div className="text-gray-300 text-sm">
                  {CONTACT_INFO.address}
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <svg className="w-5 h-5 text-blue-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <a 
                  href={`tel:${CONTACT_INFO.phone}`}
                  className="text-gray-300 hover:text-white transition-colors text-sm"
                >
                  {CONTACT_INFO.phone}
                </a>
              </div>
              
              <div className="flex items-center space-x-3">
                <svg className="w-5 h-5 text-blue-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 7.89a2 2 0 002.83 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <a 
                  href={`mailto:${CONTACT_INFO.email}`}
                  className="text-gray-300 hover:text-white transition-colors text-sm"
                >
                  {CONTACT_INFO.email}
                </a>
              </div>
            </div>

            {/* Horarios */}
            <div className="mt-6">
              <h5 className="font-medium text-gray-200 mb-2">{t('footer.businessHours')}</h5>
              <div className="space-y-1 text-sm text-gray-300">
                {Object.entries(CONTACT_INFO.businessHours).map(([day, hours]) => (
                  <div key={day} className="flex justify-between">
                    <span>{day}:</span>
                    <span>{hours}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Línea divisoria y copyright */}
        <div className="border-t border-gray-800 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © {new Date().getFullYear()} {t('company.name')}. {t('footer.copyright')}.
            </p>
            <p className="text-gray-400 text-sm mt-2 md:mt-0">
              {t('footer.developedWith')}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
} 
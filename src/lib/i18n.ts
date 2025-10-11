import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Importaciones de traducciones
import es from '@/locales/es/common.json';
import ca from '@/locales/ca/common.json';
import en from '@/locales/en/common.json';

// Configuración de idiomas disponibles
export const LANGUAGES = {
  es: {
    code: 'es',
    name: 'Español',
    flag: '🇪🇸',
    nativeName: 'Español'
  },
  ca: {
    code: 'ca',
    name: 'Català',
    flag: '🏴󠁥󠁳󠁣󠁴󠁿',
    nativeName: 'Català'
  },
  en: {
    code: 'en',
    name: 'English',
    flag: '🇬🇧',
    nativeName: 'English'
  }
} as const;

export type LanguageCode = keyof typeof LANGUAGES;

const resources = {
  es: { common: es },
  ca: { common: ca },
  en: { common: en }
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    defaultNS: 'common',
    fallbackLng: 'es',
    debug: process.env.NODE_ENV === 'development',
    
    interpolation: {
      escapeValue: false,
    },
    
    detection: {
      // Prioritize htmlTag to match server-rendered lang and avoid hydration mismatches
      order: ['htmlTag', 'localStorage', 'navigator'],
      caches: ['localStorage'],
      lookupLocalStorage: 'i18nextLng',
    },
    
    react: {
      useSuspense: false,
    },
  });

export default i18n; 
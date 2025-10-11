'use client'

import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import { LANGUAGES, type LanguageCode } from '@/lib/i18n';
import '@/lib/i18n'; // Initialize i18n on client side

interface LanguageContextType {
  currentLanguage: LanguageCode;
  setLanguage: (lang: LanguageCode) => void;
  languages: typeof LANGUAGES;
  isLoading: boolean;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

interface LanguageProviderProps {
  children: ReactNode;
}

export function LanguageProvider({ children }: LanguageProviderProps) {
  const { i18n } = useTranslation();
  const [currentLanguage, setCurrentLanguage] = useState<LanguageCode>('es');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Initialize language from i18n
    const initLanguage = () => {
      const detectedLang = i18n.language as LanguageCode;
      if (LANGUAGES[detectedLang]) {
        setCurrentLanguage(detectedLang);
      } else {
        setCurrentLanguage('es'); // fallback
      }
      setIsLoading(false);
    };

    if (i18n.isInitialized) {
      initLanguage();
    } else {
      i18n.on('initialized', initLanguage);
    }

    return () => {
      i18n.off('initialized', initLanguage);
    };
  }, [i18n]);

  const setLanguage = async (lang: LanguageCode) => {
    setIsLoading(true);
    try {
      await i18n.changeLanguage(lang);
      setCurrentLanguage(lang);
      
      // Update document language
      document.documentElement.lang = lang;
      
      // Update document direction for RTL languages if needed
      document.documentElement.dir = 'ltr'; // All our languages are LTR
      
      // Store in localStorage
      localStorage.setItem('i18nextLng', lang);
    } catch (error) {
      console.error('Error changing language:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const value: LanguageContextType = {
    currentLanguage,
    setLanguage,
    languages: LANGUAGES,
    isLoading,
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}

export default LanguageProvider; 
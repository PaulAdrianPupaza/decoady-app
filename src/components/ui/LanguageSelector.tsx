'use client'

import React, { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useLanguage } from '@/components/providers/LanguageProvider';
import { cn } from '@/lib/utils';

export default function LanguageSelector() {
  const { t } = useTranslation();
  const { currentLanguage, setLanguage, languages, isLoading } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLanguageChange = async (langCode: string) => {
    setIsOpen(false);
    if (langCode !== currentLanguage) {
      await setLanguage(langCode as keyof typeof languages);
    }
  };

  const currentLang = languages[currentLanguage];

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        ref={buttonRef}
        onClick={() => setIsOpen(!isOpen)}
        disabled={isLoading}
        className={cn(
          "flex items-center space-x-2 px-3 py-2 text-sm font-medium rounded-md transition-colors",
          "hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2",
          "disabled:opacity-50 disabled:cursor-not-allowed",
          isOpen && "bg-gray-100"
        )}
        aria-label={t('language.select')}
        aria-expanded={isOpen}
        aria-haspopup="listbox"
      >
        <span className="text-lg">{currentLang?.flag}</span>
        <span className="hidden sm:inline text-gray-700">{currentLang?.nativeName}</span>
        <span className="sm:hidden text-gray-700">{currentLang?.code.toUpperCase()}</span>
        
        {isLoading ? (
          <svg className="w-4 h-4 animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
        ) : (
          <svg 
            className={cn("w-4 h-4 transition-transform", isOpen && "rotate-180")} 
            xmlns="http://www.w3.org/2000/svg" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg border border-gray-200 z-50">
          <div className="py-1" role="listbox">
            {Object.entries(languages).map(([code, lang]) => (
              <button
                key={code}
                onClick={() => handleLanguageChange(code)}
                className={cn(
                  "w-full flex items-center space-x-3 px-4 py-2 text-sm text-left transition-colors",
                  "hover:bg-gray-100 focus:outline-none focus:bg-gray-100",
                  code === currentLanguage && "bg-blue-50 text-blue-700"
                )}
                role="option"
                aria-selected={code === currentLanguage}
              >
                <span className="text-lg">{lang.flag}</span>
                <div className="flex-1 min-w-0">
                  <div className="font-medium truncate">{lang.nativeName}</div>
                  <div className="text-gray-500 text-xs truncate">{lang.name}</div>
                </div>
                {code === currentLanguage && (
                  <svg className="w-4 h-4 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                )}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
} 
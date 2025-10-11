'use client'

import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useLanguage } from './LanguageProvider';

export function useMetadata() {
  const { t } = useTranslation();
  const { currentLanguage } = useLanguage();

  useEffect(() => {
    // Update document title
    const title = t('company.name');
    document.title = title;

    // Update meta description
    const description = t('company.description');
    let metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
      metaDescription = document.createElement('meta');
      metaDescription.setAttribute('name', 'description');
      document.head.appendChild(metaDescription);
    }
    metaDescription.setAttribute('content', description);

    // Update Open Graph title
    let ogTitle = document.querySelector('meta[property="og:title"]');
    if (!ogTitle) {
      ogTitle = document.createElement('meta');
      ogTitle.setAttribute('property', 'og:title');
      document.head.appendChild(ogTitle);
    }
    ogTitle.setAttribute('content', title);

    // Update Open Graph description
    let ogDescription = document.querySelector('meta[property="og:description"]');
    if (!ogDescription) {
      ogDescription = document.createElement('meta');
      ogDescription.setAttribute('property', 'og:description');
      document.head.appendChild(ogDescription);
    }
    ogDescription.setAttribute('content', description);

    // Update Open Graph locale
    let ogLocale = document.querySelector('meta[property="og:locale"]');
    if (!ogLocale) {
      ogLocale = document.createElement('meta');
      ogLocale.setAttribute('property', 'og:locale');
      document.head.appendChild(ogLocale);
    }
    
    const localeMap: Record<string, string> = {
      es: 'es_ES',
      ca: 'ca_ES', 
      en: 'en_US'
    };
    
    ogLocale.setAttribute('content', localeMap[currentLanguage] || 'es_ES');

    // Update Twitter meta tags
    let twitterTitle = document.querySelector('meta[name="twitter:title"]');
    if (!twitterTitle) {
      twitterTitle = document.createElement('meta');
      twitterTitle.setAttribute('name', 'twitter:title');
      document.head.appendChild(twitterTitle);
    }
    twitterTitle.setAttribute('content', title);

    let twitterDescription = document.querySelector('meta[name="twitter:description"]');
    if (!twitterDescription) {
      twitterDescription = document.createElement('meta');
      twitterDescription.setAttribute('name', 'twitter:description');
      document.head.appendChild(twitterDescription);
    }
    twitterDescription.setAttribute('content', description);

    // Update keywords based on language
    let keywords = document.querySelector('meta[name="keywords"]');
    if (!keywords) {
      keywords = document.createElement('meta');
      keywords.setAttribute('name', 'keywords');
      document.head.appendChild(keywords);
    }
    
    const keywordMap: Record<string, string> = {
      es: 'construcción, reformas, obra nueva, rehabilitación, Ibiza, constructora, arquitectura, chapuzas',
      ca: 'construcció, reformes, obra nova, rehabilitació, Ibiza, constructora, arquitectura, chapuzas',
      en: 'construction, renovation, new construction, rehabilitation, Ibiza, builder, architecture, chapuzas'
    };
    
    keywords.setAttribute('content', keywordMap[currentLanguage] || keywordMap.es);

  }, [t, currentLanguage]);

  return {
    title: t('company.name'),
    description: t('company.description'),
    locale: currentLanguage
  };
}

export default function MetadataProvider({ children }: { children: React.ReactNode }) {
  useMetadata();
  return <>{children}</>;
} 
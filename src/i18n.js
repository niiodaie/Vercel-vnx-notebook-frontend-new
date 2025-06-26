import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'

// Import translation files
import enTranslations from './locales/en/translation.json'
import frTranslations from './locales/fr/translation.json'
import esTranslations from './locales/es/translation.json'
import deTranslations from './locales/de/translation.json'
import zhTranslations from './locales/zh/translation.json'
import swTranslations from './locales/sw/translation.json'

const resources = {
  en: { translation: enTranslations },
  fr: { translation: frTranslations },
  es: { translation: esTranslations },
  de: { translation: deTranslations },
  zh: { translation: zhTranslations },
  sw: { translation: swTranslations }
}

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    debug: false,
    
    detection: {
      order: ['localStorage', 'navigator', 'htmlTag'],
      caches: ['localStorage'],
    },
    
    interpolation: {
      escapeValue: false,
    },
    
    react: {
      useSuspense: false,
    },
  })

export default i18n


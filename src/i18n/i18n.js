// src/i18n.js
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

i18n.use(initReactI18next).init({
  resources: {
    en: {
      translation: {
        title: 'VNX Notebook',
        subtitle: 'Your smart sticky notepad',
        createNote: 'Create New Note',
        noteTitlePlaceholder: 'Enter your note title...',
        contentPlaceholder: 'Write your note content here...',
        tagsPlaceholder: 'work, personal, ideas',
      }
    }
  },
  lng: 'en',
  fallbackLng: 'en',
  interpolation: { escapeValue: false },
});

export default i18n;

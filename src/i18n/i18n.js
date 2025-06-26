// src/i18n.js
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

i18n.use(initReactI18next).init({
  resources: {
    en: {
      translation: {
        title: 'VNX Notebook',
        subtitle: 'Smart multilingual note-taking for the modern world',
        createNote: 'Create New Note',
        noteTitle: 'Note Title',
        noteTitlePlaceholder: 'Enter your note title...',
        format: 'Format',
        formatPlain: 'Plain Text',
        content: 'Content',
        contentPlaceholder: 'Write your note content here...',
        tags: 'Tags',
        tagsPlaceholder: 'work, personal, ideas',
      },
    },
  },
  lng: 'en',
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;

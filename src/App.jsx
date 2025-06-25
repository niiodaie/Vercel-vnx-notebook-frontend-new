import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';

// Components
import NoteEditor from './components/NoteEditor';
import NoteCard from './components/NoteCard';
import TagFilter from './components/TagFilter';
import LanguageSelector from './components/LanguageSelector';

function App() {
  const { t } = useTranslation();
  const [notes, setNotes] = useState([]);
  const [filteredNotes, setFilteredNotes] = useState([]);
  const [selectedTag, setSelectedTag] = useState('all');
  const [editingNote, setEditingNote] = useState(null);

  // Load notes from localStorage on component mount
  useEffect(() => {
    const savedNotes = localStorage.getItem('vnx-notes');
    if (savedNotes) {
      const parsedNotes = JSON.parse(savedNotes);
      setNotes(parsedNotes);
      setFilteredNotes(parsedNotes);
    }
  }, []);

  // Save notes to localStorage whenever notes change
  useEffect(() => {
    localStorage.setItem('vnx-notes', JSON.stringify(notes));
  }, [notes]);

  // Filter notes by tag
  useEffect(() => {
    if (selectedTag === 'all') {
      setFilteredNotes(notes);
    } else {
      const filtered = notes.filter(note => 
        note.tags && note.tags.toLowerCase().includes(selectedTag.toLowerCase())
      );
      setFilteredNotes(filtered);
    }
  }, [notes, selectedTag]);

  // Get all unique tags from notes
  const getAllTags = () => {
    const tags = new Set();
    notes.forEach(note => {
      if (note.tags) {
        note.tags.split(',').forEach(tag => {
          tags.add(tag.trim().toLowerCase());
        });
      }
    });
    return Array.from(tags).filter(tag => tag.length > 0);
  };

  // Save new note
  const handleSaveNote = (noteData) => {
    const newNote = {
      id: Date.now().toString(),
      ...noteData,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    
    setNotes(prev => [newNote, ...prev]);
    toast.success(t('noteSaved'));
  };

  // Update existing note
  const handleUpdateNote = (noteData) => {
    const updatedNotes = notes.map(note => 
      note.id === editingNote.id 
        ? { ...note, ...noteData, updatedAt: new Date().toISOString() }
        : note
    );
    
    setNotes(updatedNotes);
    setEditingNote(null);
    toast.success(t('noteUpdated'));
  };

  // Delete note
  const handleDeleteNote = (noteId) => {
    if (window.confirm(t('confirmDelete'))) {
      setNotes(prev => prev.filter(note => note.id !== noteId));
      toast.success(t('noteDeleted'));
    }
  };

  // Edit note
  const handleEditNote = (note) => {
    setEditingNote(note);
  };

  // Cancel editing
  const handleCancelEdit = () => {
    setEditingNote(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Header */}
        <header className="text-center mb-8">
          <div className="flex items-center justify-between mb-4">
            <div className="flex-1"></div>
            <h1 className="text-4xl font-bold text-gray-800 flex items-center gap-3">
              <span className="text-5xl">📝</span>
              {t('title')}
            </h1>
            <div className="flex-1 flex justify-end">
              <LanguageSelector />
            </div>
          </div>
          <p className="text-gray-600 text-lg">{t('subtitle')}</p>
        </header>

        {/* Note Editor */}
        <div className="mb-8">
          <NoteEditor
            onSave={editingNote ? handleUpdateNote : handleSaveNote}
            onCancel={editingNote ? handleCancelEdit : null}
            editingNote={editingNote}
            isEditing={!!editingNote}
          />
        </div>

        {/* Tag Filter */}
        <div className="mb-6">
          <TagFilter
            tags={getAllTags()}
            selectedTag={selectedTag}
            onTagSelect={setSelectedTag}
          />
        </div>

        {/* Notes Grid */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            {t('myNotes')} ({filteredNotes.length})
          </h2>
          
          {filteredNotes.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">📋</div>
              <p className="text-gray-500 text-lg">{t('noNotes')}</p>
              <p className="text-gray-400">{t('createFirstNote')}</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredNotes.map(note => (
                <NoteCard
                  key={note.id}
                  note={note}
                  onEdit={handleEditNote}
                  onDelete={handleDeleteNote}
                />
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <footer className="text-center py-6 border-t border-gray-200">
          <p className="text-gray-500">
            {t('poweredBy')} <a href="https://visnec.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 font-medium">Visnec</a>
          </p>
        </footer>
      </div>

      {/* Toast Container */}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  );
}

export default App;


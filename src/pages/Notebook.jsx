import React, { useState, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { useAuth } from '../hooks/useAuth'
import { useNotes } from '../hooks/useNotes'
import Header from '../components/Header'
import NoteEditor from '../components/NoteEditor'
import NoteCard from '../components/NoteCard'
import TagFilter from '../components/TagFilter'
import LoadingSpinner from '../components/LoadingSpinner'

const Notebook = () => {
  const { t } = useTranslation()
  const { user } = useAuth()
  const { notes, loading, createNote, updateNote, deleteNote } = useNotes()
  const [selectedTag, setSelectedTag] = useState('all')
  const [editingNote, setEditingNote] = useState(null)

  // Get all unique tags from notes
  const allTags = useMemo(() => {
    const tags = new Set()
    notes.forEach(note => {
      if (note.tags) {
        note.tags.split(',').forEach(tag => {
          const trimmedTag = tag.trim().toLowerCase()
          if (trimmedTag) tags.add(trimmedTag)
        })
      }
    })
    return Array.from(tags)
  }, [notes])

  // Filter notes by selected tag
  const filteredNotes = useMemo(() => {
    if (selectedTag === 'all') {
      return notes
    }
    return notes.filter(note => 
      note.tags && note.tags.toLowerCase().includes(selectedTag.toLowerCase())
    )
  }, [notes, selectedTag])

  const handleSaveNote = async (noteData) => {
    try {
      await createNote(noteData)
    } catch (error) {
      console.error('Error saving note:', error)
    }
  }

  const handleUpdateNote = async (noteData) => {
    try {
      await updateNote(editingNote.id, noteData)
      setEditingNote(null)
    } catch (error) {
      console.error('Error updating note:', error)
    }
  }

  const handleDeleteNote = async (noteId) => {
    if (window.confirm(t('confirmDelete'))) {
      try {
        await deleteNote(noteId)
      } catch (error) {
        console.error('Error deleting note:', error)
      }
    }
  }

  const handleEditNote = (note) => {
    setEditingNote(note)
  }

  const handleCancelEdit = () => {
    setEditingNote(null)
  }

  if (loading) {
    return <LoadingSpinner text={t('loadingNotes')} />
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <Header />

      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Welcome Message */}
        <div className="text-center mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">
            {t('welcome')}, {user?.email}!
          </h2>
          <p className="text-gray-600">{t('notebookSubtitle')}</p>
        </div>

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
        {allTags.length > 0 && (
          <div className="mb-6">
            <TagFilter
              tags={allTags}
              selectedTag={selectedTag}
              onTagSelect={setSelectedTag}
            />
          </div>
        )}

        {/* Notes Grid */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-semibold text-gray-800">
              {t('myNotes')} ({filteredNotes.length})
            </h3>
            {selectedTag !== 'all' && (
              <button
                onClick={() => setSelectedTag('all')}
                className="text-sm text-primary-600 hover:text-primary-700 font-medium"
              >
                {t('showAllNotes')}
              </button>
            )}
          </div>
          
          {filteredNotes.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">📋</div>
              <p className="text-gray-500 text-lg mb-2">
                {selectedTag === 'all' ? t('noNotes') : t('noNotesWithTag')}
              </p>
              <p className="text-gray-400">
                {selectedTag === 'all' ? t('createFirstNote') : t('tryDifferentTag')}
              </p>
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
      </div>
    </div>
  )
}

export default Notebook


import React, { createContext, useContext, useEffect, useState } from 'react'
import { toast } from 'react-toastify'

const NotesContext = createContext()

export const useNotes = () => {
  const context = useContext(NotesContext)
  if (!context) {
    throw new Error('useNotes must be used within a NotesProvider')
  }
  return context
}

export const NotesProvider = ({ children }) => {
  const [notes, setNotes] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedTag, setSelectedTag] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')

  // Load notes from localStorage on mount
  useEffect(() => {
    try {
      const savedNotes = localStorage.getItem('vnx-notes')
      if (savedNotes) {
        const parsedNotes = JSON.parse(savedNotes)
        setNotes(parsedNotes)
      }
    } catch (error) {
      console.error('Error loading notes:', error)
      toast.error('Failed to load notes')
    } finally {
      setLoading(false)
    }
  }, [])

  // Auto-save notes to localStorage whenever notes change
  useEffect(() => {
    if (!loading) {
      try {
        localStorage.setItem('vnx-notes', JSON.stringify(notes))
      } catch (error) {
        console.error('Error saving notes:', error)
        toast.error('Failed to save notes')
      }
    }
  }, [notes, loading])

  // Generate unique ID
  const generateId = () => {
    return Date.now().toString(36) + Math.random().toString(36).substr(2)
  }

  // Create new note
  const createNote = (noteData) => {
    const newNote = {
      id: generateId(),
      title: noteData.title || 'Untitled Note',
      content: noteData.content || '',
      tags: noteData.tags || '',
      format: noteData.format || 'plain',
      color: noteData.color || 'yellow',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      isPinned: false
    }

    setNotes(prev => [newNote, ...prev])
    toast.success('Note created successfully!')
    return newNote
  }

  // Update existing note
  const updateNote = (id, updates) => {
    setNotes(prev => prev.map(note => 
      note.id === id 
        ? { ...note, ...updates, updatedAt: new Date().toISOString() }
        : note
    ))
    toast.success('Note updated successfully!')
  }

  // Delete note
  const deleteNote = (id) => {
    setNotes(prev => prev.filter(note => note.id !== id))
    toast.success('Note deleted successfully!')
  }

  // Duplicate note
  const duplicateNote = (id) => {
    const noteToClone = notes.find(note => note.id === id)
    if (noteToClone) {
      const duplicatedNote = {
        ...noteToClone,
        id: generateId(),
        title: `${noteToClone.title} (Copy)`,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        isPinned: false
      }
      setNotes(prev => [duplicatedNote, ...prev])
      toast.success('Note duplicated successfully!')
      return duplicatedNote
    }
  }

  // Toggle pin status
  const togglePin = (id) => {
    setNotes(prev => prev.map(note => 
      note.id === id 
        ? { ...note, isPinned: !note.isPinned, updatedAt: new Date().toISOString() }
        : note
    ))
  }

  // Export note as text file
  const exportNote = (id, format = 'txt') => {
    const note = notes.find(n => n.id === id)
    if (!note) return

    let content = `${note.title}\n\n${note.content}`
    let filename = `${note.title.replace(/[^a-z0-9]/gi, '_').toLowerCase()}.${format}`
    let mimeType = 'text/plain'

    if (format === 'md') {
      content = `# ${note.title}\n\n${note.content}`
      mimeType = 'text/markdown'
    }

    const blob = new Blob([content], { type: mimeType })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = filename
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
    
    toast.success(`Note exported as ${format.toUpperCase()}`)
  }

  // Export all notes
  const exportAllNotes = (format = 'txt') => {
    if (notes.length === 0) {
      toast.warning('No notes to export')
      return
    }

    let content = ''
    let filename = `vnx_notes_${new Date().toISOString().split('T')[0]}.${format}`
    let mimeType = 'text/plain'

    if (format === 'md') {
      content = notes.map(note => `# ${note.title}\n\n${note.content}\n\n---\n\n`).join('')
      mimeType = 'text/markdown'
    } else {
      content = notes.map(note => `${note.title}\n${'='.repeat(note.title.length)}\n\n${note.content}\n\n`).join('')
    }

    const blob = new Blob([content], { type: mimeType })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = filename
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
    
    toast.success(`All notes exported as ${format.toUpperCase()}`)
  }

  // Get all unique tags
  const getAllTags = () => {
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
  }

  // Filter notes based on selected tag and search query
  const getFilteredNotes = () => {
    let filtered = notes

    // Filter by tag
    if (selectedTag !== 'all') {
      filtered = filtered.filter(note => 
        note.tags && note.tags.toLowerCase().includes(selectedTag.toLowerCase())
      )
    }

    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter(note => 
        note.title.toLowerCase().includes(query) ||
        note.content.toLowerCase().includes(query) ||
        (note.tags && note.tags.toLowerCase().includes(query))
      )
    }

    // Sort: pinned notes first, then by updated date
    return filtered.sort((a, b) => {
      if (a.isPinned && !b.isPinned) return -1
      if (!a.isPinned && b.isPinned) return 1
      return new Date(b.updatedAt) - new Date(a.updatedAt)
    })
  }

  // Clear all notes
  const clearAllNotes = () => {
    setNotes([])
    toast.success('All notes cleared!')
  }

  const value = {
    notes,
    loading,
    selectedTag,
    setSelectedTag,
    searchQuery,
    setSearchQuery,
    createNote,
    updateNote,
    deleteNote,
    duplicateNote,
    togglePin,
    exportNote,
    exportAllNotes,
    getAllTags,
    getFilteredNotes,
    clearAllNotes
  }

  return (
    <NotesContext.Provider value={value}>
      {children}
    </NotesContext.Provider>
  )
}


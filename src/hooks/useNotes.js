import { useState, useEffect } from 'react'
import { notesService } from '../lib/supabaseClient'
import { useAuth } from './useAuth'
import { toast } from 'react-toastify'

export const useNotes = () => {
  const { user } = useAuth()
  const [notes, setNotes] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // Load notes when user changes
  useEffect(() => {
    if (user) {
      loadNotes()
    } else {
      setNotes([])
      setLoading(false)
    }
  }, [user])

  const loadNotes = async () => {
    if (!user) return

    try {
      setLoading(true)
      setError(null)
      const data = await notesService.getNotes(user.id)
      setNotes(data || [])
    } catch (err) {
      console.error('Error loading notes:', err)
      setError(err.message)
      toast.error('Failed to load notes')
    } finally {
      setLoading(false)
    }
  }

  const createNote = async (noteData) => {
    if (!user) return

    try {
      const newNote = {
        ...noteData,
        user_id: user.id,
        created_at: new Date().toISOString()
      }
      
      const createdNote = await notesService.createNote(newNote)
      setNotes(prev => [createdNote, ...prev])
      toast.success('Note created successfully!')
      return createdNote
    } catch (err) {
      console.error('Error creating note:', err)
      toast.error('Failed to create note')
      throw err
    }
  }

  const updateNote = async (id, updates) => {
    try {
      const updatedNote = await notesService.updateNote(id, {
        ...updates,
        updated_at: new Date().toISOString()
      })
      
      setNotes(prev => prev.map(note => 
        note.id === id ? updatedNote : note
      ))
      toast.success('Note updated successfully!')
      return updatedNote
    } catch (err) {
      console.error('Error updating note:', err)
      toast.error('Failed to update note')
      throw err
    }
  }

  const deleteNote = async (id) => {
    try {
      await notesService.deleteNote(id)
      setNotes(prev => prev.filter(note => note.id !== id))
      toast.success('Note deleted successfully!')
    } catch (err) {
      console.error('Error deleting note:', err)
      toast.error('Failed to delete note')
      throw err
    }
  }

  return {
    notes,
    loading,
    error,
    loadNotes,
    createNote,
    updateNote,
    deleteNote
  }
}


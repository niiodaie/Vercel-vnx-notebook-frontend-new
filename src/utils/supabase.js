import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://xuptevcpwsuxckuhsnwr.supabase.co'
// In production, this should be set as an environment variable
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh1cHRldmNwd3N1eGNrdWhzbnciLCJyb2xlIjoiYW5vbiIsImlhdCI6MTczNTAyNzQ5NCwiZXhwIjoyMDUwNjAzNDk0fQ.YhCJqGNOQfQOQhLGQfQOQhLGQfQOQhLGQfQOQhLGQfQ'

export const supabase = createClient(supabaseUrl, supabaseKey)

// Notes API functions
export const notesAPI = {
  // Get all notes
  async getAllNotes() {
    try {
      const { data, error } = await supabase
        .from('notes')
        .select('*')
        .order('created_at', { ascending: false })
      
      if (error) {
        console.error('Supabase error:', error)
        throw error
      }
      return data || []
    } catch (error) {
      console.error('Error fetching notes:', error)
      // Fallback to localStorage if Supabase fails
      const localNotes = localStorage.getItem('vnx-notes')
      return localNotes ? JSON.parse(localNotes) : []
    }
  },

  // Create a new note
  async createNote(note) {
    try {
      const noteData = {
        title: note.title,
        content: note.content,
        tag: note.tags,
        language: note.format,
        created_at: new Date().toISOString()
      }

      const { data, error } = await supabase
        .from('notes')
        .insert([noteData])
        .select()
      
      if (error) {
        console.error('Supabase error:', error)
        throw error
      }
      
      return data[0]
    } catch (error) {
      console.error('Error creating note:', error)
      // Fallback to localStorage
      const newNote = {
        id: Date.now(),
        title: note.title,
        content: note.content,
        tag: note.tags,
        language: note.format,
        created_at: new Date().toISOString()
      }
      
      const existingNotes = JSON.parse(localStorage.getItem('vnx-notes') || '[]')
      const updatedNotes = [newNote, ...existingNotes]
      localStorage.setItem('vnx-notes', JSON.stringify(updatedNotes))
      
      return newNote
    }
  },

  // Update a note
  async updateNote(id, note) {
    try {
      const { data, error } = await supabase
        .from('notes')
        .update({
          title: note.title,
          content: note.content,
          tag: note.tags,
          language: note.format
        })
        .eq('id', id)
        .select()
      
      if (error) {
        console.error('Supabase error:', error)
        throw error
      }
      
      return data[0]
    } catch (error) {
      console.error('Error updating note:', error)
      // Fallback to localStorage
      const existingNotes = JSON.parse(localStorage.getItem('vnx-notes') || '[]')
      const updatedNotes = existingNotes.map(n => 
        n.id === id 
          ? { ...n, title: note.title, content: note.content, tag: note.tags, language: note.format }
          : n
      )
      localStorage.setItem('vnx-notes', JSON.stringify(updatedNotes))
      
      return updatedNotes.find(n => n.id === id)
    }
  },

  // Delete a note
  async deleteNote(id) {
    try {
      const { error } = await supabase
        .from('notes')
        .delete()
        .eq('id', id)
      
      if (error) {
        console.error('Supabase error:', error)
        throw error
      }
      
      return true
    } catch (error) {
      console.error('Error deleting note:', error)
      // Fallback to localStorage
      const existingNotes = JSON.parse(localStorage.getItem('vnx-notes') || '[]')
      const updatedNotes = existingNotes.filter(n => n.id !== id)
      localStorage.setItem('vnx-notes', JSON.stringify(updatedNotes))
      
      return true
    }
  },

  // Filter notes by tag
  async getNotesByTag(tag) {
    try {
      const { data, error } = await supabase
        .from('notes')
        .select('*')
        .ilike('tag', `%${tag}%`)
        .order('created_at', { ascending: false })
      
      if (error) {
        console.error('Supabase error:', error)
        throw error
      }
      
      return data || []
    } catch (error) {
      console.error('Error filtering notes:', error)
      // Fallback to localStorage
      const localNotes = JSON.parse(localStorage.getItem('vnx-notes') || '[]')
      return localNotes.filter(note => 
        note.tag && note.tag.toLowerCase().includes(tag.toLowerCase())
      )
    }
  },

  // Test connection
  async testConnection() {
    try {
      const { data, error } = await supabase
        .from('notes')
        .select('count')
        .limit(1)
      
      return !error
    } catch (error) {
      console.error('Connection test failed:', error)
      return false
    }
  }
}


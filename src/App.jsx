import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import './i18n/i18n'; // ✅ correct path

function App() {
  const { t } = useTranslation();
  
  // State management
  const [notes, setNotes] = useState([]);
  const [currentNote, setCurrentNote] = useState({
    id: null,
    title: '',
    content: '',
    tags: '',
    format: 'plain'
  });
  const [filterTag, setFilterTag] = useState('');
  const [isEditing, setIsEditing] = useState(false);

  // Load notes from localStorage on component mount
  useEffect(() => {
    const savedNotes = localStorage.getItem('vnx-notes');
    if (savedNotes) {
      setNotes(JSON.parse(savedNotes));
    }
  }, []);

  // Save notes to localStorage whenever notes change
  useEffect(() => {
    localStorage.setItem('vnx-notes', JSON.stringify(notes));
  }, [notes]);

  // Auto-formatting based on content type
  const formatContent = (content, format) => {
    switch (format) {
      case 'markdown':
        return content; // In a real app, you'd apply markdown formatting
      case 'code':
        return content; // In a real app, you'd apply code highlighting
      case 'list':
        // Auto-format as bullet points if not already formatted
        if (!content.includes('•') && !content.includes('-')) {
          return content.split('\n').filter(line => line.trim()).map(line => `• ${line.trim()}`).join('\n');
        }
        return content;
      default:
        return content;
    }
  };

  // Handle saving a note
  const saveNote = () => {
    if (!currentNote.title.trim()) return;

    const formattedContent = formatContent(currentNote.content, currentNote.format);
    const noteToSave = {
      ...currentNote,
      content: formattedContent,
      id: currentNote.id || Date.now(),
      createdAt: currentNote.id ? currentNote.createdAt : new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    if (currentNote.id) {
      // Update existing note
      setNotes(notes.map(note => note.id === currentNote.id ? noteToSave : note));
    } else {
      // Add new note
      setNotes([noteToSave, ...notes]);
    }

    // Reset form
    setCurrentNote({ id: null, title: '', content: '', tags: '', format: 'plain' });
    setIsEditing(false);
  };

  // Handle editing a note
  const editNote = (note) => {
    setCurrentNote(note);
    setIsEditing(true);
  };

  // Handle deleting a note
  const deleteNote = (id) => {
    setNotes(notes.filter(note => note.id !== id));
  };

  // Filter notes by tag
  const filteredNotes = notes.filter(note => {
    if (!filterTag) return true;
    return note.tags.toLowerCase().includes(filterTag.toLowerCase());
  });

  // Get unique tags for filter dropdown
  const allTags = [...new Set(notes.flatMap(note => 
    note.tags.split(',').map(tag => tag.trim()).filter(tag => tag)
  ))];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
              🧠 {t('title')}
            </h1>
            
            {/* Language Selector */}
            <div className="flex items-center gap-2">
              <label className="text-sm text-gray-600 hidden sm:inline">
                {t('language')}:
              </label>
              <select
                onChange={(e) => i18n.changeLanguage(e.target.value)}
                defaultValue={i18n.language}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white text-sm"
              >
                <option value="en">🇬🇧 English</option>
                <option value="fr">🇫🇷 Français</option>
                <option value="es">🇪🇸 Español</option>
                <option value="de">🇩🇪 Deutsch</option>
                <option value="zh">🇨🇳 中文</option>
                <option value="sw">🇹🇿 Kiswahili</option>
              </select>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Note Editor */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <h2 className="text-lg font-semibold mb-4 text-gray-800">
                {isEditing ? t('editNote') : t('createNote')}
              </h2>
              
              {/* Title Input */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t('noteTitle')}
                </label>
                <input
                  type="text"
                  value={currentNote.title}
                  onChange={(e) => setCurrentNote({...currentNote, title: e.target.value})}
                  placeholder={t('noteTitlePlaceholder')}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              {/* Format Selection */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t('format')}
                </label>
                <select
                  value={currentNote.format}
                  onChange={(e) => setCurrentNote({...currentNote, format: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="plain">{t('formatPlain')}</option>
                  <option value="markdown">{t('formatMarkdown')}</option>
                  <option value="code">{t('formatCode')}</option>
                  <option value="list">{t('formatList')}</option>
                </select>
              </div>

              {/* Content Textarea */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t('content')}
                </label>
                <textarea
                  value={currentNote.content}
                  onChange={(e) => setCurrentNote({...currentNote, content: e.target.value})}
                  placeholder={t('contentPlaceholder')}
                  rows={8}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-vertical"
                />
              </div>

              {/* Tags Input */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t('tags')}
                </label>
                <input
                  type="text"
                  value={currentNote.tags}
                  onChange={(e) => setCurrentNote({...currentNote, tags: e.target.value})}
                  placeholder={t('tagsPlaceholder')}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <p className="text-xs text-gray-500 mt-1">{t('tagsHelp')}</p>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2">
                <button
                  onClick={saveNote}
                  disabled={!currentNote.title.trim()}
                  className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
                >
                  {isEditing ? t('updateNote') : t('saveNote')}
                </button>
                {isEditing && (
                  <button
                    onClick={() => {
                      setCurrentNote({ id: null, title: '', content: '', tags: '', format: 'plain' });
                      setIsEditing(false);
                    }}
                    className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    {t('cancel')}
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Notes List */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm border">
              {/* Filter Section */}
              <div className="p-4 border-b bg-gray-50 rounded-t-lg">
                <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
                  <h2 className="text-lg font-semibold text-gray-800">
                    {t('myNotes')} ({filteredNotes.length})
                  </h2>
                  
                  {/* Tag Filter */}
                  <div className="flex items-center gap-2">
                    <label className="text-sm text-gray-600 whitespace-nowrap">
                      {t('filterByTag')}:
                    </label>
                    <select
                      value={filterTag}
                      onChange={(e) => setFilterTag(e.target.value)}
                      className="px-3 py-1 border border-gray-300 rounded text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="">{t('allTags')}</option>
                      {allTags.map(tag => (
                        <option key={tag} value={tag}>{tag}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              {/* Notes Grid */}
              <div className="p-4">
                {filteredNotes.length === 0 ? (
                  <div className="text-center py-12 text-gray-500">
                    <div className="text-4xl mb-4">📝</div>
                    <p className="text-lg mb-2">{t('noNotes')}</p>
                    <p className="text-sm">{t('createFirstNote')}</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {filteredNotes.map(note => (
                      <div key={note.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="font-semibold text-gray-800 truncate flex-1 mr-2">
                            {note.title}
                          </h3>
                          <div className="flex gap-1">
                            <button
                              onClick={() => editNote(note)}
                              className="text-blue-600 hover:text-blue-800 p-1 rounded"
                              title={t('edit')}
                            >
                              ✏️
                            </button>
                            <button
                              onClick={() => deleteNote(note.id)}
                              className="text-red-600 hover:text-red-800 p-1 rounded"
                              title={t('delete')}
                            >
                              🗑️
                            </button>
                          </div>
                        </div>
                        
                        <div className="text-sm text-gray-600 mb-2">
                          <span className="bg-gray-100 px-2 py-1 rounded text-xs">
                            {t(`format${note.format.charAt(0).toUpperCase() + note.format.slice(1)}`)}
                          </span>
                        </div>
                        
                        <p className="text-gray-700 text-sm mb-3 line-clamp-3">
                          {note.content.substring(0, 150)}
                          {note.content.length > 150 && '...'}
                        </p>
                        
                        {note.tags && (
                          <div className="flex flex-wrap gap-1 mb-2">
                            {note.tags.split(',').map((tag, index) => (
                              <span key={index} className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs">
                                {tag.trim()}
                              </span>
                            ))}
                          </div>
                        )}
                        
                        <div className="text-xs text-gray-500">
                          {t('updated')}: {new Date(note.updatedAt).toLocaleDateString()}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-white border-t mt-12">
        <div className="max-w-6xl mx-auto px-4 py-6 text-center text-sm text-gray-600">
          <p>
            {t('poweredBy')} <a href="https://visnec.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800">Visnec</a>
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;


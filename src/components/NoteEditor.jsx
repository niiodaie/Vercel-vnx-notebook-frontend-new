import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

const NoteEditor = ({ onSave, onCancel, editingNote, isEditing }) => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    tags: '',
    format: 'plain'
  });

  // Load editing note data
  useEffect(() => {
    if (editingNote) {
      setFormData({
        title: editingNote.title || '',
        content: editingNote.content || '',
        tags: editingNote.tags || '',
        format: editingNote.format || 'plain'
      });
    } else {
      setFormData({
        title: '',
        content: '',
        tags: '',
        format: 'plain'
      });
    }
  }, [editingNote]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFormatChange = (e) => {
    const format = e.target.value;
    setFormData(prev => ({
      ...prev,
      format
    }));
    
    // Auto-format content based on selected format
    if (format === 'markdown' && !formData.content.includes('#')) {
      setFormData(prev => ({
        ...prev,
        content: prev.content ? `# ${prev.title}\n\n${prev.content}` : ''
      }));
    } else if (format === 'code' && !formData.content.includes('```')) {
      setFormData(prev => ({
        ...prev,
        content: prev.content ? `\`\`\`\n${prev.content}\n\`\`\`` : ''
      }));
    } else if (format === 'list' && !formData.content.includes('- ')) {
      setFormData(prev => ({
        ...prev,
        content: prev.content ? prev.content.split('\n').map(line => line.trim() ? `- ${line}` : line).join('\n') : ''
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!formData.title.trim() || !formData.content.trim()) {
      alert(t('fillAllFields'));
      return;
    }

    onSave(formData);
    
    if (!isEditing) {
      setFormData({
        title: '',
        content: '',
        tags: '',
        format: 'plain'
      });
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">
        {isEditing ? t('editNote') : t('createNote')}
      </h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Title Input */}
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
            {t('noteTitle')}
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            placeholder={t('noteTitlePlaceholder')}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
            required
          />
        </div>

        {/* Format Selection */}
        <div>
          <label htmlFor="format" className="block text-sm font-medium text-gray-700 mb-1">
            {t('format')}
          </label>
          <select
            id="format"
            name="format"
            value={formData.format}
            onChange={handleFormatChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
          >
            <option value="plain">{t('formatPlain')}</option>
            <option value="markdown">{t('formatMarkdown')}</option>
            <option value="code">{t('formatCode')}</option>
            <option value="list">{t('formatList')}</option>
          </select>
        </div>

        {/* Content Textarea */}
        <div>
          <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-1">
            {t('content')}
          </label>
          <textarea
            id="content"
            name="content"
            value={formData.content}
            onChange={handleInputChange}
            placeholder={t('contentPlaceholder')}
            rows={6}
            className={`w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors resize-vertical ${
              formData.format === 'code' ? 'font-mono text-sm' : ''
            }`}
            required
          />
        </div>

        {/* Tags Input */}
        <div>
          <label htmlFor="tags" className="block text-sm font-medium text-gray-700 mb-1">
            {t('tags')}
          </label>
          <input
            type="text"
            id="tags"
            name="tags"
            value={formData.tags}
            onChange={handleInputChange}
            placeholder={t('tagsPlaceholder')}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
          />
          <p className="text-xs text-gray-500 mt-1">{t('tagsHint')}</p>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 pt-2">
          <button
            type="submit"
            className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors font-medium"
          >
            {isEditing ? t('updateNote') : t('saveNote')}
          </button>
          
          {isEditing && onCancel && (
            <button
              type="button"
              onClick={onCancel}
              className="px-4 py-2 text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors font-medium"
            >
              {t('cancel')}
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default NoteEditor;


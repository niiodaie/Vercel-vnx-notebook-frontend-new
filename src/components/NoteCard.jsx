import React from 'react';
import { useTranslation } from 'react-i18next';

const NoteCard = ({ note, onEdit, onDelete }) => {
  const { t } = useTranslation();

  // Format content preview (first 150 characters)
  const getContentPreview = (content) => {
    if (!content) return '';
    return content.length > 150 ? content.substring(0, 150) + '...' : content;
  };

  // Format date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  // Get format icon
  const getFormatIcon = (format) => {
    switch (format) {
      case 'markdown': return '📝';
      case 'code': return '💻';
      case 'list': return '📋';
      default: return '📄';
    }
  };

  // Get format color
  const getFormatColor = (format) => {
    switch (format) {
      case 'markdown': return 'bg-green-100 text-green-800';
      case 'code': return 'bg-purple-100 text-purple-800';
      case 'list': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 border border-gray-100 overflow-hidden">
      {/* Card Header */}
      <div className="p-4 border-b border-gray-100">
        <div className="flex items-start justify-between mb-2">
          <h3 className="text-lg font-semibold text-gray-800 line-clamp-2 flex-1 mr-2">
            {note.title}
          </h3>
          <div className="flex gap-1 flex-shrink-0">
            <button
              onClick={() => onEdit(note)}
              className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
              title={t('editNote')}
            >
              ✏️
            </button>
            <button
              onClick={() => onDelete(note.id)}
              className="p-1.5 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
              title={t('deleteNote')}
            >
              🗑️
            </button>
          </div>
        </div>
        
        {/* Format Badge */}
        <div className="flex items-center gap-2 mb-2">
          <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${getFormatColor(note.format)}`}>
            <span>{getFormatIcon(note.format)}</span>
            {t(`format${note.format.charAt(0).toUpperCase() + note.format.slice(1)}`)}
          </span>
        </div>
      </div>

      {/* Card Content */}
      <div className="p-4">
        {/* Content Preview */}
        <div className="mb-3">
          <p className="text-gray-600 text-sm leading-relaxed whitespace-pre-wrap">
            {getContentPreview(note.content)}
          </p>
        </div>

        {/* Tags */}
        {note.tags && (
          <div className="mb-3">
            <div className="flex flex-wrap gap-1">
              {note.tags.split(',').map((tag, index) => (
                <span
                  key={index}
                  className="inline-block bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded-full"
                >
                  #{tag.trim()}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Metadata */}
        <div className="text-xs text-gray-400 space-y-1">
          <div>
            {t('created')}: {formatDate(note.createdAt)}
          </div>
          {note.updatedAt && note.updatedAt !== note.createdAt && (
            <div>
              {t('updated')}: {formatDate(note.updatedAt)}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default NoteCard;


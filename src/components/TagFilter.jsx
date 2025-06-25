import React from 'react';
import { useTranslation } from 'react-i18next';

const TagFilter = ({ tags, selectedTag, onTagSelect }) => {
  const { t } = useTranslation();

  return (
    <div className="bg-white rounded-xl shadow-sm p-4 border border-gray-100">
      <div className="flex items-center gap-4">
        <label htmlFor="tagFilter" className="text-sm font-medium text-gray-700 whitespace-nowrap">
          {t('filterByTag')}:
        </label>
        
        <select
          id="tagFilter"
          value={selectedTag}
          onChange={(e) => onTagSelect(e.target.value)}
          className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
        >
          <option value="all">{t('allTags')}</option>
          {tags.map((tag, index) => (
            <option key={index} value={tag}>
              #{tag}
            </option>
          ))}
        </select>
        
        {selectedTag !== 'all' && (
          <button
            onClick={() => onTagSelect('all')}
            className="px-3 py-2 text-sm text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
          >
            {t('clearFilter')}
          </button>
        )}
      </div>
      
      {tags.length > 0 && (
        <div className="mt-3 pt-3 border-t border-gray-100">
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => onTagSelect('all')}
              className={`px-3 py-1 text-xs rounded-full transition-colors ${
                selectedTag === 'all'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {t('allTags')} ({tags.length})
            </button>
            {tags.map((tag, index) => (
              <button
                key={index}
                onClick={() => onTagSelect(tag)}
                className={`px-3 py-1 text-xs rounded-full transition-colors ${
                  selectedTag === tag
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                #{tag}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default TagFilter;


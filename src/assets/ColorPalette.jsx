import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Palette, X } from 'lucide-react'
import { useTranslation } from 'react-i18next'

const NOTE_COLORS = [
  { name: 'yellow', color: '#fef3c7', darkColor: '#fbbf24', label: 'Sunny Yellow' },
  { name: 'pink', color: '#fce7f3', darkColor: '#ec4899', label: 'Soft Pink' },
  { name: 'blue', color: '#dbeafe', darkColor: '#3b82f6', label: 'Ocean Blue' },
  { name: 'green', color: '#d1fae5', darkColor: '#10b981', label: 'Fresh Green' },
  { name: 'purple', color: '#e9d5ff', darkColor: '#8b5cf6', label: 'Royal Purple' },
  { name: 'orange', color: '#fed7aa', darkColor: '#f97316', label: 'Warm Orange' },
  { name: 'red', color: '#fecaca', darkColor: '#ef4444', label: 'Cherry Red' },
  { name: 'gray', color: '#f3f4f6', darkColor: '#6b7280', label: 'Cool Gray' }
]

const ColorPalette = ({ isVisible, onClose, selectedColor, onColorSelect }) => {
  const { t } = useTranslation()

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="mb-6 p-6 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl border border-white/20 dark:border-gray-700/50 shadow-soft"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2">
              <Palette className="w-5 h-5 text-gray-600 dark:text-gray-400" />
              <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                {t('chooseNoteColor')}
              </h3>
            </div>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={onClose}
              className="p-1 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 transition-colors duration-200"
            >
              <X className="w-5 h-5" />
            </motion.button>
          </div>

          <div className="grid grid-cols-4 sm:grid-cols-8 gap-3">
            {NOTE_COLORS.map((noteColor, index) => (
              <motion.button
                key={noteColor.name}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => onColorSelect(noteColor.name)}
                className={`relative w-16 h-16 rounded-xl border-3 transition-all duration-200 group ${
                  selectedColor === noteColor.name
                    ? 'border-gray-800 dark:border-gray-200 scale-110 shadow-lg'
                    : 'border-gray-300 dark:border-gray-600 hover:border-gray-500 dark:hover:border-gray-400'
                }`}
                style={{ backgroundColor: noteColor.color }}
                title={noteColor.label}
              >
                {/* Color preview with gradient */}
                <div 
                  className="absolute inset-1 rounded-lg opacity-80"
                  style={{ 
                    background: `linear-gradient(135deg, ${noteColor.color} 0%, ${noteColor.darkColor} 100%)` 
                  }}
                />
                
                {/* Selection indicator */}
                {selectedColor === noteColor.name && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute inset-0 flex items-center justify-center"
                  >
                    <div className="w-6 h-6 bg-white dark:bg-gray-800 rounded-full shadow-md flex items-center justify-center">
                      <div className="w-3 h-3 bg-gray-800 dark:bg-gray-200 rounded-full" />
                    </div>
                  </motion.div>
                )}

                {/* Hover effect */}
                <div className="absolute inset-0 bg-white/20 dark:bg-black/20 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
              </motion.button>
            ))}
          </div>

          <div className="mt-4 text-center">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {t('colorPaletteDescription')}
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default ColorPalette


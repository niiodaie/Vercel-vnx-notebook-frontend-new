import React from 'react'
import { motion } from 'framer-motion'
import { Plus, FileText, Sparkles, Mic } from 'lucide-react'
import { useTranslation } from 'react-i18next'

const EmptyState = ({ onNewNote, hasFilters }) => {
  const { t } = useTranslation()

  if (hasFilters) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center py-16"
      >
        <motion.div
          animate={{ rotate: [0, 10, -10, 0] }}
          transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
          className="text-6xl mb-4"
        >
          🔍
        </motion.div>
        <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-2">
          {t('noNotesFound')}
        </h3>
        <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-md mx-auto">
          {t('noNotesFoundDescription')}
        </p>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onNewNote}
          className="btn-primary"
        >
          <Plus className="w-4 h-4 mr-2" />
          {t('createFirstNote')}
        </motion.button>
      </motion.div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="text-center py-16"
    >
      {/* Animated illustration */}
      <div className="relative mb-8">
        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          className="text-8xl mb-4"
        >
          📝
        </motion.div>
        
        {/* Floating elements */}
        <motion.div
          animate={{ 
            x: [0, 20, 0],
            y: [0, -15, 0],
            rotate: [0, 10, 0]
          }}
          transition={{ duration: 4, repeat: Infinity, delay: 0.5 }}
          className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-4"
        >
          <Sparkles className="w-6 h-6 text-yellow-500" />
        </motion.div>
        
        <motion.div
          animate={{ 
            x: [0, -25, 0],
            y: [0, -10, 0],
            rotate: [0, -15, 0]
          }}
          transition={{ duration: 3.5, repeat: Infinity, delay: 1 }}
          className="absolute top-4 right-1/2 transform translate-x-1/2"
        >
          <FileText className="w-5 h-5 text-blue-500" />
        </motion.div>
        
        <motion.div
          animate={{ 
            x: [0, 15, 0],
            y: [0, -20, 0],
            rotate: [0, 20, 0]
          }}
          transition={{ duration: 4.5, repeat: Infinity, delay: 1.5 }}
          className="absolute top-8 left-1/2 transform -translate-x-1/2 translate-x-8"
        >
          <Mic className="w-4 h-4 text-red-500" />
        </motion.div>
      </div>

      <motion.h2
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="text-3xl font-bold gradient-text mb-4"
      >
        {t('welcomeToVNX')}
      </motion.h2>
      
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="text-lg text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto leading-relaxed"
      >
        {t('emptyStateDescription')}
      </motion.p>

      {/* Feature highlights */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 max-w-4xl mx-auto"
      >
        <div className="text-center p-4">
          <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center mx-auto mb-3">
            <Mic className="w-6 h-6 text-white" />
          </div>
          <h3 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">
            {t('voiceToText')}
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            {t('voiceToTextDescription')}
          </p>
        </div>

        <div className="text-center p-4">
          <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-teal-600 rounded-xl flex items-center justify-center mx-auto mb-3">
            <FileText className="w-6 h-6 text-white" />
          </div>
          <h3 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">
            {t('smartFormatting')}
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            {t('smartFormattingDescription')}
          </p>
        </div>

        <div className="text-center p-4">
          <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-600 rounded-xl flex items-center justify-center mx-auto mb-3">
            <Sparkles className="w-6 h-6 text-white" />
          </div>
          <h3 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">
            {t('colorfulNotes')}
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            {t('colorfulNotesDescription')}
          </p>
        </div>
      </motion.div>

      {/* Call to action */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.9 }}
        className="space-y-4"
      >
        <motion.button
          whileHover={{ scale: 1.05, y: -2 }}
          whileTap={{ scale: 0.95 }}
          onClick={onNewNote}
          className="btn-primary text-lg px-8 py-4 shadow-lg hover:shadow-xl"
        >
          <Plus className="w-5 h-5 mr-2" />
          {t('createFirstNote')}
        </motion.button>
        
        <p className="text-sm text-gray-500 dark:text-gray-400">
          {t('getStartedHint')}
        </p>
      </motion.div>
    </motion.div>
  )
}

export default EmptyState


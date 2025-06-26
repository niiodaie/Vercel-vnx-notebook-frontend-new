import React from 'react'
import { useTranslation } from 'react-i18next'
import { LogOut, User } from 'lucide-react'
import { useAuth } from '../hooks/useAuth'
import LanguageSelector from './LanguageSelector'

const Header = () => {
  const { t } = useTranslation()
  const { user, signOut } = useAuth()

  const handleSignOut = async () => {
    try {
      await signOut()
    } catch (error) {
      console.error('Error signing out:', error)
    }
  }

  return (
    <header className="bg-white/80 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 max-w-6xl">
        <div className="flex items-center justify-between">
          {/* Logo and Title */}
          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-2">
              <span className="text-3xl">📝</span>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">VNX Notebook</h1>
                <p className="text-sm text-gray-600 hidden sm:block">{t('headerSubtitle')}</p>
              </div>
            </div>
          </div>

          {/* Right Side - User Info and Controls */}
          <div className="flex items-center space-x-4">
            {/* Language Selector */}
            <LanguageSelector />

            {/* User Info */}
            {user && (
              <div className="hidden sm:flex items-center space-x-3 px-3 py-2 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center">
                    <User className="w-4 h-4 text-primary-600" />
                  </div>
                  <div className="text-sm">
                    <p className="font-medium text-gray-900 truncate max-w-32">
                      {user.email}
                    </p>
                    <p className="text-gray-500">{t('loggedIn')}</p>
                  </div>
                </div>
              </div>
            )}

            {/* Logout Button */}
            <button
              onClick={handleSignOut}
              className="flex items-center space-x-2 px-3 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
              title={t('signOut')}
            >
              <LogOut className="w-4 h-4" />
              <span className="hidden sm:inline text-sm font-medium">{t('signOut')}</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header


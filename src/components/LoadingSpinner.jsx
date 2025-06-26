import React from 'react'
import { Loader2 } from 'lucide-react'

const LoadingSpinner = ({ size = 'default', text = 'Loading...' }) => {
  const sizeClasses = {
    small: 'w-4 h-4',
    default: 'w-8 h-8',
    large: 'w-12 h-12'
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="flex flex-col items-center space-y-4">
        <Loader2 className={`${sizeClasses[size]} animate-spin text-primary-600`} />
        <p className="text-gray-600 text-sm font-medium">{text}</p>
      </div>
    </div>
  )
}

export default LoadingSpinner


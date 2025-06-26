import React from 'react';

const VNoteLogo = ({ className = '', size = 'md' }) => {
  const sizeClasses = {
    sm: 'w-6 h-6',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
    xl: 'w-16 h-16'
  };

  const textSizes = {
    sm: 'text-lg',
    md: 'text-xl',
    lg: 'text-2xl',
    xl: 'text-3xl'
  };

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      {/* Notepad Icon */}
      <div className={`${sizeClasses[size]} flex-shrink-0`}>
        <svg 
          viewBox="0 0 100 100" 
          className="w-full h-full"
          fill="currentColor"
        >
          {/* Spiral binding holes */}
          <circle cx="20" cy="15" r="3" fill="currentColor" />
          <circle cx="35" cy="15" r="3" fill="currentColor" />
          <circle cx="50" cy="15" r="3" fill="currentColor" />
          <circle cx="65" cy="15" r="3" fill="currentColor" />
          <circle cx="80" cy="15" r="3" fill="currentColor" />
          
          {/* Notepad body */}
          <rect 
            x="10" 
            y="25" 
            width="80" 
            height="65" 
            rx="4" 
            ry="4" 
            fill="currentColor"
            stroke="currentColor"
            strokeWidth="2"
          />
          
          {/* Lines on the notepad */}
          <line x1="20" y1="40" x2="80" y2="40" stroke="white" strokeWidth="1.5" opacity="0.7" />
          <line x1="20" y1="50" x2="80" y2="50" stroke="white" strokeWidth="1.5" opacity="0.7" />
          <line x1="20" y1="60" x2="65" y2="60" stroke="white" strokeWidth="1.5" opacity="0.7" />
        </svg>
      </div>
      
      {/* vNote Text */}
      <span className={`font-bold text-gray-800 ${textSizes[size]}`}>
        vNote
      </span>
    </div>
  );
};

export default VNoteLogo;


import React from 'react';
import Editor from 'react-simple-code-editor';
import { highlight, languages } from 'prismjs/components/prism-core';
import 'prismjs/components/prism-clike';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-python';
import 'prismjs/components/prism-java';
import 'prismjs/components/prism-css';
import 'prismjs/components/prism-markup';
import 'prismjs/components/prism-json';
import 'prismjs/components/prism-sql';
import 'prismjs/themes/prism.css';

const SmartCodeEditor = ({ 
  value, 
  onChange, 
  language = 'plain', 
  placeholder = 'Write your code here...',
  className = ''
}) => {
  // Language mapping for Prism.js
  const languageMap = {
    'javascript': 'javascript',
    'python': 'python',
    'java': 'java',
    'html': 'markup',
    'css': 'css',
    'json': 'json',
    'sql': 'sql',
    'markdown': 'markdown',
    'plain': null
  };

  const prismLanguage = languageMap[language.toLowerCase()] || null;

  // If it's plain text or unsupported language, use regular textarea
  if (!prismLanguage || language === 'plain') {
    return (
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={`w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-y min-h-[200px] font-mono text-sm ${className}`}
        rows={8}
      />
    );
  }

  // Use code editor with syntax highlighting
  return (
    <div className={`border border-gray-300 rounded-lg overflow-hidden ${className}`}>
      <Editor
        value={value}
        onValueChange={onChange}
        highlight={code => {
          try {
            return highlight(code, languages[prismLanguage], prismLanguage);
          } catch (error) {
            return code;
          }
        }}
        padding={12}
        placeholder={placeholder}
        style={{
          fontFamily: '"Fira code", "Fira Mono", monospace',
          fontSize: 14,
          minHeight: '200px',
          backgroundColor: '#f8f9fa',
          outline: 'none'
        }}
        textareaProps={{
          style: {
            outline: 'none',
            resize: 'vertical'
          }
        }}
      />
    </div>
  );
};

export default SmartCodeEditor;


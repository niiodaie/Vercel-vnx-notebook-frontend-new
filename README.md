# VNX Notebook

A smart, multilingual note-taking application built with React, Vite, and Tailwind CSS. Part of the Visnec Nexus (VNX) ecosystem.

![VNX Notebook](https://img.shields.io/badge/VNX-Notebook-blue?style=for-the-badge)
![React](https://img.shields.io/badge/React-18+-blue?style=flat-square&logo=react)
![Vite](https://img.shields.io/badge/Vite-5+-646CFF?style=flat-square&logo=vite)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS-38B2AC?style=flat-square&logo=tailwind-css)

## ✨ Features

- **Smart Note-Taking**: Create, edit, and delete notes with rich formatting options
- **Multi-Format Support**: Plain text, Markdown, Code blocks, and Bullet lists
- **Tag-Based Organization**: Filter and organize notes using tags
- **Multilingual Interface**: Support for 6 languages (EN, FR, ES, DE, ZH, SW)
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile devices
- **Local Storage**: Notes are automatically saved to your browser's local storage
- **Auto-Formatting**: Content automatically formats based on selected type
- **Toast Notifications**: Real-time feedback for all actions

## 🌍 Supported Languages

- 🇺🇸 English
- 🇫🇷 French (Français)
- 🇪🇸 Spanish (Español)
- 🇩🇪 German (Deutsch)
- 🇨🇳 Chinese (中文)
- 🇰🇪 Swahili (Kiswahili)

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone or extract the project:
```bash
git clone <your-repo-url>
cd vnx-notebook
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

## 📦 Build for Production

```bash
npm run build
```

The built files will be in the `dist/` directory, ready for deployment.

## 🌐 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Deploy with default settings (Vite preset)

### Render

1. Push your code to GitHub
2. Create a new Static Site on Render
3. Set build command: `npm run build`
4. Set publish directory: `dist`

### Other Platforms

The application works with any static hosting service:
- Netlify
- GitHub Pages
- Firebase Hosting
- AWS S3 + CloudFront

## 🏗️ Project Structure

```
vnx-notebook/
├── public/
│   └── locales/           # Translation files
│       ├── en/translation.json
│       ├── fr/translation.json
│       └── ... (other languages)
├── src/
│   ├── components/        # React components
│   │   ├── NoteEditor.jsx
│   │   ├── NoteCard.jsx
│   │   ├── TagFilter.jsx
│   │   └── LanguageSelector.jsx
│   ├── App.jsx           # Main application
│   ├── main.jsx          # Entry point
│   ├── index.css         # Global styles
│   ├── App.css           # Component styles
│   └── i18n.js           # Internationalization setup
├── index.html
├── tailwind.config.js
├── postcss.config.js
├── vite.config.js
└── package.json
```

## 🛠️ Tech Stack

- **Frontend Framework**: React 18
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **Internationalization**: i18next
- **Notifications**: React Toastify
- **Storage**: Browser LocalStorage

## 📱 Features Overview

### Note Management
- Create notes with title, content, tags, and format
- Edit existing notes inline
- Delete notes with confirmation
- Auto-save to local storage

### Smart Formatting
- **Plain Text**: Standard text formatting
- **Markdown**: Auto-adds markdown headers
- **Code Block**: Monospace font with code formatting
- **Bullet List**: Converts lines to bullet points

### Tag System
- Add multiple tags separated by commas
- Filter notes by specific tags
- Visual tag buttons for quick filtering
- Tag count display

### Multilingual Support
- Complete UI translation for 6 languages
- Language selector with flag icons
- Persistent language preference
- Professional translations

## 🎨 UI/UX Features

- Modern, clean interface design
- Smooth hover animations and transitions
- Responsive grid layout for notes
- Color-coded format badges
- Toast notifications for user feedback
- Mobile-optimized touch interactions

## 🔧 Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

### Adding New Languages

1. Create a new translation file in `public/locales/{language-code}/translation.json`
2. Add the language to the `languages` array in `LanguageSelector.jsx`
3. Follow the existing translation key structure

### Customizing Styles

The application uses Tailwind CSS for styling. Key customization points:
- `tailwind.config.js` - Theme configuration
- `src/index.css` - Global styles and utilities
- `src/App.css` - Component-specific styles

## 🌟 Part of VNX Ecosystem

VNX Notebook is part of the Visnec Nexus (VNX) ecosystem - a collection of tools, platforms, and applications designed for modern productivity and collaboration.

**Powered by [Visnec](https://visnec.com)**

## 📄 License

This project is part of the Visnec Nexus ecosystem. All rights reserved.

## 🤝 Contributing

This is a production application within the VNX ecosystem. For feature requests or bug reports, please contact the Visnec team.

---

**Made with ❤️ by the Visnec Team**


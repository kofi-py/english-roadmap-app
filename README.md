# English Mastery Roadmap

A comprehensive, beautifully designed English learning platform built with React.

## Features

- **80+ Curated Courses** from kindergarten through college level
- **13 Learning Levels** with clear progression
- **Interactive Diagnostic Test** to find your perfect starting point
- **Progress Tracking** with localStorage persistence
- **Community Forum** for learners to connect
- **Search Functionality** to filter courses
- **Literary Aesthetic** with elegant typography and design

## Project Structure

```
english-roadmap-app/
├── src/
│   ├── components/
│   │   ├── Navigation.jsx
│   │   ├── Footer.jsx
│   │   ├── StatCard.jsx
│   │   ├── CourseItem.jsx
│   │   └── ProgressBar.jsx
│   ├── pages/
│   │   ├── HomePage.jsx
│   │   ├── CurriculumPage.jsx
│   │   ├── DiagnosticPage.jsx
│   │   └── ForumPage.jsx
│   ├── data/
│   │   ├── coursesData.js
│   │   ├── diagnosticData.js
│   │   └── forumData.js
│   ├── styles/
│   │   ├── global.css
│   │   ├── Navigation.css
│   │   ├── Footer.css
│   │   ├── HomePage.css
│   │   ├── CurriculumPage.css
│   │   ├── DiagnosticPage.css
│   │   ├── ForumPage.css
│   │   ├── StatCard.css
│   │   ├── CourseItem.css
│   │   └── ProgressBar.css
│   ├── App.jsx
│   └── main.jsx
├── index.html
├── package.json
├── vite.config.js
└── README.md
```

## Installation

1. Install dependencies:
```bash
npm install
```

2. Run development server:
```bash
npm run dev
```

3. Build for production:
```bash
npm run build
```

## Design Philosophy

**Literary Elegance:**
- Crimson Text serif font for headings (classical, bookish)
- Lora serif font for body text (warm, readable)
- Rich color palette: ink blue, saddle brown, forest green
- Warm paper tones for backgrounds
- Decorative quotation marks and literary quotes

**User Experience:**
- Clear navigation with sticky header
- Smooth animations and transitions
- Progress tracking with visual feedback
- Responsive design for all devices
- Search and filtering capabilities

## Technologies

- React 18
- Vite (build tool)
- CSS (no frameworks - custom styles)
- localStorage for progress tracking

## Color Palette

- **Ink Blue** (#2c3e50) - Primary text
- **Saddle Brown** (#8B4513) - Accents
- **Forest Green** (#228B22) - Highlights
- **Warm Paper** (#f5f1e8) - Background
- **Aged Parchment** (#e8e3d6) - Secondary background

## License

MIT

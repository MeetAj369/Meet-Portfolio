# Meet Chauhan — Personal Portfolio

A premium, production-ready personal portfolio website built with React and modern web technologies.

![React](https://img.shields.io/badge/React-18-61DAFB?style=flat&logo=react)
![Vite](https://img.shields.io/badge/Vite-5-646CFF?style=flat&logo=vite)
![CSS3](https://img.shields.io/badge/CSS3-Modules-1572B6?style=flat&logo=css3)
![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-F7DF1E?style=flat&logo=javascript)

## ✨ Features

- 🎨 **Dark & Light Themes** — Premium dark mode with elegant gradients, smooth theme transitions, persisted in localStorage
- ⚡ **Performance Optimized** — Lazy loading, code splitting, optimized builds
- 🎭 **Rich Animations** — Scroll reveal, typewriter effect, animated counters, particle background, custom cursor
- 📱 **Fully Responsive** — Pixel-perfect on desktop, tablet, and mobile
- 🔍 **SEO Optimized** — Meta tags, Open Graph, Twitter Cards, JSON-LD structured data, semantic HTML
- ♿ **Accessible** — ARIA labels, keyboard navigation, proper contrast, focus management
- 🧩 **Component-Based** — Clean, reusable React components with CSS Modules
- 🚀 **Deploy Ready** — One-click deploy to Vercel, Netlify, or GitHub Pages

## 📋 Sections

1. **Hero** — Full-screen introduction with typing animation
2. **About Me** — Professional story with info cards and timeline
3. **Skills & Technologies** — Categorized skill cards with animated progress bars
4. **Featured Projects** — Project showcase with detail modals
5. **Experience** — Interactive timeline UI
6. **Certifications** — Certificate grid with modals
7. **Education** — Academic timeline
8. **Statistics** — Animated number counters
9. **Resume** — View & download resume
10. **Contact** — Contact form with validation
11. **Footer** — Quick links, social, copyright

## 🛠 Tech Stack

| Technology | Purpose |
|-----------|---------|
| React 18 | UI Framework |
| Vite 5 | Build Tool |
| CSS Modules | Scoped Styling |
| Lucide React | Icons |
| JavaScript ES6+ | Logic |

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/meetaj0369/meet-portfolio.git
cd meet-portfolio

# Install dependencies
npm install

# Start development server
npm run dev
```

The app will open at [http://localhost:3000](http://localhost:3000)

### Build for Production

```bash
npm run build
```

The optimized build will be in the `dist/` folder.

### Preview Production Build

```bash
npm run preview
```

## 📁 Project Structure

```
meet-portfolio/
├── public/
│   ├── resume/              # Place Meet_Chauhan_Resume.pdf here
│   ├── favicon.svg
│   ├── robots.txt
│   ├── sitemap.xml
│   └── manifest.json
├── src/
│   ├── components/
│   │   ├── common/          # Reusable components
│   │   │   ├── Navbar/
│   │   │   ├── Footer/
│   │   │   ├── ThemeToggle/
│   │   │   ├── ScrollProgress/
│   │   │   ├── BackToTop/
│   │   │   ├── Loader/
│   │   │   ├── Modal/
│   │   │   ├── SectionTitle/
│   │   │   ├── AnimatedCounter/
│   │   │   ├── ParticleBackground/
│   │   │   └── CustomCursor/
│   │   └── sections/        # Page sections
│   │       ├── Hero/
│   │       ├── About/
│   │       ├── Skills/
│   │       ├── Projects/
│   │       ├── Experience/
│   │       ├── Certifications/
│   │       ├── Education/
│   │       ├── Statistics/
│   │       ├── Resume/
│   │       └── Contact/
│   ├── data/                # Content data files
│   ├── hooks/               # Custom React hooks
│   ├── styles/              # Global styles
│   ├── utils/               # Utility functions
│   ├── App.jsx
│   ├── App.module.css
│   └── main.jsx
├── index.html
├── vite.config.js
├── package.json
└── README.md
```

## 📄 Resume Setup

Place your resume PDF at:
```
public/resume/Meet_Chauhan_Resume.pdf
```

The "View Resume" button will open it in a new tab, and "Download Resume" will trigger a download.

## 🌐 Deployment

### Vercel (Recommended)
1. Push to GitHub
2. Import project on [vercel.com](https://vercel.com)
3. Vite is auto-detected — click Deploy

### Netlify
1. Push to GitHub
2. Connect repo on [netlify.com](https://netlify.com)
3. Build command: `npm run build`
4. Publish directory: `dist`

### GitHub Pages
1. Install gh-pages: `npm install -D gh-pages`
2. Add to package.json scripts: `"deploy": "gh-pages -d dist"`
3. Run: `npm run build && npm run deploy`

## ⌨️ Keyboard Shortcuts

| Shortcut | Action |
|----------|--------|
| `Alt + T` | Toggle dark/light theme |

## 📝 Customization

- **Content**: Edit files in `src/data/` to update personal information, skills, projects, etc.
- **Theme Colors**: Modify CSS custom properties in `src/styles/globals.css`
- **Fonts**: Change font imports in `src/styles/typography.css`

## 📜 License

© 2026 Meet Chauhan. All rights reserved.

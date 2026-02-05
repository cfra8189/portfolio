# Installation Instructions

To install this site locally, follow these steps:

1. **Clone the repository**: Open your terminal and run the commandto clone the repository to your local machine.

```bash
git clone https://github.com/zzzzshawn/template-portfolio.git
```

2.  **Navigate to the project directory**: Change into the project directory by running

```bash
**Project Title**: Clarence Franklin — Portfolio

**Overview**:
- **Purpose**: A personal portfolio site showcasing projects, skills, timeline, and contact options.
- **Stack**: React, Vite, Tailwind CSS, Framer Motion and small UI primitives.

**Table of Contents**
- Overview
- Features
- Demo
- Getting Started
- Project Structure
- Fonts & Assets
- Scripts
- Deployment
- Contributing
- License
- Acknowledgements
- Contact

**Features**:
- Hero with rotating headline and animated text reveal.
- Custom cursor and theme-aware styles.
- Projects, Skills, Timeline and Modal contact form.
- Say Hello CTA (mailto) and Download Resume link.
- Full-screen GIF background (customizable).

**Demo**:
- Local development: Runs at the Vite dev server (typically http://localhost:5173).

**Getting Started**

Prerequisites:
- Node.js (LTS) and npm installed.

Installation:
```bash
npm install
```

Start dev server:
```bash
npm run dev
```

Build for production:
```bash
npm run build
```

Preview production build:
```bash
npm run preview
```

**Project Structure (high level)**:
- `index.html` — App entry
- `src/main.jsx` — React app bootstrap
- `src/index.css` — Tailwind + global styles (font-face, background)
- `src/App.jsx` — App layout and routes
- `src/components/` — UI and shared components (Hero, Footer, Projects, etc.)
- `public/` — Static assets (fonts, Resume.pdf, images, GIF background)

**Fonts & Assets**:
- Custom font: Place your ChicagoFLF.ttf in `public/fonts/ChicagoFLF.ttf`.
    - The project registers the font in `src/index.css` and sets it as the root font.
- Resume: Place `Resume.pdf` at `public/Resume.pdf` so the Download button works.
- Background GIF: The project uses the provided GIF URL as a full-screen background; you can replace it in `src/index.css`.

**Scripts**:
- `npm run dev` — Start development server
- `npm run build` — Build production bundle
- `npm run preview` — Locally preview the production build
- `npm run lint` — Run ESLint checks

**Deployment**:
- Build with `npm run build` and deploy the `dist` folder to any static host (Netlify, Vercel, GitHub Pages, etc.).
- Ensure `public/` assets (fonts, Resume.pdf) are published alongside `index.html`.

**Contributing**:
- Fork, create a feature branch, open a PR with clear description and screenshots.
- Keep changes focused and avoid unrelated refactors.

**License**:
- Add your preferred license here (e.g., MIT). If you want me to add a license file, tell me which one.

**Acknowledgements**:
- Template structure and README format inspired by the work of zzzzshawn (template author). This README adapts that structure for this portfolio.

**Contact**:
- Email: cfra8189@gmail.com


---

Notes:
- To finalize the site, add `public/ChicagoFLF.ttf` and `public/Resume.pdf`. Restart the dev server after adding new files.
- If you want the README to include screenshots or a live demo link, provide an image URL or deployment URL and I will add them.

"use strict";

module.exports = function reactTemplate(projectName) {
  return {
    "package.json": JSON.stringify({
      name: projectName,
      version: "0.1.0",
      private: true,
      scripts: {
        dev: "vite",
        build: "vite build",
        preview: "vite preview"
      },
      dependencies: {
        react: "^18.3.1",
        "react-dom": "^18.3.1"
      },
      devDependencies: {
        "@vitejs/plugin-react": "^4.3.4",
        vite: "^6.0.1"
      }
    }, null, 2),

    "vite.config.js": `import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
});
`,

    "index.html": `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="description" content="${projectName} — A React application" />
    <title>${projectName}</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.jsx"></script>
  </body>
</html>
`,

    "src/main.jsx": `import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
`,

    "src/App.jsx": `import React, { useState } from 'react';
import './App.css';

export default function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="app">
      <header className="hero">
        <div className="hero-content">
          <div className="logo">⚛</div>
          <h1>${projectName}</h1>
          <p>Your React + Vite project is ready.</p>
          <button className="btn" onClick={() => setCount((c) => c + 1)}>
            Count: {count}
          </button>
        </div>
      </header>
      <main className="container">
        <div className="card">
          <h2>🚀 Getting Started</h2>
          <p>
            Edit <code>src/App.jsx</code> to start building. Hot reload is enabled.
          </p>
        </div>
      </main>
    </div>
  );
}
`,

    "src/index.css": `*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
:root { font-family: 'Inter', system-ui, sans-serif; color-scheme: dark; }
body { background: #0f0f13; color: #e8e8f0; }
`,

    "src/App.css": `.app { min-height: 100vh; }

.hero {
  background: linear-gradient(135deg, #0f0f13 0%, #111827 100%);
  padding: 6rem 2rem;
  text-align: center;
  position: relative;
  overflow: hidden;
}
.hero::before {
  content: '';
  position: absolute;
  inset: 0;
  background: radial-gradient(ellipse at 50% 0%, rgba(56,189,248,0.2) 0%, transparent 70%);
}
.hero-content { position: relative; z-index: 1; }
.logo { font-size: 4rem; margin-bottom: 1rem; animation: spin 10s linear infinite; }
@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }

h1 {
  font-size: clamp(2rem, 5vw, 3.5rem);
  font-weight: 800;
  letter-spacing: -0.03em;
  background: linear-gradient(90deg, #fff 30%, #38bdf8);
  -webkit-background-clip: text; -webkit-text-fill-color: transparent;
  margin-bottom: 1rem;
}
.hero p { color: #888; font-size: 1.1rem; margin-bottom: 2rem; }

.btn {
  background: #0ea5e9;
  color: #fff;
  border: none;
  padding: 0.75rem 2rem;
  border-radius: 999px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: transform 0.2s, box-shadow 0.2s;
  box-shadow: 0 4px 20px rgba(14,165,233,0.4);
}
.btn:hover { transform: translateY(-2px); box-shadow: 0 8px 30px rgba(14,165,233,0.5); }

.container { max-width: 900px; margin: 4rem auto; padding: 0 1.5rem; }
.card {
  background: #1a1a24;
  border: 1px solid rgba(255,255,255,0.08);
  border-radius: 12px;
  padding: 2rem;
}
.card h2 { font-size: 1.3rem; margin-bottom: 0.75rem; }
.card p { color: #888; line-height: 1.6; }
code {
  background: rgba(14,165,233,0.15);
  color: #38bdf8;
  padding: 0.15em 0.4em;
  border-radius: 4px;
  font-size: 0.9em;
}
`,

    "README.md": `# ${projectName}

> A React + Vite project scaffolded with [create-devkit](https://npmjs.com/package/create-devkit).

## Getting Started

\`\`\`bash
npm run dev      # Start dev server
npm run build    # Build for production
npm run preview  # Preview production build
\`\`\`

## Project Structure

\`\`\`
${projectName}/
├── index.html
├── vite.config.js
├── src/
│   ├── main.jsx
│   ├── App.jsx
│   ├── App.css
│   └── index.css
└── package.json
\`\`\`
`,
  };
};

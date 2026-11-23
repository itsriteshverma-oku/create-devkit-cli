"use strict";

module.exports = function vanillaTemplate(projectName) {
  return {
    "index.html": `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="description" content="${projectName} — A Vanilla JS application" />
    <title>${projectName}</title>
    <link rel="stylesheet" href="style.css" />
  </head>
  <body>
    <div id="app">
      <header class="hero">
        <div class="hero-content">
          <h1>⚡ ${projectName}</h1>
          <p>Your Vanilla JS project is ready.</p>
          <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript" target="_blank" class="btn">
            Explore the Docs →
          </a>
        </div>
      </header>
      <main class="container">
        <div class="card">
          <h2>🚀 Getting Started</h2>
          <p>Edit <code>src/main.js</code> to get started.</p>
        </div>
      </main>
    </div>
    <script type="module" src="src/main.js"></script>
  </body>
</html>
`,

    "style.css": `/* ── Reset & Base ─────────────────────────────── */
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

:root {
  --bg: #0f0f13;
  --surface: #1a1a24;
  --primary: #6c63ff;
  --primary-light: #9d96ff;
  --text: #e8e8f0;
  --muted: #888;
  --radius: 12px;
  font-family: 'Inter', system-ui, sans-serif;
  color-scheme: dark;
}

body { background: var(--bg); color: var(--text); min-height: 100vh; }

/* ── Hero ─────────────────────────────────────── */
.hero {
  background: linear-gradient(135deg, #0f0f13 0%, #1a1a30 100%);
  padding: 6rem 2rem;
  text-align: center;
  position: relative;
  overflow: hidden;
}
.hero::before {
  content: '';
  position: absolute;
  inset: 0;
  background: radial-gradient(ellipse at 50% 0%, rgba(108,99,255,0.25) 0%, transparent 70%);
}
.hero-content { position: relative; z-index: 1; }
.hero h1 {
  font-size: clamp(2rem, 5vw, 3.5rem);
  font-weight: 800;
  letter-spacing: -0.03em;
  background: linear-gradient(90deg, #fff 30%, var(--primary-light));
  -webkit-background-clip: text; -webkit-text-fill-color: transparent;
  margin-bottom: 1rem;
}
.hero p { color: var(--muted); font-size: 1.1rem; margin-bottom: 2rem; }

.btn {
  display: inline-block;
  background: var(--primary);
  color: #fff;
  padding: 0.75rem 1.75rem;
  border-radius: 999px;
  text-decoration: none;
  font-weight: 600;
  transition: transform 0.2s, box-shadow 0.2s;
  box-shadow: 0 4px 20px rgba(108,99,255,0.4);
}
.btn:hover { transform: translateY(-2px); box-shadow: 0 8px 30px rgba(108,99,255,0.5); }

/* ── Container & Card ────────────────────────── */
.container { max-width: 900px; margin: 4rem auto; padding: 0 1.5rem; }
.card {
  background: var(--surface);
  border: 1px solid rgba(255,255,255,0.08);
  border-radius: var(--radius);
  padding: 2rem;
}
.card h2 { font-size: 1.3rem; margin-bottom: 0.75rem; }
.card p { color: var(--muted); line-height: 1.6; }
code {
  background: rgba(108,99,255,0.15);
  color: var(--primary-light);
  padding: 0.15em 0.4em;
  border-radius: 4px;
  font-size: 0.9em;
}
`,

    "src/main.js": `// ── ${projectName} — main.js ──────────────────────────────────────
// Entry point for your Vanilla JS application.

document.addEventListener('DOMContentLoaded', () => {
  console.log('${projectName} is running!');
});
`,

    "package.json": JSON.stringify({
      name: projectName,
      version: "0.1.0",
      description: `${projectName} — Vanilla JS project`,
      scripts: {
        dev: "npx serve . -p 3000",
        start: "npx serve . -p 3000"
      },
      license: "MIT"
    }, null, 2),

    "README.md": `# ${projectName}

> A Vanilla JS project scaffolded with [create-devkit](https://npmjs.com/package/create-devkit).

## Getting Started

\`\`\`bash
npm run dev
\`\`\`

Then open [http://localhost:3000](http://localhost:3000).

## Project Structure

\`\`\`
${projectName}/
├── index.html
├── style.css
├── src/
│   └── main.js
└── package.json
\`\`\`
`,
  };
};

"use strict";

module.exports = function nodeApiTemplate(projectName) {
  return {
    "package.json": JSON.stringify({
      name: projectName,
      version: "0.1.0",
      description: `${projectName} — Express REST API`,
      main: "src/index.js",
      scripts: {
        dev: "nodemon src/index.js",
        start: "node src/index.js"
      },
      dependencies: {
        express: "^4.21.2",
        cors: "^2.8.5",
        dotenv: "^16.4.7",
        morgan: "^1.10.0"
      },
      devDependencies: {
        nodemon: "^3.1.9"
      },
      license: "MIT"
    }, null, 2),

    ".env.example": `PORT=3000
NODE_ENV=development
`,

    "src/index.js": `"use strict";
require('dotenv').config();
const app = require('./app');

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(\`\\n  🚀 ${projectName} API running\`);
  console.log(\`  ➜  http://localhost:\${PORT}\\n\`);
});
`,

    "src/app.js": `"use strict";
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const router = require('./routes');

const app = express();

// ── Middleware ────────────────────────────────────────────────────
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
if (process.env.NODE_ENV !== 'test') app.use(morgan('dev'));

// ── Routes ────────────────────────────────────────────────────────
app.use('/api/v1', router);

// ── Health check ──────────────────────────────────────────────────
app.get('/health', (_req, res) => {
  res.json({ status: 'ok', uptime: process.uptime() });
});

// ── 404 handler ───────────────────────────────────────────────────
app.use((_req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// ── Global error handler ──────────────────────────────────────────
app.use((err, _req, res, _next) => {
  console.error(err);
  res.status(err.status || 500).json({ error: err.message || 'Internal server error' });
});

module.exports = app;
`,

    "src/routes/index.js": `"use strict";
const { Router } = require('express');
const exampleRouter = require('./example.routes');

const router = Router();

router.use('/examples', exampleRouter);

module.exports = router;
`,

    "src/routes/example.routes.js": `"use strict";
const { Router } = require('express');
const controller = require('../controllers/example.controller');

const router = Router();

router.get('/', controller.getAll);
router.get('/:id', controller.getById);
router.post('/', controller.create);
router.delete('/:id', controller.remove);

module.exports = router;
`,

    "src/controllers/example.controller.js": `"use strict";

// In-memory store (replace with a real DB in production)
let items = [
  { id: 1, name: 'Item One', createdAt: new Date().toISOString() },
  { id: 2, name: 'Item Two', createdAt: new Date().toISOString() },
];
let nextId = 3;

exports.getAll = (_req, res) => res.json({ data: items });

exports.getById = (req, res) => {
  const item = items.find((i) => i.id === Number(req.params.id));
  if (!item) return res.status(404).json({ error: 'Not found' });
  res.json({ data: item });
};

exports.create = (req, res) => {
  const { name } = req.body;
  if (!name) return res.status(400).json({ error: '"name" is required' });
  const item = { id: nextId++, name, createdAt: new Date().toISOString() };
  items.push(item);
  res.status(201).json({ data: item });
};

exports.remove = (req, res) => {
  const idx = items.findIndex((i) => i.id === Number(req.params.id));
  if (idx === -1) return res.status(404).json({ error: 'Not found' });
  items.splice(idx, 1);
  res.status(204).send();
};
`,

    "README.md": `# ${projectName}

> An Express REST API scaffolded with [create-devkit](https://npmjs.com/package/create-devkit).

## Getting Started

\`\`\`bash
cp .env.example .env
npm run dev      # Start with hot-reload (nodemon)
npm start        # Start production
\`\`\`

## API Endpoints

| Method | URL                      | Description     |
|--------|--------------------------|-----------------|
| GET    | /health                  | Health check    |
| GET    | /api/v1/examples         | List all items  |
| GET    | /api/v1/examples/:id     | Get by ID       |
| POST   | /api/v1/examples         | Create item     |
| DELETE | /api/v1/examples/:id     | Delete item     |

## Project Structure

\`\`\`
${projectName}/
├── src/
│   ├── index.js           ← Server entry point
│   ├── app.js             ← Express app setup
│   ├── routes/
│   │   ├── index.js
│   │   └── example.routes.js
│   └── controllers/
│       └── example.controller.js
├── .env.example
└── package.json
\`\`\`
`,
  };
};

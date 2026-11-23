"use strict";

module.exports = function nodeApiTsTemplate(projectName) {
  return {
    "package.json": JSON.stringify({
      name: projectName,
      version: "0.1.0",
      description: `${projectName} — Express REST API with TypeScript`,
      main: "dist/index.js",
      scripts: {
        dev: "tsx watch src/index.ts",
        build: "tsc",
        start: "node dist/index.js",
        lint: "tsc --noEmit"
      },
      dependencies: {
        express: "^4.21.2",
        cors: "^2.8.5",
        dotenv: "^16.4.7",
        morgan: "^1.10.0"
      },
      devDependencies: {
        "@types/express": "^5.0.0",
        "@types/cors": "^2.8.17",
        "@types/morgan": "^1.9.9",
        "@types/node": "^22.10.1",
        typescript: "^5.7.2",
        tsx: "^4.19.2"
      },
      license: "MIT"
    }, null, 2),

    "tsconfig.json": JSON.stringify({
      compilerOptions: {
        target: "ES2020",
        module: "commonjs",
        lib: ["ES2020"],
        outDir: "./dist",
        rootDir: "./src",
        strict: true,
        esModuleInterop: true,
        skipLibCheck: true,
        forceConsistentCasingInFileNames: true,
        resolveJsonModule: true,
        declaration: true,
        declarationMap: true,
        sourceMap: true
      },
      include: ["src/**/*"],
      exclude: ["node_modules", "dist"]
    }, null, 2),

    ".env.example": `PORT=3000
NODE_ENV=development
`,

    "src/index.ts": `import dotenv from 'dotenv';
dotenv.config();

import app from './app';

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(\`\\n  🚀 ${projectName} API running\`);
  console.log(\`  ➜  http://localhost:\${PORT}\\n\`);
});
`,

    "src/app.ts": `import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import router from './routes';

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
app.use((err: Error & { status?: number }, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
  console.error(err);
  res.status(err.status || 500).json({ error: err.message || 'Internal server error' });
});

export default app;
`,

    "src/routes/index.ts": `import { Router } from 'express';
import exampleRouter from './example.routes';

const router = Router();

router.use('/examples', exampleRouter);

export default router;
`,

    "src/routes/example.routes.ts": `import { Router } from 'express';
import * as controller from '../controllers/example.controller';

const router = Router();

router.get('/', controller.getAll);
router.get('/:id', controller.getById);
router.post('/', controller.create);
router.delete('/:id', controller.remove);

export default router;
`,

    "src/controllers/example.controller.ts": `import { Request, Response } from 'express';

interface Item {
  id: number;
  name: string;
  createdAt: string;
}

// In-memory store (replace with a real DB in production)
let items: Item[] = [
  { id: 1, name: 'Item One', createdAt: new Date().toISOString() },
  { id: 2, name: 'Item Two', createdAt: new Date().toISOString() },
];
let nextId = 3;

export const getAll = (_req: Request, res: Response): void => {
  res.json({ data: items });
};

export const getById = (req: Request, res: Response): void => {
  const item = items.find((i) => i.id === Number(req.params.id));
  if (!item) {
    res.status(404).json({ error: 'Not found' });
    return;
  }
  res.json({ data: item });
};

export const create = (req: Request, res: Response): void => {
  const { name } = req.body;
  if (!name) {
    res.status(400).json({ error: '"name" is required' });
    return;
  }
  const item: Item = { id: nextId++, name, createdAt: new Date().toISOString() };
  items.push(item);
  res.status(201).json({ data: item });
};

export const remove = (req: Request, res: Response): void => {
  const idx = items.findIndex((i) => i.id === Number(req.params.id));
  if (idx === -1) {
    res.status(404).json({ error: 'Not found' });
    return;
  }
  items.splice(idx, 1);
  res.status(204).send();
};
`,

    "README.md": `# ${projectName}

> An Express REST API with TypeScript scaffolded with [create-devkit-cli](https://npmjs.com/package/create-devkit-cli).

## Getting Started

\`\`\`bash
cp .env.example .env
npm run dev      # Start with hot-reload (tsx watch)
npm run build    # Compile TypeScript
npm start        # Start production (from dist/)
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
│   ├── index.ts              ← Server entry point
│   ├── app.ts                ← Express app setup
│   ├── routes/
│   │   ├── index.ts
│   │   └── example.routes.ts
│   └── controllers/
│       └── example.controller.ts
├── tsconfig.json
├── .env.example
└── package.json
\`\`\`
`,
  };
};

# create-devkit-cli

> ⚡ Interactive CLI scaffolding tool — generate projects in seconds.

[![npm version](https://img.shields.io/npm/v/create-devkit-cli.svg?style=flat)](https://npmjs.com/package/create-devkit-cli)
[![license](https://img.shields.io/npm/l/create-devkit-cli.svg)](LICENSE)
[![downloads](https://img.shields.io/npm/dm/create-devkit-cli.svg)](https://npmjs.com/package/create-devkit-cli)

## ✨ Features

- 🎯 **4 Project Templates** — Vanilla JS, React + Vite, Express REST API, CLI Tool
- 🔧 **TypeScript Support** — React TS and Node API TS variants
- 📦 **Package Manager Choice** — npm, yarn, or pnpm
- 🔥 **Git Initialization** — optional `.gitignore` + `git init`
- 📥 **Auto-Install Dependencies** — runs install automatically
- 🎨 **Beautiful CLI UX** — colored output, loading spinners, branded banner
- 🏗️ **Production-Ready Code** — best-practice folder structures
- 🛡️ **Robust Error Handling** — graceful failures with helpful messages
- 👀 **Dry Run Mode** — preview what will be generated before writing

## Usage

```bash
# No install needed — just run:
npx create-devkit-cli

# Or with a pre-filled project name:
npx create-devkit-cli my-awesome-app

# Or with a specific template:
npx create-devkit-cli -t react
```

## Templates

| Template       | Stack                           |
|----------------|---------------------------------|
| `vanilla`      | HTML + CSS + Vanilla JS         |
| `react`        | Vite + React 18                 |
| `react-ts`     | Vite + React 18 + TypeScript    |
| `node-api`     | Express REST API (MVC)          |
| `node-api-ts`  | Express REST API + TypeScript   |
| `cli-tool`     | Commander.js + Inquirer.js      |

## What It Does

When you run `npx create-devkit-cli`, the interactive wizard will ask you:

1. 📁 **Project name** — the folder to create
2. 🎨 **Template** — choose from 6 project templates
3. 📦 **Package manager** — npm, yarn, or pnpm
4. 🔧 **Git init** — initialize a git repo automatically
5. 📥 **Install deps** — auto-install dependencies

Then it generates a fully structured, ready-to-run project with:
- Best-practice folder structure
- Beautiful starter UI (for frontend templates)
- Proper `package.json`, README, and config files
- TypeScript configuration (for TS templates)

## Commands

```bash
npx create-devkit-cli                     # Interactive wizard (default)
npx create-devkit-cli my-app              # Pre-fill project name
npx create-devkit-cli -t react-ts         # Skip template selection
npx create-devkit-cli --dry-run           # Preview without writing files
npx create-devkit-cli --version           # Print version
npx create-devkit-cli --help              # Show help
```

## Example Output

```
  ╔══════════════════════════════════╗
  ║       create-devkit  v1.1.0      ║
  ║   ⚡ Scaffold projects instantly  ║
  ╚══════════════════════════════════╝

  ? 📁 Project name: my-app
  ? 🎨 Select a project template: React + TypeScript (Vite + React + TS)
  ? 📦 Package manager: npm
  ? 🔧 Initialize a git repository? Yes
  ? 📥 Install dependencies automatically? Yes

  ✔ Created my-app/
  ✔ Scaffolded react-ts template
  ✔ Git repository initialized
  ✔ Dependencies installed

  ✔  Project ready! Happy hacking! 🚀

  Next steps:

    cd my-app
    npm run dev
```

## Author

**Ritesh Verma** — [GitHub](https://github.com/riteshverma)

## License

MIT © Ritesh Verma

"use strict";

const inquirer = require("inquirer");
const chalk = require("chalk");
const { scaffold } = require("./scaffold");

const TEMPLATES = [
  {
    name: `${chalk.yellow("⚡")} Vanilla JS       ${chalk.dim("(HTML + CSS + JS)")}`,
    value: "vanilla",
    short: "Vanilla JS",
  },
  {
    name: `${chalk.cyan("⚛")}  React            ${chalk.dim("(Vite + React)")}`,
    value: "react",
    short: "React",
  },
  {
    name: `${chalk.cyan("⚛")}  React + TS       ${chalk.dim("(Vite + React + TypeScript)")}`,
    value: "react-ts",
    short: "React + TS",
  },
  {
    name: `${chalk.green("🚀")} Node.js API      ${chalk.dim("(Express REST API)")}`,
    value: "node-api",
    short: "Node.js API",
  },
  {
    name: `${chalk.green("🚀")} Node.js API + TS ${chalk.dim("(Express + TypeScript)")}`,
    value: "node-api-ts",
    short: "Node.js API + TS",
  },
  {
    name: `${chalk.magenta("🛠")}  CLI Tool         ${chalk.dim("(Commander.js + Inquirer.js)")}`,
    value: "cli-tool",
    short: "CLI Tool",
  },
];

const PKG_MANAGERS = [
  { name: `npm  ${chalk.dim("(default)")}`, value: "npm" },
  { name: `yarn ${chalk.dim("(fast, offline cache)")}`, value: "yarn" },
  { name: `pnpm ${chalk.dim("(disk-efficient)")}`, value: "pnpm" },
];

async function runWizard({ projectName: prefilledName, template: prefilledTemplate, dryRun } = {}) {
  const pkg = require("../package.json");

  console.log();
  console.log(
    chalk.bold.cyan("  ╔══════════════════════════════════╗")
  );
  console.log(
    chalk.bold.cyan("  ║") +
    chalk.bold.white(`    create-devkit-cli  v${pkg.version}    `) +
    chalk.bold.cyan("║")
  );
  console.log(
    chalk.bold.cyan("  ║") +
    chalk.dim("   ⚡ Scaffold projects instantly   ") +
    chalk.bold.cyan("║")
  );
  console.log(
    chalk.bold.cyan("  ╚══════════════════════════════════╝")
  );
  console.log();

  const questions = [];

  if (!prefilledName) {
    questions.push({
      type: "input",
      name: "projectName",
      message: "📁 Project name:",
      default: "my-app",
      validate: (input) => {
        const trimmed = input.trim();
        if (!trimmed) return "Project name cannot be empty.";
        if (!/^[a-z0-9-_]+$/i.test(trimmed))
          return "Only letters, numbers, hyphens, and underscores allowed.";
        return true;
      },
      filter: (input) => input.trim(),
    });
  }

  if (!prefilledTemplate) {
    questions.push({
      type: "list",
      name: "template",
      message: "🎨 Select a project template:",
      choices: TEMPLATES,
      pageSize: 4,
    });
  }

  questions.push(
    {
      type: "list",
      name: "packageManager",
      message: "📦 Package manager:",
      choices: PKG_MANAGERS,
    },
    {
      type: "confirm",
      name: "gitInit",
      message: "🔧 Initialize a git repository?",
      default: true,
    },
    {
      type: "confirm",
      name: "installDeps",
      message: "📥 Install dependencies automatically?",
      default: true,
    }
  );

  const answers = await inquirer.prompt(questions);

  const config = {
    projectName: prefilledName || answers.projectName,
    template: prefilledTemplate || answers.template,
    packageManager: answers.packageManager,
    gitInit: answers.gitInit,
    installDeps: answers.installDeps,
    dryRun: dryRun || false,
  };

  // Hand off to scaffold engine
  await scaffold(config);
}

module.exports = { runWizard };

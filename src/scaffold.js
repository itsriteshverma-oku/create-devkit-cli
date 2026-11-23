"use strict";

const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");
const chalk = require("chalk");
const ora = require("ora");
const { getTemplateFiles } = require("./templates/index");

async function scaffold({ projectName, template, packageManager, gitInit, installDeps, dryRun }) {
  const targetDir = path.resolve(process.cwd(), projectName);

  console.log();

  // ── Dry Run Mode ──────────────────────────────────────────────────────────
  if (dryRun) {
    console.log(chalk.bold.yellow("  🔍 DRY RUN — no files will be written\n"));
    console.log(chalk.bold("  Project:  ") + chalk.cyan(projectName));
    console.log(chalk.bold("  Template: ") + chalk.green(template));
    console.log(chalk.bold("  Pkg mgr:  ") + packageManager);
    console.log(chalk.bold("  Git init: ") + (gitInit ? "yes" : "no"));
    console.log(chalk.bold("  Install:  ") + (installDeps ? "yes" : "no"));
    console.log(chalk.bold("  Target:   ") + targetDir);
    console.log();

    const files = getTemplateFiles(template, projectName);
    console.log(chalk.bold("  Files that would be created:"));
    console.log();
    for (const filePath of Object.keys(files).sort()) {
      console.log(chalk.dim("    ├── ") + chalk.white(filePath));
    }
    if (gitInit) {
      console.log(chalk.dim("    ├── ") + chalk.white(".gitignore"));
    }
    console.log();
    console.log(chalk.bold.yellow("  ✔ Dry run complete — run without --dry-run to create the project."));
    console.log();
    return;
  }

  // ── Check if directory already exists ──────────────────────────────────────
  if (fs.existsSync(targetDir)) {
    console.error(
      chalk.red(`✖  Directory "${projectName}" already exists. Please choose a different name.`)
    );
    process.exit(1);
  }

  // ── Create project directory ───────────────────────────────────────────────
  const spinnerDir = ora(`Creating ${chalk.cyan(projectName)}/`).start();
  try {
    fs.mkdirSync(targetDir, { recursive: true });
    spinnerDir.succeed(`Created ${chalk.cyan(projectName)}/`);
  } catch (err) {
    spinnerDir.fail("Failed to create project directory.");
    console.error(chalk.red(err.message));
    process.exit(1);
  }

  // ── Write template files ───────────────────────────────────────────────────
  const spinnerFiles = ora("Scaffolding project files…").start();
  try {
    const files = getTemplateFiles(template, projectName);
    for (const [filePath, content] of Object.entries(files)) {
      const fullPath = path.join(targetDir, filePath);
      fs.mkdirSync(path.dirname(fullPath), { recursive: true });
      fs.writeFileSync(fullPath, content, "utf8");
    }
    spinnerFiles.succeed(`Scaffolded ${chalk.green(template)} template`);
  } catch (err) {
    spinnerFiles.fail("Failed to scaffold template files.");
    console.error(chalk.red(err.message));
    process.exit(1);
  }

  // ── Git init ───────────────────────────────────────────────────────────────
  if (gitInit) {
    const spinnerGit = ora("Initializing git repository…").start();
    try {
      execSync("git init", { cwd: targetDir, stdio: "ignore" });
      fs.writeFileSync(
        path.join(targetDir, ".gitignore"),
        "node_modules/\ndist/\n.env\n.DS_Store\n",
        "utf8"
      );
      spinnerGit.succeed("Git repository initialized");
    } catch {
      spinnerGit.warn("Git not found — skipping git init");
    }
  }

  // ── Install dependencies ───────────────────────────────────────────────────
  if (installDeps) {
    const spinnerInstall = ora(
      `Installing dependencies with ${chalk.bold(packageManager)}…`
    ).start();
    try {
      const installCmd =
        packageManager === "yarn"
          ? "yarn"
          : packageManager === "pnpm"
          ? "pnpm install"
          : "npm install";
      execSync(installCmd, { cwd: targetDir, stdio: "ignore" });
      spinnerInstall.succeed("Dependencies installed");
    } catch {
      spinnerInstall.warn(
        `Could not auto-install — run "${packageManager === "npm" ? "npm install" : packageManager === "yarn" ? "yarn" : "pnpm install"}" manually`
      );
    }
  }

  // ── Success banner ─────────────────────────────────────────────────────────
  const devCmd =
    template === "node-api"
      ? `${packageManager === "npm" ? "npm run" : packageManager} dev`
      : template === "cli-tool"
      ? "node bin/cli.js"
      : `${packageManager === "npm" ? "npm run" : packageManager} dev`;

  const installCmd =
    packageManager === "yarn" ? "yarn" : packageManager === "pnpm" ? "pnpm install" : "npm install";

  console.log();
  console.log(chalk.bold.green("  ✔  Project ready! Happy hacking! 🚀"));
  console.log();
  console.log("  " + chalk.bold("Next steps:"));
  console.log();
  console.log(chalk.cyan(`    cd ${projectName}`));
  if (!installDeps) {
    console.log(chalk.cyan(`    ${installCmd}`));
  }
  console.log(chalk.cyan(`    ${devCmd}`));
  console.log();
}

module.exports = { scaffold };

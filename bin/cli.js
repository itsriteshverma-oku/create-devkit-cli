#!/usr/bin/env node

"use strict";

const { program } = require("commander");
const pkg = require("../package.json");
const { runWizard } = require("../src/prompts");

program
  .name("create-devkit-cli")
  .description("⚡ Interactive CLI scaffolding tool — generate projects in seconds")
  .version(pkg.version, "-v, --version", "Output the current version");

program
  .command("new [project-name]", { isDefault: true })
  .description("Scaffold a new project (default command)")
  .option("-t, --template <template>", "Project template (vanilla|react|react-ts|node-api|node-api-ts|cli-tool)")
  .option("--dry-run", "Preview what will be generated without writing files")
  .action(async (projectName, options) => {
    await runWizard({ projectName, template: options.template, dryRun: options.dryRun });
  });

program.addHelpText(
  "after",
  `
Examples:
  $ npx create-devkit-cli              Run interactive wizard
  $ npx create-devkit-cli my-app       Pre-fill project name
  $ npx create-devkit-cli -t react-ts  Skip template selection
  $ npx create-devkit-cli --dry-run    Preview without writing files
`
);

program.parse(process.argv);

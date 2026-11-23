"use strict";

module.exports = function cliToolTemplate(projectName) {
  return {
    "package.json": JSON.stringify({
      name: projectName,
      version: "0.1.0",
      description: `${projectName} — A CLI tool`,
      main: "src/index.js",
      bin: {
        [projectName]: "./bin/cli.js"
      },
      scripts: {
        start: `node bin/cli.js`,
        test: "echo \"No tests yet\" && exit 0"
      },
      dependencies: {
        chalk: "^4.1.2",
        commander: "^12.1.0",
        inquirer: "^8.2.7",
        ora: "^5.4.1"
      },
      license: "MIT"
    }, null, 2),

    "bin/cli.js": `#!/usr/bin/env node
"use strict";

const { program } = require("commander");
const pkg = require("../package.json");

program
  .name("${projectName}")
  .description(pkg.description)
  .version(pkg.version, "-v, --version");

program
  .command("hello [name]")
  .description("Say hello to someone")
  .option("-l, --loud", "Uppercase the output")
  .action(async (name = "World", opts) => {
    const { run } = require("../src/commands/hello");
    await run(name, opts);
  });

program.addHelpText("after", \`
Examples:
  $ ${projectName} hello
  $ ${projectName} hello Alice --loud
\`);

program.parse(process.argv);
`,

    "src/index.js": `"use strict";
// Main library entry point (optional — for programmatic usage)
module.exports = {};
`,

    "src/commands/hello.js": `"use strict";
const chalk = require("chalk");
const ora = require("ora");

async function run(name, opts = {}) {
  const spinner = ora("Preparing greeting…").start();
  await new Promise((r) => setTimeout(r, 600));
  spinner.stop();

  const greeting = \`Hello, \${name}! 👋\`;
  const output = opts.loud ? greeting.toUpperCase() : greeting;

  console.log();
  console.log(chalk.bold.cyan("  ┌─────────────────────────────┐"));
  console.log(chalk.bold.cyan("  │") + "  " + chalk.bold.white(output.padEnd(27)) + chalk.bold.cyan("│"));
  console.log(chalk.bold.cyan("  └─────────────────────────────┘"));
  console.log();
}

module.exports = { run };
`,

    "README.md": `# ${projectName}

> A CLI tool scaffolded with [create-devkit](https://npmjs.com/package/create-devkit).

## Installation

\`\`\`bash
# Link locally for development
npm link

# Or install globally when published
npm install -g ${projectName}
\`\`\`

## Usage

\`\`\`bash
${projectName} --help
${projectName} hello
${projectName} hello Alice --loud
\`\`\`

## Project Structure

\`\`\`
${projectName}/
├── bin/
│   └── cli.js           ← Entry point
├── src/
│   ├── index.js         ← Library entry (programmatic use)
│   └── commands/
│       └── hello.js     ← Example command
└── package.json
\`\`\`

## Publishing

\`\`\`bash
npm login
npm publish --access public
\`\`\`
`,
  };
};

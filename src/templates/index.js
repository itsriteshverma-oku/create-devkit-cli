"use strict";

const vanillaTemplate = require("./vanilla");
const reactTemplate = require("./react");
const reactTsTemplate = require("./react-ts");
const nodeApiTemplate = require("./node-api");
const nodeApiTsTemplate = require("./node-api-ts");
const cliToolTemplate = require("./cli-tool");

function getTemplateFiles(template, projectName) {
  switch (template) {
    case "vanilla":
      return vanillaTemplate(projectName);
    case "react":
      return reactTemplate(projectName);
    case "react-ts":
      return reactTsTemplate(projectName);
    case "node-api":
      return nodeApiTemplate(projectName);
    case "node-api-ts":
      return nodeApiTsTemplate(projectName);
    case "cli-tool":
      return cliToolTemplate(projectName);
    default:
      throw new Error(`Unknown template: "${template}"`);
  }
}

module.exports = { getTemplateFiles };

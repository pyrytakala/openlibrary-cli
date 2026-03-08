#!/usr/bin/env bun
import { Command } from "commander";
import { globalFlags } from "./lib/config.js";
import { authCommand } from "./commands/auth.js";
import { searchResource } from "./resources/search.js";
import { worksResource } from "./resources/works.js";
import { booksResource } from "./resources/books.js";
import { authorsResource } from "./resources/authors.js";
import { subjectsResource } from "./resources/subjects.js";
import { recentResource } from "./resources/recent.js";

const program = new Command();

program
  .name("openlibrary-cli")
  .description("CLI for the openlibrary API")
  .version("0.1.0")
  .option("--json", "Output as JSON", false)
  .option("--format <fmt>", "Output format: text, json, csv, yaml", "text")
  .option("--verbose", "Enable debug logging", false)
  .option("--no-color", "Disable colored output")
  .option("--no-header", "Omit table/csv headers (for piping)")
  .hook("preAction", (_thisCmd, actionCmd) => {
    const root = actionCmd.optsWithGlobals();
    globalFlags.json = root.json ?? false;
    globalFlags.format = root.format ?? "text";
    globalFlags.verbose = root.verbose ?? false;
    globalFlags.noColor = root.color === false;
    globalFlags.noHeader = root.header === false;
  });

// Built-in commands
program.addCommand(authCommand);

// Resources
program.addCommand(searchResource);
program.addCommand(worksResource);
program.addCommand(booksResource);
program.addCommand(authorsResource);
program.addCommand(subjectsResource);
program.addCommand(recentResource);

program.parse();

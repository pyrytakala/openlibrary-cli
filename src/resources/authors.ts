import { Command } from "commander";
import { client } from "../lib/client.js";
import { output } from "../lib/output.js";
import { handleError } from "../lib/errors.js";

export const authorsResource = new Command("authors")
  .description("Get author details and their works");

// ── GET ──────────────────────────────────────────────
authorsResource
  .command("get")
  .description("Get an author by OLID")
  .argument("<olid>", "Author OLID (e.g. OL23919A)")
  .option("--json", "Output as JSON")
  .option("--format <fmt>", "Output format: text, json, csv, yaml")
  .addHelpText("after", "\nExamples:\n  openlibrary-cli authors get OL23919A\n  openlibrary-cli authors get OL23919A --json")
  .action(async (olid: string, opts) => {
    try {
      const data = await client.get(`/authors/${olid}.json`) as any;
      const result = {
        key: data.key,
        name: data.name ?? "-",
        birth_date: data.birth_date ?? "-",
        death_date: data.death_date ?? "-",
        bio: typeof data.bio === "string" ? data.bio.slice(0, 200) : (data.bio?.value?.slice(0, 200) ?? "-"),
        wikipedia: data.wikipedia ?? "-",
      };
      output(result, { json: opts.json, format: opts.format });
    } catch (err) {
      handleError(err, opts.json);
    }
  });

// ── WORKS ────────────────────────────────────────────
authorsResource
  .command("works")
  .description("List works by an author")
  .argument("<olid>", "Author OLID (e.g. OL23919A)")
  .option("--limit <n>", "Max results", "10")
  .option("--offset <n>", "Pagination offset", "0")
  .option("--fields <cols>", "Comma-separated columns to display")
  .option("--json", "Output as JSON")
  .option("--format <fmt>", "Output format: text, json, csv, yaml")
  .addHelpText("after", "\nExamples:\n  openlibrary-cli authors works OL23919A\n  openlibrary-cli authors works OL23919A --limit 20 --json")
  .action(async (olid: string, opts) => {
    try {
      const params: Record<string, string> = { limit: opts.limit, offset: opts.offset };
      const data = await client.get(`/authors/${olid}/works.json`, params) as any;
      const entries = (data.entries ?? []).map((e: any) => ({
        key: e.key,
        title: e.title ?? "-",
        subjects: (e.subjects ?? []).slice(0, 3).join(", ") || "-",
        created: e.created?.value ?? "-",
      }));
      output(entries, { json: opts.json, format: opts.format, fields: opts.fields?.split(",") });
    } catch (err) {
      handleError(err, opts.json);
    }
  });

import { Command } from "commander";
import { client } from "../lib/client.js";
import { output } from "../lib/output.js";
import { handleError } from "../lib/errors.js";

export const worksResource = new Command("works")
  .description("Get works (books) by Open Library ID");

// ── GET ──────────────────────────────────────────────
worksResource
  .command("get")
  .description("Get a work by its Open Library ID")
  .argument("<olid>", "Work OLID (e.g. OL45804W)")
  .option("--json", "Output as JSON")
  .option("--format <fmt>", "Output format: text, json, csv, yaml")
  .addHelpText("after", "\nExamples:\n  openlibrary-cli works get OL45804W\n  openlibrary-cli works get OL45804W --json")
  .action(async (olid: string, opts) => {
    try {
      const data = await client.get(`/works/${olid}.json`) as any;
      const result = {
        key: data.key,
        title: data.title,
        subjects: (data.subjects ?? []).slice(0, 5).join(", ") || "-",
        description: typeof data.description === "string" ? data.description : data.description?.value ?? "-",
        created: data.created?.value ?? "-",
        last_modified: data.last_modified?.value ?? "-",
      };
      output(result, { json: opts.json, format: opts.format });
    } catch (err) {
      handleError(err, opts.json);
    }
  });

// ── EDITIONS ─────────────────────────────────────────
worksResource
  .command("editions")
  .description("List editions of a work")
  .argument("<olid>", "Work OLID (e.g. OL45804W)")
  .option("--limit <n>", "Max results", "10")
  .option("--offset <n>", "Pagination offset", "0")
  .option("--fields <cols>", "Comma-separated columns to display")
  .option("--json", "Output as JSON")
  .option("--format <fmt>", "Output format: text, json, csv, yaml")
  .addHelpText("after", "\nExamples:\n  openlibrary-cli works editions OL45804W\n  openlibrary-cli works editions OL45804W --limit 5 --json")
  .action(async (olid: string, opts) => {
    try {
      const params: Record<string, string> = { limit: opts.limit, offset: opts.offset };
      const data = await client.get(`/works/${olid}/editions.json`, params) as any;
      const entries = (data.entries ?? []).map((e: any) => ({
        key: e.key,
        title: e.title ?? "-",
        isbn: (e.isbn_13 ?? e.isbn_10 ?? ["-"])[0],
        publishers: (e.publishers ?? []).join(", ") || "-",
        publish_date: e.publish_date ?? "-",
        languages: (e.languages ?? []).map((l: any) => l.key?.replace("/languages/", "")).join(", ") || "-",
      }));
      output(entries, { json: opts.json, format: opts.format, fields: opts.fields?.split(",") });
    } catch (err) {
      handleError(err, opts.json);
    }
  });

// ── RATINGS ──────────────────────────────────────────
worksResource
  .command("ratings")
  .description("Get ratings for a work")
  .argument("<olid>", "Work OLID (e.g. OL45804W)")
  .option("--json", "Output as JSON")
  .option("--format <fmt>", "Output format: text, json, csv, yaml")
  .addHelpText("after", "\nExamples:\n  openlibrary-cli works ratings OL45804W\n  openlibrary-cli works ratings OL45804W --json")
  .action(async (olid: string, opts) => {
    try {
      const data = await client.get(`/works/${olid}/ratings.json`) as any;
      const result = {
        average: data.summary?.average ?? "-",
        count: data.summary?.count ?? 0,
        counts: data.counts ?? {},
      };
      output(result, { json: opts.json, format: opts.format });
    } catch (err) {
      handleError(err, opts.json);
    }
  });

// ── BOOKSHELVES ──────────────────────────────────────
worksResource
  .command("bookshelves")
  .description("Get reading log counts for a work")
  .argument("<olid>", "Work OLID (e.g. OL45804W)")
  .option("--json", "Output as JSON")
  .option("--format <fmt>", "Output format: text, json, csv, yaml")
  .addHelpText("after", "\nExamples:\n  openlibrary-cli works bookshelves OL45804W\n  openlibrary-cli works bookshelves OL45804W --json")
  .action(async (olid: string, opts) => {
    try {
      const data = await client.get(`/works/${olid}/bookshelves.json`) as any;
      output(data.counts ?? data, { json: opts.json, format: opts.format });
    } catch (err) {
      handleError(err, opts.json);
    }
  });

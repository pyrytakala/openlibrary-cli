import { Command } from "commander";
import { client } from "../lib/client.js";
import { output } from "../lib/output.js";
import { handleError } from "../lib/errors.js";

export const searchResource = new Command("search")
  .description("Search books, authors, and lists");

// ── BOOKS ────────────────────────────────────────────
searchResource
  .command("books")
  .description("Search for books/works")
  .argument("<query>", "Search query")
  .option("--title <title>", "Search by title")
  .option("--author <author>", "Search by author name")
  .option("--limit <n>", "Results per page", "10")
  .option("--page <n>", "Page number", "1")
  .option("--sort <sort>", "Sort: new, old, random, key")
  .option("--lang <lang>", "ISO 639-1 language code")
  .option("--fields <cols>", "Comma-separated columns to display")
  .option("--json", "Output as JSON")
  .option("--format <fmt>", "Output format: text, json, csv, yaml")
  .addHelpText("after", '\nExamples:\n  openlibrary-cli search books "lord of the rings"\n  openlibrary-cli search books "dune" --limit 5 --json\n  openlibrary-cli search books "" --author "tolkien" --sort new')
  .action(async (query: string, opts) => {
    try {
      const params: Record<string, string> = {
        q: query,
        limit: opts.limit,
        page: opts.page,
      };
      if (opts.title) params.title = opts.title;
      if (opts.author) params.author = opts.author;
      if (opts.sort) params.sort = opts.sort;
      if (opts.lang) params.lang = opts.lang;
      const data = await client.get("/search.json", params) as { docs?: unknown[] };
      const docs = (data.docs ?? []).map((d: any) => ({
        key: d.key,
        title: d.title,
        author: d.author_name?.join(", ") ?? "-",
        year: d.first_publish_year ?? "-",
        editions: d.edition_count ?? 0,
      }));
      output(docs, { json: opts.json, format: opts.format, fields: opts.fields?.split(",") });
    } catch (err) {
      handleError(err, opts.json);
    }
  });

// ── AUTHORS ──────────────────────────────────────────
searchResource
  .command("authors")
  .description("Search for authors")
  .argument("<query>", "Search query")
  .option("--limit <n>", "Results per page", "10")
  .option("--fields <cols>", "Comma-separated columns to display")
  .option("--json", "Output as JSON")
  .option("--format <fmt>", "Output format: text, json, csv, yaml")
  .addHelpText("after", '\nExamples:\n  openlibrary-cli search authors "tolkien"\n  openlibrary-cli search authors "asimov" --json')
  .action(async (query: string, opts) => {
    try {
      const params: Record<string, string> = { q: query, limit: opts.limit };
      const data = await client.get("/search/authors.json", params) as { docs?: unknown[] };
      const docs = (data.docs ?? []).map((d: any) => ({
        key: d.key,
        name: d.name,
        work_count: d.work_count ?? 0,
        birth_date: d.birth_date ?? "-",
        top_work: d.top_work ?? "-",
      }));
      output(docs, { json: opts.json, format: opts.format, fields: opts.fields?.split(",") });
    } catch (err) {
      handleError(err, opts.json);
    }
  });

// ── LISTS ────────────────────────────────────────────
searchResource
  .command("lists")
  .description("Search user lists")
  .argument("<query>", "Search query")
  .option("--limit <n>", "Results per page", "10")
  .option("--fields <cols>", "Comma-separated columns to display")
  .option("--json", "Output as JSON")
  .option("--format <fmt>", "Output format: text, json, csv, yaml")
  .addHelpText("after", '\nExamples:\n  openlibrary-cli search lists "sci-fi"\n  openlibrary-cli search lists "classics" --json')
  .action(async (query: string, opts) => {
    try {
      const params: Record<string, string> = { q: query, limit: opts.limit };
      const data = await client.get("/search/lists.json", params) as { docs?: unknown[] };
      const docs = (data.docs ?? []).map((d: any) => ({
        key: d.key,
        name: d.name,
        seed_count: d.seed_count ?? 0,
      }));
      output(docs, { json: opts.json, format: opts.format, fields: opts.fields?.split(",") });
    } catch (err) {
      handleError(err, opts.json);
    }
  });

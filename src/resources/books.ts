import { Command } from "commander";
import { client } from "../lib/client.js";
import { output } from "../lib/output.js";
import { handleError } from "../lib/errors.js";

export const booksResource = new Command("books")
  .description("Get book editions by OLID or ISBN");

// ── GET ──────────────────────────────────────────────
booksResource
  .command("get")
  .description("Get a book edition by OLID")
  .argument("<olid>", "Edition OLID (e.g. OL7353617M)")
  .option("--json", "Output as JSON")
  .option("--format <fmt>", "Output format: text, json, csv, yaml")
  .addHelpText("after", "\nExamples:\n  openlibrary-cli books get OL7353617M\n  openlibrary-cli books get OL7353617M --json")
  .action(async (olid: string, opts) => {
    try {
      const data = await client.get(`/books/${olid}.json`) as any;
      const result = {
        key: data.key,
        title: data.title ?? "-",
        publishers: (data.publishers ?? []).join(", ") || "-",
        publish_date: data.publish_date ?? "-",
        isbn_13: (data.isbn_13 ?? ["-"])[0],
        isbn_10: (data.isbn_10 ?? ["-"])[0],
        pages: data.number_of_pages ?? "-",
        languages: (data.languages ?? []).map((l: any) => l.key?.replace("/languages/", "")).join(", ") || "-",
        works: (data.works ?? []).map((w: any) => w.key).join(", ") || "-",
      };
      output(result, { json: opts.json, format: opts.format });
    } catch (err) {
      handleError(err, opts.json);
    }
  });

// ── ISBN ─────────────────────────────────────────────
booksResource
  .command("isbn")
  .description("Look up a book by ISBN")
  .argument("<isbn>", "ISBN-10 or ISBN-13")
  .option("--json", "Output as JSON")
  .option("--format <fmt>", "Output format: text, json, csv, yaml")
  .addHelpText("after", "\nExamples:\n  openlibrary-cli books isbn 9780140328721\n  openlibrary-cli books isbn 0140328726 --json")
  .action(async (isbn: string, opts) => {
    try {
      const data = await client.get(`/isbn/${isbn}.json`) as any;
      const result = {
        key: data.key,
        title: data.title ?? "-",
        publishers: (data.publishers ?? []).join(", ") || "-",
        publish_date: data.publish_date ?? "-",
        isbn_13: (data.isbn_13 ?? ["-"])[0],
        isbn_10: (data.isbn_10 ?? ["-"])[0],
        pages: data.number_of_pages ?? "-",
        works: (data.works ?? []).map((w: any) => w.key).join(", ") || "-",
      };
      output(result, { json: opts.json, format: opts.format });
    } catch (err) {
      handleError(err, opts.json);
    }
  });

import { Command } from "commander";
import { client } from "../lib/client.js";
import { output } from "../lib/output.js";
import { handleError } from "../lib/errors.js";

export const subjectsResource = new Command("subjects")
  .description("Browse works by subject");

// ── GET ──────────────────────────────────────────────
subjectsResource
  .command("get")
  .description("Get works for a subject")
  .argument("<subject>", "Subject name (e.g. fantasy, science_fiction)")
  .option("--limit <n>", "Max results", "10")
  .option("--offset <n>", "Pagination offset", "0")
  .option("--details", "Include related subjects, authors, publishers")
  .option("--ebooks", "Only show works with e-books available")
  .option("--published-in <range>", "Year range (e.g. 1990-2000)")
  .option("--fields <cols>", "Comma-separated columns to display")
  .option("--json", "Output as JSON")
  .option("--format <fmt>", "Output format: text, json, csv, yaml")
  .addHelpText("after", "\nExamples:\n  openlibrary-cli subjects get fantasy\n  openlibrary-cli subjects get science_fiction --limit 5 --json\n  openlibrary-cli subjects get love --ebooks --published-in 1800-1900")
  .action(async (subject: string, opts) => {
    try {
      const params: Record<string, string> = { limit: opts.limit, offset: opts.offset };
      if (opts.details) params.details = "true";
      if (opts.ebooks) params.ebooks = "true";
      if (opts.publishedIn) params.published_in = opts.publishedIn;
      const data = await client.get(`/subjects/${subject}.json`, params) as any;
      const works = (data.works ?? []).map((w: any) => ({
        key: w.key,
        title: w.title ?? "-",
        authors: (w.authors ?? []).map((a: any) => a.name).join(", ") || "-",
        edition_count: w.edition_count ?? 0,
        first_publish_year: w.first_publish_year ?? "-",
        has_ebook: w.availability?.status === "borrow_available" ? "yes" : "no",
      }));
      output(works, { json: opts.json, format: opts.format, fields: opts.fields?.split(",") });
    } catch (err) {
      handleError(err, opts.json);
    }
  });

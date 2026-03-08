import { Command } from "commander";
import { client } from "../lib/client.js";
import { output } from "../lib/output.js";
import { handleError } from "../lib/errors.js";

export const recentResource = new Command("recent")
  .description("View recent changes on Open Library");

// ── LIST ─────────────────────────────────────────────
recentResource
  .command("list")
  .description("List recent changes")
  .option("--limit <n>", "Max results", "20")
  .option("--offset <n>", "Pagination offset", "0")
  .option("--kind <kind>", "Filter by kind: add-cover, add-book, edit-book, merge-authors")
  .option("--date <date>", "Filter by date (YYYY/MM/DD)")
  .option("--bot <bool>", "Filter: true (bots only), false (humans only)")
  .option("--fields <cols>", "Comma-separated columns to display")
  .option("--json", "Output as JSON")
  .option("--format <fmt>", "Output format: text, json, csv, yaml")
  .addHelpText("after", "\nExamples:\n  openlibrary-cli recent list\n  openlibrary-cli recent list --kind add-book --limit 5 --json\n  openlibrary-cli recent list --date 2024/01/15")
  .action(async (opts) => {
    try {
      const params: Record<string, string> = { limit: opts.limit, offset: opts.offset };
      if (opts.bot) params.bot = opts.bot;

      let path = "/recentchanges";
      if (opts.date) path += `/${opts.date}`;
      if (opts.kind) path += `/${opts.kind}`;
      path += ".json";

      const data = await client.get(path, params) as any[];
      const entries = (data ?? []).map((e: any) => ({
        id: e.id,
        kind: e.kind ?? "-",
        author: e.author ?? "-",
        comment: (e.comment ?? "-").slice(0, 60),
        timestamp: e.timestamp ?? "-",
        changes: (e.changes ?? []).length,
      }));
      output(entries, { json: opts.json, format: opts.format, fields: opts.fields?.split(",") });
    } catch (err) {
      handleError(err, opts.json);
    }
  });

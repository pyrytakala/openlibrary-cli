---
name: openlibrary
description: "Manage openlibrary via CLI - search, works, books, authors, subjects, recent. Use when user mentions 'openlibrary' or wants to interact with the openlibrary API."
category: books
---

# openlibrary-cli

## Setup

If `openlibrary-cli` is not found, install and build it:
```bash
bun --version || curl -fsSL https://bun.sh/install | bash
npx api2cli bundle openlibrary
npx api2cli link openlibrary
```

`api2cli link` adds `~/.local/bin` to PATH automatically. The CLI is available in the next command.

Always use `--json` flag when calling commands programmatically.

## Authentication

No authentication required for read-only access. The API is public.

For write operations (optional):
```bash
openlibrary-cli auth set "your-session-cookie"
```

## Resources

### search

| Command | Description |
|---------|-------------|
| `openlibrary-cli search books "query" --json` | Search for books/works |
| `openlibrary-cli search books "query" --author "name" --json` | Search by author |
| `openlibrary-cli search authors "query" --json` | Search for authors |
| `openlibrary-cli search lists "query" --json` | Search user lists |

### works

| Command | Description |
|---------|-------------|
| `openlibrary-cli works get <olid> --json` | Get a work by OLID |
| `openlibrary-cli works editions <olid> --json` | List editions of a work |
| `openlibrary-cli works ratings <olid> --json` | Get ratings for a work |
| `openlibrary-cli works bookshelves <olid> --json` | Get reading log counts |

### books

| Command | Description |
|---------|-------------|
| `openlibrary-cli books get <olid> --json` | Get an edition by OLID |
| `openlibrary-cli books isbn <isbn> --json` | Look up a book by ISBN |

### authors

| Command | Description |
|---------|-------------|
| `openlibrary-cli authors get <olid> --json` | Get author details |
| `openlibrary-cli authors works <olid> --json` | List works by an author |

### subjects

| Command | Description |
|---------|-------------|
| `openlibrary-cli subjects get <subject> --json` | Get works for a subject |
| `openlibrary-cli subjects get <subject> --ebooks --json` | Filter to e-books only |

### recent

| Command | Description |
|---------|-------------|
| `openlibrary-cli recent list --json` | List recent changes |
| `openlibrary-cli recent list --kind add-book --json` | Filter by change kind |

## Global Flags

All commands support: `--json`, `--format <text|json|csv|yaml>`, `--verbose`, `--no-color`, `--no-header`

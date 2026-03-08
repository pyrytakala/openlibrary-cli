# openlibrary-cli

CLI for the [Open Library](https://openlibrary.org) API. Made with [api2cli.dev](https://api2cli.dev).

## Install

```bash
npx api2cli install pyrytakala/openlibrary-cli
```

## Usage

No API key needed — the Open Library API is public.

```bash
openlibrary-cli --help
```

## Resources

### search

| Command | Description |
|---------|-------------|
| `openlibrary-cli search books "query"` | Search for books/works |
| `openlibrary-cli search books "query" --author "name"` | Search by author |
| `openlibrary-cli search authors "query"` | Search for authors |
| `openlibrary-cli search lists "query"` | Search user lists |

### works

| Command | Description |
|---------|-------------|
| `openlibrary-cli works get <olid>` | Get a work by OLID |
| `openlibrary-cli works editions <olid>` | List editions of a work |
| `openlibrary-cli works ratings <olid>` | Get ratings for a work |
| `openlibrary-cli works bookshelves <olid>` | Get reading log counts |

### books

| Command | Description |
|---------|-------------|
| `openlibrary-cli books get <olid>` | Get an edition by OLID |
| `openlibrary-cli books isbn <isbn>` | Look up a book by ISBN |

### authors

| Command | Description |
|---------|-------------|
| `openlibrary-cli authors get <olid>` | Get author details |
| `openlibrary-cli authors works <olid>` | List works by an author |

### subjects

| Command | Description |
|---------|-------------|
| `openlibrary-cli subjects get <subject>` | Get works for a subject |
| `openlibrary-cli subjects get <subject> --ebooks` | Filter to e-books only |

### recent

| Command | Description |
|---------|-------------|
| `openlibrary-cli recent list` | List recent changes |
| `openlibrary-cli recent list --kind add-book` | Filter by change kind |

## Global Flags

All commands support: `--json`, `--format <text|json|csv|yaml>`, `--verbose`, `--no-color`, `--no-header`

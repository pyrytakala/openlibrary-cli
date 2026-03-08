# openlibrary-cli

Unofficial CLI for the [Open Library](https://openlibrary.org) API. Made with [api2cli.dev](https://api2cli.dev).

> **Note:** This is a community-maintained project and is not officially affiliated with or endorsed by Open Library.

## Install

```bash
npm i -g openlibrary-cli
# or
npx openlibrary-cli --help
```

## Usage

No API key needed — the Open Library API is public.

```bash
openlibrary-cli search books "dune" --limit 5
openlibrary-cli books isbn 9780140328721
openlibrary-cli authors get OL23919A
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
| `openlibrary-cli works get OL45804W` | Get a work by OLID |
| `openlibrary-cli works editions OL45804W` | List editions of a work |
| `openlibrary-cli works ratings OL45804W` | Get ratings for a work |
| `openlibrary-cli works bookshelves OL45804W` | Get reading log counts |

### books

| Command | Description |
|---------|-------------|
| `openlibrary-cli books get OL7353617M` | Get an edition by OLID |
| `openlibrary-cli books isbn 9780140328721` | Look up a book by ISBN |

### authors

| Command | Description |
|---------|-------------|
| `openlibrary-cli authors get OL23919A` | Get author details |
| `openlibrary-cli authors works OL23919A` | List works by an author |

### subjects

| Command | Description |
|---------|-------------|
| `openlibrary-cli subjects get fantasy` | Get works for a subject |
| `openlibrary-cli subjects get fantasy --ebooks` | Filter to e-books only |

### recent

| Command | Description |
|---------|-------------|
| `openlibrary-cli recent list` | List recent changes |
| `openlibrary-cli recent list --kind add-book` | Filter by change kind |

## Global Flags

All commands support: `--json`, `--format`, `--verbose`, `--no-color`, `--no-header`

Format options: `text`, `json`, `csv`, `yaml`

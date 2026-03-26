# Instructions for Claude

## Tech Stack

- **Astro 5.16** — framework (SSG mode)
- **TailwindCSS 4** — styling
- **React 19** — interactive components
- **MDX** — enhanced markdown

## Development

```bash
npm run build    # Build to ./dist/
npm run preview  # Preview build locally
```

**DO NOT run `npm run dev`** in agent mode — it creates an endless loop.

## Project Structure

- `/src/content/blog/` — Blog posts (converted from Telegram channel)
- `/src/pages/` — Page templates and routing
- `/src/components/` — UI components
- `/src/layouts/` — Page layouts
- `/src/i18n/` — Translations (RU/EN)
- `/src/styles/` — CSS styles
- `/scripts/` — Utility scripts (Telegram conversion)

## Always use latest dependencies

Never downgrade. Use `npm outdated` and `npm view [package] version` to check.

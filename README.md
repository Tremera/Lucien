# Lucien Arceneaux — lore site

A small static site for the Lucien Arceneaux bot. Plain HTML, CSS and JS, no build step.

## Files
- `index.html` — the page
- `style.css` — all styling (both modes)
- `script.js` — glasses on/off toggle, checklist, lore filters and search
- `lore.js` — **the lore entries and checklist. Edit this file to add or change lore.**
- `images/lucien.jpg` — his portrait

## Editing lore
Open `lore.js` and copy any `{ ... }` block. Fields:
- `group`: `places`, `past`, `habits` or `people`
- `title`: the entry name
- `text`: the entry text
- `secret: true` (optional): blurred until the visitor takes his glasses off

## Chat links
In `index.html`, near the bottom, replace the two `href="#"` links with your Janitor AI and Tipsy bot links.

## Publishing on GitHub Pages
1. Upload everything in this folder (keep the `images` folder) to a repo.
2. Repo **Settings → Pages → Source: Deploy from a branch**, pick `main` and `/ (root)`.
3. Your site will be at `https://<your-username>.github.io/<repo-name>/`.

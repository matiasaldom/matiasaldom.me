# MA-452.github.io
Personal portfolio website showcasing projects, skills, and experience.

## Tech
Static site (HTML/CSS/JS) hosted on GitHub Pages. Styling uses Tailwind CSS,
**compiled** to `assets/tailwind.css` (no CDN at runtime).

## Editing styles
Tailwind classes are scanned from `index.html` and `script.js`. If you add or
change any Tailwind classes, rebuild the CSS so they appear on the live site:

```bash
npm install        # first time only
npm run build      # regenerate assets/tailwind.css (minified)
# or, while editing:
npm run watch      # rebuild automatically on save
```

Commit the updated `assets/tailwind.css`. `node_modules/` is git-ignored.

## Project structure
- `index.html` — page markup
- `style.css` — custom styles (glassmorphism, animations)
- `script.js` — project modal data + interactions
- `assets/tailwind.css` — compiled Tailwind output (generated)
- `src/input.css`, `tailwind.config.js` — Tailwind build inputs
- `images/` — photos and project screenshots

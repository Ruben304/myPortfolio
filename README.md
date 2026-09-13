# Ruben F. Carbajal — Portfolio

Personal portfolio site built as a static, no-build-step HTML/CSS/JS project with a
terminal/ASCII-inspired design.

## Sections

- **Hero** — intro with a typing terminal panel (`whoami`, stack, availability) and resume download
- **Experience** — role history at JP Morgan Chase & Co
- **Skills** — languages, AI tooling, frameworks & libraries, databases & tools
- **Education** — Boston University degree, coursework, activities, and honors (tabbed)
- **Projects** — real projects (Houston for Humans, VIAD Optics, Private Information Retrieval,
  Flood Detector, Housing Demographics) with hover previews and a full detail view per project
- **Contact** — direct email link

## Stack

Plain HTML, CSS, and JavaScript — no framework, bundler, or dependencies. Fonts are pulled
from Google Fonts (JetBrains Mono, Outfit).

```
index.html
css/           section-by-section stylesheets
js/            loader, nav, scroll animations, hero terminal, projects panel
assets/        project media (see assets/projects/README.md for adding screenshots/video)
resume.pdf
```

## Running locally

No build step — just serve the folder:

```bash
python3 -m http.server 8000
```

Then open `http://localhost:8000`.

## Adding project media

Each project row in `index.html` points at a placeholder image in `assets/projects/`.
See [`assets/projects/README.md`](assets/projects/README.md) for the exact filenames to
replace with real screenshots/photos, and how to attach a demo video.

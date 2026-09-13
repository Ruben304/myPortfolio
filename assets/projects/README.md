# Project media

Each project row in `index.html` (`#projects`) points at a file here via `data-image` and,
optionally, `data-video`. Drop real files in with these exact names and the site picks them
up automatically — no other changes needed.

| Project               | Replace this file                  |
|-----------------------|-------------------------------------|
| Houston for Humans    | `houston4humans.svg`                |
| VIAD Optics           | `viad-optics.svg`                   |
| PIR (FoundationDB)    | `pir-foundationdb.svg`              |
| Flood Detector        | `flood-detector.svg`                |
| Housing Demographics  | `housing-demographics.svg`          |

The `.svg` files currently in this folder are placeholders (dark card + icon + label) so the
fake stock photos are gone in the meantime — swap them for real screenshots/photos whenever
you have them. You can keep the `.svg` extension in the filename even after swapping — browsers
just read the bytes — but it's cleaner to rename to the real extension (`.png`/`.jpg`) and
update the matching `data-image="assets/projects/..."` path in `index.html`.

**Image sizing:** shown at ~280×158 in the hover preview, cropped with `object-fit: cover`.
Anything roughly 16:9 (e.g. 1120×630) works well — a device photo for Flood Detector, an app
screenshot for Houston for Humans/VIAD Optics, a dashboard shot for Housing Demographics.

**Adding a video:** add `data-video="assets/projects/<name>.mp4"` to a project's row in
`index.html` (alongside its existing `data-image`) and drop the file here. When present, it
autoplays muted on hover in place of the image, and shows as a real `<video>` player (with
controls) inside the project's detail page. Keep clips short and small — under ~5MB, muted,
h.264 mp4 — since it loops silently in the hover preview.

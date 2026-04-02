# Preethi Yagnamurthy Website

This repo is now the single working home for the artist website.

The current production-style website lives in `docs/`, and future iterations should happen here instead of the older mirror/export folders under other workspaces.

## Current Source Of Truth

- `docs/`: the full static one-page site that we are actively shaping
- `SCOPE.md`: current site direction, constraints, content plan, and next priorities
- `REFERENCES.md`: public-source links and research references
- `ARTIST_GROUND_TRUTH.md`: artist-provided journey, links, claims, and website-usage tracking status
- `FUTURE_IMPLEMENTATIONS.md`: backlog of site changes we want to pick up in later passes
- `assets/`: the original supplied media and supporting source files

## Local Preview

Serve the tracked site directly from this repo:

```bash
python3 -m http.server 8765 --directory docs
```

Then open:

```text
http://127.0.0.1:8765/
```

## GitHub Pages

If you publish this repo with GitHub Pages, point Pages at:

```text
Branch: main
Folder: /docs
```

`.nojekyll` is already included in `docs/`.

## Repo Notes

- The current site is a single-page, anchor-based artist website with redirect aliases for the older multi-page routes.
- `src/` and the Vite setup can stay available for future rebuild work, but they are not the active website right now.
- Until we intentionally migrate the site to another build system, edit `docs/` for live website changes.

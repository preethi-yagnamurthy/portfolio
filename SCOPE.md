# Project Scope

## Goal

Build and evolve a single-page artist website for Preethi Yagnamurthy that keeps the cinematic, premium, black-led mood inspired by `arrahman.com` while removing all A.R. Rahman-specific content, branding, metadata, and links.

## Current Product Direction

- One-page long-scroll experience with anchor navigation
- Strong editorial photography and large black-space composition
- Floating bottom dock instead of a traditional footer
- Typography aligned with the original reference feel using Rothek and Maison Neue
- Preethi-first identity with Band Anantya as a supporting live-performance layer

## Canonical Implementation

- Active deployable site: `docs/`
- Primary entry point: `docs/index.html`
- Shared content layer: `docs/assets/js/site-data.js`
- Shared rendering logic: `docs/assets/js/site.js`
- Shared visual system: `docs/assets/site.css`

## Current Sections

- Hero
- Story
- Music
- Live
- Highlights
- Contact
- Policy placeholder
- Private EPK placeholder

Legacy route aliases currently redirect into the one-page site:

- `About.html` -> `#story`
- `Composer.html` -> `#music`
- `performance.html` -> `#live`
- `Upcoming.html` -> `#highlights`
- `contact.html` -> `#contact`
- `Terms-&-Conditions.html` -> `#policies`
- `private-22.html` -> `#private`

## Content Foundation

The site should keep using public-source facts that are reasonably supported, including:

- Hyderabad-based singer
- Carnatic training beginning at age 5 for 8 years
- Mirchi Singistan winner and opening-act milestone in July 2023
- Band Anantya founder and lead vocalist
- `Soul Trip` release on February 18, 2026

Primary references currently tracked in `REFERENCES.md` include:

- Media Infoline
- Amazon Music
- Showcase Yourself
- StarClinch
- HyLiveMusic
- Direct platform profiles for Spotify, YouTube, and JioSaavn

## Asset Usage

The supplied photography in `assets/` is the visual base of the site. The current static site uses the exported copies inside `docs/assets/media/`.

Intended placement map:

- `IMG_7834.JPEG`: homepage hero
- `IMG_1566.JPEG`: secondary spotlight
- `IMG_7402.JPEG`: live marquee
- `IMG_8262.PNG`: cutout overlay
- `20240929_035025103_iOS.JPEG`: music portrait
- `IMG_7213.JPEG`: about portrait
- `IMG_7778_Original.JPEG`: press/profile portrait
- `IMG_6272.JPEG`: wide live gallery image
- `IMG_7665.JPEG`: portrait live gallery image

## Current Constraints

- Keep the experience single-page unless we intentionally decide otherwise
- Do not reintroduce A.R. Rahman copy, links, or metadata
- Do not spend time polishing platform logos right now unless explicitly requested again
- Keep the repo as the working source of truth going forward

## Near-Term Priorities

- Improve fidelity to the original reference through motion, pacing, and section choreography
- Replace temporary logo treatments later with cleaner brand assets
- Finalize official booking and contact destinations
- Push this repo to GitHub and enable GitHub Pages from `docs/`

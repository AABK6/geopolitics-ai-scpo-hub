# Magazine catalogue bitmap asset pack

This directory is reserved for bitmap illustration assets for a proposed magazine/archive-catalogue view of the course hub.

The target page concept groups the course into three visual cycles:

1. **Cycle I - From Cyber-Utopia to Digital Sovereignty**
   - Module 01: The Utopian Dawn
   - Module 02: The Rebuttal
   - Module 03: The Rupture
   - Module 04: The Splinternet Accelerates

2. **Cycle II - The Industrialization of AI Power**
   - Module 05: Industrial Sovereignty
   - Module 06: National Revival Through Tech

3. **Cycle III - Ideology and Collision**
   - Module 07: New Ideological Map of AI
   - Module 08: The Collision of Frames

The visual language follows the existing course style: warm paper, deep navy typography, terracotta accents, sage green for the material/industrial cycle, thin archival rules, and engraving-like bitmap illustrations. These are design assets for a future magazine/catalogue implementation. This PR intentionally avoids modifying `magazine.html` or `shared/magazine.css`.

## Bitmap files to place in this directory

### Rendering objective

- `magazine-catalogue-final-rendering-objective.png` - visual target for the future magazine/archive-catalogue page implementation.

### Large cycle illustrations

- `cycle-01-utopian-to-splinternet.png` - large horizontal image for Cycle I.
- `cycle-02-industry-national-revival.png` - large horizontal image for Cycle II.
- `cycle-03-ideology-collision.png` - large horizontal image for Cycle III.

### Small module illustrations

- `module-01-utopian-dawn-networked-globe.png` - Module 01 / cyber-utopianism / networked globe.
- `module-02-rebuttal-guardian.png` - Module 02 / sovereign control / gatekeeping.
- `module-03-rupture-satellite-dish.png` - Module 03 / interception / rupture of trust.
- `module-04-splinternet-server-rack.png` - Module 04 / fragmented infrastructure.
- `module-05-industrial-sovereignty-chip.png` - Module 05 / chips and industrial sovereignty.
- `module-06-national-revival-flag.png` - Module 06 / national revival and state strategy.
- `module-07-ideological-map-compass.png` - Module 07 / ideological map.
- `module-08-collision-chess-pieces.png` - Module 08 / collision of strategic frames.

### Small project illustrations

- `project-01-state-surveillance-cctv.png` - Group 1 / AI-enabled state surveillance / CCTV camera.
- `project-02-orbital-ai-satellite.png` - Group 2 / orbital AI compute / satellite.
- `project-03-invisible-thirst-cooling-tower.png` - Group 3 / data centers and water scarcity / cooling tower.
- `project-04-frontier-server-rack.png` - Group 4 / private frontier capability / locked server rack.
- `project-05-digital-sovereignty-cable-landing.png` - Group 5 / digital sovereignty and infrastructure dependence / cable landing station.
- `project-06-critical-minerals-ore.png` - Group 6 / AI supply chains / critical mineral ore sample.

## Suggested implementation architecture

Keep the current `magazine.html` content structure, but replace the flat two-column list with a three-cycle catalogue. Avoid touching student project files.

Recommended structure:

```html
<section class="catalogue-hero">...</section>
<section class="course-cycles">
  <article class="cycle-band cycle-band--utopian">...</article>
  <article class="cycle-band cycle-band--industrial">...</article>
  <article class="cycle-band cycle-band--ideological">...</article>
</section>
<section class="cohort-project-strip">...</section>
```

Recommended image usage:

```html
<img
  src="assets/course-media/magazine-catalogue/cycle-01-utopian-to-splinternet.png"
  alt="Networked sphere and telegraph poles representing early internet utopianism and the later fragmentation of the open network dream."
  loading="lazy"
>
```

## CSS notes

Suggested variables:

```css
:root {
  --catalogue-paper: #faf9f7;
  --catalogue-ink: #0f172a;
  --catalogue-muted: #475569;
  --catalogue-line: #e2d8ca;
  --catalogue-orange: #ea580c;
  --catalogue-sage: #166534;
}
```

Large cycle image treatment:

```css
.cycle-band__image {
  opacity: 0.82;
  mix-blend-mode: multiply;
  filter: saturate(0.88) contrast(0.96);
  object-fit: contain;
}
```

Small module thumbnails:

```css
.module-card__thumb {
  width: 8rem;
  aspect-ratio: 1;
  opacity: 0.86;
  mix-blend-mode: multiply;
  object-fit: contain;
}
```

## Accessibility

Every image should have an `alt` attribute because these illustrations are meaningful navigational cues. Keep the alt text factual and concise.

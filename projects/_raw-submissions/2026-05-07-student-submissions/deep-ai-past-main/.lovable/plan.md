## Restyle: from "gentrified cafe" to data-essay

The current site reads as a boutique landing page (cream + Fraunces + oxblood). We're rebuilding the design system around a Pudding/Polygraph-style data essay: white paper, IBM Plex type, single electric-blue accent (#142af5), and dense editorial chrome. No code is being thrown away — only the design layer (tokens, typography, section chrome, card treatments) changes. Section structure and copy stay the same.

### 1. New design tokens (`src/styles.css`)

Replace the cream/oxblood palette with a paper-white editorial system.

```text
--paper:        #FAFAF7   /* page bg, very slight warm white */
--paper-2:      #F1F0EA   /* alt panel / table stripe */
--rule:         #1A1A1A   /* hairline rules, 1px black */
--ink:          #0E0E10   /* body text, near-black */
--ink-2:        #2B2B2E   /* secondary text */
--ink-mute:     #6B6B70   /* captions, metadata */
--accent:       #142af5   /* THE only accent — links, marks, dots, dataviz */
--accent-ink:   #FAFAF7   /* text on accent */
--inverse:      #0E0E10   /* dark interstitial bg */
--inverse-fg:   #FAFAF7
```

Drop oxblood, cream, tan tokens entirely. Map shadcn semantics: `--background: var(--paper)`, `--primary: var(--accent)`, `--border: rgba(26,26,26,0.12)`, `--ring: var(--accent)`.

### 2. Typography (`__root.tsx` + `styles.css`)

Swap Fraunces / EB Garamond / JetBrains Mono → **IBM Plex Sans (300/400/500/600), IBM Plex Serif (400/500 + italic), IBM Plex Mono (400/500)**.

- `--font-display: "IBM Plex Sans"` (UI, labels, headlines)
- `--font-serif: "IBM Plex Serif"` (long-form body, pull quotes)
- `--font-mono: "IBM Plex Mono"` (metadata, numerals, footnote markers)

Type scale (compressed, editorial):
- Section labels: Plex Mono 11px, uppercase, tracking 0.18em, accent color, prefixed with `§ 02 /`
- Hero headline: Plex Sans 56–72px, weight 600, tracking -0.02em, line-height 1.0
- Section heading: Plex Sans 36–44px, weight 500
- Body: Plex Serif 17/1.55, justified on desktop, hyphens auto
- Captions / margin notes: Plex Sans 12/1.4, --ink-mute
- Numerals everywhere: `font-feature-settings: "tnum", "lnum"` for tabular numbers

Drop caps: first paragraph of each section gets a Plex Serif 4-line drop cap.

### 3. Layout grid — denser, multi-column

Replace the single 720px column with a 12-column editorial grid (max-width 1200px, 24px gutter):

- Body prose: 7 cols (~640px)
- Marginalia (left or right): 3 cols for source notes, definitions, asides — Plex Sans 12px, --ink-mute, hairline rule above
- Full-bleed: timeline strip, interstitial, and any future charts span all 12

Update `Section.tsx` to support a `marginalia` slot rendered alongside body prose on `md+`, stacked below on mobile.

### 4. Editorial chrome

Add throughout:
- **Hairline rules**: 1px solid --rule between sections (no padding-only separators)
- **Section header block**: label · section number · hairline rule · headline · standfirst (italic Plex Serif, --ink-2)
- **Byline strip** under hero: "An essay · 2026 · ~18 min read · 4 sections" in Plex Mono
- **Numbered footnotes**: superscript accent-colored numbers in body, rendered at section end as a `<ol>` with Plex Mono numerals
- **Pull quotes**: full-width, Plex Serif 28px italic, accent vertical bar on the left
- **Inline highlight**: `<mark>` style → no background, accent underline 2px offset

### 5. Section-by-section restyle

**Header (`index.tsx`)**: Replace centered chrome with a left-aligned masthead — wordmark in Plex Sans 600, then a hairline rule, then a Plex Mono meta row (date · section count · estimated reading time). Sticky on scroll, condenses to thin bar.

**Section 1 — Intro**: Add a real hero. Headline placeholder ("heading coming soon") becomes a large Plex Sans display headline slot with standfirst, byline, and a "scroll" indicator. Drop cap on first paragraph. Marginalia slot reserved.

**Section 2 — Timeline**:
- Stacked-deck card → replaced with a **horizontal timeline by default** (no click required). Density wins over interaction.
- Render the 8 GPTs as a single horizontal scrolling track with: Plex Mono year on top, hairline tick mark on a continuous timeline axis, GPT name in Plex Sans below, accent dot at the AI entry to mark "you are here".
- Era gradient is removed — all entries equal weight; only the AI entry is marked in --accent. Feels like a timeline in a working paper, not a deck of art cards.

**Interstitial — Convergence**:
- Background flips from oxblood to `--inverse` (#0E0E10), text in --inverse-fg.
- Two tracks become labeled data lines (Plex Mono labels above each), thicker rules, dots become accent squares. Convergence point is an accent crosshair, not a dot.
- Headline below in Plex Sans 500 (not serif), tighter and more declarative.

**Section 3 — Tensions**:
- 2×2 grid kept, but cards are restyled as **filing-cabinet entries**: hairline border (no shadow), Plex Mono date range top-left, Plex Sans 600 title, Plex Serif consequence, accent "→ open file" affordance bottom-right. Hover: invert (black bg, white text, accent underline) instead of lift-and-shadow.
- Modal restyled: white paper, hairline border, Plex Mono breadcrumb (`§ 03 / case 02 / Krupp`), Plex Sans title, Plex Serif body with drop cap, footnotes block at bottom.

**Footer**: Hairline rule, Plex Mono colophon (set in IBM Plex · built with TanStack · 2026), section index.

### 6. Motion

Strip the cream-era "lift and glow" hover/shadow vocabulary. Replace with:
- Link/card hover: instant accent underline or full-card invert (no transitions over 120ms)
- Interstitial: keep IntersectionObserver but reduce travel to 24px and remove easing flourishes
- All shadows removed sitewide — depth comes from rules and inversion, not blur

Respect `prefers-reduced-motion` (already in place).

### Files touched

- `src/styles.css` — tokens, base styles, drop cap, mark, footnote styles
- `src/routes/__root.tsx` — Google Fonts link → IBM Plex family, meta unchanged
- `src/components/sections/Section.tsx` — new header block, marginalia slot, hairline rule
- `src/routes/index.tsx` — new masthead and footer
- `src/components/sections/IntroSection.tsx` — hero shape with standfirst/byline placeholders
- `src/components/sections/GptsTimelineSection.tsx` — replace deck with horizontal timeline axis
- `src/components/sections/ConvergenceInterstitial.tsx` — black bg, accent crosshair, sans headline
- `src/components/sections/TensionsSection.tsx` — filing-cabinet card + restyled modal

### Out of scope

Real copy, footnote content, charts/data viz components, navigation between routes, and sections 4+. Those land in later prompts on top of this new design system.

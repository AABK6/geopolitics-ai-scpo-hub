# Gore GII Buenos Aires Speech

Archival visual snippets for Module 01, centered on Vice President Al Gore's March 21, 1994 remarks to the International Telecommunications Union in Buenos Aires.

## Source material captured

- Header/title capture showing the speech context: `Gore GII Buenos Aires Speech`, remarks prepared for delivery, Vice President Al Gore, International Telecommunications Union, Monday March 21, 1994.
- Snippet on massively parallel computers and distributed processors.
- Snippet connecting the Global Information Infrastructure to democracy and citizen agency.

## Assets in this folder

- `Gore speech webpage layout.png` — full-page source capture / reference layout for the speech page.
- `gore-gii-header.png` — header/title archival crop.
- `gore-gii-parallel-computing.png` — excerpt linking distributed processors to networked problem-solving.
- `gore-gii-democracy-metaphor.png` — excerpt linking the GII to democracy and citizen agency.

- `gore-speech-illustration.png` — THIS IS THE IMAGE YOU SHOULD USE - NO NEED TO RECOMPOSE BY CODING ALL THE DETAILS (clipper, tape, arrows etc...) - JUST TAKE THIS ONE.

## Intended use in Module 01

Use as an archival evidence block in the Global Information Infrastructure section. Recommended framing: Gore presents network architecture as a political metaphor: distributed computing becomes a model for representative democracy and liberal digital order.


## Proposed Module 01 code architecture

Start from the existing `primer/module-01.html` GII section rather than creating a new rendering system. Keep the current section heading, lead paragraph, quote language, Strategic Intent card, and Five Principles content. Add one new archival component between the lead paragraph and the Strategic Intent card.

=== PARTS OF THE FOLLOWING ARE UNNECESSARY IF YOU JUST TAKE THE PRE-RENDERED IMAGE. SORT OUT WHAT YOU NEED HERE ==

### 1. HTML insertion point

Insert the new component immediately after the current GII lead paragraph:

```html
<!-- Lead -->
<div class="gsap-reveal mb-12">
  <p class="lead-text text-slate-700">
    On March 21, 1994, Vice President Al Gore delivered a speech in Buenos Aires...
  </p>
</div>

<!-- New archival component goes here -->
```

Then remove or replace the standalone `quote-block` so that the quote is integrated into the archival component instead of appearing as a separate white card.

### 2. Asset constants

Use these relative paths from `primer/module-01.html`:

```html
../assets/course-media/module-01/gore-gii-buenos-aires/Gore speech webpage layout.png
../assets/course-media/module-01/gore-gii-buenos-aires/gore-gii-parallel-computing.png
../assets/course-media/module-01/gore-gii-buenos-aires/gore-gii-democracy-metaphor.png
```

Use `gore-gii-header.png` only if a tighter title crop is preferred over the full-page source capture.

### 3. Component structure

Recommended component name: `gii-archive-panel`.

```html
<figure class="gsap-reveal gii-archive-panel" aria-labelledby="gii-archive-title">
  <div class="gii-archive-panel__documents">
    <img
      class="gii-archive-panel__source"
      src="../assets/course-media/module-01/gore-gii-buenos-aires/Gore speech webpage layout.png"
      alt="Archival webpage capture of Al Gore's Global Information Infrastructure speech, Buenos Aires, March 21, 1994."
      loading="lazy"
    >

    <div class="gii-archive-panel__snippets" aria-label="Selected excerpts from Gore's GII speech">
      <img
        src="../assets/course-media/module-01/gore-gii-buenos-aires/gore-gii-parallel-computing.png"
        alt="Speech excerpt comparing old mainframes with massively parallel computers and distributed processors."
        loading="lazy"
      >
      <img
        src="../assets/course-media/module-01/gore-gii-buenos-aires/gore-gii-democracy-metaphor.png"
        alt="Speech excerpt arguing that the Global Information Infrastructure would be a metaphor for democracy itself."
        loading="lazy"
      >
    </div>
  </div>

  <blockquote class="gii-archive-panel__quote" id="gii-archive-title">
    <p>The GII will not only be a metaphor for a functioning democracy, it will in fact promote the functioning of democracy by greatly enhancing the participation of citizens in decision-making.</p>
    <footer>
      <strong>Al Gore</strong>
      <span>Buenos Aires, March 21, 1994</span>
    </footer>
  </blockquote>

  <figcaption class="gii-archive-panel__caption">
    Archival excerpts from Vice President Al Gore's Global Information Infrastructure remarks at the International Telecommunications Union, Buenos Aires, March 21, 1994.
  </figcaption>
</figure>
```

### 4. Layout behavior

Desktop layout:

- One wide white card with the existing Module 01 card shadow/border language.
- Left column: full speech-page image, slightly rotated or offset by 0.5 degrees only if it remains legible.
- Middle column: two excerpt images stacked as paper slips.
- Right column: the existing Gore quote, set large in the same editorial italic style currently used by `.quote-block`.
- Thin vertical divider between archival images and the quote.
- Orange left border to preserve the current GII visual accent.

Mobile layout:

- Stack full speech-page image first.
- Stack the two excerpt images next.
- Place the quote below the images.
- Keep all images full-width, with `height: auto`, no forced cropping.

### 5. CSS skeleton

Add this to the existing inline `<style>` in `primer/module-01.html` near the current GII / quote styles:

```css
.gii-archive-panel {
  margin: 0 0 4rem;
  padding: clamp(1rem, 2vw, 1.75rem);
  border-left: 4px solid #ea580c;
  border-radius: 0.75rem;
  background: rgba(255, 255, 255, 0.92);
  box-shadow: 0 16px 42px rgba(15, 23, 42, 0.10);
}

.gii-archive-panel__documents {
  display: grid;
  grid-template-columns: minmax(12rem, 0.85fr) minmax(14rem, 1fr) minmax(16rem, 0.95fr);
  gap: clamp(1rem, 2vw, 1.75rem);
  align-items: center;
}

.gii-archive-panel img {
  display: block;
  width: 100%;
  height: auto;
  border: 1px solid rgba(15, 23, 42, 0.10);
  border-radius: 0.35rem;
  background: #fffaf4;
  box-shadow: 0 10px 24px rgba(15, 23, 42, 0.12);
}

.gii-archive-panel__snippets {
  display: grid;
  gap: 1rem;
}

.gii-archive-panel__quote {
  margin: 0;
  padding-left: clamp(1rem, 2vw, 1.75rem);
  border-left: 1px solid rgba(15, 23, 42, 0.12);
}

.gii-archive-panel__quote p {
  margin: 0 0 1.5rem;
  font-family: 'Playfair Display', Georgia, serif;
  font-size: clamp(1.35rem, 2.2vw, 2.15rem);
  font-style: italic;
  line-height: 1.45;
  color: #1e293b;
}

.gii-archive-panel__quote p::before {
  content: "\201C";
  display: block;
  color: #ea580c;
  font-size: 3.25rem;
  font-style: normal;
  line-height: 0.65;
}

.gii-archive-panel__quote footer {
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  color: #64748b;
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.72rem;
}

.gii-archive-panel__quote strong {
  display: block;
  color: #0f172a;
  font-family: 'Inter', sans-serif;
  font-size: 0.9rem;
}

.gii-archive-panel__caption {
  margin-top: 1rem;
  padding-top: 1rem;
  border-top: 1px solid rgba(15, 23, 42, 0.08);
  color: #64748b;
  font-size: 0.86rem;
}

@media (max-width: 900px) {
  .gii-archive-panel__documents {
    grid-template-columns: 1fr;
  }

  .gii-archive-panel__quote {
    padding-left: 0;
    border-left: 0;
  }

  .gii-archive-panel__quote footer {
    display: block;
  }
}
```

### 6. Why this architecture

- It keeps Module 01 within the existing long-form chapter design.
- It makes the Gore section visually richer without copying Module 05's scrollytelling mechanics.
- It treats the images as archival evidence, not decoration.
- It creates a reusable pattern for later Module 01 archival inserts: one evidence panel, source image, excerpt images, interpretive quote, caption.

## Implementation note

When implementing, verify image dimensions in the browser. If the full-page source capture becomes too small on desktop, switch the left image from `Gore speech webpage layout.png` to `gore-gii-header.png`, then use the full-page image only in a linked caption or optional modal later.

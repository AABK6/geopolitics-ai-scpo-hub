# Barlow Declaration terminal insert

Design and implementation notes for turning the Barlow / Declaration section of Module 01 into a live source-text moment without making it visually redundant with the Gore archival evidence panel.

## Purpose

The current Barlow section is a dark analytical block with strong typography and two explanatory cards: `The Manifesto` and `The Myth of Immateriality`. It reads cleanly, but the primary-source text itself is still abstract. The proposed addition is a terminal-like mail / broadcast interface placed immediately above those two cards, where selected Declaration text appears as if being typed live.

The goal is not to create fake footage or a fake archive. The terminal is a clearly designed reading interface: a way to make the manifesto arrive as an event before the analysis explains it.

## Placement in `primer/module-01.html`

Insert the terminal after the section intro / author attribution and before the two existing analytical cards.

Recommended final flow:

1. Date pill and section heading.
2. Existing short introductory quote / context.
3. John Perry Barlow attribution.
4. **New live terminal component.**
5. Existing two-card row: `The Manifesto` and `The Myth of Immateriality`.
6. Existing `The Ideological Function` box.

Do not replace the two existing cards. The terminal should serve as the source encounter; the cards should remain the interpretation.

## Visual direction

The Gore GII component should feel like archival evidence on paper. The Barlow component should feel different: dark, electronic, network-native, and transient.

Recommended treatment:

- Dark navy / black-blue terminal shell.
- Subtle blue edge glow, not neon arcade styling.
- Monospace green text for typed declaration lines.
- Orange labels for metadata fields (`From`, `Date`, `To`, `Subject`) to match Module 01 accents.
- Fixed-height terminal body with internal scrolling.
- Header label such as `EFFE MAIL -- OUTBOX -- DRAFT` or `EFFNET BROADCAST TERMINAL`.
- Small disclosure label: `Designed reading interface - primary source excerpt`.
- No fake OS brand, no invented screenshots, no photorealistic fake email client.

Recommended language for a small caption:

> Designed reading interface using excerpts from John Perry Barlow's 1996 Declaration of the Independence of Cyberspace.

## Interaction model

When the terminal first enters the viewport, it begins typing the Declaration excerpt. The terminal has a fixed height; as the text becomes longer than the visible body, the terminal body scrolls itself downward.

Behavior requirements:

- Start only once.
- Preserve paragraph breaks.
- Auto-scroll the terminal body during typing.
- Keep the rest of the page usable while typing continues.
- Provide a `Show full text` control for impatient readers.
- Respect `prefers-reduced-motion` by rendering the full text immediately.
- Do not use an animated GIF or video.

## Realism and pacing

Typing the full excerpt character-by-character at a literal pace would be too slow. Use a simulated terminal rhythm:

- Type in bursts of 3-7 characters.
- Use short pauses after punctuation.
- Use longer pauses after paragraph breaks.
- Target total duration around 28-45 seconds for the long excerpt.

This makes the effect legible without becoming a theatrical interruption.

## HTML architecture

Use semantic HTML and data attributes. Keep the Declaration text in JavaScript or a hidden `<script type="application/json">` block so the visible terminal remains controlled by the typewriter logic.

Recommended insertion:

```html
<figure class="barlow-terminal gsap-reveal" data-barlow-terminal aria-labelledby="barlow-terminal-title">
  <figcaption class="barlow-terminal__caption" id="barlow-terminal-title">
    Designed reading interface - primary source excerpt
  </figcaption>

  <div class="barlow-terminal__chrome" aria-hidden="true">
    <div class="barlow-terminal__window-title">
      <span class="barlow-terminal__mail-icon">@</span>
      EFFE MAIL -- OUTBOX -- DRAFT
    </div>
    <div class="barlow-terminal__window-controls">
      <span></span><span></span><span></span>
    </div>
  </div>

  <div class="barlow-terminal__meta">
    <div><span>From:</span> John Perry Barlow &lt;barlow@eff.org&gt;</div>
    <div><span>Date:</span> Thu, 08 Feb 1996</div>
    <div><span>To:</span> Cyberspace Community</div>
    <div><span>Subject:</span> Declaration of the Independence of Cyberspace</div>
  </div>

  <div class="barlow-terminal__body" data-barlow-terminal-body tabindex="0" aria-label="Typed excerpt from Barlow's Declaration of the Independence of Cyberspace">
    <pre class="barlow-terminal__text" data-barlow-terminal-text></pre>
    <span class="barlow-terminal__cursor" data-barlow-terminal-cursor aria-hidden="true"></span>
  </div>

  <div class="barlow-terminal__footer">
    <span data-barlow-terminal-status>waiting for viewport...</span>
    <button class="barlow-terminal__skip" type="button" data-barlow-terminal-skip>Show full text</button>
  </div>
</figure>
```

Notes:

- `tabindex="0"` lets keyboard users scroll the terminal body.
- `aria-live` is intentionally omitted. A live region would force screen readers to announce a long animated text stream, which is poor UX.
- A visually hidden transcript may be added below the component if needed for formal accessibility review.

## CSS architecture

Add these styles in the inline `<style>` block of `primer/module-01.html`, near the existing Barlow section styles. Prefix with `barlow-terminal` to avoid conflicts.

```css
.barlow-terminal {
  --terminal-bg: #07111f;
  --terminal-bg-2: #0b1628;
  --terminal-line: rgba(148, 163, 184, 0.22);
  --terminal-blue: rgba(96, 165, 250, 0.45);
  --terminal-green: #9fe870;
  --terminal-muted: #94a3b8;
  --terminal-orange: #fb923c;

  margin: 2.25rem 0 2.75rem;
  border: 1px solid var(--terminal-blue);
  border-radius: 1rem;
  background:
    radial-gradient(circle at 20% 0%, rgba(59, 130, 246, 0.18), transparent 38%),
    linear-gradient(180deg, var(--terminal-bg-2), var(--terminal-bg));
  box-shadow:
    0 24px 70px rgba(2, 6, 23, 0.48),
    inset 0 0 0 1px rgba(255, 255, 255, 0.035);
  overflow: hidden;
}

.barlow-terminal__caption {
  padding: 0.7rem 1rem 0;
  color: var(--terminal-muted);
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.68rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
}

.barlow-terminal__chrome {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  padding: 0.85rem 1.05rem;
  border-bottom: 1px solid var(--terminal-line);
  background:
    linear-gradient(180deg, rgba(30, 64, 175, 0.26), rgba(15, 23, 42, 0.32));
  color: #dbeafe;
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.88rem;
}

.barlow-terminal__window-title {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.barlow-terminal__mail-icon {
  color: var(--terminal-orange);
}

.barlow-terminal__window-controls {
  display: flex;
  gap: 0.45rem;
  flex: 0 0 auto;
}

.barlow-terminal__window-controls span {
  width: 0.72rem;
  height: 0.72rem;
  border: 1px solid rgba(226, 232, 240, 0.55);
  border-radius: 2px;
  opacity: 0.85;
}

.barlow-terminal__meta {
  padding: 1rem 1.15rem 0.85rem;
  border-bottom: 1px solid rgba(148, 163, 184, 0.16);
  color: #d1d5db;
  font-family: 'JetBrains Mono', monospace;
  font-size: clamp(0.78rem, 1.2vw, 0.95rem);
  line-height: 1.65;
}

.barlow-terminal__meta span {
  display: inline-block;
  min-width: 5.8rem;
  color: var(--terminal-orange);
  font-weight: 700;
}

.barlow-terminal__body {
  position: relative;
  height: clamp(21rem, 44vh, 30rem);
  overflow-y: auto;
  padding: 1.25rem 1.15rem 1.45rem;
  scroll-behavior: auto;
  scrollbar-width: thin;
  scrollbar-color: rgba(148, 163, 184, 0.45) transparent;
}

.barlow-terminal__body::-webkit-scrollbar {
  width: 0.55rem;
}

.barlow-terminal__body::-webkit-scrollbar-thumb {
  background: rgba(148, 163, 184, 0.35);
  border-radius: 999px;
}

.barlow-terminal__text {
  margin: 0;
  white-space: pre-wrap;
  overflow-wrap: break-word;
  color: var(--terminal-green);
  font-family: 'JetBrains Mono', monospace;
  font-size: clamp(0.86rem, 1.18vw, 1rem);
  line-height: 1.68;
  text-shadow: 0 0 12px rgba(159, 232, 112, 0.10);
}

.barlow-terminal__cursor {
  display: inline-block;
  width: 0.62ch;
  height: 1.16em;
  margin-left: 0.16rem;
  background: var(--terminal-green);
  box-shadow: 0 0 12px rgba(159, 232, 112, 0.45);
  animation: barlowTerminalBlink 1s steps(1) infinite;
}

.barlow-terminal__cursor.is-done {
  opacity: 0.35;
  animation: none;
}

.barlow-terminal__footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  padding: 0.75rem 1rem;
  border-top: 1px solid rgba(148, 163, 184, 0.14);
  color: var(--terminal-muted);
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.72rem;
}

.barlow-terminal__skip {
  border: 1px solid rgba(251, 146, 60, 0.45);
  border-radius: 999px;
  padding: 0.35rem 0.65rem;
  background: rgba(251, 146, 60, 0.08);
  color: #fed7aa;
  font-family: inherit;
  font-size: inherit;
  cursor: pointer;
}

.barlow-terminal__skip:hover,
.barlow-terminal__skip:focus-visible {
  background: rgba(251, 146, 60, 0.16);
  outline: none;
}

@keyframes barlowTerminalBlink {
  50% { opacity: 0; }
}

@media (max-width: 760px) {
  .barlow-terminal {
    margin-left: -0.25rem;
    margin-right: -0.25rem;
    border-radius: 0.8rem;
  }

  .barlow-terminal__meta span {
    display: block;
    min-width: 0;
  }

  .barlow-terminal__body {
    height: 22rem;
  }

  .barlow-terminal__footer {
    align-items: flex-start;
    flex-direction: column;
  }
}

@media (prefers-reduced-motion: reduce) {
  .barlow-terminal__cursor {
    animation: none;
  }
}
```

## JavaScript architecture

Place the script near the bottom of `primer/module-01.html`, after the existing animation setup. It can use either `ScrollTrigger` if GSAP is already loaded or `IntersectionObserver` as a fallback.

The terminal should not depend on GSAP to function.

```html
<script>
(function () {
  const terminal = document.querySelector('[data-barlow-terminal]');
  if (!terminal) return;

  const bodyEl = terminal.querySelector('[data-barlow-terminal-body]');
  const textEl = terminal.querySelector('[data-barlow-terminal-text]');
  const cursorEl = terminal.querySelector('[data-barlow-terminal-cursor]');
  const statusEl = terminal.querySelector('[data-barlow-terminal-status]');
  const skipButton = terminal.querySelector('[data-barlow-terminal-skip]');

  const declarationText = `Governments of the Industrial World, you weary giants of flesh and steel, I come from Cyberspace, the new home of Mind.

On behalf of the future, I ask you of the past to leave us alone.

You have no sovereignty where we gather. We did not invite you. You do not know us, nor do you know our world. Cyberspace does not lie within your borders.

Ours is a world that is both everywhere and nowhere, but it is not where bodies live.

We are creating a world that all may enter without privilege or prejudice accorded by race, economic power, military force, or station of birth.

We are creating a world where anyone, anywhere may express his or her beliefs, no matter how singular, without fear of being coerced into silence or conformity.

Your legal concepts of property, expression, identity, movement, and context do not apply to us. They are all based on matter, and there is no matter here. Our identities have no bodies, so, unlike you, we cannot obtain order by physical coercion. Our identities may be distributed across many of your jurisdictions.

You are terrified of your own children, since they are natives in a world where you will always be immigrants. In our world, all the sentiments and expressions of humanity are parts of a seamless whole, the global conversation of bits. We cannot separate the air that chokes from the air upon which wings beat.

You are trying to ward off the virus of liberty by erecting guard posts at the frontiers of Cyberspace. These may keep out the contagion for a small time, but they will not work in a world that will soon be blanketed in bit-bearing media.

In our world, whatever the human mind may create can be reproduced and distributed infinitely at no cost. The global conveyance of thought no longer requires your factories to accomplish.

We will spread ourselves across the Planet so that no one can arrest our thoughts.

We will create a civilization of the Mind in Cyberspace. May it be more humane and fair than the world your governments have made before.`;

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  let index = 0;
  let timer = null;
  let started = false;
  let complete = false;

  function renderFullText() {
    window.clearTimeout(timer);
    textEl.textContent = declarationText;
    bodyEl.scrollTop = bodyEl.scrollHeight;
    cursorEl.classList.add('is-done');
    if (statusEl) statusEl.textContent = 'full text displayed';
    if (skipButton) skipButton.hidden = true;
    complete = true;
  }

  function nextDelay(chunk) {
    const trimmed = chunk.trim();
    if (chunk.includes('\n\n')) return 190 + Math.random() * 120;
    if (/[.!?]$/.test(trimmed)) return 80 + Math.random() * 80;
    if (/[,;:]$/.test(trimmed)) return 42 + Math.random() * 38;
    return 12 + Math.random() * 22;
  }

  function typeTick() {
    if (complete) return;

    if (index >= declarationText.length) {
      complete = true;
      cursorEl.classList.add('is-done');
      if (statusEl) statusEl.textContent = 'transmission complete';
      if (skipButton) skipButton.hidden = true;
      return;
    }

    const remaining = declarationText.length - index;
    const burst = Math.min(remaining, 3 + Math.floor(Math.random() * 5));
    const chunk = declarationText.slice(index, index + burst);
    index += burst;

    textEl.textContent += chunk;
    bodyEl.scrollTop = bodyEl.scrollHeight;

    timer = window.setTimeout(typeTick, nextDelay(chunk));
  }

  function startTyping() {
    if (started || complete) return;
    started = true;
    if (statusEl) statusEl.textContent = 'typing manifesto...';
    typeTick();
  }

  if (skipButton) {
    skipButton.addEventListener('click', renderFullText);
  }

  if (prefersReducedMotion) {
    renderFullText();
    return;
  }

  if (window.ScrollTrigger) {
    window.ScrollTrigger.create({
      trigger: terminal,
      start: 'top 72%',
      once: true,
      onEnter: startTyping
    });
    return;
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        startTyping();
        observer.disconnect();
      }
    });
  }, { threshold: 0.35 });

  observer.observe(terminal);
}());
</script>
```

## Optional refinement: typed line prefixes

The screenshot mockup uses `>` at the beginning of lines. That gives a stronger terminal feel but can reduce readability for a long text.

Recommendation:

- Do not prefix every line with `>` in the stored text.
- Instead, use a CSS pseudo-element or a small prompt label only at the start of paragraphs if desired.
- Preserve the Declaration text as clean prose inside the terminal.

If a prompt prefix is desired, add it visually before the `pre`:

```html
<span class="barlow-terminal__prompt" aria-hidden="true">transmit -- now</span>
```

## Content integrity

Use actual excerpts from the Declaration. Do not invent metadata or lines.

Suggested metadata fields can be generic and transparent:

- `From: John Perry Barlow <barlow@eff.org>`
- `Date: Thu, 08 Feb 1996`
- `To: Cyberspace Community`
- `Subject: Declaration of the Independence of Cyberspace`

If the exact publication timestamp is not verified in the module source, do not display a precise time. A date-only field is safer.

## Performance notes

The implementation appends to `textContent`, not `innerHTML`, which avoids parsing overhead and injection risk. The terminal text is a few thousand characters, so this is safe for modern browsers.

Potential micro-optimization if needed later:

- Append chunks to an array and update `textContent` every two or three ticks.
- This is likely unnecessary for the current text length.

## Accessibility notes

- The terminal body is keyboard-scrollable.
- Reduced-motion users receive the full text immediately.
- The animation is not announced as a live region.
- The `Show full text` button gives users direct control.
- Avoid placing essential analytical meaning only in the animation; keep the existing cards below.

## QA checklist

Before merging into Module 01:

- The terminal appears above `The Manifesto` and `The Myth of Immateriality`.
- The analytical cards remain unchanged and readable.
- Typing starts only once when the component enters the viewport.
- The terminal body scrolls internally as text grows.
- The page itself does not jump while text is typing.
- `Show full text` works during typing.
- `prefers-reduced-motion` displays the full text immediately.
- The component is readable on mobile at 360px width.
- Text remains copyable and editable in the HTML / JS source.
- The styling feels distinct from the Gore archival component.

## Recommended next implementation step

Implement the terminal as a localized enhancement inside `primer/module-01.html` first. If a second terminal-style source component is later added elsewhere in the course, extract the CSS and JS into reusable files under `assets/js/` and `shared/`.

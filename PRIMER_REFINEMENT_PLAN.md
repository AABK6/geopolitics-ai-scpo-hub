# Development Plan: Primer Modules Visual Refinement

## 1. Visual Audit Observations (Full Scroll Audit)
- **The "White Block" Regression:** Several sections (notably in Module 01) are rendering with stark white backgrounds, clashing with the dark "Latent Space" theme. These are inherited hardcoded styles from the original monolith that need forced overrides.
- **Content "Black Holes" (Module 05):** Massive vertical gaps of empty dark space appear in the middle of Module 05. This suggests either a truncation error in the split script or GSAP scroll triggers that are failing to fire in the new standalone context.
- **Hero Typography Legibility:** Hero titles (especially in Module 01) lack sufficient contrast against their background glows, making them nearly invisible.
- **Navigation Redundancy:** Module 08 displays "Back to Hub" twice in the header, creating a confusing navigational loop.
- **Asset Inconsistency:** Background noise textures and grain filters are missing in several modules due to relative pathing issues (`../images/`).

## 2. Proposed Fixes

### A. Global CSS Sync (`shared/primer.css`)
- **Force Global Dark Mode:** Implement strict CSS overrides (`background-color: #050505 !important`) for all section, main, and body tags to eliminate white-block leaks.
- **Typography Hardening:** Apply a standard `text-shadow` and `backdrop-filter` for all Hero titles.
- **Unified Nav Component:** Fix the Module 08 header logic and add a glassmorphic blur to the sticky header.

### B. Structural & Content Repair
- **Module 05 Deep Audit:** Manually verify and restore the "Industrial Production Function" content blocks that are currently invisible or missing.
- **Path Normalization:** Audit all `url()` references in CSS and HTML to ensure textures/images load correctly across all directory depths.

### C. GSAP Animation & UX Polish
- **Scroll Progress Artery:** Add a thin, glowing progress bar at the top of the sticky nav.
- **Entrance Sequences:** Use GSAP to "fade-in-and-up" each major content div as it enters the viewport to create a modern "scrolly-telling" feel.
- **Transition Gates:** Turn the "Next Module" links at the bottom into high-end cinematic transition elements.

## 3. Implementation Strategy
1. Create a `shared/primer.css` file to hold these normalization rules.
2. Update the `split_all_modules.py` template to include the new CSS and the GSAP entrance logic.
3. Re-run the split script to propagate the restoration across all 8 chapters.

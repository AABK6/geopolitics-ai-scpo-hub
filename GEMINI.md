# Geopolitics of AI: Project Context

This repository hosts a custom-built digital platform for the **Geopolitics of AI** course (Sciences Po Paris, Spring 2026). It serves as both a content delivery system for course modules and a federated hosting environment for student research projects.

## Project Overview

*   **The Hub:** A high-end, interactive 3D spatial environment ("Latent Space") serving as the main entry point. It visualizes the connection between theoretical "Anchor Nodes" and student-led "Satellite Nodes."
*   **The Primer:** A series of 8 digital briefing chapters (located in `/primer/`) that dismantle complex geopolitical narratives into readable, modular units.
*   **The Sandboxes:** Isolated directories in `/projects/` where student groups publish their static research projects.
*   **Architecture:** A federated model using an Iframe Wrapper for student projects to ensure total creative freedom within sandboxed environments without breaking the main site's global styles.

## Technical Stack

*   **Frontend:** Vanilla HTML5, CSS3, and JavaScript (ES Modules).
*   **3D Engine:** Three.js (v0.158.0) with Post-processing (Bloom, UnrealBloomPass).
*   **Animations:** GSAP (GreenSock Animation Platform) + ScrollTrigger for UI and scroll-driven interactions.
*   **Styling:** Custom CSS design system (`shared/design-system.css`) with some Tailwind CSS usage in specific modules.
*   **Icons:** Lucide Icons.

## Development Conventions

*   **Isolation:** Never edit files in `shared/`, `primer/`, or the root `index.html` when working on student projects. All student work must be contained within `projects/group-X/`.
*   **Entry Point:** Every student project must have an `index.html` file as its primary entry point.
*   **Relative Paths:** Ensure all assets (images, CSS, JS) in project folders use relative paths to work correctly within the Iframe wrapper and the 3D Hub router.
*   **Local Preview:** Use `python3 -m http.server 8000` to view the full Hub locally.

## Refinement Strategy: Hero Style + 3D Architecture

The user has noted that the `index-original.html` contained rich information upfront (opening statements, core questions, instructors) that is currently less prominent in the 3D Hub. To reconcile the **impactful narrative** of the original with the **spatial sophistication** of the 3D nodes, consider these approaches:

1.  **The "Narrative HUD" Overlay:**
    *   Implement a transparent UI layer over the 3D canvas that hosts the "Opening Statement" and "Core Question" from the original hero.
    *   Use GSAP to fade these elements out as soon as the user interacts with the 3D scene (e.g., on first drag or zoom).
2.  **Scroll-Driven "Entrance" (Recommended):**
    *   Initialize the page with a rich text hero section (title, instructors, BLUF statement) that covers the viewport.
    *   As the user scrolls, use `ScrollTrigger` to:
        *   Fade/Translate the text out of view.
        *   Animate the 3D Camera from a "Macro" close-up of a central node (representing the core question) to a "Wide" view of the full constellation.
3.  **The "Dive" Interaction:**
    *   Keep the original Hero design almost intact but replace the static background with the 3D canvas.
    *   The "Begin the Journey" CTA triggers a camera move that "dives" through the 3D space toward the first module, transitioning the UI from "Introduction" to "Active Exploration."

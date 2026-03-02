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

# Geopolitics of AI: Hub Architecture & UX Specification

## 1. The Architecture: Isolation & Technical Flexibility
To host five distinct student projects without conflicting with the main site's CSS or JavaScript, the repository employs **Directory Isolation** combined with an **Iframe Wrapper**.

Since the platform is deployed via static hosting (e.g., GitHub Pages), the server only serves static assets. This provides immense flexibility:

*   **Folder Structure:** The repository contains a `/projects/` directory with five subfolders (e.g., `/projects/group-alpha/`).
*   **The Baseline (Option A Students):** Students using basic HTML/CSS methods can simply drop their `index.html` and `styles.css` into their assigned folder.
*   **The Advanced (Option B Students):** Groups with stronger technical skills can build complex apps (React, Vue, Three.js) by running their build command locally and pushing the static output (`dist/` or `out/`) into their folder.

### The Integration Strategy
When a user clicks on a student project from the Hub, they are presented with two options:
1.  **Direct Link:** Opens the project in its own page (fastest, least brittle).
2.  **Preview (Iframe Wrapper):** Opens a "Project Viewer" page on the main site. This page features a standard navigation bar at the top (maintaining the course ecosystem context) and a sandboxed `<iframe src="/projects/group-alpha/index.html">` taking up the remaining viewport. The iframe acts as a quarantine zone, preventing student code from breaking the main site.

## 2. The Repository Structure (Federated Model)
The repository acts as a strict filing system to support a 3D interface without mixing student code with the master narrative.

*   **The Root (The Command Center):** Contains the "Latent Space" 3D Hub landing page (`index.html`), shared design assets, global styles, and 3D rendering scripts.
*   **Directory A: The Primer (Master Narrative):** Holds isolated, highly readable briefing pages (e.g., `Module-01-The-End-of-the-Beginning.html`). Instead of one massive scroll, the content is dismantled into distinct "chapters" with linear wayfinding (a "Proceed to Module 2" gateway at the bottom of Module 1).
*   **Directory B: The Field Briefs (Student Projects):** The isolated sandbox containing the 5 group sub-folders.

## 3. The "Latent Space" Hub (UX & Presentation)
The landing page departs from standard university websites, presenting a highly sophisticated, interactive 3D spatial environment.

*   **Visual Metaphor:** A beautiful neural network graph or global supply chain topology, populated by glowing "Nodes" (content) connected by "Edges" (relationships).
*   **The Nodes:**
    *   **Anchor Nodes (Core):** Larger, pulsing spheres representing theoretical modules.
    *   **Satellite Nodes (Applied):** Smaller, orbiting spheres representing the 5 student projects.
*   **Navigation:** Users can click and drag to rotate the constellation and scroll to zoom.
*   **Hover State:** Hovering over a node pauses the 3D motion and summons a sleek "Briefing Card" on the side of the screen. This card displays the title, a one-sentence analytical takeaway (BLUF), and a "Read Brief" button that transports the user to the reading page.

## 4. The "Escape Hatch" (Accessibility)
To ensure the site remains 100% accessible, mobile-friendly, and usable for immediate information retrieval, users are never trapped in the 3D interface.

*   **The Tactical Overlay:** A persistent, minimalist UI toggle in the top-right corner of the Latent Space screen.
*   **The Fallback (`magazine.html`):** Clicking the toggle instantly dissolves the 3D network graph, replacing it with a high-end, text-based magazine layout (reminiscent of *The Atlantic*).
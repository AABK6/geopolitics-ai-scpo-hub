# Geopolitics of AI: Hub Architecture and Submission Model

## 1. Hosting Model: Static Site With Isolated Project Folders
The platform is deployed as a static site on GitHub Pages. The repository is organized so the master course site and student project bundles live side by side without sharing runtime state.

- **Root:** The command center. It contains the 3D landing page (`index.html`), the editorial fallback (`magazine.html`), shared design assets, and the global scripts that power the course site.
- **Primer:** The course narrative. The `primer/` directory contains the eight module pages.
- **Projects:** The field briefs. The `projects/` directory contains five reserved student sandboxes: one folder per group, each with its own `index.html` entrypoint.

Because the host is static, student work must be published as static output. Framework builds are acceptable only after they have been compiled down to files that can be served directly from a browser.

## 2. Student Project Integration
Student projects are integrated into the Hub in two ways:

1. **Direct Link (default):** The 3D Hub and the editorial overview both link directly to `projects/group-X/index.html`.
2. **Preview Wrapper (optional):** `preview.html?project=group-X` opens the same project inside a sandboxed iframe with course navigation around it.

The preview wrapper is useful for review and context, but it is not the primary safety boundary. The main protection model is:

- directory isolation at `projects/group-X/`
- Pull Request validation for student submissions
- instructor review through `CODEOWNERS`
- protected branch settings on GitHub, with teacher and maintainer bypass configured in repository settings

## 3. Submission Guardrails
Student submissions are expected to be self-contained static bundles:

- one assigned `projects/group-X/` folder per group
- required entrypoint: `projects/group-X/index.html`
- all local assets must resolve from inside that folder
- no references that escape the folder (for example `../` or root-relative links into the main site)
- no build manifests, server-side code, or source-only artifacts in the published folder

For Pull Requests that touch `projects/**`, the repository runs two checks:

1. **Submission guard:** Verifies that the PR touches exactly one group folder, keeps all changes inside that folder, includes `index.html`, and rejects obvious unsafe or non-static artifacts.
2. **Site smoke check:** Serves the repo locally and checks that the main entry pages plus the submitted project page load without missing local assets.

Teacher and maintainer pushes to `main` remain trusted so instructors can publish files directly when needed, but advisory checks still run on push and report issues without blocking deployment.

## 4. UX Model
The landing page presents the course as a 3D spatial network rather than a conventional class website.

- **Anchor Nodes:** Larger nodes for the course modules.
- **Satellite Nodes:** Smaller nodes for the five student projects.
- **Interaction:** Hovering reveals a briefing card; clicking opens the corresponding module or project page directly.
- **Escape Hatch:** Users can switch from the 3D interface to `magazine.html`, a fully readable editorial index that also links to every student project and preview wrapper.

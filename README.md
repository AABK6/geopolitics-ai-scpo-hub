# Geopolitics of AI: Sovereignty, Power, and the Future of World Order
**Sciences Po Paris — Spring 2026**

Welcome to the digital hub for the *Geopolitics of AI* course. This repository hosts the interactive syllabus, the master narrative modules, and the digital sandboxes for your cohort projects. 

## The Course Platform
We have moved away from static PDFs and closed Learning Management Systems. The course material is hosted on a custom-built, open-web platform designed to reflect the technological focus of the seminar. 

The platform has three main components:
1. **The Latent Space (3D Hub):** The default landing page. A spatial, interactive map showing how the theoretical modules (Anchor Nodes) and your applied intelligence briefs (Satellite Nodes) connect.
2. **The Primer Modules:** The core readings of the course, split into 8 highly-dense, mobile-friendly digital chapters (e.g., *The Strategic Convergence*, *The Splinternet Accelerates*).
3. **The Project Sandboxes:** Isolated directories where your group will push your final digital project, automatically hosted alongside the main course material.

---

## Instructions for Students: Publishing Your Intelligence Brief

For your final evaluation, your group is required to build a digital intelligence brief. This brief will be integrated directly into the course website as a "Satellite Node". 

Because this repository uses a **Federated Architecture**, your code is completely isolated. You have total freedom over how you build your brief, so long as it compiles to static web files (HTML/CSS/JS).

### Step 1: Claim Your Sandbox
Navigate to the `projects/` directory in this repository. You will see 5 folders:
- `/projects/group-1/`
- `/projects/group-2/`
- `/projects/group-3/`
- `/projects/group-4/`
- `/projects/group-5/`

Your group has been assigned one of these folders. **You may only edit files within your assigned folder.**

### Step 2: Choose Your Tech Stack (Two Options)

#### Option A: The "Copy and Paste" Method (No Coding Experience Required)
If your group has no coding experience, you are encouraged to use LLMs (like Claude, ChatGPT, or Gemini) to generate your site.
1. Ask the AI to generate a single-page HTML intelligence brief (e.g., *"Write a beautiful, single-page HTML and CSS website for a policy brief about Data Center cooling..."*).
2. Save the output as `index.html` (and optionally `styles.css`).
3. Place these files directly into your assigned folder (e.g., `/projects/group-1/index.html`).

#### Option B: The "Advanced" Method (For Technical Groups)
If your group wants to build a complex data visualization, React dashboard, or Three.js simulation, you have full freedom to do so.
1. Build your app locally using Vite, Next.js (Static Export), or React.
2. Run your build command (e.g., `npm run build`).
3. Copy the *contents* of your `dist/` or `out/` folder into your assigned group folder.
*Note: Ensure your asset paths are relative (e.g., `./image.png` not `/image.png`) so they load correctly on GitHub pages.*

### Step 3: Pushing Your Brief to the Hub
Once your files are in your folder, you need to push them to the course repository:

```bash
# 1. Clone the repository (if you haven't already)
git clone https://github.com/YOUR_ORG/geopolitics-ai-scpo-hub.git

# 2. Add your files to your specific group folder
# (e.g., copy your index.html into projects/group-1/)

# 3. Stage and commit your changes
git add projects/group-1/*
git commit -m "Add Group 1 Intelligence Brief"

# 4. Push to the main branch to deploy
git push origin main
```

Within 60 seconds of pushing, GitHub Pages will rebuild the site. Your intelligence brief will automatically become accessible via the 3D Hub and the main magazine index.

### Architecture Rules
- **Do not edit files outside your `projects/group-X/` folder.** Changing `shared/`, `primer/`, or `index.html` will break the master course site.
- **Your entry file must be named `index.html`.** The Hub's router specifically looks for `projects/group-X/index.html` to load your project into the iframe viewer.

---

## Local Development (For checking your work)
If you want to view the entire Hub locally to see how your project integrates:

1. Open your terminal and navigate to the repository root.
2. Run a local python server:
   ```bash
   python3 -m http.server 8000
   ```
3. Open `http://localhost:8000` in your browser.
# Geopolitics of AI: Sovereignty, Power, and the Future of World Order
**Sciences Po Paris — Spring 2026**

Welcome to the digital hub for the *Geopolitics of AI* course. This repository hosts the course modules and the digital sandboxes for the final group research projects. 

## The Course Platform
The course material is hosted on a custom-built, open-web platform designed to reflect the technological focus of the seminar. 

The platform has three main components:
1. **The 3D Hub:** The landing page map showing how the theoretical modules (Anchor Nodes) and student research projects (Satellite Nodes) connect.
2. **The Course Modules:** The core readings of the course, split into 8 digital chapters (e.g., *The Strategic Convergence*, *The Splinternet Accelerates*).
3. **The Project Sandboxes:** Isolated directories where your group will push your final digital research project, hosted alongside the main course material.

---

## Instructions for Students: Publishing Your Group Project

For your final evaluation (30% of your grade), your group is required to build a single static webpage that explains a complex AI geopolitics topic of your choice. You will not write the code by hand; you will manage an AI agent to write it for you. Your job is to provide the high-quality intelligence (the text, the analysis, the data); the AI’s job is to build the container (the webpage).

Because this repository separates the main site from the student folders, your code is isolated. You have total creative and technical freedom over how you build your page, as long as it fits in the repository architecture without breaking the main website (i.e., it must be contained entirely within your assigned folder).

### Step 1: Find Your Sandbox
Navigate to the `projects/` directory in this repository. You will see 5 folders:
- `/projects/group-1/`
- `/projects/group-2/`
- `/projects/group-3/`
- `/projects/group-4/`
- `/projects/group-5/`

Your group has been assigned one of these folders. **You must place your files within your assigned folder.**

### Step 2: Choose Your Path

We recognize that students have varying levels of technical comfort. Choose the path that fits your group's level.

#### Option A: "Copy and Paste" method (Zero Technical)
If your group has no coding experience, use frontier chatbots to generate your site:
1. Write the substance in any format (Google Doc, Word, plain text).
2. Ask an AI (Claude, ChatGPT, Gemini) to convert it into a single HTML webpage that matches the vibe of your analysis.
3. Save the output as `index.html`.
4. Share the file with the teachers, and we will publish it to your folder on the live server for you.

#### Option B: "Builder" method (Light to Advanced Technical)
If your group wants to use AI coding agents (VS Code with Gemini, Codex, Claude) or vibe-coding tools (Antigravity, Claude Code), you have full freedom to do so:
1. Create a GitHub account.
2. Clone this repository locally.
3. Use your AI tools to build your project. **Important**: Your final output must compile to static files. If you use a framework, run your build command (e.g., `npm run build`) and copy the contents of your `dist/` or `out/` folder into your assigned group folder. Ensure asset paths are relative.
4. Open a Pull Request to send your page directly to the class website.

To push your project to the Hub via Git:
```bash
# 1. Clone the repository (if you haven't already)
git clone https://github.com/YOUR_ORG/geopolitics-ai-scpo-hub.git

# 2. Add your files to your specific group folder
# (e.g., copy your index.html into projects/group-1/)

# 3. Stage and commit your changes
git add projects/group-1/*
git commit -m "Add Group 1 Project"

# 4. Push to the main branch or open a Pull Request
git push origin main
```

Within 60 seconds of merging, GitHub Pages will rebuild the site. Your research project will automatically become accessible via the 3D Hub as a Satellite Node.

### Architecture Rules
- **Do not edit files outside your `projects/group-X/` folder.** Changing `shared/`, `primer/`, or `index.html` will break the master course site.
- **Your entry file must be named `index.html`.** The Hub's router specifically looks for `projects/group-X/index.html` to load your project into the viewer.
- **Substance over flash:** A beautiful site with shallow analysis will get a lower grade than a simpler site with deep, verified geopolitical insight.

---

## Local Development (For checking your work)
If you are using Option B and want to view the entire Hub locally to see how your project integrates:

1. Open your terminal and navigate to the repository root.
2. Run a local python server:
   ```bash
   python3 -m http.server 8000
   ```
3. Open `http://localhost:8000` in your browser.
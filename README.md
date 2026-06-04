# The Ultimate DJ Masterclass

A self-contained DJ education app — single HTML file, no server required.

**~80 lessons across 12 courses, gear to festival mainstage:**
- Gear & Setup
- Software & Library
- Beatmatching & Mixing
- Advanced Techniques
- Turntablism & Scratching
- Track Selection & Crowd
- Genres Deep Dive
- Performance & Playing Live
- Remixing & Editing
- Music Production
- Brand, Audience & Streaming
- The Business & Making Money

**Features:** Neon-grid cyberpunk theme · Light/dark mode · Progress tracking · Global search · Related lessons · Practice exercises · Tracks to practice with

## Build

Lesson content lives in `data/<course>.json`. The single-file app is assembled with:

```bash
node build.js
```

This injects every course into `index.html` (the served artifact). No dependencies, no build step beyond Node.

## Hosting

Static — deploys to Cloudflare Pages by connecting the GitHub repo (build command: none, output directory: `/`).

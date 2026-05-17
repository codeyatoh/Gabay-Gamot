# Decisions

## 2026-05-17

- Use a minimal `.agent/` folder for project context and planning.
- Build the landing page first before the full web app.
- Use React JS with Vite for the frontend.
- Use Tailwind CSS for styling.
- Use Shadcn UI as the main UI component system.
- Keep the folder structure beginner friendly.
- Treat security as a core requirement from the start, including rate limiting, role-based access, validation, safe uploads, and secret management.
- Every implementation or behavior change must be reflected in the `docs/` folder, using the matching documentation area for screens, planning, database, API, or diagrams.
- Treat responsive UI and PWA-ready layout behavior as baseline requirements: safe-area support, hidden scrollbars with scroll preserved, 44px touch targets, no unintended horizontal overflow, and breakpoint-aware Tailwind layouts from 320px through ultra-wide screens.

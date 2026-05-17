# Agent MCP Workflow

## Purpose

GabayGamot now expects AI-assisted work to use the available MCP tools when they improve accuracy or verification.

This is especially important for:

- current framework/library documentation
- browser-based UI validation
- responsive checks
- local route behavior
- frontend regression screenshots

## Context7

Use Context7 when implementation depends on current package or framework behavior.

Good uses:

- React, Vite, Tailwind, Radix, and shadcn-style component behavior
- Firebase, Firebase Admin, Firestore, and Firebase Auth
- Express, Zod, Multer, Mapbox SDK, and Tesseract.js
- package APIs that may have changed recently

Workflow:

1. Resolve the library ID first.
2. Query the exact implementation question.
3. Prefer official or high-reputation docs returned by Context7.
4. Apply the answer to the project conventions instead of copying examples blindly.

## Playwright

Use Playwright for implemented frontend behavior, especially when a change affects layout, navigation, maps, forms, or responsive behavior.

Recommended checks:

- open the Vite dev server route being changed
- test `/`, `/login`, `/signup`, and `/forgot-password` when auth or shared layout changes
- check mobile width around 320px and 390px
- check tablet/desktop widths around 768px, 1024px, and 1440px
- inspect console errors
- capture screenshots when visual QA matters

## Documentation Rule

Any code, UI, database, API, Firebase, workflow, MCP, or system behavior change must update the matching docs folder.

Use:

- `docs/screens/` for visible screens and UI states
- `docs/api/` for backend endpoints
- `docs/database/` for schemas and rules
- `docs/planning/` for workflows, conventions, and implementation strategy
- `docs/diagrams/` for flowcharts or architecture diagrams

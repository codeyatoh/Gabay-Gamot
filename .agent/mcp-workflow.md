# MCP Workflow

## Context7

Use Context7 when a task depends on current documentation for a framework, library, or SDK.

Use it for:

- React, Vite, Tailwind, Radix, and shadcn-style components
- Firebase, Firestore, Firebase Auth, and Firebase Admin
- Express, Zod, Multer, Mapbox, Tesseract.js, and Gemini SDKs
- any dependency where version-specific behavior matters

Workflow:

1. Resolve the Context7 library ID.
2. Ask a focused implementation question.
3. Prefer official or high-reputation docs.
4. Adapt examples to GabayGamot project conventions.

## Playwright

Use Playwright when validating frontend behavior in the browser.

Use it for:

- local Vite routes
- responsive layout checks
- forms and navigation
- console error checks
- screenshots after visual changes
- Mapbox or browser API behavior when it can run locally

Default routes to verify after shared UI/auth changes:

- `/`
- `/login`
- `/signup`
- `/forgot-password`

Default widths:

- 320
- 390
- 768
- 1024
- 1440

## Documentation

After using MCP tools to guide a code or behavior change, update the relevant docs:

- `docs/screens/`
- `docs/api/`
- `docs/database/`
- `docs/planning/`
- `docs/diagrams/`

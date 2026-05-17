# Coding Guidelines

## General

- Keep the project beginner friendly.
- Use clear file and component names.
- Prefer small components instead of one very large file.
- Keep comments short and only add them when they help explain non-obvious code.
- Follow `.agent/security-guidelines.md` when adding backend, Firebase, auth, upload, or API features.

## Frontend

- Use React with Vite.
- Use Tailwind CSS for styling.
- Use Shadcn UI as the main UI component system.
- Use Shadcn UI as primitives, then customize layout and styling so the app does not look generic.
- Use `lucide-react` for meaningful icons.
- Put reusable UI pieces in `frontend/src/components/common/`.
- Put landing page sections in `frontend/src/components/landing/`.
- Put page-level components in `frontend/src/pages/`.
- Keep animation subtle, smooth, and purposeful.
- Prefer custom GabayGamot product visuals over generic placeholder cards.
- Do not put private API keys in frontend code.
- Protect private routes once authentication is added.

## Backend

- Validate request bodies before using them.
- Add rate limits to auth, OCR, AI, and other API routes before public deployment.
- Keep API keys and credentials in `.env`.
- Never commit real secrets to GitHub.
- Use auth and role middleware for protected routes.
- Enforce barangay-based access on server-side logic.

## Component Naming

Use PascalCase for React components.

Examples:

```text
HeroSection.jsx
FeatureCard.jsx
LandingPage.jsx
```

## Shadcn UI

Prefer Shadcn UI components for:

- buttons
- cards
- dialogs
- forms
- inputs
- tabs
- tables
- badges
- alerts

Do not copy Shadcn example blocks as final UI. Treat them as starting points only.

Use custom components when:

- the layout needs to feel branded to GabayGamot
- the section needs a product preview or custom composition
- repeated Shadcn defaults make the UI look generic
- the component combines multiple primitives into a clearer healthcare workflow

## Animation

- Use motion to guide attention, not to decorate randomly.
- Good patterns: fade in, slide up, soft scale, staggered reveal, smooth tab transition.
- Avoid bouncy, flashy, or slow animations.
- Keep hover and button transitions fast.
- Make sure animations do not break mobile usability.

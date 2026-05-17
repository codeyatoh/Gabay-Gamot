# Coding Guidelines

## General (Strict AI Enforcement)

- **Zero-laziness policy:** Always write complete, production-ready code. Never leave `// TODO` or placeholder comments when asked to implement a feature.
- **Responsiveness First:** Every component MUST be flawless from 320px mobile through tablet, desktop, large desktop, and ultra-wide screens. Use responsive Tailwind prefixes intentionally (`sm:`, `md:`, `lg:`, `xl:`, `2xl:`) instead of assuming one breakpoint is enough.
- Keep the project highly organized and beginner friendly.
- Use clear file and component names (PascalCase for React components).
- Prefer small, focused components instead of one very large file.
- Keep comments short and only add them when they help explain non-obvious logic.
- Follow `.agent/security-guidelines.md` when adding backend, Firebase, auth, upload, or API features.
- Follow `.agent/storage-guidelines.md` when adding image, document, OCR, or attachment uploads.
- Always check existing design tokens (`globals.css`, `tailwind.config.js`) before inventing new ones.
- Every code, UI, database, API, Firebase, workflow, or system behavior change MUST include a matching documentation update inside `docs/`.
- Keep documentation updates close to the changed area: screens in `docs/screens/`, planning decisions in `docs/planning/`, database changes in `docs/database/`, API changes in `docs/api/`, and workflow diagrams in `docs/diagrams/`.
- Use Context7 MCP for current package/framework documentation before changing behavior that depends on recently changing APIs.
- Use Playwright MCP to verify local frontend behavior after meaningful UI, routing, responsive, form, or browser-interaction changes.

## Frontend

- Use React with Vite.
- Use Tailwind CSS for styling.
- Use Shadcn UI as the main UI component system.
- Use Shadcn UI as primitives, then customize layout and styling so the app does not look generic.
- Use `lucide-react` for meaningful icons.
- Add shared frontend helpers only when they are actually used; avoid empty scaffold folders.
- Put landing page sections in `frontend/src/components/landing/`.
- Put custom app-specific reusable UI controls in `frontend/src/components/reui/`.
- Put page-level components in `frontend/src/pages/`.
- Keep animation subtle, smooth, and purposeful.
- Prefer custom GabayGamot product visuals over generic placeholder cards.
- Do not put private API keys in frontend code.
- Protect private routes once authentication is added.
- Before changing UI, audit the affected component, parent layout, global CSS, Tailwind config, breakpoint behavior, and possible overflow paths.
- Use fluid layout primitives: `w-full`, `max-w-screen-*`, `minmax(0,...)`, responsive grids, flex wrapping, and constrained inner shells.
- Avoid unintended horizontal scroll. Root wrappers and page shells should keep `overflow-x-hidden` when appropriate, and fixed/absolute elements must not use careless negative offsets that can bleed outside the viewport.
- Keep mobile touch targets at least `min-h-11 min-w-11` (44px). Interactive controls should use `cursor-pointer`, `transition-all`, and `active:scale-95` unless a component has a better established interaction pattern.
- Keep scrollbars visually hidden while preserving scroll functionality. Use the global scrollbar rules and `.scrollbar-none` utility instead of blocking scrolling.
- Maintain PWA-ready viewport behavior: `viewport-fit=cover`, `pt-safe`, `pb-safe`, `px-safe`, and `env(safe-area-inset-*)` where page edges touch the screen.
- Auth screens should keep the approved centered card reference structure unless the user explicitly asks for a new layout.
- Do not scale text with viewport units. Use responsive Tailwind text sizes or established clamp tokens if added later.
- Media must stay contained with `max-w-full`, `w-full` when needed, and appropriate `object-cover` or `object-contain`.

## Backend

- Validate request bodies before using them.
- Add rate limits to auth, OCR, AI, and other API routes before public deployment.
- Keep API keys and credentials in `.env`.
- Never commit real secrets to GitHub.
- Keep Mapbox secret token server-side. Do not move `MAPBOX_SECRET_TOKEN` into frontend code.
- Keep Cloudinary secrets server-side. Do not move `CLOUDINARY_API_SECRET` into frontend code.
- During development, use the documented Cloudinary folder map under `gabaygamot/dev/`.
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

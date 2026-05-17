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
- Use a four-step Barangay Health Center Admin signup request flow: account, assignment, pin location, and validation.
- Use PSGC Cloud directly only as a development shortcut; production PSGC validation should go through the backend and official PSA PSGC data.
- Keep Mapbox token and geocoding behind the Express backend proxy.
- Use Context7 MCP for up-to-date library documentation and Playwright MCP for local browser/responsive validation.
- Use Cloudinary as the temporary development file storage provider while Firebase Storage requires a Blaze upgrade.
- Organize Cloudinary uploads under `gabaygamot/{environment}/` with documented folders for public assets, admin signup documents, IDs, OCR uploads, medicine images, reports, and temporary files.
- Seed the first Super Admin through a backend-only Firebase Admin script, not through public signup.
- Keep package dependencies limited to implemented code paths. Planned OCR, AI, upload validation, and SDK packages should be installed when their feature work starts.
- Track top common illness cases per barangay from explicit `illnessCases` and `illnessCaseCategories`, then aggregate into `illnessSummaries`; do not infer illness solely from dispensed medicine.
- Build the first Super Admin portal pass with existing Tailwind, lucide icons, and local shadcn-style primitives instead of adding dashboard-only packages before real data integration.

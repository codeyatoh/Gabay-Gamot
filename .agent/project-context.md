# Project Context

## Project Name

GabayGamot

## Short Description

GabayGamot is a web-based medicine inventory, dispensing, monitoring, and referral system for barangay health centers.

## Main Goal

Help barangay health centers reduce medicine waste, prevent shortages, monitor dispensing, and coordinate medicine availability with nearby barangays.

## Main Users

- Super Admin / System Owner
- Barangay Health Center Admin
- Barangay Health Worker

## Current / Planned Tech Stack

- Frontend: React JS with Vite
- Styling: Tailwind CSS
- UI Components: Shadcn UI-style primitives, Radix primitives, and custom `reui` components
- Backend: Node.js with Express.js
- Database: Firebase Firestore planned for app data, with Super Admin data model documented
- Authentication: Firebase Authentication partially wired for Super Admin sign-in and seed credentials
- OCR: Tesseract.js planned, not currently installed until the OCR feature starts
- Maps: Mapbox GL JS with backend Mapbox proxy implemented for token/geocoding
- Address Data: PSGC Cloud currently used in frontend for development; official PSA PSGC API should be proxied through backend for production
- AI: Gemini API planned, not currently installed until the AI feature starts

## Implemented So Far

- Responsive landing page with video hero, navigation, dark mode, sections, team, FAQ, and footer.
- Lightweight client-side route handling for `/`, `/login`, `/signup`, `/forgot-password`, and `/super-admin/*`.
- Auth UI screens for login, forgot password, and admin signup request.
- Four-step admin signup request wizard:
  - account details
  - barangay health center assignment
  - Mapbox pin location
  - proof and identity validation
- PSGC address dropdowns through `usePSGC`.
- Express backend health route and Mapbox proxy routes.
- Firebase Admin backend initialization and Super Admin seed script.
- Frontend-only Super Admin portal shell with sidebar, topbar, overview dashboard, operational tables, page tabs, and mock data.
- Super Admin pages and data model are planned in `docs/screens/super-admin-pages.md` and `docs/database/super-admin-data-model.md`.
- Top common illness cases per barangay are planned as explicit illness/case records and aggregate summaries, not inferred from medicine names alone.

## Agent Tooling

- Use Context7 MCP when current framework, library, or package documentation is needed.
- Use Playwright MCP when validating local frontend behavior, screenshots, navigation, console errors, or responsive layout.

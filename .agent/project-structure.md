# Project Structure

This file explains where code and planning files should go.

Keep task checklists in `tasks.md`, product notes in `project-context.md`, and landing page content in `landing-page-plan.md`.

## Folder Tree

```text
GabayGamot/
|-- .agent/
|   |-- README.md
|   |-- project-context.md
|   |-- project-structure.md
|   |-- landing-page-plan.md
|   |-- coding-guidelines.md
|   |-- mcp-workflow.md
|   |-- tasks.md
|   `-- decisions.md
|-- .cursor/
|   `-- rules/
|-- frontend/
|   `-- src/
|       |-- assets/
|       |   |-- images/
|       |   `-- videos/
|       |-- components/
|       |   |-- common/
|       |   |-- landing/
|       |   |-- layout/
|       |   |-- reui/
|       |   `-- ui/
|       |-- hooks/
|       |-- lib/
|       |-- pages/
|       |   |-- auth/
|       |   `-- landing/
|       `-- styles/
|-- backend/
|   |-- scripts/
|   `-- src/
|       |-- config/
|       |-- controllers/
|       |-- routes/
|       `-- server.js
|-- firebase/
`-- docs/
    |-- api/
    |-- database/
    |-- diagrams/
    |-- planning/
    |-- source-documents/
    |   `-- GabayGamot.pdf
    `-- screens/
```

## Folder Responsibilities

### `.agent/`
Project notes for planning and AI-assisted development.

### `frontend/`
React app for the landing page and future user screens.

### `frontend/src/components/landing/`
Landing page section components.

Examples:

```text
HeroSection.jsx
FeaturesSection.jsx
WorkflowSection.jsx
TechnologySection.jsx
TeamSection.jsx
FaqSection.jsx
```

### `frontend/src/components/common/`
Reusable UI helpers or wrappers.

Since the project uses Shadcn UI, only add custom common components when they make the code easier to reuse.

### `frontend/src/components/layout/`
Shared page layout pieces.

Examples:

```text
Navbar.jsx
Footer.jsx
PageLayout.jsx
```

### `frontend/src/components/reui/`
Custom reusable interaction components that are not shadcn primitives.

Current examples:

```text
SearchableSelect.jsx
stepper.jsx
```

### `frontend/src/pages/`
Page-level components.

Examples:

```text
landing/LandingPage.jsx
auth/LoginPage.jsx
admin/AdminDashboard.jsx
health-worker/HealthWorkerDashboard.jsx
```

### `frontend/src/services/`
Frontend API and Firebase service calls.

### `backend/`
Node.js and Express API.

Current implementation:

```text
scripts/seedSuperAdmin.js
src/config/firebaseAdmin.js
src/server.js
src/routes/mapboxRoutes.js
src/controllers/mapboxController.js
```

### `firebase/`
Firestore rules and sample seed data.

### `docs/`
Project documentation such as diagrams, API notes, database notes, and screen references.

### `docs/source-documents/`
Original project references and uploaded source files.

Examples:

```text
GabayGamot.pdf
research-notes.pdf
requirements.docx
```

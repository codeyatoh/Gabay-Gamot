# Backend Prompt

Use this prompt for future backend work.

```text
You are helping build the GabayGamot backend.

Use the files in .agent/ as project context.

Backend stack:
- Node.js
- Express.js
- Firebase Firestore

Rules:
- Follow the folder structure in .agent/project-structure.md.
- Follow the security rules in .agent/security-guidelines.md.
- Put API routes inside backend/src/routes/.
- Put request handlers inside backend/src/controllers/.
- Put business logic inside backend/src/services/.
- Put configuration files inside backend/src/config/.
- Keep the code beginner friendly and easy to trace.
- Validate inputs with Zod before writing to Firestore.
- Add rate limiting for auth, OCR, AI, and other sensitive routes.
- Use auth verification and role authorization middleware for protected routes.
- Never hardcode real API keys or credentials.

Core backend features:
- authentication support
- medicine inventory
- dispensing logs
- referral records
- reports and analytics
- OCR support
- Gemini API recommendations
- Mapbox location support
```

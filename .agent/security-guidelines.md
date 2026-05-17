# Security Guidelines

Security is a core requirement for GabayGamot because the system handles users, barangay health center operations, medicine inventory, dispensing logs, referrals, and reports.

These rules should guide backend, frontend, Firebase, and API development.

## Main Security Goals

- Protect user accounts.
- Protect medicine inventory and dispensing records.
- Prevent unauthorized access between barangays.
- Prevent API abuse and spam requests.
- Keep API keys and service credentials private.
- Validate all user input before saving to the database.
- Keep logs useful without exposing sensitive data.

## Authentication

- Use Firebase Authentication for login.
- Require authentication for all private app pages.
- Do not trust frontend-only role checks.
- Verify user identity on the backend before allowing protected API actions.
- Store user role and barangay assignment in Firestore.
- Separate permissions for Super Admin/System Owner, Admin, and Barangay Health Worker.
- Public admin signup must create an approval request only. It must not immediately create an active Firebase Auth account.
- A Super Admin/System Owner must verify barangay legitimacy and approve the request before an Admin receives a temporary password.

## Authorization

Use role-based access control.

Admin can:

- manage users
- view all barangay inventory
- view reports and analytics
- monitor referrals and dispensing logs

Super Admin/System Owner can:

- review barangay admin signup requests
- verify proof/authorization documents
- approve or reject barangay admin requests
- create or activate barangay admin accounts
- issue temporary passwords
- monitor system-level account approvals

Barangay Health Worker can:

- manage inventory only for their assigned barangay
- scan medicines for their assigned barangay
- dispense medicines for their assigned barangay
- create referrals
- view allowed recommendations and reports

Rules:

- A user should only access records allowed by their role.
- Barangay Health Workers must not edit other barangays' inventory.
- Backend and Firestore rules should both enforce access control.

## Rate Limiting

Add backend rate limiting before public deployment.

Recommended limits:

- login/auth-sensitive routes: strict limit
- OCR upload routes: strict limit because image processing is expensive
- Gemini AI recommendation routes: strict limit because API usage can cost money
- general API routes: moderate limit

Suggested package:

```text
express-rate-limit
```

Example route groups:

```text
/api/auth/*
/api/ocr/*
/api/ai/*
/api/referrals/*
```

## Input Validation

Validate all request bodies using a schema validator.

Suggested package:

```text
zod
```

Validate:

- medicine name
- category
- expiry date
- quantity
- barangay ID
- patient name
- dispensing quantity
- referral request fields
- uploaded image type and size

Never directly trust values sent from the frontend.

## File Upload Security

For OCR image uploads:

- allow only image file types
- limit file size
- reject unknown file extensions
- generate safe filenames
- do not use user-provided filenames directly
- remove temporary files after processing when possible

Suggested package:

```text
multer
```

## API Key And Secret Management

Never commit secrets to GitHub.

Keep these in `.env` files:

- Firebase service account values
- Gemini API key
- Mapbox API key
- backend secret values

Rules:

- `.env` must stay ignored by Git.
- Use `.env.example` for placeholder variable names only.
- Never paste real API keys in documentation, screenshots, or commits.

## Firestore Security Rules

Firestore rules must enforce:

- authenticated access only
- role-based access
- barangay-based access
- read/write restrictions per collection

Important collections:

- users
- barangays
- medicines
- referrals
- notifications
- redistributionRecords
- dispensingLogs

## Error Handling

- Do not expose stack traces to users.
- Return clear but safe error messages.
- Log technical errors only on the server.
- Avoid logging tokens, passwords, API keys, or full patient-sensitive details.

## Frontend Security

- Protect private routes.
- Hide UI actions the user is not allowed to perform.
- Still enforce permissions on backend and Firestore rules.
- Never store secret API keys in frontend code unless the key is designed to be public.
- Validate forms before submit, but still validate again on backend.

## Backend Middleware Checklist

Before production, backend should include:

- CORS configuration
- rate limiting
- request body size limits
- input validation
- auth verification middleware
- role authorization middleware
- safe upload middleware
- centralized error handler

## Production Checklist

- [ ] Add `express-rate-limit`
- [ ] Add auth verification middleware
- [ ] Add role authorization middleware
- [ ] Add Zod schemas for API requests
- [ ] Add safe upload limits for OCR images
- [ ] Add `.env.example`
- [ ] Write Firestore security rules
- [ ] Review CORS allowed origins
- [ ] Make sure `.env` is ignored
- [ ] Avoid committing real credentials

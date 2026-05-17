# Firebase Bootstrap

## Current Status

Firebase Admin SDK is now connected on the backend for server-side Firebase work.

Implemented files:

- `backend/src/config/firebaseAdmin.js`
- `backend/scripts/seedSuperAdmin.js`
- `backend/.env.example`

The frontend auth forms are still UI-only. This bootstrap only prepares the backend and creates the first Super Admin account through Firebase Admin.

## Required Firebase Setup

Create or open the Firebase project for GabayGamot, then create a service account key for the backend.

Add the service account values to `backend/.env`:

```text
FIREBASE_PROJECT_ID=
FIREBASE_CLIENT_EMAIL=
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"
```

Do not commit `backend/.env` or service account JSON files.

The backend normalizes common private-key copy/paste artifacts by trimming a trailing comma, trimming wrapping quotes, and converting escaped `\n` values into real newlines before Firebase Admin initializes.

## Super Admin Seed Environment

Add these values to `backend/.env`:

```text
SUPER_ADMIN_EMAIL=superadmin@gabaygamot.local
SUPER_ADMIN_PASSWORD=
SUPER_ADMIN_DISPLAY_NAME=GabayGamot Super Admin
SUPER_ADMIN_FIRST_NAME=Super
SUPER_ADMIN_LAST_NAME=Admin
SUPER_ADMIN_RESET_PASSWORD=false
```

Password rule:

- `SUPER_ADMIN_PASSWORD` must be at least 8 characters.

Existing user behavior:

- If the email does not exist in Firebase Auth, the seed script creates it.
- If the email already exists, the seed script updates display name, verifies email, enables the account, and keeps the existing password by default.
- Set `SUPER_ADMIN_RESET_PASSWORD=true` only when intentionally rotating the seeded account password.

## Run Seed

From the backend folder:

```text
npm run seed:super-admin
```

The script prints:

- Firebase Auth UID
- email
- whether the Auth user was created
- whether the password was reset
- assigned role

It never prints the password.

## Firebase Auth Changes

The seed script creates or updates a Firebase Auth user and sets custom claims:

```js
{
  role: "super_admin",
  superAdmin: true
}
```

Users must sign in again or refresh their ID token before custom claims appear in client tokens.

## Firestore Changes

The seed script writes `users/{uid}`:

```js
{
  uid: "firebaseUid",
  email: "superadmin@example.com",
  displayName: "GabayGamot Super Admin",
  firstName: "Super",
  lastName: "Admin",
  role: "super_admin",
  status: "active",
  barangayCode: null,
  barangayId: null,
  facilityId: null,
  mustChangePassword: true,
  createdBy: "seed:super-admin",
  createdFromRequestId: null,
  isSeedAccount: true,
  createdAt: timestamp,
  updatedAt: timestamp
}
```

It also writes `systemSettings/bootstrap`:

```js
{
  superAdminUid: "firebaseUid",
  superAdminEmail: "superadmin@example.com",
  seededAt: timestamp,
  seededBy: "seed:super-admin"
}
```

## Security Notes

- Keep all Firebase Admin SDK usage in the backend.
- Never expose service account fields in frontend code.
- Use custom claims for fast role checks, but also store role/profile data in Firestore.
- Firestore security rules still need to be implemented before production.
- Backend route middleware still needs Firebase ID token verification before protected API routes are added.

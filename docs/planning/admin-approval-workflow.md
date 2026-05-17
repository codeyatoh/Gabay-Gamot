# Admin Signup Approval Workflow

## Goal

GabayGamot should not allow anyone to self-claim a barangay health center and immediately become an Admin. The signup page should collect an application request first. A Super Admin/System Owner verifies the request, then approves or rejects it.

## Actors

- Super Admin / System Owner
- Barangay Health Center Admin
- Barangay Health Worker

## Bootstrap Requirement

Before approval workflows can be used, seed the first Super Admin account from the backend with:

```text
npm run seed:super-admin
```

See `docs/database/firebase-bootstrap.md` for required Firebase Admin SDK and Super Admin environment variables.

See `docs/screens/super-admin-pages.md` and `docs/database/super-admin-data-model.md` for the broader Super Admin screen and data requirements.

## Core Rule

Barangay Health Center Admin signup does not create an active account immediately.

Instead:

1. Applicant submits an Admin Signup Request.
2. System validates the health center's barangay address selection using PSGC data.
3. Applicant pins the health center location using Mapbox geocoding, draggable marker coordinates, or GPS.
4. Applicant uploads proof/authorization documents.
5. Request status becomes `pending_review`.
6. Super Admin reviews the request.
7. Super Admin approves or rejects.
8. If approved, the system creates or activates the Admin account and issues a temporary password.
9. Admin logs in and must change the temporary password.
10. Admin can then create Barangay Health Worker accounts for the assigned barangay health center.

## Why This Is Needed

A public signup page with only a barangay dropdown is not enough. A random user could choose a barangay or health center they do not represent. PSGC confirms that the barangay exists, but it does not prove that the applicant is authorized to administer that barangay health center in GabayGamot.

The system therefore needs both:

- official address normalization using PSGC
- human approval by the Super Admin/System Owner

## Recommended Admin Signup Fields

### Applicant Information

- First name
- Last name
- Email address
- Mobile number
- Position / designation

### Barangay Health Center Information

- Region
- Province
- City or municipality
- Barangay
- PSGC barangay code
- Barangay health center name
- Barangay health center address line
- Latitude
- Longitude

The address dropdowns should be API-backed, not free text only. Free text may still be used for the facility address line.

Current frontend implementation note:

- The app currently uses PSGC Cloud directly in `frontend/src/hooks/usePSGC.js` for rapid prototyping.
- Production should proxy official PSA PSGC requests through the backend because PSA API access requires a token.
- Mapbox token and geocoding requests are already routed through the backend Mapbox proxy.

### Proof / Verification

- Authorization document upload
- Government ID or employee ID upload
- Optional proof notes / remarks

Recommended acceptable proof examples:

- signed authorization letter for the barangay health center from the barangay, health center, or local health office
- barangay health center certification
- official employee ID
- appointment/designation document connected to the health center

For Zamboanga City deployments, the clearest primary proof is an authorization letter for the Barangay Health Center signed by the Punong Barangay or an authorized local health office representative. Strong secondary proof includes City Health Office or Barangay Health Center endorsement, government/employee/barangay health worker ID, or appointment/designation/employment certification connected to that health center.

### Account Setup

- Requested role: fixed as `health_center_admin`
- Preferred display name
- Agreement checkbox confirming the applicant is authorized to request access

Do not ask for password during initial signup. The password should be issued only after Super Admin approval.

## Super Admin Review Fields

When reviewing a request, Super Admin should see:

- applicant details
- selected PSGC address hierarchy
- uploaded proof documents
- duplicate warnings for the same barangay health center
- existing admin account for the barangay health center, if any
- approve / reject action
- reviewer remarks

## Approval Statuses

- `draft`
- `pending_review`
- `needs_more_info`
- `approved`
- `rejected`
- `account_created`

## Approval Behavior

If approved:

- create Firebase Auth user or activate pre-created disabled user
- create Firestore `users/{uid}` record
- create or link `barangays/{barangayId}` record
- store role as `health_center_admin`
- store barangay assignment using PSGC code
- send temporary password or password setup link
- require password change on first login

If rejected:

- do not create active Firebase Auth user
- store reviewer notes
- optionally notify applicant by email

## Duplicate Barangay Rule

The system should prevent multiple active Admin accounts for the same barangay health center unless Super Admin explicitly allows a secondary admin later.

Recommended initial rule:

- one primary Barangay Health Center Admin per barangay health center
- additional admins require Super Admin approval and a separate reason

## Address API Strategy

Use the Philippine Standard Geographic Code (PSGC) as the source for regions, provinces, cities/municipalities, and barangays.

Recommended primary source:

- PSA PSGC Classification API

Reason:

- it is the official geographic classification source
- it supports regions, provinces, municipalities/cities, and barangays
- it supports PSGC versions and filters by region, province, municipality, and barangay codes

Implementation note:

- PSA API requires a token, so calls should go through the backend, not directly from the frontend.
- Cache PSGC results in Firestore or backend memory to reduce API calls.

Optional development fallback:

- PSGC Cloud can be used for rapid prototyping because it has no signup requirement, but it is community-provided and should not be treated as the final authority for critical validation.

## Sources

- Philippine Statistics Authority PSGC API Documentation: https://psa.gov.ph/classifications-api/psgc
- Philippine Statistics Authority PSGC Updates and masterlist: https://psa.gov.ph/classification/psgc
- PSGC Cloud developer API: https://psgc.cloud/

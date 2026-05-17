# Admin Signup Approval Workflow

## Goal

GabayGamot should not allow anyone to self-claim a barangay and immediately become an Admin. The signup page should collect an application request first. A Super Admin/System Owner verifies the request, then approves or rejects it.

## Actors

- Super Admin / System Owner
- Barangay Admin
- Barangay Health Worker

## Core Rule

Admin signup does not create an active account immediately.

Instead:

1. Applicant submits an Admin Signup Request.
2. System validates address selection using PSGC data.
3. Applicant uploads proof/authorization documents.
4. Request status becomes `pending_review`.
5. Super Admin reviews the request.
6. Super Admin approves or rejects.
7. If approved, the system creates or activates the Admin account and issues a temporary password.
8. Admin logs in and must change the temporary password.
9. Admin can then create Barangay Health Worker accounts for the assigned barangay.

## Why This Is Needed

A public signup page with only a barangay dropdown is not enough. A random user could choose a barangay they do not represent. PSGC confirms that the barangay exists, but it does not prove that the applicant is authorized to administer that barangay in GabayGamot.

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

### Barangay / Health Center Information

- Region
- Province
- City or municipality
- Barangay
- PSGC barangay code
- Health center / facility name
- Health center address line

The address dropdowns should be API-backed, not free text only. Free text may still be used for the facility address line.

### Proof / Verification

- Authorization document upload
- Government ID or employee ID upload
- Optional proof notes / remarks

Recommended acceptable proof examples:

- signed authorization letter from the barangay, health center, or local health office
- barangay or health center certification
- official employee ID
- appointment/designation document

For Zamboanga City deployments, the clearest primary proof is an authorization letter from the Punong Barangay. Strong secondary proof includes City Health Office or health center endorsement, government/employee/barangay health worker ID, or appointment/designation/employment certification.

### Account Setup

- Requested role: fixed as `barangay_admin`
- Preferred display name
- Agreement checkbox confirming the applicant is authorized to request access

Do not ask for password during initial signup. The password should be issued only after Super Admin approval.

## Super Admin Review Fields

When reviewing a request, Super Admin should see:

- applicant details
- selected PSGC address hierarchy
- uploaded proof documents
- duplicate warnings for the same barangay
- existing admin account for the barangay, if any
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
- store role as `barangay_admin`
- store barangay assignment using PSGC code
- send temporary password or password setup link
- require password change on first login

If rejected:

- do not create active Firebase Auth user
- store reviewer notes
- optionally notify applicant by email

## Duplicate Barangay Rule

The system should prevent multiple active Admin accounts for the same barangay unless Super Admin explicitly allows a secondary admin later.

Recommended initial rule:

- one primary Barangay Admin per barangay
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

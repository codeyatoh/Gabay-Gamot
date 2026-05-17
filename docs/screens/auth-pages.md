# Auth Pages

## Current Scope

The first auth screens are still mostly UI-only. Firebase Authentication, Firestore writes, server-side validation, file upload persistence, and real password reset behavior will be added later.

The signup page includes implemented frontend behavior for PSGC-backed address selection, Mapbox geocoding, map pinning, GPS lookup, map style switching, and local file type/size checks.

The visual structure follows the provided reference: a single centered auth card, logo at the top, title and helper text, stacked form fields, action button, optional social buttons, and a footer link. Only GabayGamot-specific text, routes, and fields are changed.

Responsive behavior keeps that same structure while adding safe-area vertical padding, mobile-friendly form spacing, and stacked two-column fields on narrow screens.

## Routes

- `/login`
- `/signup`
- `/forgot-password`

These routes use lightweight client-side navigation through `history.pushState`, so internal links do not reload the full Vite app while moving between auth pages and the landing page.

## Login Page

The login page is for existing Barangay Health Center Admin and Barangay Health Worker accounts.

Visible fields and actions:

- Email
- Password
- Forgot password link
- Sign In button
- Google sign-in button as a UI-only placeholder
- Link to Create Admin Account

## Sign Up Page: Admin Setup Request Wizard

The sign up page is a structured 4-step wizard using the custom headless `Stepper` component (`frontend/src/components/reui/stepper.jsx`). It is designed for submitting a Barangay Health Center Admin approval request during health center setup.

It does not request a password or create an active account immediately.

## Step 1: Account

Personal details:

- First Name
- Last Name
- Email Address
- Mobile Number

Mobile number behavior:

- Displays a fixed `+63` prefix.
- Limits input to 10 digits.
- Requires the first entered digit to be `9`.

The Google sign-up button is displayed on this step only. It is currently a UI-only placeholder for future Firebase/Google auth integration.

## Step 2: Assignment

Health center details:

- Barangay Health Center Name
- Position / Designation
- Region
- Province
- City / Municipality
- Barangay
- Facility Address Line

Implemented address behavior:

- Uses `frontend/src/hooks/usePSGC.js`.
- Uses the custom `SearchableSelect` component.
- Uses `https://psgc.cloud/api` as the current development data source.
- Handles province-less regions such as NCR by fetching cities directly under the selected region.
- Caches NCR barangays in memory after the first fetch to avoid slow repeated requests.
- Stores selected address names in hidden inputs for future form submission.

## Step 3: Pin Location

Implemented map behavior:

- Fetches a Mapbox token from the backend proxy through `GET /api/mapbox/token`.
- Geocodes selected address parts through `GET /api/mapbox/geocode?q=...`.
- Displays a Mapbox map with a draggable marker.
- Stores latitude and longitude in hidden inputs.
- Includes a `Use GPS` button through browser geolocation.
- Includes a streets/satellite style switcher using custom Mapbox Studio styles.
- Re-adds the draggable marker after style changes.

## Step 4: Validation

Proof and identity fields:

- Authorization Document
- Government / Employee ID
- Authorization agreement checkbox

Validation behavior:

- Authorization document accepts `.pdf`, `.doc`, and `.docx` up to 5MB.
- Government / Employee ID accepts `.jpg`, `.jpeg`, and `.png` up to 2MB.
- Image ID uploads display a local preview.
- File errors are displayed inline.
- Form submission is prevented with `e.preventDefault()` to avoid browser reloads during UI work.

Valid proof examples shown in the UI:

- Authorization letter for the Barangay Health Center
- City Health Office or Barangay Health Center endorsement
- Government, employee, or barangay health worker ID
- Appointment, designation, or employment certification connected to the health center

## Forgot Password Page

Visible fields and actions:

- Email address
- Send Reset Link button
- Link back to Login

## Future Firebase Behavior

- Login will use Firebase Authentication.
- Google auth buttons will connect to Firebase/Google sign-in.
- Forgot password will use Firebase password reset email.
- Admin signup must create an approval request before an admin account becomes active.
- Uploaded proof files must be stored securely in Firebase Storage or an approved backend upload service.
- Super Admin/System Owner reviews proof documents before approval.
- Approved Admin accounts receive a temporary password or setup link and must change password on first login.
- Barangay Health Worker accounts should be created by an authorized Barangay Health Center Admin.

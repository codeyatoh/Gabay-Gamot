# Auth Pages

## Current Scope

The first auth screens are UI-only. Firebase Authentication, Firestore writes, validation, and real password reset behavior will be added later.

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

## Sign Up Page

The sign up page is for submitting a Barangay Health Center Admin approval request during health center setup. It must not create an active account immediately.

Visible fields and actions:

- First name
- Last name
- Email
- Mobile number
- Position / designation
- Region
- Province
- City or municipality
- Barangay
- Barangay health center name
- Barangay health center address line
- Authorization document upload
- Government ID or employee ID upload
- Valid proof note listing accepted documents
- Agreement checkbox
- Submit for Review button
- Google sign-up button as a UI-only placeholder
- Link back to Login

Address fields should use PSGC-backed API dropdowns to place the health center under the correct barangay. Password should not be requested at this stage; the Super Admin/System Owner issues a temporary password only after approval.

The sign up page should show these valid proof examples:

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
- Forgot password will use Firebase password reset email.
- Admin sign up must verify barangay health center setup before creating an admin account.
- Super Admin/System Owner reviews proof documents before approval.
- Approved Admin accounts receive a temporary password or setup link and must change password on first login.
- Barangay Health Worker accounts should be created by an authorized Barangay Health Center Admin.

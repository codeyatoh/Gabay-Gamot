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

The login page is for existing Admin and Barangay Health Worker accounts.

Visible fields and actions:

- Email
- Password
- Forgot password link
- Sign In button
- Google sign-in button as a UI-only placeholder
- Link to Create Admin Account

## Sign Up Page

The sign up page is for creating a verified Barangay Admin account during barangay setup. It is not intended for public self-claiming of barangay access.

Visible fields and actions:

- Full name
- Email
- Barangay
- Setup Code
- Password
- Create Account button
- Google sign-up button as a UI-only placeholder
- Link back to Login

The setup code is a temporary UI placeholder until Firebase and backend validation are added. Its purpose is to reflect the product rule that users should not be able to self-claim a barangay without verification.

## Forgot Password Page

Visible fields and actions:

- Email address
- Send Reset Link button
- Link back to Login

## Future Firebase Behavior

- Login will use Firebase Authentication.
- Forgot password will use Firebase password reset email.
- Admin sign up must verify barangay setup before creating an admin account.
- Barangay Health Worker accounts should be created by an authorized Barangay Admin.

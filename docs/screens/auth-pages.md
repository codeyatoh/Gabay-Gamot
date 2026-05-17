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

## Sign Up Page (Admin Setup Request Wizard)

The sign up page is a highly structured, 3-step wizard using the custom headless `Stepper` component (`@/components/reui/stepper.jsx`). It is designed for submitting a Barangay Health Center Admin approval request during health center setup. It does not request a password or create an active account immediately (following the Super Admin approval workflow).

### 3-Step Wizard Structure

#### Step 1: Account (Personal Details)
- **First Name** (placeholder: `e.g. Juan`)
- **Last Name** (placeholder: `e.g. Dela Cruz`)
- **Email Address** (placeholder: `e.g. juan@gmail.com`)
- **Mobile Number:**
  - Prefixed with an absolute, non-editable `+63` country code indicator.
  - Custom JavaScript validation rules limit entry strictly to **10 digits**.
  - Enforces that the mobile number MUST start with the digit `9` (automatically clears input if a different starting digit is typed, e.g., accidental `0`).
- **Google Sign-Up Button:**
  - Displayed **only on Step 1** (to facilitate auto-filling First Name, Last Name, and Email address from Google authentication scopes, while omitting it from later steps).

#### Step 2: Assignment (Health Center Info)
To improve readability and prevent jagged forms, fields are organized into two clean visual sections separated by divider lines:
- **Center Details:**
  - **Barangay Health Center Name** (full-width input, placeholder: `e.g. San Jose Health Center`)
  - **Position / Designation** (full-width input, placeholder: `e.g. Barangay Health Worker`)
- **Center Location:**
  - A unified 4-field grid: **Region** (placeholder: `e.g. Region IV-A`), **Province** (placeholder: `e.g. Cavite`), **City / Municipality** (placeholder: `e.g. Dasmariñas`), and **Barangay** (placeholder: `e.g. San Jose`).
  - **Facility Address Line** (full-width input, placeholder: `Street, sitio, or purok`).

#### Step 3: Validation (Proof & Identity)
- **Valid Proof Guidelines:**
  - Displays a clean green notification box listing accepted documents (e.g., signed authorization letter, health center endorsement, employee ID, appointment designation certificate).
- **Document Uploads:**
  - **Authorization Document:**
    - Accepts ONLY `.pdf, .doc, .docx` files.
    - Strictly limits size to **5MB**.
    - Omit custom photo previews to avoid layout clutter (utilizes standard native file input name displays).
  - **Government / Employee ID:**
    - Accepts ONLY image formats (`.jpg, .jpeg, .png`).
    - Strictly limits size to **2MB**.
    - Displays a **live local photo preview** underneath upon selection, featuring a red close button (`✕`) to clear or reset the file.
- **Agreement Checkbox:**
  - A responsive checkbox list item confirming authorization.
- **Submit for Review button:**
  - Form submission has active event prevention (`e.preventDefault()`) to avoid browser reload loops during React navigation.

---

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

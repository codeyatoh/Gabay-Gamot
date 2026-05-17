# Super Admin Pages

## Current Codebase Status

The app now has a frontend-only Super Admin portal shell with mock operational data. It is not yet connected to Firestore or protected by a route guard.

Implemented routes today:

- `/`
- `/login`
- `/signup`
- `/forgot-password`
- `/super-admin`
- `/super-admin/approvals`
- `/super-admin/approvals/review`
- `/super-admin/health-centers`
- `/super-admin/users`
- `/super-admin/inventory`
- `/super-admin/medicine-catalog`
- `/super-admin/dispensing`
- `/super-admin/illness-cases`
- `/super-admin/referrals`
- `/super-admin/reports`
- `/super-admin/alerts`
- `/super-admin/audit-logs`
- `/super-admin/settings`

Implemented Super Admin foundation:

- Firebase Auth login can read the `super_admin` custom claim.
- Backend seed script creates the first Super Admin.
- Frontend `/super-admin/*` route handling is implemented through the lightweight client router.
- Super Admin sidebar, topbar, metric cards, bento overview panels, tab bars, tables, and detail panels are implemented with existing Tailwind/shadcn-style primitives.
- Super Admin frontend pages use mock data from `frontend/src/data/superAdminMockData.js`.
- Admin signup request UI exists, but it does not yet write requests to Firestore.
- Admin approval workflow and data model are documented.

This document defines what the Super Admin area contains now and what must be connected next.

## Research Basis

The Super Admin area should be designed around:

- Role-gated access through Firebase custom claims and Firestore rules. Firebase documents custom claims as a way to implement role-based access and notes they should be set only from a privileged server environment: https://firebase.google.com/docs/auth/admin/custom-claims
- Firestore role-based access patterns and the fact that server client libraries bypass Firestore Security Rules, so backend authorization must be explicit: https://firebase.google.com/docs/firestore/solutions/role-based-access
- Health product inventory monitoring should track stock-on-hand, consumption, expiry dates, stockout risk, and reporting completeness. UNDP health product inventory guidance emphasizes monitoring stock status, consumption rates, stock-on-hand, pipeline/order data, and expiry dates: https://healthimplementation.undp.org/functional-areas/health-product-management/inventory-management/
- Illness and morbidity analytics should use controlled case categories, not medicine names alone. WHO ICD guidance supports systematic recording, analysis, interpretation, and comparison of morbidity data, including primary-care morbidity reporting: https://www.who.int/standards/classifications/classification-of-diseases
- Local reporting should align with DOH/FHSIS-style morbidity reporting where practical. A DOH FOI response notes that FHSIS contains morbidity data and prior annual reports: https://www.foi.gov.ph/agencies/doh/field-health-services-information-system/
- Health and patient-related information must be minimized and protected. The Philippine Data Privacy Act regulates sensitive personal information processing and requires reasonable security safeguards: https://privacy.gov.ph/data-privacy-act/
- Audit logs must record administrative actions, privilege changes, file uploads, exports, and sensitive state changes without exposing secrets or excessive sensitive data. OWASP logging guidance explicitly includes user administration, privilege changes, admin actions, exports, file uploads, and sensitive data access as higher-risk events to log: https://cheatsheetseries.owasp.org/cheatsheets/Logging_Cheat_Sheet.html

## Navigation Groups

Recommended Super Admin navigation:

- Overview
- Approvals
- Health Centers
- Users & Roles
- Inventory Oversight
- Medicine Catalog
- Referrals
- Dispensing & Usage
- Illness Cases
- Reports & Analytics
- Alerts
- Audit Logs
- Settings

For MVP, build only:

1. Super Admin layout and role guard
2. Overview dashboard
3. Admin approval queue
4. Approval detail page
5. Health center registry
6. Users & roles

Inventory, illness cases, reports, referrals, and analytics should follow after core role and approval flows are stable.

## Page Specs

### 1. Super Admin Overview

Purpose:

- Give the system owner one operational view of account approvals, barangay health center status, inventory risks, referrals, and system health.

Primary data:

- Pending admin signup requests
- Approved/rejected/needs-more-info request counts
- Active health centers
- Active users by role
- Barangays without assigned admin
- Low-stock medicine count
- Expiring-soon batch count
- Current stockout-risk count
- Recent referrals
- Recent high-risk audit events
- Backend/Firebase/Cloudinary/Mapbox configuration status

Main widgets:

- Approval workload card
- Health center coverage card
- Inventory risk card
- Referral activity card
- Recent admin actions feed
- Data quality warnings

What-if cases:

- If Firestore is empty except seeded Super Admin, show onboarding cards instead of empty charts.
- If no health centers exist yet, prioritize the approval queue.
- If counts fail to load, show partial dashboard data and a clear retry state.
- If the logged-in user lacks `super_admin`, redirect to login or unauthorized page.

### 2. Admin Signup Requests

Purpose:

- Review public admin signup requests before creating active Barangay Health Center Admin accounts.

Primary data:

- Request ID
- Status: `pending_review`, `needs_more_info`, `approved`, `rejected`, `account_created`
- Applicant name, email, mobile number, position
- Selected PSGC address hierarchy
- Barangay health center name and address line
- Latitude and longitude
- Proof document metadata
- Duplicate warnings
- Assigned reviewer
- Review timestamps

Filters:

- Status
- Date submitted
- Region/province/city/barangay
- Duplicate warning
- Missing proof
- High-risk request

Actions:

- View details
- Approve
- Reject
- Mark as needs more info
- Add reviewer remarks
- Open proof documents
- Compare against existing health centers

What-if cases:

- Same applicant email submits multiple requests.
- Same barangay health center is requested by different users.
- Same barangay has multiple legitimate health centers.
- Proof document is unreadable, expired, or unrelated.
- Uploaded ID name does not match applicant name.
- Map pin is far from the selected barangay.
- Request was already processed in another tab.
- Applicant should be a health worker, not a health center admin.
- Super Admin wants to approve but Firebase Auth user already exists.

### 3. Approval Detail

Purpose:

- Provide enough context for a safe approve/reject decision.

Sections:

- Applicant profile
- Health center information
- Address and map pin
- Proof documents
- Duplicate detection panel
- Existing users/health centers in same barangay
- Review timeline
- Decision form

Decision data:

- Decision status
- Reviewer UID
- Reviewer display name
- Review notes
- Needs-more-info checklist
- Rejection reason
- Approved health center ID
- Created user UID

What-if cases:

- Super Admin approves but account creation fails.
- Firestore write succeeds but Firebase Auth creation fails.
- Firebase Auth user exists but Firestore profile is missing.
- Proof file was deleted from Cloudinary.
- Request needs manual correction before approval.
- Super Admin accidentally approves the wrong request.

Required behavior:

- Approval must be transactional where possible.
- Approval action must be idempotent.
- Every decision must create an audit log.
- Rejected and approved requests must remain readable for audit history.

### 4. Health Center Registry

Purpose:

- Manage recognized barangay health centers and their assignments.

Primary data:

- Health center ID
- Facility name
- PSGC region/province/city/barangay codes and names
- Address line
- Latitude/longitude
- Primary admin UID
- Secondary admin UIDs
- Worker count
- Inventory status summary
- Referral availability status
- Active/inactive/suspended status
- Created from request ID

Actions:

- View center profile
- Assign/transfer primary admin
- Add secondary admin
- Suspend center
- Merge duplicate center records
- Correct location/address metadata

What-if cases:

- A barangay has more than one real health center.
- A health center changes name.
- A health center closes or merges with another.
- Primary admin resigns or becomes inactive.
- Center was accidentally duplicated from two approval requests.
- Address exists in PSGC but exact facility is not in a public registry.

### 5. Users & Roles

Purpose:

- Manage Super Admin, Barangay Health Center Admin, and Barangay Health Worker accounts.

Primary data:

- UID
- Email
- Display name
- Role
- Custom claims status
- Firestore role/profile status
- Assigned health center
- Assigned barangay
- Account status: active, disabled, suspended, pending_setup
- Last login
- Created by
- Created from request ID

Actions:

- Create user manually
- Disable/enable user
- Reset password or send setup link
- Change role
- Transfer user to another health center
- Sync custom claims from Firestore role
- View audit history

What-if cases:

- Last Super Admin tries to disable themselves.
- Firestore says `super_admin` but custom claim is missing.
- Custom claim says `super_admin` but Firestore profile is missing.
- Admin is transferred to another barangay.
- Worker needs access to multiple centers temporarily.
- User email must be changed.
- Disabled user still has cached ID token.

Rules:

- Do not allow deletion as the default action; prefer disable/suspend.
- Do not allow public signup to create `super_admin`.
- Role changes must be backend-only and audited.

### 6. Inventory Oversight

Purpose:

- Let Super Admin monitor inventory health across barangays without taking over daily encoding.

Primary data:

- Health center
- Medicine
- Category
- Dosage/form/unit
- Batch number
- Stock on hand
- Available usable stock
- Expired stock
- Expiring-soon stock
- Average monthly consumption
- Months of stock
- Minimum stock level
- Maximum stock level
- Last stock movement
- Last updated by

Views:

- Stockout risk
- Low stock
- Expiring soon
- Expired stock
- Overstock
- No recent update
- By barangay/health center
- By medicine/category

What-if cases:

- Stock is positive but all batches are expired.
- Quantity becomes negative after dispensing.
- Same medicine has multiple spellings.
- Same batch is entered twice.
- Barangay has not updated inventory for weeks.
- Medicine is restricted and needs extra controls.
- OCR extracts a wrong expiry date.

### 7. Medicine Catalog

Purpose:

- Maintain normalized medicine names and categories so inventory and analytics are clean.

Primary data:

- Generic name
- Brand name
- Strength/dosage
- Form
- Unit
- Category
- Default minimum stock level
- Default expiry-warning window
- Active/inactive status
- Controlled/restricted flag

Actions:

- Add catalog item
- Merge duplicate catalog items
- Deactivate item
- Set default thresholds

What-if cases:

- Same medicine has different strength or form.
- Brand and generic names are mixed.
- A medicine is discontinued.
- A barangay uses a local shorthand name.

### 8. Referrals Monitor

Purpose:

- Monitor referral generation and fulfillment between barangays.

Primary data:

- Referral ID
- Source health center
- Destination health center
- Requested medicine
- Requested quantity
- Available quantity at destination when referral was created
- Status: draft, sent, accepted, declined, fulfilled, cancelled, expired
- Created by
- Patient reference or anonymized patient token
- Timestamps

What-if cases:

- Destination stock changes after referral is generated.
- Destination declines because stock is reserved.
- Referral includes patient data that Super Admin should not see by default.
- Referral expires without action.
- Multiple barangays can fulfill the request.

### 9. Dispensing & Usage

Purpose:

- View medicine usage trends and accountability signals across health centers.

Primary data:

- Dispensing log ID
- Health center
- Medicine/batch
- Quantity dispensed
- Dispensed by
- Patient reference
- Date/time
- Stock deduction status
- Correction/reversal metadata

Privacy rule:

- Super Admin should see operational aggregates by default. Patient-identifying fields should be hidden or minimized unless there is a clear authorized reason.

What-if cases:

- Dispensing entry must be corrected.
- Dispensed quantity exceeds available stock.
- Patient name was entered inconsistently.
- Worker entered the wrong medicine.
- Duplicate dispensing logs were submitted.

### 10. Illness Cases by Barangay

Purpose:

- Show the top common illness or case categories per barangay and health center for a selected date range.
- Support planning for medicine demand, barangay health education, and early operational warnings.

Important rule:

- Do not infer illness from medicine alone. Paracetamol, antibiotics, vitamins, and other products can be used for different conditions. The system needs an explicit case category or diagnosis/status field captured from the consultation or dispensing workflow.

Primary data:

- Case ID
- Health center
- Barangay code and name
- Case category, such as cough/colds, fever, diarrhea, hypertension, wound care, prenatal concern, or other locally approved categories
- Optional ICD-10/ICD-11 or local morbidity code when the team is ready for standardized coding
- Diagnosis status: `suspected`, `confirmed`, `self_reported`, or `not_applicable`
- Patient reference or anonymized token when needed for duplicate counting
- Age group and sex when safely collectable
- Date/time of encounter
- Linked dispensing log, if medicine was dispensed
- Linked referral, if the case was referred
- Recorded by
- Correction or void metadata

Views:

- Top case categories by barangay
- Top case categories by health center
- Trend by day, week, or month
- Age group and sex breakdown
- Medicine demand linked to illness categories
- Cases with no available medicine dispensed
- Case spike watchlist
- `Other` category cleanup queue

Example questions answered:

- What are the top 10 common cases in each barangay this month?
- Which barangays have increasing fever, diarrhea, cough/colds, or hypertension-related visits?
- Which illness categories are driving demand for specific medicines?
- Which barangays have cases recorded but no matching medicine available?

What-if cases:

- A worker selects the wrong case category.
- One visit has multiple symptoms or multiple case categories.
- The case is suspected, not clinically confirmed.
- A patient returns multiple times for the same concern.
- A medicine is dispensed without a recorded case category.
- A case is recorded but no medicine is dispensed.
- `Other` becomes too common because workers cannot find the right category.
- Sensitive or low-count categories could identify a patient in a small barangay.
- A sudden spike is caused by late encoding, not a real outbreak.
- Different barangays use different names for the same illness.

Privacy and reporting rules:

- Super Admin should see aggregated counts by default, not patient names.
- Suppress or group very small counts in exports and charts when re-identification risk is high.
- Patient-identifying fields should require a stricter authorized workflow.
- Report exports must create audit logs.

MVP implementation:

1. Add a required `caseCategoryId` dropdown to the consultation or dispensing form.
2. Seed a small editable `illnessCaseCategories` list using local terms first.
3. Save each encounter into `illnessCases`.
4. Link `illnessCases` to `dispensingLogs` when medicine is dispensed.
5. Generate `illnessSummaries` grouped by barangay, health center, date bucket, and case category.
6. Show a Super Admin table and chart for top cases per barangay.
7. Add date, barangay, health center, age group, and sex filters.
8. Add an `Other` cleanup workflow before adding advanced ICD coding.

### 11. Reports & Analytics

Purpose:

- Generate downloadable and reviewable reports for operations, procurement planning, accountability, and barangay coordination.

Report types:

- Stock status report
- Expiring/expired medicines report
- Stockout-risk report
- Dispensing summary
- Top illness cases by barangay report
- Referral summary
- User activity report
- Approval decisions report
- Data quality report

Primary data:

- Report ID
- Report type
- Filters used
- Date range
- Generated by
- Generated at
- Export file metadata

What-if cases:

- Large report exceeds browser limits.
- Report includes sensitive data.
- Export is generated but download fails.
- Filters produce misleading empty results.

### 12. Alerts

Purpose:

- Show system-generated warnings and operational notifications.

Alert categories:

- Pending approval
- Missing proof
- Low stock
- Stockout risk
- Expiring soon
- Expired stock
- Referral pending
- Illness case spike
- No recent inventory update
- Suspicious user/account state
- Integration/configuration issue

Primary data:

- Alert ID
- Severity
- Category
- Target entity type and ID
- Health center
- Message
- Status: open, acknowledged, resolved, dismissed
- Created at
- Resolved by

What-if cases:

- Same issue creates repeated alerts.
- Alert resolves automatically after data changes.
- Dismissed alert reappears because the risk returns.

### 13. Audit Logs

Purpose:

- Preserve a trace of sensitive administrative actions.

Events to log:

- Login success/failure where available
- Admin signup approval/rejection
- User creation/disable/role change
- Custom claim changes
- Health center assignment changes
- Proof document view/download
- Report export
- Illness case category creation/merge/correction
- Inventory correction
- Referral override/cancellation
- System setting changes

Primary data:

- Audit log ID
- Actor UID
- Actor role
- Action
- Target type
- Target ID
- Before/after summary
- Request context
- Timestamp
- Outcome: success/failure

Rules:

- Do not store passwords, ID tokens, refresh tokens, Firebase private keys, or raw sensitive documents in audit logs.
- Audit logs should be append-only.
- Deleting audit logs should not be available in the normal Super Admin UI.

### 14. Settings

Purpose:

- Control system-level thresholds and integration status.

Sections:

- Role/claim sync status
- Approval policy settings
- Inventory thresholds
- Expiry warning windows
- Illness case category management policy
- Referral rules
- Cloudinary storage folder roots
- Mapbox configuration status
- PSGC source status
- Firebase project status

What-if cases:

- Threshold changes should not rewrite historical stock status.
- Integration key is missing.
- Super Admin changes a setting that affects all barangays.
- Setting update partially fails.

## First Implementation Order

Build in this order:

1. Super Admin shell layout with sidebar/topbar. Implemented frontend-only.
2. `/super-admin` overview with mock cards, bento panels, and operational tables. Implemented frontend-only.
3. Frontend pages for approvals, approval detail, health centers, users, inventory, catalog, dispensing, illness cases, referrals, reports, alerts, audit logs, and settings. Implemented frontend-only.
4. `RequireAuth` and `RequireRole` route guards.
5. `/super-admin` overview reading current user claims and real backend health/config status.
6. `/super-admin/approvals` list from `adminSignupRequests`.
7. `/super-admin/approvals/:requestId` detail and decision UI connected to real request data.
8. Backend approval endpoint that creates Firebase Auth user, Firestore user profile, health center record, and audit log.
9. `/super-admin/health-centers` connected to Firestore.
10. `/super-admin/users` connected to Firestore and Firebase Auth metadata.
11. Basic illness case category capture in consultation or dispensing logs.
12. Inventory/referrals/reports after admin approval is production-safe.

## Minimum Data Needed Before Building UI

Before building the Super Admin screens, create or finalize:

- Firestore `users` collection
- Firestore `adminSignupRequests` collection
- Firestore `healthCenters` or enhanced `barangays` collection
- Firestore `auditLogs` collection
- Firestore `illnessCaseCategories`, `illnessCases`, and `illnessSummaries` collections
- Backend auth verification middleware
- Backend role authorization middleware
- Firestore rules for `super_admin`
- Cloudinary upload endpoint for signup proof documents

## Design Notes

- This should feel like an operational console, not a marketing dashboard.
- Prioritize dense, scannable tables with clear filters.
- Use status badges, side panels, and confirmation dialogs.
- Avoid showing sensitive proof or patient data unless explicitly opened.
- Every high-risk action should require a clear confirmation and create an audit log.

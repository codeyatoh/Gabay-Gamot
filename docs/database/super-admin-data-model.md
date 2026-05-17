# Super Admin Data Model

## Purpose

This document expands the current Firestore planning for the Super Admin area. It is not fully implemented yet.

Current implemented backend data writes:

- `users/{uid}` for the seeded Super Admin
- `systemSettings/bootstrap`

Planned Super Admin features require additional collections and derived metrics.

## Core Principles

- Use Firebase custom claims for fast role gating.
- Store canonical role/profile data in Firestore `users/{uid}`.
- Backend endpoints must verify ID tokens and role claims before privileged writes.
- Server-side Firebase Admin calls bypass Firestore Security Rules, so backend authorization must be explicit.
- Log every privileged state-changing action.
- Keep patient-identifying data out of Super Admin views unless there is a clear operational reason.
- Illness analytics must come from explicit case categories or consultation records, not inferred from dispensed medicine names alone.
- Use aggregate reporting by default for morbidity-style data, especially when counts are small.

## Collections

### `users/{uid}`

Stores all authenticated user profiles.

```js
{
  uid: "firebaseUid",
  email: "admin@example.com",
  displayName: "Juan Dela Cruz",
  firstName: "Juan",
  lastName: "Dela Cruz",
  role: "super_admin | health_center_admin | barangay_health_worker",
  status: "active | disabled | suspended | pending_setup",
  barangayCode: "097332001",
  barangayId: "barangayDocId",
  healthCenterId: "healthCenterDocId",
  facilityId: "legacyFacilityId",
  mustChangePassword: true,
  createdBy: "superAdminUid | seed:super-admin",
  createdFromRequestId: "requestId",
  lastLoginAt: timestamp,
  customClaimsSyncedAt: timestamp,
  createdAt: timestamp,
  updatedAt: timestamp
}
```

Indexes:

- `role`, `status`
- `healthCenterId`, `role`
- `barangayCode`, `role`

What-if rules:

- Do not allow the last active Super Admin to be disabled.
- If custom claims and Firestore role drift, show a sync warning.
- Role changes must update Firebase Auth custom claims from the backend.

### `adminSignupRequests/{requestId}`

Stores public admin signup applications before account creation.

Additional recommended fields beyond the existing auth approval schema:

```js
{
  riskFlags: {
    duplicateEmail: false,
    duplicateHealthCenter: false,
    locationMismatch: false,
    missingProof: false,
    unreadableProof: false
  },
  decision: {
    status: "pending_review | needs_more_info | approved | rejected | account_created",
    reviewedBy: "superAdminUid",
    reviewedAt: timestamp,
    remarks: "Reason or notes",
    rejectionReason: "not_authorized | duplicate | invalid_proof | other",
    createdUserUid: "firebaseUid",
    healthCenterId: "healthCenterId"
  },
  reviewTimeline: [
    {
      status: "pending_review",
      actorUid: "system | superAdminUid",
      notes: "Request submitted",
      createdAt: timestamp
    }
  ]
}
```

Indexes:

- `status`, `createdAt`
- `barangay.barangayCode`, `status`
- `applicant.email`, `status`

### `healthCenters/{healthCenterId}`

Represents a real barangay health center, not only a barangay.

```js
{
  name: "San Jose Barangay Health Center",
  normalizedName: "san-jose-barangay-health-center",
  status: "active | inactive | suspended | merged",
  psgc: {
    regionCode: "09",
    regionName: "Region IX",
    provinceCode: "0973",
    provinceName: "Zamboanga del Sur",
    cityMunicipalityCode: "097332",
    cityMunicipalityName: "Zamboanga City",
    barangayCode: "097332001",
    barangayName: "Example Barangay",
    psgcVersion: "development"
  },
  addressLine: "Street, sitio, or purok",
  coordinates: {
    latitude: 6.9214,
    longitude: 122.079,
    source: "mapbox_geocode | gps | manual_marker"
  },
  primaryAdminUid: "firebaseUid",
  secondaryAdminUids: [],
  workerCount: 0,
  createdFromRequestId: "requestId",
  mergedIntoHealthCenterId: null,
  createdAt: timestamp,
  updatedAt: timestamp
}
```

Indexes:

- `status`
- `psgc.barangayCode`, `status`
- `normalizedName`, `psgc.barangayCode`

What-if rules:

- A barangay may have multiple legitimate centers, so do not key health centers only by barangay code.
- Duplicate prevention should use a transaction with a separate key collection.

### `healthCenterKeys/{key}`

Optional uniqueness helper for duplicate prevention.

```js
{
  key: "097332001__san-jose-barangay-health-center",
  healthCenterId: "healthCenterId",
  createdFromRequestId: "requestId",
  createdAt: timestamp
}
```

Use this to reduce accidental duplicate health center creation.

### `medicineCatalog/{medicineId}`

Canonical medicine/product list.

```js
{
  genericName: "Paracetamol",
  brandName: "",
  strength: "500mg",
  form: "tablet",
  unit: "tablet",
  category: "analgesic",
  normalizedSearchTerms: ["paracetamol", "500mg", "tablet"],
  defaultMinimumStockLevel: 50,
  defaultMaximumStockLevel: 500,
  defaultExpiryWarningDays: 90,
  controlledOrRestricted: false,
  status: "active | inactive | merged",
  mergedIntoMedicineId: null,
  createdAt: timestamp,
  updatedAt: timestamp
}
```

What-if rules:

- Same generic name with different strength/form should be separate catalog items.
- Merging catalog items must preserve historical inventory and dispensing references.

### `inventoryBatches/{batchId}`

Tracks medicine stock at the batch level.

```js
{
  healthCenterId: "healthCenterId",
  barangayCode: "097332001",
  medicineId: "medicineId",
  displayNameSnapshot: "Paracetamol 500mg tablet",
  batchNumber: "LOT-123",
  expiryDate: timestamp,
  quantityOnHand: 120,
  quantityReserved: 0,
  quantityUsable: 120,
  status: "usable | expiring_soon | expired | quarantined | depleted",
  source: "ocr | manual | import",
  lastMovementAt: timestamp,
  createdBy: "uid",
  updatedBy: "uid",
  createdAt: timestamp,
  updatedAt: timestamp
}
```

Indexes:

- `healthCenterId`, `medicineId`, `expiryDate`
- `barangayCode`, `status`
- `medicineId`, `status`

What-if rules:

- Positive stock is not usable if expired.
- Prevent dispensing from expired or quarantined batches.
- FEFO behavior should prefer earliest expiry first.

### `inventorySummaries/{healthCenterId_medicineId}`

Derived document for fast dashboards.

```js
{
  healthCenterId: "healthCenterId",
  barangayCode: "097332001",
  medicineId: "medicineId",
  totalOnHand: 120,
  totalUsable: 100,
  totalExpired: 20,
  expiringSoonQuantity: 30,
  averageMonthlyConsumption: 40,
  monthsOfStock: 2.5,
  minimumStockLevel: 50,
  maximumStockLevel: 500,
  riskStatus: "normal | low_stock | stockout | overstock | expiring_soon",
  lastComputedAt: timestamp
}
```

What-if rules:

- Recompute summaries after receiving, dispensing, correction, expiry update, or catalog merge.
- If consumption data is missing, show `insufficient_data` instead of fake forecast confidence.

### `illnessCaseCategories/{caseCategoryId}`

Controlled list of case categories used for barangay morbidity-style analytics.

```js
{
  name: "Fever",
  normalizedName: "fever",
  group: "communicable_symptom | non_communicable | maternal_child | injury | dental | other",
  localCode: "optional-local-code",
  icd10Code: "optional",
  icd11Code: "optional",
  sensitiveFlag: false,
  status: "active | inactive | merged",
  mergedIntoCaseCategoryId: null,
  createdByUid: "uid",
  updatedByUid: "uid",
  createdAt: timestamp,
  updatedAt: timestamp
}
```

What-if rules:

- Start with a small locally understandable list before adding advanced ICD coding.
- Keep an `Other` category, but review it regularly and merge repeated terms into canonical categories.
- Merging categories must preserve historical case records through stable IDs or snapshots.
- Sensitive categories need stricter visibility and export rules.

### `illnessCases/{caseId}`

Records a consultation, dispensing-linked case, or health encounter category.

```js
{
  healthCenterId: "healthCenterId",
  barangayCode: "097332001",
  caseCategoryId: "caseCategoryId",
  caseCategorySnapshot: {
    name: "Fever",
    group: "communicable_symptom",
    localCode: "optional-local-code"
  },
  diagnosisStatus: "suspected | confirmed | self_reported | not_applicable",
  patient: {
    referenceId: "local-reference-or-hash",
    displayName: "optional-minimized"
  },
  ageGroup: "0-5 | 6-17 | 18-59 | 60+ | unknown",
  sex: "female | male | other | unknown",
  dispensingLogId: "optional-log-id",
  referralId: "optional-referral-id",
  notes: "optional-minimized",
  occurredAt: timestamp,
  recordedByUid: "workerUid",
  correctionOfCaseId: null,
  voidedAt: null,
  voidedByUid: null,
  createdAt: timestamp,
  updatedAt: timestamp
}
```

Indexes:

- `barangayCode`, `occurredAt`
- `healthCenterId`, `occurredAt`
- `caseCategoryId`, `occurredAt`
- `barangayCode`, `caseCategoryId`, `occurredAt`

What-if rules:

- A case can exist without medicine being dispensed.
- A dispensing log can exist without a case only during migration or allowed exception flows.
- One encounter may need multiple case categories; create separate linked case records when reporting requires separate counts.
- Corrections should void or supersede records instead of rewriting history silently.
- Do not expose patient names in Super Admin analytics by default.

### `illnessSummaries/{summaryId}`

Derived documents for fast top-case dashboards and reports.

```js
{
  dateBucket: "2026-05 | 2026-W21 | 2026-05-18",
  bucketType: "month | week | day",
  barangayCode: "097332001",
  healthCenterId: "healthCenterId",
  caseCategoryId: "caseCategoryId",
  caseCategoryNameSnapshot: "Fever",
  caseCount: 42,
  uniquePatientCount: 38,
  ageGroupBreakdown: {
    "0-5": 5,
    "6-17": 7,
    "18-59": 24,
    "60+": 6
  },
  sexBreakdown: {
    female: 22,
    male: 20
  },
  dispensingLinkedCount: 30,
  referralCount: 2,
  suppressedForPrivacy: false,
  computedAt: timestamp
}
```

Indexes:

- `bucketType`, `dateBucket`, `barangayCode`
- `bucketType`, `dateBucket`, `healthCenterId`
- `bucketType`, `dateBucket`, `caseCategoryId`

What-if rules:

- Recompute after case creation, correction, voiding, or category merge.
- Mark very small counts as suppressed when exports or charts could identify a patient.
- Keep `caseCount` separate from `uniquePatientCount` because repeat visits may matter operationally.

### `dispensingLogs/{logId}`

Records medicine dispensing and stock deduction.

```js
{
  healthCenterId: "healthCenterId",
  barangayCode: "097332001",
  medicineId: "medicineId",
  batchId: "batchId",
  quantityDispensed: 10,
  dispensedByUid: "workerUid",
  patient: {
    referenceId: "local-reference-or-hash",
    displayName: "optional-minimized"
  },
  illnessCaseId: "optional-case-id",
  dispensedAt: timestamp,
  stockDeducted: true,
  correctionOfLogId: null,
  voidedAt: null,
  voidedBy: null,
  createdAt: timestamp
}
```

Privacy rule:

- Super Admin dashboards should aggregate by center, medicine, and date. Avoid showing patient names by default.
- Do not use this collection alone to decide top illness categories; link to `illnessCases` when a case category is known.

### `referrals/{referralId}`

Records medicine referral requests between barangays.

```js
{
  sourceHealthCenterId: "healthCenterId",
  destinationHealthCenterId: "healthCenterId",
  medicineId: "medicineId",
  requestedQuantity: 10,
  destinationAvailableQuantitySnapshot: 25,
  status: "draft | sent | accepted | declined | fulfilled | cancelled | expired",
  createdByUid: "uid",
  acceptedByUid: null,
  fulfilledByUid: null,
  patientReferenceId: "optional-minimized",
  notes: "",
  createdAt: timestamp,
  updatedAt: timestamp
}
```

What-if rules:

- Snapshot destination stock at the time referral is created.
- Re-check stock before fulfillment.
- Expire referrals that are not acted on within the configured window.

### `alerts/{alertId}`

Stores generated system alerts.

```js
{
  severity: "info | warning | critical",
  category: "approval | low_stock | stockout | expiry | referral | data_quality | security | integration",
  targetType: "request | healthCenter | medicine | inventoryBatch | referral | user",
  targetId: "targetId",
  healthCenterId: "healthCenterId",
  message: "Readable summary",
  status: "open | acknowledged | resolved | dismissed",
  createdAt: timestamp,
  acknowledgedBy: null,
  resolvedBy: null,
  resolvedAt: null
}
```

### `auditLogs/{auditLogId}`

Append-only log of sensitive activity.

```js
{
  actorUid: "uid",
  actorRole: "super_admin",
  action: "admin_request.approve",
  targetType: "adminSignupRequest",
  targetId: "requestId",
  outcome: "success | failure",
  before: {
    status: "pending_review"
  },
  after: {
    status: "approved"
  },
  metadata: {
    requestId: "requestId",
    ipHash: "optional",
    userAgentHash: "optional"
  },
  createdAt: timestamp
}
```

Rules:

- Append-only.
- No passwords, tokens, Firebase private keys, or raw proof documents.
- No normal UI delete action.

### `reports/{reportId}`

Tracks generated reports and export metadata.

```js
{
  type: "stock_status | expiry | stockout_risk | dispensing | illness_cases | referrals | approvals | user_activity",
  filters: {
    dateFrom: timestamp,
    dateTo: timestamp,
    healthCenterId: "optional",
    barangayCode: "optional"
  },
  generatedByUid: "uid",
  generatedAt: timestamp,
  file: {
    provider: "cloudinary",
    publicId: "gabaygamot/dev/reports/reportId/file",
    secureUrl: "https://...",
    resourceType: "raw"
  },
  status: "generating | ready | failed"
}
```

### `systemSettings/{settingId}`

Stores global settings.

Recommended docs:

- `bootstrap`
- `inventoryThresholds`
- `expiryWindows`
- `referralRules`
- `storage`
- `integrations`

Example:

```js
{
  lowStockDefaultThreshold: 50,
  expiryWarningDays: 90,
  referralExpiryHours: 48,
  cloudinaryRoot: "gabaygamot/dev",
  updatedBy: "superAdminUid",
  updatedAt: timestamp
}
```

## Derived Metrics

### Stock on Hand

Total physical quantity recorded for usable and non-usable batches.

### Usable Stock

Stock that is not expired, not quarantined, and not reserved.

### Average Monthly Consumption

Average quantity dispensed per month over a selected historical window. Use six to twelve months when enough data exists.

### Months of Stock

```text
monthsOfStock = usableStock / averageMonthlyConsumption
```

If average monthly consumption is zero or missing, mark forecast confidence as `insufficient_data`.

### Stockout Risk

Potential rule:

```text
critical = usableStock <= 0
warning = usableStock <= minimumStockLevel
normal = usableStock > minimumStockLevel
```

Later, combine this with consumption velocity and referral availability.

### Expiry Risk

Potential rule:

```text
expired = expiryDate < today
expiring_soon = expiryDate <= today + expiryWarningDays
usable = expiryDate > today + expiryWarningDays
```

### Top Common Illness Cases by Barangay

Default rule:

```text
topCases = count(illnessCases)
  grouped by barangayCode + caseCategoryId
  filtered by date range
  excluding voided records
  sorted by caseCount descending
```

Use `illnessSummaries` for dashboard speed. Fall back to `illnessCases` only for smaller date ranges or admin drill-downs.

Reporting notes:

- Default date bucket should be monthly, with weekly and daily filters available later.
- Show both `caseCount` and `uniquePatientCount` when patient reference data is reliable.
- Label the metric as "recorded cases" instead of "confirmed illnesses" unless the filter is limited to confirmed diagnoses.
- Suppress or group small counts for privacy-sensitive exports.

## Required Backend Safeguards

- Verify Firebase ID token on every protected endpoint.
- Require `role === "super_admin"` for privileged Super Admin endpoints.
- Use backend validation before writes.
- Use Firestore transactions for approval, health center creation, and duplicate prevention.
- Create audit logs from the backend, not from the client.
- Treat client-side Firestore rules as protection for direct client access, not as a replacement for backend authorization.
- Validate `caseCategoryId` against active `illnessCaseCategories` before saving illness cases.
- Keep patient identifiers out of Super Admin responses unless the endpoint explicitly requires and authorizes them.
- Audit report exports and case-category merge/correction actions.

## First Data Implementation Order

1. `auditLogs`
2. `adminSignupRequests`
3. `healthCenters`
4. `users` role/claim sync fields
5. `medicineCatalog`
6. `illnessCaseCategories`
7. `inventoryBatches`
8. `dispensingLogs`
9. `illnessCases`
10. `inventorySummaries`
11. `illnessSummaries`
12. `referrals`
13. `reports`
14. `alerts`
15. `systemSettings`

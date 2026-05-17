# Auth Approval Data Model

## Collections

### `adminSignupRequests`

Stores admin signup applications before account activation.

Suggested fields:

```js
{
  id: "requestId",
  status: "pending_review",
  applicant: {
    firstName: "Juan",
    lastName: "Dela Cruz",
    email: "juan@example.com",
    mobileNumber: "09XXXXXXXXX",
    position: "Barangay Health Worker"
  },
  barangay: {
    regionCode: "04",
    regionName: "CALABARZON",
    provinceCode: "0410",
    provinceName: "Cavite",
    cityMunicipalityCode: "041005",
    cityMunicipalityName: "Example Municipality",
    barangayCode: "041005001",
    barangayName: "Example Barangay",
    psgcVersion: "Q2_2024"
  },
  facility: {
    name: "Example Barangay Health Center",
    addressLine: "Street / sitio / purok details"
  },
  proof: {
    authorizationDocumentUrl: "storage/path/file.pdf",
    idDocumentUrl: "storage/path/id.jpg",
    notes: ""
  },
  requestedRole: "health_center_admin",
  review: {
    reviewedBy: null,
    reviewedAt: null,
    remarks: ""
  },
  createdAt: timestamp,
  updatedAt: timestamp
}
```

### `users`

Created only after approval.

```js
{
  uid: "firebaseUid",
  firstName: "Juan",
  lastName: "Dela Cruz",
  email: "juan@example.com",
  role: "health_center_admin",
  barangayCode: "041005001",
  barangayId: "barangayDocId",
  facilityId: "facilityDocId",
  status: "active",
  mustChangePassword: true,
  createdBy: "superAdminUid",
  createdFromRequestId: "requestId",
  createdAt: timestamp,
  updatedAt: timestamp
}
```

### `barangays`

Uses PSGC as the normalized barangay identity.

```js
{
  id: "barangayDocId",
  barangayCode: "041005001",
  barangayName: "Example Barangay",
  cityMunicipalityCode: "041005",
  cityMunicipalityName: "Example Municipality",
  provinceCode: "0410",
  provinceName: "Cavite",
  regionCode: "04",
  regionName: "CALABARZON",
  psgcVersion: "Q2_2024",
  primaryAdminUid: "firebaseUid",
  status: "active",
  createdAt: timestamp,
  updatedAt: timestamp
}
```

## Security Notes

- Signup request documents are not active user accounts.
- Uploaded proof files must be protected in Firebase Storage.
- Only Super Admin/System Owner can approve or reject requests.
- Barangay Health Center Admin cannot approve their own account request.
- Barangay Health Worker accounts are created by the approved Barangay Health Center Admin after login.

# Development File Storage

## Current Decision

Use Cloudinary as the temporary development storage provider while Firebase Storage requires a Blaze upgrade.

Cloudinary is only the current development default. Keep upload code behind a backend service abstraction so the app can later move to Firebase Storage, S3, or Cloudflare R2 without rewriting page components.

## Upload Flow

Frontend file inputs should not talk to Cloudinary with secret credentials.

Required flow:

```text
Frontend
-> Express upload endpoint
-> backend validates file type and size
-> backend uploads to Cloudinary
-> backend returns upload metadata
-> app stores metadata in database later
```

Required backend environment variables:

```text
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
```

## Metadata Shape

Store provider-neutral metadata wherever file references are saved.

```js
{
  provider: "cloudinary",
  folder: "gabaygamot/dev/admin-signup-requests/{requestId}/ids",
  publicId: "cloudinary_public_id",
  url: "https://...",
  secureUrl: "https://...",
  originalFilename: "submitted-name.jpg",
  resourceType: "image | raw",
  mimeType: "image/jpeg",
  sizeBytes: 123456,
  uploadedAt: timestamp
}
```

Do not store Cloudinary API secrets, signed upload data, or temporary backend credentials in Firestore.

## Foldering Convention

All Cloudinary folders must start with:

```text
gabaygamot/{environment}/
```

Allowed environments:

```text
dev
staging
prod
```

Current development root:

```text
gabaygamot/dev/
```

## Folder Map

Use these folders exactly unless a documented reason exists.

```text
gabaygamot/dev/public/landing/
gabaygamot/dev/public/team/
gabaygamot/dev/admin-signup-requests/{requestId}/authorization/
gabaygamot/dev/admin-signup-requests/{requestId}/ids/
gabaygamot/dev/ocr-uploads/{barangayCode}/{scanId}/
gabaygamot/dev/medicine-images/{barangayCode}/{medicineId}/
gabaygamot/dev/reports/{reportId}/attachments/
gabaygamot/dev/temp/{yyyy-mm-dd}/
```

## File Type Rules

Admin signup authorization documents:

- folder: `gabaygamot/dev/admin-signup-requests/{requestId}/authorization/`
- allowed extensions: `.pdf`, `.doc`, `.docx`
- Cloudinary resource type: `raw`
- max size during development: 5MB

Admin signup ID documents:

- folder: `gabaygamot/dev/admin-signup-requests/{requestId}/ids/`
- allowed extensions: `.jpg`, `.jpeg`, `.png`
- Cloudinary resource type: `image`
- max size during development: 2MB

OCR medicine scan uploads:

- folder: `gabaygamot/dev/ocr-uploads/{barangayCode}/{scanId}/`
- allowed extensions: `.jpg`, `.jpeg`, `.png`, `.webp`
- Cloudinary resource type: `image`
- max size during development: 5MB

Public landing/team images:

- folder: `gabaygamot/dev/public/landing/` or `gabaygamot/dev/public/team/`
- allowed extensions: `.jpg`, `.jpeg`, `.png`, `.webp`
- Cloudinary resource type: `image`

## Naming Rules

- Never rely on the user-provided filename as the storage identity.
- Generate stable IDs server-side.
- Use lowercase path segments.
- Use hyphenated names, not spaces.
- Keep request, barangay, scan, medicine, and report IDs in folder paths when useful.
- Store the original filename only as metadata.

Example public ID pattern:

```text
gabaygamot/dev/admin-signup-requests/{requestId}/ids/{documentId}
```

## Security Notes

- Cloudinary is acceptable for development, but sensitive documents should be treated as private in production.
- Do not expose `CLOUDINARY_API_SECRET` in frontend code.
- Validate MIME type and size on the backend even if the frontend already validates.
- Keep delete behavior tied to `publicId`, not URL.
- Add cleanup rules for `temp/` uploads before launch.

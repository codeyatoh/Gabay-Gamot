# Storage Guidelines

## Current Development Provider

Use Cloudinary for development file storage while Firebase Storage requires a Blaze upgrade.

Do not wire frontend components directly to Cloudinary secrets. Upload through the Express backend.

## Required Environment Variables

```text
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
```

## Required Upload Flow

```text
Frontend file input
-> Express upload endpoint
-> backend validates file type and size
-> backend uploads to Cloudinary
-> backend returns provider-neutral metadata
```

## Cloudinary Folder Root

Every upload must use this root pattern:

```text
gabaygamot/{environment}/
```

Use `dev` while developing locally.

## Folder Map

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

## File Rules

- Authorization documents: `.pdf`, `.doc`, `.docx`, max 5MB, Cloudinary `raw`.
- ID images: `.jpg`, `.jpeg`, `.png`, max 2MB, Cloudinary `image`.
- OCR images: `.jpg`, `.jpeg`, `.png`, `.webp`, max 5MB, Cloudinary `image`.
- Public images: `.jpg`, `.jpeg`, `.png`, `.webp`, Cloudinary `image`.

## Naming Rules

- Generate IDs on the backend.
- Store original filenames only as metadata.
- Use lowercase, hyphenated folder and file identifiers.
- Store and delete files by `publicId`, not by URL.
- Keep storage metadata provider-neutral so the provider can later change to Firebase Storage, S3, or R2.

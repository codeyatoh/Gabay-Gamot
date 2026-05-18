# Super Admin Layman Guide

This guide explains what each Super Admin page is for in simple terms. Keep this as the product reference for UI copy, onboarding, and future AI summaries.

## Overview

Purpose:

The main dashboard. This is where the Super Admin quickly sees what needs attention across the whole system.

Check first:

- Pending admin requests that need review
- Health centers without assigned admins
- Critical medicine stock or expiry alerts
- Barangays with high illness cases and low usable medicine stock
- Barangays with slow-moving or unused medicine that may support another center
- Recent sensitive actions that should have audit logs

Future AI summary:

- Summarize pending approvals, risky centers, low-stock medicines, unusual illness spikes, and daily what-if recommendations for medicine transfer or restock.

Daily AI what-if examples:

- If San Jose has high fever cases and low Paracetamol, recommend checking nearby usable stock before buying new stock.
- If Tetuan has rising diarrhea cases and low ORS, recommend a referral request before full stockout.
- If Guiwan has medicine that is not being used, flag it as possible support stock for another barangay.

## Approvals

Purpose:

This is where the Super Admin checks if an applicant is legitimate before giving them a Health Center Admin account.

Check first:

- Applicant details and proof documents
- Selected barangay and health center location
- Duplicate email or duplicate health center warnings
- Whether the request should be approved, rejected, or marked as needing more information

Future AI summary:

- Highlight duplicate, missing proof, and location mismatch risks.

## Approval Detail

Purpose:

This is the detailed review screen for one admin signup request.

Check first:

- Applicant name matches the submitted proof
- Selected PSGC address and map pin look correct
- Existing users or health centers in the same barangay
- Reviewer notes are clear enough for audit history

Future AI summary:

- Create a short risk summary and suggest what the reviewer should verify.

## Health Centers

Purpose:

This is the registry and map view for registered barangay health centers.

Check first:

- Centers that are active, unassigned, suspended, or duplicate-risk
- Whether the map pin is in the right location
- Primary admin and worker count
- Inventory or reporting issues per center

Future AI summary:

- Summarize coverage gaps and centers that need admin assignment or location review.

## Users & Roles

Purpose:

This is where the Super Admin monitors accounts and roles for Super Admins, Health Center Admins, and Barangay Health Workers.

Check first:

- Correct role and health center assignment
- Firebase claim and Firestore profile mismatch
- Suspended, disabled, or pending setup accounts
- Last active Super Admin protection

Future AI summary:

- Find users with role mismatch, suspicious assignment, or setup issues.

## Inventory

Purpose:

This is where the Super Admin monitors medicine stock risks across all health centers.

Check first:

- Zero usable stock
- Positive stock that is expired
- Centers with no recent inventory update
- Medicines that need restock or referral support

Future AI summary:

- Summarize top stock risks and suggest which centers need action first.

## Medicine Catalog

Purpose:

This is the master list of medicines. It keeps spelling, dosage, form, unit, and category consistent.

Check first:

- Duplicate medicine names
- Correct strength, form, and unit
- Restricted medicines that need extra control
- Default low-stock and expiry thresholds

Future AI summary:

- Detect duplicate medicine names and suggest cleaner catalog entries.

## Dispensing

Purpose:

This shows medicine usage trends and accountability signals. Patient-identifying details should not show by default.

Check first:

- High-usage medicines
- Dispensing logs that need correction
- Medicines dispensed without linked case category
- Stock deduction issues

Future AI summary:

- Summarize unusual dispensing patterns and cleanup needs.

## Illness Cases

Purpose:

This shows common recorded cases per barangay, such as fever, cough/colds, diarrhea, hypertension, and similar local case categories.

Check first:

- Top case categories per barangay
- Sudden spikes that need validation
- Too many records under `Other`
- Small counts that should be protected for privacy

Future AI summary:

- Explain case trends in simple language and flag barangays with spikes.

## Referrals

Purpose:

This monitors medicine referral requests between health centers.

Check first:

- Pending or expired referrals
- Destination center stock availability
- Accepted referrals that still need fulfillment
- Patient details that should stay hidden by default

Future AI summary:

- Summarize referrals that need follow-up first.

## Reports

Purpose:

This is where reports are generated or reviewed for stock, illness cases, approvals, referrals, users, and audit activity.

Check first:

- Correct report type and date range
- Sensitive data is aggregate by default
- Failed exports
- Report generation is logged in audit logs

Future AI summary:

- Draft a plain-language summary for selected report filters.

## Alerts

Purpose:

This shows warnings that need attention, such as low stock, pending approval, illness spikes, or integration issues.

Check first:

- Critical alerts
- Repeated alerts for the same issue
- Risks that reopened after being resolved
- Alert owner and timestamp

Future AI summary:

- Group related alerts and rank what to handle first.

## Audit Logs

Purpose:

This is the history of sensitive admin actions, such as approvals, role changes, proof document access, report exports, and settings changes.

Check first:

- Failed privileged actions
- Role or claim changes
- Proof document views and report exports
- No passwords, tokens, or raw sensitive documents in logs

Future AI summary:

- Summarize high-risk admin actions without exposing secrets.

## Settings

Purpose:

This is where global rules and integrations will be managed later.

Check first:

- Approval and inventory policies
- Firebase, Mapbox, Cloudinary, and future AI backend status
- Illness case category cleanup policy
- Audit trail for global setting changes

Future AI summary:

- Check configuration health and explain incomplete or risky settings.

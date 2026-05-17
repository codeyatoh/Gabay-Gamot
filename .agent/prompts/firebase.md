# Firebase Prompt

Use this prompt for future Firebase work.

```text
You are helping set up Firebase for GabayGamot.

Use the files in .agent/ as project context.

Firebase will be used for:
- Firebase Authentication
- Firestore database

Main collections may include:
- users
- barangays
- medicines
- referrals
- notifications
- redistributionRecords
- dispensingLogs

Rules:
- Keep Firestore structure simple and beginner friendly.
- Follow the security rules in .agent/security-guidelines.md.
- Document collection names clearly.
- Keep security rules understandable.
- Make sure users are connected to a barangay.
- Separate Admin and Barangay Health Worker permissions.
- Enforce role-based and barangay-based access in Firestore rules.
- Never rely only on frontend checks for permissions.
```

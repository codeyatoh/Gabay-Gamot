import {
  Activity,
  AlertTriangle,
  BarChart3,
  Bell,
  Building2,
  ClipboardCheck,
  FileBarChart,
  FileText,
  HeartPulse,
  LayoutDashboard,
  ListChecks,
  Pill,
  RefreshCcw,
  Settings,
  ShieldCheck,
  Stethoscope,
  Users,
} from "lucide-react";

export const superAdminUser = {
  name: "Super Admin",
  email: "a.halmain.official@gmail.com",
  initials: "SA",
};

export const superAdminNavGroups = [
  {
    label: "Command Center",
    items: [
      {
        title: "Overview",
        href: "/super-admin",
        icon: LayoutDashboard,
        description: "System health, risks, and live workload.",
      },
      {
        title: "Admin Requests",
        href: "/super-admin/approvals",
        icon: ClipboardCheck,
        description: "Admin signup requests and review queue.",
      },
      {
        title: "Request Review",
        href: "/super-admin/approvals/review",
        icon: FileText,
        description: "Applicant, proof, location, and decision panel.",
      },
    ],
  },
  {
    label: "Operations",
    items: [
      {
        title: "Health Centers",
        href: "/super-admin/health-centers",
        icon: Building2,
        description: "Facility registry and barangay coverage.",
      },
      {
        title: "Users & Roles",
        href: "/super-admin/users",
        icon: Users,
        description: "Accounts, roles, claims, and assignments.",
      },
      {
        title: "Medicine Stock",
        href: "/super-admin/inventory",
        icon: Pill,
        description: "Stock status, expiry, and shortage risks.",
      },
      {
        title: "Medicine List",
        href: "/super-admin/medicine-catalog",
        icon: ListChecks,
        description: "Normalized medicine names and thresholds.",
      },
      {
        title: "Medicine Given Out",
        href: "/super-admin/dispensing",
        icon: Activity,
        description: "Medicine usage and accountability logs.",
      },
    ],
  },
  {
    label: "Insights",
    items: [
      {
        title: "Illness Cases",
        href: "/super-admin/illness-cases",
        icon: HeartPulse,
        description: "Top common cases by barangay.",
      },
      {
        title: "Medicine Requests",
        href: "/super-admin/referrals",
        icon: RefreshCcw,
        description: "Medicine referrals between barangays.",
      },
      {
        title: "Reports",
        href: "/super-admin/reports",
        icon: FileBarChart,
        description: "Operational and analytics exports.",
      },
    ],
  },
  {
    label: "Governance",
    items: [
      {
        title: "Alerts",
        href: "/super-admin/alerts",
        icon: Bell,
        description: "Open risks and system notifications.",
      },
      {
        title: "Activity History",
        href: "/super-admin/audit-logs",
        icon: ShieldCheck,
        description: "Sensitive admin activity history.",
      },
      {
        title: "Settings",
        href: "/super-admin/settings",
        icon: Settings,
        description: "Policies, thresholds, and integrations.",
      },
    ],
  },
];

export const overviewMetrics = [
  {
    label: "Pending approvals",
    value: "18",
    delta: "+6 today",
    tone: "warning",
    detail: "7 requests need document review",
    icon: ClipboardCheck,
  },
  {
    label: "Active centers",
    value: "42",
    delta: "91% covered",
    tone: "good",
    detail: "4 barangays still need assigned admins",
    icon: Building2,
  },
  {
    label: "Inventory risks",
    value: "26",
    delta: "8 critical",
    tone: "danger",
    detail: "Stockout and expiry signals need action",
    icon: AlertTriangle,
  },
  {
    label: "Case signals",
    value: "5",
    delta: "2 spikes",
    tone: "info",
    detail: "Illness case spikes from recorded encounters",
    icon: Stethoscope,
  },
];

export const caseTrendData = [
  { label: "Mon", cases: 34, dispensing: 22 },
  { label: "Tue", cases: 41, dispensing: 30 },
  { label: "Wed", cases: 38, dispensing: 26 },
  { label: "Thu", cases: 52, dispensing: 34 },
  { label: "Fri", cases: 49, dispensing: 31 },
  { label: "Sat", cases: 44, dispensing: 28 },
  { label: "Sun", cases: 57, dispensing: 39 },
];

export const topIllnessCases = [
  {
    barangay: "San Jose",
    category: "Fever",
    cases: 42,
    trend: "+18%",
    status: "Spike watch",
  },
  {
    barangay: "Talon-Talon",
    category: "Cough/Colds",
    cases: 37,
    trend: "+9%",
    status: "Monitor",
  },
  {
    barangay: "Guiwan",
    category: "Hypertension",
    cases: 29,
    trend: "-3%",
    status: "Stable",
  },
  {
    barangay: "Tetuan",
    category: "Diarrhea",
    cases: 18,
    trend: "+14%",
    status: "Review",
  },
];

export const approvalQueue = [
  {
    id: "REQ-1042",
    applicant: "Marielle Santos",
    center: "San Jose BHC",
    barangay: "San Jose",
    status: "Pending review",
    submitted: "Today",
  },
  {
    id: "REQ-1041",
    applicant: "Noel Garcia",
    center: "Guiwan Health Station",
    barangay: "Guiwan",
    status: "Needs more info",
    submitted: "Yesterday",
  },
  {
    id: "REQ-1040",
    applicant: "Rhea Lim",
    center: "Tetuan BHC",
    barangay: "Tetuan",
    status: "Duplicate warning",
    submitted: "2 days ago",
  },
];

export const inventoryRisks = [
  {
    medicine: "Paracetamol 500mg",
    center: "San Jose BHC",
    status: "Low stock",
    quantity: "24 tablets",
  },
  {
    medicine: "Amoxicillin 500mg",
    center: "Guiwan Health Station",
    status: "Expiring soon",
    quantity: "80 capsules",
  },
  {
    medicine: "ORS sachet",
    center: "Tetuan BHC",
    status: "Stockout risk",
    quantity: "9 sachets",
  },
];

export const dailyBarangayMedicineSignals = [
  {
    barangay: "San Jose",
    topIllness: "Fever",
    casesToday: 42,
    medicineNeeded: "Paracetamol 500mg",
    shortage: "High",
    usableStock: "24 tablets",
    surplusFrom: "Guiwan Health Station",
    unusedMedicine: "Amoxicillin 500mg",
    whatIf:
      "If fever cases continue tomorrow, San Jose may run out of Paracetamol before the next supply cycle. Check Guiwan stock for possible transfer before buying new stock.",
  },
  {
    barangay: "Tetuan",
    topIllness: "Diarrhea",
    casesToday: 18,
    medicineNeeded: "ORS sachet",
    shortage: "Critical",
    usableStock: "9 sachets",
    surplusFrom: "Sta. Maria BHC",
    unusedMedicine: "Cetirizine 10mg",
    whatIf:
      "If diarrhea cases increase by 20 percent, Tetuan should request ORS today and avoid waiting for a confirmed stockout.",
  },
  {
    barangay: "Guiwan",
    topIllness: "Cough/Colds",
    casesToday: 37,
    medicineNeeded: "Cetirizine 10mg",
    shortage: "Monitor",
    usableStock: "118 tablets",
    surplusFrom: "Guiwan Health Station",
    unusedMedicine: "Amoxicillin 500mg",
    whatIf:
      "If Cetirizine usage stays low for 7 days, flag it as slow-moving stock and review whether another barangay needs it more.",
  },
];

export const healthCenterLocations = [
  {
    id: "HC-001",
    name: "San Jose Barangay Health Center",
    shortName: "San Jose BHC",
    barangay: "San Jose",
    city: "Zamboanga City",
    province: "Zamboanga del Sur",
    coordinates: { latitude: 6.9214, longitude: 122.079 },
    status: "Active",
    statusTone: "good",
    primaryAdmin: "Marielle Santos",
    workers: 8,
    inventoryStatus: "2 low-stock items",
    lastUpdated: "Today",
  },
  {
    id: "HC-002",
    name: "Guiwan Health Station",
    shortName: "Guiwan",
    barangay: "Guiwan",
    city: "Zamboanga City",
    province: "Zamboanga del Sur",
    coordinates: { latitude: 6.9133, longitude: 122.0947 },
    status: "Active",
    statusTone: "good",
    primaryAdmin: "Noel Garcia",
    workers: 5,
    inventoryStatus: "1 expiring batch",
    lastUpdated: "Yesterday",
  },
  {
    id: "HC-003",
    name: "Tetuan Barangay Health Center",
    shortName: "Tetuan BHC",
    barangay: "Tetuan",
    city: "Zamboanga City",
    province: "Zamboanga del Sur",
    coordinates: { latitude: 6.9172, longitude: 122.0876 },
    status: "Duplicate risk",
    statusTone: "warning",
    primaryAdmin: "Rhea Lim",
    workers: 6,
    inventoryStatus: "Stockout risk",
    lastUpdated: "2 days ago",
  },
  {
    id: "HC-004",
    name: "Sta. Maria Barangay Health Center",
    shortName: "Sta. Maria BHC",
    barangay: "Sta. Maria",
    city: "Zamboanga City",
    province: "Zamboanga del Sur",
    coordinates: { latitude: 6.9316, longitude: 122.0709 },
    status: "Needs admin",
    statusTone: "warning",
    primaryAdmin: "Unassigned",
    workers: 0,
    inventoryStatus: "No recent update",
    lastUpdated: "Pending setup",
  },
];

export const auditActivity = [
  {
    action: "Approved admin request",
    actor: "Super Admin",
    target: "REQ-1038",
    time: "18 min ago",
  },
  {
    action: "Updated stock threshold",
    actor: "Super Admin",
    target: "ORS sachet",
    time: "1 hr ago",
  },
  {
    action: "Merged illness category",
    actor: "Super Admin",
    target: "Cough and colds",
    time: "3 hrs ago",
  },
];

export const pageBlueprints = {
  "/super-admin/approvals": {
    title: "Admin Requests",
    eyebrow: "Approvals",
    description: "Check people who want to become Health Center Admin before giving them access.",
    primaryAction: "Review request",
    tabs: ["All", "Pending", "Needs info", "Approved", "Rejected"],
    stats: [
      { label: "Pending review", value: "18", helper: "7 high priority" },
      { label: "Needs info", value: "5", helper: "Waiting for proof" },
      { label: "Approved this week", value: "11", helper: "9 accounts created" },
    ],
    columns: ["Request", "Applicant", "Health center", "Barangay", "Status"],
    rows: approvalQueue.map((item) => [
      item.id,
      item.applicant,
      item.center,
      item.barangay,
      item.status,
    ]),
    sidePanel: [
      "Duplicate email and health center checks",
      "Proof document review status",
      "Map pin distance from selected barangay",
      "Reviewer notes and decision trail",
    ],
  },
  "/super-admin/approvals/review": {
    title: "Request Review",
    eyebrow: "Approvals",
    description: "Review one admin request, including proof, location, and duplicate warnings.",
    primaryAction: "Approve request",
    tabs: ["Applicant", "Health center", "Proof", "Decision"],
    stats: [
      { label: "Risk flags", value: "2", helper: "Location and duplicate checks" },
      { label: "Proof files", value: "3", helper: "2 images, 1 authorization file" },
      { label: "Timeline events", value: "5", helper: "Submitted to review" },
    ],
    columns: ["Field", "Submitted value", "Review note", "State"],
    rows: [
      ["Applicant", "Marielle Santos", "Name matches ID", "Clear"],
      ["Health center", "San Jose BHC", "Similar center exists", "Review"],
      ["Barangay", "San Jose", "PSGC selected", "Clear"],
      ["Pin location", "6.9214, 122.0790", "Inside barangay boundary", "Clear"],
    ],
    sidePanel: [
      "Approve should create Firebase Auth user",
      "Create Firestore profile and health center record",
      "Set role custom claims from backend only",
      "Write an append-only audit log",
    ],
  },
  "/super-admin/health-centers": {
    title: "Health Centers",
    eyebrow: "Operations",
    description: "See all registered health centers, their barangay, assigned admin, and status.",
    primaryAction: "Add center",
    tabs: ["All", "Active", "Unassigned", "Suspended"],
    stats: [
      { label: "Active centers", value: "42", helper: "Across covered barangays" },
      { label: "Unassigned", value: "4", helper: "Need primary admin" },
      { label: "Duplicate risks", value: "3", helper: "Potential merge review" },
    ],
    columns: ["Health center", "Barangay", "Primary admin", "Workers", "Status"],
    rows: [
      ["San Jose BHC", "San Jose", "Marielle Santos", "8", "Active"],
      ["Guiwan Health Station", "Guiwan", "Noel Garcia", "5", "Active"],
      ["Tetuan BHC", "Tetuan", "Rhea Lim", "6", "Active"],
      ["Sta. Maria BHC", "Sta. Maria", "Unassigned", "0", "Needs admin"],
    ],
    sidePanel: [
      "A barangay can have more than one legitimate health center",
      "Primary admin transfer should be audited",
      "Duplicate center records need merge history",
      "Suspended centers keep historical records readable",
    ],
  },
  "/super-admin/users": {
    title: "Users & Roles",
    eyebrow: "Operations",
    description: "See system users, their role, and where they are assigned.",
    primaryAction: "Create user",
    tabs: ["All users", "Super Admin", "Admins", "Workers", "Suspended"],
    stats: [
      { label: "Active users", value: "128", helper: "Across all roles" },
      { label: "Claim drift", value: "2", helper: "Needs backend sync" },
      { label: "Disabled", value: "6", helper: "Kept for audit" },
    ],
    columns: ["User", "Email", "Role", "Assignment", "Status"],
    rows: [
      ["Angelito Halmain", "a.halmain.official@gmail.com", "Super Admin", "System", "Active"],
      ["Marielle Santos", "marielle@example.com", "Health Center Admin", "San Jose BHC", "Pending setup"],
      ["Jessa Cruz", "jessa@example.com", "Health Worker", "Guiwan", "Active"],
      ["Mark Reyes", "mark@example.com", "Health Worker", "Tetuan", "Disabled"],
    ],
    sidePanel: [
      "Do not delete users by default",
      "Role changes must be backend-only",
      "Prevent disabling the last active Super Admin",
      "Expired ID tokens may still carry old claims until refresh",
    ],
  },
  "/super-admin/inventory": {
    title: "Medicine Stock",
    eyebrow: "Operations",
    description: "See which medicines are low, out of stock, expiring, or still usable.",
    primaryAction: "Review stock",
    tabs: ["All", "Low stock", "Stockout", "Expiring", "Expired"],
    stats: [
      { label: "Low stock", value: "18", helper: "Below configured threshold" },
      { label: "Expiring soon", value: "11", helper: "Within 90 days" },
      { label: "Stockout", value: "8", helper: "No usable quantity" },
    ],
    columns: ["Medicine", "Health center", "Usable stock", "Batch risk", "Status"],
    rows: [
      ["Paracetamol 500mg", "San Jose BHC", "24", "None", "Low stock"],
      ["Amoxicillin 500mg", "Guiwan Health Station", "80", "Expiring soon", "Review"],
      ["ORS sachet", "Tetuan BHC", "9", "High demand", "Stockout risk"],
      ["Cetirizine 10mg", "Sta. Maria BHC", "0", "None", "Stockout"],
    ],
    sidePanel: [
      "Positive stock is not usable when expired",
      "Use FEFO for dispensing later",
      "Consumption velocity improves stockout forecasts",
      "OCR uploads should land in documented Cloudinary folders",
    ],
  },
  "/super-admin/medicine-catalog": {
    title: "Medicine List",
    eyebrow: "Operations",
    description: "Keep one clean list of medicine names, dosage, form, and default stock rules.",
    primaryAction: "Add medicine",
    tabs: ["Active", "Duplicates", "Restricted", "Inactive"],
    stats: [
      { label: "Catalog items", value: "214", helper: "Active normalized records" },
      { label: "Duplicate groups", value: "9", helper: "Need merge review" },
      { label: "Restricted", value: "12", helper: "Extra controls later" },
    ],
    columns: ["Generic name", "Strength", "Form", "Category", "Status"],
    rows: [
      ["Paracetamol", "500mg", "Tablet", "Analgesic", "Active"],
      ["Amoxicillin", "500mg", "Capsule", "Antibiotic", "Active"],
      ["ORS", "Standard", "Sachet", "Rehydration", "Active"],
      ["Cetirizine", "10mg", "Tablet", "Antihistamine", "Duplicate risk"],
    ],
    sidePanel: [
      "Different strength or form should be a separate item",
      "Merging items must preserve historical references",
      "Barangay shorthand names should map to canonical records",
      "Default thresholds can be overridden per center later",
    ],
  },
  "/super-admin/dispensing": {
    title: "Medicine Given Out",
    eyebrow: "Operations",
    description: "See medicine released by health centers without showing patient details by default.",
    primaryAction: "View usage",
    tabs: ["Summary", "Corrections", "High usage", "No case link"],
    stats: [
      { label: "Logs this week", value: "386", helper: "Across active centers" },
      { label: "Corrections", value: "7", helper: "Require audit review" },
      { label: "Unlinked cases", value: "24", helper: "Need case category cleanup" },
    ],
    columns: ["Log", "Medicine", "Health center", "Quantity", "Linked case"],
    rows: [
      ["DSP-8841", "Paracetamol 500mg", "San Jose BHC", "10", "Fever"],
      ["DSP-8840", "ORS sachet", "Tetuan BHC", "4", "Diarrhea"],
      ["DSP-8839", "Cetirizine 10mg", "Guiwan", "12", "Cough/Colds"],
      ["DSP-8838", "Amoxicillin 500mg", "San Jose", "6", "Unlinked"],
    ],
    sidePanel: [
      "Aggregate by center, medicine, and date by default",
      "Do not infer illness from medicine names",
      "Corrections should void or supersede records",
      "Patient details need stricter authorization",
    ],
  },
  "/super-admin/illness-cases": {
    title: "Illness Cases",
    eyebrow: "Insights",
    description: "See common illness cases per barangay, such as fever, cough, diarrhea, and hypertension.",
    primaryAction: "Review spike",
    tabs: ["Top cases", "Trend", "By barangay", "Needs cleanup"],
    stats: [
      { label: "Recorded cases", value: "412", helper: "This month" },
      { label: "Spike watch", value: "5", helper: "Needs validation" },
      { label: "Other category", value: "31", helper: "Cleanup queue" },
    ],
    columns: ["Barangay", "Top category", "Cases", "Trend", "Status"],
    rows: topIllnessCases.map((item) => [
      item.barangay,
      item.category,
      String(item.cases),
      item.trend,
      item.status,
    ]),
    sidePanel: [
      "Source is `illnessCases`, not medicine names",
      "Summaries group by barangay, date bucket, and category",
      "Small counts should be suppressed in exports",
      "Label suspected cases separately from confirmed diagnoses",
    ],
  },
  "/super-admin/referrals": {
    title: "Medicine Requests",
    eyebrow: "Insights",
    description: "Track barangays requesting medicine from another health center.",
    primaryAction: "Review pending",
    tabs: ["All", "Sent", "Accepted", "Fulfilled", "Expired"],
    stats: [
      { label: "Pending", value: "12", helper: "Awaiting destination response" },
      { label: "Fulfilled", value: "28", helper: "This month" },
      { label: "Expired", value: "3", helper: "No action in window" },
    ],
    columns: ["Referral", "Source", "Destination", "Medicine", "Status"],
    rows: [
      ["REF-701", "San Jose BHC", "Guiwan", "ORS sachet", "Sent"],
      ["REF-700", "Tetuan BHC", "San Jose", "Paracetamol 500mg", "Accepted"],
      ["REF-699", "Sta. Maria BHC", "Tetuan", "Amoxicillin 500mg", "Fulfilled"],
      ["REF-698", "Guiwan", "San Jose", "Cetirizine 10mg", "Expired"],
    ],
    sidePanel: [
      "Snapshot destination stock when referral is created",
      "Re-check stock before fulfillment",
      "Patient data is hidden by default",
      "Expired referrals remain visible for accountability",
    ],
  },
  "/super-admin/reports": {
    title: "Reports",
    eyebrow: "Insights",
    description: "Create and view reports for stock, medicine usage, illness cases, requests, and activity.",
    primaryAction: "Generate report",
    tabs: ["Stock", "Dispensing", "Illness cases", "Referrals", "Audit"],
    stats: [
      { label: "Ready reports", value: "14", helper: "Stored metadata only" },
      { label: "Scheduled", value: "4", helper: "Monthly templates" },
      { label: "Failed exports", value: "1", helper: "Retry available later" },
    ],
    columns: ["Report", "Type", "Date range", "Generated by", "Status"],
    rows: [
      ["RPT-221", "Stock status", "May 2026", "Super Admin", "Ready"],
      ["RPT-220", "Illness cases", "May 2026", "Super Admin", "Ready"],
      ["RPT-219", "Approvals", "Last 30 days", "Super Admin", "Ready"],
      ["RPT-218", "Dispensing", "Last 7 days", "System", "Generating"],
    ],
    sidePanel: [
      "Exports should create audit logs",
      "Sensitive reports should be aggregate by default",
      "Cloudinary report files use provider-neutral metadata",
      "Large reports should be generated backend-side",
    ],
  },
  "/super-admin/alerts": {
    title: "Alerts",
    eyebrow: "Governance",
    description: "See important warnings such as low stock, illness spikes, and pending approvals.",
    primaryAction: "Resolve selected",
    tabs: ["Open", "Critical", "Acknowledged", "Resolved"],
    stats: [
      { label: "Open alerts", value: "31", helper: "8 critical" },
      { label: "Inventory", value: "19", helper: "Low stock and expiry" },
      { label: "Illness spikes", value: "5", helper: "Needs validation" },
    ],
    columns: ["Alert", "Category", "Target", "Severity", "Status"],
    rows: [
      ["ALT-501", "Low stock", "Paracetamol 500mg", "Critical", "Open"],
      ["ALT-500", "Illness spike", "San Jose fever cases", "Warning", "Open"],
      ["ALT-499", "Pending approval", "REQ-1042", "Info", "Open"],
      ["ALT-498", "Integration", "Cloudinary config", "Warning", "Acknowledged"],
    ],
    sidePanel: [
      "Repeated alerts should be grouped",
      "Resolved alerts can reopen if risk returns",
      "Dismiss actions should keep an audit trail",
      "Critical alerts need clear owner and timestamp",
    ],
  },
  "/super-admin/audit-logs": {
    title: "Activity History",
    eyebrow: "Governance",
    description: "See who made important system actions and when they happened.",
    primaryAction: "Filter logs",
    tabs: ["All", "Approvals", "Users", "Reports", "Inventory"],
    stats: [
      { label: "Events today", value: "86", helper: "12 privileged actions" },
      { label: "Failures", value: "3", helper: "Review endpoint errors" },
      { label: "Exports", value: "9", helper: "Report access trail" },
    ],
    columns: ["Time", "Actor", "Action", "Target", "Outcome"],
    rows: [
      ["18 min ago", "Super Admin", "admin_request.approve", "REQ-1038", "Success"],
      ["1 hr ago", "Super Admin", "inventory.threshold.update", "ORS sachet", "Success"],
      ["3 hrs ago", "Super Admin", "illness_category.merge", "Cough and colds", "Success"],
      ["4 hrs ago", "System", "report.generate", "RPT-218", "Failure"],
    ],
    sidePanel: [
      "No passwords, tokens, or raw documents in logs",
      "Audit logs should be append-only",
      "Normal UI should not delete audit entries",
      "Privilege changes and exports are high-risk events",
    ],
  },
  "/super-admin/settings": {
    title: "System Settings",
    eyebrow: "Governance",
    description: "Set system rules for approvals, medicine stock, referrals, categories, and integrations.",
    primaryAction: "Save policy",
    tabs: ["Policies", "Stock rules", "Cases", "Storage", "Integrations"],
    stats: [
      { label: "Policy groups", value: "6", helper: "Approval, inventory, cases" },
      { label: "Config checks", value: "4", helper: "Firebase, Mapbox, Cloudinary" },
      { label: "Case categories", value: "28", helper: "Active local terms" },
    ],
    columns: ["Setting", "Current value", "Scope", "Updated by", "Status"],
    rows: [
      ["Expiry warning window", "90 days", "Global", "Super Admin", "Active"],
      ["Cloudinary root", "gabaygamot/dev", "Development", "System", "Active"],
      ["Referral expiry", "48 hours", "Global", "Super Admin", "Draft"],
      ["Other category review", "Weekly", "Illness cases", "Super Admin", "Active"],
    ],
    sidePanel: [
      "Threshold changes should not rewrite historical status",
      "Sensitive integration keys stay server-side",
      "Case category merge policy affects analytics",
      "Every global setting change should be audited",
    ],
  },
};

export const defaultPagePath = "/super-admin";

export function getNavItemByPath(pathname) {
  return superAdminNavGroups
    .flatMap((group) => group.items)
    .find((item) => item.href === pathname);
}

export function getPageBlueprint(pathname) {
  return pageBlueprints[pathname] ?? pageBlueprints["/super-admin/approvals"];
}

export const quickFilters = ["Today", "7 days", "30 days", "Quarter"];

export const pageGuides = {
  "/super-admin": {
    simplePurpose:
      "Ito ang main dashboard. Dito makikita ng Super Admin kung ano ang kailangan unahin sa buong system.",
    checkFirst: [
      "Pending admin requests na kailangan i-review",
      "Health centers na walang assigned admin",
      "Critical medicine stock or expiry alerts",
      "Recent actions na dapat may audit trail",
    ],
    aiPreview:
      "Summarize today: pending approvals, risky centers, low stock medicines, and unusual illness spikes.",
    aiInsight:
      "Daily priority: San Jose has high fever cases with low Paracetamol, Tetuan has diarrhea cases with ORS stockout risk, and Guiwan has slow-moving medicine that may be reusable by another barangay.",
  },
  "/super-admin/approvals": {
    simplePurpose:
      "Dito tinitingnan kung legit ba ang nag-request maging Health Center Admin bago sila bigyan ng account.",
    checkFirst: [
      "Kumpleto ba applicant details and proof documents",
      "Tama ba ang barangay and health center location",
      "May duplicate ba sa same email or same health center",
      "Ano ang safest decision: approve, reject, or needs more info",
    ],
    aiPreview:
      "Review pending requests and highlight duplicate, missing proof, and location mismatch risks.",
    aiInsight:
      "Focus on requests with missing proof, duplicate health center names, and map pins that do not match the selected barangay.",
  },
  "/super-admin/approvals/review": {
    simplePurpose:
      "Ito ang detailed review screen ng isang admin signup request bago mag-approve or reject.",
    checkFirst: [
      "Match ba ang pangalan sa proof documents",
      "Tama ba ang selected PSGC address and map pin",
      "May existing admin or health center na kapareho",
      "May notes ba para malinaw ang decision history",
    ],
    aiPreview:
      "Create a short risk summary for this request and suggest what the reviewer should verify.",
    aiInsight:
      "Before approving, verify the applicant name, authorization proof, barangay address, map pin, and duplicate center warnings.",
  },
  "/super-admin/health-centers": {
    simplePurpose:
      "Dito mino-monitor ang registered barangay health centers at kung saan sila located sa mapa.",
    checkFirst: [
      "Aling centers ang active, unassigned, or may duplicate risk",
      "Tama ba ang map pin ng health center",
      "Sino ang primary admin and ilan ang workers",
      "May inventory or reporting issue ba per center",
    ],
    aiPreview:
      "Summarize barangay coverage gaps and health centers that need admin assignment or location review.",
    aiInsight:
      "Sta. Maria needs a primary admin, while Tetuan should be reviewed for possible duplicate health center records.",
  },
  "/super-admin/users": {
    simplePurpose:
      "Dito mino-monitor ang accounts at roles ng Super Admin, Health Center Admin, at Barangay Health Worker.",
    checkFirst: [
      "Tama ba ang role and assignment ng user",
      "May mismatch ba sa Firebase claim and Firestore profile",
      "May suspended/disabled accounts na kailangan review",
      "Hindi ba madi-disable ang last active Super Admin",
    ],
    aiPreview:
      "Find users with role mismatch, pending setup, disabled status, or suspicious assignment issues.",
    aiInsight:
      "Two accounts may have claim/profile mismatch. Review pending setup users before adding new worker accounts.",
  },
  "/super-admin/inventory": {
    simplePurpose:
      "Dito nakikita kung aling gamot ang low stock, expired, expiring soon, or stockout risk.",
    checkFirst: [
      "May zero usable stock ba",
      "May positive stock pero expired naman ba",
      "Aling centers ang hindi nag-update ng inventory",
      "Aling gamot ang kailangan i-prioritize for restock or referral",
    ],
    aiPreview:
      "Summarize top stock risks and suggest which centers need restock or medicine referral first.",
    aiInsight:
      "Prioritize medicine shortage by matching illness demand to usable stock. A barangay with high cases and low medicine should trigger restock or referral before reports.",
  },
  "/super-admin/medicine-catalog": {
    simplePurpose:
      "Dito inaayos ang master list ng gamot para pare-pareho ang spelling, dosage, form, at category.",
    checkFirst: [
      "May duplicate medicine names ba",
      "Tama ba ang strength, form, and unit",
      "May restricted medicine ba na kailangan extra control",
      "Tama ba ang default low-stock and expiry thresholds",
    ],
    aiPreview:
      "Detect duplicate medicine names and suggest cleaner generic names, forms, and categories.",
    aiInsight:
      "Review duplicate medicine names before new inventory is encoded so reports stay clean and searchable.",
  },
  "/super-admin/dispensing": {
    simplePurpose:
      "Dito nakikita ang medicine usage trend, pero hindi dapat default makita ang patient-identifying details.",
    checkFirst: [
      "Aling medicines ang mataas ang usage",
      "May dispensing logs ba na kailangan correction",
      "May medicines dispensed without linked case category",
      "May stock deduction issue ba",
    ],
    aiPreview:
      "Summarize unusual dispensing patterns and logs that need correction or case-category cleanup.",
    aiInsight:
      "Several dispensing logs are not linked to case categories. Clean those up before illness analytics are trusted.",
  },
  "/super-admin/illness-cases": {
    simplePurpose:
      "Dito nakikita ang common recorded cases per barangay, gaya ng fever, cough/colds, diarrhea, hypertension.",
    checkFirst: [
      "Top case categories per barangay",
      "May sudden spike ba na kailangan i-validate",
      "Masyado bang marami ang Other category",
      "May small counts ba na dapat i-protect for privacy",
    ],
    aiPreview:
      "Explain illness trends in simple language and flag barangays with spikes or messy Other categories.",
    aiInsight:
      "Fever and cough/colds are leading recorded cases. Pair case spikes with available medicine so shortages are caught daily.",
  },
  "/super-admin/referrals": {
    simplePurpose:
      "Dito mino-monitor kung may health center na humihiram or nagre-request ng gamot sa ibang center.",
    checkFirst: [
      "Aling referrals ang pending or expired",
      "May available stock ba ang destination center",
      "Na-fulfill ba ang accepted referrals",
      "May patient data ba na dapat hidden",
    ],
    aiPreview:
      "Summarize pending and expired referrals and suggest which requests need follow-up first.",
    aiInsight:
      "Use referrals when one barangay has high cases and low stock while another has unused or slow-moving usable medicine.",
  },
  "/super-admin/reports": {
    simplePurpose:
      "Dito gumagawa or tumitingin ng reports para sa stock, illness cases, approvals, referrals, users, at audit.",
    checkFirst: [
      "Tama ba ang report type and date range",
      "Aggregate ba ang sensitive health data",
      "May failed exports ba",
      "Na-log ba ang report generation sa audit logs",
    ],
    aiPreview:
      "Draft a plain-language report summary based on selected filters and key operational risks.",
    aiInsight:
      "Generate aggregate reports first. Sensitive exports should create audit logs and avoid patient-identifying details.",
  },
  "/super-admin/alerts": {
    simplePurpose:
      "Dito lumalabas ang warnings na kailangan pansinin, tulad ng low stock, pending approval, or illness spike.",
    checkFirst: [
      "Aling alerts ang critical",
      "May repeated alerts ba na same issue",
      "Resolved na ba talaga or bumalik ang risk",
      "Sino ang responsible owner",
    ],
    aiPreview:
      "Group related alerts and rank what the Super Admin should handle first.",
    aiInsight:
      "Critical stock and approval alerts should be handled first. Repeated alerts may point to unresolved center issues.",
  },
  "/super-admin/audit-logs": {
    simplePurpose:
      "Ito ang history ng sensitive actions para may accountability kung sino ang nag-approve, nag-change role, or nag-export.",
    checkFirst: [
      "May failed privileged action ba",
      "May role or claim changes ba",
      "May proof document views or report exports ba",
      "Walang secrets or raw sensitive files sa logs",
    ],
    aiPreview:
      "Summarize high-risk admin actions and failures without exposing secrets or sensitive documents.",
    aiInsight:
      "Review failed privileged actions, role changes, proof document views, and report exports for accountability.",
  },
  "/super-admin/settings": {
    simplePurpose:
      "Dito ise-set later ang global rules ng system, gaya ng inventory thresholds, expiry windows, referral rules, and integrations.",
    checkFirst: [
      "Tama ba ang approval and inventory policy",
      "Configured ba Firebase, Mapbox, Cloudinary, and future AI backend",
      "May case category cleanup policy ba",
      "Audited ba ang global setting changes",
    ],
    aiPreview:
      "Check configuration health and explain which system settings are incomplete or risky.",
    aiInsight:
      "Firebase, Mapbox, Cloudinary, and future AI settings should show clear configured or missing status before launch.",
  },
};

export const overviewFocus = [
  {
    label: "Approvals",
    value: "18 pending",
    note: "Start with duplicate and proof warnings",
  },
  {
    label: "Illness cases",
    value: "Fever leading",
    note: "Based on explicit case categories",
  },
  {
    label: "Inventory",
    value: "8 critical",
    note: "Low usable stock or stockout risk",
  },
];

export const miniReportCards = [
  {
    title: "Case summary",
    value: "412",
    description: "Recorded cases this month",
    icon: BarChart3,
  },
  {
    title: "Dispensing logs",
    value: "386",
    description: "Medicine usage records this week",
    icon: Activity,
  },
  {
    title: "Ready reports",
    value: "14",
    description: "Generated report metadata",
    icon: FileBarChart,
  },
];

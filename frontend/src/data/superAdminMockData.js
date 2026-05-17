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
        title: "Approvals",
        href: "/super-admin/approvals",
        icon: ClipboardCheck,
        description: "Admin signup requests and review queue.",
      },
      {
        title: "Approval Detail",
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
        title: "Inventory",
        href: "/super-admin/inventory",
        icon: Pill,
        description: "Stock status, expiry, and shortage risks.",
      },
      {
        title: "Medicine Catalog",
        href: "/super-admin/medicine-catalog",
        icon: ListChecks,
        description: "Normalized medicine names and thresholds.",
      },
      {
        title: "Dispensing",
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
        title: "Referrals",
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
        title: "Audit Logs",
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
    title: "Admin Signup Requests",
    eyebrow: "Approvals",
    description: "Review public admin signup requests before creating active health center admin accounts.",
    primaryAction: "Review selected",
    tabs: ["All requests", "Pending", "Needs info", "Approved", "Rejected"],
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
    title: "Approval Detail",
    eyebrow: "Approvals",
    description: "Inspect applicant information, facility details, proof files, duplicate signals, and decision history.",
    primaryAction: "Approve request",
    tabs: ["Applicant", "Facility", "Proof", "Decision"],
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
    title: "Health Center Registry",
    eyebrow: "Operations",
    description: "Manage recognized barangay health centers, assignments, coverage, and operational status.",
    primaryAction: "Add center",
    tabs: ["All centers", "Active", "Unassigned", "Suspended"],
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
    description: "Manage Super Admin, Health Center Admin, and Barangay Health Worker accounts.",
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
    title: "Inventory Oversight",
    eyebrow: "Operations",
    description: "Monitor medicine stock status, expiry, and shortage signals across barangays.",
    primaryAction: "Review risks",
    tabs: ["All stock", "Low stock", "Stockout", "Expiring", "Expired"],
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
    title: "Medicine Catalog",
    eyebrow: "Operations",
    description: "Normalize medicine names, strength, form, unit, category, and default thresholds.",
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
    title: "Dispensing & Usage",
    eyebrow: "Operations",
    description: "Review medicine usage trends and accountability signals without exposing patient names by default.",
    primaryAction: "View trend",
    tabs: ["Summary", "Corrections", "High usage", "Unlinked cases"],
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
    title: "Illness Cases by Barangay",
    eyebrow: "Insights",
    description: "Track top common recorded case categories from explicit consultation or dispensing case fields.",
    primaryAction: "Review spike",
    tabs: ["Top cases", "Trend", "By barangay", "Other cleanup"],
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
    title: "Referrals Monitor",
    eyebrow: "Insights",
    description: "Track medicine referral requests between barangay health centers.",
    primaryAction: "Review pending",
    tabs: ["All referrals", "Sent", "Accepted", "Fulfilled", "Expired"],
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
    title: "Reports & Analytics",
    eyebrow: "Insights",
    description: "Generate operational reports for stock, dispensing, illness cases, referrals, approvals, and activity.",
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
    description: "Review operational, inventory, approval, illness spike, and integration alerts.",
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
    title: "Audit Logs",
    eyebrow: "Governance",
    description: "Review append-only sensitive administrative activity and state changes.",
    primaryAction: "Filter logs",
    tabs: ["All events", "Approvals", "Users", "Reports", "Inventory"],
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
    title: "Settings",
    eyebrow: "Governance",
    description: "View and later control approval policies, thresholds, referral rules, categories, and integrations.",
    primaryAction: "Save policy",
    tabs: ["Policies", "Inventory", "Cases", "Storage", "Integrations"],
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

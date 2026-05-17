const menuItems = [
  { label: "Features", href: "#features" },
  { label: "Workflow", href: "#workflow" },
  { label: "Roles", href: "#roles" },
  { label: "Security", href: "#security" },
  { label: "FAQs", href: "#faqs" },
];

export function HeaderMenus() {
  return (
    <nav className="flex items-center gap-1">
      {menuItems.map((item) => (
        <a
          key={item.href}
          href={item.href}
          className="rounded-md px-3 py-2 text-xs font-medium text-slate-600 duration-150 hover:bg-[#eef8e9] hover:text-[#0b6b35] focus:bg-[#eef8e9] focus:text-[#0b6b35] focus:outline-none"
        >
          {item.label}
        </a>
      ))}
    </nav>
  );
}

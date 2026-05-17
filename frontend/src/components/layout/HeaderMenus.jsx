const menuItems = [
  { label: "Features", href: "#features" },
  { label: "Workflow", href: "#workflow" },
  { label: "Roles", href: "#roles" },
  { label: "Technology", href: "#technology" },
];

export function HeaderMenus() {
  return (
    <nav className="flex items-center gap-1 rounded-full bg-slate-100/70 p-1">
      {menuItems.map((item) => (
        <a
          key={item.href}
          href={item.href}
          className="rounded-full px-4 py-2 text-xs font-semibold text-slate-600 transition-colors duration-200 hover:bg-white hover:text-teal-800 hover:shadow-sm focus:bg-white focus:text-teal-800 focus:outline-none focus:ring-2 focus:ring-teal-100"
        >
          {item.label}
        </a>
      ))}
    </nav>
  );
}
